import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Reveal } from "@/components/ui/reveal";
import { problems } from "@/lib/content/problems";

export function Problem() {
  return (
    <Section id="problem" labelledBy="problem-heading">
      <Container>
        <Reveal>
          <div className="max-w-2xl">
            <p className="text-caption text-ink-subtle font-mono tracking-widest uppercase">
              The problem
            </p>
            <h2
              id="problem-heading"
              className="text-heading text-ink mt-4 text-balance"
            >
              Incidents are chaos held together by whoever is awake
            </h2>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-4 md:mt-16 md:grid-cols-3">
          {problems.map((problem, i) => (
            <Reveal key={problem.id} delay={i * 0.1}>
              <Card className="h-full">
                <CardHeader>
                  <span
                    aria-hidden="true"
                    className="text-caption text-ink-subtle font-mono"
                  >
                    0{i + 1}
                  </span>
                  <CardTitle as="h3">{problem.title}</CardTitle>
                  <CardDescription>{problem.body}</CardDescription>
                </CardHeader>
              </Card>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
