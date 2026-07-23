const lines = [
  { width: "w-3/4", filled: true },
  { width: "w-full", filled: true },
  { width: "w-5/6", filled: true },
  { width: "w-2/3", filled: false },
  { width: "w-4/5", filled: false },
];

export function PostmortemVisual() {
  return (
    <div className="flex h-full min-h-40 flex-col justify-center gap-4">
      <div className="flex items-center gap-2">
        <span className="text-caption text-ink-subtle font-mono">
          POSTMORTEM
        </span>
        <span className="rounded-pill bg-accent/15 text-caption text-accent-text px-2 py-0.5 font-mono">
          draft
        </span>
      </div>
      <div className="space-y-2.5">
        {lines.map((line, i) => (
          <span
            key={i}
            className={`block h-2 rounded-full ${line.width} ${
              line.filled ? "bg-line-strong" : "bg-line"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
