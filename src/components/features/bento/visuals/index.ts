import type { FeatureVisual } from "@/lib/content/features";
import { RoutingVisual } from "./routing-visual";
import { TimelineVisual } from "./timeline-visual";
import { StatusVisual } from "./status-visual";
import { PostmortemVisual } from "./postmortem-visual";
import { IntegrationsVisual } from "./integrations-visual";
import { MetricsVisual } from "./metrics-visual";

export const visuals: Record<FeatureVisual, React.ComponentType> = {
  routing: RoutingVisual,
  timeline: TimelineVisual,
  status: StatusVisual,
  postmortem: PostmortemVisual,
  integrations: IntegrationsVisual,
  metrics: MetricsVisual,
};
