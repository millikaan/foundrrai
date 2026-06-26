import { NextResponse } from "next/server";

import { STRIPE_CURRENCY, getCreditPack, isPaidPlan } from "@/lib/stripe/plans";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";

export const runtime = "nodejs";

interface CreditsBody {
  pack?: string;
}

/**
 * One-time credit top-up purchase. Only meaningful for Pro users (the UI gates
 * it), but we re-check the plan server-side. With Stripe configured it opens a
 * one-time Checkout; without it, credits are granted immediately (simulated).
 */
export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Daxil olmaq lazımdır." }, { status: 401 });
  }

  let body: CreditsBody;
  try {
    body = (await request.json()) as CreditsBody;
  } catch {
    return NextResponse.json({ error: "Yanlış sorğu." }, { status: 400 });
  }

  const pack = getCreditPack(body.pack);
  if (!pack) {
    return NextResponse.json({ error: "Yanlış paket." }, { status: 400 });
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("plan, credits")
    .eq("id", user.id)
    .single();

  // Top-ups are for any paid plan (Pro or Max).
  if (!isPaidPlan(profile?.plan)) {
    return NextResponse.json(
      { error: "Kredit paketləri yalnız ödənişli planlarda mövcuddur." },
      { status: 403 },
    );
  }

  const secret = process.env.STRIPE_SECRET_KEY;

  // ── Fallback: no Stripe → grant immediately ──
  if (!secret) {
    const { data: credits } = await createAdminClient().rpc("increment_credits", {
      p_user: user.id,
      p_delta: pack.credits,
    });
    return NextResponse.json({ simulated: true, credits: credits ?? 0 });
  }

  // ── Real Stripe one-time Checkout ──
  try {
    const Stripe = (await import("stripe")).default;
    const stripe = new Stripe(secret);
    const origin = new URL(request.url).origin;
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      allow_promotion_codes: true,
      line_items: [
        pack.priceId
          ? { price: pack.priceId, quantity: 1 }
          : {
              quantity: 1,
              price_data: {
                currency: STRIPE_CURRENCY,
                product_data: { name: `Foundrr — ${pack.name}` },
                unit_amount: pack.amount,
              },
            },
      ],
      customer_email: user.email ?? undefined,
      success_url: `${origin}/workspace?credits=added`,
      cancel_url: `${origin}/workspace`,
      metadata: { userId: user.id, type: "credits", credits: String(pack.credits) },
    });
    return NextResponse.json({ url: session.url });
  } catch {
    return NextResponse.json({ error: "Ödəniş başladıla bilmədi." }, { status: 502 });
  }
}
