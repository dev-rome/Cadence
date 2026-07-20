import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils/cn";

const badgeVariants = cva(
  [
    "inline-flex items-center gap-1.5",
    "rounded-pill border px-2.5 py-0.5",
    "font-mono text-caption",
  ],
  {
    variants: {
      status: {
        operational: "border-status-ok/20 bg-status-ok/10 text-status-ok",
        degraded: "border-status-warn/20 bg-status-warn/10 text-status-warn",
        down: "border-status-down/20 bg-status-down/10 text-status-down",
        neutral: "border-line bg-surface-raised text-ink-muted",
      },
    },
    defaultVariants: { status: "neutral" },
  },
);

const dotVariants = cva("size-1.5 rounded-pill", {
  variants: {
    status: {
      operational: "bg-status-ok",
      degraded: "bg-status-warn",
      down: "bg-status-down",
      neutral: "bg-ink-subtle",
    },
  },
  defaultVariants: { status: "neutral" },
});

export interface BadgeProps
  extends
    React.ComponentPropsWithoutRef<"span">,
    VariantProps<typeof badgeVariants> {
  showDot?: boolean;
}

export function Badge({
  status,
  showDot = true,
  className,
  children,
  ...props
}: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ status }), className)} {...props}>
      {showDot && (
        <span aria-hidden="true" className={dotVariants({ status })} />
      )}
      {children}
    </span>
  );
}
