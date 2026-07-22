const tools = ["Datadog", "Sentry", "GitHub", "Slack", "PagerDuty", "Grafana"];

export function IntegrationsVisual() {
  return (
    <div className="flex h-full min-h-40 flex-wrap content-center gap-2">
      {tools.map((tool) => (
        <span
          key={tool}
          className="rounded-pill border-line bg-surface-raised text-caption text-ink-muted border px-3 py-1.5 font-mono"
        >
          {tool}
        </span>
      ))}
    </div>
  );
}
