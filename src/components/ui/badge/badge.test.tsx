import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Badge } from "./badge";

describe("Badge", () => {
  it("renders its label", () => {
    render(<Badge status="operational">Operational</Badge>);
    expect(screen.getByText("Operational")).toBeInTheDocument();
  });

  it("hides the decorative dot from assistive technology", () => {
    const { container } = render(<Badge status="down">Major outage</Badge>);
    expect(container.querySelector('[aria-hidden="true"]')).toBeInTheDocument();
  });

  it("omits the dot when showDot is false", () => {
    const { container } = render(<Badge showDot={false}>Beta</Badge>);
    expect(container.querySelector('[aria-hidden="true"]')).toBeNull();
  });
});
