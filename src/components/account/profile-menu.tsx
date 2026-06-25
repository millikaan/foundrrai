"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { ChevronDown, CreditCard, LogOut, Settings, Sparkles } from "lucide-react";

import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";
import { SettingsModal } from "@/components/account/settings-modal";
import { UpgradeTour } from "@/components/account/upgrade-tour";

interface ProfileMenuProps {
  name: string;
  email: string;
  plan: string;
  credits: number;
  /** Sidebar variant opens the menu upward and shows name + email inline. */
  variant?: "nav" | "sidebar";
  /** True on the dashboard — settings open inline; elsewhere they route here. */
  onDashboard?: boolean;
}

export function ProfileMenu({
  name,
  email,
  plan,
  credits: initialCredits,
  variant = "nav",
  onDashboard = false,
}: ProfileMenuProps) {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [settingsOpen, setSettingsOpen] = React.useState(false);
  const [settingsTab, setSettingsTab] = React.useState<
    "account" | "plan" | "connections"
  >("account");
  const [justConnected, setJustConnected] = React.useState<string | undefined>();
  const [connectError, setConnectError] = React.useState<string | undefined>();
  const [connectDetail, setConnectDetail] = React.useState<string | undefined>();
  const [tour, setTour] = React.useState<{ plan: string; granted: number } | null>(null);

  const [plan_, setPlan] = React.useState(plan);
  const [credits, setCredits] = React.useState(initialCredits);

  const initial = (name || email || "?").charAt(0).toUpperCase();
  const isSidebar = variant === "sidebar";

  const signOut = async () => {
    await createClient().auth.signOut();
    router.push("/");
    router.refresh();
  };

  React.useEffect(() => {
    if (!onDashboard) return;
    const params = new URLSearchParams(window.location.search);
    const tab = params.get("settings");
    const connected = params.get("connected") ?? undefined;
    const connectErr = (params.get("connect") ?? "").endsWith("_error")
      ? (params.get("reason") ?? "unknown")
      : undefined;
    const connectDtl = params.get("detail") ?? undefined;
    const upgraded = params.get("upgraded");

    if (tab === "account" || tab === "plan" || tab === "connections") {
      setSettingsTab(tab);
      if (connected) setJustConnected(connected);
      if (connectErr) setConnectError(connectErr);
      if (connectDtl) setConnectDetail(connectDtl);
      setSettingsOpen(true);
      window.history.replaceState(null, "", "/workspace");
    }

    // Returned from Stripe Checkout — reconcile the plan from Stripe even if the
    // webhook isn't set up, then celebrate the upgrade.
    if (upgraded) {
      window.history.replaceState(null, "", "/workspace");
      fetch("/api/billing/sync", { method: "POST" })
        .then((r) => r.json())
        .then((d) => {
          if (d?.changed) onUpgraded(d.plan, d.credits);
        })
        .catch(() => {});
    }
  }, [onDashboard]); // eslint-disable-line react-hooks/exhaustive-deps

  const openSettings = (tab: "account" | "plan") => {
    setOpen(false);
    if (onDashboard) {
      setSettingsTab(tab);
      setSettingsOpen(true);
    } else {
      // Settings live on the dashboard — go there and open them.
      router.push(`/workspace?settings=${tab}`);
    }
  };

  const onUpgraded = (newPlan: string, newCredits: number) => {
    const granted = Math.max(0, newCredits - credits);
    setPlan(newPlan);
    setCredits(newCredits);
    setSettingsOpen(false);
    setTour({ plan: newPlan, granted });
    router.refresh();
  };

  // Plan/credit change without the celebratory tour (cancel, credit top-up).
  const onPlanChanged = (newPlan: string, newCredits: number) => {
    setPlan(newPlan);
    setCredits(newCredits);
    router.refresh();
  };

  return (
    <>
      <div className="relative">
        <button
          onClick={() => setOpen((v) => !v)}
          className={cn(
            "flex items-center gap-2 rounded-full transition-colors",
            isSidebar
              ? "w-full justify-start rounded-xl border border-border bg-card p-2 hover:bg-muted"
              : "p-0.5 hover:opacity-90",
          )}
        >
          <span className="brand-mark flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[13px] font-semibold text-white">
            {initial}
          </span>
          {isSidebar ? (
            <span className="flex min-w-0 flex-1 flex-col text-left">
              <span className="truncate text-[13px] font-medium">{name || "İstifadəçi"}</span>
              <span className="truncate text-[11px] text-muted-foreground">{email}</span>
            </span>
          ) : (
            <span className="hidden text-[14px] font-medium sm:inline">{name || "Hesab"}</span>
          )}
          <ChevronDown
            className={cn(
              "h-4 w-4 text-muted-foreground transition-transform",
              !isSidebar && "hidden sm:block",
              open && "rotate-180",
            )}
          />
        </button>

        {open ? (
          <>
            <button
              className="fixed inset-0 z-40 cursor-default"
              onClick={() => setOpen(false)}
              aria-hidden
              tabIndex={-1}
            />
            <div
              className={cn(
                "absolute z-50 w-60 overflow-hidden rounded-xl border border-border bg-card p-1.5 shadow-[0_20px_60px_-20px_hsl(240_22%_13%/0.35)]",
                isSidebar ? "bottom-full left-0 mb-2" : "right-0 mt-2",
              )}
            >
              <div className="flex items-center gap-2.5 px-2.5 py-2">
                <span className="brand-mark flex h-9 w-9 items-center justify-center rounded-full text-[14px] font-semibold text-white">
                  {initial}
                </span>
                <div className="min-w-0">
                  <p className="truncate text-[13px] font-medium">{name || "İstifadəçi"}</p>
                  <p className="truncate text-[12px] text-muted-foreground">{email}</p>
                </div>
              </div>

              <div className="my-1 flex items-center justify-between rounded-lg bg-muted/50 px-2.5 py-1.5">
                <span className="text-[12px] text-muted-foreground">
                  {plan_ === "free" ? "Pulsuz plan" : `${plan_[0].toUpperCase()}${plan_.slice(1)} plan`}
                </span>
                <span className="font-mono text-[12px] font-semibold tabular-nums">
                  {credits} kredit
                </span>
              </div>

              <MenuItem icon={Settings} label="Parametrlər" onClick={() => openSettings("account")} />
              <MenuItem
                icon={CreditCard}
                label="Plan və ödəniş"
                onClick={() => openSettings("plan")}
              />
              {plan_ === "free" ? (
                <MenuItem
                  icon={Sparkles}
                  label="Pro-ya keç"
                  accent
                  onClick={() => openSettings("plan")}
                />
              ) : null}
              <div className="my-1 h-px bg-border" />
              <MenuItem icon={LogOut} label="Çıxış" onClick={signOut} />
            </div>
          </>
        ) : null}
      </div>

      <SettingsModal
        open={settingsOpen}
        onClose={() => {
          setSettingsOpen(false);
          setJustConnected(undefined);
          setConnectError(undefined);
          setConnectDetail(undefined);
        }}
        name={name}
        email={email}
        plan={plan_}
        credits={credits}
        initialTab={settingsTab}
        justConnected={justConnected}
        connectError={connectError}
        connectDetail={connectDetail}
        onUpgraded={onUpgraded}
        onPlanChanged={onPlanChanged}
        onSignOut={signOut}
      />

      <UpgradeTour
        open={tour !== null}
        onClose={() => setTour(null)}
        plan={tour?.plan ?? "pro"}
        granted={tour?.granted ?? 0}
      />
    </>
  );
}

function MenuItem({
  icon: Icon,
  label,
  onClick,
  accent,
}: {
  icon: typeof Settings;
  label: string;
  onClick: () => void;
  accent?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-[13px] transition-colors hover:bg-muted",
        accent ? "font-medium text-primary" : "text-foreground",
      )}
    >
      <Icon className="h-4 w-4" />
      {label}
    </button>
  );
}
