"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { ArrowUp, Mic, Paperclip, Palette, Plus } from "lucide-react";

import { Chip } from "@/components/ui/chip";

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
}: {
  showChips?: boolean;
} = {}) {
  const router = useRouter();
  const [value, setValue] = React.useState("");
  const [typed, setTyped] = React.useState("");
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  // Typewriter placeholder: type an idea, pause, delete it, type the next — looping.
  React.useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setTyped(PLACEHOLDERS[0]);
      return;
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
    router.push("/signup?intent=build");
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

  return (
    <div className="w-full">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          submit();
        }}
        className="relative mx-auto flex w-full max-w-[720px] flex-col rounded-3xl border border-border bg-card/80 p-4 text-left shadow-[0_24px_60px_-32px_hsl(28_22%_14%/0.18)] backdrop-blur-xl transition-colors duration-300 focus-within:border-[hsl(var(--ring)/0.5)]"
      >
        <label htmlFor="foundrr-prompt" className="sr-only">
          Biznesini bir cümlə ilə təsvir et
        </label>

        <div className="relative min-h-[64px] px-1.5 pt-1">
          {value.length === 0 ? (
            <span
              aria-hidden
              className="pointer-events-none absolute left-1.5 top-1 text-[16px] text-muted-foreground"
            >
              {typed}
              <span className="ml-0.5 inline-block h-[1.05em] w-[2px] translate-y-[3px] animate-pulse bg-muted-foreground/70 align-middle" />
            </span>
          ) : null}

          <textarea
            id="foundrr-prompt"
            ref={textareaRef}
            rows={2}
            value={value}
            onChange={(event) => setValue(event.target.value)}
            onKeyDown={onKeyDown}
            className="block w-full resize-none bg-transparent text-[16px] leading-relaxed text-foreground outline-none placeholder:text-transparent"
          />
        </div>

        <div className="mt-2 flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              aria-label="Əlavə et"
              tabIndex={-1}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:text-foreground"
            >
              <Plus className="h-4 w-4" />
            </button>
            <button
              type="button"
              tabIndex={-1}
              className="hidden items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-[13px] text-muted-foreground transition-colors hover:text-foreground sm:inline-flex"
            >
              <Paperclip className="h-3.5 w-3.5" />
              Əlavə et
            </button>
            <button
              type="button"
              tabIndex={-1}
              className="hidden items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-[13px] text-muted-foreground transition-colors hover:text-foreground sm:inline-flex"
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
              className="flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:text-foreground"
            >
              <Mic className="h-4 w-4" />
            </button>
            <button
              type="submit"
              aria-label="Saytı qur"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-foreground text-background transition-all duration-200 hover:-translate-y-0.5 hover:bg-foreground/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <ArrowUp className="h-5 w-5" />
            </button>
          </div>
        </div>
      </form>

      {showChips ? (
        <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
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
