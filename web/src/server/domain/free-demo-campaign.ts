import "server-only";

import {
  DEFAULT_FREE_DEMO_CAMPAIGN,
  DEFAULT_FREE_DEMO_CAMPAIGN_ID,
  type FreeDemoCampaignRecord,
} from "@/server/data/schema";
import { readDatabase, writeDatabase } from "@/server/data/store";

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

export async function reserveFreeDemoSlot(): Promise<FreeDemoCampaignRecord> {
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

  return updatedCampaign;
}
