import "server-only";

import { createClient, type SanityClient } from "@sanity/client";

const SANITY_API_VERSION = process.env.SANITY_API_VERSION ?? "2025-01-01";

export function isSanityConfigured(): boolean {
  return Boolean(process.env.SANITY_PROJECT_ID && process.env.SANITY_DATASET);
}

export function getSanityClient(): SanityClient {
  const projectId = process.env.SANITY_PROJECT_ID;
  const dataset = process.env.SANITY_DATASET;

  if (!projectId || !dataset) {
    throw new Error("Sanity is not configured. Set SANITY_PROJECT_ID and SANITY_DATASET.");
  }

  const token = process.env.SANITY_API_TOKEN;

  return createClient({
    projectId,
    dataset,
    apiVersion: SANITY_API_VERSION,
    useCdn: !token,
    token,
    perspective: "published",
  });
}
