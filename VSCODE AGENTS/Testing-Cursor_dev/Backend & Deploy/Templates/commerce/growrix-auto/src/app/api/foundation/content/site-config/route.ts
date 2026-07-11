import { fallbackSiteConfig } from "@/lib/foundation/fallback";
import { resolveSurface, responseWithMode } from "@/lib/foundation/server";

export async function GET() {
  const surface = await resolveSurface("/api/content/site-config", fallbackSiteConfig);
  return responseWithMode(surface.mode, surface.payload);
}
