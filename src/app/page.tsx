import { SiteHeader } from "@/components/layout/site-header";
import { Hero } from "@/components/features/hero/hero";

export default function HomePage() {
  return (
    <>
      <a
        href="#main"
        className="rounded-pill bg-accent text-accent-ink sr-only px-4 py-2 focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-60"
      >
        Skip to content
      </a>

      <SiteHeader />

      <main id="main">
        <div id="top" />
        <Hero />
        <div className="h-screen" />
      </main>
    </>
  );
}
