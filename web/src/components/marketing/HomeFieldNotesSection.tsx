"use client";

import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
import { LinkButton } from "@/components/primitives/Button";
import { Card } from "@/components/primitives/Card";
import { MarketingViewportGate } from "@/components/marketing/MarketingViewportGate";
import { MobileMarketingSectionHeader } from "@/components/marketing/mobile/MobileMarketingSectionHeader";
import { Container, Section } from "@/components/primitives/Container";
import { SectionHeading } from "@/components/primitives/SectionHeading";
import { RevealGroup, RevealItem } from "@/components/motion/Motion";
import { BlogCard } from "@/components/sections/BlogCard";
import { BlogCardMobile } from "@/components/sections/BlogCardMobile";
import { HOME_FIELD_NOTES_COPY } from "@/lib/home-conversion-content";
import { homeSection } from "@/lib/homepage-composition";
import { HERO_TITLE_CLASS } from "@/lib/typography";
import type { BlogPost } from "@/lib/content";

type HomeFieldNotesSectionProps = {
  posts: BlogPost[];
  eyebrow?: string;
  title?: string;
  description?: string;
};

function HomeFieldNotesMobile({
  posts,
  eyebrow = HOME_FIELD_NOTES_COPY.eyebrow,
  title = HOME_FIELD_NOTES_COPY.title,
  description = HOME_FIELD_NOTES_COPY.description,
}: HomeFieldNotesSectionProps) {
  return (
    <div className="home-mobile-marketing">
      <MobileMarketingSectionHeader
        eyebrow={eyebrow}
        title={title}
        description={description}
        align="left"
        className="home-mobile-marketing__header--left max-w-none"
      />

      <LinkButton
        href={HOME_FIELD_NOTES_COPY.ctaHref}
        variant="outline"
        className="home-mobile-marketing__cta home-mobile-marketing__cta--outline mt-[var(--home-mobile-marketing-gap-desc-content)]"
      >
        <span className="home-mobile-marketing__cta-inner">
          {HOME_FIELD_NOTES_COPY.ctaLabel}
          <ArrowUpRightIcon className="home-mobile-marketing__cta-icon" aria-hidden />
        </span>
      </LinkButton>

      <RevealGroup className="home-mobile-marketing__stack">
        {posts.map((post) => (
          <RevealItem key={post.slug}>
            <BlogCardMobile post={post} />
          </RevealItem>
        ))}
      </RevealGroup>

      {posts.length === 0 ? (
        <Card className="mt-[var(--home-mobile-marketing-gap-section-stack)] text-center">
          <p className="font-display text-base tracking-tight">No published blog posts yet.</p>
          <p className="mt-2 text-text-muted">Publish your first post in Sanity to show it here.</p>
        </Card>
      ) : null}
    </div>
  );
}

function HomeFieldNotesDesktop({
  posts,
  eyebrow = HOME_FIELD_NOTES_COPY.eyebrow,
  title = HOME_FIELD_NOTES_COPY.title,
  description = HOME_FIELD_NOTES_COPY.description,
}: HomeFieldNotesSectionProps) {
  return (
    <>
      <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
        <SectionHeading eyebrow={eyebrow} title={title} description={description} titleClassName={HERO_TITLE_CLASS} />
        <LinkButton href={HOME_FIELD_NOTES_COPY.ctaHref} variant="outline">
          {HOME_FIELD_NOTES_COPY.ctaLabel} <ArrowUpRightIcon className="size-4" />
        </LinkButton>
      </div>
      <RevealGroup className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" stagger={0.08}>
        {posts.map((post) => (
          <RevealItem key={post.slug}>
            <BlogCard post={post} />
          </RevealItem>
        ))}
      </RevealGroup>
      {posts.length === 0 ? (
        <Card className="mt-8 text-center">
          <p className="font-display text-2xl tracking-tight">No published blog posts yet.</p>
          <p className="mt-2 text-text-muted">Publish your first post in Sanity to show it here.</p>
        </Card>
      ) : null}
    </>
  );
}

export function HomeFieldNotesSection(props: HomeFieldNotesSectionProps) {
  const shell = homeSection("field-notes");

  return (
    <Section {...shell}>
      <Container>
        <MarketingViewportGate
          mobile={<HomeFieldNotesMobile {...props} />}
          desktop={<HomeFieldNotesDesktop {...props} />}
        />
      </Container>
    </Section>
  );
}
