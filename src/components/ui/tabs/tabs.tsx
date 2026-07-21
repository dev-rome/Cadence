"use client";

import { createContext, useContext, useId, useState } from "react";
import { Tabs as Base } from "@base-ui/react/tabs";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils/cn";
import { transition } from "@/lib/motion";

type TabsContextValue = { value: string; layoutId: string };

const TabsContext = createContext<TabsContextValue | null>(null);

function useTabsContext() {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error("Tabs subcomponents must be used inside <Tabs>");
  }
  return context;
}

export interface TabsProps extends Omit<
  React.ComponentProps<typeof Base.Root>,
  "value" | "onValueChange"
> {
  defaultValue: string;
  value?: string;
  onValueChange?: (value: string) => void;
}

export function Tabs({
  defaultValue,
  value: controlledValue,
  onValueChange,
  className,
  children,
  ...props
}: TabsProps) {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const value = controlledValue ?? internalValue;
  const layoutId = useId();

  return (
    <TabsContext.Provider value={{ value, layoutId }}>
      <Base.Root
        value={value}
        onValueChange={(next) => {
          setInternalValue(next as string);
          onValueChange?.(next as string);
        }}
        className={cn(className)}
        {...props}
      >
        {children}
      </Base.Root>
    </TabsContext.Provider>
  );
}

export function TabsList({
  className,
  ...props
}: React.ComponentProps<typeof Base.List>) {
  return (
    <Base.List
      className={cn(
        "rounded-pill border-line bg-surface-raised inline-flex items-center gap-1 border p-1",
        className,
      )}
      {...props}
    />
  );
}

export interface TabProps extends React.ComponentProps<typeof Base.Tab> {
  value: string;
}

export function Tab({ value, className, children, ...props }: TabProps) {
  const { value: activeValue, layoutId } = useTabsContext();
  const shouldReduceMotion = useReducedMotion();
  const isActive = value === activeValue;

  return (
    <Base.Tab
      value={value}
      className={cn(
        "rounded-pill text-body relative px-4 py-1.5 transition-colors",
        "focus-visible:ring-accent focus-visible:ring-2 focus-visible:outline-none",
        isActive ? "text-ink" : "text-ink-muted hover:text-ink",
        className,
      )}
      {...props}
    >
      {isActive && (
        <motion.span
          layoutId={layoutId}
          aria-hidden="true"
          className="rounded-pill bg-surface-sunken absolute inset-0"
          transition={shouldReduceMotion ? { duration: 0 } : transition.base}
        />
      )}
      <span className="relative">{children}</span>
    </Base.Tab>
  );
}

export function TabPanel({
  className,
  ...props
}: React.ComponentProps<typeof Base.Panel>) {
  return (
    <Base.Panel
      className={cn(
        "focus-visible:ring-accent mt-6 focus-visible:ring-2 focus-visible:outline-none",
        className,
      )}
      {...props}
    />
  );
}
