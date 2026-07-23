export type BillingCycle = "monthly" | "annual";

export interface Tier {
  id: string;
  name: string;
  pricePerSeat: number;
  includedSeats: number;
  annualDiscount: number;
  customPricing: boolean;
  features: string[];
  highlighted: boolean;
}

export const fallbackTiers: Tier[] = [
  {
    id: "starter",
    name: "Starter",
    pricePerSeat: 0,
    includedSeats: 5,
    annualDiscount: 0,
    customPricing: false,
    features: [
      "Up to 5 seats",
      "On-call scheduling",
      "Shared incident timeline",
      "Community support",
    ],
    highlighted: false,
  },
  {
    id: "team",
    name: "Team",
    pricePerSeat: 12,
    includedSeats: 0,
    annualDiscount: 0.2,
    customPricing: false,
    features: [
      "Everything in Starter",
      "Escalation policies",
      "Public status pages",
      "Postmortem drafts",
      "All integrations",
    ],
    highlighted: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    pricePerSeat: 0,
    includedSeats: 0,
    annualDiscount: 0,
    customPricing: true,
    features: [
      "Everything in Team",
      "SSO and SAML",
      "On-premise deployment",
      "Dedicated support",
      "99.99% uptime SLA",
    ],
    highlighted: false,
  },
];

/**
 * Monthly cost for a tier at a given seat count and billing cycle.
 * Returns the per-month figure even when billed annually, so the UI
 * can always show a "/mo" price.
 */
export function monthlyCost(
  tier: Tier,
  seats: number,
  cycle: BillingCycle,
): number {
  if (tier.pricePerSeat === 0) return 0;

  const billableSeats = Math.max(0, seats - tier.includedSeats);
  const base = billableSeats * tier.pricePerSeat;

  if (cycle === "annual") {
    return base * (1 - tier.annualDiscount);
  }
  return base;
}

export function formatPrice(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}
