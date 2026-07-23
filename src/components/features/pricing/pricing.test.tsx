import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import type { Tier } from "@/lib/pricing";
import { Pricing } from "./pricing";
import userEvent from "@testing-library/user-event";

const tiers: Tier[] = [
  {
    id: "starter",
    name: "Starter",
    pricePerSeat: 0,
    includedSeats: 5,
    annualDiscount: 0,
    customPricing: false,
    features: ["Up to 5 seats"],
    highlighted: false,
  },
  {
    id: "team",
    name: "Team",
    pricePerSeat: 12,
    includedSeats: 0,
    annualDiscount: 0.2,
    customPricing: false,
    features: ["Escalation policies", "Public status pages"],
    highlighted: true,
  },
];

describe("Pricing", () => {
  it("renders a card for every tier it is given", () => {
    render(<Pricing tiers={tiers} />);
    expect(
      screen.getByRole("heading", { level: 3, name: "Starter" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 3, name: "Team" }),
    ).toBeInTheDocument();
  });

  it("shows the free tier as free regardless of seat count", () => {
    render(<Pricing tiers={tiers} />);
    expect(screen.getByText("Free")).toBeInTheDocument();
  });

  it("recalculates the price when the billing cycle changes", async () => {
    render(<Pricing tiers={tiers} />);

    // Default: 10 seats, annual, 20% off → 10 * 12 * 0.8 = $96
    expect(screen.getByText("$96")).toBeInTheDocument();

    await userEvent.click(screen.getByRole("radio", { name: /monthly/i }));

    // Monthly: 10 * 12 = $120
    expect(screen.getByText("$120")).toBeInTheDocument();
  });

  it("recalculates the price when the seat count changes", async () => {
    render(<Pricing tiers={tiers} />);

    const slider = screen.getByRole("slider");
    slider.focus();
    await userEvent.keyboard("{ArrowRight}");

    expect(await screen.findByText("$106")).toBeInTheDocument();
  });

  it("moves between billing options with arrow keys", async () => {
    render(<Pricing tiers={tiers} />);

    const annual = screen.getByRole("radio", { name: /annual/i });
    annual.focus();
    await userEvent.keyboard("{ArrowLeft}");

    expect(screen.getByRole("radio", { name: /monthly/i })).toBeChecked();
  });

  it("shows custom pricing regardless of the tier id", () => {
    render(
      <Pricing
        tiers={[
          {
            ...tiers[1],
            id: "a7f3c9e1-4b2d-4e8a-9c1f-2d3e4f5a6b7c",
            name: "Enterprise",
            pricePerSeat: 0,
            customPricing: true,
          },
        ]}
      />,
    );

    expect(screen.getByText("Custom")).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /contact sales/i }),
    ).toBeInTheDocument();
    expect(screen.queryByText("Free")).not.toBeInTheDocument();
  });

  it("renders without crashing when given an empty list", () => {
    render(<Pricing tiers={[]} />);
    expect(screen.getByRole("heading", { level: 2 })).toBeInTheDocument();
  });
});
