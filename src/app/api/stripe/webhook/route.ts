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

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as {
      metadata?: { userId?: string; plan?: string; type?: string; credits?: string };
    };
    const userId = session.metadata?.userId;
    const type = session.metadata?.type;
    const plan = session.metadata?.plan;

    try {
      const admin = createAdminClient();

      if (userId && type === "credits") {
        // One-time credit top-up: add credits, keep the plan.
        const add = Number.parseInt(session.metadata?.credits ?? "0", 10);
        if (add > 0) {
          const { data: profile } = await admin
            .from("profiles")
            .select("credits")
            .eq("id", userId)
            .single();
          const credits = (profile?.credits ?? 0) + add;
          await admin.from("profiles").update({ credits }).eq("id", userId);
        }
      } else if (userId && isPaidPlan(plan)) {
        // Subscription upgrade: grant the plan + its monthly credits.
        const { data: profile } = await admin
          .from("profiles")
          .select("credits")
          .eq("id", userId)
          .single();
        const credits = (profile?.credits ?? 0) + PLAN_CONFIG[plan].credits;
        await admin.from("profiles").update({ plan, credits }).eq("id", userId);
      }
    } catch {
      return NextResponse.json({ error: "Profil yenilənmədi." }, { status: 500 });
    }
  }

  // A subscription ending (cancellation, payment failure) → drop to Free.
  if (event.type === "customer.subscription.deleted") {
    const sub = event.data.object as { metadata?: { userId?: string } };
    const userId = sub.metadata?.userId;
    if (userId) {
      try {
        const admin = createAdminClient();
        await admin.from("profiles").update({ plan: "free" }).eq("id", userId);
      } catch {
        return NextResponse.json({ error: "Profil yenilənmədi." }, { status: 500 });
      }
    }
  }

  return NextResponse.json({ received: true });
}
