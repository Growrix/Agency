import { Container, Section } from "@/components/primitives/Container";
import {
  WebsiteTemplateHtmlDesktopPreviewBlock,
  WebsiteTemplateHtmlMobilePreviewBlock,
} from "@/components/sections/WebsiteTemplateHtmlDualPreview";
import type { HtmlProfileHeroSlide } from "@/components/sections/HtmlProfileHeroCarousel";
import type { HomeSectionShellProps } from "@/lib/homepage-composition";
import { WEBSITE_TEMPLATE_PREVIEW } from "@/lib/preview-terminology";

type WebsiteTemplateHtmlPreviewShowcaseSectionsProps = {
  slides: HtmlProfileHeroSlide[];
  emptyFallbackSlide?: HtmlProfileHeroSlide;
  reverseMobileLayout?: boolean;
  showMobileSectionDivider?: boolean;
  showDesktopSection?: boolean;
  autoPlayMobileCarousel?: boolean;
  sectionTitleClassName?: string;
  sectionShell?: Partial<HomeSectionShellProps>;
  title?: string;
  description?: string;
};

export function WebsiteTemplateHtmlPreviewShowcaseSections({
  slides,
  emptyFallbackSlide,
  reverseMobileLayout = false,
  showMobileSectionDivider = true,
  showDesktopSection = true,
  autoPlayMobileCarousel = true,
  sectionTitleClassName = "font-display text-3xl sm:text-4xl tracking-tight text-balance",
  sectionShell,
  title = "Desktop and mobile preview, side by side",
  description = WEBSITE_TEMPLATE_PREVIEW.showcaseDescription,
}: WebsiteTemplateHtmlPreviewShowcaseSectionsProps) {
  return (
    <Section
      size={sectionShell?.size ?? "standard"}
      layout={sectionShell?.layout ?? "content"}
      tone={sectionShell?.tone}
      spacing={sectionShell?.spacing ?? "default"}
      className="overflow-x-hidden"
    >
      <Container className="min-w-0">
        {showDesktopSection ? (
          <>
            <div className="flex flex-col gap-3 text-center">
              <h2 className={sectionTitleClassName}>
                {title}
              </h2>
              <p className="mx-auto max-w-3xl text-base leading-7 text-text-muted">
                {description}
              </p>
            </div>
            <div className="mt-8 min-w-0 w-full">
              <WebsiteTemplateHtmlDesktopPreviewBlock
                slides={slides}
                emptyFallbackSlide={emptyFallbackSlide}
              />
            </div>
          </>
        ) : null}

        <div className={showDesktopSection && showMobileSectionDivider ? "mt-8 border-t border-border pt-8" : "mt-8"}>
          <WebsiteTemplateHtmlMobilePreviewBlock
            slides={slides}
            emptyFallbackSlide={emptyFallbackSlide}
            reverseLayout={reverseMobileLayout}
            autoPlay={autoPlayMobileCarousel}
          />
        </div>
      </Container>
    </Section>
  );
}
