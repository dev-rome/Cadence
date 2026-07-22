const services = [
  { name: "API", status: "operational" as const, uptime: "99.99%" },
  { name: "Dashboard", status: "operational" as const, uptime: "99.98%" },
  { name: "Background workers", status: "degraded" as const, uptime: "99.71%" },
  { name: "Webhooks", status: "operational" as const, uptime: "100.0%" },
];

const config = {
  operational: {
    dot: "bg-status-ok",
    label: "Operational",
    text: "text-status-ok",
  },
  degraded: {
    dot: "bg-status-warn",
    label: "Degraded",
    text: "text-status-warn",
  },
};

export function StatusMockup() {
  return (
    <div className="space-y-5">
      <div className="border-line flex items-center justify-between border-b pb-4">
        <span className="text-body text-ink font-medium">Cadence Status</span>
        <div className="flex items-center gap-2">
          <span className="relative flex size-2.5">
            <span className="bg-status-ok absolute inline-flex h-full w-full animate-ping rounded-full opacity-60 motion-reduce:hidden" />
            <span className="bg-status-ok relative inline-flex size-2.5 rounded-full" />
          </span>
          <span className="text-caption text-ink-muted">
            All systems operational
          </span>
        </div>
      </div>

      <div className="space-y-3">
        {services.map((service) => {
          const c = config[service.status];
          return (
            <div key={service.name} className="flex items-center gap-3">
              <span
                className={`size-2 shrink-0 rounded-full ${c.dot}`}
                aria-hidden="true"
              />
              <span className="text-caption text-ink">{service.name}</span>
              <span className={`text-caption ${c.text}`}>{c.label}</span>
              <span className="text-caption text-ink-subtle ml-auto font-mono">
                {service.uptime}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
