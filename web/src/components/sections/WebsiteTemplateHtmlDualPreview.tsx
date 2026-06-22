"use client";

import {
  ArrowPathIcon,
  BoltIcon,
  CheckIcon,
  CodeBracketSquareIcon,
  ComputerDesktopIcon,
  CursorArrowRaysIcon,
  GlobeAltIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import { Card } from "@/components/primitives/Card";
import {
  HtmlProfileHeroCarousel,
  type HtmlProfileHeroSlide,
} from "@/components/sections/HtmlProfileHeroCarousel";
import { WebsiteTemplateHtmlMobilePreviewMarketing } from "@/components/sections/WebsiteTemplateHtmlPreviewMarketing";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Motion";
import { cn } from "@/lib/utils";
import { WEBSITE_TEMPLATE_PREVIEW } from "@/lib/preview-terminology";
import { HTML_DESKTOP_VIEWPORT_WIDTH } from "@/components/shop/WebsiteTemplateHtmlDesktopPreviewFrame";

type WebsiteTemplateHtmlDualPreviewProps = {
  slides: HtmlProfileHeroSlide[];
  emptyFallbackSlide?: HtmlProfileHeroSlide;
};

const MOBILE_PREVIEW_MAX_FRAME_HEIGHT = 480;

const DESKTOP_BENEFITS = [
  "Conversion-ready layout — hero, services, proof, and contact in place",
  WEBSITE_TEMPLATE_PREVIEW.livePreviewAtFullWidth,
] as const;

const HERO_PREVIEW_HIGHLIGHTS = [
  { icon: CodeBracketSquareIcon, label: WEBSITE_TEMPLATE_PREVIEW.livePreviewChip, hint: WEBSITE_TEMPLATE_PREVIEW.livePreviewChipHint },
  { icon: ArrowPathIcon, label: "Carousel", hint: "Manual + optional autoplay" },
  { icon: CursorArrowRaysIcon, label: "Scrollable", hint: "Explore every section" },
  { icon: ShieldCheckIcon, label: "Buy-ready", hint: "Links to checkout" },
] as const;

export function WebsiteTemplateHtmlHeroPreviewFooter({ previewCount }: { previewCount: number }) {
  return (
    <div className="mt-4 shrink-0 border-t border-border pt-4">
      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-muted">Preview highlights</p>
      <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
        {HERO_PREVIEW_HIGHLIGHTS.map((item, index) => {
          const Icon = item.icon;
          const hint = item.label === "Carousel" && previewCount > 0
            ? `${previewCount} template${previewCount === 1 ? "" : "s"}`
            : item.hint;

          return (
            <motion.div
              key={item.label}
              className="rounded-md border border-border/80 bg-surface/70 px-2.5 py-2.5"
              initial={{ opacity: 0, y: 6 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: index * 0.05 }}
            >
              <Icon className="size-4 text-primary" aria-hidden />
              <p className="mt-1.5 text-xs font-semibold leading-5">{item.label}</p>
              <p className="text-[11px] leading-4 text-text-muted">{hint}</p>
            </motion.div>
          );
        })}
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-text-muted">
        <span className="inline-flex items-center gap-1.5">
          <BoltIcon className="size-3.5 text-primary" aria-hidden />
          No mockups or static screenshots
        </span>
        <span className="inline-flex items-center gap-1.5">
          <GlobeAltIcon className="size-3.5 text-primary" aria-hidden />
          Desktop + mobile previews below
        </span>
      </div>
    </div>
  );
}

type WebsiteTemplateHtmlDesktopPreviewCarouselProps = WebsiteTemplateHtmlDualPreviewProps & {
  className?: string;
  minHeightClass?: string;
  fillHeight?: boolean;
  desktopPreviewFit?: "width" | "cover";
  autoPlay?: boolean;
  posterFirst?: boolean;
};

export function WebsiteTemplateHtmlDesktopPreviewCarousel({
  slides,
  emptyFallbackSlide,
  className,
  minHeightClass = "min-h-[420px] lg:min-h-[560px]",
  fillHeight = false,
  desktopPreviewFit = "width",
  autoPlay = false,
  posterFirst = false,
}: WebsiteTemplateHtmlDesktopPreviewCarouselProps) {
  return (
    <div className={cn(minHeightClass, fillHeight && "flex min-h-0 flex-1 flex-col", className)}>
      <HtmlProfileHeroCarousel
        slides={slides}
        ctaLabel="View Product"
        emptyFallbackSlide={emptyFallbackSlide}
        previewMode="desktop-scaled"
        fillHeight={fillHeight}
        desktopPreviewFit={desktopPreviewFit}
        autoPlay={autoPlay}
        posterFirst={posterFirst}
      />
    </div>
  );
}

export function WebsiteTemplateHtmlDesktopPreviewBlock({
  slides,
  emptyFallbackSlide,
  posterFirst = false,
}: WebsiteTemplateHtmlDualPreviewProps & { posterFirst?: boolean }) {
  return (
    <Card className="min-w-0 overflow-hidden p-5 sm:p-6">
      <div className="grid min-w-0 gap-6 lg:grid-cols-12 lg:items-start">
        <div className="min-w-0 self-start lg:col-span-4 lg:sticky lg:top-24">
          <Reveal>
            <div className="flex items-center gap-2">
              <ComputerDesktopIcon className="size-4 text-primary" aria-hidden />
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-text-muted">Desktop Preview</p>
            </div>
            <h3 className="mt-2.5 font-display text-xl sm:text-2xl tracking-tight text-balance">
              See the full desktop experience before you commit
            </h3>
            <p className="mt-2.5 text-sm leading-6 text-text-muted">
              {WEBSITE_TEMPLATE_PREVIEW.scrollLivePreviewCopy(HTML_DESKTOP_VIEWPORT_WIDTH)}
            </p>
          </Reveal>

          <RevealGroup className="mt-3.5 space-y-2" stagger={0.05}>
            {DESKTOP_BENEFITS.map((item) => (
              <RevealItem key={item}>
                <div className="flex items-start gap-2">
                  <CheckIcon className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
                  <p className="text-sm leading-6 text-text-muted">{item}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal className="mt-3.5">
            <p className="flex items-start gap-2 text-sm leading-6 text-text-muted">
              <ShieldCheckIcon className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
              <span>
                <span className="font-display text-text">Preview equals product.</span> Choose template-only,
                branded setup, or done-for-you launch.
              </span>
            </p>
          </Reveal>
        </div>

        <div className="min-w-0 lg:col-span-8">
          <WebsiteTemplateHtmlDesktopPreviewCarousel
            slides={slides}
            emptyFallbackSlide={emptyFallbackSlide}
            minHeightClass="min-h-[280px] sm:min-h-[320px] lg:min-h-[360px]"
            posterFirst={posterFirst}
          />
        </div>
      </div>
    </Card>
  );
}

export function WebsiteTemplateHtmlMobilePreviewBlock({
  slides,
  emptyFallbackSlide,
  reverseLayout = false,
  autoPlay = false,
}: WebsiteTemplateHtmlDualPreviewProps & {
  reverseLayout?: boolean;
  autoPlay?: boolean;
}) {
  return (
    <Card className="overflow-hidden p-5 sm:p-6">
      <div className="grid gap-6 lg:grid-cols-12 lg:items-start">
        <div className={cn("min-w-0 self-start lg:col-span-5 lg:sticky lg:top-24", reverseLayout && "lg:order-2")}>
          <WebsiteTemplateHtmlMobilePreviewMarketing />
        </div>

        <div className={cn("min-w-0 lg:col-span-7", reverseLayout && "lg:order-1")}>
          <HtmlProfileHeroCarousel
            slides={slides}
            ctaLabel="View Product"
            emptyFallbackSlide={emptyFallbackSlide}
            previewMode="mobile-frame"
            mobileFrameMinHeightClass="min-h-0"
            mobilePreviewMaxHeight={MOBILE_PREVIEW_MAX_FRAME_HEIGHT}
            mobilePreviewShowViewportLabel={false}
            autoPlay={autoPlay}
          />
        </div>
      </div>
    </Card>
  );
}

export function WebsiteTemplateHtmlDualPreview({
  slides,
  emptyFallbackSlide,
}: WebsiteTemplateHtmlDualPreviewProps) {
  return (
    <div className="w-full min-w-0 space-y-6">
      <WebsiteTemplateHtmlDesktopPreviewBlock slides={slides} emptyFallbackSlide={emptyFallbackSlide} />
      <WebsiteTemplateHtmlMobilePreviewBlock slides={slides} emptyFallbackSlide={emptyFallbackSlide} />
    </div>
  );
}
