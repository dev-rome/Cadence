"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";
import { phaseOrder, phases, type Phase } from "./incident-phases";

export function useIncidentSequence(): Phase {
  const shouldReduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (shouldReduceMotion) return;

    const current = phaseOrder[index];
    const timer = setTimeout(() => {
      setIndex((prev) => (prev + 1) % phaseOrder.length);
    }, phases[current].duration);

    return () => clearTimeout(timer);
  }, [index, shouldReduceMotion]);

  return shouldReduceMotion ? "acknowledged" : phaseOrder[index];
}
