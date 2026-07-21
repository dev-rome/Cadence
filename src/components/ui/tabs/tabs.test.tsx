import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Tab, TabPanel, Tabs, TabsList } from "./tabs";
import userEvent from "@testing-library/user-event";

function Fixture() {
  return (
    <Tabs defaultValue="routing">
      <TabsList>
        <Tab value="routing">Alert routing</Tab>
        <Tab value="timeline">Incident timeline</Tab>
        <Tab value="status">Status page</Tab>
      </TabsList>
      <TabPanel value="routing">Routing content</TabPanel>
      <TabPanel value="timeline">Timeline content</TabPanel>
      <TabPanel value="status">Status content</TabPanel>
    </Tabs>
  );
}

describe("Tabs", () => {
  it("renders every tab with the tab role", () => {
    render(<Fixture />);
    expect(screen.getAllByRole("tab")).toHaveLength(3);
  });

  it("selects the default tab and shows its panel", () => {
    render(<Fixture />);
    expect(screen.getByRole("tab", { name: /alert routing/i })).toHaveAttribute(
      "aria-selected",
      "true",
    );
    expect(screen.getByText("Routing content")).toBeVisible();
  });

  it("switches panels on click", async () => {
    render(<Fixture />);
    await userEvent.click(screen.getByRole("tab", { name: /timeline/i }));
    expect(screen.getByText("Timeline content")).toBeVisible();
    expect(screen.getByRole("tab", { name: /timeline/i })).toHaveAttribute(
      "aria-selected",
      "true",
    );
  });

  it("moves between tabs with arrow keys", async () => {
    render(<Fixture />);
    await userEvent.tab();
    await userEvent.keyboard("{ArrowRight}");
    expect(screen.getByRole("tab", { name: /timeline/i })).toHaveAttribute(
      "aria-selected",
      "true",
    );
  });

  it("keeps only the active tab in the tab order", async () => {
    render(<Fixture />);
    const tabs = screen.getAllByRole("tab");
    expect(tabs[0]).toHaveAttribute("tabindex", "0");
    expect(tabs[1]).toHaveAttribute("tabindex", "-1");
  });

  it("throws when a Tab is rendered outside Tabs", () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    expect(() => render(<Tab value="orphan">Orphan</Tab>)).toThrow();
    spy.mockRestore();
  });
});
