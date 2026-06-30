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
      className="relative bg-[#faf9f7] px-5 py-20 sm:px-6 sm:py-24 lg:py-28 dark:bg-background"
    >
      <div className="relative mx-auto max-w-[1180px]">
        <Reveal>
          <h2
            className="font-semibold tracking-[-0.03em] text-foreground"
            style={{ fontSize: "clamp(36px, 5vw, 52px)", lineHeight: 1.06 }}
          >
            Foundrr ilə tanış ol
          </h2>
        </Reveal>

        <Reveal className="mt-10 lg:mt-12">
          <div
            className="grid items-stretch gap-10 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)] lg:gap-14 xl:gap-16"
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
    <ol className="flex flex-col justify-center lg:min-h-[440px] lg:pl-2 xl:min-h-[480px]">
      {STEPS.map((step, index) => {
        const isActive = active === index;

        return (
          <li key={step.title}>
            <button
              type="button"
              aria-current={isActive ? "step" : undefined}
              onClick={() => onSelect(index)}
              className="group w-full py-6 text-left sm:py-8 lg:py-9"
            >
              <p
                className={cn(
                  "font-semibold tracking-[-0.02em] transition-[color,opacity] duration-[650ms] ease-out",
                  isActive
                    ? "text-[#0a0a0a] dark:text-foreground"
                    : "text-[#848484] group-hover:text-[#767676] dark:text-foreground/50 dark:group-hover:text-foreground/58",
                )}
                style={{
                  fontSize: "clamp(30px, 3.4vw, 42px)",
                  lineHeight: 1.16,
                }}
              >
                {step.title}
              </p>
              <p
                className={cn(
                  "mt-2 max-w-[420px] text-[15px] font-normal leading-[1.6] transition-[color,opacity] duration-[650ms] ease-out sm:mt-2.5 sm:text-[16px]",
                  isActive
                    ? "text-[#1a1a1a] dark:text-foreground/92"
                    : "text-[#a8a8a8] group-hover:text-[#989898] dark:text-foreground/38 dark:group-hover:text-foreground/44",
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
    <div className="flex min-h-[380px] items-center justify-center rounded-[28px] bg-[#f3f2ef] p-5 sm:min-h-[420px] sm:p-7 lg:min-h-[460px] lg:p-8 xl:min-h-[500px] dark:bg-[hsl(var(--foreground)/0.04)]">
      <div className="relative w-full max-w-[560px]">
        <div className="relative min-h-[320px] sm:min-h-[360px]">
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
  const [visible, setVisible] = React.useState(false);
  const [sent, setSent] = React.useState(false);
  const [submitPulse, setSubmitPulse] = React.useState(false);
  const [sendRing, setSendRing] = React.useState(false);
  const doneRef = React.useRef(false);
  const completeRef = React.useRef(onComplete);
  completeRef.current = onComplete;

  const showToolbar = typed.length > 5;

  React.useEffect(() => {
    doneRef.current = false;
    if (!play) {
      setTyped("");
      setVisible(false);
      setSent(false);
      setSubmitPulse(false);
      setSendRing(false);
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      setTyped(PROMPT);
      const timer = window.setTimeout(() => completeRef.current(), 1200);
      return () => window.clearTimeout(timer);
    }

    setTyped("");
    setVisible(false);
    setSent(false);
    setSubmitPulse(false);
    setSendRing(false);

    let char = 0;
    let timer: number;

    const finish = () => {
      if (doneRef.current) return;
      doneRef.current = true;
      setSent(true);
      setSubmitPulse(true);
      setSendRing(true);
      window.setTimeout(() => setSubmitPulse(false), 550);
      timer = window.setTimeout(() => completeRef.current(), 1100);
    };

    const tick = () => {
      char += 1;
      setTyped(PROMPT.slice(0, char));

      if (char >= PROMPT.length) {
        finish();
        return;
      }

      timer = window.setTimeout(tick, 34 + Math.random() * 26);
    };

    const startTyping = window.setTimeout(() => {
      timer = window.setTimeout(tick, 280);
    }, 520);

    const showStage = window.setTimeout(() => setVisible(true), 120);

    return () => {
      window.clearTimeout(showStage);
      window.clearTimeout(startTyping);
      window.clearTimeout(timer);
    };
  }, [play]);

  return (
    <div className="relative mx-auto w-full max-w-[500px]">
      <div
        className={cn(
          "relative overflow-hidden rounded-[32px] bg-[#e8edf4] px-5 py-9 sm:px-7 sm:py-11 dark:bg-[hsl(var(--foreground)/0.07)]",
          visible && "preview-stage-in",
          !visible && "opacity-0",
        )}
      >
        <div
          aria-hidden
          className={cn("preview-aurora", visible && "preview-aurora-active")}
        />

        <div
          className={cn(
            "relative rounded-[22px] border border-black/[0.05] bg-white p-5 shadow-[0_2px_8px_-2px_hsl(var(--foreground)/0.06),0_20px_48px_-24px_hsl(var(--foreground)/0.18)] transition-shadow duration-500 dark:border-white/10 dark:bg-card sm:p-6",
            sent && "shadow-[0_4px_12px_-4px_hsl(var(--foreground)/0.08),0_28px_56px_-28px_hsl(var(--foreground)/0.22)]",
          )}
        >
          <p className="min-h-[72px] text-[15px] font-medium leading-[1.65] text-foreground/88 sm:min-h-[80px] sm:text-[16px]">
            {typed.length > 0 ? (
              <>
                {typed}
                {!sent ? (
                  <span className="cursor-blink ml-0.5 inline-block h-[17px] w-[2px] bg-primary align-middle" />
                ) : null}
              </>
            ) : visible ? (
              <span className="cursor-blink inline-block h-[17px] w-[2px] bg-primary align-middle" />
            ) : null}
          </p>

          <div className="mt-4 flex items-center justify-between gap-3 sm:mt-5">
            <div
              className={cn(
                "flex items-center gap-2 transition-opacity duration-300",
                !showToolbar && "pointer-events-none opacity-0",
              )}
            >
              <span
                className={cn(
                  "flex h-9 w-9 items-center justify-center rounded-full border border-black/[0.08] bg-white text-muted-foreground shadow-[0_1px_2px_hsl(var(--foreground)/0.04)] dark:border-white/10 dark:bg-background",
                  showToolbar && "prompt-tool-in",
                )}
                style={{ animationDelay: showToolbar ? "0ms" : undefined }}
              >
                <Plus className="h-4 w-4" />
              </span>
              <span
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full border border-black/[0.08] bg-white px-3.5 py-1.5 text-[13px] font-medium text-muted-foreground shadow-[0_1px_2px_hsl(var(--foreground)/0.04)] dark:border-white/10 dark:bg-background",
                  showToolbar && "prompt-tool-in",
                )}
                style={{ animationDelay: showToolbar ? "90ms" : undefined }}
              >
                <Paperclip className="h-3.5 w-3.5" />
                Əlavə et
              </span>
            </div>

            <span
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-full bg-[#0a0a0a] text-white shadow-[0_8px_20px_-10px_hsl(var(--foreground)/0.55)] transition-all duration-500 dark:bg-foreground dark:text-background",
                showToolbar ? "prompt-tool-in opacity-100" : "pointer-events-none opacity-0",
                submitPulse && "submit-pop",
                sendRing && "send-ring",
                sent && "scale-95 opacity-80",
              )}
              style={{ animationDelay: showToolbar ? "160ms" : undefined }}
            >
              <ArrowUp className="h-4 w-4" />
            </span>
          </div>
        </div>
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
    <PreviewFrame building showBuildBar className="demo-enter">
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
      {play ? (
        <div className="ready-badge-in pointer-events-none absolute bottom-5 left-1/2 z-20">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-foreground px-4 py-2 text-[12px] font-semibold text-background shadow-[0_12px_32px_-16px_hsl(var(--foreground)/0.55)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#28c840]" />
            Hazır — yayımla
          </span>
        </div>
      ) : null}
    </PreviewFrame>
  );
}

function PreviewFrame({
  building = false,
  ready = false,
  showBuildBar = false,
  className,
  children,
}: {
  building?: boolean;
  ready?: boolean;
  showBuildBar?: boolean;
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
      {showBuildBar ? (
        <div className="h-[3px] w-full bg-border/30">
          <div className="build-bar h-full rounded-r-full bg-primary/75" />
        </div>
      ) : null}

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
