import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Button } from "./button";

const variants = ["primary", "secondary", "ghost"] as const;
const sizes = ["sm", "md", "lg"] as const;

const meta = {
  title: "UI/Button",
  component: Button,
  parameters: { layout: "centered" },
  args: { children: "Start free" },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
export const Secondary: Story = { args: { variant: "secondary" } };
export const Ghost: Story = { args: { variant: "ghost" } };

export const AllVariants: Story = {
  parameters: { layout: "padded" },
  render: () => (
    <div className="flex flex-col gap-6">
      {variants.map((variant) => (
        <div key={variant} className="flex items-center gap-4">
          {sizes.map((size) => (
            <Button key={size} variant={variant} size={size}>
              Start free
            </Button>
          ))}
        </div>
      ))}
    </div>
  ),
};

export const Loading: Story = { args: { isLoading: true } };
export const Disabled: Story = { args: { disabled: true } };
export const LongLabel: Story = {
  args: { children: "Start your free fourteen day trial today" },
};
export const AsLink: Story = {
  args: { render: <a href="#pricing">See pricing</a> },
};
