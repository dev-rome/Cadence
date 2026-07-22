import { Container } from "@/components/layout/container";
import { Marquee } from "@/components/ui/marquee";

const companies = [
  "Linear",
  "Vercel",
  "Retool",
  "Ramp",
  "Supabase",
  "Cal.com",
  "Resend",
  "Railway",
];

export function LogoCloud() {
  return (
    <section className="py-16 md:py-20">
      <Container>
        <p className="text-caption text-ink-subtle mb-8 text-center font-mono tracking-widest uppercase">
          Trusted by engineering teams at
        </p>
      </Container>

      <Marquee duration={40}>
        {companies.map((name) => (
          <span
            key={name}
            className="text-title text-ink-subtle hover:text-ink font-medium whitespace-nowrap transition-colors"
          >
            {name}
          </span>
        ))}
      </Marquee>
    </section>
  );
}
