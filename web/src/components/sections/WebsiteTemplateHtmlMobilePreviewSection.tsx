"use client";

import { Card } from "@/components/primitives/Card";
import { WebsiteTemplateHtmlMobilePreviewMarketing, HtmlBusinessProfileMobilePreviewMarketing } from "@/components/sections/WebsiteTemplateHtmlPreviewMarketing";
import { WebsiteTemplateHtmlMobilePreviewFrame } from "@/components/shop/WebsiteTemplateHtmlMobilePreviewFrame";
import { useDeferredPreview } from "@/components/shop/useDeferredPreview";

type WebsiteTemplateHtmlMobilePreviewSectionProps = {
  previewUrl?: string;
  templateTitle?: string;
  /** When true, copy sits on the left and the phone frame on the right (desktop). */
  previewOnRight?: boolean;
  marketingVariant?: "website-template" | "business-profile";
};

export function WebsiteTemplateHtmlMobilePreviewSection({
  previewUrl,
  templateTitle = "Website Template",
  previewOnRight = false,
  marketingVariant = "website-template",
}: WebsiteTemplateHtmlMobilePreviewSectionProps) {
  const { ref: previewRef, shouldRender: shouldRenderPreview } = useDeferredPreview<HTMLDivElement>();
  const marketingCopy = marketingVariant === "business-profile"
    ? <HtmlBusinessProfileMobilePreviewMarketing />
    : <WebsiteTemplateHtmlMobilePreviewMarketing />;
  const copy = (
    <div className={previewOnRight ? "min-w-0 lg:col-span-5" : "order-1 min-w-0 lg:order-2 lg:col-span-5"}>
      {marketingCopy}
    </div>
  );

  const preview = (
    <div
      ref={previewRef}
      className={
        previewOnRight
          ? "min-w-0 lg:col-span-7"
          : "order-2 min-w-0 lg:order-1 lg:col-span-7"
      }
    >
      {previewUrl ? (
        shouldRenderPreview ? (
          <WebsiteTemplateHtmlMobilePreviewFrame
            previewUrl={previewUrl}
            title={`${templateTitle} mobile preview`}
            maxFrameHeight={480}
          />
        ) : (
          <div className="flex h-[480px] items-center justify-center rounded-xl border border-dashed border-border font-mono text-[10px] uppercase tracking-[0.18em] text-text-muted">
            Loading preview…
          </div>
        )
      ) : (
        <div className="flex h-[320px] items-center justify-center rounded-xl border border-dashed border-border text-sm text-text-muted">
          Preview unavailable
        </div>
      )}
    </div>
  );

  return (
    <Card className="overflow-hidden p-5 sm:p-6">
      <div className="grid gap-6 lg:grid-cols-12 lg:items-center">
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
