import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

/**
 * Route invalidation map for all CMS-managed surfaces.
 * Keyed by Sanity document type; value is the set of Next.js paths to revalidate.
 * Per cms-content-operations-frontend.md Slice 3 deliverable.
 */
const REVALIDATION_MAP: Record<string, string[]> = {
  blogPost: ["/blog", "/blog/[slug]"],
  caseStudy: ["/portfolio", "/portfolio/[slug]"],
  shopItem: ["/shop", "/shop/[slug]"],
  shopCategory: ["/shop"],
  servicePage: ["/services", "/services/[slug]"],
  faqItem: ["/faq", "/services", "/"],
  homePage: ["/"],
  aboutPage: ["/about"],
  siteSettings: ["/", "/about", "/services", "/portfolio", "/shop", "/faq", "/blog"],
};

export async function POST(request: NextRequest) {
  const url = new URL(request.url);
  const secret = url.searchParams.get("secret");

  if (!process.env.REVALIDATE_SECRET) {
    return NextResponse.json(
      { ok: false, message: "REVALIDATE_SECRET is not configured." },
      { status: 500 }
    );
  }

  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ ok: false, message: "Invalid secret." }, { status: 401 });
  }

  // Support both a single `path` param (legacy) and a `type` param (Sanity webhook).
  const explicitPath = url.searchParams.get("path");
  const documentType = url.searchParams.get("type");

  const pathsToRevalidate: string[] = [];

  if (explicitPath) {
    pathsToRevalidate.push(explicitPath);
  }

  if (documentType && REVALIDATION_MAP[documentType]) {
    pathsToRevalidate.push(...REVALIDATION_MAP[documentType]);
  }

  // Always revalidate /blog as a baseline (preserves legacy behavior).
  if (!pathsToRevalidate.includes("/blog")) {
    pathsToRevalidate.push("/blog");
  }

  const unique = Array.from(new Set(pathsToRevalidate));

  for (const path of unique) {
    revalidatePath(path);
  }

  return NextResponse.json({ ok: true, revalidated: unique });
}
