"use client";

import { CheckIcon } from "@heroicons/react/24/outline";
import { cn } from "@/lib/utils";

export type CheckoutStepId = "cart" | "sign-in" | "review" | "payment";

export type CheckoutStep = {
  id: CheckoutStepId;
  label: string;
};

const DEFAULT_STEPS: CheckoutStep[] = [
  { id: "cart", label: "Cart" },
  { id: "sign-in", label: "Sign in" },
  { id: "review", label: "Review" },
  { id: "payment", label: "Payment" },
];

type CheckoutStepsProps = {
  active: CheckoutStepId;
  steps?: CheckoutStep[];
  className?: string;
};

export function CheckoutSteps({ active, steps = DEFAULT_STEPS, className }: CheckoutStepsProps) {
  const activeIndex = steps.findIndex((step) => step.id === active);

  return (
    <ol
      aria-label="Checkout progress"
      className={cn(
        "flex w-full items-center gap-2 overflow-x-auto rounded-md border border-border/55 bg-surface/50 px-3 py-2 text-sm",
        className,
      )}
    >
      {steps.map((step, index) => {
        const completed = index < activeIndex;
        const current = index === activeIndex;
        return (
          <li
            key={step.id}
            className={cn(
              "flex items-center gap-2 whitespace-nowrap",
              index > 0 && "before:mr-2 before:h-px before:w-6 before:bg-border/70 before:content-['']",
            )}
            aria-current={current ? "step" : undefined}
          >
            <span
              className={cn(
                "inline-flex size-6 items-center justify-center rounded-full border text-[11px] font-medium",
                completed
                  ? "border-success/40 bg-success/15 text-success"
                  : current
                    ? "border-primary/50 bg-primary/15 text-primary"
                    : "border-border/60 bg-inset/30 text-text-muted",
              )}
              aria-hidden
            >
              {completed ? <CheckIcon className="size-3" /> : index + 1}
            </span>
            <span
              className={cn(
                "font-medium",
                current ? "text-text" : "text-text-muted",
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
