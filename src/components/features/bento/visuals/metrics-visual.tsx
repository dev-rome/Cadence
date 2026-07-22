const stats = [
  { value: "4.2m", label: "median ack" },
  { value: "18m", label: "median resolve" },
];

export function MetricsVisual() {
  return (
    <div className="flex h-full min-h-40 flex-wrap items-center gap-x-8 gap-y-6">
      {stats.map((stat) => (
        <div key={stat.label}>
          <div className="text-heading text-ink font-mono">{stat.value}</div>
          <div className="text-caption text-ink-subtle mt-1">{stat.label}</div>
        </div>
      ))}
    </div>
  );
}
