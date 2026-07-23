"use client";

import { useState } from "react";
import { useMotionValueEvent, useScroll } from "motion/react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import { MobileNav } from "@/components/layout/mobile-nav";
import { navLinks } from "@/lib/nav";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { cn } from "@/lib/utils/cn";

export function SiteHeader() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 80);
  });

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-200",
        isScrolled && "border-line bg-surface/80 border-b backdrop-blur-md",
      )}
    >
      <Container>
        <div className="flex h-16 items-center justify-between gap-8">
          <a
            href="#top"
            className="text-title text-ink focus-visible:ring-accent font-medium tracking-tight focus-visible:ring-2 focus-visible:outline-none"
          >
            Cadence
          </a>

          <nav aria-label="Main" className="hidden md:block">
            <ul className="flex items-center gap-8">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-body text-ink-muted hover:text-ink focus-visible:ring-accent transition-colors focus-visible:ring-2 focus-visible:outline-none"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="hidden items-center gap-2 md:flex">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="sm"
              render={<a href="#signin">Sign in</a>}
            />
            <Button size="sm" render={<a href="#start">Start free</a>} />
          </div>

          <MobileNav className="md:hidden" />
        </div>
      </Container>
    </header>
  );
}
