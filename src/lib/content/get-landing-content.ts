import { fetchLandingPage } from "@/lib/graphql/fetch-landing-page";
import { fallbackFeatures } from "./features";
import { fallbackProblems } from "./problems";
import { fallbackTestimonials } from "./testimonials";
import { fallbackFaqs } from "./faqs";
import { fallbackTiers } from "@/lib/pricing";
import { mapFeatures } from "./map-features";
import { mapProblems } from "./map-problems";
import { mapTestimonials } from "./map-testimonials";
import { mapFaqs } from "./map-faqs";
import { mapTiers } from "./map-tiers";

export async function getLandingContent() {
  const fallback = {
    features: fallbackFeatures,
    problems: fallbackProblems,
    testimonials: fallbackTestimonials,
    tiers: fallbackTiers,
    faqs: fallbackFaqs,
  };

  try {
    const data = await fetchLandingPage();

    const features = mapFeatures(data.allFeature);
    const problems = mapProblems(data.allProblem);
    const testimonials = mapTestimonials(data.allTestimonial);
    const tiers = mapTiers(data.allPricingTier);
    const faqs = mapFaqs(data.allFaqItem);

    return {
      features: features.length ? features : fallback.features,
      problems: problems.length ? problems : fallback.problems,
      testimonials: testimonials.length ? testimonials : fallback.testimonials,
      tiers: tiers.length ? tiers : fallback.tiers,
      faqs: faqs.length ? faqs : fallback.faqs,
    };
  } catch (error) {
    console.error("CMS fetch failed, using fallback content", error);
    return fallback;
  }
}
