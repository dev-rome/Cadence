import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import {
  Accordion,
  AccordionItem,
  AccordionPanel,
  AccordionTrigger,
} from "./accordion";
import userEvent from "@testing-library/user-event";

function Fixture(props: React.ComponentProps<typeof Accordion>) {
  return (
    <Accordion {...props}>
      <AccordionItem value="one">
        <AccordionTrigger>Do you support on-premise?</AccordionTrigger>
        <AccordionPanel>Yes, on the Enterprise plan.</AccordionPanel>
      </AccordionItem>
      <AccordionItem value="two">
        <AccordionTrigger>How does billing work?</AccordionTrigger>
        <AccordionPanel>Per seat, billed monthly or annually.</AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}

describe("Accordion", () => {
  it("renders each trigger as a button", () => {
    render(<Fixture />);
    expect(screen.getAllByRole("button")).toHaveLength(2);
  });

  it("starts collapsed", () => {
    render(<Fixture />);
    for (const trigger of screen.getAllByRole("button")) {
      expect(trigger).toHaveAttribute("aria-expanded", "false");
    }
  });

  it("reveals panel content on click", async () => {
    render(<Fixture />);
    await userEvent.click(screen.getByRole("button", { name: /on-premise/i }));
    expect(screen.getByText(/enterprise plan/i)).toBeVisible();
  });

  it("marks the open trigger as expanded", async () => {
    render(<Fixture />);
    const trigger = screen.getByRole("button", { name: /billing/i });
    await userEvent.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");
  });

  it("toggles with the keyboard", async () => {
    render(<Fixture />);
    await userEvent.tab();
    await userEvent.keyboard("{Enter}");
    expect(screen.getByRole("button", { name: /on-premise/i })).toHaveAttribute(
      "aria-expanded",
      "true",
    );
  });

  it("closes the previous panel in single mode", async () => {
    render(<Fixture />);
    const first = screen.getByRole("button", { name: /on-premise/i });
    const second = screen.getByRole("button", { name: /billing/i });

    await userEvent.click(first);
    await userEvent.click(second);

    expect(first).toHaveAttribute("aria-expanded", "false");
    expect(second).toHaveAttribute("aria-expanded", "true");
  });

  it("keeps both panels open in multiple mode", async () => {
    render(<Fixture multiple />);
    const first = screen.getByRole("button", { name: /on-premise/i });
    const second = screen.getByRole("button", { name: /billing/i });

    await userEvent.click(first);
    await userEvent.click(second);

    expect(first).toHaveAttribute("aria-expanded", "true");
    expect(second).toHaveAttribute("aria-expanded", "true");
  });
});
