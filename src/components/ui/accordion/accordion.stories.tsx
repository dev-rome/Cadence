import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import {
  Accordion,
  AccordionItem,
  AccordionPanel,
  AccordionTrigger,
} from "./accordion";

const faqs = [
  {
    value: "on-prem",
    question: "Do you support on-premise deployments?",
    answer:
      "Yes, on the Enterprise plan. Cadence runs in your VPC with no outbound connection required.",
  },
  {
    value: "billing",
    question: "How does billing work?",
    answer:
      "Per seat, billed monthly or annually. Annual saves two months. You can change seat count at any time and we prorate the difference.",
  },
  {
    value: "migration",
    question: "Can we import from PagerDuty?",
    answer:
      "Schedules, escalation policies, and service definitions import directly. Historical incidents can be backfilled on request.",
  },
];

const meta = {
  title: "UI/Accordion",
  component: Accordion,
  parameters: { layout: "padded" },
  decorators: [
    (Story) => (
      <div className="max-w-2xl">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Single: Story = {
  render: () => (
    <Accordion>
      {faqs.map((faq) => (
        <AccordionItem key={faq.value} value={faq.value}>
          <AccordionTrigger>{faq.question}</AccordionTrigger>
          <AccordionPanel>{faq.answer}</AccordionPanel>
        </AccordionItem>
      ))}
    </Accordion>
  ),
};

export const Multiple: Story = {
  render: () => (
    <Accordion multiple>
      {faqs.map((faq) => (
        <AccordionItem key={faq.value} value={faq.value}>
          <AccordionTrigger>{faq.question}</AccordionTrigger>
          <AccordionPanel>{faq.answer}</AccordionPanel>
        </AccordionItem>
      ))}
    </Accordion>
  ),
};

export const DefaultOpen: Story = {
  render: () => (
    <Accordion defaultValue={["billing"]}>
      {faqs.map((faq) => (
        <AccordionItem key={faq.value} value={faq.value}>
          <AccordionTrigger>{faq.question}</AccordionTrigger>
          <AccordionPanel>{faq.answer}</AccordionPanel>
        </AccordionItem>
      ))}
    </Accordion>
  ),
};

export const ShortAndLong: Story = {
  render: () => (
    <Accordion multiple>
      <AccordionItem value="short">
        <AccordionTrigger>Is there a free tier?</AccordionTrigger>
        <AccordionPanel>Yes, up to five seats.</AccordionPanel>
      </AccordionItem>
      <AccordionItem value="long">
        <AccordionTrigger>What happens during an incident?</AccordionTrigger>
        <AccordionPanel>
          <p>
            When an alert fires, Cadence matches it against your routing rules
            and pages the engineer currently on call for that service.
          </p>
          <p className="mt-4">
            A timeline opens automatically. Every subsequent alert, deploy,
            status change, and linked message is appended in order, so nobody
            has to reconstruct what happened afterward.
          </p>
          <p className="mt-4">
            If the incident is customer-facing, declaring it updates your public
            status page and notifies subscribers without a second step.
          </p>
          <p className="mt-4">
            On resolution, the timeline, impact window, and contributing changes
            are assembled into a postmortem draft.
          </p>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  ),
};

export const LongQuestion: Story = {
  render: () => (
    <Accordion>
      <AccordionItem value="long-q">
        <AccordionTrigger>
          What happens if the on-call engineer does not acknowledge the page
          within the escalation window?
        </AccordionTrigger>
        <AccordionPanel>
          The alert escalates to the next person in the policy, then to the
          whole team.
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  ),
};
