import { SiteHeader } from "@/components/layout/site-header";
import { Hero } from "@/components/features/hero/hero";
import { LogoCloud } from "@/components/features/logos/logo-cloud";
import { Problem } from "@/components/features/problem/problem";
import { BentoGrid } from "@/components/features/bento/bento-grid";
import { ProductDemo } from "@/components/features/demo/product-demo";
import { Metrics } from "@/components/features/metrics/metrics";
import { Testimonials } from "@/components/features/testimonials/testimonials";
import { Pricing } from "@/components/features/pricing/pricing";
import { Faq } from "@/components/features/faq/faq";
import { FinalCta } from "@/components/features/cta/final-cta";
import { SiteFooter } from "@/components/layout/site-footer";
import { fetchLandingPage } from "@/lib/graphql/fetch-landing-page";
import { mapFeatures } from "@/lib/content/map-features";
import { fallbackFeatures } from "@/lib/content/features";

export const revalidate = 3600;

export default async function HomePage() {
  let features = fallbackFeatures;

  try {
    const data = await fetchLandingPage();
    const mapped = mapFeatures(data.allFeature);
    if (mapped.length > 0) features = mapped;
  } catch (error) {
    console.error("CMS fetch failed, using fallback content", error);
  }

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
        <LogoCloud />
        <Problem />
        <BentoGrid features={features} />
        <ProductDemo />
        <Metrics />
        <Testimonials />
        <Pricing />
        <Faq />
        <FinalCta />
      </main>

      <SiteFooter />
    </>
  );
}
