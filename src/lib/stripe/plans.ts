/**
 * Paid plan configuration for Stripe checkout + the upgrade credit grant.
 *
 * `amount` is in the currency's smallest unit (e.g. cents). Prices are shown in
 * ₼ in the UI; set STRIPE_CURRENCY (+ amounts) to whatever your Stripe account
 * supports — note AZN may not be available, so this defaults to USD.
 */
export type PaidPlan = "pro" | "max";

export const PLAN_CONFIG: Record<
  PaidPlan,
  { credits: number; amount: number; name: string; priceId?: string }
> = {
  pro: {
    credits: 500,
    amount: 2999,
    name: "Foundrr Pro",
    priceId: process.env.STRIPE_PRICE_PRO,
  },
  max: {
    credits: 1200,
    amount: 9999,
    name: "Foundrr Max",
    priceId: process.env.STRIPE_PRICE_MAX,
  },
};

export const STRIPE_CURRENCY = process.env.STRIPE_CURRENCY ?? "usd";

export function isPaidPlan(value: unknown): value is PaidPlan {
  return value === "pro" || value === "max";
}

/** What each plan includes — shown in the Plan & credits settings tab. */
export interface PlanSpec {
  id: "free" | "pro" | "max";
  name: string;
  price: string;
  period: string;
  credits: number;
  features: ReadonlyArray<string>;
}

export const PLAN_SPECS: ReadonlyArray<PlanSpec> = [
  {
    id: "free",
    name: "Pulsuz",
    price: "0 ₼",
    period: "",
    credits: 100,
    features: [
      "100 başlanğıc kredit",
      "Limitsiz canlı önizləmə",
      "Bütün şablonlar",
      "Söhbətlə redaktə",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    price: "29.99 ₼",
    period: "/ay",
    credits: 500,
    features: [
      "Hər ay 500 kredit",
      "Öz Vercel hesabına yayım",
      "Brendsiz saytlar",
      "Forma bazası (Supabase)",
      "Loqo və media yükləmə",
      "Əlavə kredit paketləri",
    ],
  },
  {
    id: "max",
    name: "Max",
    price: "99.99 ₼",
    period: "/ay",
    credits: 1200,
    features: [
      "Hər ay 1200 kredit",
      "Ən güclü AI model",
      "Prioritet qurma sürəti",
      "Ödəniş inteqrasiyası",
      "Prioritet dəstək",
    ],
  },
];

/** One-time credit top-up packs — only offered to Pro users who run out. */
export interface CreditPack {
  id: string;
  credits: number;
  amount: number;
  name: string;
  priceId?: string;
}

export const CREDIT_PACKS: ReadonlyArray<CreditPack> = [
  {
    id: "credits_100",
    credits: 100,
    amount: 999,
    name: "100 kredit",
    priceId: process.env.STRIPE_PRICE_CREDITS_100,
  },
  {
    id: "credits_300",
    credits: 300,
    amount: 2499,
    name: "300 kredit",
    priceId: process.env.STRIPE_PRICE_CREDITS_300,
  },
  {
    id: "credits_600",
    credits: 600,
    amount: 3999,
    name: "600 kredit",
    priceId: process.env.STRIPE_PRICE_CREDITS_600,
  },
];

export function getCreditPack(id: unknown): CreditPack | null {
  return CREDIT_PACKS.find((p) => p.id === id) ?? null;
}
