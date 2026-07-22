const people = [
  { initials: "AC", label: "Alex Chen", active: true },
  { initials: "PM", label: "Priya M.", active: false },
  { initials: "JT", label: "Jordan T.", active: false },
];

export function RoutingVisual() {
  return (
    <div className="flex h-full min-h-40 flex-col justify-center gap-5">
      <div className="flex items-center gap-3">
        {people.map((person, i) => (
          <div key={person.initials} className="flex items-center gap-3">
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={
                  person.active
                    ? "bg-accent/15 text-caption text-accent ring-accent/40 grid size-10 place-items-center rounded-full font-medium ring-2"
                    : "bg-surface-raised text-caption text-ink-subtle grid size-10 place-items-center rounded-full font-medium"
                }
              >
                {person.initials}
              </div>
              {person.active && (
                <span className="text-caption text-accent font-mono">
                  on-call
                </span>
              )}
            </div>
            {i < people.length - 1 && (
              <span className="bg-line h-px w-6" aria-hidden="true" />
            )}
          </div>
        ))}
      </div>

      <div className="flex gap-1.5" aria-hidden="true">
        {Array.from({ length: 14 }).map((_, i) => (
          <span
            key={i}
            className={
              i >= 3 && i <= 6
                ? "bg-accent/30 h-6 flex-1 rounded-sm"
                : "bg-surface-sunken h-6 flex-1 rounded-sm"
            }
          />
        ))}
      </div>
    </div>
  );
}
