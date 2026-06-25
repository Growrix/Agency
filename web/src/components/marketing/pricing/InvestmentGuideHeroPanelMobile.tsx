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
import {
  INVESTMENT_HERO_PANEL,
  INVESTMENT_SERVICE_RANGES,
  INVESTMENT_STARTING_POINTS,
} from "@/lib/investment-guide-content";

const PATH_ICONS = [ShoppingBagIcon, WrenchScrewdriverIcon, SparklesIcon];
const DECISION_ICONS = [BanknotesIcon, ClockIcon, PuzzlePieceIcon];

export function InvestmentGuideHeroPanelMobile() {
  return (
    <div className="services-landing-hero-mobile__ecosystem investment-guide-hero-mobile__panel">
      <p className="services-landing-hero-mobile__ecosystem-label">
        {INVESTMENT_HERO_PANEL.pathsEyebrow}
      </p>

      <ul className="investment-guide-hero-mobile__path-list" aria-label="Investment starting paths">
        {INVESTMENT_STARTING_POINTS.cards.map((card, index) => {
          const Icon = PATH_ICONS[index] ?? CubeIcon;

          return (
            <li key={card.title}>
              <Link href={card.cta.href} className="services-landing-hero-mobile__ecosystem-link">
                <span className="services-landing-hero-mobile__ecosystem-link-icon" aria-hidden>
                  <Icon className="services-landing-hero-mobile__ecosystem-icon-glyph" />
                </span>
                <span className="services-landing-hero-mobile__ecosystem-hub-body">
                  <span className="services-landing-hero-mobile__ecosystem-link-label">{card.title}</span>
                  <span className="investment-guide-hero-mobile__path-investment">{card.investment}</span>
                </span>
                <ChevronRightIcon className="services-landing-hero-mobile__ecosystem-chevron" aria-hidden />
              </Link>
            </li>
          );
        })}
      </ul>

      <div className="investment-guide-hero-mobile__divider" aria-hidden />

      <p className="services-landing-hero-mobile__ecosystem-label">
        {INVESTMENT_HERO_PANEL.rangesEyebrow}
      </p>

      <ul className="investment-guide-hero-mobile__range-grid" aria-label="Service investment ranges">
        {INVESTMENT_SERVICE_RANGES.services.map((service) => (
          <li key={service.title} className="min-w-0">
            <Link href={service.href} className="investment-guide-hero-mobile__range-chip">
              <span className="investment-guide-hero-mobile__range-title">{service.title}</span>
              <span className="investment-guide-hero-mobile__range-investment">{service.investment}</span>
            </Link>
          </li>
        ))}
      </ul>

      <div className="investment-guide-hero-mobile__divider" aria-hidden />

      <p className="services-landing-hero-mobile__ecosystem-label">
        {INVESTMENT_HERO_PANEL.decisionEyebrow}
      </p>

      <ul className="investment-guide-hero-mobile__decision-grid" aria-label="Investment decision factors">
        {INVESTMENT_HERO_PANEL.decisions.map((item, index) => {
          const Icon = DECISION_ICONS[index] ?? BanknotesIcon;

          return (
            <li key={item.label}>
              <span className="investment-guide-hero-mobile__decision-chip">
                <Icon className="investment-guide-hero-mobile__decision-icon" aria-hidden />
                <span className="investment-guide-hero-mobile__decision-label">{item.label}</span>
              </span>
            </li>
          );
        })}
      </ul>

      <Link href={INVESTMENT_HERO_PANEL.viewAllHref} className="investment-guide-hero-mobile__view-all">
        {INVESTMENT_HERO_PANEL.viewAllLabel}
        <ChevronRightIcon className="size-3.5" aria-hidden />
      </Link>
    </div>
  );
}
