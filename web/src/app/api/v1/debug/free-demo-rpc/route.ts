import { successResponse } from "@/server/core/api";
import { getSupabaseAdminClient, isSupabaseDatabaseConfigured } from "@/server/supabase/client";

export const dynamic = "force-dynamic";

/**
 * TEMPORARY diagnostic route — not linked from anywhere, safe to leave enabled
 * on a non-production branch. Calls the atomic increment RPC against a
 * disposable campaign id (never the real "growrixos-launch-2026" one), so it
 * never touches the real counter, and reports exactly what Supabase returned.
 * Remove before merging.
 */
export async function GET() {
  const configured = isSupabaseDatabaseConfigured();
  if (!configured) {
    return successResponse({ configured });
  }

  const client = getSupabaseAdminClient();
  const { data, error } = await client.rpc("increment_free_demo_claimed_count", {
    p_campaign_id: "debug-diagnostic-does-not-exist",
  });

  return successResponse({
    configured,
    isArray: Array.isArray(data),
    data,
    error: error ? { message: error.message, details: error.details, hint: error.hint, code: error.code } : null,
  });
}
