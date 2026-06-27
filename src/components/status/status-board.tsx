"use client";

import * as React from "react";
import {
  Database,
  Globe,
  RefreshCw,
  Server,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

import type {
  ComponentStatus,
  HealthComponent,
  HealthReport,
} from "@/lib/health/checks";

const REFRESH_INTERVAL_MS = 30_000;

const ICONS: Record<string, LucideIcon> = {
  app: Globe,
  data: Database,
  ai: Sparkles,
  hosting: Server,
};

/** Per-service icon tile accent (brand hues) — constant, NOT tied to status. */
const ACCENT: Record<string, string> = {
  app: "bg-[hsl(var(--grad-violet)/0.12)] text-[hsl(var(--grad-violet))]",
  data: "bg-[hsl(var(--grad-blue)/0.12)] text-[hsl(var(--grad-blue))]",
  ai: "bg-[hsl(var(--grad-pink)/0.12)] text-[hsl(var(--grad-pink))]",
  hosting: "bg-[hsl(var(--grad-orange)/0.14)] text-[hsl(var(--grad-orange))]",
};

const STATUS_UI: Record<
  ComponentStatus,
  { dot: string; pill: string; label: string }
> = {
  operational: {
    dot: "bg-[hsl(152_62%_40%)]",
    pill: "bg-[hsl(152_62%_40%/0.12)] text-[hsl(152_50%_28%)]",
    label: "İşləkdir",
  },
  degraded: {
    dot: "bg-[hsl(38_92%_50%)]",
    pill: "bg-[hsl(38_92%_50%/0.16)] text-[hsl(30_72%_34%)]",
    label: "Qismən",
  },
  down: {
    dot: "bg-[hsl(var(--destructive))]",
    pill: "bg-[hsl(var(--destructive)/0.12)] text-[hsl(var(--destructive))]",
    label: "İşləmir",
  },
  unknown: {
    dot: "bg-muted-foreground/50",
    pill: "bg-muted text-muted-foreground",
    label: "Naməlum",
  },
};

const HERO_UI: Record<ComponentStatus, { title: string; tint: string }> = {
  operational: {
    title: "Bütün sistemlər işləkdir",
    tint: "border-[hsl(152_62%_40%/0.3)] bg-gradient-to-br from-[hsl(152_62%_40%/0.10)] to-transparent",
  },
  degraded: {
    title: "Bəzi sistemlərdə problem var",
    tint: "border-[hsl(38_92%_50%/0.35)] bg-gradient-to-br from-[hsl(38_92%_50%/0.12)] to-transparent",
  },
  down: {
    title: "Sistem nasazlığı",
    tint: "border-[hsl(var(--destructive)/0.3)] bg-gradient-to-br from-[hsl(var(--destructive)/0.10)] to-transparent",
  },
  unknown: {
    title: "Vəziyyət yoxlanılır",
    tint: "border-border bg-muted/40",
  },
};

function relativeTime(sinceMs: number, nowMs: number): string {
  const s = Math.max(0, Math.round((nowMs - sinceMs) / 1000));
  if (s < 5) return "indicə";
  if (s < 60) return `${s} saniyə əvvəl`;
  const m = Math.floor(s / 60);
  if (m < 60) return `${m} dəqiqə əvvəl`;
  const h = Math.floor(m / 60);
  return `${h} saat əvvəl`;
}

function ComponentRow({ component }: { component: HealthComponent }) {
  const ui = STATUS_UI[component.status];
  const Icon = ICONS[component.key] ?? Globe;
  const accent = ACCENT[component.key] ?? "bg-muted text-muted-foreground";
  return (
    <li className="flex items-center gap-4 px-4 py-4 transition-colors hover:bg-muted/30 sm:px-5">
      <div
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${accent}`}
      >
        <Icon className="h-5 w-5" />
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate text-[15px] font-medium text-foreground">
          {component.name}
        </p>
        <p className="truncate text-[13px] text-muted-foreground">
          {component.description}
        </p>
      </div>

      {component.responseMs != null ? (
        <span className="hidden shrink-0 tabular-nums text-[12px] text-muted-foreground sm:inline">
          {component.responseMs} ms
        </span>
      ) : null}

      <span
        className={`flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-[12px] font-medium ${ui.pill}`}
      >
        <span className={`h-1.5 w-1.5 rounded-full ${ui.dot}`} />
        {component.detail ?? ui.label}
      </span>
    </li>
  );
}

export function StatusBoard({ initial }: { initial: HealthReport }) {
  const [report, setReport] = React.useState<HealthReport>(initial);
  const [updatedAt, setUpdatedAt] = React.useState<number>(() => Date.now());
  const [now, setNow] = React.useState<number>(() => Date.now());
  const [loading, setLoading] = React.useState(false);

  const refresh = React.useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/status", { cache: "no-store" });
      const data = (await res.json()) as HealthReport;
      setReport(data);
      setUpdatedAt(Date.now());
    } catch {
      // Keep the previous report on a transient failure.
    } finally {
      setLoading(false);
    }
  }, []);

  // Auto-refresh on an interval.
  React.useEffect(() => {
    const id = setInterval(refresh, REFRESH_INTERVAL_MS);
    return () => clearInterval(id);
  }, [refresh]);

  // Tick once a second so the "updated Xs ago" label stays live.
  React.useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const hero = HERO_UI[report.status];
  const operational = report.components.filter(
    (c) => c.status === "operational",
  ).length;
  const total = report.components.length;

  return (
    <div className="mt-8">
      {/* Hero */}
      <section
        className={`rounded-2xl border px-5 py-5 shadow-[0_18px_50px_-32px_hsl(240_22%_13%/0.28)] sm:px-6 sm:py-6 ${hero.tint}`}
      >
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <span className="relative flex h-3.5 w-3.5 shrink-0">
              <span
                className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-60 ${STATUS_UI[report.status].dot}`}
              />
              <span
                className={`relative inline-flex h-3.5 w-3.5 rounded-full ${STATUS_UI[report.status].dot}`}
              />
            </span>
            <div>
              <h1 className="text-[18px] font-semibold tracking-tight sm:text-[20px]">
                {hero.title}
              </h1>
              <p className="mt-1 text-[13px] text-muted-foreground">
                {operational}/{total} xidmət işləkdir · yeniləndi{" "}
                {relativeTime(updatedAt, now)}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={refresh}
            disabled={loading}
            aria-label="Yenilə"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border bg-card/80 text-muted-foreground shadow-sm transition-colors hover:text-foreground disabled:opacity-50"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
          </button>
        </div>
      </section>

      {/* Component list */}
      <section className="mt-5 overflow-hidden rounded-2xl border border-border bg-card/60 shadow-[0_18px_50px_-34px_hsl(240_22%_13%/0.25)]">
        <ul className="divide-y divide-border">
          {report.components.map((c) => (
            <ComponentRow key={c.key} component={c} />
          ))}
        </ul>
      </section>

      <p className="mt-4 text-center text-[12px] text-muted-foreground">
        Hər 30 saniyədə avtomatik yenilənir
      </p>
    </div>
  );
}
