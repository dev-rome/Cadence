const services = [
  { name: "api-gateway", status: "operational" as const },
  { name: "web-app", status: "operational" as const },
  { name: "workers", status: "degraded" as const },
];

const dot: Record<"operational" | "degraded", string> = {
  operational: "bg-status-ok",
  degraded: "bg-status-warn",
};

export function StatusVisual() {
  return (
    <div className="flex h-full min-h-40 flex-col justify-center gap-3">
      <div className="flex items-center gap-2">
        <span className="relative flex size-2.5">
          <span className="bg-status-ok absolute inline-flex h-full w-full animate-ping rounded-full opacity-60 motion-reduce:hidden" />
          <span className="bg-status-ok relative inline-flex size-2.5 rounded-full" />
        </span>
        <span className="text-body text-ink font-medium">
          All systems operational
        </span>
      </div>

      <div className="mt-2 space-y-2">
        {services.map((service) => (
          <div
            key={service.name}
            className="rounded-card border-line flex items-center justify-between border px-3 py-2"
          >
            <span className="text-caption text-ink-muted font-mono">
              {service.name}
            </span>
            <span className={`size-2 rounded-full ${dot[service.status]}`} />
          </div>
        ))}
      </div>
    </div>
  );
}
