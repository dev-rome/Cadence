import { describe, expect, it } from "vitest";
import { monthlyCost, fallbackTiers, type Tier } from "./pricing";

const team = fallbackTiers.find((t) => t.id === "team")!;
const starter = fallbackTiers.find((t) => t.id === "starter")!;

describe("monthlyCost", () => {
  it("is free for a zero-price tier regardless of seats", () => {
    expect(monthlyCost(starter, 5, "monthly")).toBe(0);
    expect(monthlyCost(starter, 50, "annual")).toBe(0);
  });

  it("multiplies seats by per-seat price when billed monthly", () => {
    expect(monthlyCost(team, 10, "monthly")).toBe(120);
  });

  it("applies the annual discount", () => {
    expect(monthlyCost(team, 10, "annual")).toBe(96);
  });

  it("subtracts included seats before charging", () => {
    const tier: Tier = { ...team, includedSeats: 3 };
    expect(monthlyCost(tier, 10, "monthly")).toBe(84);
  });

  it("never goes negative below the included seat count", () => {
    const tier: Tier = { ...team, includedSeats: 5 };
    expect(monthlyCost(tier, 2, "monthly")).toBe(0);
  });

  it("handles a single seat", () => {
    expect(monthlyCost(team, 1, "monthly")).toBe(12);
  });
});
