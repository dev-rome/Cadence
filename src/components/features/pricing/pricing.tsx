"use client";

import { useState } from "react";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/ui/reveal";
import { Slider } from "@/components/ui/slider";
import { type BillingCycle, type Tier } from "@/lib/pricing";
import { BillingToggle } from "./billing-toggle";
import { PricingCard } from "./pricing-card";

export function Pricing({ tiers }: { tiers: Tier[] }) {
  const [cycle, setCycle] = useState<BillingCycle>("annual");
  const [seats, setSeats] = useState(10);

  return (
    <Section id="pricing" labelledBy="pricing-heading">
      <Container>
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-caption text-ink-subtle font-mono tracking-widest uppercase">
              Pricing
            </p>
            <h2
              id="pricing-heading"
              className="text-heading text-ink mt-4 text-balance"
            >
              Priced per seat, not per incident
            </h2>
          </div>
        </Reveal>

        <div className="mx-auto mt-10 flex max-w-md flex-col items-center gap-6">
          <BillingToggle cycle={cycle} onChange={setCycle} />
          <div className="w-full">
            <Slider
              label="Team size"
              defaultValue={10}
              value={seats}
              onValueChange={(v) => setSeats(v as number)}
              min={1}
              max={200}
              formatValue={(n) => `${n} ${n === 1 ? "seat" : "seats"}`}
            />
          </div>
        </div>

        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {tiers.map((tier, i) => (
            <Reveal key={tier.id} delay={i * 0.1}>
              <PricingCard tier={tier} seats={seats} cycle={cycle} />
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
