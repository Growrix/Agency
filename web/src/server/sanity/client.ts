import "server-only";

import { createClient, type SanityClient } from "@sanity/client";

const SANITY_API_VERSION = process.env.SANITY_API_VERSION ?? "2025-01-01";
const REQUIRED_SANITY_ENV_VARS = ["SANITY_PROJECT_ID", "SANITY_DATASET"] as const;

type SanityClientOptions = {
  preview?: boolean;
};

function getMissingSanityEnvVars() {
  return REQUIRED_SANITY_ENV_VARS.filter((name) => {
    const value = process.env[name];
    return !value || !value.trim();
  });
}

export function isSanityConfigured(): boolean {
  return getMissingSanityEnvVars().length === 0;
}

export function getSanityClient(options: SanityClientOptions = {}): SanityClient {
  const projectId = process.env.SANITY_PROJECT_ID;
  const dataset = process.env.SANITY_DATASET;
  const missingEnvVars = getMissingSanityEnvVars();

  if (!projectId || !dataset || missingEnvVars.length > 0) {
    throw new Error(
      `Sanity is not configured (missing ${missingEnvVars.join(", ")}). Set these values in web/.env.local for local development.`,
    );
  }

  const token = process.env.SANITY_API_TOKEN;
  const preview = options.preview === true;

  return createClient({
    projectId,
    dataset,
    apiVersion: SANITY_API_VERSION,
    useCdn: !preview && !token && process.env.NODE_ENV !== "development",
    token,
    perspective: preview ? "drafts" : "published",
    // 10s: allows Sanity CDN cold-start on first ISR revalidation after deploy.
    // 3s was too tight and caused silent fetch failures in production.
    timeout: 10000,
  });
}
