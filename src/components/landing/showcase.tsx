import { TEMPLATES } from "@/lib/templates";
import { BrowserCard } from "./browser-card";
import { Reveal } from "./reveal";

export function Showcase() {
  return (
    <section id="showcase" className="relative px-4 py-16 sm:px-6 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-[1080px]">
        <Reveal className="max-w-[540px]">
          <h2
            className="font-semibold tracking-tight text-foreground"
            style={{ fontSize: "clamp(28px, 3.6vw, 44px)", lineHeight: 1.08 }}
          >
            Şablonları kəşf et
          </h2>
          <p className="mt-2 text-[14px] leading-relaxed text-muted-foreground">
            Növbəti layihəni hazır şablonla başlat.
          </p>
        </Reveal>

        <Reveal className="mt-8 sm:mt-10">
          <div className="grid grid-cols-2 gap-x-2.5 gap-y-5 sm:gap-x-3 sm:gap-y-6 md:grid-cols-4 md:gap-x-3.5 md:gap-y-7">
            {TEMPLATES.map((item) => (
              <BrowserCard key={item.id} item={item} />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
