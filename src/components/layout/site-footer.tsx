import { Container } from "@/components/layout/container";

const columns = [
  {
    heading: "Product",
    links: [
      { label: "Features", href: "#features" },
      { label: "Pricing", href: "#pricing" },
      { label: "Integrations", href: "#features" },
      { label: "Changelog", href: "#" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Contact", href: "#contact" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "Docs", href: "#" },
      { label: "API", href: "#" },
      { label: "Status", href: "#" },
      { label: "Security", href: "#" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy", href: "#" },
      { label: "Terms", href: "#" },
      { label: "DPA", href: "#" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-line border-t">
      <Container>
        <div className="grid gap-10 py-16 md:grid-cols-[1.5fr_repeat(4,1fr)]">
          <div>
            <span className="text-title text-ink font-medium">Cadence</span>
            <div className="mt-4 flex items-center gap-2">
              <span className="relative flex size-2">
                <span className="bg-status-ok absolute inline-flex h-full w-full animate-ping rounded-full opacity-60 motion-reduce:hidden" />
                <span className="bg-status-ok relative inline-flex size-2 rounded-full" />
              </span>
              <span className="text-caption text-ink-muted">
                All systems operational
              </span>
            </div>
          </div>

          {columns.map((column) => (
            <nav key={column.heading} aria-label={column.heading}>
              <h2 className="text-caption text-ink-subtle font-medium">
                {column.heading}
              </h2>
              <ul className="mt-4 space-y-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-caption text-ink-muted hover:text-ink focus-visible:ring-accent transition-colors focus-visible:ring-2 focus-visible:outline-none"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="border-line flex flex-col justify-between gap-4 border-t py-8 sm:flex-row">
          <span className="text-caption text-ink-subtle">
            © 2026 Cadence.
          </span>
          <div className="flex gap-4">
            <a href="#" className="text-caption text-ink-subtle hover:text-ink">
              GitHub
            </a>
            <a href="#" className="text-caption text-ink-subtle hover:text-ink">
              Twitter
            </a>
            <a href="#" className="text-caption text-ink-subtle hover:text-ink">
              LinkedIn
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
