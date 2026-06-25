"use client";

import * as React from "react";
import {
  Check,
  CreditCard,
  Link2,
  Loader2,
  LogOut,
  RefreshCw,
  Settings,
  Shield,
  Sparkles,
  User,
  X,
  Zap,
} from "lucide-react";

import { CREDIT_PACKS, PLAN_SPECS, type PlanSpec } from "@/lib/stripe/plans";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

type Tab = "account" | "plan" | "connections" | "privacy";

interface SettingsModalProps {
  open: boolean;
  onClose: () => void;
  name: string;
  email: string;
  plan: string;
  credits: number;
  initialTab?: Tab;
  /** Set after a fresh provider connect (e.g. "vercel") to show a success banner. */
  justConnected?: string;
  /** Set when a provider connect failed — a reason code shown as an error banner. */
  connectError?: string;
  onUpgraded: (plan: string, credits: number) => void;
  /** Plan/credit change that should NOT trigger the celebratory upgrade tour. */
  onPlanChanged?: (plan: string, credits: number) => void;
  onSignOut: () => void;
}

const NAV: ReadonlyArray<{ id: Tab; label: string; icon: typeof User }> = [
  { id: "account", label: "Hesab", icon: User },
  { id: "plan", label: "Plan və kredit", icon: CreditCard },
  { id: "connections", label: "Bağlantılar", icon: Link2 },
  { id: "privacy", label: "Məxfilik", icon: Shield },
];

const PLAN_LABEL: Record<string, string> = {
  free: "Pulsuz",
  pro: "Pro",
  max: "Max",
};

export function SettingsModal({
  open,
  onClose,
  name,
  email,
  plan,
  credits,
  initialTab = "account",
  justConnected,
  connectError,
  onUpgraded,
  onPlanChanged,
  onSignOut,
}: SettingsModalProps) {
  const [tab, setTab] = React.useState<Tab>(initialTab);
  const [displayName, setDisplayName] = React.useState(name);
  const [savingName, setSavingName] = React.useState(false);
  const [nameSaved, setNameSaved] = React.useState(false);
  const [upgrading, setUpgrading] = React.useState<string | null>(null);
  const [buyingPack, setBuyingPack] = React.useState<string | null>(null);
  const [cancelling, setCancelling] = React.useState(false);
  const [syncing, setSyncing] = React.useState(false);

  React.useEffect(() => {
    if (open) setTab(initialTab);
  }, [open, initialTab]);

  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const initial = (name || email || "?").charAt(0).toUpperCase();

  const saveName = async () => {
    setSavingName(true);
    setNameSaved(false);
    try {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        await supabase.from("profiles").update({ name: displayName }).eq("id", user.id);
        setNameSaved(true);
      }
    } finally {
      setSavingName(false);
    }
  };

  const upgrade = async (target: "pro" | "max") => {
    setUpgrading(target);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan: target }),
      });
      const data = await res.json();
      if (data.url) {
        // Stripe is configured → go to Checkout.
        window.location.href = data.url;
        return;
      }
      if (res.ok && data.simulated) onUpgraded(data.plan, data.credits);
    } finally {
      setUpgrading(null);
    }
  };

  const buyCredits = async (pack: string) => {
    setBuyingPack(pack);
    try {
      const res = await fetch("/api/checkout/credits", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pack }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
        return;
      }
      if (res.ok && data.simulated) onPlanChanged?.(plan, data.credits);
    } finally {
      setBuyingPack(null);
    }
  };

  const cancelPlan = async () => {
    setCancelling(true);
    try {
      const res = await fetch("/api/billing/cancel", { method: "POST" });
      const data = await res.json();
      if (res.ok) onPlanChanged?.(data.plan, data.credits);
    } finally {
      setCancelling(false);
    }
  };

  // Reconcile the plan from Stripe (for when a purchase didn't apply automatically).
  const syncPlan = async () => {
    setSyncing(true);
    try {
      const res = await fetch("/api/billing/sync", { method: "POST" });
      const data = await res.json();
      if (res.ok) {
        if (data.changed) onUpgraded(data.plan, data.credits);
        else onPlanChanged?.(data.plan, data.credits);
      }
    } finally {
      setSyncing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-foreground/40 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden
      />
      <div className="relative flex h-[min(640px,92vh)] w-full max-w-[880px] overflow-hidden rounded-2xl border border-border bg-card shadow-[0_40px_120px_-30px_hsl(240_22%_13%/0.5)]">
        {/* left nav */}
        <aside className="hidden w-56 shrink-0 flex-col border-r border-border bg-muted/30 p-4 sm:flex">
          <div className="flex items-center gap-2 px-2 pb-4 text-[13px] font-semibold">
            <Settings className="h-4 w-4 text-muted-foreground" />
            Parametrlər
          </div>
          {NAV.map((item) => (
            <button
              key={item.id}
              onClick={() => setTab(item.id)}
              className={cn(
                "flex items-center gap-2.5 rounded-lg px-3 py-2 text-left text-[14px] transition-colors",
                tab === item.id
                  ? "bg-card font-medium text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </button>
          ))}
        </aside>

        {/* content */}
        <div className="relative flex-1 overflow-y-auto p-8">
          <button
            onClick={onClose}
            aria-label="Bağla"
            className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <X className="h-4.5 w-4.5" />
          </button>

          {tab === "account" ? (
            <div className="max-w-[460px]">
              <h2 className="text-[20px] font-semibold tracking-tight">Hesab</h2>
              <p className="mt-1 text-[14px] text-muted-foreground">
                Profil məlumatlarını idarə et.
              </p>

              <div className="mt-7 flex items-center gap-4">
                <span className="brand-mark flex h-16 w-16 items-center justify-center rounded-2xl text-2xl font-semibold text-white">
                  {initial}
                </span>
                <div>
                  <p className="text-[15px] font-medium">{name || "İstifadəçi"}</p>
                  <p className="text-[13px] text-muted-foreground">{email}</p>
                </div>
              </div>

              <div className="mt-7">
                <label className="text-[13px] font-medium text-muted-foreground">
                  Görünən ad
                </label>
                <div className="mt-2 flex gap-2">
                  <input
                    value={displayName}
                    onChange={(e) => {
                      setDisplayName(e.target.value);
                      setNameSaved(false);
                    }}
                    className="h-10 flex-1 rounded-xl border border-border bg-background px-3 text-[14px] outline-none focus:border-[hsl(var(--ring)/0.5)]"
                  />
                  <button
                    onClick={saveName}
                    disabled={savingName || displayName.trim() === name}
                    className="inline-flex h-10 items-center gap-1.5 rounded-xl bg-foreground px-4 text-[14px] font-medium text-background transition-colors hover:bg-foreground/90 disabled:opacity-40"
                  >
                    {savingName ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : nameSaved ? (
                      <Check className="h-4 w-4" />
                    ) : null}
                    {nameSaved ? "Saxlanıldı" : "Yadda saxla"}
                  </button>
                </div>
              </div>

              <div className="mt-6">
                <label className="text-[13px] font-medium text-muted-foreground">
                  E-poçt
                </label>
                <p className="mt-2 flex h-10 items-center rounded-xl border border-border bg-muted/40 px-3 text-[14px] text-muted-foreground">
                  {email}
                </p>
              </div>
            </div>
          ) : null}

          {tab === "plan" ? (
            <PlanTab
              plan={plan}
              credits={credits}
              upgrading={upgrading}
              buyingPack={buyingPack}
              cancelling={cancelling}
              syncing={syncing}
              onUpgrade={upgrade}
              onBuyCredits={buyCredits}
              onCancel={cancelPlan}
              onSync={syncPlan}
            />
          ) : null}

          {tab === "connections" ? (
            <ConnectionsTab justConnected={justConnected} connectError={connectError} />
          ) : null}

          {tab === "privacy" ? (
            <div className="max-w-[460px]">
              <h2 className="text-[20px] font-semibold tracking-tight">
                Məxfilik və təhlükəsizlik
              </h2>
              <p className="mt-1 text-[14px] text-muted-foreground">
                Hesabın və seansın.
              </p>
              <button
                onClick={onSignOut}
                className="mt-7 inline-flex items-center gap-2 rounded-xl border border-border px-4 py-2.5 text-[14px] font-medium text-foreground transition-colors hover:bg-muted"
              >
                <LogOut className="h-4 w-4" />
                Çıxış et
              </button>
              <p className="mt-6 text-[13px] leading-relaxed text-muted-foreground">
                Məlumatların təhlükəsiz saxlanılır. Provayder açarların (Vercel,
                Supabase) şifrələnir və yalnız server tərəfində istifadə olunur.
              </p>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

const PLAN_RANK: Record<string, number> = { free: 0, pro: 1, max: 2 };

function PlanTab({
  plan,
  credits,
  upgrading,
  buyingPack,
  cancelling,
  syncing,
  onUpgrade,
  onBuyCredits,
  onCancel,
  onSync,
}: {
  plan: string;
  credits: number;
  upgrading: string | null;
  buyingPack: string | null;
  cancelling: boolean;
  syncing: boolean;
  onUpgrade: (target: "pro" | "max") => void;
  onBuyCredits: (pack: string) => void;
  onCancel: () => void;
  onSync: () => void;
}) {
  const [confirmCancel, setConfirmCancel] = React.useState(false);
  const currentRank = PLAN_RANK[plan] ?? 0;

  return (
    <div className="max-w-[600px]">
      <h2 className="text-[20px] font-semibold tracking-tight">Plan və kredit</h2>
      <p className="mt-1 text-[14px] text-muted-foreground">
        Planını idarə et və kredit balansını izlə.
      </p>

      {/* current plan + credit balance */}
      <div className="mt-6 flex items-center justify-between overflow-hidden rounded-2xl border border-primary/25 bg-gradient-to-br from-primary/[0.08] to-card p-5">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
            Cari plan
          </p>
          <p className="mt-1 flex items-center gap-2 text-[20px] font-semibold">
            {PLAN_LABEL[plan] ?? plan}
            {plan !== "free" ? (
              <span className="rounded-full bg-primary/12 px-2 py-0.5 text-[11px] font-medium text-primary">
                aktiv
              </span>
            ) : null}
          </p>
        </div>
        <div className="text-right">
          <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
            Kredit
          </p>
          <p className="mt-1 font-mono text-[22px] font-semibold tabular-nums">{credits}</p>
        </div>
      </div>

      {/* plan specs */}
      <p className="mt-7 text-[13px] font-medium text-muted-foreground">Planları müqayisə et</p>
      <div className="mt-3 grid gap-3 sm:grid-cols-3">
        {PLAN_SPECS.map((spec) => (
          <PlanSpecCard
            key={spec.id}
            spec={spec}
            current={spec.id === plan}
            upgrade={(PLAN_RANK[spec.id] ?? 0) > currentRank}
            loading={upgrading === spec.id}
            onUpgrade={() => spec.id !== "free" && onUpgrade(spec.id)}
          />
        ))}
      </div>

      {/* Pro-only: buy more credits */}
      {plan === "pro" ? (
        <div className="mt-7">
          <div className="flex items-center gap-2">
            <Zap className="h-4 w-4 text-primary" />
            <h3 className="text-[15px] font-semibold">Əlavə kredit al</h3>
          </div>
          <p className="mt-1 text-[13px] text-muted-foreground">
            Krediti bitəndə anında doldur — bu paketlər yalnız Pro üçündür.
          </p>
          <div className="mt-3 grid gap-3 sm:grid-cols-3">
            {CREDIT_PACKS.map((pack) => (
              <CreditPackCard
                key={pack.id}
                pack={pack}
                loading={buyingPack === pack.id}
                onBuy={() => onBuyCredits(pack.id)}
              />
            ))}
          </div>
        </div>
      ) : null}

      {/* cancel (paid plans only) */}
      {plan !== "free" ? (
        <div className="mt-7 flex flex-col gap-3 rounded-2xl border border-border p-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-[14px] font-medium">Planı ləğv et</p>
            <p className="mt-0.5 text-[12px] text-muted-foreground">
              Pulsuz plana keç. Qalan kreditlərin saxlanılır.
            </p>
          </div>
          {confirmCancel ? (
            <div className="flex items-center gap-2">
              <button
                onClick={onCancel}
                disabled={cancelling}
                className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-red-600 px-3.5 text-[13px] font-medium text-white transition-colors hover:bg-red-700 disabled:opacity-50"
              >
                {cancelling ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : null}
                Bəli, ləğv et
              </button>
              <button
                onClick={() => setConfirmCancel(false)}
                disabled={cancelling}
                className="inline-flex h-9 items-center rounded-lg border border-border px-3.5 text-[13px] font-medium transition-colors hover:bg-muted disabled:opacity-50"
              >
                Geri
              </button>
            </div>
          ) : (
            <button
              onClick={() => setConfirmCancel(true)}
              className="inline-flex h-9 shrink-0 items-center rounded-lg border border-border px-3.5 text-[13px] font-medium text-foreground transition-colors hover:bg-muted"
            >
              Planı ləğv et
            </button>
          )}
        </div>
      ) : null}

      <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
        <p className="text-[12px] text-muted-foreground">
          Qeyd: Stripe hələ konfiqurasiya olunmayıbsa, yüksəltmə pulsuz simulyasiyadır.
        </p>
        <button
          onClick={onSync}
          disabled={syncing}
          className="inline-flex items-center gap-1.5 text-[12px] font-medium text-primary transition-colors hover:underline disabled:opacity-50"
        >
          {syncing ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
          ) : (
            <RefreshCw className="h-3.5 w-3.5" />
          )}
          Ödəniş etmisən, amma görünmür? Bərpa et
        </button>
      </div>
    </div>
  );
}

function PlanSpecCard({
  spec,
  current,
  upgrade,
  loading,
  onUpgrade,
}: {
  spec: PlanSpec;
  current: boolean;
  upgrade: boolean;
  loading: boolean;
  onUpgrade: () => void;
}) {
  return (
    <div
      className={cn(
        "flex flex-col rounded-2xl border p-4",
        current ? "border-primary/60 bg-primary/[0.04]" : "border-border",
      )}
    >
      <div className="flex items-center justify-between">
        <p className="text-[14px] font-semibold">{spec.name}</p>
        {current ? (
          <span className="rounded-full bg-primary/12 px-2 py-0.5 text-[10px] font-medium text-primary">
            Cari
          </span>
        ) : null}
      </div>
      <p className="mt-1 text-[13px] text-muted-foreground">
        <span className="text-[17px] font-semibold text-foreground">{spec.price}</span>
        {spec.period}
      </p>
      <ul className="mt-3 flex flex-1 flex-col gap-2">
        {spec.features.map((f) => (
          <li key={f} className="flex items-start gap-2 text-[12.5px] text-foreground/80">
            <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" strokeWidth={3} />
            {f}
          </li>
        ))}
      </ul>
      {upgrade ? (
        <button
          onClick={onUpgrade}
          disabled={loading}
          className="mt-4 inline-flex h-9 items-center justify-center gap-1.5 rounded-lg bg-foreground text-[13px] font-medium text-background transition-colors hover:bg-foreground/90 disabled:opacity-50"
        >
          {loading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : null}
          {spec.name}-a keç
        </button>
      ) : current ? (
        <p className="mt-4 inline-flex h-9 items-center justify-center gap-1.5 rounded-lg bg-muted/60 text-[13px] font-medium text-muted-foreground">
          <Check className="h-3.5 w-3.5" /> Aktiv plan
        </p>
      ) : (
        <p className="mt-4 inline-flex h-9 items-center justify-center rounded-lg text-[12px] text-muted-foreground/55">
          Daha aşağı plan
        </p>
      )}
    </div>
  );
}

function CreditPackCard({
  pack,
  loading,
  onBuy,
}: {
  pack: { id: string; credits: number; amount: number; name: string };
  loading: boolean;
  onBuy: () => void;
}) {
  const price = `${(pack.amount / 100).toFixed(2)} ₼`;
  return (
    <div className="flex flex-col items-start rounded-2xl border border-border p-4">
      <p className="font-mono text-[18px] font-semibold tabular-nums">+{pack.credits}</p>
      <p className="text-[12px] text-muted-foreground">kredit</p>
      <button
        onClick={onBuy}
        disabled={loading}
        className="mt-3 inline-flex h-9 w-full items-center justify-center gap-1.5 rounded-lg bg-primary text-[13px] font-medium text-primary-foreground transition-colors hover:bg-[hsl(var(--primary-hover))] disabled:opacity-50"
      >
        {loading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : null}
        {price}
      </button>
    </div>
  );
}

const PROVIDER_LABEL: Record<string, string> = {
  vercel: "Vercel",
  supabase: "Supabase",
};

const CONNECT_ERROR_MESSAGE: Record<string, string> = {
  config:
    "Vercel inteqrasiyası tam qurulmayıb — server açarları (FOUNDRR_VERCEL_CLIENT_ID/SECRET) təyin edilməyib.",
  token:
    "Vercel token mübadiləsi alınmadı. Çox güman ki, inteqrasiyanın Redirect URL-i bu domenlə uyğun gəlmir.",
  no_code: "Vercel kodu gəlmədi. Yenidən cəhd et.",
  encrypt: "Şifrələmə açarı konfiqurasiya olunmayıb.",
  save: "Bağlantı bazaya yazılmadı.",
  unknown: "Vercel qoşulmadı. Yenidən cəhd et.",
};

function ConnectionsTab({
  justConnected,
  connectError,
}: {
  justConnected?: string;
  connectError?: string;
}) {
  const [connected, setConnected] = React.useState<Record<string, boolean>>(
    justConnected ? { [justConnected]: true } : {},
  );
  const [vercel, setVercel] = React.useState("");
  const [supaRef, setSupaRef] = React.useState("");
  const [supaToken, setSupaToken] = React.useState("");
  const [saving, setSaving] = React.useState<string | null>(null);

  React.useEffect(() => {
    fetch("/api/connections")
      .then((r) => r.json())
      .then((d: { connections?: { provider: string }[] }) => {
        const map: Record<string, boolean> = {};
        for (const c of d.connections ?? []) map[c.provider] = true;
        setConnected(map);
      })
      .catch(() => {});
  }, []);

  const save = async (
    provider: string,
    token: string,
    meta?: Record<string, unknown>,
  ) => {
    if (!token.trim()) return;
    setSaving(provider);
    try {
      const res = await fetch("/api/connections", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ provider, token, meta }),
      });
      if (res.ok) {
        setConnected((c) => ({ ...c, [provider]: true }));
        if (provider === "vercel") setVercel("");
        if (provider === "supabase") setSupaToken("");
      }
    } finally {
      setSaving(null);
    }
  };

  return (
    <div className="max-w-[520px]">
      <h2 className="text-[20px] font-semibold tracking-tight">Bağlantılar</h2>
      <p className="mt-1 text-[14px] text-muted-foreground">
        Saytını öz hesabına yayımlamaq üçün hesablarını qoş. Açarlar şifrələnir.
      </p>

      {connectError ? (
        <div className="mt-5 flex items-start gap-3 rounded-2xl border border-red-500/30 bg-red-500/[0.06] p-4">
          <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-red-500/15 text-red-600">
            <X className="h-4 w-4" strokeWidth={3} />
          </span>
          <div>
            <p className="text-[14px] font-semibold text-red-700">Vercel qoşulmadı</p>
            <p className="text-[12.5px] text-red-700/80">
              {CONNECT_ERROR_MESSAGE[connectError] ?? CONNECT_ERROR_MESSAGE.unknown}
            </p>
          </div>
        </div>
      ) : null}

      {justConnected ? (
        <div
          className="mt-5 flex items-center gap-3 rounded-2xl border border-emerald-500/30 bg-emerald-500/[0.07] p-4"
          style={{ animation: "connected-pop 0.4s ease-out" }}
        >
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white">
            <Check className="h-5 w-5" strokeWidth={3} />
          </span>
          <div>
            <p className="text-[14px] font-semibold text-emerald-700">
              {PROVIDER_LABEL[justConnected] ?? justConnected} qoşuldu!
            </p>
            <p className="text-[12.5px] text-emerald-700/75">
              Artıq saytını birbaşa öz hesabına yayımlaya bilərsən.
            </p>
          </div>
        </div>
      ) : null}

      <div className="mt-6 rounded-2xl border border-border p-5">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2 text-[15px] font-semibold">
            <svg viewBox="0 0 76 65" aria-hidden className="h-3.5 w-3.5 fill-current">
              <path d="M37.53 0 75.06 65H0z" />
            </svg>
            Vercel
          </span>
          {connected.vercel ? (
            <span className="inline-flex items-center gap-1.5 text-[12px] font-medium text-emerald-600">
              <Check className="h-3.5 w-3.5" /> Qoşuldu
            </span>
          ) : null}
        </div>
        <p className="mt-1 text-[12px] text-muted-foreground">
          Saytın öz Vercel hesabına yayımlanır — canlı URL alırsan.
        </p>
        <a
          href="/api/connections/vercel/authorize"
          className="mt-3 inline-flex h-10 w-full items-center justify-center gap-2 rounded-xl bg-foreground text-[13px] font-medium text-background transition-colors hover:bg-foreground/90"
        >
          <svg viewBox="0 0 76 65" aria-hidden className="h-3.5 w-3.5 fill-current">
            <path d="M37.53 0 75.06 65H0z" />
          </svg>
          Vercel ilə qoşul
        </a>
        <p className="mt-3 text-[11px] text-muted-foreground">və ya token ilə qoş:</p>
        <div className="mt-2 flex gap-2">
          <input
            type="password"
            value={vercel}
            onChange={(e) => setVercel(e.target.value)}
            placeholder="vercel_…"
            className="h-10 flex-1 rounded-xl border border-border bg-background px-3 text-[13px] outline-none focus:border-[hsl(var(--ring)/0.5)]"
          />
          <SaveBtn loading={saving === "vercel"} onClick={() => save("vercel", vercel)} />
        </div>
      </div>

      <div className="mt-4 rounded-2xl border border-border p-5">
        <div className="flex items-center justify-between">
          <span className="text-[15px] font-semibold">Supabase</span>
          {connected.supabase ? (
            <span className="inline-flex items-center gap-1.5 text-[12px] font-medium text-emerald-600">
              <Check className="h-3.5 w-3.5" /> Qoşuldu
            </span>
          ) : null}
        </div>
        <p className="mt-1 text-[12px] text-muted-foreground">
          Form məlumatları üçün baza. supabase.com/dashboard/account/tokens.
        </p>
        <input
          value={supaRef}
          onChange={(e) => setSupaRef(e.target.value)}
          placeholder="Layihə ref (məs: abcd1234efgh)"
          className="mt-3 h-10 w-full rounded-xl border border-border bg-background px-3 text-[13px] outline-none focus:border-[hsl(var(--ring)/0.5)]"
        />
        <div className="mt-2 flex gap-2">
          <input
            type="password"
            value={supaToken}
            onChange={(e) => setSupaToken(e.target.value)}
            placeholder="sbp_…"
            className="h-10 flex-1 rounded-xl border border-border bg-background px-3 text-[13px] outline-none focus:border-[hsl(var(--ring)/0.5)]"
          />
          <SaveBtn
            loading={saving === "supabase"}
            onClick={() => save("supabase", supaToken, { ref: supaRef.trim() })}
          />
        </div>
      </div>

      <p className="mt-4 text-[12px] text-muted-foreground">
        Açarlar şifrələnmiş şəkildə, yalnız server tərəfində saxlanılır.
      </p>
    </div>
  );
}

function SaveBtn({ loading, onClick }: { loading: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className="inline-flex h-10 shrink-0 items-center gap-1.5 rounded-xl bg-foreground px-4 text-[13px] font-medium text-background transition-colors hover:bg-foreground/90 disabled:opacity-50"
    >
      {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
      Qoş
    </button>
  );
}
