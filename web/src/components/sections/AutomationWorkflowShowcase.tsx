import { ArrowDownIcon } from "@heroicons/react/24/outline";
import { Card } from "@/components/primitives/Card";
import { RevealGroup, RevealItem } from "@/components/motion/Motion";
import type { AutomationWorkflowExample } from "@/lib/automation-service-content";
import { cn } from "@/lib/utils";

function WorkflowDiagram({ steps }: { steps: string[] }) {
  return (
    <ol className="flex min-w-0 flex-col items-stretch" aria-label="Example workflow steps">
      {steps.map((step, index) => {
        const isLast = index === steps.length - 1;
        const isAiStep = /ai/i.test(step);

        return (
          <li key={`${step}-${index}`} className="flex min-w-0 flex-col items-center">
            <div
              className={cn(
                "workflow-node signal-rise relative w-full rounded-md border px-3 py-2.5 text-center text-xs font-medium leading-5 sm:text-sm",
                "transition-[border-color,box-shadow,transform] duration-300 ease-linear",
                isAiStep
                  ? "border-primary/35 bg-primary/10 text-primary shadow-[0_0_0_1px_rgba(var(--color-primary-rgb,99,102,241),0.08)]"
                  : "border-border bg-surface text-text",
              )}
              style={{ animationDelay: `${index * 70}ms` }}
            >
              {step}
            </div>
            {!isLast ? (
              <div className="flex flex-col items-center py-1.5" aria-hidden>
                <span className="h-3 w-px bg-border" />
                <ArrowDownIcon className="size-3.5 text-text-muted motion-safe:animate-pulse" />
                <span className="h-3 w-px bg-border" />
              </div>
            ) : null}
          </li>
        );
      })}
    </ol>
  );
}

export function AutomationWorkflowShowcase({ workflows }: { workflows: AutomationWorkflowExample[] }) {
  return (
    <RevealGroup className="mt-10 grid gap-5 lg:grid-cols-2" stagger={0.08}>
      {workflows.map((workflow) => (
        <RevealItem key={workflow.title} className="h-full min-w-0">
          <Card className="relative h-full overflow-hidden border-border bg-surface p-5 sm:p-6">
            <div
              className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-primary/40 to-transparent"
              aria-hidden
            />
            <h3 className="font-display text-lg tracking-tight sm:text-xl">{workflow.title}</h3>
            <div className="mt-5 min-w-0">
              <WorkflowDiagram steps={workflow.steps} />
            </div>
            <p className="mt-5 border-t border-border pt-4 text-sm leading-6 text-text-muted">
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-primary">
                Outcome
              </span>
              <span className="mt-1 block text-pretty">{workflow.outcome}</span>
            </p>
          </Card>
        </RevealItem>
      ))}
    </RevealGroup>
  );
}
