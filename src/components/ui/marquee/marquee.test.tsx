import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Marquee } from "./marquee";

describe("Marquee", () => {
  it("renders its content", () => {
    render(
      <Marquee>
        <span>Northwind</span>
      </Marquee>,
    );
    expect(screen.getAllByText("Northwind")).toHaveLength(2);
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
