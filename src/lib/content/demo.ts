export type DemoTab = "routing" | "timeline" | "status";

export interface DemoPanel {
  value: DemoTab;
  label: string;
  heading: string;
  body: string;
}

export const demoPanels: DemoPanel[] = [
  {
    value: "routing",
    label: "Alert routing",
    heading: "The right person, every time",
    body: "Rules match each alert to a service, and each service to whoever is on call. Escalation policies cover the gaps.",
  },
  {
    value: "timeline",
    label: "Incident timeline",
    heading: "One record, assembled for you",
    body: "Every alert, deploy, and status change lands in one ordered timeline, so nobody reconstructs the story afterward.",
  },
  {
    value: "status",
    label: "Status page",
    heading: "Customers hear it from you",
    body: "Declaring an incident updates your public page and notifies subscribers, without a second thing to remember.",
  },
];
