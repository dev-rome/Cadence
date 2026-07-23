import { siteConfig } from "./site";
import type { Faq } from "@/lib/content/faqs";
import type { Tier } from "@/lib/pricing";

export function softwareApplicationSchema(tiers: Tier[]) {
  const paidTier = tiers.find((t) => t.pricePerSeat > 0);

  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: paidTier?.pricePerSeat ?? 0,
      priceCurrency: "USD",
      description: "Per seat, per month. Free for up to five seats.",
    },
  };
}

export function faqPageSchema(faqs: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}
