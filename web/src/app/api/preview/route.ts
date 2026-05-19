import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";
import { getAuthenticatedUser } from "@/server/auth/guards";

/**
 * Authenticated draft-mode preview endpoint.
 *
 * Security model (per cms-content-operations-security.md):
 *  - Requires a valid admin session cookie (same JWT the dashboard uses).
 *  - Also requires the SANITY_PREVIEW_SECRET env var to match the `secret` query param.
 *  - Redirects to the `slug` path only after both checks pass.
 *  - Never exposes the secret in logs or error responses.
 *
 * Usage from Sanity Studio:
 *   https://<site>/api/preview?secret=<SANITY_PREVIEW_SECRET>&slug=/portfolio/lumora-studio
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");
  const slug = searchParams.get("slug");

  const previewSecret = process.env.SANITY_PREVIEW_SECRET;

  if (!previewSecret) {
    return new Response("Preview is not configured.", { status: 503 });
  }

  if (!secret || secret !== previewSecret) {
    return new Response("Invalid preview secret.", { status: 401 });
  }

  if (!slug || !slug.startsWith("/")) {
    return new Response("A valid slug is required.", { status: 400 });
  }

  // Require an authenticated admin session in addition to the preview secret.
  const user = await getAuthenticatedUser(request);
  if (!user || user.role !== "admin") {
    return new Response("Admin authentication is required for preview.", { status: 401 });
  }

  const draft = await draftMode();
  draft.enable();

  redirect(slug);
}
