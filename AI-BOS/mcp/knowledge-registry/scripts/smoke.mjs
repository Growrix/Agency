#!/usr/bin/env node
/** Smoke test for MC-KNW-REGISTRY-001 — runs validate + search without MCP host. */
import { readFileSync, existsSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const AI_BOS_ROOT = resolve(__dirname, "../../..");
const REGISTRY_PATH = join(AI_BOS_ROOT, "knowledge-registry/registry.json");

function main() {
  const reg = JSON.parse(readFileSync(REGISTRY_PATH, "utf8"));
  const objects = reg.objects ?? [];
  console.log(`Registry objects: ${objects.length}`);

  const sample = objects.find((o) => o.id === "RU-AI-BOS-UNI-001");
  if (!sample) {
    console.error("FAIL: RU-AI-BOS-UNI-001 not in registry");
    process.exit(1);
  }

  const koPath = join(AI_BOS_ROOT, sample.path);
  if (!existsSync(koPath)) {
    console.error("FAIL: KO file missing:", sample.path);
    process.exit(1);
  }

  const htmlHits = objects.filter(
    (o) => o.id.includes("HTML") || (o.title ?? "").toLowerCase().includes("html")
  );
  console.log(`HTML-related KOs: ${htmlHits.length}`);

  const universalReadme = join(AI_BOS_ROOT, "universal/README.md");
  if (!existsSync(universalReadme)) {
    console.error("FAIL: universal/README.md missing");
    process.exit(1);
  }

  console.log("SMOKE OK — registry readable, domain packs present, universal/ exists");
}

main();
