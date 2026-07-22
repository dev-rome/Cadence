export type Phase =
  "healthy" | "firing" | "paged" | "acknowledged" | "resolved";

export interface PhaseConfig {
  status: "operational" | "degraded" | "down";
  statusLabel: string;
  entries: string[];
  duration: number;
}

export const phaseOrder: Phase[] = [
  "healthy",
  "firing",
  "paged",
  "acknowledged",
  "resolved",
];

export const phases: Record<Phase, PhaseConfig> = {
  healthy: {
    status: "operational",
    statusLabel: "Operational",
    entries: [],
    duration: 2000,
  },
  firing: {
    status: "down",
    statusLabel: "Investigating",
    entries: ["Error rate exceeded threshold"],
    duration: 1800,
  },
  paged: {
    status: "down",
    statusLabel: "Investigating",
    entries: ["Error rate exceeded threshold", "Paged Alex Chen (on-call)"],
    duration: 1800,
  },
  acknowledged: {
    status: "degraded",
    statusLabel: "Identified",
    entries: [
      "Error rate exceeded threshold",
      "Paged Alex Chen (on-call)",
      "Acknowledged — investigating gateway",
    ],
    duration: 2400,
  },
  resolved: {
    status: "operational",
    statusLabel: "Resolved",
    entries: [
      "Error rate exceeded threshold",
      "Paged Alex Chen (on-call)",
      "Acknowledged — investigating gateway",
      "Resolved — rolled back deploy #1847",
    ],
    duration: 2600,
  },
};
