"use client";

import { useState } from "react";
import { ArrowRightIcon, MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Container, Section } from "@/components/primitives/Container";
import { Badge } from "@/components/primitives/Badge";
import { LinkButton } from "@/components/primitives/Button";
import { Card } from "@/components/primitives/Card";
import { CTABand } from "@/components/sections/CTABand";
import { GoogleReviews } from "@/components/sections/GoogleReviews";
import { PortfolioCard } from "@/components/sections/PortfolioCard";
import { PortfolioHeroPanel } from "@/components/sections/PortfolioHeroPanel";
import { SectionHeading } from "@/components/primitives/SectionHeading";
import { Accordion } from "@/components/sections/Accordion";
import { WebsiteLaunchProcessTimeline } from "@/components/sections/WebsiteLaunchProcessTimeline";
import { RevealGroup, RevealItem } from "@/components/motion/Motion";
import { SHOW_GOOGLE_REVIEWS } from "@/lib/feature-flags";
import { marketingSection } from "@/lib/marketing-composition";
import {
  PORTFOLIO_CAPABILITIES_SECTION,
  PORTFOLIO_DELIVERY_SECTION,
  PORTFOLIO_LANDING_CTA,
  PORTFOLIO_LANDING_FAQ,
  PORTFOLIO_LANDING_HERO,
  type PortfolioFilter,
} from "@/lib/portfolio-landing-content";
import { HERO_TITLE_CLASS, HERO_VIEWPORT_CONTAINER_CLASS } from "@/lib/typography";
import { cn } from "@/lib/utils";
import type { PublicPortfolioRecord } from "@/server/domain/catalog";

type PortfolioPageClientProps = {
  projects: PublicPortfolioRecord[];
  filters: PortfolioFilter[];
};

export function PortfolioPageClient({ projects, filters }: PortfolioPageClientProps) {
  const [filter, setFilter] = useState<string>("all");
  const [q, setQ] = useState("");

  const filtered = projects.filter((project) => {
    if (filter !== "all" && project.service !== filter) {
      return false;
    }

    if (q && !`${project.name} ${project.industry} ${project.summary}`.toLowerCase().includes(q.toLowerCase())) {
      return false;
    }

    return true;
  });

  function handleHeroFilterSelect(value: string) {
    setFilter(value);
    setQ("");
    document.getElementById("portfolio-grid")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <>
      <Section {...marketingSection("portfolio", "hero")} layout="viewport" className="hero-section relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-50 pointer-events-none" aria-hidden />
        <Container className={HERO_VIEWPORT_CONTAINER_CLASS}>
          <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-10 xl:gap-12">
            <div className="lg:col-span-6 xl:col-span-7">
              <Badge tone="primary" dot>
                {PORTFOLIO_LANDING_HERO.eyebrow}
              </Badge>
              <h1 className={cn("mt-5", HERO_TITLE_CLASS)}>{PORTFOLIO_LANDING_HERO.title}</h1>
              <p className="mt-6 text-lg text-text-muted leading-7 text-pretty">{PORTFOLIO_LANDING_HERO.description}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <LinkButton href={PORTFOLIO_LANDING_HERO.primaryHref} size="lg">
                  {PORTFOLIO_LANDING_HERO.primaryCta} <ArrowRightIcon className="size-4" />
                </LinkButton>
                <LinkButton href={PORTFOLIO_LANDING_HERO.secondaryHref} variant="outline" size="lg">
                  {PORTFOLIO_LANDING_HERO.secondaryCta}
                </LinkButton>
              </div>
            </div>
            <div className="min-w-0 lg:col-span-6 lg:self-center xl:col-span-5">
              <PortfolioHeroPanel projects={projects} filters={filters} onFilterSelect={handleHeroFilterSelect} />
            </div>
          </div>
        </Container>
      </Section>

      <Section {...marketingSection("portfolio", "filters")} tone="inset">
        <Container>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap gap-2">
              {filters.map((item) => (
                <button
                  key={item.value}
                  type="button"
                  onClick={() => setFilter(item.value)}
                  className={cn(
                    "rounded-full px-4 py-2 text-sm font-medium border transition-colors",
                    filter === item.value
                      ? "bg-primary text-surface border-primary"
                      : "bg-surface border-border hover:border-border-strong",
                  )}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <div className="relative max-w-sm w-full">
              <MagnifyingGlassIcon
                className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-text-muted"
                aria-hidden
              />
              <input
                type="search"
                value={q}
                onChange={(event) => setQ(event.target.value)}
                placeholder="Search projects, industries…"
                className="w-full h-11 rounded-sm border border-border bg-surface pl-9 pr-9 text-sm placeholder:text-text-muted focus:border-primary outline-none"
              />
              {q ? (
                <button
                  type="button"
                  onClick={() => setQ("")}
                  aria-label="Clear search"
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-text-muted hover:text-text"
                >
                  <XMarkIcon className="size-4" />
                </button>
              ) : null}
            </div>
          </div>
        </Container>
      </Section>

      <Section {...marketingSection("portfolio", "grid")} layout="content" spacing="split" id="portfolio-grid">
        <Container>
          {filtered.length === 0 ? (
            <div className="rounded-md border border-dashed border-border-strong bg-surface p-12 text-center">
              <p className="font-display text-xl tracking-tight">No projects match those filters.</p>
              <p className="mt-2 text-text-muted">Try clearing search or selecting a different category.</p>
              <button
                type="button"
                onClick={() => {
                  setFilter("all");
                  setQ("");
                }}
                className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-primary"
              >
                Reset filters
              </button>
            </div>
          ) : (
            <RevealGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3" stagger={0.06}>
              {filtered.map((project) => (
                <RevealItem key={project.slug} className="h-full">
                  <PortfolioCard project={project} />
                </RevealItem>
              ))}
            </RevealGroup>
          )}
        </Container>
      </Section>

      <Section {...marketingSection("portfolio", "capabilities")}>
        <Container>
          <SectionHeading
            eyebrow={PORTFOLIO_CAPABILITIES_SECTION.eyebrow}
            title={PORTFOLIO_CAPABILITIES_SECTION.title}
            description={PORTFOLIO_CAPABILITIES_SECTION.description}
          />
          <RevealGroup className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" stagger={0.06}>
            {PORTFOLIO_CAPABILITIES_SECTION.items.map((item) => (
              <RevealItem key={item.title} className="h-full min-w-0">
                <Card hoverable className="h-full p-5 sm:p-6">
                  <h3 className="font-display text-lg tracking-tight sm:text-xl">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-text-muted">{item.description}</p>
                </Card>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      <Section {...marketingSection("portfolio", "delivery")} tone="inset">
        <Container>
          <SectionHeading
            eyebrow={PORTFOLIO_DELIVERY_SECTION.eyebrow}
            title={PORTFOLIO_DELIVERY_SECTION.title}
            description={PORTFOLIO_DELIVERY_SECTION.description}
          />
          <div className="mt-10">
            <WebsiteLaunchProcessTimeline steps={[...PORTFOLIO_DELIVERY_SECTION.steps]} />
          </div>
        </Container>
      </Section>

      {SHOW_GOOGLE_REVIEWS ? (
        <Section {...marketingSection("portfolio", "reviews")} layout="content" spacing="split">
          <Container>
            <GoogleReviews
              eyebrow="Voices"
              title="What clients say after launch."
              description="Live Google reviews provide the trust layer across portfolio and proof pages."
            />
          </Container>
        </Section>
      ) : null}

      <Section {...marketingSection("portfolio", "faq")} tone="inset">
        <Container width="reading">
          <SectionHeading
            eyebrow="FAQ"
            title="Questions about our work."
            description="Common questions about similar projects, customization, timelines, and support."
            align="center"
          />
          <div className="mt-10">
            <Accordion items={[...PORTFOLIO_LANDING_FAQ]} />
          </div>
        </Container>
      </Section>

      <CTABand
        title={PORTFOLIO_LANDING_CTA.title}
        description={PORTFOLIO_LANDING_CTA.description}
        primary={{ label: PORTFOLIO_LANDING_CTA.primaryCta, href: PORTFOLIO_LANDING_CTA.primaryHref }}
        secondary={{ label: PORTFOLIO_LANDING_CTA.secondaryCta, href: PORTFOLIO_LANDING_CTA.secondaryHref }}
        {...marketingSection("portfolio", "cta")}
      />
    </>
  );
}
