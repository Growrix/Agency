import { Fragment } from "react";
import Link from "next/link";
import {
  ArrowRightIcon,
  CheckIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import { Card } from "@/components/primitives/Card";
import { LinkButton } from "@/components/primitives/Button";
import {
  INVESTMENT_CLIENT_JOURNEYS,
  INVESTMENT_DELIVERY_COMPARISON,
  INVESTMENT_SERVICE_RANGES,
  INVESTMENT_STARTING_POINTS,
} from "@/lib/investment-guide-content";
import { RevealGroup, RevealItem } from "@/components/motion/Motion";
import { cn } from "@/lib/utils";

export function InvestmentStartingPoints() {
  return (
    <RevealGroup className="mt-10 grid gap-5 lg:grid-cols-3" stagger={0.08}>
      {INVESTMENT_STARTING_POINTS.cards.map((card) => (
        <RevealItem key={card.title} className="h-full min-w-0">
          <Card
            hoverable
            className={cn(
              "flex h-full flex-col p-5 sm:p-6",
              "featured" in card && card.featured && "border-primary/30 ring-1 ring-primary/15",
            )}
          >
            <div className="flex items-start justify-between gap-3">
              <h3 className="font-display text-xl tracking-tight sm:text-2xl">{card.title}</h3>
              {"featured" in card && card.featured ? (
                <span className="shrink-0 rounded-full border border-primary/30 bg-primary/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-primary">
                  Popular
                </span>
              ) : null}
            </div>
            <p className="mt-3 font-mono text-sm text-primary">{card.investment}</p>
            <p className="mt-3 text-sm leading-6 text-text-muted">{card.description}</p>

            <div className="mt-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-text-muted">Best for</p>
              <ul className="mt-2 space-y-1.5">
                {card.bestFor.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-text">
                    <CheckIcon className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6">
              <LinkButton
                href={card.cta.href}
                variant={"featured" in card && card.featured ? "primary" : "outline"}
                className="w-full sm:w-auto"
              >
                {card.cta.label}
              </LinkButton>
            </div>
          </Card>
        </RevealItem>
      ))}
    </RevealGroup>
  );
}

export function ServiceInvestmentGrid() {
  return (
    <RevealGroup className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" stagger={0.06}>
      {INVESTMENT_SERVICE_RANGES.services.map((service) => (
        <RevealItem key={service.title} className="h-full min-w-0">
          <Link href={service.href} className="group block h-full">
            <Card hoverable className="flex h-full flex-col p-5 sm:p-6">
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-display text-lg tracking-tight sm:text-xl group-hover:text-primary">{service.title}</h3>
                <ArrowRightIcon
                  className="size-4 shrink-0 text-text-muted transition-transform duration-300 group-hover:translate-x-0.5 group-hover:text-primary"
                  aria-hidden
                />
              </div>
              <p className="mt-2 font-mono text-sm text-primary">{service.investment}</p>
              <p className="mt-3 flex-1 text-sm leading-6 text-text-muted">{service.description}</p>
            </Card>
          </Link>
        </RevealItem>
      ))}
    </RevealGroup>
  );
}

export function DeliveryComparisonGrid() {
  return (
    <RevealGroup className="mt-10 grid gap-4 lg:grid-cols-3" stagger={0.08}>
      {INVESTMENT_DELIVERY_COMPARISON.paths.map((path) => (
        <RevealItem key={path.title} className="h-full min-w-0">
          <Card
            hoverable
            className={cn(
              "h-full p-5 sm:p-6",
              "featured" in path && path.featured && "border-primary/30 ring-1 ring-primary/15",
            )}
          >
            <h3 className="font-display text-xl tracking-tight">{path.title}</h3>
            <ul className="mt-4 space-y-2.5">
              {path.highlights.map((highlight) => (
                <li key={highlight} className="flex items-start gap-2 text-sm text-text-muted">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" aria-hidden />
                  {highlight}
                </li>
              ))}
            </ul>
          </Card>
        </RevealItem>
      ))}
    </RevealGroup>
  );
}

function JourneyConnector() {
  return (
    <span className="flex shrink-0 items-center justify-center py-0.5 sm:px-1" aria-hidden>
      <ChevronDownIcon className="size-4 text-text-muted sm:hidden" />
      <ChevronRightIcon className="hidden size-4 text-text-muted sm:block" />
    </span>
  );
}

export function ClientJourneyFlow() {
  return (
    <RevealGroup className="mt-10 grid gap-5 lg:grid-cols-3" stagger={0.08}>
      {INVESTMENT_CLIENT_JOURNEYS.journeys.map((journey) => (
        <RevealItem key={journey.persona} className="h-full min-w-0">
          <Card className="relative h-full overflow-hidden p-5 sm:p-6">
            <div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.12]" aria-hidden />
            <p className="relative font-mono text-[11px] uppercase tracking-[0.16em] text-primary">{journey.persona}</p>
            <ol
              className="relative mt-4 flex flex-col sm:flex-row sm:flex-wrap sm:items-center"
              aria-label={`${journey.persona} journey`}
            >
              {journey.steps.map((step, index) => (
                <Fragment key={step}>
                  <li className="min-w-0 flex-1 sm:flex-none">
                    <span className="block rounded-md border border-border bg-inset/60 px-3 py-2 text-center text-sm font-medium tracking-tight text-text sm:text-left">
                      {step}
                    </span>
                  </li>
                  {index < journey.steps.length - 1 ? (
                    <li className="list-none">
                      <JourneyConnector />
                    </li>
                  ) : null}
                </Fragment>
              ))}
            </ol>
            <p className="relative mt-4 text-xs font-medium text-text-muted">Typical progression over time</p>
          </Card>
        </RevealItem>
      ))}
    </RevealGroup>
  );
}
