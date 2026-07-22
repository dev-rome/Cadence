import type { DemoTab } from "@/lib/content/demo";
import { RoutingMockup } from "./mockups/routing-mockup";
import { TimelineMockup } from "./mockups/timeline-mockup";
import { StatusMockup } from "./mockups/status-mockup";

const mockups: Record<DemoTab, React.ComponentType> = {
  routing: RoutingMockup,
  timeline: TimelineMockup,
  status: StatusMockup,
};

export function DemoMockup({ tab }: { tab: DemoTab }) {
  const Mockup = mockups[tab];
  return <Mockup />;
}
