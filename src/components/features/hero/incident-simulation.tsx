"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Badge } from "@/components/ui/badge";
import { transition } from "@/lib/motion";
import { phases } from "./incident-phases";
import { useIncidentSequence } from "./use-incident-sequence";

const startTimes = ["14:22:07", "14:22:09", "14:22:41", "14:24:15"];

export function IncidentSimulation() {
  const phase = useIncidentSequence();
  const shouldReduceMotion = useReducedMotion();
  const { status, statusLabel, entries } = phases[phase];

  return (
    <div className="rounded-panel border-line bg-surface-raised border shadow-2xl shadow-black/20">
      <div className="border-line flex items-center gap-2 border-b px-4 py-3">
        <div className="flex gap-1.5" aria-hidden="true">
          <span className="bg-status-down/60 size-3 rounded-full" />
          <span className="bg-status-warn/60 size-3 rounded-full" />
          <span className="bg-status-ok/60 size-3 rounded-full" />
        </div>
        <span className="text-caption text-ink-subtle ml-2 font-mono">
          cadence — incident #4021
        </span>
      </div>

      <div className="p-5">
        <div className="flex items-center justify-between">
          <span className="text-body text-ink font-medium">api-gateway</span>
          <AnimatePresence mode="wait">
            <motion.div
              key={status}
              initial={shouldReduceMotion ? false : { opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={shouldReduceMotion ? undefined : { opacity: 0, y: 4 }}
              transition={transition.fast}
            >
              <Badge status={status}>{statusLabel}</Badge>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="border-line mt-4 min-h-33 space-y-3 border-l pl-4">
          <AnimatePresence initial={false}>
            {entries.map((text, i) => (
              <motion.div
                key={text}
                layout
                initial={shouldReduceMotion ? false : { opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={transition.base}
                className="flex gap-3"
              >
                <span className="text-caption text-ink-subtle shrink-0 font-mono">
                  {startTimes[i]}
                </span>
                <span className="text-caption text-ink-muted">{text}</span>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
