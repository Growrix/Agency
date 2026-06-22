import { NextResponse } from "next/server";

const WARM_PATHS = [
  "/",
  "/blog",
  "/digital-products/category/website-templates-html-preview",
];

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;

  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const siteUrl = process.env.SITE_URL?.replace(/\/$/, "") ?? "https://www.growrixos.com";
  const results = await Promise.all(
    WARM_PATHS.map(async (path) => {
      const started = Date.now();
      try {
        const response = await fetch(`${siteUrl}${path}`, {
          headers: { "User-Agent": "GrowrixOS-Cache-Warmer/1.0" },
          next: { revalidate: 0 },
        });
        return {
          path,
          status: response.status,
          durationMs: Date.now() - started,
        };
      } catch (error) {
        return {
          path,
          status: 0,
          durationMs: Date.now() - started,
          error: error instanceof Error ? error.message : "Unknown error",
        };
      }
    }),
  );

  return NextResponse.json({ ok: true, warmed: results });
}
