#!/usr/bin/env node
/** Patch agent-registry + knowledge-registry + project-registry for I15 Marketing OS */
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const AI_BOS = join(__dirname, "..");

// Build manifest inline
function makeAgentEntry(a) {
  return {
    id: a.id,
    name: a.name,
    version: "1.0.0",
    status: "active",
    authority: "advisory",
    capabilities: a.caps,
    consumes: [a.hb, "HB-GRO-MKOS-001", "HB-GRO-UNIVERSAL-001", "RU-AI-BOS-MKOS-001", "ST-GRO-MKT-MEMORY-001", "ST-GRO-CLAIMS-001", "RU-AI-BOS-HANDOFF-001", ...(a.wf ? [a.wf] : [])],
    mcp_servers: ["MC-KNW-REGISTRY-001", "MC-KNW-RETRIEVE-001"],
    handoffs: [
      { to: "AG-GRO-CMO-001", when: "return to marketing executive" },
      { to: "AG-STR-FOUNDER-001", when: "business strategy or cross-department" },
      { to: "human", when: "ad spend, ad accounts, publish, OAuth" },
    ],
    generates: ["marketing artifacts", "memory records"],
    owner: "Growrixos",
    runtime_projection: `vault-skill:${a.skill}`,
    generated_from: "TP-AGT-001",
    updated: "2026-07-18",
    notes: { division: a.division, no_coding: true },
  };
}

// Build manifest from generate script data inline
const manifest = [
  { id: "AG-GRO-CMO-001", skill: "marketing-cmo", name: "Marketing CMO", hb: "HB-GRO-MKOS-001", wf: "WF-GRO-CAMPAIGN-001", caps: ["CAP-GRO-002", "CAP-GRO-011"], division: "executive" },
  { id: "AG-GRO-INTEL-CUST-001", skill: "mkt-customer-research", name: "Customer Research", hb: "HB-GRO-INTEL-001", caps: ["CAP-STR-004", "CAP-GRO-006"], division: "intelligence" },
  { id: "AG-GRO-INTEL-COMP-001", skill: "mkt-competitor-intel", name: "Competitor Intelligence", hb: "HB-GRO-INTEL-001", caps: ["CAP-STR-004"], division: "intelligence" },
  { id: "AG-GRO-BRAND-001", skill: "mkt-brand-strategist", name: "Brand Strategist", hb: "HB-GRO-BRAND-001", caps: ["CAP-GRO-006"], division: "brand" },
  { id: "AG-GRO-BRAND-GUARD-001", skill: "mkt-brand-guardian", name: "Brand Guardian", hb: "HB-GRO-BRAND-001", caps: ["CAP-GRO-006"], division: "brand" },
  { id: "AG-GRO-CONTENT-STRAT-001", skill: "mkt-content-strategist", name: "Marketing Content Strategist", hb: "HB-GRO-CONTENT-001", caps: ["CAP-GRO-007"], division: "content" },
  { id: "AG-GRO-CONTENT-PLAN-001", skill: "mkt-content-planner", name: "Content Planner", hb: "HB-GRO-CONTENT-001", caps: ["CAP-GRO-007"], division: "content" },
  { id: "AG-GRO-COPY-001", skill: "mkt-copywriter", name: "Copywriter", hb: "HB-GRO-CONTENT-001", caps: ["CAP-GRO-007"], division: "content" },
  { id: "AG-GRO-BLOG-001", skill: "mkt-blog-writer", name: "Blog Writer", hb: "HB-GRO-CONTENT-001", caps: ["CAP-GRO-007", "CAP-GRO-003"], division: "content" },
  { id: "AG-GRO-SOCIAL-WRITE-001", skill: "mkt-social-writer", name: "Social Content Writer", hb: "HB-GRO-SOCIAL-001", caps: ["CAP-GRO-004"], division: "content" },
  { id: "AG-GRO-REPURPOSE-001", skill: "mkt-repurposer", name: "Content Repurposer", hb: "HB-GRO-CONTENT-001", caps: ["CAP-GRO-007"], division: "content" },
  { id: "AG-GRO-SEO-KW-001", skill: "mkt-seo-keyword", name: "Keyword Research", hb: "HB-GRO-SEO-001", caps: ["CAP-GRO-003", "CAP-GRO-014"], division: "seo" },
  { id: "AG-GRO-SEO-GEO-001", skill: "mkt-seo-geo", name: "AI Search GEO", hb: "HB-GRO-SEO-GEO-001", caps: ["CAP-GRO-014"], division: "seo" },
  { id: "AG-GRO-CRO-FUNNEL-001", skill: "mkt-funnel-strategist", name: "Funnel Strategist", hb: "HB-GRO-CRO-001", caps: ["CAP-GRO-010"], division: "cro" },
  { id: "AG-GRO-CRO-001", skill: "mkt-cro", name: "CRO Specialist", hb: "HB-GRO-CRO-001", caps: ["CAP-GRO-010"], division: "cro" },
  { id: "AG-GRO-PRICE-001", skill: "mkt-pricing", name: "Pricing Strategist", hb: "HB-GRO-CRO-001", caps: ["CAP-GRO-010", "CAP-OPS-004"], division: "cro" },
  { id: "AG-GRO-SOCIAL-MGR-001", skill: "mkt-social-manager", name: "Social Media Manager", hb: "HB-GRO-SOCIAL-001", caps: ["CAP-GRO-004"], division: "social" },
  { id: "AG-GRO-ADS-PPC-001", skill: "mkt-ads-ppc", name: "PPC Strategist", hb: "HB-GRO-ADS-001", caps: ["CAP-GRO-008"], division: "paid" },
  { id: "AG-GRO-ADS-META-001", skill: "mkt-ads-meta", name: "Meta Ads", hb: "HB-GRO-ADS-001", caps: ["CAP-GRO-008"], division: "paid" },
  { id: "AG-GRO-ADS-LI-001", skill: "mkt-ads-linkedin", name: "LinkedIn Ads", hb: "HB-GRO-ADS-001", caps: ["CAP-GRO-008"], division: "paid" },
  { id: "AG-GRO-ADS-RETARGET-001", skill: "mkt-ads-retargeting", name: "Retargeting", hb: "HB-GRO-ADS-001", caps: ["CAP-GRO-008"], division: "paid" },
  { id: "AG-GRO-EMAIL-STRAT-001", skill: "mkt-email-strategist", name: "Email Strategist", hb: "HB-GRO-EMAIL-001", caps: ["CAP-GRO-009"], division: "email" },
  { id: "AG-GRO-EMAIL-NEWS-001", skill: "mkt-newsletter-writer", name: "Newsletter Writer", hb: "HB-GRO-EMAIL-001", caps: ["CAP-GRO-009"], division: "email" },
  { id: "AG-GRO-EMAIL-DELIV-001", skill: "mkt-email-deliverability", name: "Email Deliverability", hb: "HB-GRO-EMAIL-001", caps: ["CAP-GRO-009"], division: "email" },
  { id: "AG-GRO-ANALYTICS-001", skill: "mkt-analytics", name: "Marketing Analytics", hb: "HB-GRO-ANALYTICS-001", caps: ["CAP-GRO-011"], division: "analytics" },
  { id: "AG-GRO-KPI-001", skill: "mkt-kpi", name: "KPI Scorecard", hb: "ST-GRO-SCORECARD-001", caps: ["CAP-GRO-011"], division: "analytics" },
  { id: "AG-GRO-EXPERIMENT-001", skill: "mkt-experiment", name: "Experiment Designer", hb: "HB-GRO-ANALYTICS-001", caps: ["CAP-GRO-011"], division: "analytics" },
  { id: "AG-GRO-CREATIVE-DIR-001", skill: "mkt-creative-director", name: "Creative Director", hb: "HB-GRO-CREATIVE-001", caps: ["CAP-GRO-012"], division: "creative" },
  { id: "AG-GRO-CREATIVE-BRIEF-001", skill: "mkt-creative-brief", name: "Creative Brief Planner", hb: "HB-GRO-CREATIVE-001", caps: ["CAP-GRO-012"], division: "creative" },
  { id: "AG-GRO-PROMPT-CREATIVE-001", skill: "mkt-creative-prompt", name: "Creative Prompt Engineer", hb: "HB-GRO-CREATIVE-001", caps: ["CAP-GRO-012"], division: "creative" },
  { id: "AG-GRO-VIDEO-STRAT-001", skill: "mkt-video-strategist", name: "Video Strategist", hb: "HB-GRO-VIDEO-001", caps: ["CAP-GRO-012"], division: "video" },
  { id: "AG-GRO-VIDEO-SCRIPT-001", skill: "mkt-video-script", name: "Video Script Writer", hb: "HB-GRO-VIDEO-001", caps: ["CAP-GRO-012"], division: "video" },
  { id: "AG-GRO-COMMUNITY-001", skill: "mkt-community", name: "Community Manager", hb: "HB-GRO-COMMUNITY-001", caps: ["CAP-GRO-013"], division: "community" },
  { id: "AG-GRO-REPUTATION-001", skill: "mkt-reputation", name: "Reputation Manager", hb: "HB-GRO-COMMUNITY-001", caps: ["CAP-GRO-013"], division: "community" },
  { id: "AG-GRO-MKT-MEMORY-001", skill: "mkt-memory-curator", name: "Marketing Memory Curator", hb: "HB-GRO-MKT-MEMORY-001", caps: ["CAP-GRO-015"], division: "memory" },
  { id: "AG-GRO-ASSET-LIB-001", skill: "mkt-asset-library", name: "Asset Library Manager", hb: "HB-GRO-MKT-MEMORY-001", caps: ["CAP-GRO-015"], division: "memory" },
];

// CMO handoffs
const cmoHandoffs = [
  { to: "AG-STR-FOUNDER-001", when: "business strategy or cross-department" },
  { to: "AG-GRO-INTEL-CUST-001", when: "customer research" },
  { to: "AG-GRO-INTEL-COMP-001", when: "competitor intelligence" },
  { to: "AG-STR-RESEARCH-001", when: "market research (founder lane)" },
  { to: "AG-GRO-BRAND-001", when: "brand strategy" },
  { to: "AG-GRO-BRAND-GUARD-001", when: "brand review" },
  { to: "AG-GRO-MARKET-001", when: "offer and funnel design" },
  { to: "AG-GRO-CONTENT-STRAT-001", when: "content strategy" },
  { to: "AG-GRO-CONTENT-PLAN-001", when: "content calendar" },
  { to: "AG-GRO-COPY-001", when: "copywriting" },
  { to: "AG-GRO-BLOG-001", when: "blog content" },
  { to: "AG-GRO-SOCIAL-WRITE-001", when: "social posts" },
  { to: "AG-GRO-REPURPOSE-001", when: "content repurposing" },
  { to: "AG-GRO-SEO-TECH-001", when: "technical SEO" },
  { to: "AG-GRO-SEO-ON-001", when: "on-page SEO" },
  { to: "AG-GRO-SEO-OFF-001", when: "off-page SEO" },
  { to: "AG-GRO-SEO-KW-001", when: "keyword research" },
  { to: "AG-GRO-SEO-GEO-001", when: "AI search / GEO" },
  { to: "AG-GRO-CRO-FUNNEL-001", when: "funnel design" },
  { to: "AG-GRO-CRO-001", when: "conversion optimization" },
  { to: "AG-GRO-PRICE-001", when: "pricing strategy" },
  { to: "AG-GRO-SOCIAL-MGR-001", when: "social strategy" },
  { to: "AG-GRO-ADS-PPC-001", when: "Google ads" },
  { to: "AG-GRO-ADS-META-001", when: "Meta ads" },
  { to: "AG-GRO-ADS-LI-001", when: "LinkedIn ads" },
  { to: "AG-GRO-ADS-RETARGET-001", when: "retargeting" },
  { to: "AG-GRO-EMAIL-STRAT-001", when: "email strategy" },
  { to: "AG-GRO-EMAIL-NEWS-001", when: "newsletter" },
  { to: "AG-GRO-EMAIL-DELIV-001", when: "deliverability" },
  { to: "AG-GRO-ANALYTICS-001", when: "analytics" },
  { to: "AG-GRO-KPI-001", when: "KPI scorecard" },
  { to: "AG-GRO-EXPERIMENT-001", when: "experiments" },
  { to: "AG-GRO-CREATIVE-DIR-001", when: "creative direction" },
  { to: "AG-GRO-CREATIVE-BRIEF-001", when: "creative briefs" },
  { to: "AG-GRO-PROMPT-CREATIVE-001", when: "AI creative prompts" },
  { to: "AG-GRO-VIDEO-STRAT-001", when: "video strategy" },
  { to: "AG-GRO-VIDEO-SCRIPT-001", when: "video scripts" },
  { to: "AG-GRO-COMMUNITY-001", when: "community" },
  { to: "AG-GRO-REPUTATION-001", when: "reputation" },
  { to: "AG-GRO-MKT-MEMORY-001", when: "marketing memory" },
  { to: "AG-GRO-ASSET-LIB-001", when: "asset library" },
  { to: "AG-GRO-SALES-001", when: "sales handoff" },
  { to: "AG-DLV-HTML-LEAD-001", when: "landing page build" },
  { to: "AG-DLV-CONTENT-001", when: "site content implementation" },
  { to: "human", when: "ad spend, accounts, publish" },
];

const agentReg = JSON.parse(readFileSync(join(AI_BOS, "agent-registry/registry.json"), "utf8"));
const existingIds = new Set(agentReg.objects.map((o) => o.id));

for (const a of manifest) {
  if (existingIds.has(a.id)) continue;
  const entry = makeAgentEntry(a);
  if (a.id === "AG-GRO-CMO-001") {
    entry.handoffs = cmoHandoffs;
    entry.consumes = [
      "HB-GRO-MKOS-001", "HB-GRO-UNIVERSAL-001", "WF-GRO-CAMPAIGN-001", "WF-GRO-LAUNCH-001",
      "ST-GRO-MKT-MEMORY-001", "ST-GRO-SCORECARD-001", "ST-GRO-CLAIMS-001",
      "RU-AI-BOS-MKOS-001", "RU-AI-BOS-HANDOFF-001", "AR-GRO-MKOS-001",
    ];
    entry.capabilities = ["CAP-GRO-002", "CAP-GRO-011", "CAP-GRO-015"];
  }
  agentReg.objects.push(entry);
}

// Update founder handoff to CMO
const founder = agentReg.objects.find((o) => o.id === "AG-STR-FOUNDER-001");
if (founder && !founder.handoffs.some((h) => h.to === "AG-GRO-CMO-001")) {
  founder.handoffs.unshift({ to: "AG-GRO-CMO-001", when: "marketing department work" });
}

// Update AG-GRO-MARKET-001 under CMO
const market = agentReg.objects.find((o) => o.id === "AG-GRO-MARKET-001");
if (market) {
  market.handoffs = [
    { to: "AG-GRO-CMO-001", when: "return to marketing executive" },
    { to: "AG-GRO-SALES-001", when: "offer ready for pipeline" },
    { to: "AG-GRO-SEO-TECH-001", when: "technical SEO execution" },
    { to: "AG-STR-FOUNDER-001", when: "return to business orchestrator" },
  ];
  market.notes = { division: "offer-funnel", reports_to: "AG-GRO-CMO-001" };
}

// Wire SEO under CMO
for (const id of ["AG-GRO-SEO-TECH-001", "AG-GRO-SEO-ON-001", "AG-GRO-SEO-OFF-001"]) {
  const seo = agentReg.objects.find((o) => o.id === id);
  if (seo && !seo.handoffs.some((h) => h.to === "AG-GRO-CMO-001")) {
    seo.handoffs.unshift({ to: "AG-GRO-CMO-001", when: "return to marketing executive" });
  }
}

agentReg.last_updated = "2026-07-18";
writeFileSync(join(AI_BOS, "agent-registry/registry.json"), JSON.stringify(agentReg, null, 2));

// agent-index
const index = agentReg.objects.map((o) => ({
  id: o.id,
  name: o.name,
  version: o.version,
  status: o.status,
  authority: o.authority,
  updated: o.updated,
}));
writeFileSync(join(AI_BOS, "agent-registry/agent-index.json"), JSON.stringify(index, null, 2));

console.log("Agents total:", agentReg.objects.length);
