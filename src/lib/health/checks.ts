/**
 * Server-side health checks for Foundrr's own status page (`/status`).
 * Every check is best-effort and NEVER throws — a failed probe maps to a
 * status, not an exception. Each network probe is timed so the UI can show
 * latency. Results are cached briefly so refreshing the page (or a monitor
 * polling `/api/status`) does not hammer upstream providers.
 */

export type ComponentStatus = "operational" | "degraded" | "down" | "unknown";

export interface HealthComponent {
  key: string;
  /** Azerbaijani display name. */
  name: string;
  /** Azerbaijani one-line description of what this component covers. */
  description: string;
  status: ComponentStatus;
  /** Optional short Azerbaijani detail (e.g. an HTTP code reason). */
  detail?: string;
  /** Round-trip time of the probe in milliseconds (omitted for local checks). */
  responseMs?: number;
}

export interface HealthReport {
  /** Overall status — the worst of the user-facing components. */
  status: ComponentStatus;
  components: ReadonlyArray<HealthComponent>;
  /** ISO timestamp of when these results were produced. */
  checkedAt: string;
}

const PROBE_TIMEOUT_MS = 4000;
const CACHE_TTL_MS = 15_000;

let cached: { report: HealthReport; at: number } | null = null;

/** fetch() with an abort timeout that resolves to null instead of throwing, timed. */
async function timedProbe(
  input: string,
  init?: RequestInit,
): Promise<{ res: Response | null; ms: number }> {
  const start = Date.now();
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), PROBE_TIMEOUT_MS);
  try {
    const res = await fetch(input, {
      ...init,
      signal: controller.signal,
      cache: "no-store",
    });
    return { res, ms: Date.now() - start };
  } catch {
    return { res: null, ms: Date.now() - start };
  } finally {
    clearTimeout(timer);
  }
}

/** The Foundrr app itself: operational when core config is present. */
function checkApp(): HealthComponent {
  const base = {
    key: "app",
    name: "Sayt qurucu",
    description: "Foundrr tətbiqi və veb interfeysi",
  } as const;
  const configured =
    Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL) &&
    Boolean(process.env.OPENAI_API_KEY);
  return configured
    ? { ...base, status: "operational" }
    : { ...base, status: "degraded", detail: "Konfiqurasiya tam deyil" };
}

/** Supabase auth/db reachability via the GoTrue health endpoint. */
async function checkSupabase(): Promise<HealthComponent> {
  const base = {
    key: "data",
    name: "Hesab və verilənlər",
    description: "Giriş, qeydiyyat və məlumat bazası",
  } as const;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) {
    return { ...base, status: "degraded", detail: "Konfiqurasiya yoxdur" };
  }
  const { res, ms } = await timedProbe(`${url}/auth/v1/health`, {
    headers: { apikey: key },
  });
  if (!res) return { ...base, status: "down", detail: "Əlçatan deyil", responseMs: ms };
  if (res.ok) return { ...base, status: "operational", responseMs: ms };
  return { ...base, status: "degraded", detail: `HTTP ${res.status}`, responseMs: ms };
}

/** OpenAI reachability via the free `models` list (no token cost). */
async function checkOpenAI(): Promise<HealthComponent> {
  const base = {
    key: "ai",
    name: "AI mühərriki",
    description: "Saytları yaradan və redaktə edən süni intellekt",
  } as const;
  const key = process.env.OPENAI_API_KEY;
  if (!key) {
    return { ...base, status: "degraded", detail: "Konfiqurasiya yoxdur" };
  }
  const { res, ms } = await timedProbe("https://api.openai.com/v1/models", {
    headers: { Authorization: `Bearer ${key}` },
  });
  if (!res) return { ...base, status: "down", detail: "Əlçatan deyil", responseMs: ms };
  if (res.ok) return { ...base, status: "operational", responseMs: ms };
  if (res.status === 401) {
    return { ...base, status: "degraded", detail: "Açar etibarsızdır", responseMs: ms };
  }
  if (res.status === 429) {
    return { ...base, status: "degraded", detail: "Limit dolub", responseMs: ms };
  }
  return { ...base, status: "degraded", detail: `HTTP ${res.status}`, responseMs: ms };
}

/** Vercel platform status via its public statuspage feed (best-effort). */
async function checkVercel(): Promise<HealthComponent> {
  const base = {
    key: "hosting",
    name: "Hostinq platforması",
    description: "Tətbiqin işlədiyi server infrastrukturu",
  } as const;
  const { res, ms } = await timedProbe(
    "https://www.vercel-status.com/api/v2/status.json",
  );
  if (!res || !res.ok) return { ...base, status: "unknown", responseMs: ms };
  try {
    const data = (await res.json()) as { status?: { indicator?: string } };
    const indicator = data.status?.indicator ?? "none";
    if (indicator === "none") return { ...base, status: "operational", responseMs: ms };
    if (indicator === "minor") {
      return { ...base, status: "degraded", detail: "Kiçik nasazlıq", responseMs: ms };
    }
    return { ...base, status: "down", detail: "Platforma nasazlığı", responseMs: ms };
  } catch {
    return { ...base, status: "unknown", responseMs: ms };
  }
}

const SEVERITY: Record<ComponentStatus, number> = {
  operational: 0,
  unknown: 0,
  degraded: 1,
  down: 2,
};

/** Worst real status across components (unknown never alarms the overall). */
function overallStatus(
  components: ReadonlyArray<HealthComponent>,
): ComponentStatus {
  let worst: ComponentStatus = "operational";
  for (const c of components) {
    if (SEVERITY[c.status] > SEVERITY[worst]) worst = c.status;
  }
  return worst;
}

/** Build the full health report, served from a short-lived cache. */
export async function getHealthReport(force = false): Promise<HealthReport> {
  const now = Date.now();
  if (!force && cached && now - cached.at < CACHE_TTL_MS) {
    return cached.report;
  }

  const components: HealthComponent[] = [
    checkApp(),
    ...(await Promise.all([checkSupabase(), checkOpenAI(), checkVercel()])),
  ];

  const report: HealthReport = {
    status: overallStatus(components),
    components,
    checkedAt: new Date().toISOString(),
  };
  cached = { report, at: now };
  return report;
}
