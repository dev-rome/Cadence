import type { Transition } from "motion/react";

type Bezier = [number, number, number, number];

export const duration = {
  fast: 0.15,
  base: 0.3,
  slow: 0.5,
  reveal: 0.6,
};

export const ease: Record<"out" | "quart", Bezier> = {
  out: [0.16, 1, 0.3, 1],
  quart: [0.25, 1, 0.5, 1],
};

export const transition = {
  fast: { duration: duration.fast, ease: ease.out },
  base: { duration: duration.base, ease: ease.out },
  reveal: { duration: duration.reveal, ease: ease.out },
} satisfies Record<string, Transition>;
