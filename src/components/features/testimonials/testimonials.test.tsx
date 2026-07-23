import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Testimonials } from "./testimonials";

const testimonials = [
  {
    id: "a",
    quote: "We cut our time to acknowledge to under two minutes.",
    name: "Dana Okafor",
    role: "Staff Engineer",
    company: "Ledgerline",
    initials: "DO",
  },
  {
    id: "b",
    quote: "The postmortem draft saves us an hour every incident.",
    name: "Marco Silva",
    role: "Head of Platform",
    company: "Freightwave",
    initials: "MS",
  },
];

describe("Testimonials", () => {
  it("renders every quote and attribution", () => {
    render(<Testimonials testimonials={testimonials} />);
    expect(screen.getByText(/under two minutes/i)).toBeInTheDocument();
    expect(screen.getByText("Dana Okafor")).toBeInTheDocument();
    expect(screen.getByText(/Staff Engineer, Ledgerline/)).toBeInTheDocument();
  });

  it("renders without crashing when given an empty list", () => {
    render(<Testimonials testimonials={[]} />);
    expect(screen.getByRole("heading", { level: 2 })).toBeInTheDocument();
  });
});
