import { NextResponse } from "next/server";

import { PLAN_CONFIG, STRIPE_CURRENCY, isPaidPlan } from "@/lib/stripe/plans";
import { createClient } from "@/lib/supabase/server";

export const runtime = "nodejs";

interface CheckoutBody {
  plan?: string;
}

/**
 * Starts a Stripe Checkout session for a plan. If Stripe isn't configured yet
 * (no STRIPE_SECRET_KEY) it falls back to a simulated upgrade so the flow keeps
 * working — the real charge kicks in automatically once keys are added.
 */
export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Daxil olmaq lazımdır." }, { status: 401 });
  }

  let body: CheckoutBody;
  try {
    body = (await request.json()) as CheckoutBody;
  } catch {
    return NextResponse.json({ error: "Yanlış sorğu." }, { status: 400 });
  }
  if (!isPaidPlan(body.plan)) {
    return NextResponse.json({ error: "Yanlış plan." }, { status: 400 });
  }
  const plan = body.plan;
  const config = PLAN_CONFIG[plan];

  const secret = process.env.STRIPE_SECRET_KEY;

  // ── Fallback: no Stripe configured → simulated upgrade ──
  if (!secret) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("credits")
      .eq("id", user.id)
      .single();
    const credits = (profile?.credits ?? 0) + config.credits;
    await supabase.from("profiles").update({ plan, credits }).eq("id", user.id);
    return NextResponse.json({ simulated: true, plan, credits });
  }

  // ── Real Stripe Checkout ──
  try {
    const Stripe = (await import("stripe")).default;
    const stripe = new Stripe(secret);
    const origin = new URL(request.url).origin;
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      allow_promotion_codes: true,
      line_items: [
        config.priceId
          ? { price: config.priceId, quantity: 1 }
          : {
              quantity: 1,
              price_data: {
                currency: STRIPE_CURRENCY,
                product_data: { name: config.name },
                unit_amount: config.amount,
                recurring: { interval: "month" },
              },
            },
      ],
      customer_email: user.email ?? undefined,
      success_url: `${origin}/workspace?upgraded=${plan}`,
      cancel_url: `${origin}/workspace`,
      metadata: { userId: user.id, plan },
    });
    return NextResponse.json({ url: session.url });
  } catch {
    return NextResponse.json({ error: "Ödəniş başladıla bilmədi." }, { status: 502 });
  }
}
