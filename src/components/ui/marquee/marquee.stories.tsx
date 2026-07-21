import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Marquee } from "./marquee";

const companies = [
  "Northwind",
  "Contoso",
  "Fabrikam",
  "Adventure Works",
  "Tailspin",
  "Proseware",
  "Litware",
  "Wingtip",
];

const Logo = ({ name }: { name: string }) => (
  <span className="text-title text-ink-subtle hover:text-ink font-medium whitespace-nowrap transition-colors">
    {name}
  </span>
);

const meta = {
  title: "UI/Marquee",
  component: Marquee,
  parameters: { layout: "padded" },
} satisfies Meta<typeof Marquee>;

export default meta;
type Story = StoryObj<typeof meta>;

const items = companies.map((name) => <Logo key={name} name={name} />);

export const Default: Story = { args: { children: items } };
export const Fast: Story = { args: { children: items, duration: 15 } };
export const Slow: Story = { args: { children: items, duration: 80 } };
export const Reversed: Story = { args: { children: items, reverse: true } };
export const NoFade: Story = { args: { children: items, fadeEdges: false } };
export const NoPause: Story = {
  args: { children: items, pauseOnHover: false },
};

export const FewItems: Story = {
  args: {
    children: companies.slice(0, 2).map((n) => <Logo key={n} name={n} />),
  },
};

export const TwoRows: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      <Marquee duration={45}>{items}</Marquee>
      <Marquee duration={45} reverse>
        {items}
      </Marquee>
    </div>
  ),
};
