import Link from "next/link";
import { ArrowRightIcon, CheckIcon } from "@heroicons/react/24/outline";
import { Card } from "@/components/primitives/Card";
import { LinkButton } from "@/components/primitives/Button";
import { RevealGroup, RevealItem } from "@/components/motion/Motion";
import {
  CONTACT_EXPLORE,
  CONTACT_FORM,
  CONTACT_PROCESS,
  CONTACT_ROUTES,
} from "@/lib/contact-landing-content";
import { cn } from "@/lib/utils";

export function ContactProcessTimeline() {
  return (
    <RevealGroup
      as="ol"
      className="relative mt-10 grid items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-5 lg:gap-3"
      stagger={0.06}
      aria-label="What happens after you get in touch"
    >
      {CONTACT_PROCESS.steps.map((step, index) => (
        <RevealItem
          as="li"
          key={step.title}
          className={cn(
            "relative flex h-full min-w-0 flex-col",
            index < CONTACT_PROCESS.steps.length - 1 &&
              "lg:after:absolute lg:after:top-9 lg:after:left-[calc(50%+1.25rem)] lg:after:h-px lg:after:w-[calc(100%-2.5rem)] lg:after:bg-border/80 lg:after:content-['']",
          )}
        >
          <div className="relative flex h-full w-full gap-4 lg:block">
            <span
              className="relative z-10 flex size-8 shrink-0 items-center justify-center rounded-full border border-border bg-surface font-mono text-xs text-text-muted lg:absolute lg:-top-3 lg:left-4 lg:size-7"
              aria-hidden
            >
              {index + 1}
            </span>
            <span className="absolute left-4 top-10 bottom-0 w-px bg-border sm:hidden" aria-hidden />
            <Card className="relative flex h-full min-h-0 flex-1 flex-col p-5 sm:p-6 lg:pt-8">
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-primary">
                Step {step.number}
              </span>
              <h3 className="mt-2 font-display text-lg tracking-tight">{step.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-6 text-text-muted">{step.description}</p>
            </Card>
          </div>
        </RevealItem>
      ))}
    </RevealGroup>
  );
}

export function ContactRouteCards() {
  return (
    <RevealGroup className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" stagger={0.06}>
      {CONTACT_ROUTES.cards.map((card) => (
        <RevealItem key={card.title} className="h-full min-w-0">
          <Card hoverable className="flex h-full flex-col p-5 sm:p-6">
            <h3 className="font-display text-xl tracking-tight">{card.title}</h3>
            <p className="mt-3 flex-1 text-sm leading-6 text-text-muted">{card.description}</p>
            <LinkButton href={card.cta.href} variant="outline" className="mt-6 w-full sm:w-auto">
              {card.cta.label}
              <ArrowRightIcon className="size-4" aria-hidden />
            </LinkButton>
          </Card>
        </RevealItem>
      ))}
    </RevealGroup>
  );
}

export function ContactExploreCards() {
  return (
    <RevealGroup className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" stagger={0.06}>
      {CONTACT_EXPLORE.cards.map((card) => (
        <RevealItem key={card.title} className="h-full min-w-0">
          <Link href={card.href} className="group block h-full">
            <Card hoverable className="flex h-full flex-col p-5 sm:p-6">
              <h3 className="font-display text-lg tracking-tight group-hover:text-primary">{card.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-6 text-text-muted">{card.description}</p>
              <p className="mt-4 text-sm font-medium text-primary">Explore →</p>
            </Card>
          </Link>
        </RevealItem>
      ))}
    </RevealGroup>
  );
}

export function ContactProjectFitList() {
  return (
    <Card className="mt-6">
      <p className="font-mono text-[11px] uppercase tracking-wider text-text-muted">
        {CONTACT_FORM.projectFitHeading}
      </p>
      <ul className="mt-3 grid gap-2 sm:grid-cols-2">
        {CONTACT_FORM.projectFitItems.map((item) => (
          <li key={item} className="flex items-start gap-2 text-sm text-text">
            <CheckIcon className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
            {item}
          </li>
        ))}
      </ul>
    </Card>
  );
}
