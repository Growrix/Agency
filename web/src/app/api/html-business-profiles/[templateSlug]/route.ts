import { readFile } from "node:fs/promises";
import path from "node:path";
import { getHtmlBusinessProfileBySlug, HTML_BUSINESS_PROFILE_PREVIEW_ROOT } from "@/lib/html-business-profiles";
import { buildRedactedPreviewHtml } from "@/server/security/preview-redaction";

export const revalidate = 900;

type RouteContext = {
  params: Promise<{ templateSlug: string }>;
};

export async function GET(request: Request, context: RouteContext) {
  void request;
  const { templateSlug } = await context.params;
  const normalizedTemplateSlug = templateSlug.replace(/^html-business-profile-/, "");
  const template = getHtmlBusinessProfileBySlug(normalizedTemplateSlug);

  if (!template) {
    return new Response("Template not found.", { status: 404 });
  }

  const filePath = path.join(process.cwd(), "public", "previews", HTML_BUSINESS_PROFILE_PREVIEW_ROOT, template.fileName);
  const html = await readFile(filePath, "utf8");
  const redactedPreviewHtml = buildRedactedPreviewHtml(html, {
    watermarkLabel: "Growrix Business Profile Preview",
    maxVisibleSections: 3,
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
