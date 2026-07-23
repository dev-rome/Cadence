export type FeatureVisual =
  "routing" | "timeline" | "status" | "postmortem" | "integrations" | "metrics";

export type GridSpan = "wide" | "standard";

export interface Feature {
  id: string;
  title: string;
  body: string;
  visual: FeatureVisual;
  span: GridSpan;
}

export const fallbackFeatures: Feature[] = [
  {
    id: "routing",
    title: "On-call that actually rotates",
    body: "Schedules, overrides, and escalation policies that take ninety seconds to set up and never page the wrong person.",
    visual: "routing",
    span: "wide",
  },
  {
    id: "timeline",
    title: "One timeline, automatically",
    body: "Every alert, deploy, message, and status change in one ordered record. No copy-pasting from Slack.",
    visual: "timeline",
    span: "standard",
  },
  {
    id: "status",
    title: "Status pages that update themselves",
    body: "Declare an incident and your public page reflects it. Subscribers get notified without a second step.",
    visual: "status",
    span: "standard",
  },
  {
    id: "postmortem",
    title: "Postmortems, drafted for you",
    body: "Cadence assembles the timeline, the impact window, and the contributing changes. You write the analysis.",
    visual: "postmortem",
    span: "wide",
  },
  {
    id: "integrations",
    title: "Connected to what you already run",
    body: "Datadog, Sentry, GitHub, Slack, PagerDuty imports. Under five minutes to wire up.",
    visual: "integrations",
    span: "wide",
  },
  {
    id: "metrics",
    title: "Answers about your reliability",
    body: "Time to acknowledge, time to resolve, and which services keep breaking.",
    visual: "metrics",
    span: "standard",
  },
];
