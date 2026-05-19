#!/usr/bin/env node

import process from "node:process";
import { randomUUID } from "node:crypto";
import { createClient } from "@sanity/client";

const DEFAULT_PROJECT_ID = "1tk4ulcx";
const DEFAULT_DATASET = "production";

function parseArgs(argv) {
  return {
    dryRun: argv.includes("--dry-run"),
  };
}

function toKey() {
  return randomUUID().replace(/-/g, "").slice(0, 12);
}

function ensureObjectArrayKeys(input) {
  if (!Array.isArray(input)) {
    return { changed: false, value: input };
  }

  let changed = false;
  const next = input.map((item) => {
    if (!item || typeof item !== "object" || Array.isArray(item)) {
      return item;
    }

    const existing = String(item._key ?? "").trim();
    if (existing) {
      return item;
    }

    changed = true;
    return { ...item, _key: toKey() };
  });

  return { changed, value: next };
}

async function main() {
  const args = parseArgs(process.argv.slice(2));

  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? process.env.SANITY_PROJECT_ID ?? DEFAULT_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? process.env.SANITY_DATASET ?? DEFAULT_DATASET;
  const token = process.env.SANITY_API_TOKEN;

  if (!args.dryRun && !token) {
    throw new Error("SANITY_API_TOKEN is required for write mode. Use --dry-run for preview.");
  }

  const client = createClient({
    projectId,
    dataset,
    apiVersion: "2025-02-19",
    useCdn: false,
    token,
  });

  const documents = await client.fetch(
    `*[_type in ["shopItem", "caseStudy"]]{
      _id,
      _type,
      highlights,
      build,
      results
    }`,
  );

  let scanned = 0;
  let changedCount = 0;

  for (const doc of documents) {
    scanned += 1;

    const highlightsFix = ensureObjectArrayKeys(doc.highlights);
    const buildFix = ensureObjectArrayKeys(doc.build);
    const resultsFix = ensureObjectArrayKeys(doc.results);

    const hasChange = highlightsFix.changed || buildFix.changed || resultsFix.changed;
    if (!hasChange) {
      continue;
    }

    changedCount += 1;

    if (args.dryRun) {
      console.log(`[dry-run] ${doc._id} (${doc._type}) -> missing array keys found`);
      continue;
    }

    const patchPayload = {};
    if (highlightsFix.changed) patchPayload.highlights = highlightsFix.value;
    if (buildFix.changed) patchPayload.build = buildFix.value;
    if (resultsFix.changed) patchPayload.results = resultsFix.value;

    await client.patch(doc._id).set(patchPayload).commit();
    console.log(`Updated ${doc._id} (${doc._type})`);
  }

  const mode = args.dryRun ? "dry-run" : "write";
  console.log(`Completed ${mode}: scanned=${scanned}, changed=${changedCount}`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
});
