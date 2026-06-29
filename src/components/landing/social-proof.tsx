import { Reveal } from "./reveal";

const BRANDS: ReadonlyArray<string> = [
  "Dental Gülüm",
  "Gül Evi",
  "Laləzar",
  "Sahil Rent",
  "Ayla Store",
  "Usta",
];

export function LogosStrip() {
  return (
    <section className="px-6 pb-8 pt-2">
      <div className="mx-auto max-w-[1160px]">
        <p className="text-center text-[13px] font-medium uppercase tracking-[0.14em] text-muted-foreground/80">
          Foundrr ilə qurulan bizneslərdən bəziləri
        </p>
        <div className="mt-7 flex flex-wrap items-center justify-center gap-x-10 gap-y-5">
          {BRANDS.map((brand) => (
            <span
              key={brand}
              className="text-[17px] font-semibold tracking-tight text-foreground/40 transition-colors duration-200 hover:text-foreground/75"
            >
              {brand}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

const STATS: ReadonlyArray<{ value: string; label: string }> = [
  { value: "6", label: "başlamaq üçün hazır biznes şablonu" },
  { value: "3", label: "sadə mərhələ: yaz, önizlə, yayımla" },
  { value: "0", label: "hostinq və domen kilidi" },
];

export function Stats() {
  return (
    <section className="relative px-5 py-20 sm:px-6 sm:py-24">
      <div className="relative mx-auto max-w-[1180px]">
        <Reveal>
          <div className="max-w-[720px]">
            <h2
              className="font-semibold tracking-tight text-foreground"
              style={{ fontSize: "clamp(34px, 4.6vw, 56px)", lineHeight: 1.04 }}
            >
              Foundrr rəqəmlərdə
            </h2>
            <p className="mt-3 max-w-[620px] text-[16px] font-medium leading-relaxed text-foreground/64 sm:text-[17px]">
              Hələ yeni başlamışıq. Ona görə rəqəmlərimiz şişirdilmiş istifadəçi
              statistikası deyil, məhsulun real hazır imkanlarıdır.
            </p>
          </div>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {STATS.map((stat, index) => (
            <Reveal key={stat.label} delay={index * 110}>
              <div className="group flex min-h-[178px] flex-col justify-between rounded-[20px] border border-border bg-card/78 px-6 py-6 text-left shadow-[0_18px_54px_-48px_hsl(var(--foreground)/0.32)] transition-transform duration-300 hover:-translate-y-0.5 sm:min-h-[204px] lg:min-h-[232px]">
                <div
                  className="font-semibold leading-none tracking-tight text-foreground"
                  style={{ fontSize: "clamp(48px, 6.5vw, 68px)" }}
                >
                  {stat.value}
                </div>
                <p className="max-w-[16rem] text-[14.5px] font-medium leading-relaxed text-foreground/74">
                  {stat.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
