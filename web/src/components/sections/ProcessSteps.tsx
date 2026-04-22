import type { ReactNode } from "react";
import { RevealGroup, RevealItem } from "@/components/motion/Motion";

export type Step = { number: string; title: string; description: string; meta?: string };

export function ProcessSteps({ steps }: { steps: Step[]; eyebrow?: ReactNode }) {
  return (
    <RevealGroup as="ol" className="grid gap-4 lg:grid-cols-4 sm:grid-cols-2" stagger={0.08}>
      {steps.map((step, idx) => (
        <RevealItem
          as="li"
          key={step.title}
          className="relative rounded-[16px] border border-border bg-surface p-6 shadow-[var(--shadow-1)] transition-[transform,box-shadow,border-color] duration-300 ease-[var(--ease-signal)] hover:-translate-y-1 hover:shadow-[var(--shadow-2)] hover:border-border-strong"
        >
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs uppercase tracking-wider text-text-muted">
              Step {step.number}
            </span>
            <span className="size-7 rounded-full border border-border flex items-center justify-center text-xs font-mono">
              {idx + 1}
            </span>
          </div>
          <h3 className="mt-4 font-display text-lg tracking-tight">{step.title}</h3>
          <p className="mt-2 text-sm text-text-muted leading-6">{step.description}</p>
          {step.meta && (
            <p className="mt-4 font-mono text-[11px] uppercase tracking-wider text-primary">
              {step.meta}
            </p>
          )}
        </RevealItem>
      ))}
    </RevealGroup>
  );
}
