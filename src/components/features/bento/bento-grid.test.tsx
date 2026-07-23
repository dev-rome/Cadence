import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import type { Feature } from "@/lib/content/features";
import { BentoGrid } from "./bento-grid";

const features: Feature[] = [
  {
    id: "a",
    title: "On-call that actually rotates",
    body: "Schedules and escalation policies.",
    visual: "routing",
    span: "wide",
  },
  {
    id: "b",
    title: "One timeline, automatically",
    body: "Every alert in one ordered record.",
    visual: "timeline",
    span: "standard",
  },
];

describe("BentoGrid", () => {
  it("renders a card for every feature it is given", () => {
    render(<BentoGrid features={features} />);
    expect(
      screen.getByRole("heading", { level: 3, name: /on-call/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 3, name: /one timeline/i }),
    ).toBeInTheDocument();
  });

  it("renders the visual matching each feature's key", () => {
    render(<BentoGrid features={features} />);
    // RoutingVisual renders the on-call label; TimelineVisual renders timestamps
    expect(screen.getByText("on-call")).toBeInTheDocument();
    expect(screen.getByText("14:22:07")).toBeInTheDocument();
  });

  it("renders without crashing when given an empty list", () => {
    render(<BentoGrid features={[]} />);
    expect(screen.queryAllByRole("heading", { level: 3 })).toHaveLength(0);
  });
});
