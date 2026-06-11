import { NextResponse } from "next/server";
import { getHtmlBusinessProfileBySlug, getHtmlBusinessProfilePreviewUrl } from "@/lib/html-business-profiles";

export const dynamic = "force-dynamic";

type RouteContext = {
  params: Promise<{ templateSlug: string }>;
};

export async function GET(request: Request, context: RouteContext) {
  const { templateSlug } = await context.params;
  const normalizedTemplateSlug = templateSlug.replace(/^html-business-profile-/, "");
  const template = getHtmlBusinessProfileBySlug(normalizedTemplateSlug);

  if (!template) {
    return new Response("Template not found.", { status: 404 });
  }

  const previewUrl = new URL(getHtmlBusinessProfilePreviewUrl(normalizedTemplateSlug), request.url);
  return NextResponse.redirect(previewUrl, 307);
}
