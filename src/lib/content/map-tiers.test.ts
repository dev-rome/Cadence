import { describe, expect, it } from "vitest";
import { mapTiers } from "./map-tiers";

const valid = {
  _id: "abc",
  name: "Team",
  pricePerSeat: 12,
  includedSeats: 0,
  annualDiscount: 0.2,
  features: ["Escalation policies", "Public status pages"],
  highlighted: true,
};

describe("mapTiers", () => {
  it("maps a valid tier", () => {
    expect(mapTiers([valid])).toEqual([
      {
        id: "abc",
        name: "Team",
        pricePerSeat: 12,
        includedSeats: 0,
        annualDiscount: 0.2,
        features: ["Escalation policies", "Public status pages"],
        highlighted: true,
      },
    ]);
  });

  it("returns an empty array for null or undefined input", () => {
    expect(mapTiers(null)).toEqual([]);
    expect(mapTiers(undefined)).toEqual([]);
  });

  it("drops entries with no id or no name", () => {
    expect(mapTiers([{ ...valid, _id: null }])).toEqual([]);
    expect(mapTiers([{ ...valid, name: null }])).toEqual([]);
  });

  it("defaults missing numeric fields to zero", () => {
    const result = mapTiers([
      {
        ...valid,
        pricePerSeat: null,
        includedSeats: null,
        annualDiscount: null,
      },
    ]);
    expect(result[0].pricePerSeat).toBe(0);
    expect(result[0].includedSeats).toBe(0);
    expect(result[0].annualDiscount).toBe(0);
  });

  it("drops a tier with an out-of-range annual discount", () => {
    expect(mapTiers([{ ...valid, annualDiscount: 20 }])).toEqual([]);
    expect(mapTiers([{ ...valid, annualDiscount: 1.5 }])).toEqual([]);
    expect(mapTiers([{ ...valid, annualDiscount: -0.5 }])).toEqual([]);
  });

  it("drops a tier with negative pricing values", () => {
    expect(mapTiers([{ ...valid, pricePerSeat: -12 }])).toEqual([]);
    expect(mapTiers([{ ...valid, includedSeats: -5 }])).toEqual([]);
  });

  it("filters nulls and empty strings out of the features array", () => {
    const result = mapTiers([
      { ...valid, features: ["SSO", null, "", "SAML"] },
    ]);
    expect(result[0].features).toEqual(["SSO", "SAML"]);
  });

  it("handles a missing features array", () => {
    const result = mapTiers([{ ...valid, features: null }]);
    expect(result[0].features).toEqual([]);
  });

  it("defaults highlighted to false when missing", () => {
    const result = mapTiers([{ ...valid, highlighted: null }]);
    expect(result[0].highlighted).toBe(false);
  });

  it("survives nulls in the array", () => {
    expect(mapTiers([null, valid])).toHaveLength(1);
  });
});
