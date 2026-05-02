import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

/**
 * Route invalidation map for all CMS-managed surfaces.
 * Keyed by Sanity document type; value is the set of Next.js paths to revalidate.
 * Per cms-content-operations-frontend.md Slice 3 deliverable.
 */
const REVALIDATION_MAP: Record<string, string[]> = {
  blogPost: ["/", "/blog", "/blog/[slug]"],
  caseStudy: ["/", "/portfolio", "/portfolio/[slug]"],
  shopItem: ["/", "/shop", "/shop/[slug]"],
  shopCategory: ["/shop"],
  servicePage: ["/", "/services", "/services/[slug]"],
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

  // Resolve document type: query param takes priority, then Sanity webhook JSON body.
  // Sanity webhook URL template: /api/revalidate?secret=SECRET&type={_type}
  // Fallback: parse body for _type when no type query param is present.
  const explicitPath = url.searchParams.get("path");
  let documentType = url.searchParams.get("type");

  if (!documentType) {
    try {
      const contentType = request.headers.get("content-type") ?? "";
      if (contentType.includes("application/json")) {
        const body = await request.json() as Record<string, unknown>;
        const raw = body?._type;
        if (typeof raw === "string" && raw.length > 0) {
          documentType = raw;
        }
      }
    } catch {
      // Body is not JSON or empty — fall through without document type.
    }
  }

  const pathsToRevalidate: string[] = [];

  if (explicitPath) {
    pathsToRevalidate.push(explicitPath);
  }

  if (documentType && REVALIDATION_MAP[documentType]) {
    pathsToRevalidate.push(...REVALIDATION_MAP[documentType]);
  }

  // Fallback baseline: if we have no specific paths to revalidate, revalidate home + blog.
  if (pathsToRevalidate.length === 0) {
    pathsToRevalidate.push("/", "/blog");
  }

  const unique = Array.from(new Set(pathsToRevalidate));

  for (const path of unique) {
    revalidatePath(path);
  }

  return NextResponse.json({ ok: true, revalidated: unique, documentType: documentType ?? null });
}
