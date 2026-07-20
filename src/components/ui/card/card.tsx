import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils/cn";

const cardVariants = cva(
  [
    "relative rounded-card border bg-surface-raised",
    "transition-colors duration-200",
  ],
  {
    variants: {
      variant: {
        default: "border-line",
        interactive: "border-line hover:border-line-strong",
      },
      padding: {
        none: "",
        md: "p-6",
        lg: "p-8",
      },
    },
    defaultVariants: { variant: "default", padding: "md" },
  },
);

export interface CardProps
  extends
    React.ComponentPropsWithoutRef<"div">,
    VariantProps<typeof cardVariants> {}

export function Card({ variant, padding, className, ...props }: CardProps) {
  return (
    <div
      className={cn(cardVariants({ variant, padding }), className)}
      {...props}
    />
  );
}

export function CardHeader({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return <div className={cn("flex flex-col gap-2", className)} {...props} />;
}

export interface CardTitleProps extends React.ComponentPropsWithoutRef<"h3"> {
  as?: "h2" | "h3" | "h4";
}

export function CardTitle({
  as: Comp = "h3",
  className,
  ...props
}: CardTitleProps) {
  return <Comp className={cn("text-title text-ink", className)} {...props} />;
}

export function CardDescription({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"p">) {
  return <p className={cn("text-body text-ink-muted", className)} {...props} />;
}

export function CardBody({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return <div className={cn("mt-6", className)} {...props} />;
}

export function CardFooter({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div
      className={cn(
        "border-line mt-6 flex items-center gap-3 border-t pt-4",
        className,
      )}
      {...props}
    />
  );
}
