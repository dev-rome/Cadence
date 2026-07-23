export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const siteConfig = {
  name: "Cadence",
  title: "Cadence — Incident response for small engineering teams",
  description:
    "Cadence pages the right engineer, keeps a shared timeline of what happened, and updates your status page automatically. No war room required.",
  url: siteUrl,
} as const;
