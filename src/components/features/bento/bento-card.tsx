import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { cn } from "@/lib/utils/cn";
import type { Feature } from "@/lib/content/features";
import { visuals } from "./visuals";

const spanClasses: Record<Feature["span"], string> = {
  wide: "md:col-span-4",
  standard: "md:col-span-2",
};

export function BentoCard({ feature }: { feature: Feature }) {
  const Visual = visuals[feature.visual];

  return (
    <Card
      padding="none"
      className={cn(
        "flex h-full flex-col overflow-hidden",
        spanClasses[feature.span],
      )}
    >
      <div className="border-line bg-surface-sunken/50 relative flex-1 border-b p-6">
        <Visual />
      </div>
      <div className="p-6">
        <CardTitle as="h3" className="text-title">
          {feature.title}
        </CardTitle>
        <CardDescription className="mt-2">{feature.body}</CardDescription>
      </div>
    </Card>
  );
}
