import { cloneElement, type ReactElement } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils/cn";

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 whitespace-nowrap",
    "rounded-pill font-medium transition-colors duration-150",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
    "disabled:pointer-events-none disabled:opacity-50",
    "active:scale-[0.98] motion-reduce:active:scale-100",
  ],
  {
    variants: {
      variant: {
        primary: "bg-accent text-accent-ink hover:bg-accent-hover",
        secondary:
          "bg-surface-raised text-ink border border-line hover:border-line-strong",
        ghost: "text-ink-muted hover:text-ink hover:bg-surface-raised",
      },
      size: {
        sm: "h-8 px-3 text-caption",
        md: "h-10 px-5 text-body",
        lg: "h-12 px-7 text-body",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export interface ButtonProps
  extends
    React.ComponentPropsWithoutRef<"button">,
    VariantProps<typeof buttonVariants> {
  /** Render as a different element, e.g. render={<Link href="/pricing" />} */
  render?: ReactElement<{ className?: string }>;
  isLoading?: boolean;
}

export function Button({
  className,
  variant,
  size,
  render,
  isLoading = false,
  disabled,
  children,
  ...props
}: ButtonProps) {
  const classes = cn(buttonVariants({ variant, size }), className);

  if (render) {
    return cloneElement(render, {
      className: cn(classes, render.props.className),
    });
  }

  return (
    <button
      className={classes}
      disabled={disabled || isLoading}
      aria-busy={isLoading || undefined}
      {...props}
    >
      {isLoading ? (
        <>
          <Spinner />
          <span className="sr-only">Loading</span>
          <span aria-hidden="true">{children}</span>
        </>
      ) : (
        children
      )}
    </button>
  );
}

function Spinner() {
  return (
    <svg
      className="size-4 animate-spin motion-reduce:animate-none"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="3"
        opacity="0.25"
      />
      <path
        d="M12 2a10 10 0 0 1 10 10"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}
