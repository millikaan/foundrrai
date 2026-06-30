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
  | "store"
  | "cafe"
  | "gym";

export interface ShowcaseItem {
  id: TemplateId;
  name: string;
  tag: string;
  desc: string;
  domain: string;
}

/** Scaled template preview — top-anchored, non-interactive. */
export function Template({ id }: { id: TemplateId }) {
  return (
    <SitePreview designWidth={1280}>
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
  return (
    <div className={cn("group relative min-w-0", className)}>
      <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-black/[0.06] bg-[hsl(var(--preview-canvas))] shadow-[0_1px_2px_hsl(var(--foreground)/0.04),0_8px_24px_-16px_hsl(var(--foreground)/0.08)] transition-all duration-300 group-hover:-translate-y-1 group-hover:border-black/[0.08] group-hover:shadow-[0_24px_56px_-32px_hsl(var(--foreground)/0.18)] dark:border-white/10 dark:group-hover:border-white/14">
        <div className="absolute inset-0 transition-transform duration-500 ease-out group-hover:scale-[1.02]">
          <Template id={item.id} />
        </div>
      </div>

      <div className="pointer-events-none pt-3 sm:pt-3.5">
        <div className="min-w-0">
          <p className="truncate text-[13px] font-semibold tracking-tight text-foreground sm:text-[14px]">
            {item.name}
          </p>
          <p className="mt-0.5 line-clamp-2 text-[12px] leading-snug text-muted-foreground">
            {item.desc}
          </p>
        </div>
      </div>

      <Link
        href={`/templates/${item.id}`}
        aria-label={item.name}
        className="absolute inset-0 z-10 rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
      />
    </div>
  );
}
