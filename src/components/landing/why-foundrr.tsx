import { Reveal } from "./reveal";

const ITEMS = [
  {
    label: "Tam Azərbaycan dilində",
    body: "Mətn də, dizayn da yerli — tərcümə hiss olunmur.",
  },
  {
    label: "Öz hesabına yayım",
    body: "Vercel / Netlify-ə bir kliklə. Sayt tamamilə sənin, kilid yoxdur.",
  },
  {
    label: "Forma & ödəniş bazası",
    body: "Sifariş və rezervasiyalar Supabase-ə düşür.",
  },
  {
    label: "Anında dəyişiklik",
    body: "Bir cümlə yaz — sayt dərhal yenilənir.",
  },
] as const;

export function WhyFoundrr() {
  return (
    <section className="px-5 py-20 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-[1180px]">
        <Reveal className="max-w-[700px]">
          <h2
            className="font-semibold tracking-tight"
            style={{ fontSize: "clamp(34px, 4.6vw, 54px)", lineHeight: 1.04 }}
          >
            Yerli bizneslər üçün qurulub
          </h2>
          <p className="mt-3 max-w-[600px] text-[16px] font-medium leading-relaxed text-foreground/64 sm:text-[17px]">
            Sadə, sürətli və tam sənin. Foundrr fikirdən yayıma qədər eyni
            sakit sistemdə işləyir.
          </p>
        </Reveal>

        <div className="mt-10 grid overflow-hidden rounded-[20px] border border-border bg-background/78 shadow-[0_18px_54px_-48px_hsl(var(--foreground)/0.32)] sm:grid-cols-2 lg:grid-cols-4">
          {ITEMS.map((item, index) => (
            <Reveal
              key={item.label}
              delay={index * 70}
              className="min-h-[178px] border-border p-6 even:bg-card/34 sm:border-l sm:first:border-l-0 lg:min-h-[204px]"
            >
              <h3 className="text-[17px] font-semibold tracking-tight text-foreground">
                {item.label}
              </h3>
              <p className="mt-3 text-[14.5px] font-medium leading-relaxed text-muted-foreground">
                {item.body}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
