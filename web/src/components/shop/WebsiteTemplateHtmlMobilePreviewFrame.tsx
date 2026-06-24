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
  previewUrl: string;
  title: string;
  className?: string;
  /** Scales the device down so the frame fits this max height (px). Omit for native 390×844 frame height. */
  maxFrameHeight?: number;
  /** Vertical alignment when the scaled frame is shorter than its container. */
  contentAlign?: "center" | "start";
  showViewportLabel?: boolean;
  iframeLoading?: "lazy" | "eager";
};

export function WebsiteTemplateHtmlMobilePreviewFrame({
  previewUrl,
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

    const widthScale = container.clientWidth / HTML_MOBILE_FRAME_WIDTH;
    const heightScale = heightBudget / HTML_MOBILE_FRAME_HEIGHT;
    const nextScale = Math.min(1, widthScale, heightScale);
    setScale(nextScale > 0 ? nextScale : 1);
  }, [heightBudget]);

  useEffect(() => {
    updateScale();
    const container = containerRef.current;
    if (!container) {
      return;
    }

    const observer = new ResizeObserver(updateScale);
    observer.observe(container);
    return () => observer.disconnect();
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
          <div className="rounded-[2.75rem] border border-border bg-black p-2.5 shadow-(--shadow-2)">
            <div className="mx-auto mb-2 h-1.5 w-24 rounded-full bg-white/20" aria-hidden />
            <div className="overflow-hidden rounded-[2.25rem] border border-black/50 bg-white">
              <iframe
                src={previewUrl}
                title={title}
                width={HTML_MOBILE_VIEWPORT_WIDTH}
                height={HTML_MOBILE_VIEWPORT_HEIGHT}
                className="block border-0 bg-white"
                style={{
                  width: HTML_MOBILE_VIEWPORT_WIDTH,
                  height: HTML_MOBILE_VIEWPORT_HEIGHT,
                }}
                loading={iframeLoading}
                tabIndex={-1}
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </div>
            <div className="mx-auto mt-2 h-1 w-28 rounded-full bg-white/15" aria-hidden />
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
