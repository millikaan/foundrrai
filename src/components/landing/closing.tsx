import Link from "next/link";

import { PromptBox } from "./prompt-box";
import { Reveal } from "./reveal";
import { Bloom } from "./bloom";

const COLUMNS: ReadonlyArray<{
  heading: string;
  links: ReadonlyArray<{ label: string; href: string }>;
}> = [
  {
    heading: "Məhsul",
    links: [
      { label: "Necə işləyir", href: "/#how" },
      { label: "Nümunələr", href: "/#showcase" },
      { label: "Şablonlar", href: "/#showcase" },
      { label: "Qiymət", href: "/pricing" },
    ],
  },
  {
    heading: "Şirkət",
    links: [
      { label: "Haqqında", href: "/haqqinda" },
      { label: "Bloq", href: "/bloq" },
      { label: "Karyera", href: "/karyera" },
      { label: "Əlaqə", href: "/elaqe" },
    ],
  },
  {
    heading: "Resurslar",
    links: [
      { label: "Sənədlər", href: "/senedler" },
      { label: "Bələdçi", href: "/beledci" },
      { label: "Dəstək", href: "/destek" },
      { label: "Status", href: "/status" },
    ],
  },
  {
    heading: "Hüquqi",
    links: [
      { label: "Şərtlər", href: "/sertler" },
      { label: "Məxfilik", href: "/mexfilik" },
      { label: "Cookie", href: "/cookie" },
    ],
  },
];

export function Closing() {
  return (
    <section className="relative overflow-hidden px-5 pb-0 pt-[150px] sm:px-6">
      <Bloom variant="closing" />
      <div className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-32 bg-gradient-to-b from-background to-transparent" />

      <Reveal className="relative z-10 mx-auto max-w-[900px] px-0 text-center">
        <p className="mb-4 text-[18px] font-medium text-muted-foreground">
          AI sayt qurucusu
        </p>
        <h2
          className="text-balance font-semibold tracking-tight text-foreground"
          style={{ fontSize: "clamp(44px, 6vw, 74px)", lineHeight: 1.02 }}
        >
          Qurmağa hazırsan?
        </h2>
        <p className="mx-auto mt-4 max-w-[460px] text-[17px] font-medium leading-relaxed text-foreground/68">
          Bir cümlə yaz, qalanını Foundrr etsin.
        </p>

        <div className="mt-10 w-full">
          <PromptBox showChips={false} />
        </div>
      </Reveal>

      <footer className="relative z-10 mx-auto mt-[120px] max-w-[1180px] rounded-t-[22px] bg-card px-8 pb-12 pt-16 sm:px-10 lg:px-12">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-[1.35fr_1fr_1fr_1fr_1fr]">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 font-semibold tracking-tight">
              <span className="brand-mark h-7 w-7" />
              <span className="text-[17px]">Foundrr</span>
            </div>
            <p className="mt-3 max-w-[260px] text-[14px] leading-relaxed text-muted-foreground">
              Azərbaycan üçün AI sayt qurucusu. Fikrindən hazır sayta.
            </p>
            <p className="mt-3 max-w-[280px] text-[12px] leading-relaxed text-muted-foreground/75">
              Foundrr hostinq və ya domen satmır — saytı öz hesabına yayımlayır,
              domenini özün alırsan.
            </p>
          </div>

          {COLUMNS.map((column) => (
            <div key={column.heading}>
              <h3 className="text-[13px] font-semibold text-muted-foreground">
                {column.heading}
              </h3>
              <ul className="mt-4 flex flex-col gap-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="inline-block text-[15px] font-medium text-foreground transition-all duration-200 hover:translate-x-0.5 hover:text-foreground/70"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-border pt-6 text-[13px] font-medium text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <span>© 2026 Foundrr</span>
          <span className="flex items-center gap-2.5">
            Bakı, Azərbaycan
            <span className="rounded border border-border px-1.5 py-0.5 text-[10px] uppercase tracking-wider">
              AZ
            </span>
          </span>
        </div>
      </footer>
    </section>
  );
}
