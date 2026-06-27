"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import {
  HTML_DESKTOP_VIEWPORT_HEIGHT,
  HTML_DESKTOP_VIEWPORT_WIDTH,
} from "@/components/shop/WebsiteTemplateHtmlDesktopPreviewFrame";

type FitMode = "width" | "contain" | "cover";

type WebsiteTemplateHtmlDesktopPosterFrameProps = {
  posterImage: { src: string; alt: string };
  className?: string;
  frameClassName?: string;
  viewportWidth?: number;
  viewportHeight?: number;
  fit?: FitMode;
  verticalAlign?: "top" | "center";
  containerHeight?: number;
  /** When true, width-fit posters stretch to the container height (hero monitor). */
  fillContainer?: boolean;
  /** When true, prioritize LCP fetch for the active hero poster. */
  imagePriority?: boolean;
};

/** Scaled poster frame — mirrors WebsiteTemplateHtmlDesktopPreviewFrame layout without an iframe. */
export function WebsiteTemplateHtmlDesktopPosterFrame({
  posterImage,
  className,
  frameClassName,
  viewportWidth = HTML_DESKTOP_VIEWPORT_WIDTH,
  viewportHeight = HTML_DESKTOP_VIEWPORT_HEIGHT,
  fit = "width",
  verticalAlign = "center",
  containerHeight,
  fillContainer = false,
  imagePriority = false,
}: WebsiteTemplateHtmlDesktopPosterFrameProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
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
      setOffsetY(
        verticalAlign === "top"
          ? 0
          : (container.clientHeight - viewportHeight * safeScale) / 2,
      );
      return;
    }

    if (fit === "contain") {
      const heightLimit = container.clientHeight || containerHeight || viewportHeight;
      const heightScale = heightLimit / viewportHeight;
      const nextScale = Math.min(widthScale, heightScale);
      const safeScale = nextScale > 0 ? nextScale : 1;
      setScale(safeScale);
      setOffsetX(Math.max(0, (container.clientWidth - viewportWidth * safeScale) / 2));
      setOffsetY(0);
      return;
    }

    const nextScale = widthScale > 0 ? widthScale : 1;
    setScale(nextScale);
    setOffsetX(0);
    setOffsetY(0);
  }, [viewportWidth, viewportHeight, containerHeight, fit, verticalAlign]);

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

  const scaledHeight = fit === "contain" ? undefined : fit === "cover" ? undefined : viewportHeight * scale;
  const containStyle = fit === "contain" && containerHeight ? { height: containerHeight } : undefined;
  const coverStyle = fit === "cover" ? { height: "100%" } : undefined;

  const widthFitStyle = fillContainer && fit === "width" ? { height: "100%" } : { height: scaledHeight };

  return (
    <div
      ref={containerRef}
      className={cn("relative w-full overflow-hidden bg-inset", frameClassName, className)}
      style={fit === "contain" ? containStyle : fit === "cover" ? coverStyle : widthFitStyle}
    >
      <div
        className="absolute"
        style={{
          left: offsetX,
          top: offsetY,
          width: viewportWidth,
          height: viewportHeight,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- must mirror iframe box model inside transform scale */}
        <img
          src={posterImage.src}
          alt={posterImage.alt}
          width={viewportWidth}
          height={viewportHeight}
          className="block max-h-none max-w-none border-0 bg-surface"
          style={{
            width: viewportWidth,
            height: viewportHeight,
          }}
          decoding="async"
          loading={imagePriority ? "eager" : "lazy"}
          fetchPriority={imagePriority ? "high" : "low"}
        />
      </div>
    </div>
  );
}
