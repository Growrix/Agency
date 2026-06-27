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
import { MarketingViewportGate } from "@/components/marketing/MarketingViewportGate";
import { MobilePricingCards } from "@/components/marketing/MobilePricingCards";
import { InvestmentClientJourneysMobile } from "@/components/marketing/pricing/InvestmentClientJourneysMobile";
import { InvestmentDeliveryComparisonMobile } from "@/components/marketing/pricing/InvestmentDeliveryComparisonMobile";
import { InvestmentGuideHeroMobile } from "@/components/marketing/pricing/InvestmentGuideHeroMobile";
import { InvestmentServiceRangesMobile } from "@/components/marketing/pricing/InvestmentServiceRangesMobile";
import { ServiceFaqMobile } from "@/components/marketing/services/ServiceFaqMobile";
import { ProductLedFinalCTAMobile } from "@/components/marketing/ProductLedFinalCTAMobile";
import { marketingSection } from "@/lib/marketing-composition";
import {
  INVESTMENT_CLIENT_JOURNEYS,
  INVESTMENT_DELIVERY_COMPARISON,
  INVESTMENT_GUIDE_CTA,
  INVESTMENT_GUIDE_FAQ,
  INVESTMENT_GUIDE_FAQ_SECTION,
  INVESTMENT_GUIDE_HERO,
  INVESTMENT_PROJECT_SCOPING,
  INVESTMENT_SERVICE_RANGES,
  INVESTMENT_STARTING_POINTS,
} from "@/lib/investment-guide-content";
import { MarketingHeroTitle } from "@/components/marketing/MarketingHeroTitle";
import { MarketingSplitHero } from "@/components/marketing/MarketingSplitHero";
import { HERO_VIEWPORT_CONTAINER_CLASS } from "@/lib/typography";
export function PricingPageClient() {
  return (
    <>
      {/* Hero */}
      <MarketingViewportGate
        mobile={
          <Section {...marketingSection("pricing", "hero")} layout="viewport" className="hero-section relative overflow-hidden">
            <div className="pointer-events-none absolute inset-0 bg-grid opacity-50" aria-hidden />
            <Container>
              <InvestmentGuideHeroMobile />
            </Container>
          </Section>
        }
        desktop={
          <Section {...marketingSection("pricing", "hero")} layout="viewport" className="hero-section relative overflow-hidden">
            <div className="pointer-events-none absolute inset-0 bg-grid opacity-50" aria-hidden />
            <Container className={HERO_VIEWPORT_CONTAINER_CLASS}>
              <MarketingSplitHero
                copy={
                  <>
                    <Badge tone="primary" dot>
                      {INVESTMENT_GUIDE_HERO.eyebrow}
                    </Badge>
                    <MarketingHeroTitle
                      className="mt-5"
                      title={INVESTMENT_GUIDE_HERO.title}
                      titleLead={INVESTMENT_GUIDE_HERO.titleLead}
                      titleAccent={INVESTMENT_GUIDE_HERO.titleAccent}
                    />
                    <p className="mt-6 text-lg leading-7 text-text-muted text-pretty">{INVESTMENT_GUIDE_HERO.description}</p>
                    <div className="mt-8 flex flex-wrap gap-3">
                      <LinkButton href={INVESTMENT_GUIDE_HERO.primaryHref} size="lg">
                        {INVESTMENT_GUIDE_HERO.primaryCta} <ArrowRightIcon className="size-4" />
                      </LinkButton>
                      <LinkButton href={INVESTMENT_GUIDE_HERO.secondaryHref} variant="outline" size="lg">
                        {INVESTMENT_GUIDE_HERO.secondaryCta}
                      </LinkButton>
                    </div>
                  </>
                }
                panel={<InvestmentGuideHeroPanel />}
              />
            </Container>
          </Section>
        }
      />

      {/* Starting points */}
      <Section {...marketingSection("pricing", "startingPoints")} id="starting-points">
        <Container>
          <MarketingViewportGate
            mobile={
              <MobilePricingCards
                eyebrow={INVESTMENT_STARTING_POINTS.eyebrow}
                titleLead={INVESTMENT_STARTING_POINTS.titleLead}
                titleAccent={INVESTMENT_STARTING_POINTS.titleAccent}
                description={INVESTMENT_STARTING_POINTS.description}
                cards={INVESTMENT_STARTING_POINTS.cards.map((card) => ({
                  ...card,
                  featured: "featured" in card ? Boolean(card.featured) : undefined,
                }))}
              />
            }
            desktop={
              <>
                <SectionHeading
                  eyebrow={INVESTMENT_STARTING_POINTS.eyebrow}
                  title={INVESTMENT_STARTING_POINTS.title}
                  description={INVESTMENT_STARTING_POINTS.description}
                />
                <InvestmentStartingPoints />
              </>
            }
          />
        </Container>
      </Section>

      <Section {...marketingSection("pricing", "serviceRanges")} tone="inset" id="service-investment-ranges">
        <Container>
          <MarketingViewportGate
            mobile={<InvestmentServiceRangesMobile />}
            desktop={
              <>
                <SectionHeading
                  eyebrow={INVESTMENT_SERVICE_RANGES.eyebrow}
                  title={INVESTMENT_SERVICE_RANGES.title}
                  description={INVESTMENT_SERVICE_RANGES.description}
                />
                <ServiceInvestmentGrid />
              </>
            }
          />
        </Container>
      </Section>

      <Section {...marketingSection("pricing", "deliveryComparison")}>
        <Container>
          <MarketingViewportGate
            mobile={<InvestmentDeliveryComparisonMobile />}
            desktop={
              <>
                <SectionHeading
                  eyebrow={INVESTMENT_DELIVERY_COMPARISON.eyebrow}
                  title={INVESTMENT_DELIVERY_COMPARISON.title}
                />
                <DeliveryComparisonGrid />
              </>
            }
          />
        </Container>
      </Section>

      <Section {...marketingSection("pricing", "scoping")} tone="inset">
        <Container>
          <MarketingViewportGate
            mobile={
              <ServiceFaqMobile
                eyebrow={INVESTMENT_PROJECT_SCOPING.eyebrow}
                title={INVESTMENT_PROJECT_SCOPING.title}
                titleLead={INVESTMENT_PROJECT_SCOPING.titleLead}
                titleAccent={INVESTMENT_PROJECT_SCOPING.titleAccent}
                items={[...INVESTMENT_PROJECT_SCOPING.factors]}
              />
            }
            desktop={
              <>
                <SectionHeading
                  eyebrow={INVESTMENT_PROJECT_SCOPING.eyebrow}
                  title={INVESTMENT_PROJECT_SCOPING.title}
                />
                <div className="mt-10">
                  <Accordion items={[...INVESTMENT_PROJECT_SCOPING.factors]} />
                </div>
              </>
            }
          />
        </Container>
      </Section>

      <Section {...marketingSection("pricing", "journeys")}>
        <Container>
          <MarketingViewportGate
            mobile={<InvestmentClientJourneysMobile />}
            desktop={
              <>
                <SectionHeading
                  eyebrow={INVESTMENT_CLIENT_JOURNEYS.eyebrow}
                  title={INVESTMENT_CLIENT_JOURNEYS.title}
                />
                <ClientJourneyFlow />
              </>
            }
          />
        </Container>
      </Section>

      {/* FAQ */}
      <Section {...marketingSection("pricing", "faq")} tone="inset">
        <Container width="reading">
          <MarketingViewportGate
            mobile={
              <ServiceFaqMobile
                eyebrow={INVESTMENT_GUIDE_FAQ_SECTION.eyebrow}
                title={INVESTMENT_GUIDE_FAQ_SECTION.title}
                titleLead={INVESTMENT_GUIDE_FAQ_SECTION.titleLead}
                titleAccent={INVESTMENT_GUIDE_FAQ_SECTION.titleAccent}
                description={INVESTMENT_GUIDE_FAQ_SECTION.description}
                items={[...INVESTMENT_GUIDE_FAQ]}
              />
            }
            desktop={
              <>
                <SectionHeading
                  eyebrow={INVESTMENT_GUIDE_FAQ_SECTION.eyebrow}
                  title={INVESTMENT_GUIDE_FAQ_SECTION.title}
                  description={INVESTMENT_GUIDE_FAQ_SECTION.description}
                  align="center"
                />
                <div className="mt-10">
                  <Accordion items={[...INVESTMENT_GUIDE_FAQ]} />
                </div>
              </>
            }
          />
        </Container>
      </Section>

      {/* CTA */}
      <MarketingViewportGate
        mobile={
          <ProductLedFinalCTAMobile
            eyebrow="Next step"
            titleLead={INVESTMENT_GUIDE_CTA.titleLead}
            titleAccent={INVESTMENT_GUIDE_CTA.titleAccent}
            description={INVESTMENT_GUIDE_CTA.description}
            primaryLabel={INVESTMENT_GUIDE_CTA.primaryCta}
            primaryHref={INVESTMENT_GUIDE_CTA.primaryHref}
            secondaryLabel={INVESTMENT_GUIDE_CTA.secondaryCta}
            secondaryHref={INVESTMENT_GUIDE_CTA.secondaryHref}
          />
        }
        desktop={
          <CTABand
            title={INVESTMENT_GUIDE_CTA.title}
            description={INVESTMENT_GUIDE_CTA.description}
            primary={{ label: INVESTMENT_GUIDE_CTA.primaryCta, href: INVESTMENT_GUIDE_CTA.primaryHref }}
            secondary={{ label: INVESTMENT_GUIDE_CTA.secondaryCta, href: INVESTMENT_GUIDE_CTA.secondaryHref }}
            {...marketingSection("pricing", "cta")}
          />
        }
      />
    </>
  );
}
