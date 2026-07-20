import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Card, CardHeader, CardTitle } from "./card";

describe("Card", () => {
  it("renders its title as a level 3 heading by default", () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>On-call</CardTitle>
        </CardHeader>
      </Card>,
    );
    expect(
      screen.getByRole("heading", { level: 3, name: "On-call" }),
    ).toBeInTheDocument();
  });

  it("renders the title at the requested heading level", () => {
    render(<CardTitle as="h2">On-call</CardTitle>);
    expect(
      screen.getByRole("heading", { level: 2, name: "On-call" }),
    ).toBeInTheDocument();
  });

  it("exposes a single link when used as an interactive card", () => {
    render(
      <Card variant="interactive">
        <CardHeader>
          <CardTitle>
            <a
              href="/features/on-call"
              className="after:absolute after:inset-0"
            >
              On-call
            </a>
          </CardTitle>
        </CardHeader>
      </Card>,
    );
    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(1);
    expect(links[0]).toHaveAttribute("href", "/features/on-call");
  });
});
