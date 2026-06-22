import type { ComponentType, SVGProps } from "react";
import {
  ArrowRightIcon,
  ChartBarSquareIcon,
  CheckIcon,
  CodeBracketSquareIcon,
  DocumentCheckIcon,
  EyeIcon,
  GlobeAltIcon,
  MagnifyingGlassCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { RevealItem } from "@/components/motion/Motion";
import type { SeoChecklistCard, SeoVisibilityFlow } from "@/lib/technical-seo-service-content";
import { cn } from "@/lib/utils";

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

const PIPELINE_STEP_ICONS: IconComponent[] = [
  GlobeAltIcon,
  MagnifyingGlassCircleIcon,
  DocumentCheckIcon,
  CodeBracketSquareIcon,
  ChartBarSquareIcon,
  EyeIcon,
];

function PipelineConnector() {
  return (
    <span
      className="inline-flex shrink-0 items-center justify-center px-0.5 text-text-muted/70 sm:px-1"
      aria-hidden
    >
      <span className="hidden h-px w-2 bg-border sm:block lg:w-4" />
      <ArrowRightIcon className="size-3.5 sm:size-4" />
      <span className="hidden h-px w-2 bg-border sm:block lg:w-4" />
    </span>
  );
}

function PipelineNode({
  label,
  index,
  isOutcome,
  compact,
}: {
  label: string;
  index: number;
  isOutcome: boolean;
  compact?: boolean;
}) {
  const Icon = PIPELINE_STEP_ICONS[index] ?? GlobeAltIcon;

  return (
    <div
      className={cn(
        "flex min-w-0 flex-col items-center text-center",
        compact ? "w-[5.75rem] shrink-0 snap-center sm:w-[6.75rem]" : "flex-1",
      )}
    >
      <div
        className={cn(
          "relative flex items-center justify-center rounded-full border transition-[border-color,box-shadow] duration-300 ease-linear",
          compact ? "size-11" : "size-12 sm:size-14",
          isOutcome
            ? "border-primary/40 bg-primary/12 text-primary shadow-[0_0_0_4px_color-mix(in_srgb,var(--color-primary)_12%,transparent)]"
            : "border-border bg-background text-text ring-4 ring-surface",
        )}
      >
        <Icon className={cn(compact ? "size-5" : "size-5 sm:size-6")} aria-hidden />
        <span
          className={cn(
            "absolute -top-1 -right-1 inline-flex size-4 items-center justify-center rounded-full font-mono text-[9px] leading-none",
            isOutcome
              ? "bg-primary text-white"
              : "border border-border bg-surface text-text-muted",
          )}
          aria-hidden
        >
          {index + 1}
        </span>
      </div>
      <p
        className={cn(
          "mt-2.5 font-medium leading-5 text-pretty",
          compact ? "max-w-[5.75rem] text-[11px] sm:max-w-[6.75rem] sm:text-xs" : "max-w-[7.5rem] text-xs sm:max-w-none sm:text-sm",
          isOutcome ? "text-primary" : "text-text",
        )}
      >
        {label}
      </p>
    </div>
  );
}

function VisibilityPipeline({ flow }: { flow: SeoVisibilityFlow }) {
  const steps = flow.steps;
  const lastIndex = steps.length - 1;

  return (
    <div className="mt-8 min-w-0">
      <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-primary">{flow.title}</p>

      {/* Mobile + tablet: horizontal snap scroll */}
      <div className="relative mt-5 lg:hidden">
        <div
          className="pointer-events-none absolute inset-y-0 left-0 z-[1] w-8 bg-linear-to-r from-surface to-transparent"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 z-[1] w-8 bg-linear-to-l from-surface to-transparent"
          aria-hidden
        />
        <ol
          className="flex snap-x snap-mandatory gap-0.5 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          aria-label={flow.title}
        >
          {steps.map((step, index) => (
            <li key={`${step}-scroll`} className="flex shrink-0 items-start">
              <PipelineNode
                label={step}
                index={index}
                isOutcome={index === lastIndex}
                compact
              />
              {index < lastIndex ? (
                <span className="inline-flex shrink-0 self-start pt-5">
                  <PipelineConnector />
                </span>
              ) : null}
            </li>
          ))}
        </ol>
      </div>

      {/* Desktop: connected horizontal pipeline */}
      <div className="relative mt-6 hidden lg:block">
        <span
          className="pointer-events-none absolute top-7 right-[6%] left-[6%] h-px bg-linear-to-r from-border via-primary/20 to-primary/35"
          aria-hidden
        />
        <ol className="relative flex items-start justify-between gap-2" aria-label={flow.title}>
          {steps.map((step, index) => (
            <li key={`${step}-desktop`} className="flex min-w-0 flex-1 items-start">
              <PipelineNode label={step} index={index} isOutcome={index === lastIndex} />
              {index < lastIndex ? (
                <span className="mt-6 flex flex-1 items-center justify-center">
                  <PipelineConnector />
                </span>
              ) : null}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

function ComparisonPanel({ card }: { card: SeoChecklistCard }) {
  const isPositive = card.variant === "positive";
  const Icon = isPositive ? CheckIcon : XMarkIcon;

  return (
    <div
      className={cn(
        "relative flex h-full flex-col p-5 sm:p-6 md:p-7",
        isPositive
          ? "bg-primary/4 md:border-l md:border-primary/20"
          : "bg-inset/40 md:border-r md:border-border",
      )}
    >
      <div className="flex items-center gap-3">
        <span
          className={cn(
            "inline-flex size-8 shrink-0 items-center justify-center rounded-full border font-mono text-[10px] uppercase tracking-wider",
            isPositive
              ? "border-primary/30 bg-primary/10 text-primary"
              : "border-border bg-surface text-text-muted",
          )}
          aria-hidden
        >
          {isPositive ? "✓" : "✕"}
        </span>
        <h3 className="font-display text-lg tracking-tight sm:text-xl">{card.title}</h3>
      </div>

      <ul className="mt-5 space-y-2.5" aria-label={card.title}>
        {card.items.map((item) => (
          <li
            key={item}
            className={cn(
              "flex items-start gap-3 rounded-md border px-3 py-2.5 text-sm leading-6",
              isPositive
                ? "border-primary/15 bg-surface/80 text-text"
                : "border-border/80 bg-surface/50 text-text-muted",
            )}
          >
            <span
              className={cn(
                "mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full",
                isPositive ? "bg-success/15 text-success" : "bg-destructive/10 text-destructive",
              )}
              aria-hidden
            >
              <Icon className="size-3.5" />
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

type SeoVisibilityFoundationProps = {
  flow: SeoVisibilityFlow;
  withoutSetup: SeoChecklistCard;
  withSetup: SeoChecklistCard;
};

export function SeoVisibilityFoundation({ flow, withoutSetup, withSetup }: SeoVisibilityFoundationProps) {
  return (
    <RevealItem className="mt-10 min-w-0">
      <div className="relative overflow-hidden rounded-lg border border-border bg-surface shadow-(--shadow-1)">
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.35]" aria-hidden />
        <div
          className="pointer-events-none absolute -top-24 right-0 size-64 rounded-full bg-primary/8 blur-3xl"
          aria-hidden
        />

        <div className="relative px-5 py-8 sm:px-8 sm:py-10">
          <VisibilityPipeline flow={flow} />
        </div>

        <div className="relative border-t border-border">
          <div className="pointer-events-none absolute top-1/2 left-1/2 z-[2] hidden -translate-x-1/2 -translate-y-1/2 md:block">
            <span className="inline-flex size-9 items-center justify-center rounded-full border border-border bg-surface font-mono text-[10px] uppercase tracking-[0.14em] text-text-muted shadow-(--shadow-1)">
              vs
            </span>
          </div>

          <div className="grid min-w-0 md:grid-cols-2">
            <ComparisonPanel card={withoutSetup} />
            <ComparisonPanel card={withSetup} />
          </div>
        </div>
      </div>
    </RevealItem>
  );
}
