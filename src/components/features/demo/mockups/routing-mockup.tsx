const tiers = [
  {
    level: "Immediately",
    person: "Alex Chen",
    role: "Primary on-call",
    initials: "AC",
    active: true,
  },
  {
    level: "After 5 min",
    person: "Priya Malhotra",
    role: "Secondary",
    initials: "PM",
    active: false,
  },
  {
    level: "After 15 min",
    person: "Platform team",
    role: "Whole team",
    initials: "PT",
    active: false,
  },
];

export function RoutingMockup() {
  return (
    <div className="space-y-4">
      <div className="rounded-card border-status-down/20 bg-status-down/5 flex items-center gap-3 border px-4 py-3">
        <span
          className="bg-status-down size-2 rounded-full"
          aria-hidden="true"
        />
        <span className="text-caption text-ink-muted font-mono">
          api-gateway
        </span>
        <span className="text-caption text-ink">
          Error rate exceeded threshold
        </span>
        <span className="text-caption text-ink-subtle ml-auto font-mono">
          14:22:07
        </span>
      </div>

      <div className="border-line ml-2 space-y-2 border-l pl-6">
        {tiers.map((tier) => (
          <div
            key={tier.initials}
            className={
              tier.active
                ? "rounded-card border-accent/30 bg-accent/5 flex items-center gap-3 border p-3"
                : "rounded-card border-line flex items-center gap-3 border p-3"
            }
          >
            <div
              className={
                tier.active
                  ? "bg-accent/15 text-caption text-accent ring-accent/40 grid size-9 shrink-0 place-items-center rounded-full font-medium ring-2"
                  : "bg-surface-sunken text-caption text-ink-subtle grid size-9 shrink-0 place-items-center rounded-full font-medium"
              }
            >
              {tier.initials}
            </div>
            <div className="min-w-0">
              <div className="text-caption text-ink">{tier.person}</div>
              <div className="text-caption text-ink-subtle">{tier.role}</div>
            </div>
            <span className="text-caption text-ink-subtle ml-auto shrink-0 font-mono">
              {tier.level}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
