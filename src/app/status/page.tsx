import type { Metadata } from "next";
import Link from "next/link";

import { FoundrrLogo } from "@/components/brand/foundrr-logo";
import { getHealthReport } from "@/lib/health/checks";
import { getUptimeHistory, maybeRecordSnapshot } from "@/lib/health/history";
import { StatusBoard } from "@/components/status/status-board";

// Status must always reflect live state.
export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Sistem vəziyyəti",
  description: "Foundrr xidmətlərinin real vaxt vəziyyəti.",
  robots: { index: false },
};

export default async function StatusPage() {
  const report = await getHealthReport();
  await maybeRecordSnapshot(report);
  const history = await getUptimeHistory(
    report.components.map((c) => c.key),
    90,
  );

  return (
    <main className="relative mx-auto flex min-h-screen w-full max-w-2xl flex-col px-5 py-10 sm:py-16">
      <div
        aria-hidden
        className="pointer-events-none fixed inset-x-0 top-0 -z-10 h-80 bg-[radial-gradient(70%_100%_at_50%_0%,hsl(var(--grad-violet)/0.10),hsl(var(--grad-pink)/0.05)_45%,transparent_75%)]"
      />
      <header className="flex items-center justify-between">
        <Link
          href="/"
          className="transition-opacity hover:opacity-80"
        >
          <FoundrrLogo markSize={28} wordmarkClassName="text-[15px]" />
        </Link>
        <span className="text-[13px] text-muted-foreground">Sistem vəziyyəti</span>
      </header>

      <StatusBoard initial={report} history={history} />
    </main>
  );
}
