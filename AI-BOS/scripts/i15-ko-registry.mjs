#!/usr/bin/env node
/** Append I15 KOs to knowledge-registry/registry.json if missing */
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const AI_BOS = join(__dirname, "..");
const regPath = join(AI_BOS, "knowledge-registry/registry.json");
const reg = JSON.parse(readFileSync(regPath, "utf8"));
const ids = new Set(reg.objects.map((o) => o.id));

const newObjects = [
  { id: "AR-GRO-MKOS-001", type: "architecture", version: "1.0.0", path: "knowledge/architecture/AR-GRO-MKOS-001-marketing-os-architecture.md", title: "Marketing OS Architecture", updated: "2026-07-18" },
  { id: "HB-GRO-MKOS-001", type: "handbook", version: "1.0.0", path: "knowledge/handbooks/HB-GRO-MKOS-001-marketing-os-handbook.md", title: "Marketing OS Handbook", updated: "2026-07-18" },
  { id: "HB-GRO-UNIVERSAL-001", type: "handbook", version: "1.0.0", path: "knowledge/handbooks/HB-GRO-UNIVERSAL-001-marketing-universal-rules.md", title: "Marketing Universal Rules", updated: "2026-07-18" },
  { id: "HB-GRO-INTEL-001", type: "handbook", version: "1.0.0", path: "knowledge/handbooks/HB-GRO-INTEL-001-marketing-intelligence.md", title: "Marketing Intelligence Handbook", updated: "2026-07-18" },
  { id: "HB-GRO-BRAND-001", type: "handbook", version: "1.0.0", path: "knowledge/handbooks/HB-GRO-BRAND-001-marketing-brand.md", title: "Marketing Brand Handbook", updated: "2026-07-18" },
  { id: "HB-GRO-CONTENT-001", type: "handbook", version: "1.0.0", path: "knowledge/handbooks/HB-GRO-CONTENT-001-marketing-content.md", title: "Marketing Content Handbook", updated: "2026-07-18" },
  { id: "HB-GRO-SEO-GEO-001", type: "handbook", version: "1.0.0", path: "knowledge/handbooks/HB-GRO-SEO-GEO-001-marketing-geo.md", title: "AI Search GEO Handbook", updated: "2026-07-18" },
  { id: "HB-GRO-SOCIAL-001", type: "handbook", version: "1.0.0", path: "knowledge/handbooks/HB-GRO-SOCIAL-001-marketing-social.md", title: "Marketing Social Handbook", updated: "2026-07-18" },
  { id: "HB-GRO-ADS-001", type: "handbook", version: "1.0.0", path: "knowledge/handbooks/HB-GRO-ADS-001-marketing-paid-ads.md", title: "Marketing Paid Ads Handbook", updated: "2026-07-18" },
  { id: "HB-GRO-EMAIL-001", type: "handbook", version: "1.0.0", path: "knowledge/handbooks/HB-GRO-EMAIL-001-marketing-email.md", title: "Marketing Email Handbook", updated: "2026-07-18" },
  { id: "HB-GRO-CRO-001", type: "handbook", version: "1.0.0", path: "knowledge/handbooks/HB-GRO-CRO-001-marketing-cro.md", title: "Marketing CRO Handbook", updated: "2026-07-18" },
  { id: "HB-GRO-ANALYTICS-001", type: "handbook", version: "1.0.0", path: "knowledge/handbooks/HB-GRO-ANALYTICS-001-marketing-analytics.md", title: "Marketing Analytics Handbook", updated: "2026-07-18" },
  { id: "HB-GRO-CREATIVE-001", type: "handbook", version: "1.0.0", path: "knowledge/handbooks/HB-GRO-CREATIVE-001-marketing-creative.md", title: "Marketing Creative Handbook", updated: "2026-07-18" },
  { id: "HB-GRO-VIDEO-001", type: "handbook", version: "1.0.0", path: "knowledge/handbooks/HB-GRO-VIDEO-001-marketing-video.md", title: "Marketing Video Handbook", updated: "2026-07-18" },
  { id: "HB-GRO-COMMUNITY-001", type: "handbook", version: "1.0.0", path: "knowledge/handbooks/HB-GRO-COMMUNITY-001-marketing-community.md", title: "Marketing Community Handbook", updated: "2026-07-18" },
  { id: "HB-GRO-MKT-MEMORY-001", type: "handbook", version: "1.0.0", path: "knowledge/handbooks/HB-GRO-MKT-MEMORY-001-marketing-memory.md", title: "Marketing Memory Handbook", updated: "2026-07-18" },
  { id: "RU-AI-BOS-MKOS-001", type: "rule", version: "1.0.0", path: "knowledge/rules/RU-AI-BOS-MKOS-001-marketing-os-binding.md", title: "Marketing OS Binding Rule", updated: "2026-07-18" },
  { id: "ST-GRO-MKT-MEMORY-001", type: "standard", version: "1.0.0", path: "knowledge/standards/ST-GRO-MKT-MEMORY-001-marketing-memory-layout.md", title: "Marketing Memory Layout Standard", updated: "2026-07-18" },
  { id: "ST-GRO-SCORECARD-001", type: "standard", version: "1.0.0", path: "knowledge/standards/ST-GRO-SCORECARD-001-marketing-kpi-scorecard.md", title: "Marketing KPI Scorecard Standard", updated: "2026-07-18" },
  { id: "ST-GRO-CLAIMS-001", type: "standard", version: "1.0.0", path: "knowledge/standards/ST-GRO-CLAIMS-001-marketing-claims-compliance.md", title: "Marketing Claims Compliance Standard", updated: "2026-07-18" },
  { id: "WF-GRO-CAMPAIGN-001", type: "workflow", version: "1.0.0", path: "knowledge/workflows/WF-GRO-CAMPAIGN-001-marketing-campaign-lifecycle.md", title: "Marketing Campaign Lifecycle Workflow", updated: "2026-07-18" },
  { id: "WF-GRO-LAUNCH-001", type: "workflow", version: "1.0.0", path: "knowledge/workflows/WF-GRO-LAUNCH-001-marketing-gtm-launch.md", title: "Marketing GTM Launch Workflow", updated: "2026-07-18" },
  { id: "TP-GRO-MKOS-001", type: "template", version: "1.0.0", path: "knowledge/templates/TP-GRO-MKOS-001-marketing-os-project-template.md", title: "Marketing OS Project Template", updated: "2026-07-18" },
];

let added = 0;
for (const o of newObjects) {
  if (ids.has(o.id)) continue;
  reg.objects.push({ ...o, status: "active", owner: "AI-BOS" });
  added++;
}

// Bump versions
for (const o of reg.objects) {
  if (o.id === "AR-AI-BOS-004") { o.version = "1.2.0"; o.updated = "2026-07-18"; }
  if (o.id === "HB-GRO-MARKET-001") { o.version = "1.1.0"; o.updated = "2026-07-18"; }
  if (o.id === "RU-AI-BOS-FOUNDER-001") { o.version = "1.1.0"; o.updated = "2026-07-18"; }
}

writeFileSync(regPath, JSON.stringify(reg, null, 2));
console.log("Added KOs:", added, "Total:", reg.objects.length);
