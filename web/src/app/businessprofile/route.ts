import { readFile } from "node:fs/promises";
import path from "node:path";
import { SITE_URL } from "@/lib/site";

const PROFILE_FILENAME = "growrix-os-business-profile.html";

function absolutizeProfileLinks(html: string): string {
  const base = SITE_URL.replace(/\/+$/, "");

  return html.replace(/(\s)(href=")\/(?!\/)([^"]*)"/g, (_, whitespace, prefix, routePath) => {
    return `${whitespace}${prefix}${base}/${routePath}"`;
  });
}

export async function GET() {
  const filePath = path.join(process.cwd(), "public", "previews", PROFILE_FILENAME);
  const raw = await readFile(filePath, "utf8");
  const html = absolutizeProfileLinks(raw);

  return new Response(html, {
    status: 200,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
      "X-Robots-Tag": "noindex, nofollow",
    },
  });
}
