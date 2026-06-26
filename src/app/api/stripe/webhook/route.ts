import { NextResponse } from "next/server";

import { PLAN_CONFIG, isPaidPlan } from "@/lib/stripe/plans";
import { createAdminClient } from "@/lib/supabase/admin";

export const runtime = "nodejs";

/**
 * Stripe webhook: on a completed checkout, grant the purchased plan + credits.
 * Uses the service-role client because there is no user session here. The plan
 * + userId travel in the checkout session metadata.
 */
export async function POST(request: Request) {
  const secret = process.env.STRIPE_SECRET_KEY;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret || !webhookSecret) {
    return NextResponse.json({ error: "Stripe konfiqurasiya olunmayıb." }, { status: 503 });
  }

  const signature = request.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ error: "İmza yoxdur." }, { status: 400 });
  }

  const Stripe = (await import("stripe")).default;
  const stripe = new Stripe(secret);
  const payload = await request.text();

  let event;
  try {
    event = stripe.webhooks.constructEvent(payload, signature, webhookSecret);
  } catch {
    return NextResponse.json({ error: "İmza doğrulanmadı." }, { status: 400 });
  }

  const admin = createAdminClient();

  // Idempotency: process each Stripe event at most once (the PK conflict means
  // we've already handled it — so retries can't double-grant credits).
  const { error: dupError } = await admin.from("stripe_events").insert({ id: event.id });
  if (dupError) {
    return NextResponse.json({ received: true, duplicate: true });
  }

  try {
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as {
        metadata?: { userId?: string; plan?: string; type?: string; credits?: string };
      };
      const userId = session.metadata?.userId;
      const type = session.metadata?.type;
      const plan = session.metadata?.plan;

      if (userId && type === "credits") {
        // One-time credit top-up: add credits, keep the plan.
        const add = Number.parseInt(session.metadata?.credits ?? "0", 10);
        if (add > 0) {
          await admin.rpc("increment_credits", { p_user: userId, p_delta: add });
        }
      } else if (userId && isPaidPlan(plan)) {
        // Subscription upgrade: grant the monthly credits ONLY if not already on
        // this plan, so the webhook + /api/billing/sync can never double-grant.
        const { data: profile } = await admin
          .from("profiles")
          .select("plan")
          .eq("id", userId)
          .single();
        if (profile?.plan !== plan) {
          await admin.rpc("increment_credits", { p_user: userId, p_delta: PLAN_CONFIG[plan].credits });
        }
        await admin.from("profiles").update({ plan }).eq("id", userId);
      }
    } else if (event.type === "customer.subscription.deleted") {
      // A subscription ending (cancellation, payment failure) → drop to Free.
      const sub = event.data.object as { metadata?: { userId?: string } };
      const userId = sub.metadata?.userId;
      if (userId) {
        await admin.from("profiles").update({ plan: "free" }).eq("id", userId);
      }
    }
  } catch {
    // Let Stripe retry by clearing the idempotency marker for this event.
    await admin.from("stripe_events").delete().eq("id", event.id);
    return NextResponse.json({ error: "Profil yenilənmədi." }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}
