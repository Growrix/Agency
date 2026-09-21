import type { NextRequest } from "next/server";
import { successResponse } from "@/server/core/api";
import { getSupabaseAdminClient, isSupabaseDatabaseConfigured } from "@/server/supabase/client";

export const dynamic = "force-dynamic";

/**
 * TEMPORARY diagnostic route — not linked from anywhere, safe to leave enabled
 * on a non-production branch. Defaults to a disposable campaign id (never the
 * real "growrixos-launch-2026" one) so a plain GET never touches the real
 * counter; pass ?campaign_id=<id> to target a specific (ideally throwaway)
 * entry. ?mode=raw-read instead does a plain, non-mutating select of the
 * app_state row via the same admin client, to isolate REST connectivity from
 * the RPC call itself. Remove before merging.
 */
export async function GET(request: NextRequest) {
  const configured = isSupabaseDatabaseConfigured();
  if (!configured) {
    return successResponse({ configured });
  }

  const client = getSupabaseAdminClient();
  const url = new URL(request.url);

  if (url.searchParams.get("mode") === "raw-read") {
    const { data, error } = await client.from("app_state").select("payload").eq("id", "primary").maybeSingle();
    return successResponse({
      configured,
      mode: "raw-read",
      freeDemoCampaigns: (data?.payload as { free_demo_campaigns?: unknown })?.free_demo_campaigns ?? null,
      error: error ? { message: error.message, details: error.details, hint: error.hint, code: error.code } : null,
    });
  }

  const campaignId = url.searchParams.get("campaign_id") ?? "debug-diagnostic-does-not-exist";
  const { data, error } = await client.rpc("increment_free_demo_claimed_count", {
    p_campaign_id: campaignId,
  });

  return successResponse({
    configured,
    campaignId,
    isArray: Array.isArray(data),
    data,
    error: error ? { message: error.message, details: error.details, hint: error.hint, code: error.code } : null,
  });
}
