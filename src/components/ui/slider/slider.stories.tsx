import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";
import { Slider } from "./slider";

const meta = {
  title: "UI/Slider",
  component: Slider,
  parameters: { layout: "padded" },
  args: { label: "Seats", defaultValue: 12 },
  decorators: [
    (Story) => (
      <div className="max-w-sm">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Seats: Story = {
  args: {
    label: "Seats",
    defaultValue: 12,
    min: 1,
    max: 200,
    formatValue: (n) => `${n} ${n === 1 ? "seat" : "seats"}`,
  },
};

export const Currency: Story = {
  args: {
    label: "Monthly budget",
    defaultValue: 400,
    min: 0,
    max: 5000,
    step: 50,
    formatValue: (n) =>
      new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
      }).format(n),
  },
};

export const AtMinimum: Story = {
  args: {
    defaultValue: 1,
    min: 1,
    max: 200,
    formatValue: (n) => `${n} seat`,
  },
};

export const AtMaximum: Story = {
  args: {
    defaultValue: 200,
    min: 1,
    max: 200,
    formatValue: (n) => `${n} seats`,
  },
};

export const LargeSteps: Story = {
  args: {
    label: "Retention",
    defaultValue: 90,
    min: 30,
    max: 365,
    step: 30,
    formatValue: (n) => `${n} days`,
  },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const Controlled: Story = {
  render: function Controlled() {
    const [seats, setSeats] = useState(25);
    return (
      <div className="flex flex-col gap-4">
        <Slider
          label="Seats"
          defaultValue={25}
          value={seats}
          onValueChange={(next) => setSeats(next as number)}
          min={1}
          max={200}
          formatValue={(n) => `${n} seats`}
        />
        <p className="text-caption text-ink-muted">
          Estimated:{" "}
          <span className="text-ink font-mono">${seats * 12}/mo</span>
        </p>
      </div>
    );
  },
};
