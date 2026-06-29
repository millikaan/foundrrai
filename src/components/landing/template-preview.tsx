import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { TemplateMeta } from "@/lib/templates";

import { TemplateSite } from "@/components/templates/template-site";

/**
 * Full-screen template "website" view. Visitors browse it as a template; the
 * floating oval "Remix et" pill (pinned to the bottom of the screen) takes them
 * to sign up, then into the builder with this template.
 */
export function TemplatePreview({ template }: { template: TemplateMeta }) {
  return (
    <div className="min-h-screen pb-28">
      {/* slim top bar */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-[1160px] items-center justify-between px-6">
          <Link
            href="/#showcase"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Şablonlar
          </Link>
          <div className="flex items-center gap-2 text-sm font-medium">
            <span>{template.name}</span>
            <span className="hidden rounded-full bg-muted px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground sm:inline">
              {template.tag}
            </span>
          </div>
          <Link
            href={`/signup?intent=remix&next=${encodeURIComponent(`/workspace/build?remix=${template.id}`)}`}
            className={buttonVariants({ variant: "accent", size: "sm" })}
          >
            Remix et
          </Link>
        </div>
      </header>

      {/* the template, shown large in a browser frame */}
      <main className="mx-auto max-w-[1100px] px-6 py-10">
        <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-[0_40px_100px_-50px_hsl(240_22%_13%/0.35)]">
          <div className="flex items-center gap-2 border-b border-border bg-muted/50 px-4 py-3">
            <span className="flex gap-1.5">
              <span className="h-3 w-3 rounded-full bg-foreground/15" />
              <span className="h-3 w-3 rounded-full bg-foreground/15" />
              <span className="h-3 w-3 rounded-full bg-foreground/15" />
            </span>
            <span className="mx-auto text-[12px] font-medium text-muted-foreground">
              Önizləmə
            </span>
            <span className="w-10" aria-hidden />
          </div>
          {/* the full template website, scrollable inside the browser frame */}
          <div className="h-[74vh] overflow-y-auto bg-white">
            <TemplateSite id={template.id} />
          </div>
        </div>

        <div className="mx-auto mt-8 max-w-[640px] text-center">
          <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
            {template.tag}
          </span>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight">
            {template.name}
          </h1>
          <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">
            {template.desc} Bu şablonu remix et — öz biznesinə uyğunlaşdır, sonra
            öz hesabına yayımla.
          </p>
        </div>
      </main>

      {/* floating oval "Remix et" pill at the bottom of the screen */}
      <div className="pointer-events-none fixed inset-x-0 bottom-6 z-50 flex justify-center px-6">
        <Link
          href={`/signup?intent=remix&next=${encodeURIComponent(`/workspace/build?remix=${template.id}`)}`}
          className={cn(
            buttonVariants({ variant: "accent", size: "lg" }),
            "pointer-events-auto rounded-full px-7 shadow-[0_16px_40px_-12px_hsl(240_22%_13%/0.5)]",
          )}
        >
          <Sparkles className="h-4 w-4" />
          Bu saytı remix et
        </Link>
      </div>
    </div>
  );
}
