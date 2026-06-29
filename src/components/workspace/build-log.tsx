"use client";

import * as React from "react";
import { Check, FileCode2, Loader2 } from "lucide-react";

import { FoundrrLogoMark } from "@/components/brand/foundrr-logo";
import type { Block } from "@/lib/workspace/build-session";
import { cn } from "@/lib/utils";

const BUILD_STEPS = [
  "Layihə strukturu qurulur…",
  "Komponentlər yazılır…",
  "Məzmun və mətnlər doldurulur…",
  "Stil sistemi tətbiq olunur…",
  "Form və əlaqə bölməsi bağlanır…",
  "Son yoxlama…",
];

const EDIT_STEPS = [
  "Dəyişiklik analiz olunur…",
  "Uyğun fayllar tapılır…",
  "Kod yenilənir…",
  "Yoxlanılır…",
];

/** Granular "agent is working" activity that streams in while the build runs. */
const BUILD_ACTIVITY = [
  "Layihə strukturu hazırlanır…",
  "package.json və asılılıqlar yazılır…",
  "Vite + Tailwind konfiqurasiya olunur…",
  "Dizayn sistemi və rənglər seçilir…",
  "Header və naviqasiya yaradılır…",
  "Hero bölməsi yazılır…",
  "Xidmətlər bölməsi qurulur…",
  "Qalereya və şəkillər əlavə olunur…",
  "Rəylər və sosial sübut…",
  "Qiymətlər və paketlər…",
  "Əlaqə / rezervasiya forması bağlanır…",
  "Stil sistemi tətbiq olunur…",
  "Responsiv düzən yoxlanılır…",
  "Son toxunuşlar…",
];

const EDIT_ACTIVITY = [
  "İstək analiz olunur…",
  "Uyğun fayllar tapılır…",
  "Dəyişiklik tətbiq olunur…",
  "Yoxlanılır…",
];

/** Cycles through status lines while work is in flight (the "thinking" feel). */
export function RotatingLabel({ steps }: { steps: string[] }) {
  const [index, setIndex] = React.useState(0);
  React.useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % steps.length);
    }, 1700);
    return () => clearInterval(timer);
  }, [steps.length]);
  return <span>{steps[index]}</span>;
}

/** A live, streaming feed of build actions — keeps the agent feeling busy. */
function ActivityFeed({ steps }: { steps: string[] }) {
  const [count, setCount] = React.useState(1);
  React.useEffect(() => {
    const timer = setInterval(() => {
      setCount((c) => Math.min(c + 1, steps.length));
    }, 3200);
    return () => clearInterval(timer);
  }, [steps.length]);

  const start = Math.max(0, count - 4);
  const shown = steps.slice(start, count);

  return (
    <ul className="mt-3 space-y-1.5">
      {shown.map((step, i) => {
        const isLast = i === shown.length - 1;
        return (
          <li
            key={step}
            className="flex items-center gap-2 text-[12px]"
            style={{ animation: "fade-up 0.3s ease both" }}
          >
            {isLast ? (
              <Loader2 className="h-3.5 w-3.5 shrink-0 animate-spin text-primary" />
            ) : (
              <Check className="h-3.5 w-3.5 shrink-0 text-primary" />
            )}
            <span className={isLast ? "text-foreground/80" : "text-muted-foreground"}>
              {step}
            </span>
          </li>
        );
      })}
    </ul>
  );
}

/** Renders a build or edit block: animated activity while running, then files + line counts. */
export function BuildLog({ block }: { block: Block }) {
  if (block.type !== "build" && block.type !== "edit") return null;

  const isEdit = block.type === "edit";
  const running = !block.done;
  const total = block.files.length;
  const shown = block.files.slice(0, block.revealed);
  const waiting = running && total === 0;

  return (
    <div className="rounded-2xl border border-border bg-card p-3.5">
      <div className="flex items-center gap-2 text-[13px] font-medium">
        {running ? (
          <span className="relative flex h-5 w-5 shrink-0 items-center justify-center">
            <FoundrrLogoMark size={20} className="absolute inset-0" />
            <Loader2 className="relative h-3 w-3 animate-spin text-white" />
          </span>
        ) : (
          <Check className="h-3.5 w-3.5 text-primary" />
        )}
        {running ? (
          <RotatingLabel steps={isEdit ? EDIT_STEPS : BUILD_STEPS} />
        ) : (
          <span>
            {total} fayl {isEdit ? "yeniləndi" : "yazıldı"}
          </span>
        )}
      </div>

      {/* indeterminate progress shimmer while running */}
      {running ? (
        <div className="mt-2.5 h-1 overflow-hidden rounded-full bg-border/70">
          <div
            className="h-full w-1/3 rounded-full bg-gradient-to-r from-[hsl(var(--grad-blue))] via-[hsl(var(--grad-violet))] to-[hsl(var(--grad-pink))]"
            style={{ animation: "build-shimmer 1.5s ease-in-out infinite" }}
          />
        </div>
      ) : null}

      {/* while waiting for generation → a live activity stream; once files arrive → the real list */}
      {waiting ? (
        <ActivityFeed steps={isEdit ? EDIT_ACTIVITY : BUILD_ACTIVITY} />
      ) : shown.length > 0 ? (
        <ul className="mt-2.5 space-y-1">
          {shown.map((file, i) => {
            const isWriting = running && i === shown.length - 1;
            return (
              <li
                key={file.path}
                className="flex items-center gap-2 font-mono text-[12px]"
                style={{ animation: "fade-up 0.25s ease both" }}
              >
                {isWriting ? (
                  <Loader2 className="h-3.5 w-3.5 shrink-0 animate-spin text-primary" />
                ) : (
                  <FileCode2 className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                )}
                <span className="min-w-0 flex-1 truncate text-foreground/80">
                  {file.path}
                </span>
                <span
                  className={cn(
                    "shrink-0 rounded px-1.5 py-0.5 text-[10px] font-medium tabular-nums",
                    file.kind === "new"
                      ? "bg-emerald-500/12 text-emerald-600"
                      : "bg-amber-500/12 text-amber-600",
                  )}
                >
                  {file.kind === "new" ? "+" : "~"}
                  {file.lines}
                </span>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
