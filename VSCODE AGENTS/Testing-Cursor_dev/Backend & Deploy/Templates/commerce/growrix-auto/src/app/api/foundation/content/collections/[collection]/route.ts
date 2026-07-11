import { fallbackCollections } from "@/lib/foundation/fallback";
import { resolveSurface, responseWithMode } from "@/lib/foundation/server";
import type { CollectionRecord } from "@/lib/foundation/types";

function getFallbackCollection(collection: string): CollectionRecord[] {
  return fallbackCollections[collection] ?? [];
}

export async function GET(
  _request: Request,
  context: { params: Promise<{ collection: string }> },
) {
  const { collection } = await context.params;
  const surface = await resolveSurface(
    `/api/content/collections/${collection}`,
    getFallbackCollection(collection),
  );

  return responseWithMode(surface.mode, surface.payload);
}
