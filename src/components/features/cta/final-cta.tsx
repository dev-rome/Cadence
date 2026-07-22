import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";

export function FinalCta() {
  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 60% 80% at 50% 100%, color-mix(in oklab, var(--color-accent) 12%, transparent), transparent)",
        }}
      />
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-heading text-ink text-balance">
            Stop finding out from Twitter
          </h2>
          <p className="text-lead text-ink-muted mt-4 text-pretty">
            Set up on-call, a shared timeline, and a status page in an
            afternoon. Free for up to five seats.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button size="lg" render={<a href="#start">Start free</a>} />
            <Button
              variant="secondary"
              size="lg"
              render={<a href="#demo">See how it works</a>}
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
