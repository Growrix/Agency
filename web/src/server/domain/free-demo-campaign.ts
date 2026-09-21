import "server-only";

import {
  DEFAULT_FREE_DEMO_CAMPAIGN,
  DEFAULT_FREE_DEMO_CAMPAIGN_ID,
  type FreeDemoCampaignRecord,
} from "@/server/data/schema";
import { invalidateSupabaseDatabaseCache, readDatabase, writeDatabase } from "@/server/data/store";
import { getSupabaseAdminClient, isSupabaseDatabaseConfigured } from "@/server/supabase/client";

export type FreeDemoCampaignState = {
  id: string;
  name: string;
  isActive: boolean;
  totalSlots: number;
  claimedCount: number;
  remaining: number;
};

function normalizeCampaign(record: FreeDemoCampaignRecord | undefined): FreeDemoCampaignRecord {
  if (!record) {
    return { ...DEFAULT_FREE_DEMO_CAMPAIGN, updated_at: new Date().toISOString() };
  }
  return record;
}

export async function getFreeDemoCampaignState(): Promise<FreeDemoCampaignState> {
  const database = await readDatabase();
  const campaign = normalizeCampaign(
    database.free_demo_campaigns.find((item) => item.id === DEFAULT_FREE_DEMO_CAMPAIGN_ID),
  );
  const claimedCount = Math.max(campaign.claimed_count, 0);
  const totalSlots = Math.max(campaign.total_slots, 0);
  const remaining = Math.max(totalSlots - claimedCount, 0);

  return {
    id: campaign.id,
    name: campaign.name,
    isActive: campaign.is_active,
    totalSlots,
    claimedCount,
    remaining,
  };
}

export async function ensureFreeDemoCampaign(): Promise<FreeDemoCampaignRecord> {
  let campaign = DEFAULT_FREE_DEMO_CAMPAIGN;

  await writeDatabase((database) => {
    const existing = database.free_demo_campaigns.find((item) => item.id === DEFAULT_FREE_DEMO_CAMPAIGN_ID);
    if (existing) {
      campaign = existing;
      return database;
    }

    const now = new Date().toISOString();
    campaign = {
      ...DEFAULT_FREE_DEMO_CAMPAIGN,
      created_at: now,
      updated_at: now,
    };

    return {
      ...database,
      free_demo_campaigns: [campaign, ...database.free_demo_campaigns],
    };
  });

  return campaign;
}

export function assertFreeDemoSlotAvailable(campaign: FreeDemoCampaignRecord) {
  if (!campaign.is_active) {
    throw new Error("CAMPAIGN_INACTIVE");
  }
  if (campaign.claimed_count >= campaign.total_slots) {
    throw new Error("CAMPAIGN_FULL");
  }
}

type IncrementFreeDemoClaimedRow = {
  found: boolean;
  incremented: boolean;
  claimed_count: number | null;
  total_slots: number | null;
  is_active: boolean | null;
};

/**
 * Atomically increments claimed_count via a Postgres function (single locked
 * UPDATE), instead of this process reading the row, incrementing in JS, and
 * writing it back. The generic readDatabase()/writeDatabase() path used
 * elsewhere in this domain only serializes writes within one warm Lambda
 * instance — concurrent claims landing on different instances can each read
 * the same starting count and both write back the same incremented value,
 * silently losing a claim. Returns null when the campaign row doesn't exist
 * yet in Supabase, so the caller can fall back to the create-on-write path.
 */
const RPC_MAX_ATTEMPTS = 3;
const RPC_RETRY_BASE_DELAY_MS = 150;

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * This Supabase project's PostgREST pool is capped at 10 connections and this
 * app's writeDatabase()/readDatabase() pattern does several sequential round
 * trips per user action (campaign lookup, the increment itself, the intake
 * record write, a handful of audit-log writes) — under load that pool gets
 * exhausted and PostgREST logs "Warp server error: Thread killed by timeout
 * manager" (observed recurring throughout the day, independent of this fix).
 * A thread killed mid-request means its transaction never committed, so a
 * retry here is a clean redo, not a double-increment, in the dominant case.
 */
async function reserveFreeDemoSlotAtomic(): Promise<FreeDemoCampaignRecord | null> {
  const client = getSupabaseAdminClient();

  let row: IncrementFreeDemoClaimedRow | null | undefined;
  let lastError: { message: string; details: string; hint: string; code: string } | null = null;

  for (let attempt = 1; attempt <= RPC_MAX_ATTEMPTS; attempt += 1) {
    // Deliberately not using .single(): that only sets an Accept header asking
    // PostgREST to coerce the response to one object, and this code should
    // behave the same whether the server honors that or returns the table
    // function's normal row array — parse defensively instead of trusting it.
    const { data, error } = await client.rpc("increment_free_demo_claimed_count", {
      p_campaign_id: DEFAULT_FREE_DEMO_CAMPAIGN_ID,
    });

    if (!error) {
      row = (Array.isArray(data) ? data[0] : data) as IncrementFreeDemoClaimedRow | null | undefined;
      lastError = null;
      break;
    }

    lastError = { message: error.message, details: error.details, hint: error.hint, code: error.code };
    console.warn(`[free-demo-campaign] increment RPC attempt ${attempt}/${RPC_MAX_ATTEMPTS} failed`, lastError);

    if (attempt < RPC_MAX_ATTEMPTS) {
      await delay(RPC_RETRY_BASE_DELAY_MS * attempt);
    }
  }

  if (lastError) {
    console.error("[free-demo-campaign] increment_free_demo_claimed_count RPC failed after retries", lastError);
    throw new Error(`Supabase increment_free_demo_claimed_count failed: ${lastError.message}`);
  }

  if (!row || !row.found) {
    console.warn("[free-demo-campaign] increment RPC returned no matching campaign row", { row });
    return null;
  }

  // This process's cached Supabase snapshot (readDatabase()'s short-lived cache) is
  // now stale — drop it so the next read reflects the increment immediately instead
  // of waiting out the cache TTL.
  invalidateSupabaseDatabaseCache();

  if (!row.incremented) {
    throw new Error(row.is_active ? "CAMPAIGN_FULL" : "CAMPAIGN_INACTIVE");
  }

  console.info("[free-demo-campaign] claimed slot via atomic RPC", {
    claimed_count: row.claimed_count,
    total_slots: row.total_slots,
  });

  return {
    ...DEFAULT_FREE_DEMO_CAMPAIGN,
    claimed_count: row.claimed_count ?? DEFAULT_FREE_DEMO_CAMPAIGN.claimed_count,
    total_slots: row.total_slots ?? DEFAULT_FREE_DEMO_CAMPAIGN.total_slots,
    is_active: row.is_active ?? DEFAULT_FREE_DEMO_CAMPAIGN.is_active,
    updated_at: new Date().toISOString(),
  };
}

export async function reserveFreeDemoSlot(): Promise<FreeDemoCampaignRecord> {
  if (isSupabaseDatabaseConfigured()) {
    const atomicResult = await reserveFreeDemoSlotAtomic();
    if (atomicResult) {
      return atomicResult;
    }
    console.warn("[free-demo-campaign] falling back to read-modify-write path (Supabase configured but no atomic result)");
  }

  let updatedCampaign = DEFAULT_FREE_DEMO_CAMPAIGN;

  await writeDatabase((database) => {
    const campaigns = [...database.free_demo_campaigns];
    const index = campaigns.findIndex((item) => item.id === DEFAULT_FREE_DEMO_CAMPAIGN_ID);
    const current =
      index >= 0
        ? campaigns[index]
        : {
            ...DEFAULT_FREE_DEMO_CAMPAIGN,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          };

    assertFreeDemoSlotAvailable(current);

    updatedCampaign = {
      ...current,
      claimed_count: current.claimed_count + 1,
      updated_at: new Date().toISOString(),
    };

    if (index >= 0) {
      campaigns[index] = updatedCampaign;
    } else {
      campaigns.unshift(updatedCampaign);
    }

    return {
      ...database,
      free_demo_campaigns: campaigns,
    };
  });

  console.info("[free-demo-campaign] claimed slot via read-modify-write fallback", {
    claimed_count: updatedCampaign.claimed_count,
    total_slots: updatedCampaign.total_slots,
  });

  return updatedCampaign;
}
