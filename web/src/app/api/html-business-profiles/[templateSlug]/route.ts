import { readFile } from "node:fs/promises";
import path from "node:path";
import { getHtmlBusinessProfileBySlug } from "@/lib/html-business-profiles";

export const dynamic = "force-dynamic";

type RouteContext = {
  params: Promise<{ templateSlug: string }>;
};

export async function GET(_: Request, context: RouteContext) {
  const { templateSlug } = await context.params;
  const template = getHtmlBusinessProfileBySlug(templateSlug);

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
      },
    });
  } catch {
    return new Response("Template file is unavailable.", { status: 404 });
  }
}
