import { readFile } from "node:fs/promises";
import path from "node:path";
import { getHtmlBusinessProfileBySlug } from "@/lib/html-business-profiles";

export const dynamic = "force-dynamic";

const PREVIEW_CSP =
  "default-src 'self' data: https: http: 'unsafe-inline' 'unsafe-eval'; " +
  "img-src * data: blob:; style-src 'self' 'unsafe-inline' https: http:; " +
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https: http:; " +
  "font-src 'self' data: https: http:; connect-src 'self' https: http: ws: wss:; " +
  "frame-ancestors 'self'; base-uri 'self'; form-action 'self' https://wa.me;";

type RouteContext = {
  params: Promise<{ templateSlug: string }>;
};

export async function GET(_: Request, context: RouteContext) {
  const { templateSlug } = await context.params;
  const normalizedTemplateSlug = templateSlug.replace(/^html-business-profile-/, "");
  const template = getHtmlBusinessProfileBySlug(normalizedTemplateSlug);

  if (!template) {
    return new Response("Template not found.", { status: 404 });
  }

  const filePath = path.resolve(process.cwd(), "..", "HTML Business Profiles", template.fileName);

  try {
    const html = await readFile(filePath, "utf8");
    return new Response(html, {
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "no-store",
        "X-Frame-Options": "SAMEORIGIN",
        "Content-Security-Policy": PREVIEW_CSP,
      },
    });
  } catch {
    return new Response("Template file is unavailable.", { status: 404 });
  }
}
