"use client";

import { ArrowLeft, Check, History, Loader2 } from "lucide-react";

import type { Phase } from "@/lib/workspace/build-session";
import { RotatingLabel } from "@/components/workspace/build-log";

/** Live "what it's doing right now" status lines, cycled by RotatingLabel. */
const CANVAS_STEPS = [
  "Layihə hazırlanır…",
  "Paketlər yüklənir…",
  "Komponentlər yazılır…",
  "Bölmələr birləşdirilir…",
  "Stil tətbiq olunur…",
  "Şəkillər yerləşdirilir…",
  "Son toxunuşlar…",
];

/**
 * The "generating" canvas — a calm, spacious card that matches the Publish
 * modal's aesthetic: a centered rounded-2xl panel with a soft icon chip, a
 * title, and roomy cards. It keeps the browser-chrome tab visuals, a gradient
 * progress bar, and a live status line of what's happening right now.
 *
 * Phase-aware:
 *  • "plan"  → calmly waits for the user to approve the plan.
 *  • else    → shows the live build with the gradient bar + rotating status.
 */
export function BuildingCanvas({ phase }: { phase: Phase }) {
  const isPlan = phase === "plan";

  return (
    <div className="relative flex h-full items-center justify-center overflow-hidden p-6">
      <div
        className="bloom bloom-cta pointer-events-none absolute -z-10 h-[460px] w-[680px] opacity-50"
        aria-hidden
      />

      <div className="w-full max-w-[480px] overflow-hidden rounded-2xl border border-border bg-card shadow-[0_40px_120px_-40px_hsl(240_22%_13%/0.45)]">
        {/* browser chrome — the tab visuals */}
        <div className="flex items-center gap-2 border-b border-border bg-muted/40 px-4 py-3">
          <span className="flex gap-1.5">
            <span className="h-3 w-3 rounded-full bg-foreground/10" />
            <span className="h-3 w-3 rounded-full bg-foreground/10" />
            <span className="h-3 w-3 rounded-full bg-foreground/10" />
          </span>
          <span className="mx-auto flex h-6 w-1/2 items-center justify-center rounded-full bg-background text-[10px] font-medium text-muted-foreground">
            {isPlan ? "təsdiq gözlənilir" : "önizləmə hazırlanır"}
          </span>
          <span className="h-6 w-9" aria-hidden />
        </div>

        {/* spacious body — Publish-modal calm */}
        <div className="p-7">
          {/* header: icon chip + title */}
          <div className="flex items-center gap-3">
            <span className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              {isPlan ? (
                <>
                  <span
                    className="absolute inset-0 rounded-2xl bg-primary/20 animate-ping motion-reduce:hidden"
                    aria-hidden
                  />
                  <History className="relative h-5 w-5" />
                </>
              ) : (
                <Loader2 className="h-5 w-5 animate-spin" />
              )}
            </span>
            <div className="min-w-0">
              <h2 className="text-[18px] font-semibold tracking-tight">
                {isPlan ? "Təsdiqini gözləyirəm" : "Saytın qurulur"}
              </h2>
              <p className="text-[13px] text-muted-foreground">
                {isPlan
                  ? "Sol paneldə planı təsdiqlə."
                  : "Bu, bir neçə saniyə çəkə bilər."}
              </p>
            </div>
          </div>

          {isPlan ? (
            <>
              {/* what happens next — a calm 3-step path */}
              <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-[11px] font-medium">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-1 text-primary">
                  <Check className="h-3 w-3" strokeWidth={3} />
                  Plan hazır
                </span>
                <span className="h-px w-5 bg-border" />
                <span className="rounded-full bg-muted px-2.5 py-1 text-muted-foreground">
                  Sayt qurulur
                </span>
                <span className="h-px w-5 bg-border" />
                <span className="rounded-full bg-muted px-2.5 py-1 text-muted-foreground">
                  Canlı önizləmə
                </span>
              </div>

              {/* clear next action — approve on the left */}
              <div className="mt-6 flex items-center gap-3 rounded-2xl border border-primary/20 bg-primary/[0.05] p-4">
                <ArrowLeft className="nudge-left h-5 w-5 shrink-0 text-primary" />
                <p className="text-[13px] leading-relaxed text-foreground">
                  Sol paneldə{" "}
                  <span className="inline-flex items-center gap-1 rounded-md bg-foreground px-1.5 py-0.5 text-[11px] font-semibold text-background">
                    Bəli, qur
                  </span>{" "}
                  düyməsini bas — sayt dərhal qurulmağa başlayacaq.
                </p>
              </div>
            </>
          ) : (
            <>
              {/* live status card */}
              <div className="mt-5 rounded-2xl border border-border bg-muted/30 p-5">
                <div className="flex items-center gap-2.5 text-[13.5px] font-medium text-foreground">
                  <Loader2 className="h-4 w-4 shrink-0 animate-spin text-primary" />
                  {phase === "building" ? (
                    <RotatingLabel steps={CANVAS_STEPS} />
                  ) : (
                    <span>Plan hazırlanır…</span>
                  )}
                </div>

                {/* gradient progress bar */}
                <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-border/70">
                  <div
                    className="h-full w-2/5 rounded-full bg-gradient-to-r from-[hsl(var(--grad-blue))] via-[hsl(var(--grad-violet))] to-[hsl(var(--grad-pink))]"
                    style={{ animation: "build-shimmer 1.6s ease-in-out infinite" }}
                  />
                </div>
              </div>

              <p className="mt-4 text-center text-[12px] leading-relaxed text-muted-foreground">
                Önizləmə avtomatik açılacaq — gözləmək lazım deyil.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
