import { cn } from "@/lib/utils/cn";

export function Container({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn("px-gutter mx-auto w-full max-w-300 md:px-8", className)}
    >
      {children}
    </div>
  );
}
