import { cn } from "@/lib/utils/cn";

export function Section({
  id,
  labelledBy,
  className,
  children,
}: {
  id?: string;
  labelledBy?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn("py-section md:py-section-lg", className)}
    >
      {children}
    </section>
  );
}
