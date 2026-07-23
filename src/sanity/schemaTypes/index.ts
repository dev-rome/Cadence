import { type SchemaTypeDefinition } from "sanity";
import { feature } from "./feature";
import { testimonial } from "./testimonial";
import { pricingTier } from "./pricingTier";
import { faqItem } from "./faqItem";
import { problem } from "./problem";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [feature, testimonial, pricingTier, faqItem, problem],
};