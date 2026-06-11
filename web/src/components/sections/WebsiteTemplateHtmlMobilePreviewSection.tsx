"use client";

import { Card } from "@/components/primitives/Card";
import { WebsiteTemplateHtmlMobilePreviewMarketing } from "@/components/sections/WebsiteTemplateHtmlPreviewMarketing";
import { WebsiteTemplateHtmlMobilePreviewFrame } from "@/components/shop/WebsiteTemplateHtmlMobilePreviewFrame";

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
    <div className={previewOnRight ? "min-w-0 lg:col-span-5" : "order-1 min-w-0 lg:order-2 lg:col-span-5"}>
      <WebsiteTemplateHtmlMobilePreviewMarketing />
    </div>
  );

  const preview = (
    <div
      className={
        previewOnRight
          ? "min-w-0 lg:col-span-7"
          : "order-2 min-w-0 lg:order-1 lg:col-span-7"
      }
    >
      {previewUrl ? (
        <WebsiteTemplateHtmlMobilePreviewFrame
          previewUrl={previewUrl}
          title={`${templateTitle} mobile preview`}
          maxFrameHeight={480}
        />
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
