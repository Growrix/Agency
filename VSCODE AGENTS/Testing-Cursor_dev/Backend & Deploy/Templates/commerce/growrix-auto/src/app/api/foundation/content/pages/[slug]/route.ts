import { fallbackPageBySlug } from "@/lib/foundation/fallback";
import { resolveSurface, responseWithMode } from "@/lib/foundation/server";
import type { ContentPageDto } from "@/lib/foundation/types";

function getFallbackPage(slug: string): ContentPageDto {
  return (
    fallbackPageBySlug[slug] ?? {
      ...fallbackPageBySlug.home,
      slug,
      title: `Fallback page for ${slug}`,
      description: "Foundation content page fallback.",
    }
  );
}

export async function GET(
  _request: Request,
  context: { params: Promise<{ slug: string }> },
) {
  const { slug } = await context.params;
  const surface = await resolveSurface(`/api/content/pages/${slug}`, getFallbackPage(slug));
  return responseWithMode(surface.mode, surface.payload);
}
