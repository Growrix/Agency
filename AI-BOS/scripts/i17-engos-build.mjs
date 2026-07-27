#!/usr/bin/env node
/**
 * I17 Engineering OS — generate vault/host skills + agents + registry patches.
 */
import { mkdirSync, writeFileSync, readFileSync } from "node:fs";
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
    id: "AG-ENG-CTO-001",
    skill: "engineering-cto",
    name: "Chief Technology Officer",
    hb: "HB-ENG-CTO-001",
    wf: "WF-ENG-PROGRAM-001",
    caps: ["CAP-ENG-001", "CAP-DLV-001", "CAP-DLV-004", "CAP-DLV-005"],
    desc: "Engineering OS executive — orchestrates SaaS, HTML, and Next.js delivery under Founder OS.",
    executive: true,
  },
  {
    id: "AG-ENG-PERF-001",
    skill: "eng-performance",
    name: "Performance Engineering",
    hb: "HB-ENG-PERF-001",
    caps: ["CAP-DLV-001", "CAP-OPS-002"],
    desc: "Latency, CWV, bundle size, DB query optimization, scalability, cost.",
  },
  {
    id: "AG-ENG-DOCS-001",
    skill: "eng-documentation",
    name: "Engineering Documentation",
    hb: "HB-ENG-DOCS-001",
    caps: ["CAP-KNW-001", "CAP-DLV-001"],
    desc: "Architecture docs, API docs, runbooks, changelogs, ADRs.",
  },
];

const CTO_HANDOFFS = [
  { to: "AG-STR-FOUNDER-001", when: "business strategy or cross-department" },
  { to: "AG-GRO-CMO-001", when: "marketing department coordination" },
  { to: "AG-DLV-SAAS-001", when: "full-stack SaaS delivery (web/)" },
  { to: "AG-DLV-HTML-LEAD-001", when: "HTML template delivery (sites/)" },
  { to: "AG-DLV-NEXT-LEAD-001", when: "Next.js migration (Frontend_Nextjs/)" },
  { to: "AG-DLV-FE-001", when: "frontend-only SaaS work" },
  { to: "AG-DLV-BE-001", when: "backend-only SaaS work" },
  { to: "AG-DLV-API-001", when: "API contract design" },
  { to: "AG-DLV-INT-001", when: "integration provider wiring" },
  { to: "AG-DLV-DEVOPS-001", when: "CI/CD, release, env" },
  { to: "AG-DLV-QA-001", when: "frontend phase-end gate" },
  { to: "AG-DLV-QA-BE-001", when: "backend phase-end gate" },
  { to: "AG-ENG-PERF-001", when: "performance engineering" },
  { to: "AG-ENG-DOCS-001", when: "engineering documentation" },
  { to: "AG-GOV-SYSBUILD-001", when: "agent system / vault structure" },
  { to: "AG-GRO-MKT-MEMORY-001", when: "engineering memory and ADRs" },
  { to: "human", when: "production deploy, secrets, OAuth, payments" },
];

const DLV_LEADS = ["AG-DLV-SAAS-001", "AG-DLV-HTML-LEAD-001", "AG-DLV-NEXT-LEAD-001"];

function bindingMd(a) {
  return `# AI-BOS Binding — ${a.name}

**Agent:** \`${a.id}\`  
**Project:** \`PRJ-ENG-SAASOS-001\`

## Read First

1. \`${a.hb}\`
2. \`AR-ENG-SAASOS-001\`
3. \`RU-AI-BOS-ENGOS-001\`
4. \`ST-ENG-SCORECARD-001\`
5. \`RU-AI-BOS-HANDOFF-001\` v1.1

## Routing

- Engineering executive → \`@engineering-cto\`
- Business context → \`@founder-os\`
- Marketing → \`@marketing-cmo\`

## Never

Skip phase-end gates; deploy to production without human approval.
`;
}

function skillMd(a) {
  if (a.executive) {
    return `---
name: ${a.skill}
description: >-
  ${a.desc} ${a.id}. Engineering OS executive under Founder — coordinates delivery; does not replace specialists.
disable-model-invocation: true
---

# ${a.name}

**${a.id}** — Chief Technology Officer for \`PRJ-ENG-SAASOS-001\` (peer to Marketing OS CMO).

## Read First

1. \`AI-BOS/project-registry/registry.json\` → \`PRJ-ENG-SAASOS-001\`
2. \`AR-ENG-SAASOS-001\`
3. \`HB-ENG-CTO-001\`
4. \`WF-ENG-PROGRAM-001\` + \`ST-ENG-SCORECARD-001\`
5. \`RU-AI-BOS-ENGOS-001\`
6. Active project: \`founder-os-memory/projects/<slug>/engineering/meta.json\`

## Role

- **Engineering department entry** under Founder for multi-track or ambiguous engineering scope
- Intake → program brief → assign delivery lead or specialist → quality gates → engineering memory
- Does **not** replace \`@senior-saas-developer\` for cross-layer web/ execution
- Does **not** write all code personally — delegates to delivery agents

## Session checklist

1. Resolve project slug from Founder handoff or \`active-project.json\`
2. Read \`engineering/meta.json\` and latest scorecard
3. Classify: SaaS (web/) vs HTML (sites/) vs Next (Frontend_Nextjs/) vs multi-track
4. Write brief to \`engineering/programs/<id>/brief.md\` before delegating
5. Route to delivery lead; require phase-end gates before sign-off

## Division routing

| Request | Delegate to |
|---------|-------------|
| Full-stack SaaS (web/) | \`@senior-saas-developer\` |
| Frontend-only SaaS | \`@senior-frontend-specialist\` |
| Backend / API / data | \`@senior-backend-devops-developer\` |
| API contracts | \`@api-contract-architect\` |
| Integrations (Stripe, Clerk, etc.) | \`@integration-platform-engineer\` |
| HTML templates | \`@frontend-architect\` |
| Next.js migration | \`@nextjs-migration-architect\` |
| Performance / CWV / cost | \`@eng-performance\` |
| Docs / ADRs / runbooks | \`@eng-documentation\` |
| DevOps / CI / release | \`@devops-release-engineer\` |
| Frontend QA gate | \`@frontend-quality-enforcer\` |
| Backend QA gate | \`@backend-quality-enforcer\` |
| Marketing coordination | \`@marketing-cmo\` |
| Business context | \`@founder-os\` |

## Quality gates

| Gate | Criteria |
|------|----------|
| G1 Program brief | Scope, tracks, primary KPI, deadline on disk |
| G2 Contract-first | API/schema before cross-layer implementation |
| G3 Phase-end | Quality enforcer pass before phase sign-off |
| G4 Human | Bangla checklist for prod deploy, secrets, OAuth |

## Output

Artifacts under \`founder-os-memory/projects/<slug>/engineering/\`

## Never

- Skip \`@frontend-quality-enforcer\` / \`@backend-quality-enforcer\` at phase end
- Deploy to production without human approval
- Bypass delivery leads on lane-specific work

Binding: \`AI-BOS/.cursor/skills/${a.skill}/references/ai-bos-binding.md\`
`;
  }
  const wf = a.wf ? `\n2. \`${a.wf}\`\n3. ` : `\n2. `;
  return `---
name: ${a.skill}
description: >-
  ${a.desc} ${a.id}. Engineering OS specialist under @engineering-cto.
disable-model-invocation: true
---

# ${a.name}

**${a.id}** — Engineering OS specialist under \`@engineering-cto\`.

## Read First

1. \`${a.hb}\`${wf}\`RU-AI-BOS-ENGOS-001\` + \`ST-ENG-SCORECARD-001\`
${a.wf ? "4. " : "3. "}\`RU-AI-BOS-HANDOFF-001\` v1.1

## Handoffs

- Executive → \`@engineering-cto\`
- Business → \`@founder-os\`
- Delivery → lane-specific agents per brief
- Human: production deploy, secrets (Bangla instructions)

## Output

Artifacts under \`projects/<slug>/engineering/\` + Bangla handoff.

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
  mkdirSync(join(dir, "references"), { recursive: true });
  writeFileSync(join(dir, "SKILL.md"), skillMd(a));
  writeFileSync(join(dir, "references", "ai-bos-binding.md"), bindingMd(a));
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
      "AR-ENG-SAASOS-001",
      "RU-AI-BOS-ENGOS-001",
      "ST-ENG-SCORECARD-001",
      "RU-AI-BOS-HANDOFF-001",
      ...(a.wf ? [a.wf] : []),
    ],
    mcp_servers: ["MC-KNW-REGISTRY-001", "MC-KNW-RETRIEVE-001", "MC-PLT-CODEBASE-001"],
    handoffs: [
      { to: "AG-ENG-CTO-001", when: "return to engineering executive" },
      { to: "AG-STR-FOUNDER-001", when: "business strategy" },
      { to: "human", when: "production deploy, secrets, OAuth" },
    ],
    generates: ["engineering artifacts", "memory records"],
    owner: "Growrixos",
    runtime_projection: `vault-skill:${a.skill}`,
    generated_from: "TP-AGT-001",
    updated: "2026-07-18",
    notes: { division: "engineering-os", no_coding: a.executive ? true : false },
  };
  if (a.executive) {
    base.handoffs = CTO_HANDOFFS;
    base.consumes = [
      "HB-ENG-CTO-001",
      "AR-ENG-SAASOS-001",
      "HB-DLV-SAAS-ORCH-001",
      "HB-ENG-ARCH-001",
      "WF-ENG-PROGRAM-001",
      "WF-DLV-SAAS-FEATURE-001",
      "ST-ENG-SCORECARD-001",
      "RU-AI-BOS-ENGOS-001",
      "RU-AI-BOS-SAAS-001",
      "RU-AI-BOS-HANDOFF-001",
    ];
    base.notes = { division: "engineering-os-executive", reports_to: "AG-STR-FOUNDER-001", peer: "AG-GRO-CMO-001" };
  }
  return base;
}

const agentReg = JSON.parse(readFileSync(join(AI_BOS, "agent-registry/registry.json"), "utf8"));
const existingIds = new Set(agentReg.objects.map((o) => o.id));

for (const a of AGENTS) {
  if (existingIds.has(a.id)) continue;
  agentReg.objects.push(makeAgentEntry(a));
}

// Founder: replace direct engineering handoffs with CTO
const founder = agentReg.objects.find((o) => o.id === "AG-STR-FOUNDER-001");
const engDirect = new Set([
  "AG-DLV-SAAS-001",
  "AG-DLV-HTML-LEAD-001",
  "AG-DLV-NEXT-LEAD-001",
  "AG-DLV-API-001",
  "AG-DLV-INT-001",
]);
if (founder) {
  founder.handoffs = founder.handoffs.filter((h) => !engDirect.has(h.to));
  if (!founder.handoffs.some((h) => h.to === "AG-ENG-CTO-001")) {
    founder.handoffs.splice(1, 0, { to: "AG-ENG-CTO-001", when: "engineering department work" });
  }
  founder.version = "1.2.0";
  founder.updated = "2026-07-18";
}

// Delivery leads report to CTO
for (const id of DLV_LEADS) {
  const lead = agentReg.objects.find((o) => o.id === id);
  if (lead && !lead.handoffs.some((h) => h.to === "AG-ENG-CTO-001")) {
    lead.handoffs.unshift({ to: "AG-ENG-CTO-001", when: "return to engineering executive" });
  }
  if (lead?.notes) lead.notes.reports_to = "AG-ENG-CTO-001";
  else if (lead) lead.notes = { reports_to: "AG-ENG-CTO-001" };
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

// Project PRJ-ENG-SAASOS-001
const prPath = join(AI_BOS, "project-registry/registry.json");
const pr = JSON.parse(readFileSync(prPath, "utf8"));

const dlvAgents = agentReg.objects
  .filter((o) => o.id.startsWith("AG-DLV-") || o.id.startsWith("AG-ENG-"))
  .map((o) => o.id);

const engosProject = {
  id: "PRJ-ENG-SAASOS-001",
  name: "Growrix Engineering OS",
  version: "1.0.0",
  status: "active",
  owner: "human: founder",
  capabilities: [
    "CAP-ENG-001",
    "CAP-DLV-001",
    "CAP-DLV-002",
    "CAP-DLV-004",
    "CAP-DLV-005",
    "CAP-OPS-002",
    "CAP-OPS-003",
    "CAP-PLT-005",
    "CAP-KNW-001",
  ],
  consumes: [
    "AR-ENG-SAASOS-001",
    "AR-AI-BOS-004",
    "AR-AI-BOS-007",
    "HB-ENG-CTO-001",
    "HB-DLV-SAAS-ORCH-001",
    "HB-ENG-ARCH-001",
    "HB-ENG-FE-001",
    "HB-ENG-BE-001",
    "HB-ENG-DATA-001",
    "HB-ENG-PERF-001",
    "HB-ENG-DOCS-001",
    "HB-OPS-REL-001",
    "ST-SEC-001",
    "ST-TST-001",
    "ST-API-001",
    "ST-FE-DS-001",
    "ST-ENG-SCORECARD-001",
    "WF-ENG-PROGRAM-001",
    "WF-DLV-SAAS-FEATURE-001",
    "RU-AI-BOS-ENGOS-001",
    "RU-AI-BOS-SAAS-001",
    "RU-AI-BOS-HANDOFF-001",
    "RU-AI-BOS-VAULT-001",
    "TP-ENG-SAASOS-001",
  ],
  agents: [...new Set(["AG-ENG-CTO-001", "AG-ENG-PERF-001", "AG-ENG-DOCS-001", ...dlvAgents.filter((id) => id.startsWith("AG-DLV-"))])],
  mcp_servers: ["MC-KNW-REGISTRY-001", "MC-KNW-RETRIEVE-001", "MC-PLT-CODEBASE-001"],
  workflows: ["WF-ENG-PROGRAM-001", "WF-DLV-SAAS-FEATURE-001"],
  governance: {
    knowledge_owners: ["AG-KNW-ARCH-001"],
    auditor: "AG-KNW-VALID-001",
    engineering_lead: "AG-ENG-CTO-001",
    parent_project: "PRJ-STR-FOUNDEROS-001",
    peer_project: "PRJ-GRO-MKOS-001",
  },
  runtime_projection: "cursor",
  root_path: "F:/PROJECTS/Growrixos/",
  ledger_path: "F:/PROJECTS/Growrixos/AI-BOS/tasks.md",
  memory_path: "F:/PROJECTS/Growrixos/.cursor/brain/founder-os-memory/projects/<slug>/engineering/",
  generated_from: "TP-ENG-SAASOS-001",
  notes: {
    wiring: "I17 Engineering OS",
    primary_agent: "AG-ENG-CTO-001",
    entry_intent: "engineering_intake",
    saas_project: "PRJ-SAAS-GROWRIXOS-001",
  },
  updated: "2026-07-18",
};

if (!pr.objects.some((o) => o.id === "PRJ-ENG-SAASOS-001")) {
  pr.objects.push(engosProject);
}

// Founder project + SaaS project updates
const founderPr = pr.objects.find((o) => o.id === "PRJ-STR-FOUNDEROS-001");
if (founderPr) {
  if (!founderPr.agents.includes("AG-ENG-CTO-001")) founderPr.agents.push("AG-ENG-CTO-001");
  for (const ko of ["AR-ENG-SAASOS-001", "HB-ENG-CTO-001", "RU-AI-BOS-ENGOS-001"]) {
    if (!founderPr.consumes.includes(ko)) founderPr.consumes.push(ko);
  }
  founderPr.version = "1.3.0";
  founderPr.updated = "2026-07-18";
  founderPr.notes = { ...founderPr.notes, engineering_handoff: "AG-ENG-CTO-001" };
}

const saasPr = pr.objects.find((o) => o.id === "PRJ-SAAS-GROWRIXOS-001");
if (saasPr) {
  saasPr.governance = {
    ...saasPr.governance,
    engineering_lead: "AG-ENG-CTO-001",
    delivery_lead: "AG-DLV-SAAS-001",
  };
  saasPr.updated = "2026-07-18";
}

pr.last_updated = "2026-07-18";
writeFileSync(prPath, JSON.stringify(pr, null, 2));
writeFileSync(
  join(AI_BOS, "project-registry/project-index.json"),
  JSON.stringify(
    pr.objects.map((o) => ({ id: o.id, name: o.name, version: o.version, status: o.status, updated: o.updated })),
    null,
    2
  )
);

console.log("I17 build: agents", agentReg.objects.length, "projects", pr.objects.length);
