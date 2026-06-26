import { NextResponse } from "next/server";

import { createClient } from "@/lib/supabase/server";

export const runtime = "nodejs";

/**
 * Cancels the user's paid plan by STOPPING RENEWAL at the end of the current
 * billing period (Stripe `cancel_at_period_end`). The user keeps Pro + their
 * credits until then; the webhook (`customer.subscription.deleted`) flips them to
 * Free when the period actually ends. Without a real Stripe subscription we fall
 * back to an immediate downgrade (nothing to schedule).
 */
export async function POST() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Daxil olmaq lazımdır." }, { status: 401 });
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("credits, plan")
    .eq("id", user.id)
    .single();

  if (!profile || profile.plan === "free") {
    return NextResponse.json({ error: "Aktiv ödənişli plan yoxdur." }, { status: 400 });
  }

  const secret = process.env.STRIPE_SECRET_KEY;

  if (secret) {
    try {
      const Stripe = (await import("stripe")).default;
      const stripe = new Stripe(secret);

      // Find this user's subscription: first by our checkout-session metadata
      // (tied to the Foundrr userId, email-independent), then by customer email.
      let subscriptionId: string | null = null;
      const sessions = await stripe.checkout.sessions.list({ limit: 100 });
      const mine = sessions.data.find(
        (s) => s.metadata?.userId === user.id && s.mode === "subscription" && s.subscription,
      );
      if (mine?.subscription) {
        subscriptionId =
          typeof mine.subscription === "string" ? mine.subscription : mine.subscription.id;
      }
      if (!subscriptionId && user.email) {
        const customers = await stripe.customers.list({ email: user.email, limit: 1 });
        const customer = customers.data[0];
        if (customer) {
          const subs = await stripe.subscriptions.list({
            customer: customer.id,
            status: "active",
            limit: 1,
          });
          subscriptionId = subs.data[0]?.id ?? null;
        }
      }

      if (subscriptionId) {
        const sub = await stripe.subscriptions.update(subscriptionId, {
          cancel_at_period_end: true,
        });
        const cancelAt =
          sub.cancel_at ??
          (sub as unknown as { current_period_end?: number }).current_period_end ??
          null;
        // Keep plan = pro and keep credits; renewal is now off.
        return NextResponse.json({
          scheduled: true,
          cancelAt,
          plan: profile.plan,
          credits: profile.credits ?? 0,
        });
      }
      // Stripe responded but found no subscription → genuine simulated case;
      // fall through to the immediate downgrade below.
    } catch {
      // Transient Stripe error — do NOT downgrade a live paying subscriber.
      return NextResponse.json(
        { error: "Stripe ilə əlaqə alınmadı. Bir azdan yenidən yoxla." },
        { status: 502 },
      );
    }
  }

  // No real subscription found (simulated upgrade) → downgrade now, keep credits.
  const { error } = await supabase
    .from("profiles")
    .update({ plan: "free" })
    .eq("id", user.id);
  if (error) {
    return NextResponse.json({ error: "Plan ləğv edilmədi." }, { status: 500 });
  }
  return NextResponse.json({ scheduled: false, plan: "free", credits: profile.credits ?? 0 });
}
