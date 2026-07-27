#!/usr/bin/env node
/** Register PRJ-GRO-MKOS-001 + wire founder handoff */
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const AI_BOS = join(__dirname, "..");
const prPath = join(AI_BOS, "project-registry/registry.json");
const pr = JSON.parse(readFileSync(prPath, "utf8"));

const mktAgents = [
  "AG-GRO-CMO-001",
  "AG-GRO-MARKET-001",
  "AG-GRO-INTEL-CUST-001", "AG-GRO-INTEL-COMP-001",
  "AG-STR-RESEARCH-001",
  "AG-GRO-BRAND-001", "AG-GRO-BRAND-GUARD-001",
  "AG-GRO-CONTENT-STRAT-001", "AG-GRO-CONTENT-PLAN-001", "AG-GRO-COPY-001",
  "AG-GRO-BLOG-001", "AG-GRO-SOCIAL-WRITE-001", "AG-GRO-REPURPOSE-001",
  "AG-GRO-SEO-TECH-001", "AG-GRO-SEO-ON-001", "AG-GRO-SEO-OFF-001",
  "AG-GRO-SEO-KW-001", "AG-GRO-SEO-GEO-001",
  "AG-GRO-CRO-FUNNEL-001", "AG-GRO-CRO-001", "AG-GRO-PRICE-001",
  "AG-GRO-SOCIAL-MGR-001",
  "AG-GRO-ADS-PPC-001", "AG-GRO-ADS-META-001", "AG-GRO-ADS-LI-001", "AG-GRO-ADS-RETARGET-001",
  "AG-GRO-EMAIL-STRAT-001", "AG-GRO-EMAIL-NEWS-001", "AG-GRO-EMAIL-DELIV-001",
  "AG-GRO-ANALYTICS-001", "AG-GRO-KPI-001", "AG-GRO-EXPERIMENT-001",
  "AG-GRO-CREATIVE-DIR-001", "AG-GRO-CREATIVE-BRIEF-001", "AG-GRO-PROMPT-CREATIVE-001",
  "AG-GRO-VIDEO-STRAT-001", "AG-GRO-VIDEO-SCRIPT-001",
  "AG-GRO-COMMUNITY-001", "AG-GRO-REPUTATION-001",
  "AG-GRO-MKT-MEMORY-001", "AG-GRO-ASSET-LIB-001",
  "AG-GRO-SALES-001",
  "AG-DLV-HTML-LEAD-001", "AG-DLV-CONTENT-001",
];

const mktCaps = [
  "CAP-GRO-002", "CAP-GRO-003", "CAP-GRO-004", "CAP-GRO-006", "CAP-GRO-007",
  "CAP-GRO-008", "CAP-GRO-009", "CAP-GRO-010", "CAP-GRO-011", "CAP-GRO-012",
  "CAP-GRO-013", "CAP-GRO-014", "CAP-GRO-015", "CAP-STR-004", "CAP-OPS-004",
];

const mktConsumes = [
  "AR-GRO-MKOS-001", "AR-AI-BOS-004", "HB-GRO-MKOS-001", "HB-GRO-UNIVERSAL-001",
  "HB-GRO-INTEL-001", "HB-GRO-BRAND-001", "HB-GRO-CONTENT-001", "HB-GRO-MARKET-001",
  "HB-GRO-SEO-001", "HB-GRO-SEO-GEO-001", "HB-GRO-SOCIAL-001", "HB-GRO-ADS-001",
  "HB-GRO-EMAIL-001", "HB-GRO-CRO-001", "HB-GRO-ANALYTICS-001", "HB-GRO-CREATIVE-001",
  "HB-GRO-VIDEO-001", "HB-GRO-COMMUNITY-001", "HB-GRO-MKT-MEMORY-001",
  "ST-GRO-MKT-MEMORY-001", "ST-GRO-SCORECARD-001", "ST-GRO-CLAIMS-001",
  "ST-STR-MEMORY-001", "RU-AI-BOS-MKOS-001", "RU-AI-BOS-HANDOFF-001", "RU-AI-BOS-VAULT-001",
  "WF-GRO-CAMPAIGN-001", "WF-GRO-LAUNCH-001", "TP-GRO-MKOS-001",
];

const mkos = {
  id: "PRJ-GRO-MKOS-001",
  name: "Growrix Marketing OS",
  version: "1.0.0",
  status: "active",
  owner: "human: founder",
  capabilities: mktCaps,
  consumes: mktConsumes,
  agents: mktAgents,
  mcp_servers: ["MC-KNW-REGISTRY-001", "MC-KNW-RETRIEVE-001"],
  workflows: ["WF-GRO-CAMPAIGN-001", "WF-GRO-LAUNCH-001"],
  governance: {
    knowledge_owners: ["AG-KNW-ARCH-001"],
    auditor: "AG-KNW-VALID-001",
    marketing_lead: "AG-GRO-CMO-001",
    parent_project: "PRJ-STR-FOUNDEROS-001",
  },
  runtime_projection: "cursor",
  root_path: "F:/PROJECTS/Growrixos/",
  ledger_path: "F:/PROJECTS/Growrixos/AI-BOS/tasks.md",
  memory_path: "F:/PROJECTS/Growrixos/.cursor/brain/founder-os-memory/projects/<slug>/marketing/",
  generated_from: "TP-GRO-MKOS-001",
  notes: {
    wiring: "I15 Marketing OS E2E",
    primary_agent: "AG-GRO-CMO-001",
    entry_intent: "marketing_intake",
  },
  updated: "2026-07-18",
};

if (!pr.objects.some((o) => o.id === "PRJ-GRO-MKOS-001")) {
  pr.objects.push(mkos);
}

// Founder project: add CMO handoff consumes + agent
const founder = pr.objects.find((o) => o.id === "PRJ-STR-FOUNDEROS-001");
if (founder) {
  founder.version = "1.2.0";
  if (!founder.consumes.includes("AR-GRO-MKOS-001")) founder.consumes.push("AR-GRO-MKOS-001", "HB-GRO-MKOS-001", "RU-AI-BOS-MKOS-001");
  if (!founder.agents.includes("AG-GRO-CMO-001")) founder.agents.push("AG-GRO-CMO-001");
  founder.notes = { ...founder.notes, marketing_handoff: "AG-GRO-CMO-001", wiring: "I15 CMO handoff" };
  founder.updated = "2026-07-18";
}

pr.last_updated = "2026-07-18";
writeFileSync(prPath, JSON.stringify(pr, null, 2));

const index = pr.objects.map((o) => ({
  id: o.id, name: o.name, version: o.version, status: o.status, updated: o.updated,
}));
writeFileSync(join(AI_BOS, "project-registry/project-index.json"), JSON.stringify(index, null, 2));
console.log("Projects:", pr.objects.length);
