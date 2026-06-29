import Link from "next/link";

import { cn } from "@/lib/utils";
import { SitePreview } from "@/components/landing/site-preview";
import { TemplateSite } from "@/components/templates/template-site";

export type TemplateId =
  | "clinic"
  | "florist"
  | "rentacar"
  | "restaurant"
  | "barber"
  | "store";

export interface ShowcaseItem {
  id: TemplateId;
  name: string;
  domain: string;
  tag: string;
  desc: string;
}

/** The real template site, rendered at desktop width and scaled into the frame. */
export function Template({ id }: { id: TemplateId }) {
  return (
    <SitePreview>
      <TemplateSite id={id} />
    </SitePreview>
  );
}

export function BrowserCard({
  item,
  className,
}: {
  item: ShowcaseItem;
  className?: string;
}) {
  // The preview renders a real site (which has its own <a> links), so the card
  // itself must NOT be an <a> — a transparent overlay <Link> handles the click.
  return (
    <div
      className={cn(
        "group relative transition-all duration-300 hover:-translate-y-0.5",
        className,
      )}
    >
      {/* a real, scaled-down template site as the preview (non-interactive) */}
      <div className="relative aspect-[16/9] overflow-hidden rounded-[18px] border border-border bg-card shadow-[0_1px_1px_hsl(var(--foreground)/0.04),0_16px_42px_-38px_hsl(var(--foreground)/0.28)] transition-shadow duration-300 group-hover:shadow-[0_1px_1px_hsl(var(--foreground)/0.04),0_22px_54px_-40px_hsl(var(--foreground)/0.34)]">
        <Template id={item.id} />
        <span className="absolute bottom-1.5 right-2 z-10 rounded-md bg-[hsl(var(--foreground)/0.72)] px-1.5 py-0.5 font-mono text-[9px] text-background backdrop-blur-sm">
          {item.domain}
        </span>
      </div>

      <div className="pt-3.5">
        <div className="flex items-center justify-between gap-2">
          <span className="text-[16px] font-semibold tracking-tight text-foreground">
            {item.name}
          </span>
          <span className="font-mono text-[10px] uppercase tracking-wide text-muted-foreground max-sm:hidden">
            {item.tag}
          </span>
        </div>
        <p className="mt-1 text-[14px] font-medium leading-relaxed text-muted-foreground">
          {item.desc}
        </p>
      </div>

      <Link
        href={`/templates/${item.id}`}
        aria-label={item.name}
        className="absolute inset-0 z-20"
      />
    </div>
  );
}
