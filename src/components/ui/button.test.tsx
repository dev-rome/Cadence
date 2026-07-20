import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Button } from "./button";
import userEvent from "@testing-library/user-event";

describe("Button", () => {
  it("renders its label and is findable by role", () => {
    render(<Button>Start free</Button>);
    expect(
      screen.getByRole("button", { name: /start free/i }),
    ).toBeInTheDocument();
  });

  it("calls onClick when pressed", async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Start free</Button>);
    await userEvent.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("does not call onClick when disabled", async () => {
    const onClick = vi.fn();
    render(
      <Button onClick={onClick} disabled>
        Start free
      </Button>,
    );
    await userEvent.click(screen.getByRole("button"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("blocks interaction and announces state while loading", async () => {
    const onClick = vi.fn();
    render(
      <Button onClick={onClick} isLoading>
        Start free
      </Button>,
    );
    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute("aria-busy", "true");
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
    await userEvent.click(button);
    expect(onClick).not.toHaveBeenCalled();
  });

  it("is activated by keyboard", async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Start free</Button>);
    await userEvent.tab();
    await userEvent.keyboard("{Enter}");
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("renders an anchor when given a render element", () => {
    render(<Button render={<a href="#pricing">See pricing</a>} />);
    const link = screen.getByRole("link", { name: /see pricing/i });
    expect(link).toHaveAttribute("href", "#pricing");
  });

  it("exposes an accessible name for icon-only buttons", () => {
    render(
      <Button aria-label="Dismiss">
        <span aria-hidden="true">x</span>
      </Button>,
    );
    expect(
      screen.getByRole("button", { name: /dismiss/i }),
    ).toBeInTheDocument();
  });
});
