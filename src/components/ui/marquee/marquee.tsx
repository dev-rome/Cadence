import { cn } from "@/lib/utils/cn";

export interface MarqueeProps extends React.ComponentPropsWithoutRef<"div"> {
  duration?: number;
  reverse?: boolean;
  pauseOnHover?: boolean;
  fadeEdges?: boolean;
  repeat?: number;
}

export function Marquee({
  duration = 40,
  reverse = false,
  pauseOnHover = true,
  fadeEdges = true,
  repeat = 4,
  className,
  children,
  ...props
}: MarqueeProps) {
  const copy = (
    <div className="flex shrink-0 items-center gap-10 pe-10">{children}</div>
  );

  return (
    <div
      className={cn(
        "group relative w-full overflow-hidden",
        fadeEdges &&
          "mask-[linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]",
        className,
      )}
      style={
        {
          "--marquee-duration": `${duration}s`,
          "--marquee-shift": `${-100 / repeat}%`,
        } as React.CSSProperties
      }
      {...props}
    >
      <div
        className={cn(
          "flex w-max animate-[marquee_var(--marquee-duration)_linear_infinite]",
          reverse && "[animation-direction:reverse]",
          pauseOnHover && "group-hover:[animation-play-state:paused]",
          "motion-reduce:animate-none",
        )}
      >
        {Array.from({ length: repeat }).map((_, i) => (
          <div key={i} aria-hidden={i > 0} className="contents">
            {copy}
          </div>
        ))}
      </div>
    </div>
  );
}
