"use client";

import { MarketingViewportGate } from "@/components/marketing/MarketingViewportGate";
import { MobileMarketingSectionHeader } from "@/components/marketing/mobile/MobileMarketingSectionHeader";
import {
  WebsiteTemplateHtmlDesktopPreviewBlock,
  WebsiteTemplateHtmlMobilePreviewBlock,
} from "@/components/sections/WebsiteTemplateHtmlDualPreview";
import { HtmlProfileHeroCarousel } from "@/components/sections/HtmlProfileHeroCarousel";
import type { HtmlProfileHeroSlide } from "@/components/sections/HtmlProfileHeroCarousel";
import { Container, Section } from "@/components/primitives/Container";
import { SectionHeading } from "@/components/primitives/SectionHeading";
import { HOME_PREVIEW_COPY } from "@/lib/home-conversion-content";
import type { HomeSectionShellProps } from "@/lib/homepage-composition";
import { HERO_TITLE_CLASS } from "@/lib/typography";

const EXPERIENCE_MOBILE_PREVIEW_MAX_HEIGHT = 480;

type HomeHtmlPreviewSectionProps = {
  slides: HtmlProfileHeroSlide[];
  emptyFallbackSlide?: HtmlProfileHeroSlide;
  sectionShell?: Partial<HomeSectionShellProps>;
  title: string;
  description: string;
};

function HomeHtmlPreviewMobile({
  slides,
  emptyFallbackSlide,
  title,
  description,
}: Omit<HomeHtmlPreviewSectionProps, "sectionShell">) {
  return (
    <div className="home-mobile-marketing">
      <MobileMarketingSectionHeader
        eyebrow={HOME_PREVIEW_COPY.eyebrow}
        titleLead={title === HOME_PREVIEW_COPY.title ? HOME_PREVIEW_COPY.titleLead : undefined}
        titleAccent={title === HOME_PREVIEW_COPY.title ? HOME_PREVIEW_COPY.titleAccent : undefined}
        title={title}
        description={description}
      />

      <div className="home-mobile-marketing__preview-stack">
        <div className="home-mobile-marketing__preview-panel home-mobile-marketing__preview-panel--desktop">
          <WebsiteTemplateHtmlDesktopPreviewBlock
            slides={slides}
            emptyFallbackSlide={emptyFallbackSlide}
            posterFirst={false}
          />
        </div>
        <div className="home-mobile-marketing__preview-panel">
          <WebsiteTemplateHtmlMobilePreviewBlock
            slides={slides}
            emptyFallbackSlide={emptyFallbackSlide}
            reverseLayout={false}
            autoPlay={false}
          />
        </div>
      </div>
    </div>
  );
}

function HomeHtmlPreviewDesktop({
  slides,
  emptyFallbackSlide,
  title,
  description,
}: Omit<HomeHtmlPreviewSectionProps, "sectionShell">) {
  const useAccentTitle = title === HOME_PREVIEW_COPY.title;

  return (
    <div className="home-desktop-marketing__experience">
      <div className="home-desktop-marketing__experience-header">
        <SectionHeading
          eyebrow={HOME_PREVIEW_COPY.eyebrow}
          title={useAccentTitle ? undefined : title}
          titleLead={useAccentTitle ? HOME_PREVIEW_COPY.titleLead : undefined}
          titleAccent={useAccentTitle ? HOME_PREVIEW_COPY.titleAccent : undefined}
          description={description}
          titleClassName={HERO_TITLE_CLASS}
          className="home-desktop-marketing__experience-heading"
        />
      </div>

      <div className="home-desktop-marketing__experience-previews">
        <div
          id="home-html-preview-desktop"
          className="home-desktop-marketing__experience-panel home-desktop-marketing__experience-panel--desktop"
        >
          <p className="home-desktop-marketing__experience-preview-label">Desktop preview</p>
          <HtmlProfileHeroCarousel
            slides={slides}
            emptyFallbackSlide={emptyFallbackSlide}
            ctaLabel="View Product"
            previewMode="desktop-scaled"
            fillHeight
            desktopPreviewFit="cover"
            desktopPreviewVerticalAlign="top"
            transitionMode="fade"
            autoPlay={false}
            posterFirst={false}
            className="home-desktop-marketing__experience-carousel home-desktop-marketing__experience-carousel--desktop"
          />
        </div>

        <div
          id="home-html-preview-mobile"
          className="home-desktop-marketing__experience-panel home-desktop-marketing__experience-panel--mobile"
        >
          <p className="home-desktop-marketing__experience-preview-label">Mobile preview</p>
          <HtmlProfileHeroCarousel
            slides={slides}
            emptyFallbackSlide={emptyFallbackSlide}
            ctaLabel="View Product"
            previewMode="mobile-frame"
            mobileFrameMinHeightClass="min-h-0"
            mobilePreviewMaxHeight={EXPERIENCE_MOBILE_PREVIEW_MAX_HEIGHT}
            mobilePreviewShowViewportLabel={false}
            autoPlay={false}
            className="home-desktop-marketing__experience-carousel home-desktop-marketing__experience-carousel--mobile"
          />
        </div>
      </div>
    </div>
  );
}

export function HomeHtmlPreviewSection({
  slides,
  emptyFallbackSlide,
  sectionShell,
  title,
  description,
}: HomeHtmlPreviewSectionProps) {
  return (
    <Section
      size={sectionShell?.size ?? "standard"}
      layout={sectionShell?.layout ?? "content"}
      tone={sectionShell?.tone}
      spacing={sectionShell?.spacing ?? "default"}
      className="overflow-x-hidden [overflow-anchor:none]"
    >
      <Container className="min-w-0">
        <MarketingViewportGate
          mobile={
            <HomeHtmlPreviewMobile
              slides={slides}
              emptyFallbackSlide={emptyFallbackSlide}
              title={title}
              description={description}
            />
          }
          desktop={
            <HomeHtmlPreviewDesktop
              slides={slides}
              emptyFallbackSlide={emptyFallbackSlide}
              title={title}
              description={description}
            />
          }
        />
      </Container>
    </Section>
  );
}
