"use client";

export const HTML_MOBILE_VIEWPORT_WIDTH = 390;
export const HTML_MOBILE_VIEWPORT_HEIGHT = 844;

type WebsiteTemplateHtmlMobilePreviewFrameProps = {
  previewUrl: string;
  title: string;
};

export function WebsiteTemplateHtmlMobilePreviewFrame({
  previewUrl,
  title,
}: WebsiteTemplateHtmlMobilePreviewFrameProps) {
  return (
    <div className="mx-auto w-[390px] max-w-full">
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
              maxWidth: "100%",
            }}
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </div>
        <div className="mx-auto mt-2 h-1 w-28 rounded-full bg-white/15" aria-hidden />
      </div>
      <p className="mt-3 text-center font-mono text-[10px] uppercase tracking-[0.16em] text-text-muted">
        {HTML_MOBILE_VIEWPORT_WIDTH} x {HTML_MOBILE_VIEWPORT_HEIGHT} viewport
      </p>
    </div>
  );
}
