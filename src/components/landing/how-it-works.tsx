"use client";

import * as React from "react";
import { ArrowUp, Check, Globe2, Loader2, Sparkles, Wand2 } from "lucide-react";

import { cn } from "@/lib/utils";
import { Reveal } from "./reveal";

const PHASES = [
  {
    title: "Fikir yazılır",
    body: "Bir cümləlik ideya Foundrr-a verilir.",
  },
  {
    title: "Foundrr işə düşür",
    body: "Sahə, dil və lazım olan bölmələr oxunur.",
  },
  {
    title: "Sayt hazırlanır",
    body: "Məzmun, struktur və dizayn eyni anda yığılır.",
  },
  {
    title: "Sayt yaradıldı",
    body: "Hazır nəticəni önizlə və öz hesabında yayımla.",
  },
] as const;

const PROMPT = "Gözəllik salonu üçün onlayn növbə saytı";
const CYCLE_MS = 3000;

export function HowItWorks() {
  const [active, setActive] = React.useState(0);
  const [typed, setTyped] = React.useState("");
  const reduceMotion = React.useRef(false);

  React.useEffect(() => {
    reduceMotion.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion.current) {
      setActive(3);
      setTyped(PROMPT);
    }
  }, []);

  React.useEffect(() => {
    if (reduceMotion.current) return;

    const timer = window.setTimeout(() => {
      setActive((current) => (current + 1) % PHASES.length);
    }, CYCLE_MS);

    return () => window.clearTimeout(timer);
  }, [active]);

  React.useEffect(() => {
    if (active !== 0) {
      setTyped(PROMPT);
      return;
    }

    setTyped("");
    let char = 0;
    const timer = window.setInterval(() => {
      char += 1;
      setTyped(PROMPT.slice(0, char));
      if (char >= PROMPT.length) {
        window.clearInterval(timer);
      }
    }, 42);

    return () => window.clearInterval(timer);
  }, [active]);

  return (
    <section
      id="how"
      className="relative overflow-hidden px-5 py-20 sm:px-6 sm:py-24 lg:py-28"
    >
      <div className="dot-grid pointer-events-none absolute inset-x-0 top-0 h-[520px] opacity-18" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-20 mx-auto h-56 max-w-[860px] rounded-[100%] bg-[radial-gradient(60%_70%_at_50%_50%,hsl(var(--primary)/0.13),transparent_72%)] blur-2xl"
      />

      <div className="relative mx-auto max-w-[1120px]">
        <Reveal className="mx-auto max-w-[680px] text-center">
          <h2
            className="text-balance font-semibold tracking-tight text-foreground"
            style={{ fontSize: "clamp(34px, 4.5vw, 56px)", lineHeight: 1.04 }}
          >
            Foundrr ilə <span className="text-aurora">tanış ol</span>
          </h2>
          <p className="mx-auto mt-4 max-w-[540px] text-[16px] font-medium leading-relaxed text-foreground/62">
            Bir fikir yazılır, Foundrr onu anlayır, sayt hazırlanır və sonda
            canlı nəticə yaranır.
          </p>
        </Reveal>

        <Reveal className="mt-12">
          <div className="relative overflow-hidden rounded-[32px] border border-border/80 bg-background/78 p-3 shadow-[0_34px_100px_-76px_hsl(var(--foreground)/0.42),0_1px_0_hsl(var(--background)/0.9)_inset] backdrop-blur-sm sm:p-4">
            <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
              {PHASES.map((phase, index) => (
                <button
                  key={phase.title}
                  type="button"
                  aria-current={active === index}
                  onClick={() => setActive(index)}
                  onMouseEnter={() => setActive(index)}
                  className={cn(
                    "rounded-2xl border p-2.5 text-left transition-all duration-300 sm:p-3",
                    active === index
                      ? "border-primary/30 bg-primary/8 shadow-[0_16px_34px_-30px_hsl(var(--primary)/0.65)]"
                      : "border-transparent bg-background/45 hover:border-border hover:bg-background/75",
                  )}
                >
                  <span className="flex items-center gap-2">
                    <span
                      className={cn(
                        "flex h-8 w-8 items-center justify-center rounded-full border font-mono text-[11px] font-semibold",
                        active === index
                          ? "border-primary/25 bg-primary/10 text-primary"
                          : "border-border bg-background text-muted-foreground",
                      )}
                    >
                      0{index + 1}
                    </span>
                    <span className="text-[13px] font-semibold text-foreground">
                      {phase.title}
                    </span>
                  </span>
                  <span className="mt-2 hidden text-[12px] font-medium leading-relaxed text-foreground/55 sm:block">
                    {phase.body}
                  </span>
                </button>
              ))}
            </div>

            <div className="mt-3 grid gap-3 lg:grid-cols-[0.8fr_1.2fr]">
              <div className="order-2 rounded-[26px] border border-border bg-background/80 p-5 sm:p-6 lg:order-1">
                <p className="text-[13px] font-semibold uppercase tracking-[0.16em] text-primary/80">
                  Canlı axın
                </p>
                <h3 className="mt-4 text-[30px] font-semibold leading-none tracking-tight text-foreground sm:text-[36px]">
                  {PHASES[active].title}
                </h3>
                <p className="mt-4 text-[15px] font-medium leading-relaxed text-foreground/62">
                  {PHASES[active].body}
                </p>

                <div className="mt-7 grid gap-2">
                  {PHASES.map((phase, index) => (
                    <div
                      key={phase.title}
                      className={cn(
                        "flex items-center gap-3 rounded-2xl border px-3 py-2.5 transition-all duration-300",
                        active === index
                          ? "border-primary/25 bg-primary/8 text-foreground"
                          : active > index
                            ? "border-transparent bg-primary/5 text-foreground/70"
                            : "border-border/70 bg-background text-foreground/45",
                      )}
                    >
                      <span
                        className={cn(
                          "flex h-7 w-7 items-center justify-center rounded-full",
                          active > index
                            ? "bg-primary text-primary-foreground"
                            : active === index
                              ? "bg-primary/10 text-primary"
                              : "bg-muted text-muted-foreground",
                        )}
                      >
                        {active > index ? (
                          <Check className="h-3.5 w-3.5" />
                        ) : active === index ? (
                          <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        ) : (
                          <span className="h-1.5 w-1.5 rounded-full bg-current" />
                        )}
                      </span>
                      <span className="text-[13px] font-semibold">
                        {phase.title}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="order-1 relative min-h-[430px] overflow-hidden rounded-[26px] border border-border bg-[linear-gradient(180deg,hsl(var(--background)),hsl(var(--muted)/0.55))] p-4 sm:p-5 lg:order-2">
                <AnimatedPanel active={active} typed={typed} />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function AnimatedPanel({ active, typed }: { active: number; typed: string }) {
  return (
    <div className="relative h-full min-h-[390px]">
      <PhaseLayer active={active === 0}>
        <PromptStage typed={typed} />
      </PhaseLayer>
      <PhaseLayer active={active === 1}>
        <CallStage />
      </PhaseLayer>
      <PhaseLayer active={active === 2}>
        <BuildStage />
      </PhaseLayer>
      <PhaseLayer active={active === 3}>
        <CreatedStage />
      </PhaseLayer>
    </div>
  );
}

function PhaseLayer({
  active,
  children,
}: {
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "absolute inset-0 transition-all duration-500 ease-out",
        active
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0",
      )}
    >
      {children}
    </div>
  );
}

function PromptStage({ typed }: { typed: string }) {
  return (
    <div className="flex h-full min-h-[390px] items-center justify-center">
      <div className="w-full max-w-[560px] rounded-[28px] border border-border bg-background p-5 shadow-[0_24px_70px_-54px_hsl(var(--primary)/0.55)]">
        <div className="min-h-[132px] rounded-2xl border border-border bg-muted/35 p-5">
          <p className="text-[18px] font-semibold leading-relaxed text-foreground/78">
            {typed}
          </p>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground">
            <Sparkles className="h-4 w-4 text-primary" />
          </span>
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-[0_12px_22px_-14px_hsl(var(--primary)/0.9)]">
            <ArrowUp className="h-5 w-5" />
          </span>
        </div>
      </div>
    </div>
  );
}

function CallStage() {
  return (
    <div className="flex h-full min-h-[390px] items-center justify-center">
      <div className="w-full max-w-[560px] rounded-[28px] border border-border bg-background p-5 shadow-[0_24px_70px_-54px_hsl(var(--primary)/0.55)]">
        <div className="flex items-center gap-3">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Wand2 className="h-5 w-5" />
          </span>
          <div>
            <p className="text-[18px] font-semibold text-foreground">
              Foundrr işə düşdü
            </p>
            <p className="mt-1 text-[13px] font-medium text-foreground/55">
              Sorğu qəbul edildi və analiz başladı
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          {["Sahə", "Dil", "Bölmələr"].map((item, index) => (
            <div
              key={item}
              className="rounded-2xl border border-border bg-muted/30 p-4 text-center"
            >
              <span
                className={cn(
                  "mx-auto block h-3 w-3 rounded-full bg-primary",
                  index === 1 && "animate-pulse",
                )}
              />
              <p className="mt-3 text-[13px] font-semibold text-foreground/70">
                {item} tanındı
              </p>
            </div>
          ))}
        </div>

        <div className="mt-6 rounded-2xl border border-primary/20 bg-primary/7 p-4">
          <p className="text-[14px] font-semibold text-primary">
            Gözəllik salonu üçün uyğun sayt strukturu seçilir
          </p>
        </div>
      </div>
    </div>
  );
}

function BuildStage() {
  return (
    <div className="flex h-full min-h-[390px] items-center justify-center">
      <div className="w-full max-w-[600px] rounded-[28px] border border-border bg-background p-5 shadow-[0_24px_70px_-54px_hsl(var(--primary)/0.55)]">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
          <div
            className="flex h-28 w-28 shrink-0 items-center justify-center rounded-full"
            style={{
              background:
                "conic-gradient(hsl(var(--primary)) 0 76%, hsl(var(--muted)) 76% 100%)",
            }}
          >
            <div className="flex h-[88px] w-[88px] items-center justify-center rounded-full bg-background text-[24px] font-semibold text-primary">
              76%
            </div>
          </div>
          <div>
            <p className="text-[24px] font-semibold tracking-tight text-foreground">
              Sayt hazırlanır
            </p>
            <p className="mt-2 max-w-[340px] text-[14px] font-medium leading-relaxed text-foreground/60">
              Foundrr mətnləri, bölmələri və vizual üslubu eyni axında yığır.
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {["Ana səhifə", "Xidmətlər", "Randevu", "Əlaqə"].map((item, index) => (
            <div
              key={item}
              className="flex items-center justify-between rounded-2xl border border-border bg-muted/30 p-4"
            >
              <span className="text-[14px] font-semibold text-foreground/70">
                {item}
              </span>
              {index < 3 ? (
                <Check className="h-4 w-4 text-primary" />
              ) : (
                <Loader2 className="h-4 w-4 animate-spin text-primary" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CreatedStage() {
  return (
    <div className="flex h-full min-h-[390px] items-center justify-center">
      <div className="w-full max-w-[620px] overflow-hidden rounded-[28px] border border-border bg-background shadow-[0_24px_70px_-54px_hsl(var(--primary)/0.55)]">
        <div className="flex items-center justify-between border-b border-border bg-muted/35 px-4 py-3">
          <span className="inline-flex items-center gap-2 text-[13px] font-semibold text-primary">
            <Globe2 className="h-4 w-4" />
            artandsmile.az
          </span>
          <span className="rounded-full bg-primary/10 px-3 py-1 text-[12px] font-semibold text-primary">
            Yaradıldı
          </span>
        </div>

        <div className="relative overflow-hidden p-5">
          <div className="rounded-3xl bg-[linear-gradient(135deg,hsl(var(--foreground))_0%,hsl(var(--foreground)/0.78)_58%,hsl(var(--primary)/0.75)_100%)] p-6 text-background">
            <p className="text-[13px] font-semibold text-background/70">
              Gözəllik salonu
            </p>
            <h4 className="mt-10 max-w-[360px] text-[34px] font-semibold leading-none tracking-tight">
              Gözəlliyiniz üçün hazır sayt
            </h4>
            <div className="mt-8 inline-flex rounded-full bg-background px-4 py-2 text-[13px] font-semibold text-foreground">
              Canlı önizlə
            </div>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {["Hero", "Xidmətlər", "Online növbə"].map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-border bg-muted/30 p-4 text-[13px] font-semibold text-foreground/70"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
