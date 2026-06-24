"use client";

import { MarketingViewportGate } from "@/components/marketing/MarketingViewportGate";
import { MobileMarketingSectionHeader } from "@/components/marketing/mobile/MobileMarketingSectionHeader";
import {
  WebsiteTemplateHtmlDesktopPreviewBlock,
  WebsiteTemplateHtmlMobilePreviewBlock,
} from "@/components/sections/WebsiteTemplateHtmlDualPreview";
import type { HtmlProfileHeroSlide } from "@/components/sections/HtmlProfileHeroCarousel";
import { Container, Section } from "@/components/primitives/Container";
import { SectionHeading } from "@/components/primitives/SectionHeading";
import { HOME_PREVIEW_COPY } from "@/lib/home-conversion-content";
import type { HomeSectionShellProps } from "@/lib/homepage-composition";
import { HERO_TITLE_CLASS } from "@/lib/typography";

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
  return (
    <>
      <SectionHeading
        eyebrow={HOME_PREVIEW_COPY.eyebrow}
        title={title}
        titleLead={title === HOME_PREVIEW_COPY.title ? HOME_PREVIEW_COPY.titleLead : undefined}
        titleAccent={title === HOME_PREVIEW_COPY.title ? HOME_PREVIEW_COPY.titleAccent : undefined}
        description={description}
        align="center"
        titleClassName={HERO_TITLE_CLASS}
        className="mx-auto max-w-3xl"
      />
      <div className="mt-8 min-w-0 w-full">
        <WebsiteTemplateHtmlDesktopPreviewBlock slides={slides} emptyFallbackSlide={emptyFallbackSlide} posterFirst={false} />
      </div>
      <div className="mt-8 border-t border-border pt-8">
        <WebsiteTemplateHtmlMobilePreviewBlock
          slides={slides}
          emptyFallbackSlide={emptyFallbackSlide}
          reverseLayout
          autoPlay={false}
        />
      </div>
    </>
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
