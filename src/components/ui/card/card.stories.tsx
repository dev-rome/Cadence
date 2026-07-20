import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardBody,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./card";

const meta = {
  title: "UI/Card",
  component: Card,
  parameters: { layout: "padded" },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Card className="max-w-sm">
      <CardHeader>
        <CardTitle>On-call that actually rotates</CardTitle>
        <CardDescription>
          Schedules, overrides, and escalation policies that take ninety seconds
          to set up.
        </CardDescription>
      </CardHeader>
    </Card>
  ),
};

export const Interactive: Story = {
  render: () => (
    <Card variant="interactive" className="max-w-sm">
      <CardHeader>
        <CardTitle>
          <a href="#on-call" className="after:absolute after:inset-0">
            On-call that actually rotates
          </a>
        </CardTitle>
        <CardDescription>
          The whole card is clickable, but only one link exists in the
          accessibility tree.
        </CardDescription>
      </CardHeader>
    </Card>
  ),
};

export const WithFooter: Story = {
  render: () => (
    <Card className="max-w-sm">
      <CardHeader>
        <CardTitle>api-gateway</CardTitle>
        <CardDescription>
          Primary ingress for all public traffic.
        </CardDescription>
      </CardHeader>
      <CardBody>
        <Badge status="degraded">Degraded</Badge>
      </CardBody>
      <CardFooter>
        <Button size="sm">View incident</Button>
        <Button size="sm" variant="ghost">
          Mute
        </Button>
      </CardFooter>
    </Card>
  ),
};

export const NoDescription: Story = {
  render: () => (
    <Card className="max-w-sm">
      <CardHeader>
        <CardTitle>Postmortems, drafted for you</CardTitle>
      </CardHeader>
    </Card>
  ),
};

export const PaddingNone: Story = {
  render: () => (
    <Card padding="none" className="max-w-sm overflow-hidden">
      <div className="bg-surface-sunken h-32" aria-hidden="true" />
      <div className="p-6">
        <CardTitle>Full-bleed media</CardTitle>
        <CardDescription>Padding lives on the inner wrapper.</CardDescription>
      </div>
    </Card>
  ),
};

export const InGrid: Story = {
  render: () => (
    <div className="grid gap-4 sm:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle>One timeline, automatically</CardTitle>
          <CardDescription>
            Every alert, deploy, and status change in one ordered record.
          </CardDescription>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Status pages that update themselves for you</CardTitle>
          <CardDescription>
            Declare an incident and the page follows.
          </CardDescription>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Integrations</CardTitle>
          <CardDescription>
            Datadog, Sentry, GitHub, Slack. Under five minutes to wire up, with
            no agent to install on your infrastructure.
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  ),
};
