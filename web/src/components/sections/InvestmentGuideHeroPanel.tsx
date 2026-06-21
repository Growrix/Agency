"use client";

import Link from "next/link";
import {
  BanknotesIcon,
  ChevronRightIcon,
  ClockIcon,
  CubeIcon,
  PuzzlePieceIcon,
  ShoppingBagIcon,
  SparklesIcon,
  WrenchScrewdriverIcon,
} from "@heroicons/react/24/outline";
import { Card } from "@/components/primitives/Card";
import {
  INVESTMENT_HERO_PANEL,
  INVESTMENT_SERVICE_RANGES,
  INVESTMENT_STARTING_POINTS,
} from "@/lib/investment-guide-content";
import { cn } from "@/lib/utils";

const PATH_ICONS = [ShoppingBagIcon, WrenchScrewdriverIcon, SparklesIcon];
const DECISION_ICONS = [BanknotesIcon, ClockIcon, PuzzlePieceIcon];

function PathRow({
  label,
  investment,
  href,
  icon: Icon,
}: {
  label: string;
  investment: string;
  href: string;
  icon: typeof ShoppingBagIcon;
}) {
  return (
    <Link
      href={href}
      className="group flex items-center gap-2.5 rounded-md border border-transparent px-2 py-1.5 transition-[border-color,background-color] duration-300 hover:border-border hover:bg-background/50"
    >
      <span className="inline-flex size-7 shrink-0 items-center justify-center rounded-md border border-border bg-surface text-primary sm:size-8">
        <Icon className="size-3.5 sm:size-4" aria-hidden />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-sm font-medium tracking-tight text-text group-hover:text-primary">{label}</span>
        <span className="mt-0.5 block font-mono text-[11px] text-primary">{investment}</span>
      </span>
      <ChevronRightIcon
        className="size-4 shrink-0 text-text-muted transition-transform duration-300 group-hover:translate-x-0.5 group-hover:text-primary"
        aria-hidden
      />
    </Link>
  );
}

function ServiceRangeChip({ title, investment, href }: { title: string; investment: string; href: string }) {
  return (
    <Link
      href={href}
      className="group flex flex-col rounded-md border border-border/80 bg-background/40 px-2.5 py-2 transition-[border-color,background-color] duration-300 hover:border-border hover:bg-background/70"
    >
      <span className="truncate text-xs font-medium tracking-tight text-text group-hover:text-primary">{title}</span>
      <span className="mt-1 font-mono text-[10px] leading-4 text-primary">{investment}</span>
    </Link>
  );
}

export function InvestmentGuideHeroPanel() {
  return (
    <div className="relative min-w-0 w-full lg:max-w-md lg:ml-auto">
      <div
        className="pointer-events-none absolute -right-8 -top-8 size-40 rounded-full bg-primary/8 blur-3xl"
        aria-hidden
      />
      <Card className="relative w-full overflow-hidden border-border bg-surface p-3 sm:p-4">
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.18]" aria-hidden />

        <p className="relative font-mono text-[10px] uppercase tracking-[0.16em] text-primary">
          {INVESTMENT_HERO_PANEL.pathsEyebrow}
        </p>
        <ul className="relative mt-2 space-y-0.5" aria-label="Investment starting paths">
          {INVESTMENT_STARTING_POINTS.cards.map((card, index) => {
            const Icon = PATH_ICONS[index] ?? CubeIcon;
            const href =
              card.title === "Digital Products"
                ? "/digital-products"
                : card.title === "Done-For-You Setup"
                  ? "/services"
                  : "/book-appointment";
            return (
              <li key={card.title}>
                <PathRow label={card.title} investment={card.investment} href={href} icon={Icon} />
              </li>
            );
          })}
        </ul>

        <div className="relative my-3 h-px bg-border/80" aria-hidden />

        <p className="relative font-mono text-[10px] uppercase tracking-[0.16em] text-primary">
          {INVESTMENT_HERO_PANEL.rangesEyebrow}
        </p>
        <ul className="relative mt-2 grid grid-cols-2 gap-1.5" aria-label="Service investment ranges">
          {INVESTMENT_SERVICE_RANGES.services.map((service) => (
            <li key={service.title} className="min-w-0">
              <ServiceRangeChip title={service.title} investment={service.investment} href={service.href} />
            </li>
          ))}
        </ul>

        <div className="relative my-3 h-px bg-border/80" aria-hidden />

        <p className="relative font-mono text-[10px] uppercase tracking-[0.16em] text-primary">
          {INVESTMENT_HERO_PANEL.decisionEyebrow}
        </p>
        <ul className="relative mt-2 grid grid-cols-3 gap-1" aria-label="Investment decision factors">
          {INVESTMENT_HERO_PANEL.decisions.map((item, index) => {
            const Icon = DECISION_ICONS[index] ?? BanknotesIcon;
            return (
              <li key={item.label}>
                <span className="flex h-full flex-col items-start gap-1.5 rounded-md border border-border/80 bg-background/40 px-2 py-2">
                  <Icon className="size-4 text-primary" aria-hidden />
                  <span className="text-xs font-medium leading-4 tracking-tight text-text">{item.label}</span>
                </span>
              </li>
            );
          })}
        </ul>

        <Link
          href={INVESTMENT_HERO_PANEL.viewAllHref}
          className={cn(
            "relative mt-3 inline-flex items-center gap-1 text-xs font-medium text-primary transition-[gap] duration-300 hover:gap-2",
          )}
        >
          {INVESTMENT_HERO_PANEL.viewAllLabel}
          <ChevronRightIcon className="size-3.5" aria-hidden />
        </Link>
      </Card>
    </div>
  );
}
