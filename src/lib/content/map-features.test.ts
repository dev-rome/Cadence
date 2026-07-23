import { describe, expect, it } from "vitest";
import { mapFeatures } from "./map-features";

const valid = {
  _id: "abc",
  title: "On-call that actually rotates",
  body: "Schedules and escalation policies.",
  visual: "routing",
  span: "wide",
};

describe("mapFeatures", () => {
  it("maps a valid feature", () => {
    expect(mapFeatures([valid])).toEqual([
      {
        id: "abc",
        title: "On-call that actually rotates",
        body: "Schedules and escalation policies.",
        visual: "routing",
        span: "wide",
      },
    ]);
  });

  it("returns an empty array for null or undefined input", () => {
    expect(mapFeatures(null)).toEqual([]);
    expect(mapFeatures(undefined)).toEqual([]);
  });

  it("drops entries missing required fields", () => {
    expect(mapFeatures([{ ...valid, _id: null }])).toEqual([]);
    expect(mapFeatures([{ ...valid, title: null }])).toEqual([]);
    expect(mapFeatures([{ ...valid, body: null }])).toEqual([]);
  });

  it("drops entries with an unknown visual key", () => {
    expect(mapFeatures([{ ...valid, visual: "nonexistent" }])).toEqual([]);
    expect(mapFeatures([{ ...valid, visual: null }])).toEqual([]);
  });

  it("drops entries with an unknown span", () => {
    expect(mapFeatures([{ ...valid, span: "enormous" }])).toEqual([]);
    expect(mapFeatures([{ ...valid, span: null }])).toEqual([]);
  });

  it("accepts every known visual key", () => {
    const visuals = [
      "routing",
      "timeline",
      "status",
      "postmortem",
      "integrations",
      "metrics",
    ];
    const result = mapFeatures(
      visuals.map((visual, i) => ({ ...valid, _id: `id-${i}`, visual })),
    );
    expect(result).toHaveLength(6);
  });

  it("keeps valid entries alongside invalid ones", () => {
    const result = mapFeatures([
      valid,
      { ...valid, _id: "def", visual: "bogus" },
    ]);
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("abc");
  });

  it("survives nulls in the array", () => {
    expect(mapFeatures([null, valid])).toHaveLength(1);
  });
});
