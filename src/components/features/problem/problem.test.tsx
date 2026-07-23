import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Problem } from "./problem";

const problems = [
  {
    id: "a",
    title: "Alerts go nowhere",
    body: "Monitoring fires into Slack at 3am.",
  },
  {
    id: "b",
    title: "Nobody knows what happened",
    body: "The timeline lives in three DMs.",
  },
];

describe("Problem", () => {
  it("renders a card for every problem it is given", () => {
    render(<Problem problems={problems} />);
    expect(
      screen.getByRole("heading", { level: 3, name: /alerts go nowhere/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 3, name: /nobody knows/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(/three DMs/i)).toBeInTheDocument();
  });

  it("renders the section heading regardless of content", () => {
    render(<Problem problems={problems} />);
    expect(screen.getByRole("heading", { level: 2 })).toBeInTheDocument();
  });

  it("renders without crashing when given an empty list", () => {
    render(<Problem problems={[]} />);
    expect(screen.queryAllByRole("heading", { level: 3 })).toHaveLength(0);
  });
});
