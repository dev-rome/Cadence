"use client";

import { Slider as Base } from "@base-ui/react/slider";
import { cn } from "@/lib/utils/cn";

export interface SliderProps extends Omit<
  React.ComponentProps<typeof Base.Root>,
  "value" | "defaultValue" | "format"
> {
  label: string;
  defaultValue: number;
  value?: number;
  formatValue?: (value: number) => string;
}

export function Slider({
  label,
  defaultValue,
  value,
  formatValue = (n) => String(n),
  min = 1,
  max = 100,
  step = 1,
  className,
  ...props
}: SliderProps) {
  return (
    <Base.Root
      defaultValue={defaultValue}
      value={value}
      min={min}
      max={max}
      step={step}
      className={cn("flex w-full flex-col gap-3", className)}
      {...props}
    >
      <div className="flex items-baseline justify-between gap-4">
        <span className="text-caption text-ink-muted">{label}</span>
        <Base.Value className="text-body text-ink font-mono">
          {(_formatted, values) => formatValue(values[0])}
        </Base.Value>
      </div>

      <Base.Control className="flex h-5 w-full items-center">
        <Base.Track className="rounded-pill bg-surface-sunken h-1 w-full">
          <Base.Indicator className="rounded-pill bg-accent h-full" />
          <Base.Thumb
            aria-label={label}
            getAriaValueText={(_formatted, value) => formatValue(value)}
            className={cn(
              "rounded-pill border-line-strong bg-ink size-4 border",
              "transition-transform duration-150",
              "hover:scale-110 active:scale-95 motion-reduce:transform-none",
              "focus-visible:ring-accent focus-visible:ring-offset-surface focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none",
            )}
          />
        </Base.Track>
      </Base.Control>
    </Base.Root>
  );
}
