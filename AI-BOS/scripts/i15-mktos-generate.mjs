#!/usr/bin/env node
/**
 * I15 Marketing OS — generate vault skills, agents, and binding stubs.
 * Run from repo root: node AI-BOS/scripts/i15-mktos-generate.mjs
 */
import { mkdirSync, writeFileSync, existsSync, cpSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const AI_BOS = join(__dirname, "..");
const VAULT_SKILLS = join(AI_BOS, ".cursor/skills");
const VAULT_AGENTS = join(AI_BOS, ".cursor/agents");
const HOST_SKILLS = join(AI_BOS, "..", ".cursor/skills");
const HOST_AGENTS = join(AI_BOS, "..", ".cursor/agents");

const AGENTS = [
  { id: "AG-GRO-CMO-001", skill: "marketing-cmo", name: "Marketing CMO", hb: "HB-GRO-MKOS-001", wf: "WF-GRO-CAMPAIGN-001", caps: ["CAP-GRO-002", "CAP-GRO-011"], desc: "Marketing OS executive — coordinates all marketing divisions; advisory only." },
  { id: "AG-GRO-INTEL-CUST-001", skill: "mkt-customer-research", name: "Customer Research", hb: "HB-GRO-INTEL-001", caps: ["CAP-STR-004", "CAP-GRO-006"], desc: "ICP, personas, buyer journey, VoC." },
  { id: "AG-GRO-INTEL-COMP-001", skill: "mkt-competitor-intel", name: "Competitor Intelligence", hb: "HB-GRO-INTEL-001", caps: ["CAP-STR-004"], desc: "Competitor funnels, pricing, positioning, SEO comparison." },
  { id: "AG-GRO-BRAND-001", skill: "mkt-brand-strategist", name: "Brand Strategist", hb: "HB-GRO-BRAND-001", caps: ["CAP-GRO-006"], desc: "Positioning, messaging, UVP, tone of voice." },
  { id: "AG-GRO-BRAND-GUARD-001", skill: "mkt-brand-guardian", name: "Brand Guardian", hb: "HB-GRO-BRAND-001", caps: ["CAP-GRO-006"], desc: "Brand consistency review across outputs." },
  { id: "AG-GRO-CONTENT-STRAT-001", skill: "mkt-content-strategist", name: "Marketing Content Strategist", hb: "HB-GRO-CONTENT-001", caps: ["CAP-GRO-007"], desc: "Content pillars, clusters, editorial strategy." },
  { id: "AG-GRO-CONTENT-PLAN-001", skill: "mkt-content-planner", name: "Content Planner", hb: "HB-GRO-CONTENT-001", caps: ["CAP-GRO-007"], desc: "Calendars, campaign schedules, launch timelines." },
  { id: "AG-GRO-COPY-001", skill: "mkt-copywriter", name: "Copywriter", hb: "HB-GRO-CONTENT-001", caps: ["CAP-GRO-007"], desc: "Landing pages, ads, emails, sales copy." },
  { id: "AG-GRO-BLOG-001", skill: "mkt-blog-writer", name: "Blog Writer", hb: "HB-GRO-CONTENT-001", caps: ["CAP-GRO-007", "CAP-GRO-003"], desc: "SEO blogs, authority articles, tutorials." },
  { id: "AG-GRO-SOCIAL-WRITE-001", skill: "mkt-social-writer", name: "Social Content Writer", hb: "HB-GRO-SOCIAL-001", caps: ["CAP-GRO-004"], desc: "Platform-native social posts." },
  { id: "AG-GRO-REPURPOSE-001", skill: "mkt-repurposer", name: "Content Repurposer", hb: "HB-GRO-CONTENT-001", caps: ["CAP-GRO-007"], desc: "Blog to social, email, video scripts, lead magnets." },
  { id: "AG-GRO-SEO-KW-001", skill: "mkt-seo-keyword", name: "Keyword Research", hb: "HB-GRO-SEO-001", caps: ["CAP-GRO-003", "CAP-GRO-014"], desc: "Keyword clusters, intent, difficulty." },
  { id: "AG-GRO-SEO-GEO-001", skill: "mkt-seo-geo", name: "AI Search / GEO", hb: "HB-GRO-SEO-GEO-001", caps: ["CAP-GRO-014"], desc: "GEO, entity SEO, AI citation optimization." },
  { id: "AG-GRO-CRO-FUNNEL-001", skill: "mkt-funnel-strategist", name: "Funnel Strategist", hb: "HB-GRO-CRO-001", caps: ["CAP-GRO-010"], desc: "Funnel maps, offers, upsells, flows." },
  { id: "AG-GRO-CRO-001", skill: "mkt-cro", name: "CRO Specialist", hb: "HB-GRO-CRO-001", caps: ["CAP-GRO-010"], desc: "Landing page CRO, CTAs, forms, trust." },
  { id: "AG-GRO-PRICE-001", skill: "mkt-pricing", name: "Pricing Strategist", hb: "HB-GRO-CRO-001", caps: ["CAP-GRO-010", "CAP-OPS-004"], desc: "Pricing tests, packaging, unit economics framing." },
  { id: "AG-GRO-SOCIAL-MGR-001", skill: "mkt-social-manager", name: "Social Media Manager", hb: "HB-GRO-SOCIAL-001", caps: ["CAP-GRO-004"], desc: "Social strategy, cadence, platform mix." },
  { id: "AG-GRO-ADS-PPC-001", skill: "mkt-ads-ppc", name: "PPC Strategist", hb: "HB-GRO-ADS-001", caps: ["CAP-GRO-008"], desc: "Google Ads search, display, shopping, PMax plans." },
  { id: "AG-GRO-ADS-META-001", skill: "mkt-ads-meta", name: "Meta Ads", hb: "HB-GRO-ADS-001", caps: ["CAP-GRO-008"], desc: "Facebook/Instagram ad strategy and creative briefs." },
  { id: "AG-GRO-ADS-LI-001", skill: "mkt-ads-linkedin", name: "LinkedIn Ads", hb: "HB-GRO-ADS-001", caps: ["CAP-GRO-008"], desc: "LinkedIn B2B ad campaigns." },
  { id: "AG-GRO-ADS-RETARGET-001", skill: "mkt-ads-retargeting", name: "Retargeting", hb: "HB-GRO-ADS-001", caps: ["CAP-GRO-008"], desc: "Retargeting audiences and sequences." },
  { id: "AG-GRO-EMAIL-STRAT-001", skill: "mkt-email-strategist", name: "Email Strategist", hb: "HB-GRO-EMAIL-001", caps: ["CAP-GRO-009"], desc: "Lifecycle, sequences, automation plans." },
  { id: "AG-GRO-EMAIL-NEWS-001", skill: "mkt-newsletter-writer", name: "Newsletter Writer", hb: "HB-GRO-EMAIL-001", caps: ["CAP-GRO-009"], desc: "Newsletter content and structure." },
  { id: "AG-GRO-EMAIL-DELIV-001", skill: "mkt-email-deliverability", name: "Email Deliverability", hb: "HB-GRO-EMAIL-001", caps: ["CAP-GRO-009"], desc: "Deliverability, SPF/DKIM guidance, list hygiene." },
  { id: "AG-GRO-ANALYTICS-001", skill: "mkt-analytics", name: "Marketing Analytics", hb: "HB-GRO-ANALYTICS-001", caps: ["CAP-GRO-011"], desc: "GA4, Search Console, CRM analytics interpretation." },
  { id: "AG-GRO-KPI-001", skill: "mkt-kpi", name: "KPI Scorecard", hb: "ST-GRO-SCORECARD-001", caps: ["CAP-GRO-011"], desc: "Scorecards, CAC, LTV, ROAS, CPL tracking." },
  { id: "AG-GRO-EXPERIMENT-001", skill: "mkt-experiment", name: "Experiment Designer", hb: "HB-GRO-ANALYTICS-001", caps: ["CAP-GRO-011"], desc: "A/B tests, hypotheses, results." },
  { id: "AG-GRO-CREATIVE-DIR-001", skill: "mkt-creative-director", name: "Creative Director", hb: "HB-GRO-CREATIVE-001", caps: ["CAP-GRO-012"], desc: "Campaign concepts, creative consistency." },
  { id: "AG-GRO-CREATIVE-BRIEF-001", skill: "mkt-creative-brief", name: "Creative Brief Planner", hb: "HB-GRO-CREATIVE-001", caps: ["CAP-GRO-012"], desc: "Ad layouts, thumbnails, carousel briefs." },
  { id: "AG-GRO-PROMPT-CREATIVE-001", skill: "mkt-creative-prompt", name: "Creative Prompt Engineer", hb: "HB-GRO-CREATIVE-001", caps: ["CAP-GRO-012"], desc: "AI image/video generation prompts." },
  { id: "AG-GRO-VIDEO-STRAT-001", skill: "mkt-video-strategist", name: "Video Strategist", hb: "HB-GRO-VIDEO-001", caps: ["CAP-GRO-012"], desc: "Video funnel, series, campaign video plans." },
  { id: "AG-GRO-VIDEO-SCRIPT-001", skill: "mkt-video-script", name: "Video Script Writer", hb: "HB-GRO-VIDEO-001", caps: ["CAP-GRO-012"], desc: "Reels, YouTube, ad, explainer scripts." },
  { id: "AG-GRO-COMMUNITY-001", skill: "mkt-community", name: "Community Manager", hb: "HB-GRO-COMMUNITY-001", caps: ["CAP-GRO-013"], desc: "Community engagement plans." },
  { id: "AG-GRO-REPUTATION-001", skill: "mkt-reputation", name: "Reputation Manager", hb: "HB-GRO-COMMUNITY-001", caps: ["CAP-GRO-013"], desc: "Reviews, mentions, sentiment monitoring plans." },
  { id: "AG-GRO-MKT-MEMORY-001", skill: "mkt-memory-curator", name: "Marketing Memory Curator", hb: "HB-GRO-MKT-MEMORY-001", caps: ["CAP-GRO-015"], desc: "Campaign history, winners/losers, lessons." },
  { id: "AG-GRO-ASSET-LIB-001", skill: "mkt-asset-library", name: "Asset Library Manager", hb: "HB-GRO-MKT-MEMORY-001", caps: ["CAP-GRO-015"], desc: "Asset index, brand kit refs, templates." },
];

function skillMd(a) {
  const wf = a.wf ? `\n2. \`${a.wf}\`\n3. ` : `\n2. `;
  return `---
name: ${a.skill}
description: >-
  ${a.desc} ${a.id}. Marketing OS advisory — no coding, no ad spend.
disable-model-invocation: true
---

# ${a.name}

**${a.id}** — Marketing OS specialist under \`@marketing-cmo\`.

## Read First

1. \`${a.hb}\`${wf}\`RU-AI-BOS-MKOS-001\` + \`ST-GRO-MKT-MEMORY-001\`
${a.wf ? "4. " : "3. "}\`RU-AI-BOS-HANDOFF-001\` v1.1

## Handoffs

- Executive → \`@marketing-cmo\`
- Business context → \`@founder-os\`
- Site implementation → \`@frontend-architect\` / \`@frontend-content-strategist\`
- Human: ad accounts, spend, publish (Bangla instructions)

## Output

Artifacts on disk under \`projects/<slug>/marketing/\` + memory record + Bangla handoff.

## Never

Write product code; spend ad budget; invent analytics data.
`;
}

function agentMd(a) {
  return `# ${a.name}

**${a.id}** — Marketing OS specialist. Vault skill: \`@marketing-cmo\` orchestrates.

Invoke \`@${a.skill}\` for ${a.name.toLowerCase()} work.

Advisory only — human publishes and pays for ads.
`;
}

function bindingMd(a) {
  return `# AI-BOS Binding — ${a.name}

**Project:** \`PRJ-GRO-MKOS-001\`
**Agent ID:** \`${a.id}\`
**Handbook:** \`${a.hb}\`
**Rule:** \`RU-AI-BOS-MKOS-001\`
`;
}

function writeSkillAgent(a) {
  const skillDir = join(VAULT_SKILLS, a.skill);
  const refDir = join(skillDir, "references");
  mkdirSync(refDir, { recursive: true });
  writeFileSync(join(skillDir, "SKILL.md"), skillMd(a));
  writeFileSync(join(refDir, "ai-bos-binding.md"), bindingMd(a));
  writeFileSync(join(VAULT_AGENTS, `${a.skill}.md`), agentMd(a));
  mkdirSync(join(HOST_SKILLS, a.skill, "references"), { recursive: true });
  writeFileSync(join(HOST_SKILLS, a.skill, "SKILL.md"), skillMd(a));
  writeFileSync(join(HOST_SKILLS, a.skill, "references", "ai-bos-binding.md"), bindingMd(a));
  writeFileSync(join(HOST_AGENTS, `${a.skill}.md`), agentMd(a));
}

for (const a of AGENTS) {
  writeSkillAgent(a);
  console.log("OK", a.id, a.skill);
}

console.log(`Generated ${AGENTS.length} marketing agents/skills.`);
