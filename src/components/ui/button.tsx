import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        gradient:
          "bg-aurora text-white shadow-[0_14px_34px_-16px_hsl(var(--grad-violet)/0.72)] hover:-translate-y-0.5 hover:brightness-[1.04] active:translate-y-0",
        accent:
          "bg-primary text-primary-foreground shadow-[0_10px_24px_-12px_hsl(var(--primary)/0.75)] hover:-translate-y-0.5 hover:bg-[hsl(var(--primary-hover))] active:translate-y-0",
        primary:
          "bg-primary text-primary-foreground shadow-[0_10px_24px_-12px_hsl(var(--primary)/0.75)] hover:-translate-y-0.5 hover:bg-[hsl(var(--primary-hover))] active:translate-y-0",
        ghost: "text-muted-foreground hover:bg-muted/80 hover:text-foreground",
        outline:
          "border border-border bg-background/70 text-foreground shadow-[0_1px_1px_hsl(var(--foreground)/0.04)] hover:border-primary/40 hover:bg-muted/70",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-9 px-4 text-[13px]",
        default: "h-11 px-5 text-sm",
        lg: "h-12 px-6 text-[15px]",
        icon: "h-11 w-11 p-0",
      },
    },
    defaultVariants: {
      variant: "accent",
      size: "default",
    },
  },
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, type = "button", ...props }, ref) => (
    <button
      ref={ref}
      type={type}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  ),
);
Button.displayName = "Button";

export { Button, buttonVariants };
export type { ButtonProps };
