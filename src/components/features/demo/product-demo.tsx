"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/ui/reveal";
import { Tab, TabPanel, Tabs, TabsList } from "@/components/ui/tabs";
import { transition } from "@/lib/motion";
import { demoPanels, type DemoTab } from "@/lib/content/demo";
import { useState } from "react";
import { DemoMockup } from "./demo-mockup";

export function ProductDemo() {
  const [active, setActive] = useState<DemoTab>("routing");
  const shouldReduceMotion = useReducedMotion();
  const panel = demoPanels.find((p) => p.value === active)!;

  return (
    <Section id="demo" labelledBy="demo-heading">
      <Container>
        <Reveal>
          <div className="max-w-2xl">
            <p className="text-caption text-ink-subtle font-mono tracking-widest uppercase">
              How it works
            </p>
            <h2
              id="demo-heading"
              className="text-heading text-ink mt-4 text-balance"
            >
              See it from every angle
            </h2>
          </div>
        </Reveal>

        <div className="mt-12">
          <Tabs
            defaultValue="routing"
            value={active}
            onValueChange={(v) => setActive(v as DemoTab)}
          >
            <TabsList>
              {demoPanels.map((p) => (
                <Tab key={p.value} value={p.value}>
                  {p.label}
                </Tab>
              ))}
            </TabsList>

            {demoPanels.map((p) => (
              <TabPanel key={p.value} value={p.value} />
            ))}
          </Tabs>

          <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_1.4fr] lg:items-start">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={shouldReduceMotion ? undefined : { opacity: 0, y: -8 }}
                transition={transition.base}
              >
                <h3 className="text-title text-ink">{panel.heading}</h3>
                <p className="text-body text-ink-muted mt-3 max-w-md">
                  {panel.body}
                </p>
              </motion.div>
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={
                  shouldReduceMotion ? false : { opacity: 0, scale: 0.98 }
                }
                animate={{ opacity: 1, scale: 1 }}
                exit={
                  shouldReduceMotion ? undefined : { opacity: 0, scale: 0.98 }
                }
                transition={transition.base}
                className="rounded-panel border-line bg-surface-raised border p-6 shadow-2xl shadow-black/20"
              >
                <DemoMockup tab={active} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </Container>
    </Section>
  );
}
