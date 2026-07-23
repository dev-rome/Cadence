import { defineField, defineType } from "sanity";

export const pricingTier = defineType({
  name: "pricingTier",
  title: "Pricing tier",
  type: "document",
  fields: [
    defineField({
      name: "name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "pricePerSeat",
      title: "Price per seat (monthly, USD)",
      type: "number",
      description: "Use 0 for free or contact-sales tiers.",
      validation: (rule) => rule.required().min(0),
    }),
    defineField({
      name: "includedSeats",
      type: "number",
      description: "Seats included before per-seat billing starts.",
      validation: (rule) => rule.required().integer().min(0),
    }),
    defineField({
      name: "annualDiscount",
      title: "Annual discount",
      type: "number",
      description: "A fraction between 0 and 1. 0.2 means 20% off.",
      validation: (rule) => rule.required().min(0).max(1),
    }),
    defineField({
      name: "features",
      type: "array",
      of: [{ type: "string" }],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: "highlighted",
      title: "Highlight this tier",
      type: "boolean",
      description: "Only one tier should be highlighted.",
      initialValue: false,
    }),
    defineField({
      name: "customPricing",
      title: "Custom pricing",
      type: "boolean",
      description: "Show 'Custom' and a contact-sales CTA instead of a price.",
      initialValue: false,
    }),
    defineField({
      name: "order",
      type: "number",
      validation: (rule) => rule.required().integer().min(0),
    }),
  ],
  preview: { select: { title: "name", subtitle: "pricePerSeat" } },
});
