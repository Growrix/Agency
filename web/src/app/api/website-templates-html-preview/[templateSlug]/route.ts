import { NextResponse } from "next/server";
import { getWebsiteTemplateHtmlPreviewBySlug, getWebsiteTemplateHtmlPreviewUrl } from "@/lib/website-templates-html-preview";

export const dynamic = "force-dynamic";

type RouteContext = {
  params: Promise<{ templateSlug: string }>;
};

export async function GET(request: Request, context: RouteContext) {
  const { templateSlug } = await context.params;
  const template = getWebsiteTemplateHtmlPreviewBySlug(templateSlug);

  if (!template) {
    return new Response("Template not found.", { status: 404 });
  }

  const previewUrl = new URL(getWebsiteTemplateHtmlPreviewUrl(templateSlug), request.url);
  return NextResponse.redirect(previewUrl, 307);
}
