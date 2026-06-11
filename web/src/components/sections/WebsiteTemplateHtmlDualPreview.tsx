"use client";

import { Card } from "@/components/primitives/Card";
import {
  HtmlProfileHeroCarousel,
  type HtmlProfileHeroSlide,
} from "@/components/sections/HtmlProfileHeroCarousel";
import { HTML_DESKTOP_VIEWPORT_WIDTH } from "@/components/shop/WebsiteTemplateHtmlDesktopPreviewFrame";
import { HTML_MOBILE_VIEWPORT_WIDTH } from "@/components/shop/WebsiteTemplateHtmlMobilePreviewFrame";

type WebsiteTemplateHtmlDualPreviewProps = {
  slides: HtmlProfileHeroSlide[];
  emptyFallbackSlide?: HtmlProfileHeroSlide;
};

export function WebsiteTemplateHtmlDesktopPreviewCarousel({
  slides,
  emptyFallbackSlide,
}: WebsiteTemplateHtmlDualPreviewProps) {
  return (
    <div className="min-h-[420px] lg:min-h-[560px]">
      <HtmlProfileHeroCarousel
        slides={slides}
        ctaLabel="View Product"
        emptyFallbackSlide={emptyFallbackSlide}
        previewMode="desktop-scaled"
      />
    </div>
  );
}

export function WebsiteTemplateHtmlDualPreview({
  slides,
  emptyFallbackSlide,
}: WebsiteTemplateHtmlDualPreviewProps) {
  return (
    <div className="space-y-6">
      <Card className="p-5 sm:p-6">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-4">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-text-muted">Desktop Preview</p>
            <h3 className="mt-3 font-display text-2xl tracking-tight">Full-width desktop layout</h3>
            <p className="mt-3 text-sm leading-7 text-text-muted">
              Rendered at a {HTML_DESKTOP_VIEWPORT_WIDTH}px viewport and scaled to fit this panel, cycling through every
              HTML preview template in this category.
            </p>
          </div>
          <div className="lg:col-span-8">
            <WebsiteTemplateHtmlDesktopPreviewCarousel slides={slides} emptyFallbackSlide={emptyFallbackSlide} />
          </div>
        </div>
      </Card>

      <Card className="p-5 sm:p-6">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-start">
          <div className="order-2 lg:order-1 lg:col-span-7">
            <div className="min-h-[420px] lg:min-h-[620px]">
              <HtmlProfileHeroCarousel
                slides={slides}
                ctaLabel="View Product"
                emptyFallbackSlide={emptyFallbackSlide}
                previewMode="mobile-frame"
              />
            </div>
          </div>
          <div className="order-1 lg:order-2 lg:col-span-5">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-text-muted">Mobile Preview</p>
            <h3 className="mt-3 font-display text-2xl tracking-tight">Standard phone viewport</h3>
            <p className="mt-3 text-sm leading-7 text-text-muted">
              Shown inside a {HTML_MOBILE_VIEWPORT_WIDTH}px-wide device frame, auto-rotating through each available HTML
              preview template so responsive breakpoints match real mobile behavior.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
