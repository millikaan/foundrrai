import { cn } from "@/lib/utils";

/** Foundrr circle mark — always served from /logo.png in public. */
export function FoundrrLogoMark({
  className,
  size = 20,
}: {
  className?: string;
  size?: number;
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/logo.png"
      alt=""
      width={size}
      height={size}
      aria-hidden
      className={cn("shrink-0 rounded-full", className)}
    />
  );
}

export function FoundrrLogo({
  className,
  markClassName,
  wordmarkClassName,
  showWordmark = true,
  markSize = 20,
}: {
  className?: string;
  markClassName?: string;
  wordmarkClassName?: string;
  showWordmark?: boolean;
  markSize?: number;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <FoundrrLogoMark
        size={markSize}
        className={cn(
          "shadow-[0_8px_18px_-8px_hsl(var(--grad-violet)/0.75)]",
          markClassName,
        )}
      />
      {showWordmark ? (
        <span
          className={cn(
            "font-semibold tracking-tight text-foreground",
            wordmarkClassName,
          )}
        >
          Foundrr
        </span>
      ) : null}
    </span>
  );
}
