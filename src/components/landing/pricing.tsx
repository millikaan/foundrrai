import Link from "next/link";
import { Check } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { Reveal } from "./reveal";

interface Plan {
  name: string;
  price: string;
  period: string;
  features: ReadonlyArray<string>;
  cta: string;
  variant: "accent" | "outline" | "gradient";
  href: string;
  featured?: boolean;
  badge?: string;
}

const PLANS: ReadonlyArray<Plan> = [
  {
    name: "Pulsuz",
    price: "0 ₼",
    period: "",
    features: [
      "100 başlanğıc kredit",
      "Limitsiz önizləmə",
      "Anında redaktə",
      "Bütün şablonlar",
    ],
    cta: "Başla",
    variant: "outline",
    href: "/signup?intent=build",
  },
  {
    name: "Pro",
    price: "29.99 ₼",
    period: "/ay",
    features: [
      "Hər ay 500 kredit",
      "Öz Vercel hesabına yayım",
      "Brendsiz saytlar",
      "Forma bazası (Supabase)",
      "Loqo və media yükləmə",
    ],
    cta: "Pro-ya keç",
    variant: "accent",
    href: "/signup?intent=build",
    featured: true,
    badge: "Ən populyar",
  },
  {
    name: "Biznes",
    price: "99.99 ₼",
    period: "/ay",
    features: [
      "Hər ay 1200 kredit",
      "Ən güclü AI model",
      "Prioritet qurma sürəti",
      "Ödəniş inteqrasiyası",
      "Prioritet dəstək",
    ],
    cta: "Əlaqə",
    variant: "outline",
    href: "/signup?intent=build",
  },
];

export function Pricing() {
  return (
    <section className="relative overflow-hidden px-5 py-[112px] sm:px-6">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[520px] bg-[radial-gradient(65%_48%_at_50%_0%,hsl(var(--grad-violet)/0.24),transparent_70%)]" />
      <div className="mx-auto max-w-[1180px]">
        <Reveal className="mx-auto flex max-w-[680px] flex-col items-center text-center">
          <h2
            className="text-balance font-semibold tracking-tight"
            style={{ fontSize: "clamp(38px, 5vw, 58px)", lineHeight: 1.04 }}
          >
            Sadə qiymət
          </h2>
          <p className="mt-4 text-[17px] font-medium text-foreground/72">
            Qurmaq pulsuzdur — krediti bitəndə yenilə.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 items-stretch gap-4 lg:grid-cols-3">
          {PLANS.map((plan, index) => (
            <Reveal key={plan.name} delay={index * 80}>
              <div
                className={cn(
                  "relative flex h-full min-h-[480px] flex-col rounded-[22px] border p-7 transition-all duration-300",
                  plan.featured
                    ? "border-primary/55 bg-background shadow-[0_28px_70px_-42px_hsl(var(--primary)/0.55)] lg:-translate-y-3"
                    : "border-transparent bg-card hover:-translate-y-1",
                )}
              >
                {plan.badge ? (
                  <span className="absolute -top-3 left-7 rounded-full bg-primary px-3 py-1 text-[12px] font-medium text-primary-foreground shadow-[0_8px_20px_-10px_hsl(var(--primary)/0.7)]">
                    {plan.badge}
                  </span>
                ) : null}

                <h3 className="text-[16px] font-semibold text-foreground">{plan.name}</h3>
                <div className="mt-3 flex items-baseline gap-1">
                  <span className="text-[42px] font-semibold tracking-tight text-foreground">
                    {plan.price}
                  </span>
                  {plan.period ? (
                    <span className="text-[15px] text-muted-foreground">{plan.period}</span>
                  ) : null}
                </div>

                <div className="my-7 h-px bg-border" />

                <ul className="flex flex-1 flex-col gap-3.5">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-[14px]">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                        <Check className="h-3 w-3" strokeWidth={3} />
                      </span>
                      <span className="font-medium text-foreground/82">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={plan.href}
                  className={cn(buttonVariants({ variant: plan.variant }), "mt-8 w-full")}
                >
                  {plan.cta}
                </Link>
              </div>
            </Reveal>
          ))}
        </div>

        <p className="mx-auto mt-10 max-w-[640px] text-center text-[13px] font-medium leading-relaxed text-muted-foreground">
          Foundrr hostinq və ya domen satmır — saytı öz hesabına yayımlayır,
          domenini özün alırsan.
        </p>
      </div>
    </section>
  );
}
