"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export const HTML_DESKTOP_VIEWPORT_WIDTH = 1440;
export const HTML_DESKTOP_VIEWPORT_HEIGHT = 900;

type FitMode = "width" | "contain" | "cover";

type WebsiteTemplateHtmlDesktopPreviewFrameProps = {
  previewUrl: string;
  title: string;
  className?: string;
  frameClassName?: string;
  viewportWidth?: number;
  viewportHeight?: number;
  fit?: FitMode;
  /** Used only when fit="contain" and no height class is applied. */
  containerHeight?: number;
  iframeLoading?: "lazy" | "eager";
};

export function WebsiteTemplateHtmlDesktopPreviewFrame({
  previewUrl,
  title,
  className,
  frameClassName,
  viewportWidth = HTML_DESKTOP_VIEWPORT_WIDTH,
  viewportHeight = HTML_DESKTOP_VIEWPORT_HEIGHT,
  fit = "width",
  containerHeight,
  iframeLoading = "lazy",
}: WebsiteTemplateHtmlDesktopPreviewFrameProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [scale, setScale] = useState(1);
  const [contentHeight, setContentHeight] = useState(viewportHeight);
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);

  const updateScale = useCallback(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    const widthScale = container.clientWidth / viewportWidth;

    if (fit === "cover") {
      const heightLimit = container.clientHeight || viewportHeight;
      const heightScale = heightLimit / viewportHeight;
      const nextScale = Math.max(widthScale, heightScale);
      const safeScale = nextScale > 0 ? nextScale : 1;
      setScale(safeScale);
      setOffsetX((container.clientWidth - viewportWidth * safeScale) / 2);
      setOffsetY((container.clientHeight - viewportHeight * safeScale) / 2);
      return;
    }

    if (fit === "contain") {
      const heightLimit = container.clientHeight || containerHeight || viewportHeight;
      const heightScale = heightLimit / contentHeight;
      const nextScale = Math.min(widthScale, heightScale);
      const safeScale = nextScale > 0 ? nextScale : 1;
      setScale(safeScale);
      setOffsetX(Math.max(0, (container.clientWidth - viewportWidth * safeScale) / 2));
      return;
    }

    const nextScale = widthScale > 0 ? widthScale : 1;
    setScale(nextScale);
    setOffsetX(0);
    setOffsetY(0);
  }, [viewportWidth, viewportHeight, contentHeight, containerHeight, fit]);

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

  const measureContentHeight = useCallback(() => {
    const iframe = iframeRef.current;
    if (!iframe) {
      return;
    }

    try {
      const doc = iframe.contentDocument;
      if (!doc) {
        return;
      }

      const measured = Math.max(
        doc.documentElement.scrollHeight,
        doc.body?.scrollHeight ?? 0,
        viewportHeight,
      );
      setContentHeight(measured);
    } catch {
      // Same-origin reads should succeed; keep the fallback height if not.
    }
  }, [viewportHeight]);

  const handleIframeLoad = () => {
    if (fit !== "contain") {
      return;
    }

    measureContentHeight();
    window.setTimeout(measureContentHeight, 400);
    window.setTimeout(measureContentHeight, 1200);
  };

  const scaledHeight = fit === "contain" ? undefined : fit === "cover" ? undefined : viewportHeight * scale;
  const containStyle = fit === "contain" && containerHeight ? { height: containerHeight } : undefined;
  const coverStyle = fit === "cover" ? { height: "100%" } : undefined;
  const iframeHeight = fit === "contain" ? contentHeight : viewportHeight;

  return (
    <div
      ref={containerRef}
      className={cn("relative w-full overflow-hidden bg-[#0a0a0a]", frameClassName, className)}
      style={fit === "contain" ? containStyle : fit === "cover" ? coverStyle : { height: scaledHeight }}
    >
      <div
        className="absolute"
        style={{
          left: offsetX,
          top: offsetY,
          width: viewportWidth,
          height: iframeHeight,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
        }}
      >
        <iframe
          ref={iframeRef}
          src={previewUrl}
          title={title}
          width={viewportWidth}
          height={iframeHeight}
          className="block border-0 bg-white"
          loading={iframeLoading}
          referrerPolicy="strict-origin-when-cross-origin"
          onLoad={handleIframeLoad}
        />
      </div>
    </div>
  );
}
