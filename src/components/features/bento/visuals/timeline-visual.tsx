const rows = [
  { time: "14:22:07", label: "Alert fired", tone: "down" },
  { time: "14:22:09", label: "Paged on-call", tone: "muted" },
  { time: "14:22:41", label: "Acknowledged", tone: "warn" },
  { time: "14:31:02", label: "Resolved", tone: "ok" },
] as const;

const dotTone: Record<(typeof rows)[number]["tone"], string> = {
  down: "bg-status-down",
  warn: "bg-status-warn",
  ok: "bg-status-ok",
  muted: "bg-ink-subtle",
};

export function TimelineVisual() {
  return (
    <div className="flex h-full min-h-40 flex-col justify-center gap-3">
      {rows.map((row) => (
        <div key={row.time} className="flex items-center gap-3">
          <span
            className={`size-2 shrink-0 rounded-full ${dotTone[row.tone]}`}
          />
          <span className="text-caption text-ink-subtle shrink-0 font-mono">
            {row.time}
          </span>
          <span className="text-caption text-ink-muted">{row.label}</span>
          <span className="bg-line ml-auto h-px flex-1" />
        </div>
      ))}
    </div>
  );
}
