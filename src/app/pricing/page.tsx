import type { Metadata } from "next";

import { Pricing } from "@/components/landing/pricing";
import { SiteNav } from "@/components/landing/site-nav";
import { getNavUser } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Qiymət",
  description:
    "Foundrr planları və kreditləri. Qurmaq pulsuzdur, yayıma hazır olanda plan seç.",
};

export default async function PricingPage() {
  const user = await getNavUser();

  return (
    <>
      <SiteNav user={user} />
      <main className="pt-16">
        <Pricing />
      </main>
    </>
  );
}
