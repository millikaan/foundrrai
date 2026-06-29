"use client";

import * as React from "react";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ProfileMenu } from "@/components/account/profile-menu";

const NAV_LINKS = [
  { href: "/#how", label: "Necə işləyir" },
  { href: "/#showcase", label: "Şablonlar" },
  { href: "/pricing", label: "Qiymət" },
  { href: "/status", label: "Status" },
];

const MOBILE_NAV_LINKS = [
  { href: "/#how", label: "Necə işləyir" },
  { href: "/#showcase", label: "Nümunələr" },
  { href: "/pricing", label: "Qiymət" },
];

export interface NavUser {
  name: string;
  email: string;
  plan: string;
  credits: number;
}

export function SiteNav({ user }: { user?: NavUser | null }) {
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-all duration-300",
        scrolled
          ? "border-border bg-background/88 backdrop-blur-xl shadow-[0_1px_12px_hsl(var(--foreground)/0.04)]"
          : "border-border/60 bg-background/80 backdrop-blur-md",
      )}
    >
      <nav className="mx-auto flex h-[72px] max-w-[1180px] items-center justify-between px-5 sm:px-6">
        <Link
          href="/"
          className="flex items-center gap-2.5 font-semibold tracking-tight"
        >
          <span className="brand-mark h-5 w-5 shadow-[0_8px_18px_-8px_hsl(var(--grad-violet)/0.8)]" />
          <span className="text-[18px]">Foundrr</span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="rounded-lg px-3.5 py-2 text-[14px] font-medium text-foreground transition-colors hover:bg-muted/70"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-1 max-md:flex max-sm:hidden">
          {MOBILE_NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="rounded-lg px-2.5 py-2 text-[13px] font-medium text-foreground transition-colors hover:bg-muted/70"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          {user ? (
            <ProfileMenu
              name={user.name}
              email={user.email}
              plan={user.plan}
              credits={user.credits}
            />
          ) : (
            <>
              <Link
                href="/login"
                className={cn(
                  buttonVariants({ variant: "outline", size: "sm" }),
                  "hidden sm:inline-flex",
                )}
              >
                Daxil ol
              </Link>
              <Link
                href="/signup?intent=build"
                className={buttonVariants({ variant: "accent", size: "sm" })}
              >
                Başla
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
