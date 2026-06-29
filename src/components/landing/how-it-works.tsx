"use client";

import * as React from "react";
import { ArrowUp, Loader2, Paperclip, Plus } from "lucide-react";

import { cn } from "@/lib/utils";
import { Reveal } from "./reveal";

const STEPS = [
  {
    title: "Fikrini təsvir et",
    body: "Biznesini bir cümlə ilə təsvir et — Azərbaycan dilində, öz sözlərinlə.",
  },
  {
    title: "Canlı qurulmasına bax",
    body: "Foundrr ideyanı real vaxtda tam sayta çevirir — sən izlə, o qurur.",
  },
  {
    title: "Hazır sayt",
    body: "Tam sayt önizləmədə hazırdır — düzəliş et və öz hesabına yayımla.",
  },
] as const;

const PROMPT = "Gözəllik salonu üçün onlayn növbə saytı";

const SITE = {
  brand: "Art & Smile",
  tagline: "Gözəllik salonu",
  heroTitle: "Gözəlliyiniz üçün onlayn növbə",
  heroSub: "Saç, dırnaq və makiyaj xidmətləri — bir kliklə vaxt seçin.",
  cta: "Növbə al",
  services: [
    { name: "Saç stil", price: "35 ₼" },
    { name: "Manikür", price: "25 ₼" },
    { name: "Makiyaj", price: "45 ₼" },
  ],
  phone: "+994 12 408 75 30",
  address: "Nizami küç. 96, Bakı",
} as const;

const SAFETY_MS = [9000, 9000, 6500] as const;

/** 0 = empty … 8 = full site */
type BuildLevel = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export function HowItWorks() {
  const [active, setActive] = React.useState(0);
  const [paused, setPaused] = React.useState(false);
  const [reduceMotion, setReduceMotion] = React.useState(false);
  const [loopGen, setLoopGen] = React.useState(0);

  const advance = React.useCallback(() => {
    setActive((current) => {
      const next = (current + 1) % STEPS.length;
      if (current === STEPS.length - 1 && next === 0) {
        setLoopGen((generation) => generation + 1);
      }
      return next;
    });
  }, []);

  React.useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    setReduceMotion(prefersReduced);
    if (prefersReduced) setActive(STEPS.length - 1);
  }, []);

  React.useEffect(() => {
    if (reduceMotion || paused) return;
    const safety = window.setTimeout(advance, SAFETY_MS[active]);
    return () => window.clearTimeout(safety);
  }, [active, paused, reduceMotion, advance]);

  return (
    <section
      id="how"
      className="relative px-5 py-20 sm:px-6 sm:py-24 lg:py-28"
    >
      <div className="relative mx-auto max-w-[1120px]">
        <Reveal>
          <h2
            className="font-semibold tracking-tight text-foreground"
            style={{ fontSize: "clamp(36px, 5.2vw, 56px)", lineHeight: 1.04 }}
          >
            Necə işləyir
          </h2>
        </Reveal>

        <Reveal className="mt-10 lg:mt-14">
          <div
            className="grid items-start gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16 xl:gap-20"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <DemoPanel
              active={active}
              loopGen={loopGen}
              paused={paused}
              onPhaseComplete={advance}
            />
            <StepList active={active} onSelect={setActive} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function StepList({
  active,
  onSelect,
}: {
  active: number;
  onSelect: (index: number) => void;
}) {
  return (
    <ol className="flex flex-col lg:pt-2">
      {STEPS.map((step, index) => {
        const isActive = active === index;

        return (
          <li key={step.title}>
            <button
              type="button"
              aria-current={isActive}
              onClick={() => onSelect(index)}
              className="group w-full py-6 text-left sm:py-8"
            >
              <p
                className={cn(
                  "font-semibold tracking-[-0.025em] transition-colors duration-500",
                  isActive
                    ? "text-foreground"
                    : "text-foreground/44 group-hover:text-foreground/56",
                )}
                style={{
                  fontSize: "clamp(26px, 2.6vw, 36px)",
                  lineHeight: 1.14,
                }}
              >
                {step.title}
              </p>
              <p
                className={cn(
                  "mt-3 max-w-[380px] text-[16px] font-normal leading-[1.55] transition-colors duration-500 sm:text-[17px]",
                  isActive
                    ? "text-foreground"
                    : "text-foreground/44 group-hover:text-foreground/52",
                )}
              >
                {step.body}
              </p>
            </button>
          </li>
        );
      })}
    </ol>
  );
}

function DemoPanel({
  active,
  loopGen,
  paused,
  onPhaseComplete,
}: {
  active: number;
  loopGen: number;
  paused: boolean;
  onPhaseComplete: () => void;
}) {
  const completeRef = React.useRef(onPhaseComplete);
  completeRef.current = onPhaseComplete;

  const complete = React.useCallback(() => {
    if (!paused) completeRef.current();
  }, [paused]);

  return (
    <div className="rounded-[28px] bg-card/90 p-5 sm:p-7 lg:p-9">
      <div className="relative min-h-[340px] sm:min-h-[380px]">
        <Phase show={active === 0}>
          <PromptDemo
            key={`prompt-${loopGen}`}
            play={active === 0}
            onComplete={complete}
          />
        </Phase>
        <Phase show={active === 1}>
          <BuildDemo
            key={`build-${loopGen}`}
            play={active === 1}
            onComplete={complete}
          />
        </Phase>
        <Phase show={active === 2}>
          <FinishedDemo
            key={`finished-${loopGen}`}
            play={active === 2}
            onComplete={complete}
          />
        </Phase>
      </div>
    </div>
  );
}

function Phase({
  show,
  children,
}: {
  show: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "absolute inset-0 flex items-center justify-center transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
        show
          ? "z-10 translate-y-0 scale-100 opacity-100"
          : "pointer-events-none z-0 translate-y-3 scale-[0.98] opacity-0",
      )}
    >
      {children}
    </div>
  );
}

function PromptDemo({
  play,
  onComplete,
}: {
  play: boolean;
  onComplete: () => void;
}) {
  const [typed, setTyped] = React.useState("");
  const [ready, setReady] = React.useState(false);
  const [submitPulse, setSubmitPulse] = React.useState(false);
  const doneRef = React.useRef(false);
  const completeRef = React.useRef(onComplete);
  completeRef.current = onComplete;

  React.useEffect(() => {
    doneRef.current = false;
    if (!play) {
      setTyped("");
      setReady(false);
      setSubmitPulse(false);
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setTyped(PROMPT);
      setReady(true);
      const timer = window.setTimeout(() => completeRef.current(), 1200);
      return () => window.clearTimeout(timer);
    }

    setTyped("");
    setReady(false);
    let char = 0;
    let timer: ReturnType<typeof setTimeout>;

    const finish = () => {
      if (doneRef.current) return;
      doneRef.current = true;
      setSubmitPulse(true);
      window.setTimeout(() => setSubmitPulse(false), 550);
      timer = window.setTimeout(() => completeRef.current(), 900);
    };

    const tick = () => {
      char += 1;
      setTyped(PROMPT.slice(0, char));
      setReady(char > 8);

      if (char >= PROMPT.length) {
        finish();
        return;
      }

      timer = window.setTimeout(tick, 36 + Math.random() * 28);
    };

    timer = window.setTimeout(tick, 320);
    return () => window.clearTimeout(timer);
  }, [play]);

  return (
    <div className="demo-enter w-full max-w-[520px] rounded-[26px] border border-border/70 bg-background p-5 shadow-[0_1px_2px_hsl(var(--foreground)/0.04),0_24px_60px_-38px_hsl(var(--foreground)/0.2)] sm:p-6">
      <p className="min-h-[88px] text-[16px] font-medium leading-relaxed text-foreground/82 sm:min-h-[100px] sm:text-[17px]">
        {typed.length > 0 ? (
          <>
            {typed}
            <span className="cursor-blink ml-0.5 inline-block h-[18px] w-[2px] bg-primary align-middle" />
          </>
        ) : null}
      </p>

      <div className="mt-5 flex items-center justify-between gap-3">
        <div
          className={cn(
            "flex items-center gap-2 transition-all duration-500",
            ready ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0",
          )}
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background text-muted-foreground shadow-[0_1px_1px_hsl(var(--foreground)/0.04)]">
            <Plus className="h-4 w-4" />
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3.5 py-1.5 text-[13px] font-medium text-muted-foreground shadow-[0_1px_1px_hsl(var(--foreground)/0.04)]">
            <Paperclip className="h-3.5 w-3.5" />
            Əlavə et
          </span>
        </div>

        <span
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-full bg-foreground text-background shadow-[0_10px_24px_-14px_hsl(var(--foreground)/0.55)] transition-all duration-500",
            ready ? "translate-y-0 opacity-100" : "translate-y-1 opacity-40",
            submitPulse && "submit-pop",
          )}
        >
          <ArrowUp className="h-4 w-4" />
        </span>
      </div>
    </div>
  );
}

function BuildDemo({
  play,
  onComplete,
}: {
  play: boolean;
  onComplete: () => void;
}) {
  const [level, setLevel] = React.useState<BuildLevel>(0);
  const doneRef = React.useRef(false);
  const completeRef = React.useRef(onComplete);
  completeRef.current = onComplete;

  React.useEffect(() => {
    doneRef.current = false;
    if (!play) {
      setLevel(0);
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setLevel(8);
      const timer = window.setTimeout(() => completeRef.current(), 1200);
      return () => window.clearTimeout(timer);
    }

    setLevel(0);
    const delays = [180, 420, 720, 1050, 1350, 1750, 2150, 2550];
    const timers = delays.map((delay, index) =>
      window.setTimeout(() => setLevel((index + 1) as BuildLevel), delay),
    );
    const finish = window.setTimeout(() => {
      if (doneRef.current) return;
      doneRef.current = true;
      completeRef.current();
    }, 3800);

    return () => {
      timers.forEach(clearTimeout);
      window.clearTimeout(finish);
    };
  }, [play]);

  return (
    <PreviewFrame building className="demo-enter">
      <MockSite level={level} />
      <BuildStatus level={level} />
    </PreviewFrame>
  );
}

function FinishedDemo({
  play,
  onComplete,
}: {
  play: boolean;
  onComplete: () => void;
}) {
  const completeRef = React.useRef(onComplete);
  completeRef.current = onComplete;

  React.useEffect(() => {
    if (!play) return;
    const timer = window.setTimeout(() => completeRef.current(), 4200);
    return () => window.clearTimeout(timer);
  }, [play]);

  return (
    <PreviewFrame ready className="demo-enter">
      <MockSite level={8} polished />
    </PreviewFrame>
  );
}

function PreviewFrame({
  building = false,
  ready = false,
  className,
  children,
}: {
  building?: boolean;
  ready?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "w-full overflow-hidden rounded-[22px] border border-border/70 bg-background shadow-[0_1px_0_hsl(var(--background)/0.9)_inset,0_32px_90px_-52px_hsl(var(--foreground)/0.3)]",
        className,
      )}
    >
      <BrowserChrome building={building} ready={ready} />

      <div className="relative aspect-[4/3] w-full min-h-[260px] overflow-hidden bg-[hsl(var(--preview-canvas))] sm:min-h-[300px]">
        {children}
      </div>
    </div>
  );
}

function BrowserChrome({
  building = false,
  ready = false,
}: {
  building?: boolean;
  ready?: boolean;
}) {
  return (
    <div className="flex items-center justify-between border-b border-border/60 bg-[hsl(var(--preview-chrome))] px-4 py-3">
      <div className="flex items-center gap-1.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]/90" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]/90" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]/90" />
      </div>

      <span className="text-[11px] font-medium tracking-wide text-muted-foreground">
        Önizləmə
      </span>

      <span className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-background px-2.5 py-1 text-[10px] font-semibold text-muted-foreground">
        <span
          className={cn(
            "h-1.5 w-1.5 rounded-full",
            ready
              ? "bg-[#28c840]"
              : building
                ? "animate-pulse bg-primary"
                : "bg-muted-foreground/40",
          )}
        />
        {ready ? "Hazır" : building ? "Qurulur" : "Gözləyir"}
      </span>
    </div>
  );
}

function BuildStatus({ level }: { level: BuildLevel }) {
  const label =
    level <= 2
      ? "Məzmun yaradılır..."
      : level <= 5
        ? "Bölmələr əlavə olunur..."
        : "Son toxunuşlar...";

  if (level === 0 || level >= 8) return null;

  return (
    <div className="absolute bottom-4 left-4 z-20">
      <span className="inline-flex items-center gap-2 rounded-full bg-foreground/90 px-3.5 py-2 text-[12px] font-semibold text-background shadow-[0_14px_36px_-18px_hsl(var(--foreground)/0.6)] backdrop-blur-sm">
        <Loader2 className="h-3.5 w-3.5 animate-spin" />
        {label}
      </span>
    </div>
  );
}

function MockSite({
  level,
  polished = false,
}: {
  level: BuildLevel;
  polished?: boolean;
}) {
  const showNav = level >= 1;
  const showHero = level >= 2;
  const showHeroTitle = level >= 3;
  const showHeroSub = level >= 4;
  const showHeroCta = level >= 4;
  const showServices = level >= 5;
  const showBooking = level >= 6;
  const showContact = level >= 7;
  const showShimmer = level > 0 && level < 2;

  return (
    <div className="absolute inset-0 overflow-hidden">
      {showShimmer ? (
        <div
          aria-hidden
          className="build-shimmer-line pointer-events-none absolute inset-0 z-10 opacity-35"
        />
      ) : null}

      <div className="absolute inset-0 overflow-y-auto px-4 pb-5 pt-4 sm:px-5 sm:pt-5">
        {showNav ? (
          <header className={cn("mb-4 flex items-center justify-between", "mock-block-in")}>
            <div>
              <p className="text-[13px] font-semibold tracking-tight text-foreground">
                {SITE.brand}
              </p>
              <p className="text-[9px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
                {SITE.tagline}
              </p>
            </div>
            <nav className="flex gap-3">
              {["Xidmətlər", "Növbə", "Əlaqə"].map((link) => (
                <span
                  key={link}
                  className="text-[10px] font-medium text-foreground/55"
                >
                  {link}
                </span>
              ))}
            </nav>
          </header>
        ) : null}

        {showHero ? (
          <div
            className={cn(
              "relative overflow-hidden rounded-2xl bg-aurora mock-block-in",
              polished &&
                "shadow-[0_20px_50px_-28px_hsl(var(--primary)/0.55)] ring-1 ring-primary/10",
            )}
          >
            <div className="flex min-h-[112px] flex-col justify-end p-4 sm:min-h-[128px] sm:p-5">
              {showHeroTitle ? (
                <h3
                  className="mock-block-in max-w-[90%] text-[15px] font-semibold leading-snug text-background sm:text-[17px]"
                  style={{ animationDelay: "60ms" }}
                >
                  {SITE.heroTitle}
                </h3>
              ) : (
                <div className="h-4 w-[58%] rounded-full bg-background/30" />
              )}

              {showHeroSub ? (
                <p
                  className="mock-block-in mt-2 max-w-[85%] text-[10px] leading-relaxed text-background/88 sm:text-[11px]"
                  style={{ animationDelay: "120ms" }}
                >
                  {SITE.heroSub}
                </p>
              ) : showHeroTitle ? (
                <div className="mt-2.5 h-2.5 w-[70%] rounded-full bg-background/22" />
              ) : null}

              {showHeroCta ? (
                <span
                  className="mock-block-in mt-3 inline-flex w-fit rounded-full bg-background px-3.5 py-1.5 text-[10px] font-semibold text-foreground shadow-sm sm:text-[11px]"
                  style={{ animationDelay: "180ms" }}
                >
                  {SITE.cta}
                </span>
              ) : null}
            </div>
          </div>
        ) : null}

        {showServices ? (
          <section className="mock-block-in mt-4" style={{ animationDelay: "40ms" }}>
            <p className="mb-2.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              Xidmətlər
            </p>
            <div className="grid grid-cols-3 gap-2">
              {SITE.services.map((service) => (
                <div
                  key={service.name}
                  className="rounded-xl border border-border/60 bg-background p-2.5 shadow-[0_1px_2px_hsl(var(--foreground)/0.04)] sm:p-3"
                >
                  <div className="mb-2 h-7 w-7 rounded-lg bg-primary/12" />
                  <p className="text-[10px] font-semibold text-foreground/85 sm:text-[11px]">
                    {service.name}
                  </p>
                  <p className="mt-0.5 text-[9px] font-medium text-primary sm:text-[10px]">
                    {service.price}
                  </p>
                </div>
              ))}
            </div>
          </section>
        ) : null}

        {showBooking ? (
          <section
            className="mock-block-in mt-3 rounded-xl border border-border/60 bg-background p-3 shadow-[0_1px_2px_hsl(var(--foreground)/0.04)] sm:mt-4 sm:p-3.5"
            style={{ animationDelay: "40ms" }}
          >
            <p className="text-[11px] font-semibold text-foreground">Onlayn növbə</p>
            <div className="mt-2.5 space-y-2">
              <div className="h-7 rounded-lg border border-border/50 bg-muted/30 px-2.5 py-1.5 text-[9px] text-muted-foreground">
                Ad, soyad
              </div>
              <div className="h-7 rounded-lg border border-border/50 bg-muted/30 px-2.5 py-1.5 text-[9px] text-muted-foreground">
                Tarix və saat
              </div>
            </div>
            <div className="mt-2.5 inline-flex rounded-full bg-primary px-3 py-1 text-[10px] font-semibold text-primary-foreground">
              Təsdiqlə
            </div>
          </section>
        ) : null}

        {showContact ? (
          <section
            className="mock-block-in mt-3 space-y-1 sm:mt-4"
            style={{ animationDelay: "40ms" }}
          >
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              Əlaqə
            </p>
            <p className="text-[10px] text-foreground/70 sm:text-[11px]">{SITE.address}</p>
            <p className="text-[10px] font-medium text-foreground/80 sm:text-[11px]">
              {SITE.phone}
            </p>
          </section>
        ) : null}
      </div>
    </div>
  );
}
