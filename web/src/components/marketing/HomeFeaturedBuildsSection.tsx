"use client";

import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
import { LinkButton } from "@/components/primitives/Button";
import { MarketingViewportGate } from "@/components/marketing/MarketingViewportGate";
import { MobileMarketingSectionHeader } from "@/components/marketing/mobile/MobileMarketingSectionHeader";
import { Container, Section } from "@/components/primitives/Container";
import { SectionHeading } from "@/components/primitives/SectionHeading";
import { RevealGroup, RevealItem } from "@/components/motion/Motion";
import { PortfolioCard } from "@/components/sections/PortfolioCard";
import { HOME_CASE_STUDIES_COPY } from "@/lib/home-conversion-content";
import { homeSection } from "@/lib/homepage-composition";
import { HERO_TITLE_CLASS } from "@/lib/typography";
import type { PublicPortfolioRecord } from "@/server/domain/catalog";

type HomeFeaturedBuildsSectionProps = {
  projects: PublicPortfolioRecord[];
  title?: string;
  description?: string;
};

function HomeFeaturedBuildsMobile({ projects, title, description }: HomeFeaturedBuildsSectionProps) {
  return (
    <div className="home-mobile-marketing">
      <MobileMarketingSectionHeader
        eyebrow={HOME_CASE_STUDIES_COPY.eyebrow}
        title={title ?? HOME_CASE_STUDIES_COPY.title}
        description={description ?? HOME_CASE_STUDIES_COPY.description}
        align="left"
        className="home-mobile-marketing__header--left max-w-none"
      />

      <RevealGroup className="home-mobile-marketing__stack">
        {projects.map((project) => (
          <RevealItem key={project.slug}>
            <PortfolioCard project={project} />
          </RevealItem>
        ))}
      </RevealGroup>

      <LinkButton href="/portfolio" variant="outline" className="home-mobile-marketing__cta home-mobile-marketing__cta--outline mx-auto mt-[var(--home-mobile-marketing-gap-section-stack)]">
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
