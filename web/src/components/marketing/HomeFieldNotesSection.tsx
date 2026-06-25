"use client";

import { ArrowUpRightIcon, EyeIcon } from "@heroicons/react/24/outline";
import { LinkButton } from "@/components/primitives/Button";
import { Card } from "@/components/primitives/Card";
import { MarketingViewportGate } from "@/components/marketing/MarketingViewportGate";
import { HomeDesktopSectionRail } from "@/components/marketing/desktop/HomeDesktopSectionRail";
import { HomeDesktopSplitSection } from "@/components/marketing/desktop/HomeDesktopSplitSection";
import { FeaturedBlogPostsMobile } from "@/components/marketing/mobile/FeaturedBlogPostsMobile";
import { MobileMarketingSectionHeader } from "@/components/marketing/mobile/MobileMarketingSectionHeader";
import { Container, Section } from "@/components/primitives/Container";
import { RevealGroup, RevealItem } from "@/components/motion/Motion";
import { BlogCard } from "@/components/sections/BlogCard";
import { HOME_FIELD_NOTES_COPY } from "@/lib/home-conversion-content";
import { homeSection } from "@/lib/homepage-composition";
import type { BlogPost } from "@/lib/content";

type HomeFieldNotesSectionProps = {
  posts: BlogPost[];
  eyebrow?: string;
  title?: string;
  description?: string;
};

function resolveBlogCopy(props: HomeFieldNotesSectionProps) {
  const title = props.title ?? HOME_FIELD_NOTES_COPY.title;
  const useAccentTitle = title === HOME_FIELD_NOTES_COPY.title;

  return {
    eyebrow: props.eyebrow ?? HOME_FIELD_NOTES_COPY.eyebrow,
    title,
    titleLead: useAccentTitle ? HOME_FIELD_NOTES_COPY.titleLead : undefined,
    titleAccent: useAccentTitle ? HOME_FIELD_NOTES_COPY.titleAccent : undefined,
    description: props.description ?? HOME_FIELD_NOTES_COPY.description,
    ctaHref: HOME_FIELD_NOTES_COPY.ctaHref,
    ctaLabel: HOME_FIELD_NOTES_COPY.ctaLabel,
  };
}

function HomeFieldNotesMobile(props: HomeFieldNotesSectionProps) {
  const { posts } = props;
  const copy = resolveBlogCopy(props);

  return (
    <div className="home-mobile-marketing">
      <MobileMarketingSectionHeader
        eyebrow={copy.eyebrow}
        titleLead={copy.titleLead}
        titleAccent={copy.titleAccent}
        title={copy.titleLead && copy.titleAccent ? undefined : copy.title}
        description={copy.description}
      />

      <div className="home-mobile-marketing__cta-row home-mobile-marketing__cta-row--center">
        <LinkButton href={copy.ctaHref} className="home-mobile-marketing__cta">
          <span className="home-mobile-marketing__cta-inner">
            <EyeIcon className="home-mobile-marketing__cta-icon" aria-hidden />
            {copy.ctaLabel}
            <ArrowUpRightIcon className="home-mobile-marketing__cta-icon" aria-hidden />
          </span>
        </LinkButton>
      </div>

      {posts.length > 0 ? (
        <FeaturedBlogPostsMobile posts={posts} />
      ) : (
        <Card className="mt-(--home-mobile-marketing-gap-section-stack) text-center">
          <p className="font-display text-base tracking-tight">No published blog posts yet.</p>
          <p className="mt-2 text-text-muted">Publish your first post in Sanity to show it here.</p>
        </Card>
      )}
    </div>
  );
}

function HomeFieldNotesDesktop(props: HomeFieldNotesSectionProps) {
  const { posts } = props;
  const copy = resolveBlogCopy(props);

  return (
    <HomeDesktopSplitSection
      rail={
        <HomeDesktopSectionRail
          eyebrow={copy.eyebrow}
          title={copy.titleLead && copy.titleAccent ? undefined : copy.title}
          titleLead={copy.titleLead}
          titleAccent={copy.titleAccent}
          description={copy.description}
          ctaHref={copy.ctaHref}
          ctaLabel={copy.ctaLabel}
        />
      }
      content={
        posts.length > 0 ? (
          <RevealGroup className="home-desktop-marketing__product-grid" stagger={0.07}>
            {posts.map((post) => (
              <RevealItem key={post.slug} className="h-full min-w-0">
                <BlogCard post={post} compact className="home-desktop-marketing__blog-card h-full" />
              </RevealItem>
            ))}
          </RevealGroup>
        ) : (
          <Card className="text-center">
            <p className="font-display text-xl tracking-tight">No published blog posts yet.</p>
            <p className="mt-2 text-text-muted">Publish your first post in Sanity to show it here.</p>
          </Card>
        )
      }
    />
  );
}

export function HomeFieldNotesSection(props: HomeFieldNotesSectionProps) {
  const shell = homeSection("field-notes");

  return (
    <Section {...shell} className="overflow-x-hidden">
      <Container className="min-w-0">
        <MarketingViewportGate
          mobile={<HomeFieldNotesMobile {...props} />}
          desktop={<HomeFieldNotesDesktop {...props} />}
        />
      </Container>
    </Section>
  );
}
