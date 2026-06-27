import type { Metadata } from "next";
import Link from "next/link";

import { getHealthReport } from "@/lib/health/checks";
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

  return (
    <main className="relative mx-auto flex min-h-screen w-full max-w-2xl flex-col px-5 py-10 sm:py-16">
      <div
        aria-hidden
        className="pointer-events-none fixed inset-x-0 top-0 -z-10 h-80 bg-[radial-gradient(70%_100%_at_50%_0%,hsl(var(--grad-violet)/0.10),hsl(var(--grad-pink)/0.05)_45%,transparent_75%)]"
      />
      <header className="flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2.5 transition-opacity hover:opacity-80"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="Foundrr" width={28} height={28} className="h-7 w-7" />
          <span className="text-[15px] font-semibold tracking-tight">Foundrr</span>
        </Link>
        <span className="text-[13px] text-muted-foreground">Sistem vəziyyəti</span>
      </header>

      <StatusBoard initial={report} />

      <footer className="mt-8 flex flex-wrap items-center justify-center gap-4 text-[13px] text-muted-foreground">
        <Link href="/" className="transition-colors hover:text-foreground">
          Ana səhifə
        </Link>
        <span aria-hidden>·</span>
        <Link
          href="/api/status"
          className="transition-colors hover:text-foreground"
        >
          JSON API
        </Link>
      </footer>
    </main>
  );
}
