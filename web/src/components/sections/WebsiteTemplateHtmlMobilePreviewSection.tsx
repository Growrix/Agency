"use client";

import { Card } from "@/components/primitives/Card";
import {
  HTML_MOBILE_VIEWPORT_WIDTH,
  WebsiteTemplateHtmlMobilePreviewFrame,
} from "@/components/shop/WebsiteTemplateHtmlMobilePreviewFrame";

type WebsiteTemplateHtmlMobilePreviewSectionProps = {
  previewUrl?: string;
  templateTitle?: string;
  /** When true, copy sits on the left and the phone frame on the right (desktop). */
  previewOnRight?: boolean;
};

export function WebsiteTemplateHtmlMobilePreviewSection({
  previewUrl,
  templateTitle = "Website Template",
  previewOnRight = false,
}: WebsiteTemplateHtmlMobilePreviewSectionProps) {
  const copy = (
    <div className={previewOnRight ? "lg:col-span-5" : "order-1 lg:order-2 lg:col-span-5"}>
      <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-text-muted">Mobile Preview</p>
      <h3 className="mt-3 font-display text-2xl tracking-tight">Standard phone viewport</h3>
      <p className="mt-3 text-sm leading-7 text-text-muted">
        Shown inside a {HTML_MOBILE_VIEWPORT_WIDTH}px-wide device frame so responsive breakpoints match real mobile
        behavior, not a shrunk desktop layout.
      </p>
    </div>
  );

  const preview = (
    <div className={previewOnRight ? "lg:col-span-7" : "order-2 lg:order-1 lg:col-span-7"}>
      {previewUrl ? (
        <WebsiteTemplateHtmlMobilePreviewFrame
          previewUrl={previewUrl}
          title={`${templateTitle} mobile preview`}
        />
      ) : (
        <div className="flex h-[520px] items-center justify-center rounded-xl border border-dashed border-border text-sm text-text-muted">
          Preview unavailable
        </div>
      )}
    </div>
  );

  return (
    <Card className="p-5 sm:p-6">
      <div className="grid gap-6 lg:grid-cols-12 lg:items-start">
        {previewOnRight ? (
          <>
            {copy}
            {preview}
          </>
        ) : (
          <>
            {preview}
            {copy}
          </>
        )}
      </div>
    </Card>
  );
}
