import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Badge } from "./badge";

const statuses = ["operational", "degraded", "down", "neutral"] as const;

const meta = {
  title: "UI/Badge",
  component: Badge,
  parameters: { layout: "centered" },
  args: { children: "Operational" },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Operational: Story = { args: { status: "operational" } };
export const Degraded: Story = {
  args: { status: "degraded", children: "Degraded" },
};
export const Down: Story = {
  args: { status: "down", children: "Major outage" },
};
export const Neutral: Story = { args: { children: "Beta" } };

export const AllStatuses: Story = {
  parameters: { layout: "padded" },
  render: () => (
    <div className="flex flex-wrap gap-3">
      {statuses.map((status) => (
        <Badge key={status} status={status}>
          {status}
        </Badge>
      ))}
    </div>
  ),
};

export const WithoutDot: Story = {
  args: { status: "operational", showDot: false },
};

export const LongLabel: Story = {
  args: { status: "degraded", children: "Elevated error rates in us-east-1" },
};
