"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { ArrowUp, Mic, Paperclip, Palette, Plus } from "lucide-react";

import { Chip } from "@/components/ui/chip";
import { cn } from "@/lib/utils";

const PLACEHOLDERS = [
  "Bakıda diş klinikası üçün sayt",
  "Gül mağazası üçün çatdırılma saytı",
  "Rent-a-car şirkəti üçün icarə saytı",
  "Restoran üçün menyu və rezervasiya saytı",
  "Gözəllik salonu üçün onlayn növbə saytı",
  "Onlayn geyim mağazası",
  "Fitnes klubu üçün sayt",
  "Kofe evi üçün vebsayt",
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
      const timer = setTimeout(() => setTyped(PLACEHOLDERS[0]), 0);
      return () => clearTimeout(timer);
    }
    let phrase = 0;
    let char = 0;
    let deleting = false;
    let timer: ReturnType<typeof setTimeout>;
    const tick = () => {
      const full = PLACEHOLDERS[phrase];
      if (!deleting) {
        char += 1;
        setTyped(full.slice(0, char));
        if (char >= full.length) {
          deleting = true;
          timer = setTimeout(tick, 1600); // hold the full idea
          return;
        }
        timer = setTimeout(tick, 45 + Math.random() * 45);
      } else {
        char -= 1;
        setTyped(full.slice(0, char));
        if (char <= 0) {
          deleting = false;
          phrase = (phrase + 1) % PLACEHOLDERS.length;
          timer = setTimeout(tick, 380); // pause before the next idea
          return;
        }
        timer = setTimeout(tick, 24 + Math.random() * 26);
      }
    };
    timer = setTimeout(tick, 700);
    return () => clearTimeout(timer);
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
          "relative mx-auto flex max-w-full flex-col rounded-[28px] border border-border bg-background/94 text-left shadow-[0_22px_70px_-38px_hsl(var(--primary)/0.55),0_1px_0_hsl(var(--background)/0.9)_inset] backdrop-blur-xl transition-all duration-300 focus-within:border-primary/45 focus-within:shadow-[0_26px_80px_-38px_hsl(var(--primary)/0.64),0_0_0_4px_hsl(var(--primary)/0.08)]",
          isHero
            ? "w-full max-w-[720px] rounded-[26px] border-border/70 bg-background p-5 shadow-[0_24px_80px_-48px_hsl(var(--foreground)/0.18),0_1px_0_hsl(var(--background)/0.96)_inset] sm:p-6"
            : "w-[270px] p-3.5 sm:w-full sm:max-w-[760px] sm:p-5",
        )}
      >
        <label htmlFor="foundrr-prompt" className="sr-only">
          Biznesini bir cümlə ilə təsvir et
        </label>

        <div
          className={cn(
            "relative min-h-[76px] px-1.5 pt-1 sm:min-h-[112px]",
            isHero && "min-h-[92px] sm:min-h-[96px]",
          )}
        >
          {value.length === 0 && typed.length > 0 ? (
            <span
              aria-hidden
              className={cn(
                "pointer-events-none absolute left-1.5 top-1 text-[16px] font-medium text-muted-foreground sm:text-[17px]",
                isHero && "sm:text-[17px]",
              )}
            >
              {typed}
            </span>
          ) : null}

          <textarea
            id="foundrr-prompt"
            ref={textareaRef}
            rows={2}
            value={value}
            onChange={(event) => setValue(event.target.value)}
            onKeyDown={onKeyDown}
            spellCheck={false}
            autoComplete="off"
            data-gramm="false"
            data-gramm_editor="false"
            data-enable-grammarly="false"
            className={cn(
              "block w-full resize-none bg-transparent text-[16px] font-medium leading-relaxed text-foreground outline-none placeholder:text-transparent sm:text-[17px]",
              isHero && "sm:text-[17px]",
            )}
          />
        </div>

        <div className="mt-1 flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              aria-label="Əlavə et"
              tabIndex={-1}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background text-muted-foreground shadow-[0_1px_1px_hsl(var(--foreground)/0.04)] transition-colors hover:text-foreground"
            >
              <Plus className="h-4 w-4" />
            </button>
            <button
              type="button"
              tabIndex={-1}
              className="hidden items-center gap-1.5 rounded-full border border-border bg-background px-3.5 py-1.5 text-[13px] font-medium text-muted-foreground shadow-[0_1px_1px_hsl(var(--foreground)/0.04)] transition-colors hover:text-foreground sm:inline-flex"
            >
              <Paperclip className="h-3.5 w-3.5" />
              Əlavə et
            </button>
            <button
              type="button"
              tabIndex={-1}
              className="hidden items-center gap-1.5 rounded-full border border-border bg-background px-3.5 py-1.5 text-[13px] font-medium text-muted-foreground shadow-[0_1px_1px_hsl(var(--foreground)/0.04)] transition-colors hover:text-foreground sm:inline-flex"
            >
              <Palette className="h-3.5 w-3.5" />
              Tema
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Səslə yaz"
              tabIndex={-1}
              className="flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted/70 hover:text-foreground"
            >
              <Mic className="h-4 w-4" />
            </button>
            <button
              type="submit"
              aria-label="Saytı qur"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-[0_8px_18px_-10px_hsl(var(--primary)/0.9)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[hsl(var(--primary-hover))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <ArrowUp className="h-5 w-5" />
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
