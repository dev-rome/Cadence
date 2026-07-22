import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/ui/reveal";
import {
  Accordion,
  AccordionItem,
  AccordionPanel,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqs } from "@/lib/content/faqs";

export function Faq() {
  return (
    <Section id="faq" labelledBy="faq-heading">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
          <Reveal>
            <div className="lg:sticky lg:top-28">
              <p className="text-caption text-ink-subtle font-mono tracking-widest uppercase">
                FAQ
              </p>
              <h2
                id="faq-heading"
                className="text-heading text-ink mt-4 text-balance"
              >
                Questions, answered
              </h2>
              <p className="text-body text-ink-muted mt-4">
                Still curious?{" "}
                <a href="#contact" className="text-accent hover:underline">
                  Talk to us
                </a>
                .
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <Accordion>
              {faqs.map((faq) => (
                <AccordionItem key={faq.value} value={faq.value}>
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionPanel>{faq.answer}</AccordionPanel>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
