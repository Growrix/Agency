import { fallbackSession } from "@/lib/foundation/fallback";
import { resolveSurface, responseWithMode } from "@/lib/foundation/server";

export async function GET() {
  const surface = await resolveSurface("/api/auth/session", fallbackSession);
  return responseWithMode(surface.mode, surface.payload);
}
