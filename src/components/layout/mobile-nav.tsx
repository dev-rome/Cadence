"use client";

import { Dialog } from "@base-ui/react/dialog";
import { Button } from "@/components/ui/button";
import { navLinks } from "@/lib/nav";
import { cn } from "@/lib/utils/cn";

export function MobileNav({ className }: { className?: string }) {
  return (
    <Dialog.Root>
      <Dialog.Trigger
        aria-label="Open menu"
        className={cn(
          "rounded-pill text-ink focus-visible:ring-accent p-2 focus-visible:ring-2 focus-visible:outline-none",
          className,
        )}
      >
        <MenuIcon />
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Backdrop
          className={cn(
            "bg-surface/60 fixed inset-0 z-50 backdrop-blur-sm",
            "transition-opacity duration-200",
            "data-ending-style:opacity-0 data-starting-style:opacity-0",
            "motion-reduce:transition-none",
          )}
        />
        <Dialog.Popup
          className={cn(
            "bg-surface fixed inset-0 z-50 flex flex-col p-6",
            "ease-out-expo transition-transform duration-300",
            "data-ending-style:translate-y-4 data-starting-style:translate-y-4",
            "data-ending-style:opacity-0 data-starting-style:opacity-0",
            "motion-reduce:transition-none",
          )}
        >
          <div className="flex h-16 items-center justify-between">
            <Dialog.Title className="text-title text-ink font-medium">
              Cadence
            </Dialog.Title>
            <Dialog.Close
              aria-label="Close menu"
              className="rounded-pill text-ink focus-visible:ring-accent p-2 focus-visible:ring-2 focus-visible:outline-none"
            >
              <CloseIcon />
            </Dialog.Close>
          </div>

          <nav aria-label="Mobile" className="mt-8">
            <ul className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Dialog.Close
                    render={<a href={link.href} />}
                    nativeButton={false}
                    className="text-heading text-ink focus-visible:ring-accent block py-3 focus-visible:ring-2 focus-visible:outline-none"
                  >
                    {link.label}
                  </Dialog.Close>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-auto flex flex-col gap-3">
            <Button size="lg" render={<a href="#start">Start free</a>} />
            <Button
              variant="secondary"
              size="lg"
              render={<a href="#signin">Sign in</a>}
            />
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function MenuIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-6" fill="none" aria-hidden="true">
      <path
        d="M4 7h16M4 12h16M4 17h16"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-6" fill="none" aria-hidden="true">
      <path
        d="m6 6 12 12M18 6 6 18"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
