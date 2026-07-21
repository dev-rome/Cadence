"use client";

import { Accordion as Base } from "@base-ui/react/accordion";
import { cn } from "@/lib/utils/cn";

export function Accordion({
  className,
  ...props
}: React.ComponentProps<typeof Base.Root>) {
  return (
    <Base.Root
      className={cn("border-line divide-line divide-y border-y", className)}
      {...props}
    />
  );
}

export function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof Base.Item>) {
  return <Base.Item className={cn(className)} {...props} />;
}

export function AccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof Base.Trigger>) {
  return (
    <Base.Header>
      <Base.Trigger
        className={cn(
          "group flex w-full items-center justify-between gap-6 py-5 text-left",
          "text-title text-ink hover:text-ink-muted transition-colors",
          "focus-visible:ring-accent focus-visible:ring-2 focus-visible:outline-none",
          className,
        )}
        {...props}
      >
        {children}
        <ChevronIcon />
      </Base.Trigger>
    </Base.Header>
  );
}

export function AccordionPanel({
  className,
  children,
  ...props
}: React.ComponentProps<typeof Base.Panel>) {
  return (
    <Base.Panel
      className={cn(
        "h-(--accordion-panel-height) overflow-hidden",
        "ease-out-expo transition-[height] duration-300",
        "data-ending-style:h-0 data-starting-style:h-0",
        "motion-reduce:transition-none",
        className,
      )}
      {...props}
    >
      <div className="text-body text-ink-muted pb-5">{children}</div>
    </Base.Panel>
  );
}

function ChevronIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={cn(
        "text-ink-subtle size-5 shrink-0",
        "ease-out-expo transition-transform duration-300",
        "group-data-panel-open:rotate-180",
        "motion-reduce:transition-none",
      )}
    >
      <path
        d="m6 9 6 6 6-6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
