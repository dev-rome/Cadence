export function HeroBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      <div
        className="absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, var(--color-ink-subtle) 1px, transparent 0)",
          backgroundSize: "32px 32px",
          maskImage:
            "radial-gradient(ellipse 80% 50% at 50% 0%, black 40%, transparent 100%)",
        }}
      />
      <div
        className="absolute top-0 left-1/2 h-125 w-200 -translate-x-1/2 -translate-y-1/3 rounded-full opacity-20 blur-[120px]"
        style={{ background: "var(--color-accent)" }}
      />
    </div>
  );
}
