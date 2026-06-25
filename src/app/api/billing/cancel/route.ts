import { NextResponse } from "next/server";

import { createClient } from "@/lib/supabase/server";

export const runtime = "nodejs";

/**
 * Cancels the user's paid plan and downgrades them to Free immediately.
 * Remaining credits are kept. When Stripe is configured, the active
 * subscription is cancelled too (looked up by the user's email, so no stored
 * subscription id is required). Without Stripe it just flips the plan in our DB.
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

  // Cancel the Stripe subscription if Stripe is wired up (best-effort).
  const secret = process.env.STRIPE_SECRET_KEY;
  if (secret && user.email) {
    try {
      const Stripe = (await import("stripe")).default;
      const stripe = new Stripe(secret);
      const customers = await stripe.customers.list({ email: user.email, limit: 1 });
      const customer = customers.data[0];
      if (customer) {
        const subs = await stripe.subscriptions.list({
          customer: customer.id,
          status: "active",
          limit: 10,
        });
        await Promise.all(subs.data.map((s) => stripe.subscriptions.cancel(s.id)));
      }
    } catch {
      // Subscription cleanup is best-effort — still downgrade locally below.
    }
  }

  const { error } = await supabase
    .from("profiles")
    .update({ plan: "free" })
    .eq("id", user.id);
  if (error) {
    return NextResponse.json({ error: "Plan ləğv edilmədi." }, { status: 500 });
  }

  return NextResponse.json({ plan: "free", credits: profile.credits ?? 0 });
}
