import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/layout/container";
import { HeroBackground } from "./hero-background";
import { IncidentSimulation } from "./incident-simulation";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-24">
      <HeroBackground />
      <Container>
        <div className="grid items-center gap-12 xl:grid-cols-[45fr_55fr] xl:gap-16">
          <div>
            <Badge status="operational" className="mb-6">
              Incident response for small teams
            </Badge>

            <h1 className="text-display text-ink text-balance">
              Know first. Fix faster. Tell everyone.
            </h1>

            <p className="text-lead text-ink-muted mt-6 max-w-xl text-pretty">
              Cadence pages the right engineer, keeps a shared timeline of what
              happened, and updates your status page automatically. No war room
              required.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button size="lg" render={<a href="#start">Start free</a>} />
              <Button
                variant="secondary"
                size="lg"
                render={<a href="#demo">See how it works</a>}
              />
            </div>

            <p className="text-caption text-ink-subtle mt-6">
              Trusted by 400+ engineering teams
            </p>
          </div>

          <div className="xl:-mr-16">
            <IncidentSimulation />
          </div>
        </div>
      </Container>
    </section>
  );
}
