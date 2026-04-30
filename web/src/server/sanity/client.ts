import "server-only";

import { createClient, type SanityClient } from "@sanity/client";

const SANITY_API_VERSION = process.env.SANITY_API_VERSION ?? "2025-01-01";

type SanityClientOptions = {
  preview?: boolean;
};

export function isSanityConfigured(): boolean {
  return Boolean(process.env.SANITY_PROJECT_ID && process.env.SANITY_DATASET);
}

export function getSanityClient(options: SanityClientOptions = {}): SanityClient {
  const projectId = process.env.SANITY_PROJECT_ID;
  const dataset = process.env.SANITY_DATASET;

  if (!projectId || !dataset) {
    throw new Error("Sanity is not configured. Set SANITY_PROJECT_ID and SANITY_DATASET.");
  }

  const token = process.env.SANITY_API_TOKEN;
  const preview = options.preview === true;

  return createClient({
    projectId,
    dataset,
    apiVersion: SANITY_API_VERSION,
    useCdn: !preview && !token,
    token,
    perspective: preview ? "drafts" : "published",
    // 10s: allows Sanity CDN cold-start on first ISR revalidation after deploy.
    // 3s was too tight and caused silent fetch failures in production.
    timeout: 10000,
  });
}
