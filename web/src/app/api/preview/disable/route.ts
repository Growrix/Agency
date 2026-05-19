import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

/**
 * Disables draft mode and redirects back to the page the operator was viewing.
 * No auth required — disabling preview is always safe.
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const returnTo = searchParams.get("returnTo") ?? "/";

  const draft = await draftMode();
  draft.disable();

  const safePath = returnTo.startsWith("/") ? returnTo : "/";
  redirect(safePath);
}
