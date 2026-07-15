import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo-metadata";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildBreadcrumbListSchema, buildWebPageSchema } from "@/lib/seo-structured-data";
import { ArrowRightIcon, CheckIcon } from "@heroicons/react/24/outline";
import { Container, Section } from "@/components/primitives/Container";
import { LinkButton } from "@/components/primitives/Button";
import { Card } from "@/components/primitives/Card";
import { Badge } from "@/components/primitives/Badge";
import { SectionHeading } from "@/components/primitives/SectionHeading";
import { AboutFounderStory } from "@/components/sections/AboutFounderStory";
import { AboutHeroPanel } from "@/components/sections/AboutHeroPanel";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { CTABand } from "@/components/sections/CTABand";
import { GoogleReviews } from "@/components/sections/GoogleReviews";
import { RevealGroup, RevealItem } from "@/components/motion/Motion";
import { MarketingViewportGate } from "@/components/marketing/MarketingViewportGate";
import { MobileFeatureGrid } from "@/components/marketing/mobile/MobileFeatureGrid";
import { MobilePrincipleList } from "@/components/marketing/mobile/MobilePrincipleList";
import { AboutBusinessFirstMobile } from "@/components/marketing/about/AboutBusinessFirstMobile";
import { AboutFounderStoryMobile } from "@/components/marketing/about/AboutFounderStoryMobile";
import { AboutHeroMobile } from "@/components/marketing/about/AboutHeroMobile";
import { AboutReviewsMobile } from "@/components/marketing/about/AboutReviewsMobile";
import { ProcessStepsMobile } from "@/components/marketing/ProcessStepsMobile";
import { ProductLedFinalCTAMobile } from "@/components/marketing/ProductLedFinalCTAMobile";
import {
  ABOUT_BUSINESS_FIRST_SECTION,
  ABOUT_CLIENT_VALUE_SECTION,
  ABOUT_CTA,
  ABOUT_ECOSYSTEM_SECTION,
  ABOUT_FOUNDER_SECTION,
  ABOUT_HERO,
  ABOUT_HOW_WE_WORK_SECTION,
  ABOUT_PRINCIPLES_SECTION,
  ABOUT_PROCESS_SECTION,
  ABOUT_REVIEWS_SECTION,
  ABOUT_WHY_EXIST_SECTION,
} from "@/lib/about-landing-content";
import { PROCESS_STEPS } from "@/lib/content";
import { SHOW_GOOGLE_REVIEWS } from "@/lib/feature-flags";
import { marketingSection } from "@/lib/marketing-composition";
import { MarketingHeroTitle } from "@/components/marketing/MarketingHeroTitle";
import { MarketingSplitHero } from "@/components/marketing/MarketingSplitHero";
import { HERO_VIEWPORT_CONTAINER_CLASS } from "@/lib/typography";

export const metadata: Metadata = buildPageMetadata({
  title: "About — Founder-Led Web & SaaS Studio",
  description:
    "GrowrixOS is a founder-led product studio building websites, SaaS applications, mobile products, automation, technical SEO, and AI business systems for measurable outcomes.",
  path: "/about",
});

export default function AboutPage() {
  const aboutStructuredData = [
    buildWebPageSchema({
      name: "About — Founder-Led Web & SaaS Studio",
      description:
        "GrowrixOS is a founder-led product studio building websites, SaaS applications, mobile products, automation, technical SEO, and AI business systems for measurable outcomes.",
      path: "/about",
    }),
    buildBreadcrumbListSchema([
      { name: "Home", path: "/" },
      { name: "About", path: "/about" },
    ]),
  ];

  return (
    <>
      <JsonLd data={aboutStructuredData} />
      {/* Hero */}
      <MarketingViewportGate
        mobile={
          <Section {...marketingSection("about", "hero")} layout="viewport" className="hero-section relative overflow-hidden">
            <div className="pointer-events-none absolute inset-0 bg-grid opacity-50" aria-hidden />
            <Container>
              <AboutHeroMobile />
            </Container>
          </Section>
        }
        desktop={
          <Section {...marketingSection("about", "hero")} layout="viewport" className="hero-section relative overflow-hidden">
            <div className="pointer-events-none absolute inset-0 bg-grid opacity-50" aria-hidden />
            <Container className={HERO_VIEWPORT_CONTAINER_CLASS}>
              <MarketingSplitHero
                copy={
                  <>
                    <Badge tone="primary" dot>
                      {ABOUT_HERO.eyebrow}
                    </Badge>
                    <MarketingHeroTitle
                      className="mt-5"
                      title={ABOUT_HERO.title}
                      titleLead={ABOUT_HERO.titleLead}
                      titleAccent={ABOUT_HERO.titleAccent}
                    />
                    <p className="mt-6 text-lg leading-7 text-text-muted text-pretty">{ABOUT_HERO.description}</p>
                    <ul className="mt-6 space-y-2">
                      {ABOUT_HERO.proofPoints.map((point) => (
                        <li key={point} className="flex items-start gap-2.5 text-sm text-text">
                          <CheckIcon className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
                          {point}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-8 flex flex-wrap gap-3">
                      <LinkButton href={ABOUT_HERO.primaryHref} size="lg">
                        {ABOUT_HERO.primaryCta} <ArrowRightIcon className="size-4" />
                      </LinkButton>
                      <LinkButton href={ABOUT_HERO.secondaryHref} variant="outline" size="lg">
                        {ABOUT_HERO.secondaryCta}
                      </LinkButton>
                    </div>
                  </>
                }
                panel={<AboutHeroPanel />}
              />
            </Container>
          </Section>
        }
      />

      {/* Principles */}
      <Section {...marketingSection("about", "principles")}>
        <Container>
          <MarketingViewportGate
            mobile={
              <MobilePrincipleList
                eyebrow={ABOUT_PRINCIPLES_SECTION.eyebrow}
                titleLead={ABOUT_PRINCIPLES_SECTION.titleLead}
                titleAccent={ABOUT_PRINCIPLES_SECTION.titleAccent}
                description={ABOUT_PRINCIPLES_SECTION.description}
                items={ABOUT_PRINCIPLES_SECTION.principles}
              />
            }
            desktop={
              <>
                <SectionHeading
                  eyebrow={ABOUT_PRINCIPLES_SECTION.eyebrow}
                  title={ABOUT_PRINCIPLES_SECTION.title}
                  description={ABOUT_PRINCIPLES_SECTION.description}
                />
                <RevealGroup className="mt-10 grid gap-4 sm:grid-cols-2" stagger={0.06}>
                  {ABOUT_PRINCIPLES_SECTION.principles.map((principle) => (
                    <RevealItem key={principle.title}>
                      <Card hoverable className="h-full p-5 sm:p-6">
                        <p className="font-mono text-[11px] uppercase tracking-wider text-primary">Principle</p>
                        <h3 className="mt-2 font-display text-xl tracking-tight">{principle.title}</h3>
                        <p className="mt-2 text-sm leading-6 text-text-muted text-pretty">{principle.description}</p>
                      </Card>
                    </RevealItem>
                  ))}
                </RevealGroup>
              </>
            }
          />
        </Container>
      </Section>

      <Section {...marketingSection("about", "founder")} tone="inset">
        <Container>
          <MarketingViewportGate
            mobile={<AboutFounderStoryMobile />}
            desktop={
              <>
                <SectionHeading eyebrow={ABOUT_FOUNDER_SECTION.eyebrow} title={ABOUT_FOUNDER_SECTION.title} />
                <AboutFounderStory />
              </>
            }
          />
        </Container>
      </Section>

      <Section {...marketingSection("about", "whyExist")}>
        <Container>
          <MarketingViewportGate
            mobile={
              <MobileFeatureGrid
                eyebrow={ABOUT_WHY_EXIST_SECTION.eyebrow}
                titleLead={ABOUT_WHY_EXIST_SECTION.titleLead}
                titleAccent={ABOUT_WHY_EXIST_SECTION.titleAccent}
                description={ABOUT_WHY_EXIST_SECTION.description}
                items={ABOUT_WHY_EXIST_SECTION.pillars}
              />
            }
            desktop={
              <>
                <SectionHeading
                  eyebrow={ABOUT_WHY_EXIST_SECTION.eyebrow}
                  title={ABOUT_WHY_EXIST_SECTION.title}
                  description={ABOUT_WHY_EXIST_SECTION.description}
                />
                <RevealGroup className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" stagger={0.06}>
                  {ABOUT_WHY_EXIST_SECTION.pillars.map((pillar) => (
                    <RevealItem key={pillar.title} className="h-full min-w-0">
                      <Card hoverable className="h-full p-5 sm:p-6">
                        <h3 className="font-display text-lg tracking-tight sm:text-xl">{pillar.title}</h3>
                        <p className="mt-2 text-sm leading-6 text-text-muted">{pillar.description}</p>
                      </Card>
                    </RevealItem>
                  ))}
                </RevealGroup>
              </>
            }
          />
        </Container>
      </Section>

      {/* Process */}
      <Section {...marketingSection("about", "process")} tone="inset" id="process">
        <Container>
          <MarketingViewportGate
            mobile={
              <ProcessStepsMobile
                steps={PROCESS_STEPS}
                eyebrow={ABOUT_PROCESS_SECTION.eyebrow}
                titleLead={ABOUT_PROCESS_SECTION.titleLead}
                titleAccent={ABOUT_PROCESS_SECTION.titleAccent}
                description={ABOUT_PROCESS_SECTION.description}
              />
            }
            desktop={
              <>
                <SectionHeading
                  eyebrow={ABOUT_PROCESS_SECTION.eyebrow}
                  title={ABOUT_PROCESS_SECTION.title}
                  description={ABOUT_PROCESS_SECTION.description}
                />
                <div className="mt-10">
                  <ProcessSteps steps={PROCESS_STEPS} />
                </div>
              </>
            }
          />
        </Container>
      </Section>

      <Section {...marketingSection("about", "ecosystem")}>
        <Container>
          <MarketingViewportGate
            mobile={
              <MobileFeatureGrid
                eyebrow={ABOUT_ECOSYSTEM_SECTION.eyebrow}
                titleLead={ABOUT_ECOSYSTEM_SECTION.titleLead}
                titleAccent={ABOUT_ECOSYSTEM_SECTION.titleAccent}
                description={ABOUT_ECOSYSTEM_SECTION.description}
                items={ABOUT_ECOSYSTEM_SECTION.services}
              />
            }
            desktop={
              <>
                <SectionHeading
                  eyebrow={ABOUT_ECOSYSTEM_SECTION.eyebrow}
                  title={ABOUT_ECOSYSTEM_SECTION.title}
                  description={ABOUT_ECOSYSTEM_SECTION.description}
                />
                <RevealGroup className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" stagger={0.06}>
                  {ABOUT_ECOSYSTEM_SECTION.services.map((service) => (
                    <RevealItem key={service.title} className="h-full min-w-0">
                      <Card hoverable className="h-full p-5 sm:p-6">
                        <h3 className="font-display text-lg tracking-tight sm:text-xl">{service.title}</h3>
                        <p className="mt-2 text-sm leading-6 text-text-muted">{service.description}</p>
                      </Card>
                    </RevealItem>
                  ))}
                </RevealGroup>
              </>
            }
          />
        </Container>
      </Section>

      <Section {...marketingSection("about", "businessFirst")} tone="inset">
        <Container>
          <MarketingViewportGate
            mobile={<AboutBusinessFirstMobile />}
            desktop={
              <div className="marketing-content-split gap-8 lg:gap-10">
                <div className="lg:col-span-7">
                  <SectionHeading
                    eyebrow={ABOUT_BUSINESS_FIRST_SECTION.eyebrow}
                    title={ABOUT_BUSINESS_FIRST_SECTION.title}
                    description={ABOUT_BUSINESS_FIRST_SECTION.description}
                  />
                </div>
                <Card variant="inset" className="flex h-full flex-col rounded-lg p-6 sm:p-8 lg:col-span-5">
                  <h3 className="font-display text-lg tracking-tight text-primary">{ABOUT_BUSINESS_FIRST_SECTION.cardTitle}</h3>
                  <hr className="my-4 border-border" />
                  <ul className="space-y-3">
                    {ABOUT_BUSINESS_FIRST_SECTION.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-start gap-3 text-sm leading-6 sm:text-base">
                        <CheckIcon className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 pt-2">
                    <LinkButton href={ABOUT_BUSINESS_FIRST_SECTION.cta.href} className="w-full sm:w-auto">
                      {ABOUT_BUSINESS_FIRST_SECTION.cta.label}
                    </LinkButton>
                  </div>
                </Card>
              </div>
            }
          />
        </Container>
      </Section>

      {/* How we work */}
      <Section {...marketingSection("about", "howWeWork")}>
        <Container>
          <MarketingViewportGate
            mobile={
              <MobilePrincipleList
                eyebrow={ABOUT_HOW_WE_WORK_SECTION.eyebrow}
                titleLead={ABOUT_HOW_WE_WORK_SECTION.titleLead}
                titleAccent={ABOUT_HOW_WE_WORK_SECTION.titleAccent}
                description={ABOUT_HOW_WE_WORK_SECTION.description}
                items={ABOUT_HOW_WE_WORK_SECTION.cards}
              />
            }
            desktop={
              <>
                <SectionHeading
                  eyebrow={ABOUT_HOW_WE_WORK_SECTION.eyebrow}
                  title={ABOUT_HOW_WE_WORK_SECTION.title}
                  description={ABOUT_HOW_WE_WORK_SECTION.description}
                />
                <RevealGroup className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" stagger={0.06}>
                  {ABOUT_HOW_WE_WORK_SECTION.cards.map((item) => (
                    <RevealItem key={item.title} className="h-full min-w-0">
                      <Card hoverable className="h-full p-5 sm:p-6">
                        <h3 className="font-display text-lg tracking-tight">{item.title}</h3>
                        <p className="mt-2 text-sm leading-6 text-text-muted">{item.description}</p>
                      </Card>
                    </RevealItem>
                  ))}
                </RevealGroup>
              </>
            }
          />
        </Container>
      </Section>

      <Section {...marketingSection("about", "clientValue")} tone="inset">
        <Container>
          <MarketingViewportGate
            mobile={
              <MobileFeatureGrid
                eyebrow={ABOUT_CLIENT_VALUE_SECTION.eyebrow}
                titleLead={ABOUT_CLIENT_VALUE_SECTION.titleLead}
                titleAccent={ABOUT_CLIENT_VALUE_SECTION.titleAccent}
                items={ABOUT_CLIENT_VALUE_SECTION.items}
              />
            }
            desktop={
              <>
                <SectionHeading eyebrow={ABOUT_CLIENT_VALUE_SECTION.eyebrow} title={ABOUT_CLIENT_VALUE_SECTION.title} />
                <RevealGroup className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" stagger={0.05}>
                  {ABOUT_CLIENT_VALUE_SECTION.items.map((item) => (
                    <RevealItem key={item.title}>
                      <Card className="h-full p-5 sm:p-6">
                        <h3 className="font-display text-lg tracking-tight">{item.title}</h3>
                        <p className="mt-2 text-sm leading-6 text-text-muted">{item.description}</p>
                      </Card>
                    </RevealItem>
                  ))}
                </RevealGroup>
              </>
            }
          />
        </Container>
      </Section>

      {SHOW_GOOGLE_REVIEWS ? (
        <Section {...marketingSection("about", "reviews")}>
          <Container>
            <MarketingViewportGate
              mobile={<AboutReviewsMobile />}
              desktop={
                <GoogleReviews
                  eyebrow={ABOUT_REVIEWS_SECTION.eyebrow}
                  title={ABOUT_REVIEWS_SECTION.title}
                  description={ABOUT_REVIEWS_SECTION.description}
                />
              }
            />
          </Container>
        </Section>
      ) : null}

      {/* CTA */}
      <MarketingViewportGate
        mobile={
          <ProductLedFinalCTAMobile
            eyebrow="Next step"
            titleLead={ABOUT_CTA.titleLead}
            titleAccent={ABOUT_CTA.titleAccent}
            description={ABOUT_CTA.description}
            primaryLabel={ABOUT_CTA.primaryCta}
            primaryHref={ABOUT_CTA.primaryHref}
            secondaryLabel={ABOUT_CTA.secondaryCta}
            secondaryHref={ABOUT_CTA.secondaryHref}
          />
        }
        desktop={
          <CTABand
            title={ABOUT_CTA.title}
            description={ABOUT_CTA.description}
            primary={{ label: ABOUT_CTA.primaryCta, href: ABOUT_CTA.primaryHref }}
            secondary={{ label: ABOUT_CTA.secondaryCta, href: ABOUT_CTA.secondaryHref }}
            {...marketingSection("about", "cta")}
          />
        }
      />
    </>
  );
}
