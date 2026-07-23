"use client";

import { RadioGroup } from "@base-ui/react/radio-group";
import { Radio } from "@base-ui/react/radio";
import { motion, useReducedMotion } from "motion/react";
import type { BillingCycle } from "@/lib/pricing";
import { cn } from "@/lib/utils/cn";

const options: { value: BillingCycle; label: string }[] = [
  { value: "monthly", label: "Monthly" },
  { value: "annual", label: "Annual" },
];

export function BillingToggle({
  cycle,
  onChange,
}: {
  cycle: BillingCycle;
  onChange: (cycle: BillingCycle) => void;
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <RadioGroup
      value={cycle}
      onValueChange={(value) => onChange(value as BillingCycle)}
      aria-label="Billing cycle"
      className="rounded-pill border-line bg-surface-raised inline-flex border p-1"
    >
      {options.map((option) => {
        const isActive = cycle === option.value;
        return (
          <Radio.Root
            key={option.value}
            value={option.value}
            className={cn(
              "rounded-pill text-caption relative cursor-pointer px-4 py-1.5 transition-colors",
              "focus-visible:ring-accent focus-visible:ring-2 focus-visible:outline-none",
              isActive ? "text-ink" : "text-ink-muted hover:text-ink",
            )}
          >
            {isActive && (
              <motion.span
                layoutId="billing-active"
                aria-hidden="true"
                className="rounded-pill bg-surface-sunken absolute inset-0"
                transition={
                  shouldReduceMotion
                    ? { duration: 0 }
                    : { type: "spring", bounce: 0.2, duration: 0.4 }
                }
              />
            )}
            <span className="relative flex items-center gap-1.5">
              {option.label}
              {option.value === "annual" && (
                <span className="text-status-ok-text text-caption">-20%</span>
              )}
            </span>
          </Radio.Root>
        );
      })}
    </RadioGroup>
  );
}
