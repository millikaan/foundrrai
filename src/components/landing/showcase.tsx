import Link from "next/link";

import { TEMPLATES } from "@/lib/templates";
import { BrowserCard } from "./browser-card";
import { Reveal } from "./reveal";

export function Showcase() {
  return (
    <section id="showcase" className="relative px-5 py-20 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-[1180px]">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <Reveal className="max-w-[720px]">
            <h2
              className="font-semibold tracking-tight text-foreground"
              style={{ fontSize: "clamp(34px, 4.6vw, 56px)", lineHeight: 1.04 }}
            >
              Şablonları kəşf et
            </h2>
            <p className="mt-3 text-[16px] font-medium leading-relaxed text-foreground/64 sm:text-[17px]">
              Növbəti layihəni hazır şablonla başlat.
            </p>
          </Reveal>

          <Link
            href="/#showcase"
            className="inline-flex h-10 w-fit items-center justify-center rounded-xl border border-border bg-background/76 px-4 text-[14px] font-medium text-foreground shadow-[0_1px_1px_hsl(var(--foreground)/0.04)] transition-colors hover:bg-muted/70"
          >
            Hamısına bax
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-x-7 gap-y-9 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {TEMPLATES.map((item) => (
            <BrowserCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
