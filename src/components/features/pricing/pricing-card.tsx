import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils/cn";
import {
  monthlyCost,
  formatPrice,
  type BillingCycle,
  type Tier,
} from "@/lib/pricing";

export function PricingCard({
  tier,
  seats,
  cycle,
}: {
  tier: Tier;
  seats: number;
  cycle: BillingCycle;
}) {
  const isCustom = tier.customPricing;
  const isFree = tier.pricePerSeat === 0 && !isCustom;
  const cost = monthlyCost(tier, seats, cycle);
  const cycleLabel = cycle === "annual" ? "annually" : "monthly";

  return (
    <Card
      className={cn(
        "flex h-full flex-col",
        tier.highlighted && "border-accent/40 ring-accent/20 ring-1",
      )}
    >
      {tier.highlighted && (
        <span className="text-caption text-accent-text font-mono">
          Most popular
        </span>
      )}

      <h3 className="text-title text-ink mt-1">{tier.name}</h3>

      <div className="mt-4">
        {isCustom ? (
          <span className="text-heading text-ink">Custom</span>
        ) : isFree ? (
          <span className="text-heading text-ink">Free</span>
        ) : (
          <>
            <span className="text-heading text-ink font-mono">
              {formatPrice(cost)}
            </span>
            <span className="text-caption text-ink-subtle">/mo</span>
          </>
        )}
      </div>

      <p className="text-caption text-ink-subtle mt-1">
        {isCustom
          ? "Annual contract"
          : isFree
            ? `Up to ${tier.includedSeats} seats`
            : `${seats} seats, billed ${cycleLabel}`}
      </p>

      <ul className="mt-6 flex-1 space-y-3">
        {tier.features.map((feature) => (
          <li key={feature} className="text-caption text-ink-muted flex gap-2">
            <CheckIcon />
            {feature}
          </li>
        ))}
      </ul>

      <Button
        variant={tier.highlighted ? "primary" : "secondary"}
        size="lg"
        className="mt-8 w-full"
        render={
          <a href="#start">{isCustom ? "Contact sales" : "Start free"}</a>
        }
      />
    </Card>
  );
}

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="text-status-ok mt-0.5 size-4 shrink-0"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="m5 13 4 4L19 7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
