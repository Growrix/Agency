import { Container, Section } from "@/components/primitives/Container";
import {
  WebsiteTemplateHtmlDesktopPreviewBlock,
  WebsiteTemplateHtmlMobilePreviewBlock,
} from "@/components/sections/WebsiteTemplateHtmlDualPreview";
import type { HtmlProfileHeroSlide } from "@/components/sections/HtmlProfileHeroCarousel";

type WebsiteTemplateHtmlPreviewShowcaseSectionsProps = {
  slides: HtmlProfileHeroSlide[];
  emptyFallbackSlide?: HtmlProfileHeroSlide;
  reverseMobileLayout?: boolean;
  showMobileSectionDivider?: boolean;
  showDesktopSection?: boolean;
};

export function WebsiteTemplateHtmlPreviewShowcaseSections({
  slides,
  emptyFallbackSlide,
  reverseMobileLayout = false,
  showMobileSectionDivider = true,
  showDesktopSection = true,
}: WebsiteTemplateHtmlPreviewShowcaseSectionsProps) {
  return (
    <>
      {showDesktopSection ? (
        <Section className="overflow-x-hidden pt-10 pb-8 sm:pt-14 sm:pb-10">
          <Container className="min-w-0">
            <div className="flex flex-col gap-3 text-center">
              <h2 className="font-display text-3xl sm:text-4xl tracking-tight text-balance">
                Desktop and mobile preview, side by side
              </h2>
              <p className="mx-auto max-w-3xl text-base leading-7 text-text-muted">
                This section is preview-first by design, so users can inspect the same HTML template in desktop and
                mobile form before moving into purchase or customization.
              </p>
            </div>

            <div className="mt-8 min-w-0 w-full">
              <WebsiteTemplateHtmlDesktopPreviewBlock
                slides={slides}
                emptyFallbackSlide={emptyFallbackSlide}
              />
            </div>
          </Container>
        </Section>
      ) : null}

      <Section
        className={
          showMobileSectionDivider
            ? "overflow-x-hidden border-t border-border py-10 sm:py-12"
            : "overflow-x-hidden py-10 sm:py-12"
        }
      >
        <Container>
          <WebsiteTemplateHtmlMobilePreviewBlock
            slides={slides}
            emptyFallbackSlide={emptyFallbackSlide}
            reverseLayout={reverseMobileLayout}
          />
        </Container>
      </Section>
    </>
  );
}
