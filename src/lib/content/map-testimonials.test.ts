import { describe, expect, it } from "vitest";
import { mapTestimonials } from "./map-testimonials";

const valid = {
  _id: "abc",
  quote: "We cut our median time to acknowledge to under two minutes.",
  name: "Dana Okafor",
  role: "Staff Engineer",
  company: "Ledgerline",
  initials: "DO",
};

describe("mapTestimonials", () => {
  it("maps a valid testimonial", () => {
    expect(mapTestimonials([valid])).toEqual([
      {
        id: "abc",
        quote: "We cut our median time to acknowledge to under two minutes.",
        name: "Dana Okafor",
        role: "Staff Engineer",
        company: "Ledgerline",
        initials: "DO",
      },
    ]);
  });

  it("returns an empty array for null or undefined input", () => {
    expect(mapTestimonials(null)).toEqual([]);
    expect(mapTestimonials(undefined)).toEqual([]);
  });

  it("drops entries with no quote or no name", () => {
    expect(mapTestimonials([{ ...valid, quote: null }])).toEqual([]);
    expect(mapTestimonials([{ ...valid, name: null }])).toEqual([]);
    expect(mapTestimonials([{ ...valid, _id: null }])).toEqual([]);
  });

  it("derives initials from the name when missing", () => {
    const result = mapTestimonials([{ ...valid, initials: null }]);
    expect(result[0].initials).toBe("DA");
  });

  it("defaults missing role and company to empty strings", () => {
    const result = mapTestimonials([{ ...valid, role: null, company: null }]);
    expect(result[0].role).toBe("");
    expect(result[0].company).toBe("");
  });

  it("survives nulls in the array", () => {
    expect(mapTestimonials([null, valid])).toHaveLength(1);
  });
});
