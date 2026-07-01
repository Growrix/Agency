"use client";

import { CheckIcon } from "@heroicons/react/24/outline";
import { cn } from "@/lib/utils";

export type CheckoutStepId = "cart" | "information" | "payment" | "confirmation";

export type CheckoutStep = {
  id: CheckoutStepId;
  label: string;
};

const DEFAULT_STEPS: CheckoutStep[] = [
  { id: "cart", label: "Cart" },
  { id: "information", label: "Information" },
  { id: "payment", label: "Payment" },
  { id: "confirmation", label: "Confirmation" },
];

type CheckoutStepsProps = {
  active: CheckoutStepId;
  steps?: CheckoutStep[];
  className?: string;
};

export function CheckoutSteps({ active, steps = DEFAULT_STEPS, className }: CheckoutStepsProps) {
  const activeIndex = Math.max(
    0,
    steps.findIndex((step) => step.id === active),
  );

  return (
    <ol
      aria-label="Checkout progress"
      className={cn(
        "flex w-full items-center gap-1 overflow-x-auto rounded-md border border-border/55 bg-surface/50 p-1.5 text-sm sm:gap-2 sm:p-2",
        className,
      )}
    >
      {steps.map((step, index) => {
        const completed = index < activeIndex;
        const current = index === activeIndex;
        return (
          <li
            key={step.id}
            aria-current={current ? "step" : undefined}
            className={cn(
              "flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-md px-2 py-1.5 sm:px-3",
              current && "bg-inset/50",
            )}
          >
            <span
              className={cn(
                "inline-flex size-6 shrink-0 items-center justify-center rounded-full border text-[11px] font-semibold",
                completed
                  ? "border-primary/60 bg-primary/20 text-primary"
                  : current
                    ? "bg-primary text-surface border-primary shadow-(--shadow-1)"
                    : "border-border/70 bg-surface text-text-muted",
              )}
              aria-hidden
            >
              {completed ? <CheckIcon className="size-3.5" /> : index + 1}
            </span>
            <span
              className={cn(
                "text-xs font-medium sm:text-sm",
                current
                  ? "text-text"
                  : completed
                    ? "text-text"
                    : "text-text-muted",
              )}
            >
              {step.label}
            </span>
          </li>
        );
      })}
    </ol>
  );
}
