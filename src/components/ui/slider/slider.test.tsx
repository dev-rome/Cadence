import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Slider } from "./slider";
import userEvent from "@testing-library/user-event";

describe("Slider", () => {
  it("exposes an accessible name from the label", () => {
    render(<Slider label="Seats" defaultValue={12} />);
    expect(screen.getByRole("slider", { name: "Seats" })).toBeInTheDocument();
  });

  it("renders the formatted value", () => {
    render(
      <Slider
        label="Seats"
        defaultValue={12}
        formatValue={(n) => `${n} seats`}
      />,
    );
    expect(screen.getByText("12 seats")).toBeInTheDocument();
  });

  it("announces the formatted value to assistive technology", () => {
    render(
      <Slider
        label="Seats"
        defaultValue={12}
        formatValue={(n) => `${n} seats`}
      />,
    );
    expect(screen.getByRole("slider")).toHaveAttribute(
      "aria-valuetext",
      "12 seats",
    );
  });

  it("increments with the arrow keys", async () => {
    render(<Slider label="Seats" defaultValue={12} min={1} max={100} />);
    const slider = screen.getByRole("slider");
    await userEvent.tab();
    await userEvent.keyboard("{ArrowRight}");
    expect(slider).toHaveAttribute("aria-valuenow", "13");
  });

  it("respects the step", async () => {
    render(
      <Slider
        label="Retention"
        defaultValue={90}
        min={30}
        max={365}
        step={30}
      />,
    );
    const slider = screen.getByRole("slider");
    await userEvent.tab();
    await userEvent.keyboard("{ArrowRight}");
    expect(slider).toHaveAttribute("aria-valuenow", "120");
  });

  it("does not go below the minimum", async () => {
    render(<Slider label="Seats" defaultValue={1} min={1} max={100} />);
    const slider = screen.getByRole("slider");
    await userEvent.tab();
    await userEvent.keyboard("{ArrowLeft}");
    expect(slider).toHaveAttribute("aria-valuenow", "1");
  });

  it("calls onValueChange when the value changes", async () => {
    const onValueChange = vi.fn();
    render(
      <Slider label="Seats" defaultValue={12} onValueChange={onValueChange} />,
    );
    await userEvent.tab();
    await userEvent.keyboard("{ArrowRight}");
    expect(onValueChange).toHaveBeenCalled();
  });
});
