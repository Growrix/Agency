"use client";

import { useMemo, useState } from "react";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
import { LinkButton } from "@/components/primitives/Button";
import { MarketingViewportGate } from "@/components/marketing/MarketingViewportGate";
import { MobileMarketingSectionHeader } from "@/components/marketing/mobile/MobileMarketingSectionHeader";
import { MobileMarketingTabs } from "@/components/marketing/mobile/MobileMarketingTabs";
import { Container, Section } from "@/components/primitives/Container";
import { SectionHeading } from "@/components/primitives/SectionHeading";
import { RevealGroup, RevealItem } from "@/components/motion/Motion";
import { PortfolioCard } from "@/components/sections/PortfolioCard";
import { PortfolioCardMobile } from "@/components/sections/PortfolioCardMobile";
import { HOME_CASE_STUDIES_COPY, HOME_CASE_STUDY_TABS } from "@/lib/home-conversion-content";
import { homeSection } from "@/lib/homepage-composition";
import { HERO_TITLE_CLASS } from "@/lib/typography";
import type { PublicPortfolioRecord } from "@/server/domain/catalog";

type HomeFeaturedBuildsSectionProps = {
  projects: PublicPortfolioRecord[];
  title?: string;
  description?: string;
};

function HomeFeaturedBuildsMobile({ projects, title, description }: HomeFeaturedBuildsSectionProps) {
  const [activeTabId, setActiveTabId] = useState<string>(HOME_CASE_STUDY_TABS[0].id);
  const websiteProjects = useMemo(
    () => projects.filter((project) => project.service === "websites"),
    [projects],
  );
  const visibleProjects = activeTabId === "website-projects" ? websiteProjects : projects;
  const displayTitle = title ?? HOME_CASE_STUDIES_COPY.title;

  return (
    <div className="home-mobile-marketing">
      <MobileMarketingSectionHeader
        eyebrow={HOME_CASE_STUDIES_COPY.eyebrow}
        titleLead={displayTitle === HOME_CASE_STUDIES_COPY.title ? HOME_CASE_STUDIES_COPY.titleLead : undefined}
        titleAccent={displayTitle === HOME_CASE_STUDIES_COPY.title ? HOME_CASE_STUDIES_COPY.titleAccent : undefined}
        title={displayTitle}
        description={description ?? HOME_CASE_STUDIES_COPY.description}
        align="left"
        className="home-mobile-marketing__header--left max-w-none"
      />

      <MobileMarketingTabs
        tabs={HOME_CASE_STUDY_TABS.map((tab) => ({ id: tab.id, label: tab.label }))}
        activeTabId={activeTabId}
        onTabChange={setActiveTabId}
        ariaLabel="Case study categories"
        variant="segmented"
        className="home-mobile-marketing__case-tabs"
      />

      {activeTabId === "about-product" ? (
        <div className="home-mobile-marketing__path-card mt-[var(--home-mobile-marketing-gap-section-stack)]">
          <p className="home-mobile-marketing__path-card-title">Portfolio as a product</p>
          <p className="home-mobile-marketing__path-card-description">
            Every case study documents a launch-ready system with measurable outcomes — the same quality bar we ship for
            product buyers and service clients.
          </p>
          <LinkButton href="/portfolio" className="home-mobile-marketing__path-card-cta mt-4">
            Explore the full portfolio
          </LinkButton>
        </div>
      ) : (
        <RevealGroup className="home-mobile-marketing__stack">
          {visibleProjects.map((project) => (
            <RevealItem key={project.slug}>
              <PortfolioCardMobile project={project} />
            </RevealItem>
          ))}
        </RevealGroup>
      )}

      <LinkButton
        href="/portfolio"
        variant="outline"
        className="home-mobile-marketing__cta home-mobile-marketing__cta--outline mx-auto mt-[var(--home-mobile-marketing-gap-section-stack)]"
      >
        <span className="home-mobile-marketing__cta-inner">
          See all projects
          <ArrowUpRightIcon className="home-mobile-marketing__cta-icon" aria-hidden />
        </span>
      </LinkButton>
    </div>
  );
}

function HomeFeaturedBuildsDesktop({ projects, title, description }: HomeFeaturedBuildsSectionProps) {
  return (
    <>
      <SectionHeading
        eyebrow={HOME_CASE_STUDIES_COPY.eyebrow}
        title={title ?? HOME_CASE_STUDIES_COPY.title}
        description={description ?? HOME_CASE_STUDIES_COPY.description}
        titleClassName={HERO_TITLE_CLASS}
      />
      <RevealGroup className="mt-8 grid auto-rows-fr gap-4 sm:mt-10 sm:gap-5 lg:grid-cols-3" stagger={0.08}>
        {projects.map((project) => (
          <RevealItem key={project.slug} className="h-full">
            <PortfolioCard project={project} />
          </RevealItem>
        ))}
      </RevealGroup>
      <div className="mt-8 flex justify-center">
        <LinkButton href="/portfolio" variant="outline">
          See all projects
        </LinkButton>
      </div>
    </>
  );
}

export function HomeFeaturedBuildsSection(props: HomeFeaturedBuildsSectionProps) {
  const shell = homeSection("featured-builds");

  return (
    <Section {...shell}>
      <Container>
        <MarketingViewportGate
          mobile={<HomeFeaturedBuildsMobile {...props} />}
          desktop={<HomeFeaturedBuildsDesktop {...props} />}
        />
      </Container>
    </Section>
  );
}
