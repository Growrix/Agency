"use client";

import { MarketingViewportGate } from "@/components/marketing/MarketingViewportGate";
import { MobileMarketingSectionHeader } from "@/components/marketing/mobile/MobileMarketingSectionHeader";
import {
  WebsiteTemplateHtmlDesktopPreviewBlock,
  WebsiteTemplateHtmlMobilePreviewBlock,
} from "@/components/sections/WebsiteTemplateHtmlDualPreview";
import type { HtmlProfileHeroSlide } from "@/components/sections/HtmlProfileHeroCarousel";
import { Container, Section } from "@/components/primitives/Container";
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
      <MobileMarketingSectionHeader eyebrow="See every experience" title={title} description={description} />

      <div className="home-mobile-marketing__stack">
        <div className="home-mobile-marketing__path-card">
          <WebsiteTemplateHtmlDesktopPreviewBlock
            slides={slides}
            emptyFallbackSlide={emptyFallbackSlide}
            posterFirst={false}
          />
        </div>
        <div className="home-mobile-marketing__path-card">
          <WebsiteTemplateHtmlMobilePreviewBlock
            slides={slides}
            emptyFallbackSlide={emptyFallbackSlide}
            reverseLayout
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
      <div className="flex flex-col gap-3 text-center">
        <h2 className={HERO_TITLE_CLASS}>{title}</h2>
        <p className="mx-auto max-w-3xl text-base leading-7 text-text-muted">{description}</p>
      </div>
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
      className="overflow-x-hidden"
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
