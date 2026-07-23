"use client";

import { useEffect, useRef } from "react";
import {
  animate,
  useInView,
  useMotionValue,
  useReducedMotion,
} from "motion/react";
import { Container } from "@/components/layout/container";

const stats = [
  { value: 94, suffix: "%", label: "faster acknowledgment" },
  { value: 4.2, suffix: "m", label: "median time to resolve" },
  { value: 400, suffix: "+", label: "engineering teams" },
];

export function Metrics() {
  return (
    <section
      aria-labelledby="metrics-heading"
      className="border-line border-y py-16 md:py-20"
    >
      <h2 id="metrics-heading" className="sr-only">
        Key metrics
      </h2>
      <Container>
        <div className="grid gap-8 sm:grid-cols-3">
          {stats.map((stat) => (
            <Stat key={stat.label} {...stat} />
          ))}
        </div>
      </Container>
    </section>
  );
}

function Stat({
  value,
  suffix,
  label,
}: {
  value: number;
  suffix: string;
  label: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const shouldReduceMotion = useReducedMotion();
  const count = useMotionValue(0);

  const decimals = value % 1 !== 0 ? 1 : 0;

  useEffect(() => {
    if (!inView) return;

    if (shouldReduceMotion) {
      if (ref.current) ref.current.textContent = value.toFixed(decimals);
      return;
    }

    const controls = animate(count, value, {
      duration: 1.2,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => {
        if (ref.current) ref.current.textContent = latest.toFixed(decimals);
      },
    });
    return () => controls.stop();
  }, [inView, value, decimals, shouldReduceMotion, count]);

  return (
    <div className="text-center">
      <div className="text-display text-ink font-mono">
        <span ref={ref}>{value.toFixed(decimals)}</span>
        {suffix}
      </div>
      <div className="text-caption text-ink-subtle mt-2">{label}</div>
    </div>
  );
}
