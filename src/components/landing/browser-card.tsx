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
      <div className="relative aspect-[16/10] overflow-hidden rounded-[10px] bg-muted/30 transition-shadow duration-300 group-hover:shadow-[0_12px_32px_-24px_hsl(var(--foreground)/0.28)] md:rounded-xl">
        <Template id={item.id} />
      </div>

      <div className="pointer-events-none pt-2 md:pt-2.5">
        <p className="truncate text-[12px] font-semibold tracking-tight text-foreground md:text-[14px]">
          {item.name}
        </p>
        <p className="mt-0.5 line-clamp-1 text-[10px] leading-snug text-muted-foreground md:text-[12px]">
          {item.desc}
        </p>
      </div>

      <Link
        href={`/templates/${item.id}`}
        aria-label={item.name}
        className="absolute inset-0 z-10 rounded-[10px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 md:rounded-xl"
      />
    </div>
  );
}
