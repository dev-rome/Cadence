import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
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
    features: ["Up to 5 seats"],
    highlighted: false,
  },
  {
    id: "team",
    name: "Team",
    pricePerSeat: 12,
    includedSeats: 0,
    annualDiscount: 0.2,
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

    // 11 seats, annual → 11 * 12 * 0.8 = $105.60, formatted to $106
    expect(screen.getByText("$106")).toBeInTheDocument();
  });

  it("renders without crashing when given an empty list", () => {
    render(<Pricing tiers={[]} />);
    expect(screen.getByRole("heading", { level: 2 })).toBeInTheDocument();
  });
});
