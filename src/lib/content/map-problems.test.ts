import { describe, expect, it } from "vitest";
import { mapProblems } from "./map-problems";

const valid = {
  _id: "abc",
  title: "Alerts go nowhere",
  body: "Your monitoring fires into a Slack channel at 3am.",
};

describe("mapProblems", () => {
  it("maps a valid problem", () => {
    expect(mapProblems([valid])).toEqual([
      {
        id: "abc",
        title: "Alerts go nowhere",
        body: "Your monitoring fires into a Slack channel at 3am.",
      },
    ]);
  });

  it("returns an empty array for null or undefined input", () => {
    expect(mapProblems(null)).toEqual([]);
    expect(mapProblems(undefined)).toEqual([]);
  });

  it("drops entries missing required fields", () => {
    expect(mapProblems([{ ...valid, _id: null }])).toEqual([]);
    expect(mapProblems([{ ...valid, title: null }])).toEqual([]);
    expect(mapProblems([{ ...valid, body: null }])).toEqual([]);
  });

  it("keeps valid entries alongside invalid ones", () => {
    const result = mapProblems([valid, { ...valid, _id: "def", body: null }]);
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("abc");
  });

  it("survives nulls in the array", () => {
    expect(mapProblems([null, valid])).toHaveLength(1);
  });
});
