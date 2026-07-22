import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Marquee } from "./marquee";

describe("Marquee", () => {
  it("renders the content the configured number of times", () => {
    render(
      <Marquee repeat={4}>
        <span>Northwind</span>
      </Marquee>,
    );
    expect(screen.getAllByText("Northwind")).toHaveLength(4);
  });

  it("defaults to four copies", () => {
    render(
      <Marquee>
        <span>Northwind</span>
      </Marquee>,
    );
    expect(screen.getAllByText("Northwind")).toHaveLength(4);
  });

  it("exposes the content only once to assistive technology", () => {
    render(
      <Marquee>
        <a href="/northwind">Northwind</a>
      </Marquee>,
    );
    expect(screen.getAllByRole("link", { name: "Northwind" })).toHaveLength(1);
  });
});
