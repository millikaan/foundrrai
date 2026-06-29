import { FoundrrLogo } from "@/components/brand/foundrr-logo";
import Link from "next/link";

import { Bloom } from "./bloom";

const COLUMNS: ReadonlyArray<{
  heading: string;
  links: ReadonlyArray<{ label: string; href: string }>;
}> = [
  {
    heading: "Məhsul",
    links: [
      { label: "Necə işləyir", href: "#how" },
      { label: "Nümunələr", href: "#showcase" },
      { label: "Şablonlar", href: "#showcase" },
      { label: "Qiymət", href: "/pricing" },
    ],
  },
  {
    heading: "Şirkət",
    links: [
      { label: "Haqqında", href: "#" },
      { label: "Bloq", href: "#" },
      { label: "Karyera", href: "#" },
      { label: "Əlaqə", href: "#" },
    ],
  },
  {
    heading: "Resurslar",
    links: [
      { label: "Sənədlər", href: "#" },
      { label: "Bələdçi", href: "#" },
      { label: "Dəstək", href: "#" },
      { label: "Status", href: "#" },
    ],
  },
  {
    heading: "Hüquqi",
    links: [
      { label: "Şərtlər", href: "#" },
      { label: "Məxfilik", href: "#" },
      { label: "Cookie", href: "#" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-border px-6 py-16">
      <Bloom variant="cta" />

      <div className="relative z-10 mx-auto max-w-[1160px]">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-[1.5fr_1fr_1fr_1fr_1fr]">
          <div className="col-span-2 md:col-span-1">
            <FoundrrLogo markSize={24} wordmarkClassName="text-[17px]" />
            <p className="mt-3 max-w-[260px] text-[14px] leading-relaxed text-muted-foreground">
              Azərbaycan üçün AI sayt qurucusu. Fikrindən hazır sayta.
            </p>
          </div>

          {COLUMNS.map((column) => (
            <div key={column.heading}>
              <h3 className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                {column.heading}
              </h3>
              <ul className="mt-4 flex flex-col gap-2.5">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-[14px] text-foreground/80 transition-colors hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-border pt-6 font-mono text-[12px] text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <span>© 2026 Foundrr</span>
          <span className="flex items-center gap-2.5">
            Bakı, Azərbaycan
            <span className="rounded border border-border px-1.5 py-0.5 text-[10px] uppercase tracking-wider">
              AZ
            </span>
          </span>
        </div>
      </div>
    </footer>
  );
}
