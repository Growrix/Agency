#!/usr/bin/env node
/** Register I17 Engineering OS KOs in knowledge-registry/registry.json */
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const AI_BOS = join(__dirname, "..");
const regPath = join(AI_BOS, "knowledge-registry/registry.json");
const reg = JSON.parse(readFileSync(regPath, "utf8"));
const ids = new Set(reg.objects.map((o) => o.id));

const newObjects = [
  { id: "AR-ENG-SAASOS-001", type: "architecture", version: "1.0.0", path: "knowledge/architecture/AR-ENG-SAASOS-001-engineering-os-architecture.md", title: "Engineering OS Architecture", updated: "2026-07-18" },
  { id: "HB-ENG-CTO-001", type: "handbook", version: "1.0.0", path: "knowledge/handbooks/HB-ENG-CTO-001-engineering-cto-handbook.md", title: "Engineering OS CTO Handbook", updated: "2026-07-18" },
  { id: "HB-ENG-PERF-001", type: "handbook", version: "1.0.0", path: "knowledge/handbooks/HB-ENG-PERF-001-performance-engineering-handbook.md", title: "Performance Engineering Handbook", updated: "2026-07-18" },
  { id: "HB-ENG-DOCS-001", type: "handbook", version: "1.0.0", path: "knowledge/handbooks/HB-ENG-DOCS-001-engineering-documentation-handbook.md", title: "Engineering Documentation Handbook", updated: "2026-07-18" },
  { id: "WF-ENG-PROGRAM-001", type: "workflow", version: "1.0.0", path: "knowledge/workflows/WF-ENG-PROGRAM-001-engineering-program-lifecycle.md", title: "Engineering Program Lifecycle", updated: "2026-07-18" },
  { id: "ST-ENG-SCORECARD-001", type: "standard", version: "1.0.0", path: "knowledge/standards/ST-ENG-SCORECARD-001-engineering-kpi-scorecard.md", title: "Engineering KPI Scorecard", updated: "2026-07-18" },
  { id: "RU-AI-BOS-ENGOS-001", type: "rule", version: "1.0.0", path: "knowledge/rules/RU-AI-BOS-ENGOS-001-engineering-os-binding.md", title: "Engineering OS Binding Rule", updated: "2026-07-18" },
  { id: "TP-ENG-SAASOS-001", type: "template", version: "1.0.0", path: "knowledge/templates/TP-ENG-SAASOS-001-engineering-os-project-template.md", title: "Engineering OS Project Template", updated: "2026-07-18" },
];

let added = 0;
for (const o of newObjects) {
  if (ids.has(o.id)) continue;
  reg.objects.push({ ...o, status: "active", owner: "AI-BOS" });
  added++;
}

for (const o of reg.objects) {
  if (o.id === "AR-AI-BOS-004") { o.version = "1.4.0"; o.updated = "2026-07-18"; }
  if (o.id === "AR-AI-BOS-007") { o.version = "1.2.0"; o.updated = "2026-07-18"; }
  if (o.id === "RU-AI-BOS-FOUNDER-001") { o.version = "1.3.0"; o.updated = "2026-07-18"; }
  if (o.id === "HB-DLV-SAAS-ORCH-001") { o.version = "1.1.0"; o.updated = "2026-07-18"; }
}

reg.last_updated = "2026-07-18";
writeFileSync(regPath, JSON.stringify(reg, null, 2));
console.log("Added KOs:", added, "Total:", reg.objects.length);
