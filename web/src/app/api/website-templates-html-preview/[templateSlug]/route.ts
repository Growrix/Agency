import { readFile } from "node:fs/promises";
import path from "node:path";
import { getWebsiteTemplateHtmlPreviewBySlug, WEBSITE_TEMPLATE_HTML_PREVIEW_ROOT } from "@/lib/website-templates-html-preview";
import { buildRedactedPreviewHtml } from "@/server/security/preview-redaction";

export const revalidate = 900;

type RouteContext = {
  params: Promise<{ templateSlug: string }>;
};

export async function GET(_request: Request, context: RouteContext) {
  const { templateSlug } = await context.params;
  const template = getWebsiteTemplateHtmlPreviewBySlug(templateSlug);

  if (!template) {
    return new Response("Template not found.", { status: 404 });
  }

  const filePath = path.join(process.cwd(), "public", "previews", WEBSITE_TEMPLATE_HTML_PREVIEW_ROOT, template.fileName);
  const html = await readFile(filePath, "utf8");
  const optimizedHtml = optimizePreviewHtml(html);
  const redactedPreviewHtml = buildRedactedPreviewHtml(optimizedHtml, {
    watermarkLabel: "Growrix Preview Only",
    maxVisibleSections: 4,
  });

  return new Response(redactedPreviewHtml, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "public, max-age=900, stale-while-revalidate=86400",
      "X-Robots-Tag": "noindex, nofollow",
      "X-Preview-Mode": "redacted",
      "X-Content-Type-Options": "nosniff",
      "Referrer-Policy": "no-referrer",
      "Content-Security-Policy": "default-src 'none'; img-src https: data:; style-src 'unsafe-inline' https:; font-src https: data:; media-src https: data:; form-action 'none'; frame-src 'none'; connect-src 'none'; base-uri 'none'",
    },
  });
}

function optimizePreviewHtml(html: string) {
  const withOptimizedUnsplashImages = html.replace(
    /https:\/\/images\.unsplash\.com\/[^\s"'()<>]+/g,
    (rawUrl) => {
      try {
        const parsed = new URL(rawUrl);
        const currentWidth = Number(parsed.searchParams.get("w") ?? "0");
        if (Number.isFinite(currentWidth) && currentWidth > 0) {
          parsed.searchParams.set("w", String(Math.min(currentWidth, 1280)));
        }

        const currentQuality = Number(parsed.searchParams.get("q") ?? "0");
        if (Number.isFinite(currentQuality) && currentQuality > 0) {
          parsed.searchParams.set("q", String(Math.min(currentQuality, 70)));
        }

        return parsed.toString();
      } catch {
        return rawUrl;
      }
    },
  );

  const withLazyImages = withOptimizedUnsplashImages.replace(
    /<img(?![^>]*\bloading=)([^>]*)>/g,
    '<img loading="lazy" decoding="async"$1>',
  );

  return withLazyImages;
}
