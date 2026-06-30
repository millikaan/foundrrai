"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { ArrowUp, ChevronDown, Mic, Plus } from "lucide-react";

import { Chip } from "@/components/ui/chip";
import { cn } from "@/lib/utils";

const PLACEHOLDERS = [
  "restoran saytı yarat",
  "diş klinikası üçün landing səhifə hazırla",
  "gül mağazası üçün çatdırılma saytı qur",
  "fitnes klubu üçün vebsayt dizayn et",
  "rent-a-car üçün rezervasiya saytı yarat",
  "barbershop üçün onlayn qeydiyyat səhifəsi",
];

const CHIPS: ReadonlyArray<{ label: string; prompt: string }> = [
  { label: "Diş klinikası", prompt: "Bakıda müasir diş klinikası üçün sayt" },
  { label: "Gül mağazası", prompt: "Gül mağazası üçün çatdırılma ilə sayt" },
  { label: "Restoran", prompt: "Restoran üçün menyu və rezervasiya saytı" },
  { label: "Rent-a-car", prompt: "Rent-a-car şirkəti üçün icarə saytı" },
  { label: "Barbershop", prompt: "Barbershop üçün onlayn qeydiyyatlı sayt" },
];

/** sessionStorage key the workspace reads to auto-run the first prompt after signup. */
export const PROMPT_STORAGE_KEY = "foundrr:prompt";

export function PromptBox({
  showChips = true,
  variant = "default",
}: {
  showChips?: boolean;
  variant?: "default" | "hero";
} = {}) {
  const router = useRouter();
  const [value, setValue] = React.useState("");
  const [typed, setTyped] = React.useState("");
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  // Typewriter placeholder: type an idea, pause, delete it, type the next — looping.
  React.useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const timer = window.setTimeout(() => setTyped(PLACEHOLDERS[0]), 0);
      return () => window.clearTimeout(timer);
    }
    let phrase = 0;
    let char = 0;
    let deleting = false;
    let timer: number;
    const tick = () => {
      const full = PLACEHOLDERS[phrase];
      if (!deleting) {
        char += 1;
        setTyped(full.slice(0, char));
        if (char >= full.length) {
          deleting = true;
          timer = window.setTimeout(tick, 1600); // hold the full idea
          return;
        }
        timer = window.setTimeout(tick, 45 + Math.random() * 45);
      } else {
        char -= 1;
        setTyped(full.slice(0, char));
        if (char <= 0) {
          deleting = false;
          phrase = (phrase + 1) % PLACEHOLDERS.length;
          timer = window.setTimeout(tick, 380); // pause before the next idea
          return;
        }
        timer = window.setTimeout(tick, 24 + Math.random() * 26);
      }
    };
    timer = window.setTimeout(tick, 700);
    return () => window.clearTimeout(timer);
  }, []);

  const submit = React.useCallback(() => {
    if (typeof window !== "undefined") {
      const trimmed = value.trim();
      window.sessionStorage.setItem(PROMPT_STORAGE_KEY, trimmed);
      // Also a short-lived cookie: an email magic-link opens a NEW tab, where
      // sessionStorage (per-tab) is empty — the cookie carries the idea across.
      document.cookie = `foundrr_prompt=${encodeURIComponent(trimmed)}; path=/; max-age=1800; samesite=lax`;
    }
    // Land straight in the builder so the prompt auto-runs after signup (no extra click).
    router.push("/signup?intent=build&next=/workspace/build");
  }, [router, value]);

  const onKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      submit();
    }
  };

  const fillFromChip = (prompt: string) => {
    setValue(prompt);
    textareaRef.current?.focus();
  };

  const isHero = variant === "hero";

  return (
    <div className="w-full">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          submit();
        }}
        className={cn(
          "relative mx-auto flex max-w-full flex-col text-left transition-all duration-300",
          isHero
            ? "w-full rounded-[32px] border border-black/[0.05] bg-white p-5 shadow-[0_4px_24px_-4px_hsl(var(--foreground)/0.08),0_12px_48px_-16px_hsl(var(--foreground)/0.12)] focus-within:border-black/[0.07] focus-within:shadow-[0_4px_28px_-4px_hsl(var(--foreground)/0.1),0_16px_56px_-16px_hsl(var(--foreground)/0.14)] dark:border-white/10 dark:bg-card dark:shadow-[0_8px_40px_-12px_hsl(0_0%_0%/0.45)] sm:p-6"
            : "flex-col rounded-[28px] border border-border bg-background/94 p-3.5 shadow-[0_22px_70px_-38px_hsl(var(--primary)/0.55),0_1px_0_hsl(var(--background)/0.9)_inset] backdrop-blur-xl focus-within:border-primary/45 focus-within:shadow-[0_26px_80px_-38px_hsl(var(--primary)/0.64),0_0_0_4px_hsl(var(--primary)/0.08)] sm:w-full sm:max-w-[760px] sm:p-5 w-[270px]",
        )}
      >
        <label htmlFor="foundrr-prompt" className="sr-only">
          Biznesini bir cümlə ilə təsvir et
        </label>

        <div
          className={cn(
            "relative px-0.5",
            isHero ? "min-h-[64px] sm:min-h-[72px]" : "min-h-[76px] px-1.5 pt-1 sm:min-h-[112px]",
          )}
        >
          {value.length === 0 && typed.length > 0 ? (
            <span
              aria-hidden
              className={cn(
                "pointer-events-none absolute left-0.5 top-0 text-[16px] text-muted-foreground sm:text-[17px]",
                isHero && "font-normal",
              )}
            >
              {isHero ? (
                <>
                  <span className="text-foreground/75">Foundrr-dən </span>
                  {typed}
                </>
              ) : (
                typed
              )}
            </span>
          ) : null}

          <textarea
            id="foundrr-prompt"
            ref={textareaRef}
            rows={isHero ? 1 : 2}
            value={value}
            onChange={(event) => setValue(event.target.value)}
            onKeyDown={onKeyDown}
            spellCheck={false}
            autoComplete="off"
            data-gramm="false"
            data-gramm_editor="false"
            data-enable-grammarly="false"
            className={cn(
              "block w-full resize-none bg-transparent leading-relaxed text-foreground outline-none placeholder:text-transparent",
              isHero
                ? "min-h-[64px] pt-0.5 text-[16px] font-normal sm:min-h-[72px] sm:text-[17px]"
                : "text-[16px] font-medium sm:text-[17px]",
            )}
          />
        </div>

        <div className={cn("flex items-center justify-between gap-2", isHero ? "mt-3" : "mt-1")}>
          <button
            type="button"
            aria-label="Əlavə et"
            tabIndex={-1}
            className="flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-black/[0.04] hover:text-foreground dark:hover:bg-white/10"
          >
            <Plus className="h-4 w-4" />
          </button>

          <div className="flex items-center gap-1.5 sm:gap-2">
            {isHero ? (
              <button
                type="button"
                tabIndex={-1}
                className="hidden items-center gap-1 rounded-full px-3 py-1.5 text-[13px] font-medium text-muted-foreground transition-colors hover:bg-black/[0.04] hover:text-foreground sm:inline-flex dark:hover:bg-white/10"
              >
                Qur
                <ChevronDown className="h-3.5 w-3.5 opacity-60" />
              </button>
            ) : null}
            <button
              type="button"
              aria-label="Səslə yaz"
              tabIndex={-1}
              className="flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-black/[0.04] hover:text-foreground dark:hover:bg-white/10"
            >
              <Mic className="h-4 w-4" />
            </button>
            <button
              type="submit"
              aria-label="Saytı qur"
              className={cn(
                "flex items-center justify-center rounded-full transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                isHero
                  ? "h-9 w-9 bg-foreground text-background hover:opacity-90 sm:h-10 sm:w-10"
                  : "h-10 w-10 bg-primary text-primary-foreground shadow-[0_8px_18px_-10px_hsl(var(--primary)/0.9)] hover:-translate-y-0.5 hover:bg-[hsl(var(--primary-hover))]",
              )}
            >
              <ArrowUp className={isHero ? "h-4 w-4 sm:h-5 sm:w-5" : "h-5 w-5"} />
            </button>
          </div>
        </div>
      </form>

      {showChips ? (
        <div className="mx-auto mt-4 flex flex-wrap items-center justify-center gap-2 sm:mt-5">
          {CHIPS.map((chip) => (
            <Chip
              key={chip.label}
              label={chip.label}
              onClick={() => fillFromChip(chip.prompt)}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
