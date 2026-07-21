import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Tab, TabPanel, Tabs, TabsList } from "./tabs";

const meta = {
  title: "UI/Tabs",
  component: Tabs,
  parameters: { layout: "padded" },
  args: { defaultValue: "routing" },
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Tabs defaultValue="routing">
      <TabsList>
        <Tab value="routing">Alert routing</Tab>
        <Tab value="timeline">Incident timeline</Tab>
        <Tab value="status">Status page</Tab>
      </TabsList>
      <TabPanel value="routing">
        Rules match alerts to services, and services to the engineer on call.
      </TabPanel>
      <TabPanel value="timeline">
        Every alert, deploy, and status change in one ordered record.
      </TabPanel>
      <TabPanel value="status">
        Declaring an incident updates your public page and notifies subscribers.
      </TabPanel>
    </Tabs>
  ),
};

export const TwoTabs: Story = {
  render: () => (
    <Tabs defaultValue="monthly">
      <TabsList>
        <Tab value="monthly">Monthly</Tab>
        <Tab value="annual">Annual</Tab>
      </TabsList>
      <TabPanel value="monthly">Billed each month.</TabPanel>
      <TabPanel value="annual">Billed yearly. Two months free.</TabPanel>
    </Tabs>
  ),
};

export const UnequalWidths: Story = {
  render: () => (
    <Tabs defaultValue="a">
      <TabsList>
        <Tab value="a">All</Tab>
        <Tab value="b">Observability and monitoring</Tab>
        <Tab value="c">Chat</Tab>
      </TabsList>
      <TabPanel value="a">Everything.</TabPanel>
      <TabPanel value="b">Datadog, Sentry, Grafana, New Relic.</TabPanel>
      <TabPanel value="c">Slack, Teams, Discord.</TabPanel>
    </Tabs>
  ),
};

export const ManyTabs: Story = {
  render: () => (
    <Tabs defaultValue="t1">
      <TabsList>
        {["t1", "t2", "t3", "t4", "t5", "t6"].map((value, i) => (
          <Tab key={value} value={value}>
            Tab {i + 1}
          </Tab>
        ))}
      </TabsList>
      <TabPanel value="t1">First panel.</TabPanel>
      <TabPanel value="t2">Second panel.</TabPanel>
      <TabPanel value="t3">Third panel.</TabPanel>
      <TabPanel value="t4">Fourth panel.</TabPanel>
      <TabPanel value="t5">Fifth panel.</TabPanel>
      <TabPanel value="t6">Sixth panel.</TabPanel>
    </Tabs>
  ),
};

export const TwoInstances: Story = {
  render: () => (
    <div className="flex flex-col gap-10">
      <Tabs defaultValue="a">
        <TabsList>
          <Tab value="a">First set A</Tab>
          <Tab value="b">First set B</Tab>
        </TabsList>
        <TabPanel value="a">A</TabPanel>
        <TabPanel value="b">B</TabPanel>
      </Tabs>
      <Tabs defaultValue="c">
        <TabsList>
          <Tab value="c">Second set C</Tab>
          <Tab value="d">Second set D</Tab>
        </TabsList>
        <TabPanel value="c">C</TabPanel>
        <TabPanel value="d">D</TabPanel>
      </Tabs>
    </div>
  ),
};
