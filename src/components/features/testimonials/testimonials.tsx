import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Card } from "@/components/ui/card";
import { Reveal } from "@/components/ui/reveal";
import type { Testimonial } from "@/lib/content/testimonials";

export function Testimonials({
  testimonials,
}: {
  testimonials: Testimonial[];
}) {
  return (
    <Section id="testimonials" labelledBy="testimonials-heading">
      <Container>
        <Reveal>
          <h2
            id="testimonials-heading"
            className="text-heading text-ink max-w-2xl text-balance"
          >
            Teams that stopped dreading the pager
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-4 md:mt-16 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.id} delay={i * 0.1}>
              <Card className="flex h-full flex-col">
                <blockquote className="text-lead text-ink text-pretty">
                  {t.quote}
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3">
                  <span
                    aria-hidden="true"
                    className="bg-surface-sunken text-caption text-ink-muted grid size-10 shrink-0 place-items-center rounded-full font-medium"
                  >
                    {t.initials}
                  </span>
                  <span className="text-caption text-ink-muted">
                    <span className="text-ink block font-medium">{t.name}</span>
                    {t.role}, {t.company}
                  </span>
                </figcaption>
              </Card>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
