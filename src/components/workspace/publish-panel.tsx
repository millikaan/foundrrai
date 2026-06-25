"use client";

import * as React from "react";
import { Check, Copy, ExternalLink, Globe, Loader2, Rocket, X } from "lucide-react";

import { cn } from "@/lib/utils";

interface PublishPanelProps {
  open: boolean;
  onClose: () => void;
  siteId: string | null;
  siteName?: string;
}

export function PublishPanel({ open, onClose, siteId, siteName }: PublishPanelProps) {
  const [connected, setConnected] = React.useState<Record<string, boolean>>({});
  const [publishing, setPublishing] = React.useState(false);
  const [url, setUrl] = React.useState<string | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [copied, setCopied] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");

  React.useEffect(() => {
    if (!open) return;
    setUrl(null);
    setError(null);
    setCopied(false);
    setTitle(siteName ?? "");
    fetch("/api/connections")
      .then((r) => r.json())
      .then((d: { connections?: { provider: string }[] }) => {
        const map: Record<string, boolean> = {};
        for (const c of d.connections ?? []) map[c.provider] = true;
        setConnected(map);
      })
      .catch(() => {});
  }, [open, siteName]);

  if (!open) return null;

  const vercelConnected = !!connected.vercel;

  const publish = async () => {
    if (!siteId) return;
    setPublishing(true);
    setError(null);
    setUrl(null);
    try {
      const res = await fetch("/api/deploy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ siteId, title, description }),
      });
      const data = await res.json();
      if (res.ok && data.url) setUrl(data.url);
      else setError(data.error ?? "Yayımlama alınmadı.");
    } catch {
      setError("Yayımlama alınmadı.");
    } finally {
      setPublishing(false);
    }
  };

  const copy = async () => {
    if (!url) return;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* ignore */
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-foreground/40 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden
      />
      <div className="relative w-full max-w-[480px] overflow-hidden rounded-2xl border border-border bg-card shadow-[0_40px_120px_-30px_hsl(240_22%_13%/0.5)]">
        <div className="bloom bloom-cta pointer-events-none absolute -top-10 right-0 -z-10 h-56 w-56 opacity-60" aria-hidden />

        <button
          onClick={onClose}
          aria-label="Bağla"
          className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <X className="h-4.5 w-4.5" />
        </button>

        <div className="p-7">
          {/* header */}
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <Rocket className="h-5 w-5" />
            </span>
            <div>
              <h2 className="text-[19px] font-semibold tracking-tight">Saytı yayımla</h2>
              <p className="text-[13px] text-muted-foreground">
                Öz Vercel hesabına — hosting və domen sənindir.
              </p>
            </div>
          </div>

          {/* site card */}
          <div className="mt-5 flex items-center gap-3 rounded-2xl border border-border bg-muted/30 p-4">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-card text-muted-foreground">
              <Globe className="h-4.5 w-4.5" />
            </span>
            <div className="min-w-0">
              <p className="truncate text-[14px] font-medium">{siteName || "Yeni sayt"}</p>
              <p className="text-[12px] text-muted-foreground">Yayıma hazırdır</p>
            </div>
          </div>

          {/* connections */}
          <div className="mt-4 space-y-2">
            <StatusRow label="Vercel" sub="Hosting və canlı URL" ok={vercelConnected} />
            <StatusRow label="Supabase" sub="Form bazası (istəyə görə)" ok={!!connected.supabase} />
          </div>

          {/* website info (SEO + sharing) */}
          <div className="mt-4 rounded-2xl border border-border p-4">
            <p className="text-[13px] font-semibold">Sayt məlumatı</p>
            <p className="mt-0.5 text-[12px] text-muted-foreground">
              Google və paylaşımda görünən başlıq və təsvir.
            </p>
            <label className="mt-3 block text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
              Başlıq
            </label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={60}
              placeholder="Sayt başlığı"
              className="mt-1 h-9 w-full rounded-lg border border-border bg-background px-3 text-[13px] outline-none focus:border-[hsl(var(--ring)/0.5)]"
            />
            <label className="mt-2.5 block text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
              Təsvir
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              maxLength={160}
              rows={2}
              placeholder="Qısa təsvir (160 simvola qədər)"
              className="mt-1 w-full resize-none rounded-lg border border-border bg-background px-3 py-2 text-[13px] outline-none focus:border-[hsl(var(--ring)/0.5)]"
            />
          </div>

          {/* custom domain */}
          <CustomDomain siteId={siteId} />

          {/* result */}
          {url ? (
            <div className="mt-5 rounded-2xl border border-emerald-500/30 bg-emerald-500/[0.06] p-4">
              <p className="flex items-center gap-1.5 text-[13px] font-semibold text-emerald-700">
                <Check className="h-4 w-4" /> Sayt canlıdır 🎉
              </p>
              <div className="mt-2.5 flex items-center gap-2">
                <span className="min-w-0 flex-1 truncate rounded-lg border border-emerald-500/20 bg-card px-3 py-2 font-mono text-[12.5px]">
                  {url.replace(/^https?:\/\//, "")}
                </span>
                <button
                  onClick={copy}
                  aria-label="Kopyala"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground transition-colors hover:text-foreground"
                >
                  {copied ? <Check className="h-4 w-4 text-emerald-600" /> : <Copy className="h-4 w-4" />}
                </button>
                <a
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Aç"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-foreground text-background transition-colors hover:bg-foreground/90"
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </div>
          ) : null}

          {error ? (
            <p className="mt-4 rounded-xl border border-destructive/30 bg-destructive/5 px-3 py-2 text-[13px] text-destructive">
              {error}
            </p>
          ) : null}

          {/* CTA */}
          {!url ? (
            <div className="mt-6">
              {vercelConnected ? (
                <button
                  onClick={publish}
                  disabled={publishing}
                  className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary text-[14px] font-semibold text-primary-foreground shadow-[0_14px_30px_-12px_hsl(var(--primary)/0.7)] transition-all hover:-translate-y-0.5 hover:bg-[hsl(var(--primary-hover))] disabled:translate-y-0 disabled:opacity-60"
                >
                  {publishing ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Yayımlanır…
                    </>
                  ) : (
                    <>
                      <Rocket className="h-4 w-4" />
                      İndi yayımla
                    </>
                  )}
                </button>
              ) : (
                <a
                  href="/api/connections/vercel/authorize"
                  className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-foreground text-[14px] font-semibold text-background transition-all hover:-translate-y-0.5 hover:bg-foreground/90"
                >
                  <svg viewBox="0 0 76 65" aria-hidden className="h-3.5 w-3.5 fill-current">
                    <path d="M37.53 0 75.06 65H0z" />
                  </svg>
                  Əvvəlcə Vercel-i qoş
                </a>
              )}
            </div>
          ) : null}

          <p className="mt-3 text-center text-[12px] leading-relaxed text-muted-foreground">
            {url
              ? "Domen almaq üçün istənilən registratordan al və Vercel-də bağla."
              : "Hesabları Parametrlər → Bağlantılar bölməsindən də qoşa bilərsən."}
          </p>
        </div>
      </div>
    </div>
  );
}

interface DomainResult {
  domain: string;
  verified: boolean;
  misconfigured: boolean;
  records: { type: string; name: string; value: string }[];
  nameservers: string[];
}

type DomainMethod = "nameservers" | "records";

/** "Connect your own domain" — nameservers or DNS records from Vercel, with verify. */
function CustomDomain({ siteId }: { siteId: string | null }) {
  const [open, setOpen] = React.useState(false);
  const [domain, setDomain] = React.useState("");
  const [method, setMethod] = React.useState<DomainMethod>("nameservers");
  const [loading, setLoading] = React.useState(false);
  const [verifying, setVerifying] = React.useState(false);
  const [checkedOnce, setCheckedOnce] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [result, setResult] = React.useState<DomainResult | null>(null);

  const call = async (verify: boolean) => {
    if (!siteId || !domain.trim()) return;
    if (verify) setVerifying(true);
    else setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/domains", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ siteId, domain }),
      });
      const data = await res.json();
      if (res.ok) {
        setResult(data as DomainResult);
        if (verify) setCheckedOnce(true);
      } else {
        setError(data.error ?? "Alınmadı.");
      }
    } catch {
      setError("Alınmadı.");
    } finally {
      if (verify) setVerifying(false);
      else setLoading(false);
    }
  };

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="mt-4 flex w-full items-center gap-2 rounded-2xl border border-dashed border-border px-4 py-3 text-[13px] font-medium text-foreground transition-colors hover:border-foreground/30 hover:bg-muted/40"
      >
        <Globe className="h-4 w-4 text-primary" />
        Öz domenini bağla
      </button>
    );
  }

  return (
    <div className="mt-4 overflow-hidden rounded-2xl border border-border">
      <div className="flex items-center gap-2 border-b border-border bg-muted/30 px-4 py-3">
        <Globe className="h-4 w-4 text-primary" />
        <p className="text-[13px] font-semibold">Öz domenin</p>
      </div>

      <div className="p-4">
        <div className="flex gap-2">
          <input
            value={domain}
            onChange={(e) => {
              setDomain(e.target.value);
              setResult(null);
              setCheckedOnce(false);
            }}
            placeholder="nümunə.az"
            className="h-10 flex-1 rounded-xl border border-border bg-background px-3 text-[13px] outline-none focus:border-[hsl(var(--ring)/0.5)]"
          />
          {!result ? (
            <button
              onClick={() => call(false)}
              disabled={loading || !domain.trim()}
              className="inline-flex h-10 shrink-0 items-center gap-1.5 rounded-xl bg-foreground px-4 text-[13px] font-medium text-background transition-colors hover:bg-foreground/90 disabled:opacity-50"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
              Davam et
            </button>
          ) : null}
        </div>

        {error ? <p className="mt-2 text-[12px] text-destructive">{error}</p> : null}

        {result?.verified ? (
          <div className="mt-3 flex items-center justify-between rounded-xl border border-emerald-500/30 bg-emerald-500/[0.07] px-3.5 py-3">
            <span className="flex items-center gap-2 text-[13px] font-semibold text-emerald-700">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 text-white">
                <Check className="h-3.5 w-3.5" strokeWidth={3} />
              </span>
              {result.domain} qoşuldu
            </span>
            <a
              href={`https://${result.domain}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-[12px] font-medium text-emerald-700 hover:underline"
            >
              Aç <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        ) : result ? (
          <>
            {/* method toggle */}
            <div className="mt-3 grid grid-cols-2 gap-1 rounded-xl border border-border bg-muted/40 p-1">
              <MethodBtn active={method === "nameservers"} onClick={() => setMethod("nameservers")}>
                Ad serverləri
              </MethodBtn>
              <MethodBtn active={method === "records"} onClick={() => setMethod("records")}>
                DNS qeydləri
              </MethodBtn>
            </div>

            <p className="mt-2.5 text-[12px] leading-relaxed text-muted-foreground">
              {method === "nameservers"
                ? "Registratorda domenin ad serverlərini (nameservers) bunlarla əvəz et — bütün domeni Vercel idarə edir (ən asan yol)."
                : "Bu DNS qeydlərini registratorda əlavə et — mövcud qeydlərə toxunmadan."}
            </p>

            <div className="mt-2.5 space-y-2">
              {method === "nameservers"
                ? result.nameservers.map((ns) => (
                    <DnsField key={ns} label="Nameserver" value={ns} />
                  ))
                : result.records.map((r, i) => (
                    <DnsField key={i} label={`${r.type} · ${r.name}`} value={r.value} />
                  ))}
            </div>

            <button
              onClick={() => call(true)}
              disabled={verifying}
              className="mt-3 inline-flex h-10 w-full items-center justify-center gap-2 rounded-xl bg-primary text-[13px] font-semibold text-primary-foreground transition-colors hover:bg-[hsl(var(--primary-hover))] disabled:opacity-60"
            >
              {verifying ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
              Bağlantını yoxla
            </button>

            {checkedOnce ? (
              <p className="mt-2 text-center text-[11.5px] text-amber-600">
                Hələ qoşulmayıb — DNS dəyişikliyi yayılana qədər (5 dəq – bir neçə saat)
                gözlə, sonra yenidən yoxla.
              </p>
            ) : (
              <p className="mt-2 text-center text-[11px] text-muted-foreground">
                Dəyişikliyi etdikdən sonra yoxla — hazır olanda domen avtomatik qoşulur.
              </p>
            )}
          </>
        ) : null}
      </div>
    </div>
  );
}

function MethodBtn({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "rounded-lg py-1.5 text-[12.5px] font-medium transition-colors",
        active ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground",
      )}
    >
      {children}
    </button>
  );
}

function DnsField({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-2 rounded-xl border border-border bg-card px-3.5 py-2.5">
      <div className="min-w-0">
        <p className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
          {label}
        </p>
        <p className="truncate font-mono text-[12.5px]">{value}</p>
      </div>
      <CopyButton text={value} />
    </div>
  );
}

function CopyButton({ text }: { text: string }) {
  const [done, setDone] = React.useState(false);
  return (
    <button
      type="button"
      aria-label="Kopyala"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
          setDone(true);
          setTimeout(() => setDone(false), 1400);
        } catch {
          /* ignore */
        }
      }}
      className="shrink-0 text-muted-foreground transition-colors hover:text-foreground"
    >
      {done ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
    </button>
  );
}

function StatusRow({ label, sub, ok }: { label: string; sub: string; ok: boolean }) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-border bg-card px-3.5 py-2.5">
      <div>
        <p className="text-[13px] font-medium">{label}</p>
        <p className="text-[11px] text-muted-foreground">{sub}</p>
      </div>
      <span
        className={cn(
          "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium",
          ok ? "bg-emerald-500/10 text-emerald-600" : "bg-muted text-muted-foreground",
        )}
      >
        {ok ? <Check className="h-3.5 w-3.5" /> : null}
        {ok ? "Qoşuldu" : "Qoşulmayıb"}
      </span>
    </div>
  );
}
