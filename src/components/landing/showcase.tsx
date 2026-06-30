import { TEMPLATES } from "@/lib/templates";
import { BrowserCard } from "./browser-card";
import { Reveal } from "./reveal";

export function Showcase() {
  return (
    <section id="showcase" className="relative px-5 py-20 sm:px-6 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-[1280px]">
        <Reveal className="max-w-[560px]">
          <h2
            className="font-semibold tracking-[-0.03em] text-foreground"
            style={{ fontSize: "clamp(32px, 4.2vw, 48px)", lineHeight: 1.06 }}
          >
            Foundrr ilə qurulanlar
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground sm:text-[16px]">
            Bir cümlədən başlayan saytlar — real bizneslər, real dizayn.
          </p>
        </Reveal>

        <div className="mt-10 grid grid-cols-2 gap-4 sm:mt-12 sm:gap-5 lg:grid-cols-4 lg:gap-6">
          {TEMPLATES.map((item, index) => (
            <Reveal key={item.id} delay={index * 60}>
              <BrowserCard item={item} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
