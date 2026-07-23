import { describe, expect, it } from "vitest";
import { mapFaqs } from "./map-faqs";

const valid = {
  _id: "abc",
  question: "Is there really a free tier?",
  answer: "Yes. Up to five seats, free forever.",
};

describe("mapFaqs", () => {
  it("maps a valid faq and uses the id as the accordion value", () => {
    expect(mapFaqs([valid])).toEqual([
      {
        value: "abc",
        question: "Is there really a free tier?",
        answer: "Yes. Up to five seats, free forever.",
      },
    ]);
  });

  it("returns an empty array for null or undefined input", () => {
    expect(mapFaqs(null)).toEqual([]);
    expect(mapFaqs(undefined)).toEqual([]);
  });

  it("drops entries missing required fields", () => {
    expect(mapFaqs([{ ...valid, _id: null }])).toEqual([]);
    expect(mapFaqs([{ ...valid, question: null }])).toEqual([]);
    expect(mapFaqs([{ ...valid, answer: null }])).toEqual([]);
  });

  it("produces unique values for multiple items", () => {
    const result = mapFaqs([valid, { ...valid, _id: "def" }]);
    expect(result.map((f) => f.value)).toEqual(["abc", "def"]);
  });

  it("survives nulls in the array", () => {
    expect(mapFaqs([null, valid])).toHaveLength(1);
  });
});
