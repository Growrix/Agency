#!/usr/bin/env node
/**
 * I16 SEO OS — generate vault/host skills + agents + registry patches.
 * Run: node AI-BOS/scripts/i16-seoos-build.mjs
 */
import { mkdirSync, writeFileSync, existsSync, cpSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const AI_BOS = join(__dirname, "..");
const VAULT_SKILLS = join(AI_BOS, ".cursor/skills");
const VAULT_AGENTS = join(AI_BOS, ".cursor/agents");
const HOST_SKILLS = join(AI_BOS, "..", ".cursor/skills");
const HOST_AGENTS = join(AI_BOS, "..", ".cursor/agents");

const AGENTS = [
  {
    id: "AG-GRO-SEO-LEAD-001",
    skill: "seo-lead",
    name: "Chief SEO Officer",
    hb: "HB-GRO-SEOOS-001",
    wf: "WF-GRO-SEO-PROGRAM-001",
    caps: ["CAP-GRO-016", "CAP-GRO-003", "CAP-GRO-014"],
    desc: "SEO OS executive — orchestrates all SEO divisions under CMO; advisory only.",
    executive: true,
  },
  {
    id: "AG-GRO-SEO-INTL-001",
    skill: "mkt-seo-international",
    name: "International SEO",
    hb: "HB-GRO-SEO-INTL-001",
    caps: ["CAP-GRO-003"],
    desc: "Hreflang, localization, country targeting, multi-region SEO.",
  },
  {
    id: "AG-GRO-SEO-AUTO-001",
    skill: "mkt-seo-automation",
    name: "SEO Automation",
    hb: "HB-GRO-SEO-AUTO-001",
    caps: ["CAP-GRO-003"],
    desc: "Scheduled audits, CI SEO gates, crawl automation playbooks.",
  },
  {
    id: "AG-GRO-SEO-ALGO-001",
    skill: "mkt-seo-algorithm-watch",
    name: "Algorithm Watch",
    hb: "HB-GRO-SEO-ALGO-001",
    caps: ["CAP-GRO-003"],
    desc: "Google updates, AI search changes, ranking volatility monitoring.",
  },
];

const SEO_LEAD_HANDOFFS = [
  { to: "AG-GRO-CMO-001", when: "return to marketing executive" },
  { to: "AG-STR-FOUNDER-001", when: "business strategy or cross-department" },
  { to: "AG-GRO-SEO-TECH-001", when: "technical SEO audit or implementation" },
  { to: "AG-GRO-SEO-ON-001", when: "on-page SEO optimization" },
  { to: "AG-GRO-SEO-OFF-001", when: "off-page SEO, links, local SEO" },
  { to: "AG-GRO-SEO-KW-001", when: "keyword research and clusters" },
  { to: "AG-GRO-SEO-GEO-001", when: "AI search / GEO optimization" },
  { to: "AG-GRO-SEO-INTL-001", when: "international / hreflang SEO" },
  { to: "AG-GRO-SEO-AUTO-001", when: "SEO automation and scheduled audits" },
  { to: "AG-GRO-SEO-ALGO-001", when: "algorithm updates and volatility" },
  { to: "AG-GRO-ANALYTICS-001", when: "SEO analytics and Search Console" },
  { to: "AG-GRO-MKT-MEMORY-001", when: "SEO memory and post-mortems" },
  { to: "AG-GRO-ASSET-LIB-001", when: "SEO asset library and templates" },
  { to: "AG-DLV-FE-001", when: "frontend SEO implementation" },
  { to: "AG-DLV-CONTENT-001", when: "site content SEO implementation" },
  { to: "human", when: "Search Console access, DNS, publish, OAuth" },
];

function bindingMd(a) {
  return `# AI-BOS Binding — ${a.name}

**Agent:** \`${a.id}\`  
**Project:** \`PRJ-GRO-MKOS-001\` (SEO OS sub-department)

## Read First

1. \`${a.hb}\`
2. \`AR-GRO-SEOOS-001\`
3. \`RU-AI-BOS-SEOOS-001\`
4. \`ST-GRO-SEO-SCORECARD-001\`
5. \`RU-AI-BOS-HANDOFF-001\` v1.1

## Routing

- SEO executive → \`@seo-lead\`
- Marketing executive → \`@marketing-cmo\`
- Business context → \`@founder-os\`

## Never

Product code from advisory SEO agents; fabricated ranking data.
`;
}

function skillMd(a) {
  if (a.executive) {
    return `---
name: ${a.skill}
description: >-
  ${a.desc} ${a.id}. SEO OS executive under CMO — no coding, no Search Console login without human.
disable-model-invocation: true
---

# ${a.name}

**${a.id}** — Chief SEO Officer for \`PRJ-GRO-MKOS-001\` (sub-department under Marketing OS CMO).

## Read First

1. \`AI-BOS/project-registry/registry.json\` → \`PRJ-GRO-MKOS-001\`
2. \`AR-GRO-SEOOS-001\` — SEO OS hierarchy and authority
3. \`HB-GRO-SEOOS-001\` — this skill implements the Lead handbook
4. \`WF-GRO-SEO-PROGRAM-001\` + \`ST-GRO-SEO-SCORECARD-001\`
5. \`RU-AI-BOS-SEOOS-001\` + \`ST-GRO-MKT-MEMORY-001\`
6. Active project: \`founder-os-memory/projects/<slug>/marketing/seo/meta.json\`

## Role

- **SEO division entry** under CMO for multi-track or ambiguous SEO scope
- Intake → program brief → assign specialist → quality gates → SEO memory → Bangla handoff
- Does **not** replace \`@marketing-cmo\` for full marketing campaigns
- Does **not** write articles or implement code — delegates to specialists

## Session checklist

1. Resolve project slug from CMO handoff or \`active-project.json\`
2. Read \`marketing/seo/meta.json\` and latest scorecard
3. Classify request → single track or full SEO program (\`WF-GRO-SEO-PROGRAM-001\`)
4. Write brief to \`marketing/seo/programs/<id>/brief.md\` before delegating
5. Route to specialist; require evidence-based recommendations
6. Record decision in SEO memory

## Division routing

| Request | Delegate to |
|---------|-------------|
| Technical audit, CWV, schema, crawl | \`@technical-seo\` |
| On-page, content optimization, clusters | \`@on-page-seo\` |
| Backlinks, outreach, local SEO | \`@off-page-seo\` |
| Keyword research | \`@mkt-seo-keyword\` |
| GEO / AI search citations | \`@mkt-seo-geo\` |
| Hreflang, localization, country targeting | \`@mkt-seo-international\` |
| Scheduled audits, CI gates | \`@mkt-seo-automation\` |
| Algorithm updates, volatility | \`@mkt-seo-algorithm-watch\` |
| Search Console / GA4 analytics | \`@mkt-analytics\` |
| SEO memory / assets | \`@mkt-memory-curator\` / \`@mkt-asset-library\` |
| Site implementation | \`@frontend-architect\` / \`@frontend-content-strategist\` |
| Marketing context | \`@marketing-cmo\` |
| Business context | \`@founder-os\` |

## Quality gates

| Gate | Criteria |
|------|----------|
| G1 Program brief | Objective, site scope, primary KPI, deadline on disk |
| G2 Evidence | Recommendations cite audit or data source |
| G3 Scorecard | Primary SEO KPI named before launch recommendation |
| G4 Human | Bangla checklist for Search Console, DNS, publish |

## Output

Artifacts under \`founder-os-memory/projects/<slug>/marketing/seo/\`

## Never

- Edit \`web/\`, \`sites/\`, \`Frontend_Nextjs/\` directly
- Fabricate rankings, traffic, or indexation data
- Bypass CMO on cross-division marketing campaigns

Binding: \`AI-BOS/.cursor/skills/${a.skill}/references/ai-bos-binding.md\`
`;
  }
  const wf = a.wf ? `\n2. \`${a.wf}\`\n3. ` : `\n2. `;
  return `---
name: ${a.skill}
description: >-
  ${a.desc} ${a.id}. SEO OS specialist under @seo-lead — advisory only.
disable-model-invocation: true
---

# ${a.name}

**${a.id}** — SEO OS specialist under \`@seo-lead\`.

## Read First

1. \`${a.hb}\`${wf}\`RU-AI-BOS-SEOOS-001\` + \`ST-GRO-SEO-SCORECARD-001\`
${a.wf ? "4. " : "3. "}\`RU-AI-BOS-HANDOFF-001\` v1.1

## Handoffs

- Executive → \`@seo-lead\`
- Marketing → \`@marketing-cmo\`
- Business context → \`@founder-os\`
- Site implementation → \`@frontend-architect\` / \`@technical-seo\`
- Human: Search Console, DNS, publish (Bangla instructions)

## Output

Artifacts under \`projects/<slug>/marketing/seo/\` + Bangla handoff.

## Never

Write product code; fabricate ranking or traffic data.

Binding: \`AI-BOS/.cursor/skills/${a.skill}/references/ai-bos-binding.md\`
`;
}

function agentMd(a) {
  return `---
name: ${a.skill}
description: ${a.desc}
model: inherit
---

# ${a.name}

**${a.id}** — invoke via \`@${a.skill}\`.

Load skill: \`AI-BOS/.cursor/skills/${a.skill}/SKILL.md\`
`;
}

function writeSkill(a, root) {
  const dir = join(root, a.skill);
  const refDir = join(dir, "references");
  mkdirSync(refDir, { recursive: true });
  writeFileSync(join(dir, "SKILL.md"), skillMd(a));
  writeFileSync(join(refDir, "ai-bos-binding.md"), bindingMd(a));
}

for (const a of AGENTS) {
  writeSkill(a, VAULT_SKILLS);
  writeSkill(a, HOST_SKILLS);
  writeFileSync(join(VAULT_AGENTS, `${a.skill}.md`), agentMd(a));
  writeFileSync(join(HOST_AGENTS, `${a.skill}.md`), agentMd(a));
}

function makeAgentEntry(a) {
  const base = {
    id: a.id,
    name: a.name,
    version: "1.0.0",
    status: "active",
    authority: "advisory",
    capabilities: a.caps,
    consumes: [
      a.hb,
      "AR-GRO-SEOOS-001",
      "HB-GRO-SEO-001",
      "RU-AI-BOS-SEOOS-001",
      "ST-GRO-SEO-SCORECARD-001",
      "ST-GRO-MKT-MEMORY-001",
      "RU-AI-BOS-HANDOFF-001",
      ...(a.wf ? [a.wf] : []),
    ],
    mcp_servers: ["MC-KNW-REGISTRY-001", "MC-KNW-RETRIEVE-001"],
    handoffs: [
      { to: "AG-GRO-SEO-LEAD-001", when: "return to SEO executive" },
      { to: "AG-GRO-CMO-001", when: "return to marketing executive" },
      { to: "AG-STR-FOUNDER-001", when: "business strategy" },
      { to: "human", when: "Search Console, DNS, publish, OAuth" },
    ],
    generates: ["SEO artifacts", "memory records"],
    owner: "Growrixos",
    runtime_projection: `vault-skill:${a.skill}`,
    generated_from: "TP-AGT-001",
    updated: "2026-07-18",
    notes: { division: "seo-os", no_coding: true },
  };
  if (a.executive) {
    base.handoffs = SEO_LEAD_HANDOFFS;
    base.consumes = [
      "HB-GRO-SEOOS-001",
      "AR-GRO-SEOOS-001",
      "HB-GRO-SEO-001",
      "HB-GRO-SEO-GEO-001",
      "WF-GRO-SEO-PROGRAM-001",
      "WF-SEO-AUDIT-001",
      "ST-GRO-SEO-SCORECARD-001",
      "ST-GRO-MKT-MEMORY-001",
      "RU-AI-BOS-SEOOS-001",
      "RU-AI-BOS-MKOS-001",
      "RU-AI-BOS-HANDOFF-001",
    ];
    base.notes = { division: "seo-os-executive", reports_to: "AG-GRO-CMO-001" };
  }
  return base;
}

const agentReg = JSON.parse(readFileSync(join(AI_BOS, "agent-registry/registry.json"), "utf8"));
const existingIds = new Set(agentReg.objects.map((o) => o.id));

for (const a of AGENTS) {
  if (existingIds.has(a.id)) continue;
  agentReg.objects.push(makeAgentEntry(a));
}

// CMO: replace 5 direct SEO handoffs with single SEO Lead handoff
const cmo = agentReg.objects.find((o) => o.id === "AG-GRO-CMO-001");
if (cmo) {
  const seoDirect = new Set([
    "AG-GRO-SEO-TECH-001",
    "AG-GRO-SEO-ON-001",
    "AG-GRO-SEO-OFF-001",
    "AG-GRO-SEO-KW-001",
    "AG-GRO-SEO-GEO-001",
  ]);
  cmo.handoffs = cmo.handoffs.filter((h) => !seoDirect.has(h.to));
  if (!cmo.handoffs.some((h) => h.to === "AG-GRO-SEO-LEAD-001")) {
    cmo.handoffs.splice(1, 0, { to: "AG-GRO-SEO-LEAD-001", when: "SEO department work" });
  }
}

// Wire existing SEO agents to return to SEO Lead
for (const id of ["AG-GRO-SEO-TECH-001", "AG-GRO-SEO-ON-001", "AG-GRO-SEO-OFF-001", "AG-GRO-SEO-KW-001", "AG-GRO-SEO-GEO-001"]) {
  const seo = agentReg.objects.find((o) => o.id === id);
  if (seo) {
    seo.handoffs = seo.handoffs.filter((h) => h.to !== "AG-GRO-CMO-001");
    if (!seo.handoffs.some((h) => h.to === "AG-GRO-SEO-LEAD-001")) {
      seo.handoffs.unshift({ to: "AG-GRO-SEO-LEAD-001", when: "return to SEO executive" });
    }
  }
}

agentReg.last_updated = "2026-07-18";
writeFileSync(join(AI_BOS, "agent-registry/registry.json"), JSON.stringify(agentReg, null, 2));
writeFileSync(
  join(AI_BOS, "agent-registry/agent-index.json"),
  JSON.stringify(
    agentReg.objects.map((o) => ({
      id: o.id,
      name: o.name,
      version: o.version,
      status: o.status,
      authority: o.authority,
      updated: o.updated,
    })),
    null,
    2
  )
);

// Project registry
const prPath = join(AI_BOS, "project-registry/registry.json");
const pr = JSON.parse(readFileSync(prPath, "utf8"));
const mkos = pr.objects.find((o) => o.id === "PRJ-GRO-MKOS-001");
if (mkos) {
  for (const id of ["AG-GRO-SEO-LEAD-001", "AG-GRO-SEO-INTL-001", "AG-GRO-SEO-AUTO-001", "AG-GRO-SEO-ALGO-001"]) {
    if (!mkos.agents.includes(id)) mkos.agents.push(id);
  }
  for (const ko of ["AR-GRO-SEOOS-001", "HB-GRO-SEOOS-001", "RU-AI-BOS-SEOOS-001", "WF-GRO-SEO-PROGRAM-001", "ST-GRO-SEO-SCORECARD-001", "TP-GRO-SEOOS-001", "HB-GRO-SEO-INTL-001", "HB-GRO-SEO-AUTO-001", "HB-GRO-SEO-ALGO-001"]) {
    if (!mkos.consumes.includes(ko)) mkos.consumes.push(ko);
  }
  if (!mkos.capabilities.includes("CAP-GRO-016")) mkos.capabilities.push("CAP-GRO-016");
  mkos.updated = "2026-07-18";
  mkos.notes = { ...mkos.notes, seo_lead: "AG-GRO-SEO-LEAD-001", wiring: "I16 SEO OS" };
}
writeFileSync(prPath, JSON.stringify(pr, null, 2));
writeFileSync(
  join(AI_BOS, "project-registry/project-index.json"),
  JSON.stringify(
    pr.objects.map((o) => ({ id: o.id, name: o.name, version: o.version, status: o.status, updated: o.updated })),
    null,
    2
  )
);

console.log("I16 build: agents", agentReg.objects.length, "skills/agents generated:", AGENTS.length);
