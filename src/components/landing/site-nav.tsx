"use client";

import * as React from "react";
import Link from "next/link";

import { FoundrrLogo } from "@/components/brand/foundrr-logo";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ProfileMenu } from "@/components/account/profile-menu";

const NAV_LINKS = [
  { href: "/#how", label: "Necə işləyir" },
  { href: "/#showcase", label: "Şablonlar" },
  { href: "/pricing", label: "Qiymət" },
  { href: "/status", label: "Status" },
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
          : "border-transparent bg-transparent backdrop-blur-none",
      )}
    >
      <nav className="mx-auto grid h-[72px] max-w-[1180px] grid-cols-[1fr_auto_1fr] items-center px-5 sm:px-6">
        <Link href="/" className="justify-self-start font-semibold tracking-tight">
          <FoundrrLogo markSize={20} wordmarkClassName="text-[18px]" />
        </Link>

        <div className="hidden items-center justify-center gap-0.5 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="rounded-lg px-3 py-2 text-[14px] font-medium text-foreground/90 transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center justify-self-end gap-2">
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
                  "hidden rounded-full border-black/[0.12] bg-white/80 sm:inline-flex dark:border-white/15 dark:bg-card/80",
                )}
              >
                Daxil ol
              </Link>
              <Link
                href="/signup?intent=build"
                className={cn(
                  buttonVariants({ size: "sm" }),
                  "rounded-full bg-foreground px-4 text-background hover:bg-foreground/90",
                )}
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
