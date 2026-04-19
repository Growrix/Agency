import type { ReactNode } from "react";

export type Step = { number: string; title: string; description: string; meta?: string };

export function ProcessSteps({ steps }: { steps: Step[]; eyebrow?: ReactNode }) {
  return (
    <ol className="grid gap-4 lg:grid-cols-4 sm:grid-cols-2">
      {steps.map((step, idx) => (
        <li
          key={step.title}
          className="relative rounded-[16px] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-[var(--shadow-1)]"
        >
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs uppercase tracking-wider text-[var(--color-text-muted)]">
              Step {step.number}
            </span>
            <span className="size-7 rounded-full border border-[var(--color-border)] flex items-center justify-center text-xs font-mono">
              {idx + 1}
            </span>
          </div>
          <h3 className="mt-4 font-display text-lg tracking-tight">{step.title}</h3>
          <p className="mt-2 text-sm text-[var(--color-text-muted)] leading-6">{step.description}</p>
          {step.meta && (
            <p className="mt-4 font-mono text-[11px] uppercase tracking-wider text-[var(--color-primary)]">
              {step.meta}
            </p>
          )}
        </li>
      ))}
    </ol>
  );
}
