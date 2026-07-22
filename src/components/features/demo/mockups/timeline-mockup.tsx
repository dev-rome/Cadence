const events = [
  {
    time: "14:22:07",
    type: "alert",
    tone: "down",
    text: "Error rate exceeded threshold on api-gateway",
  },
  {
    time: "14:22:09",
    type: "page",
    tone: "muted",
    text: "Paged Alex Chen (primary on-call)",
  },
  {
    time: "14:22:41",
    type: "ack",
    tone: "warn",
    text: "Acknowledged by Alex Chen",
  },
  {
    time: "14:26:18",
    type: "deploy",
    tone: "muted",
    text: "Correlated with deploy #1847",
  },
  {
    time: "14:31:02",
    type: "resolve",
    tone: "ok",
    text: "Resolved — rolled back deploy #1847",
  },
];

const dotTone: Record<string, string> = {
  down: "bg-status-down",
  warn: "bg-status-warn",
  ok: "bg-status-ok",
  muted: "bg-ink-subtle",
};

export function TimelineMockup() {
  return (
    <div className="space-y-1">
      {events.map((event, i) => (
        <div key={event.time} className="flex gap-4">
          <div className="flex flex-col items-center">
            <span
              className={`mt-1.5 size-2 shrink-0 rounded-full ${dotTone[event.tone]}`}
            />
            {i < events.length - 1 && <span className="bg-line w-px flex-1" />}
          </div>
          <div className="pb-4">
            <div className="flex items-center gap-2">
              <span className="text-caption text-ink-subtle font-mono">
                {event.time}
              </span>
              <span className="rounded-pill bg-surface-sunken text-caption text-ink-subtle px-1.5 py-0.5 font-mono uppercase">
                {event.type}
              </span>
            </div>
            <p className="text-caption text-ink-muted mt-1">{event.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
