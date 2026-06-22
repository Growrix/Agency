"use client";

import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { Container, Section } from "@/components/primitives/Container";
import { LinkButton } from "@/components/primitives/Button";
import { Badge } from "@/components/primitives/Badge";
import { SectionHeading } from "@/components/primitives/SectionHeading";
import { Accordion } from "@/components/sections/Accordion";
import { CTABand } from "@/components/sections/CTABand";
import {
  ClientJourneyFlow,
  DeliveryComparisonGrid,
  InvestmentStartingPoints,
  ServiceInvestmentGrid,
} from "@/components/sections/InvestmentGuideSections";
import { InvestmentGuideHeroPanel } from "@/components/sections/InvestmentGuideHeroPanel";
import { marketingSection } from "@/lib/marketing-composition";
import {
  INVESTMENT_CLIENT_JOURNEYS,
  INVESTMENT_DELIVERY_COMPARISON,
  INVESTMENT_GUIDE_CTA,
  INVESTMENT_GUIDE_FAQ,
  INVESTMENT_GUIDE_HERO,
  INVESTMENT_PROJECT_SCOPING,
  INVESTMENT_SERVICE_RANGES,
  INVESTMENT_STARTING_POINTS,
} from "@/lib/investment-guide-content";
import { HERO_TITLE_CLASS, HERO_VIEWPORT_CONTAINER_CLASS } from "@/lib/typography";
import { cn } from "@/lib/utils";

export function PricingPageClient() {
  return (
    <>
      <Section {...marketingSection("pricing", "hero")} layout="viewport" className="hero-section relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-50" aria-hidden />
        <Container className={HERO_VIEWPORT_CONTAINER_CLASS}>
          <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-10 xl:gap-12">
            <div className="lg:col-span-6 xl:col-span-7">
              <Badge tone="primary" dot>
                {INVESTMENT_GUIDE_HERO.eyebrow}
              </Badge>
              <h1 className={cn("mt-5", HERO_TITLE_CLASS)}>{INVESTMENT_GUIDE_HERO.title}</h1>
              <p className="mt-6 text-lg leading-7 text-text-muted text-pretty">{INVESTMENT_GUIDE_HERO.description}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <LinkButton href={INVESTMENT_GUIDE_HERO.primaryHref} size="lg">
                  {INVESTMENT_GUIDE_HERO.primaryCta} <ArrowRightIcon className="size-4" />
                </LinkButton>
                <LinkButton href={INVESTMENT_GUIDE_HERO.secondaryHref} variant="outline" size="lg">
                  {INVESTMENT_GUIDE_HERO.secondaryCta}
                </LinkButton>
              </div>
            </div>
            <div className="min-w-0 lg:col-span-6 lg:self-center xl:col-span-5">
              <InvestmentGuideHeroPanel />
            </div>
          </div>
        </Container>
      </Section>

      <Section {...marketingSection("pricing", "startingPoints")} id="starting-points">
        <Container>
          <SectionHeading
            eyebrow={INVESTMENT_STARTING_POINTS.eyebrow}
            title={INVESTMENT_STARTING_POINTS.title}
            description={INVESTMENT_STARTING_POINTS.description}
          />
          <InvestmentStartingPoints />
        </Container>
      </Section>

      <Section {...marketingSection("pricing", "serviceRanges")} tone="inset" id="service-investment-ranges">
        <Container>
          <SectionHeading
            eyebrow={INVESTMENT_SERVICE_RANGES.eyebrow}
            title={INVESTMENT_SERVICE_RANGES.title}
            description={INVESTMENT_SERVICE_RANGES.description}
          />
          <ServiceInvestmentGrid />
        </Container>
      </Section>

      <Section {...marketingSection("pricing", "deliveryComparison")}>
        <Container>
          <SectionHeading
            eyebrow={INVESTMENT_DELIVERY_COMPARISON.eyebrow}
            title={INVESTMENT_DELIVERY_COMPARISON.title}
          />
          <DeliveryComparisonGrid />
        </Container>
      </Section>

      <Section {...marketingSection("pricing", "scoping")} tone="inset">
        <Container>
          <SectionHeading
            eyebrow={INVESTMENT_PROJECT_SCOPING.eyebrow}
            title={INVESTMENT_PROJECT_SCOPING.title}
          />
          <div className="mt-10">
            <Accordion items={[...INVESTMENT_PROJECT_SCOPING.factors]} />
          </div>
        </Container>
      </Section>

      <Section {...marketingSection("pricing", "journeys")}>
        <Container>
          <SectionHeading
            eyebrow={INVESTMENT_CLIENT_JOURNEYS.eyebrow}
            title={INVESTMENT_CLIENT_JOURNEYS.title}
          />
          <ClientJourneyFlow />
        </Container>
      </Section>

      <Section {...marketingSection("pricing", "faq")} tone="inset">
        <Container width="reading">
          <SectionHeading
            eyebrow="FAQ"
            title="Investment questions, answered plainly."
            description="Path selection, upgrades, milestones, discovery, and support—before you commit."
            align="center"
          />
          <div className="mt-10">
            <Accordion items={[...INVESTMENT_GUIDE_FAQ]} />
          </div>
        </Container>
      </Section>

      <CTABand
        title={INVESTMENT_GUIDE_CTA.title}
        description={INVESTMENT_GUIDE_CTA.description}
        primary={{ label: INVESTMENT_GUIDE_CTA.primaryCta, href: INVESTMENT_GUIDE_CTA.primaryHref }}
        secondary={{ label: INVESTMENT_GUIDE_CTA.secondaryCta, href: INVESTMENT_GUIDE_CTA.secondaryHref }}
        {...marketingSection("pricing", "cta")}
      />
    </>
  );
}
