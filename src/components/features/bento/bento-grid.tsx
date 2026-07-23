import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/ui/reveal";
import type { Feature } from "@/lib/content/features";
import { BentoCard } from "./bento-card";

export function BentoGrid({ features }: { features: Feature[] }) {
  return (
    <Section id="features" labelledBy="features-heading">
      <Container>
        <Reveal>
          <div className="max-w-2xl">
            <p className="text-caption text-ink-subtle font-mono tracking-widest uppercase">
              Features
            </p>
            <h2
              id="features-heading"
              className="text-heading text-ink mt-4 text-balance"
            >
              Everything you need when things break
            </h2>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-4 md:mt-16 md:grid-cols-6">
          {features.map((feature, i) => (
            <Reveal
              key={feature.id}
              delay={(i % 2) * 0.08}
              className="contents"
            >
              <BentoCard feature={feature} />
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
