import { Closing } from "@/components/landing/closing";
import { Hero } from "@/components/landing/hero";
import { HowItWorks } from "@/components/landing/how-it-works";
import { Showcase } from "@/components/landing/showcase";
import { SiteNav } from "@/components/landing/site-nav";
import { Stats } from "@/components/landing/social-proof";
import { WhyFoundrr } from "@/components/landing/why-foundrr";
import { getNavUser } from "@/lib/auth";

export default async function HomePage() {
  const user = await getNavUser();
  return (
    <>
      <SiteNav user={user} />
      <main>
        <Hero />
        <HowItWorks />
        <Showcase />
        <WhyFoundrr />
        <Stats />
      </main>
      <Closing />
    </>
  );
}
