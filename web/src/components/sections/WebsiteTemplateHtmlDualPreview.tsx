"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/primitives/Card";

const DESKTOP_VIEWPORT_WIDTH = 1440;
const DESKTOP_VIEWPORT_HEIGHT = 900;
const MOBILE_VIEWPORT_WIDTH = 390;
const MOBILE_VIEWPORT_HEIGHT = 844;

type WebsiteTemplateHtmlDualPreviewProps = {
  previewUrl?: string;
  templateTitle?: string;
};

function DesktopScaledPreview({ previewUrl, templateTitle }: { previewUrl: string; templateTitle: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    const updateScale = () => {
      const nextScale = container.clientWidth / DESKTOP_VIEWPORT_WIDTH;
      setScale(nextScale > 0 ? nextScale : 1);
    };

    updateScale();
    const observer = new ResizeObserver(updateScale);
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  const scaledHeight = DESKTOP_VIEWPORT_HEIGHT * scale;

  return (
    <div
      ref={containerRef}
      className="w-full overflow-hidden rounded-xl border border-border bg-[#0a0a0a]"
      style={{ height: scaledHeight }}
    >
      <div
        style={{
          width: DESKTOP_VIEWPORT_WIDTH,
          height: DESKTOP_VIEWPORT_HEIGHT,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
        }}
      >
        <iframe
          src={previewUrl}
          title={`${templateTitle} desktop preview`}
          width={DESKTOP_VIEWPORT_WIDTH}
          height={DESKTOP_VIEWPORT_HEIGHT}
          className="block border-0 bg-white"
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
        />
      </div>
    </div>
  );
}

function MobileDevicePreview({ previewUrl, templateTitle }: { previewUrl: string; templateTitle: string }) {
  return (
    <div className="mx-auto w-[390px] max-w-full">
      <div className="rounded-[2.75rem] border border-border bg-black p-2.5 shadow-(--shadow-2)">
        <div className="mx-auto mb-2 h-1.5 w-24 rounded-full bg-white/20" aria-hidden />
        <div className="overflow-hidden rounded-[2.25rem] border border-black/50 bg-white">
          <iframe
            src={previewUrl}
            title={`${templateTitle} mobile preview`}
            width={MOBILE_VIEWPORT_WIDTH}
            height={MOBILE_VIEWPORT_HEIGHT}
            className="block border-0 bg-white"
            style={{ width: MOBILE_VIEWPORT_WIDTH, height: MOBILE_VIEWPORT_HEIGHT, maxWidth: "100%" }}
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </div>
        <div className="mx-auto mt-2 h-1 w-28 rounded-full bg-white/15" aria-hidden />
      </div>
      <p className="mt-3 text-center font-mono text-[10px] uppercase tracking-[0.16em] text-text-muted">
        {MOBILE_VIEWPORT_WIDTH} x {MOBILE_VIEWPORT_HEIGHT} viewport
      </p>
    </div>
  );
}

export function WebsiteTemplateHtmlDualPreview({
  previewUrl,
  templateTitle = "Website Template",
}: WebsiteTemplateHtmlDualPreviewProps) {
  return (
    <div className="space-y-6">
      <Card className="p-5 sm:p-6">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-4">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-text-muted">Desktop Preview</p>
            <h3 className="mt-3 font-display text-2xl tracking-tight">Full-width desktop layout</h3>
            <p className="mt-3 text-sm leading-7 text-text-muted">
              Rendered at a {DESKTOP_VIEWPORT_WIDTH}px viewport and scaled to fit this panel, so the full desktop
              layout stays visible without cutting off the right side.
            </p>
            {previewUrl ? (
              <Link
                href={previewUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex text-sm font-medium text-primary hover:underline"
              >
                Open full desktop preview
              </Link>
            ) : null}
          </div>
          <div className="lg:col-span-8">
            {previewUrl ? (
              <DesktopScaledPreview previewUrl={previewUrl} templateTitle={templateTitle} />
            ) : (
              <div className="flex h-[420px] items-center justify-center rounded-xl border border-dashed border-border text-sm text-text-muted">
                Preview unavailable
              </div>
            )}
          </div>
        </div>
      </Card>

      <Card className="p-5 sm:p-6">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-start">
          <div className="order-2 lg:order-1 lg:col-span-7">
            {previewUrl ? (
              <MobileDevicePreview previewUrl={previewUrl} templateTitle={templateTitle} />
            ) : (
              <div className="flex h-[520px] items-center justify-center rounded-xl border border-dashed border-border text-sm text-text-muted">
                Preview unavailable
              </div>
            )}
          </div>
          <div className="order-1 lg:order-2 lg:col-span-5">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-text-muted">Mobile Preview</p>
            <h3 className="mt-3 font-display text-2xl tracking-tight">Standard phone viewport</h3>
            <p className="mt-3 text-sm leading-7 text-text-muted">
              Shown inside a {MOBILE_VIEWPORT_WIDTH}px-wide device frame so responsive breakpoints match real mobile
              behavior, not a shrunk desktop layout.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
