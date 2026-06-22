import type { Step } from "@/components/sections/ProcessSteps";
import { RevealGroup, RevealItem } from "@/components/motion/Motion";
import { cn } from "@/lib/utils";

export function WebsiteLaunchProcessTimeline({ steps }: { steps: Step[] }) {
  return (
    <div className="relative">
      <span
        className="pointer-events-none absolute top-10 right-[12.5%] left-[12.5%] hidden h-px bg-border lg:block"
        aria-hidden
      />

      <RevealGroup
        as="ol"
        className="relative grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        stagger={0.08}
      >
        {steps.map((step, index) => {
          const isLast = index === steps.length - 1;
          const isLeftColumnOnTablet = index % 2 === 0;

          return (
            <RevealItem
              as="li"
              key={step.title}
              className="relative h-full"
            >
              {!isLast && (
                <span
                  className="pointer-events-none absolute top-10 right-0 hidden h-px w-4 translate-x-full bg-border sm:block lg:hidden"
                  aria-hidden
                />
              )}

              {!isLast && (
                <span
                  className="pointer-events-none absolute top-full left-6 h-4 w-px bg-border sm:hidden"
                  aria-hidden
                />
              )}

              {index < steps.length - 2 && isLeftColumnOnTablet && (
                <span
                  className="pointer-events-none absolute -bottom-4 left-1/2 hidden h-4 w-px -translate-x-1/2 bg-border sm:block lg:hidden"
                  aria-hidden
                />
              )}

              <article
                className={cn(
                  "relative z-[1] flex h-full flex-col rounded-md border border-border bg-surface p-6 shadow-(--shadow-1)",
                  "transition-[transform,box-shadow,border-color] duration-300 ease-linear",
                  "hover:-translate-y-1 hover:border-border-strong hover:shadow-(--shadow-2)",
                  !isLast && "mb-4 sm:mb-0",
                )}
              >
                <div className="flex items-center gap-3">
                  <span
                    className="inline-flex size-8 shrink-0 items-center justify-center rounded-full border border-primary/30 bg-surface font-mono text-xs text-primary ring-4 ring-surface"
                    aria-hidden
                  >
                    {index + 1}
                  </span>
                  <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-text-muted">
                    Step {step.number}
                  </span>
                </div>
                <h3 className="mt-4 font-display text-lg tracking-tight">{step.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-6 text-text-muted">{step.description}</p>
              </article>
            </RevealItem>
          );
        })}
      </RevealGroup>
    </div>
  );
}
