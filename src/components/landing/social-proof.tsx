import { Reveal } from "./reveal";
const STATS: ReadonlyArray<{ value: string; label: string }> = [
  { value: "250+", label: "sayt made" },
  { value: "70+", label: "published" },
  { value: "500", label: "signups" },
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

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {STATS.map((stat, index) => (
            <Reveal key={stat.label} delay={index * 110}>
              <div className="flex min-h-[160px] flex-col justify-between rounded-[20px] border border-border/80 bg-card/80 px-6 py-6 transition-transform duration-300 hover:-translate-y-0.5 sm:min-h-[172px]">
                <div
                  className="font-semibold leading-none tracking-tight text-foreground"
                  style={{ fontSize: "clamp(44px, 5.5vw, 60px)" }}
                >
                  {stat.value}
                </div>
                <p className="max-w-[15rem] text-[14.5px] font-medium leading-relaxed text-foreground/62">
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
