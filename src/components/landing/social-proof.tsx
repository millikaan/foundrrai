import { Reveal } from "./reveal";

const STATS: ReadonlyArray<{ value: string; label: string }> = [
  { value: "250+", label: "Qurulmuş sayt" },
  { value: "70+", label: "Yayımlanan layihə" },
  { value: "500", label: "Qeydiyyat" },
];

export function Stats() {
  return (
    <section className="relative px-5 py-20 sm:px-6 sm:py-24">
      <div className="relative mx-auto max-w-[1180px]">
        <Reveal>
          <div className="max-w-[640px]">
            <h2
              className="font-semibold tracking-tight text-foreground"
              style={{ fontSize: "clamp(34px, 4.6vw, 56px)", lineHeight: 1.04 }}
            >
              Foundrr rəqəmlərdə
            </h2>
            <p className="mt-3 text-[16px] font-medium leading-relaxed text-foreground/58 sm:text-[17px]">
              Azərbaycan biznesləri artıq Foundrr ilə sayt qurur.
            </p>
          </div>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
          {STATS.map((stat, index) => (
            <Reveal key={stat.label} delay={index * 110}>
              <div className="flex min-h-[132px] flex-col justify-between rounded-2xl border border-black/[0.06] bg-white/80 px-5 py-5 shadow-[0_1px_2px_hsl(var(--foreground)/0.04)] backdrop-blur-sm transition-transform duration-300 hover:-translate-y-0.5 dark:border-white/10 dark:bg-card/80 sm:min-h-[140px] sm:px-6 sm:py-6">
                <p className="text-[13px] font-medium text-muted-foreground sm:text-[14px]">
                  {stat.label}
                </p>
                <div
                  className="mt-4 font-semibold leading-none tracking-tight text-foreground"
                  style={{ fontSize: "clamp(40px, 5vw, 56px)" }}
                >
                  {stat.value}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
