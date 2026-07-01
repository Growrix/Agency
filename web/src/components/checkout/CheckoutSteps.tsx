"use client";

import Link from "next/link";
import { CheckIcon } from "@heroicons/react/24/outline";
import { cn } from "@/lib/utils";

export type CheckoutStepId = "cart" | "information" | "payment" | "confirmation";

export type CheckoutStep = {
  id: CheckoutStepId;
  label: string;
  /** Absolute path this step navigates to when clicked; omit to make the step non-interactive. */
  href?: string;
};

const DEFAULT_STEPS: CheckoutStep[] = [
  { id: "cart", label: "Cart", href: "/cart" },
  { id: "information", label: "Information", href: "/checkout" },
  { id: "payment", label: "Payment", href: "/checkout/payment" },
  { id: "confirmation", label: "Confirmation", href: "/success" },
];

type CheckoutStepsProps = {
  active: CheckoutStepId;
  steps?: CheckoutStep[];
  /** Optional override map — used when a route needs to keep query params (e.g. product/tier). */
  hrefOverrides?: Partial<Record<CheckoutStepId, string>>;
  className?: string;
};

export function CheckoutSteps({
  active,
  steps = DEFAULT_STEPS,
  hrefOverrides,
  className,
}: CheckoutStepsProps) {
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
        const resolvedHref = hrefOverrides?.[step.id] ?? step.href;
        const interactive = Boolean(resolvedHref) && !current;

        const stepInner = (
          <>
            <span
              className={cn(
                "inline-flex size-6 shrink-0 items-center justify-center rounded-full border text-[11px] font-semibold transition-colors",
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
          </>
        );

        const itemClasses = cn(
          "flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-md px-2 py-1.5 transition-colors sm:px-3",
          current && "bg-inset/50",
          interactive && "hover:bg-inset/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary/60",
          !current && !interactive && "opacity-90",
        );

        return (
          <li
            key={step.id}
            aria-current={current ? "step" : undefined}
            className="flex flex-1"
          >
            {interactive && resolvedHref ? (
              <Link
                href={resolvedHref}
                className={itemClasses}
                aria-label={`Go to ${step.label} step`}
              >
                {stepInner}
              </Link>
            ) : (
              <span className={itemClasses}>{stepInner}</span>
            )}
          </li>
        );
      })}
    </ol>
  );
}
