"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export const HTML_MOBILE_VIEWPORT_WIDTH = 390;
export const HTML_MOBILE_VIEWPORT_HEIGHT = 844;

/** Full phone chrome width including horizontal padding (p-2.5). */
export const HTML_MOBILE_FRAME_WIDTH = HTML_MOBILE_VIEWPORT_WIDTH + 20;
/** Full phone chrome height including notch, home bar, and padding. */
export const HTML_MOBILE_FRAME_HEIGHT = HTML_MOBILE_VIEWPORT_HEIGHT + 52;

type WebsiteTemplateHtmlMobilePreviewFrameProps = {
  previewUrl?: string;
  posterImage?: { src: string; alt: string };
  title: string;
  className?: string;
  /** Scales the device down so the frame fits this max height (px). Omit for native 390×844 frame height. */
  maxFrameHeight?: number;
  /** Vertical alignment when the scaled frame is shorter than its container. */
  contentAlign?: "center" | "start";
  showViewportLabel?: boolean;
  iframeLoading?: "lazy" | "eager";
};

function MobilePreviewScreenContent({
  posterImage,
  previewUrl,
  title,
  iframeLoading,
}: {
  posterImage?: { src: string; alt: string };
  previewUrl?: string;
  title: string;
  iframeLoading: "lazy" | "eager";
}) {
  const screenStyle = {
    width: HTML_MOBILE_VIEWPORT_WIDTH,
    height: HTML_MOBILE_VIEWPORT_HEIGHT,
  };

  if (posterImage) {
    return (
      // eslint-disable-next-line @next/next/no-img-element -- poster must mirror iframe box model inside scale transform
      <img
        src={posterImage.src}
        alt={posterImage.alt}
        width={HTML_MOBILE_VIEWPORT_WIDTH}
        height={HTML_MOBILE_VIEWPORT_HEIGHT}
        className="block max-h-none max-w-none border-0 bg-surface"
        style={screenStyle}
        decoding="async"
      />
    );
  }

  if (previewUrl) {
    return (
      <iframe
        src={previewUrl}
        title={title}
        width={HTML_MOBILE_VIEWPORT_WIDTH}
        height={HTML_MOBILE_VIEWPORT_HEIGHT}
        className="block border-0 bg-surface"
        style={screenStyle}
        loading={iframeLoading}
        tabIndex={-1}
        referrerPolicy="strict-origin-when-cross-origin"
      />
    );
  }

  return (
    <div
      className="flex items-center justify-center bg-inset text-xs text-text-muted"
      style={screenStyle}
    >
      Preview unavailable
    </div>
  );
}

export function WebsiteTemplateHtmlMobilePreviewFrame({
  previewUrl,
  posterImage,
  title,
  className,
  maxFrameHeight,
  contentAlign = "center",
  showViewportLabel = true,
  iframeLoading = "lazy",
}: WebsiteTemplateHtmlMobilePreviewFrameProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const heightBudget = maxFrameHeight ?? HTML_MOBILE_FRAME_HEIGHT;

  const updateScale = useCallback(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    const containerWidth = container.clientWidth;
    if (containerWidth <= 0) {
      return;
    }

    const widthScale = containerWidth / HTML_MOBILE_FRAME_WIDTH;
    const heightScale = heightBudget / HTML_MOBILE_FRAME_HEIGHT;
    const nextScale = Math.min(1, widthScale, heightScale);
    if (nextScale <= 0) {
      return;
    }

    setScale(nextScale);
  }, [heightBudget]);

  useEffect(() => {
    updateScale();

    const container = containerRef.current;
    if (!container) {
      return;
    }

    const observer = new ResizeObserver(updateScale);
    observer.observe(container);

    const rafId = window.requestAnimationFrame(() => {
      updateScale();
    });

    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(rafId);
    };
  }, [updateScale]);

  const scaledHeight = HTML_MOBILE_FRAME_HEIGHT * scale;

  return (
    <div
      ref={containerRef}
      className={cn(
        "w-full min-w-0 overflow-hidden",
        contentAlign === "start" && "h-full",
        className,
      )}
    >
      <div
        className={cn(
          "flex w-full",
          contentAlign === "start" ? "h-full items-start justify-center" : "justify-center",
        )}
        style={contentAlign === "center" ? { height: scaledHeight } : undefined}
      >
        <div
          className="origin-top"
          style={{
            width: HTML_MOBILE_FRAME_WIDTH,
            transform: `scale(${scale})`,
          }}
        >
          <div className="preview-device-chrome rounded-[2.75rem] border border-border bg-contrast p-2.5 shadow-(--shadow-2)">
            <div className="preview-device-chrome__notch mx-auto mb-2 h-1.5 w-24 rounded-full" aria-hidden />
            <div className="overflow-hidden rounded-[2.25rem] border border-border bg-surface">
              <MobilePreviewScreenContent
                posterImage={posterImage}
                previewUrl={previewUrl}
                title={title}
                iframeLoading={iframeLoading}
              />
            </div>
            <div className="preview-device-chrome__home-bar mx-auto mt-2 h-1 w-28 rounded-full" aria-hidden />
          </div>
        </div>
      </div>
      {showViewportLabel ? (
        <p className="mt-2 text-center font-mono text-[10px] uppercase tracking-[0.16em] text-text-muted">
          {HTML_MOBILE_VIEWPORT_WIDTH} x {HTML_MOBILE_VIEWPORT_HEIGHT} viewport
        </p>
      ) : null}
    </div>
  );
}
