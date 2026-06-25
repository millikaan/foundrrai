"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowUp, LayoutGrid, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ProfileMenu } from "@/components/account/profile-menu";
import { clearSession } from "@/lib/workspace/build-session";

const PROMPT_STORAGE_KEY = "foundrr:prompt";

/** A time-of-day greeting (computed in the user's local time), with light variety. */
function greetingFor(name: string): string {
  const hour = new Date().getHours();
  const options =
    hour < 5
      ? ["Hələ ayaqdasan", "Gecən xeyir"]
      : hour < 12
        ? ["Sabahın xeyir", "Günaydın"]
        : hour < 18
          ? ["Günortan xeyir", "Gününüz xeyir"]
          : hour < 23
            ? ["Axşamın xeyir", "Xoş axşamlar"]
            : ["Gecən xeyir", "Hələ ayaqdasan"];
  const phrase = options[Math.floor(Math.random() * options.length)];
  return name ? `${phrase}, ${name}` : phrase;
}

interface SiteSummary {
  id: string;
  name: string | null;
  prompt: string | null;
  status: string | null;
  updated_at: string | null;
}

interface WorkspaceShellProps {
  name: string;
  email: string;
  credits: number;
  plan: string;
  sites: SiteSummary[];
}

const STATUS_LABEL: Record<string, string> = {
  built: "Hazır",
  draft: "Qaralama",
  deployed: "Yayımlandı",
};

export function WorkspaceShell({ name, email, credits, plan, sites }: WorkspaceShellProps) {
  const router = useRouter();
  const [value, setValue] = React.useState("");
  const [greeting, setGreeting] = React.useState(`Vaxtdır, ${name}`);

  React.useEffect(() => {
    const stored = window.sessionStorage.getItem(PROMPT_STORAGE_KEY);
    if (stored) setValue(stored);
    setGreeting(greetingFor(name));
  }, [name]);

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    const prompt = value.trim();
    if (!prompt) return;
    clearSession();
    window.sessionStorage.setItem(PROMPT_STORAGE_KEY, prompt);
    router.push("/workspace/build");
  };

  return (
    <div className="flex min-h-screen">
      <aside className="hidden w-64 shrink-0 flex-col border-r border-border bg-card/40 p-4 md:flex">
        <div className="flex items-center gap-2 px-2 font-semibold tracking-tight">
          <span className="brand-mark h-6 w-6 rounded-[7px]" />
          <span className="text-[17px]">Foundrr</span>
        </div>

        <Button
          variant="accent"
          size="sm"
          className="mt-6 w-full justify-center"
          onClick={() => {
            clearSession();
            setValue("");
          }}
        >
          <Plus className="h-4 w-4" />
          Yeni sayt
        </Button>

        <div className="mt-6 flex min-h-0 flex-1 flex-col px-2">
          <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
            Saytlarım
          </p>
          {sites.length === 0 ? (
            <p className="mt-3 text-[13px] text-muted-foreground">
              Hələ saytın yoxdur. Bir cümlə yazıb ilkini qur.
            </p>
          ) : (
            <ul className="mt-3 -mx-1 flex-1 space-y-0.5 overflow-y-auto pr-0.5">
              {sites.map((site) => (
                <li key={site.id}>
                  <Link
                    href={`/workspace/build?site=${site.id}`}
                    className="group flex items-center gap-2.5 rounded-lg px-2 py-2 transition-colors hover:bg-muted"
                  >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground transition-colors group-hover:bg-card">
                      <LayoutGrid className="h-3.5 w-3.5" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[13px] font-medium text-foreground">
                        {site.prompt || site.name || "Adsız sayt"}
                      </span>
                      <span className="block truncate text-[11px] text-muted-foreground">
                        {(site.status && STATUS_LABEL[site.status]) || site.status || "—"}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="mt-4 flex flex-col gap-3">
          <div className="rounded-xl border border-border bg-card p-3">
            <div className="flex items-center justify-between">
              <span className="text-[13px] text-muted-foreground">Kredit</span>
              <span className="font-mono text-sm font-semibold">{credits}</span>
            </div>
          </div>

          <ProfileMenu
            name={name}
            email={email}
            plan={plan}
            credits={credits}
            variant="sidebar"
            onDashboard
          />
        </div>
      </aside>

      <main className="relative flex flex-1 flex-col items-center justify-center overflow-hidden px-6 py-16">
        <div className="bloom bloom-closing -z-10 opacity-60" aria-hidden />
        <div className="relative z-10 w-full max-w-[680px] text-center">
          <h1
            className="font-semibold tracking-tight"
            style={{ fontSize: "clamp(28px, 4vw, 44px)", lineHeight: 1.05 }}
          >
            {greeting}
          </h1>
          <p className="mt-3 text-[16px] text-muted-foreground">
            Nə qurmaq istəyirsən? Bir cümlə ilə təsvir et.
          </p>

          <form
            onSubmit={submit}
            className="mt-8 rounded-3xl border border-border bg-card/85 p-4 text-left shadow-[0_24px_60px_-32px_hsl(240_22%_13%/0.2)] backdrop-blur-xl transition-colors focus-within:border-[hsl(var(--ring)/0.5)]"
          >
            <textarea
              rows={2}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  submit(e);
                }
              }}
              placeholder="Məs: Bakıda diş klinikası üçün sayt"
              className="block min-h-[56px] w-full resize-none bg-transparent px-1.5 pt-1 text-[16px] leading-relaxed text-foreground outline-none placeholder:text-muted-foreground"
            />
            <div className="mt-2 flex items-center justify-between">
              <button
                type="button"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:text-foreground"
                aria-label="Şəkil əlavə et"
              >
                <Plus className="h-4 w-4" />
              </button>
              <button
                type="submit"
                aria-label="Qur"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-foreground text-background transition-all hover:-translate-y-0.5 hover:bg-foreground/90"
              >
                <ArrowUp className="h-5 w-5" />
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
