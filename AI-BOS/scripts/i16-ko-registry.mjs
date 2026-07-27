#!/usr/bin/env node
/** Register I16 SEO OS KOs in knowledge-registry/registry.json */
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const AI_BOS = join(__dirname, "..");
const regPath = join(AI_BOS, "knowledge-registry/registry.json");
const reg = JSON.parse(readFileSync(regPath, "utf8"));
const ids = new Set(reg.objects.map((o) => o.id));

const newObjects = [
  { id: "AR-GRO-SEOOS-001", type: "architecture", version: "1.0.0", path: "knowledge/architecture/AR-GRO-SEOOS-001-seo-os-architecture.md", title: "SEO OS Architecture", updated: "2026-07-18" },
  { id: "HB-GRO-SEOOS-001", type: "handbook", version: "1.0.0", path: "knowledge/handbooks/HB-GRO-SEOOS-001-seo-os-lead-handbook.md", title: "SEO OS Lead Handbook", updated: "2026-07-18" },
  { id: "HB-GRO-SEO-INTL-001", type: "handbook", version: "1.0.0", path: "knowledge/handbooks/HB-GRO-SEO-INTL-001-international-seo.md", title: "International SEO Handbook", updated: "2026-07-18" },
  { id: "HB-GRO-SEO-AUTO-001", type: "handbook", version: "1.0.0", path: "knowledge/handbooks/HB-GRO-SEO-AUTO-001-seo-automation.md", title: "SEO Automation Handbook", updated: "2026-07-18" },
  { id: "HB-GRO-SEO-ALGO-001", type: "handbook", version: "1.0.0", path: "knowledge/handbooks/HB-GRO-SEO-ALGO-001-algorithm-watch.md", title: "Algorithm Watch Handbook", updated: "2026-07-18" },
  { id: "WF-GRO-SEO-PROGRAM-001", type: "workflow", version: "1.0.0", path: "knowledge/workflows/WF-GRO-SEO-PROGRAM-001-seo-program-lifecycle.md", title: "SEO Program Lifecycle Workflow", updated: "2026-07-18" },
  { id: "ST-GRO-SEO-SCORECARD-001", type: "standard", version: "1.0.0", path: "knowledge/standards/ST-GRO-SEO-SCORECARD-001-seo-kpi-scorecard.md", title: "SEO KPI Scorecard Standard", updated: "2026-07-18" },
  { id: "RU-AI-BOS-SEOOS-001", type: "rule", version: "1.0.0", path: "knowledge/rules/RU-AI-BOS-SEOOS-001-seo-os-binding.md", title: "SEO OS Binding Rule", updated: "2026-07-18" },
  { id: "TP-GRO-SEOOS-001", type: "template", version: "1.0.0", path: "knowledge/templates/TP-GRO-SEOOS-001-seo-os-project-template.md", title: "SEO OS Project Template", updated: "2026-07-18" },
];

let added = 0;
for (const o of newObjects) {
  if (ids.has(o.id)) continue;
  reg.objects.push({ ...o, status: "active", owner: "AI-BOS" });
  added++;
}

for (const o of reg.objects) {
  if (o.id === "AR-AI-BOS-004") { o.version = "1.3.0"; o.updated = "2026-07-18"; }
  if (o.id === "HB-GRO-SEO-001") { o.version = "1.1.0"; o.updated = "2026-07-18"; }
  if (o.id === "HB-GRO-MKOS-001") { o.version = "1.1.0"; o.updated = "2026-07-18"; }
  if (o.id === "AR-GRO-MKOS-001") { o.version = "1.1.0"; o.updated = "2026-07-18"; }
  if (o.id === "RU-AI-BOS-FOUNDER-001") { o.version = "1.2.0"; o.updated = "2026-07-18"; }
  if (o.id === "RU-AI-BOS-MKOS-001") { o.version = "1.1.0"; o.updated = "2026-07-18"; }
}

reg.last_updated = "2026-07-18";
writeFileSync(regPath, JSON.stringify(reg, null, 2));
console.log("Added KOs:", added, "Total:", reg.objects.length);
