# Cursor Agent System — Anatomy & Registry

**Canonical path:** `~/.cursor/docs/agents_cursor.md` (portable — all workspaces)  
**Last updated:** 2026-07-18  
**Maintained by:** `@system-builder` — **must update this file** whenever agents, skills, lanes, or commands are created or materially changed.  
**Purpose:** Human reference + AI guardrail so new agents are not duplicated or conflict with existing ones.  
**Vault SSOT:** `F:/PROJECTS/Growrixos/AI-BOS/` — agents/skills/rules for the agentic system live under `AI-BOS/.cursor/` (`RU-AI-BOS-VAULT-001`).

---

## How to use this document

| Audience | Use it to… |
|----------|------------|
| **You (human)** | Pick the right agent/skill, understand scopes, know what exists before asking for a new agent |
| **AI (`@system-builder`)** | **Read first** before DESIGN/EXTEND; check anti-duplication; **update this file before declaring agent work complete** |

**Before creating a new agent, search this file for:** name overlap, same scope, same lane owner, or readonly vs lead duplication.

**Project copies:** Repos may mirror a pointer at `.cursor/agents_cursor.md` or `Ongoing DOCS/agents_cursor.md` — the canonical registry is always this file.

---

## How the agentic system works

Cursor uses **stacked layers** — they do not replace each other.

```text
User prompt or slash command
    ↓
Rules (.cursor/rules/*.mdc)        ← always-on or file-pattern policy (usually per repo)
    ↓
Skills (@mention)                  ← portable playbooks (~/.cursor/skills/ = all projects)
    ↓
Agents (.cursor/agents/*.md)       ← project subagent wrappers (per repo)
    ↓
Commands (.cursor/commands/)       ← slash shortcuts (per repo)
    ↓
Agent Brain + ledger               ← session memory (per repo when scaffolded)
```

### Skills vs agents (important)

| Surface | Typical path | Works in any project? | What it is |
|---------|--------------|----------------------|------------|
| **Personal skill** | `~/.cursor/skills/<name>/` | **Yes** — `@name` in any workspace | Full playbook (authoritative) |
| **Project skill** | `<repo>/.cursor/skills/<name>/` | That repo only | Delivery lane playbooks |
| **Project agent** | `<repo>/.cursor/agents/<name>.md` | That repo only | Thin wrapper → skill + local brain |
| **Slash command** | `<repo>/.cursor/commands/<name>.md` | That repo only | User shortcut |

**Rule of thumb:** Skills = reusable brain (global). Agents/commands/brain = per-project factory shell.

### Agent Brain (when scaffolded in a repo)

| File | Typical scope | When to read |
|------|---------------|--------------|
| `.cursor/brain/lane-router.yaml` | Path → brain, ledger, gates | Session start |
| `memories/repo/site-brain.md` or project brain | SaaS / app snapshot | SaaS work |
| `.cursor/brain/template-brain.md` | HTML template index | `sites/` work |
| `.cursor/brain/migration-brain.md` | Migrations / conversion | Next / convert work |
| Project ledger | `tasks.md`, `DOC/.../tasks.md`, or `.cursor/execution/` | Material work |

---

## Personal skills (global — any workspace)

Invoke with `@skill-name`.

| Skill | Scope | Capabilities | When to use |
|-------|-------|--------------|-------------|
| `@system-builder` | Meta / agent authoring | Design, audit, extend, repair skills, rules, registries; **updates this file** | New agents, skills, lanes, governance |
| `@task-ledger` | Execution continuity | Read/update `tasks.md` across sessions | Any material multi-step work |
| `@senior-saas-developer` | Full-stack SaaS | Audit, plan, implement, refactor, debug, verify; 6 modes | Cross-layer bugs/features |
| `@senior-frontend-specialist` | Agency frontend | DS-first, P0–P5 phases, no hardcoding | Production UI builds |
| `@frontend-content-strategist` | Content / SEO | Copy, CTA hierarchy, CMS models, CONTENT-BRIEF | Before UI implementation |
| `@frontend-quality-enforcer` | QA gates (readonly) | 11-step phase-end matrix | Phase complete; `/phase-gate` |
| `@clerk-nextjs-auth` | Auth integration | Clerk App Router, webhooks, RBAC | Clerk in Next.js SaaS |
| `@senior-backend-devops-developer` | Backend + DevOps lead | P0–P6 phases, services, webhooks, data | Backend-only API/integration work |
| `@api-contract-architect` | API contracts | Zod/OpenAPI, webhooks, idempotency | Before new API surface |
| `@integration-platform` | Integration router | Stripe, Supabase, Resend, Lark playbooks | Provider wiring — never invent env vars |
| `@devops-release-engineer` | Release / CI | Vercel web + studio, env matrix, smoke | Deploy, env, pipeline work |
| `@backend-quality-enforcer` | Backend QA (readonly) | QG1–QG13 adapted + health:check subset | Backend phase complete; `/phase-gate-backend` |
| `@technical-seo` | Technical SEO | Build/Audit modes, handbook-driven audits, migrations, CI SEO gates | Technical crawl/index/render/schema/CWV; select `Technical_SEO_expert` |
| `@on-page-seo` | On-Page SEO | Audit/Build/Content Strategy modes; keywords, intent, titles, E-E-A-T, internal links | On-page strategy and content briefs; select `On_Page_SEO_expert` |
| `@off-page-seo` | Off-Page SEO | Audit/Link Building/Digital PR/Local modes; white-hat links, citations, PR | Off-page authority; select `Off_Page_SEO_expert` |

**Do not duplicate:** Second “senior full-stack dev” or “frontend lead” — extend these skills.

---

## Anti-duplication registry (global)

| Need | Owner | If insufficient |
|------|-------|-----------------|
| Full-stack SaaS | `@senior-saas-developer` | Extend skill / add mode |
| Agency frontend | `@senior-frontend-specialist` | Extend phase model |
| Framework conversion | `frontend-system-architect` + `frontend-ui-converter` | New **track**, not new lead |
| Copy / SEO content (brand voice) | `@frontend-content-strategist` | Extend reference docs; not on-page or technical SEO |
| Technical SEO (architecture, audit, gates) | `@technical-seo` + `Technical_SEO_expert` | Extend handbook at `Ongoing DOCS/SEO/technical-seo/` |
| On-page SEO (keywords, content, titles) | `@on-page-seo` + `On_Page_SEO_expert` | Extend handbook at `Ongoing DOCS/SEO/on-page-seo/` |
| Off-page SEO (links, PR, local) | `@off-page-seo` + `Off_Page_SEO_expert` | Extend handbook at `Ongoing DOCS/SEO/off-page-seo/` |
| Phase-end gates | `@frontend-quality-enforcer` | Extend quality-matrix.md |
| Backend-only (API, webhooks, data) | `@senior-backend-devops-developer` | Extend phase model |
| API / schema design | `@api-contract-architect` | Extend contract checklist |
| Provider integration | `@integration-platform` | Add playbook under references/ |
| DevOps / release | `@devops-release-engineer` | Extend env matrix |
| Backend phase-end gates | `@backend-quality-enforcer` | Extend quality-matrix.md |
| Meta / new agents | `@system-builder` | — |
| Task continuity | `@task-ledger` | — |
| Clerk auth | `@clerk-nextjs-auth` | — |
| AI-BOS architecture planning | `@ai-bos-architect` (project-local) | Extend skill under `AI-BOS/`; structural changes via `@system-builder` |

---

## Task routing (global skills)

| Your task | Start here | Not this |
|-----------|------------|----------|
| Fix SaaS bug (API + UI) | `@senior-saas-developer` | Generic chat without skill |
| Production UI / DS | `@senior-frontend-specialist` | Ad-hoc frontend agent |
| Copy / SEO content before build | `@frontend-content-strategist` | Lorem ipsum in chat |
| Technical SEO audit or architecture | `Technical_SEO_expert` + `@technical-seo` | On-page copy strategy → `On_Page_SEO_expert`; brand copy → `@frontend-content-strategist` |
| On-page SEO (keywords, titles, content plan) | `On_Page_SEO_expert` + `@on-page-seo` | `Technical_SEO_expert` for metadata code; `@frontend-content-strategist` for final copy |
| Off-page SEO (links, PR, local) | `Off_Page_SEO_expert` + `@off-page-seo` | `On_Page_SEO_expert` for landing-page alignment |
| Phase done — run gates | `@frontend-quality-enforcer` | E2E after every edit |
| Create new agent/skill | `@system-builder` + **update this file** | Duplicate agent markdown |
| Agent system drift | `@system-builder` | Second meta-agent |
| Backend API / webhook feature | `@senior-backend-devops-developer` | Raw SDK in route handler |
| OpenAPI / schema design | `@api-contract-architect` | Chat-only schema |
| Stripe / Resend / Supabase wiring | `@integration-platform` | Invented env vars |
| Vercel deploy / env / CI | `@devops-release-engineer` | `@senior-saas-developer` for prod deploy |
| Backend phase done | `@backend-quality-enforcer` | E2E after every edit |
| AI-BOS constitution / capability / knowledge architecture | `@ai-bos-architect` under `AI-BOS/` | `@system-builder` for structural changes only |

---

## Readonly vs implementing agents

| Type | Pattern | Rule |
|------|---------|------|
| **Readonly auditors** | `*-auditor`, `*-reviewer`, `frontend-quality-enforcer` | Report blockers; builder fixes |
| **Leads / builders** | `*-architect`, `*-specialist`, `*-director` | Own implementation |
| **Optimizers** | `performance-optimizer` | May apply safe fixes |

---

## Portability cheat sheet

| Want | Global (now) | Per project |
|------|--------------|-------------|
| Playbooks | `@senior-*`, `@frontend-*`, `@system-builder` | — |
| This anatomy doc | `~/.cursor/docs/agents_cursor.md` | Optional pointer in `.cursor/agents_cursor.md` |
| Agents / commands / brain | — | Copy repo `.cursor/` or bootstrap later |

---

## `@system-builder` — mandatory anatomy updates

When creating or materially changing **any** agent, skill, lane, or command:

1. **Read** this file first — check anti-duplication registry  
2. **Implement** skill bundle + project agent (if applicable) + registries  
3. **Update** this file — new row in project section + global registry if needed  
4. **Update** `~/.cursor/skills/system-builder/registry/skills-index.md` and `lanes-index.md`  
5. **Append** version log row below  
6. **Do not** mark system work complete until steps 3–5 are done  

Skip anatomy update only for typo fixes with zero scope change.

---

## Project registries

Detailed per-repo agent inventories live below. `@system-builder` adds a new `## Project: <name>` section when scaffolding a new workspace.

---

## Project: Growrixos

**Repo:** `F:/PROJECTS/Growrixos`  
**Agent orientation:** `AGENTS.md`  
**Project agents:** `.cursor/agents/` (29 agents)  
**Project skills:** `.cursor/skills/` (4 skills)  
**Commands:** `.cursor/commands/` (10 commands)  
**Brain:** `.cursor/brain/` + `.cursor/execution/template-tasks.md`

### Delivery surfaces

| Surface | Path | Stack |
|---------|------|-------|
| Growrix OS SaaS | `web/` | Next.js; `npm run health:check` |
| HTML templates | `sites/` | Vanilla single-file HTML |
| Next.js client sites | `Frontend_Nextjs/` | Next.js 15, React 19, TS, Tailwind v4 |
| Blueprints | `blueprints/` | Markdown only |

### Project skills

| Skill | Lane |
|-------|------|
| `html-website-builder` | HTML templates |
| `nextjs-site-migrator` | Next migration |
| `frontend-ui-converter` | Conversion Tracks A–E |
| `website-blueprint-factory` | Strategy blueprints |

### Lane 1 — Frontend Production Factory

| Agent | Skill | Scope | Readonly? |
|-------|-------|-------|-----------|
| `senior-saas-developer` | `@senior-saas-developer` | `web/` + full-stack | No |
| `senior-frontend-specialist` | `@senior-frontend-specialist` | `web/`, `Frontend_Nextjs/` | No |
| `frontend-system-architect` | `frontend-ui-converter` | Cross-framework conversion | No |
| `frontend-content-strategist` | `@frontend-content-strategist` | Copy, SEO content, CMS | No |
| `Technical_SEO_expert` | `@technical-seo` | Cross-lane technical SEO Build/Audit | No |
| `On_Page_SEO_expert` | `@on-page-seo` | Cross-lane on-page SEO Audit/Build/Content Strategy | No |
| `Off_Page_SEO_expert` | `@off-page-seo` | Cross-lane off-page SEO Audit/Link/PR/Local | No |
| `frontend-quality-enforcer` | `@frontend-quality-enforcer` | Phase-end QA | **Yes** |

**Commands:** `/frontend-factory`, `/convert-ui`, `/phase-gate`, `/resume-brain`

**Conversion tracks:** A HTML→Next | B Next→HTML | C Vite→Next | D Vite→HTML | E web slice→HTML preview

### Lane 1b — Backend & DevOps Factory

| Agent | Skill | Scope | Readonly? |
|-------|-------|-------|-----------|
| `senior-backend-devops-developer` | `@senior-backend-devops-developer` | `web/src/server/`, `web/src/app/api/` | No |
| `api-contract-architect` | `@api-contract-architect` | Schemas, webhooks, idempotency | No |
| `integration-platform-engineer` | `@integration-platform` | Provider playbooks | No |
| `devops-release-engineer` | `@devops-release-engineer` | Vercel, env, CI, smoke | No |
| `backend-quality-enforcer` | `@backend-quality-enforcer` | Phase-end backend gates | **Yes** |

**Commands:** `/backend-factory`, `/phase-gate-backend`, `/integration-plan`, `/resume-backend-brain`

**Brain:** `.cursor/brain/backend-brain.md`, `devops-brain.md`, `integration-catalog.yaml`

**Rules:** `73-backend-platform-standards.mdc`, `74-devops-release-discipline.mdc`

### Lane 2 — HTML templates (`sites/`)

| Agent | Role | Readonly? |
|-------|------|-----------|
| `frontend-architect` | Lead build | No |
| `design-system-architect` | Tokens | No |
| `accessibility-auditor` | WCAG | **Yes** |
| `performance-optimizer` | CWV / SEO | Can fix |
| `code-reviewer` | Final QA | **Yes** |

**Commands:** `/new-site`, `/new-site-phase2`

### Lane 3 — Next.js migration

| Agent | Role | Readonly? |
|-------|------|-----------|
| `nextjs-migration-architect` | Lead | No |
| `tailwind-design-system-architect` | Token port | No |
| `nextjs-accessibility-auditor` | a11y | **Yes** |
| `nextjs-performance-optimizer` | perf | Can fix |
| `nextjs-code-reviewer` | contract QA | **Yes** |
| `nextjs-visual-parity-auditor` | parity | **Yes** |

**Commands:** `/migrate-to-next`, `/parity-pass`, `/convert-frontend-ui`

### Lane 4 — Blueprint factory

**Lead:** `bp-director` — stages `bp-01` … `bp-12`, `bp-11-uniqueness-enforcer` (readonly). **Command:** `/new-blueprint`

### Growrixos governance rules

| Rule | Purpose |
|------|---------|
| `60-zero-gate-health-check.mdc` | Zero failures before done |
| `70-execution-constitution.mdc` | Brain read order, materialization gate |
| `71-git-discipline.mdc` | Commit local; no push unless asked |
| `72-phase-gate-discipline.mdc` | Phase-end gates only |
| `73-backend-platform-standards.mdc` | Backend layering, webhooks, env |
| `74-devops-release-discipline.mdc` | Deploy smoke, isolated pipelines |
| `76-ai-bos-saas-binding.mdc` | Bind `web/**` to `PRJ-SAAS-GROWRIXOS-001` + AI-BOS KOs |
| `77-ai-bos-html-binding.mdc` | Bind `sites/**` to `PRJ-TMPL-HTML-001` |
| `78-ai-bos-next-binding.mdc` | Bind `Frontend_Nextjs/**` to `PRJ-TMPL-NEXT-001` |
| `79-ai-bos-blueprint-binding.mdc` | Bind `blueprints/**` to `PRJ-BP-WEB-001` |

### Growrixos — do not duplicate

| Need | Owner |
|------|-------|
| HTML site build | `frontend-architect` |
| Next migration | `nextjs-migration-architect` |
| Strategy blueprint | `bp-director` |
| SaaS ledger | `DOC/PROJECT PLAN/Tasks/tasks.md` |
| Backend API / integrations | `senior-backend-devops-developer` |
| Provider playbooks | `integration-platform-engineer` |
| Technical SEO audit/architecture | `Technical_SEO_expert` + `@technical-seo` |
| On-page SEO strategy | `On_Page_SEO_expert` + `@on-page-seo` |
| Off-page SEO / link building | `Off_Page_SEO_expert` + `@off-page-seo` |
| Copy/SEO content modeling (brand voice) | `frontend-content-strategist` |
| Template ledger | `.cursor/execution/template-tasks.md` |

### Planned NOT implemented (Growrixos Copilot legacy)

`phase1-site-replication`, `phase4-foundation-planning`, `rebrand-planner`, git workspace manager — migrate via `@system-builder` only; do not parallel-build.

---

## Project: AI-BOS (isolated root under Growrixos)

**Root:** `F:/PROJECTS/Growrixos/AI-BOS/`  
**Archetype:** isolated local system (docs-first, vendor-independent)  
**Governance:** `@system-builder` (structural) + `@ai-bos-architect` (content)

### Delivery surface

| Surface | Path | Stack |
|---------|------|-------|
| AI-BOS planning | `AI-BOS/` | Markdown Knowledge Objects + JSON registries |

### Four-registry model (Phase 5 + 7 + 8 + 11)

| Registry | Path | Contents | Status |
|----------|------|----------|--------|
| Knowledge registry | `AI-BOS/knowledge-registry/` | Knowledge Objects (HB/AR/BP/ST/RU/PT/TP/WF/AG/MC/PR/EX) | **70 objects** |
| Agent registry | `AI-BOS/agent-registry/` | AI-BOS agents (`AG-*`) | **40 agents** — projections `vault-skill:` / `vault-agent:` |
| MCP registry | `AI-BOS/mcp-registry/` | MCP servers (`MC-*`) + capability contracts | **1 server** — runtime **live** |
| Project registry | `AI-BOS/project-registry/` | AI-BOS projects (`PRJ-*`) | **5 projects** — gov, SaaS, HTML, Next, blueprints |
| Universal SSOT | `AI-BOS/universal/` | Copied Universal + SEO depth | **161 files** |

**One-way dependency:** Project → Agent → MCP → Knowledge. No registry references IDs in the layer above.

### Phase progress — ARCHITECTURE + PLANNED IMPLEMENTATION COMPLETE

| Phase | Deliverable | Status |
|-------|-------------|--------|
| 0 | Isolated root scaffold | completed |
| 1–12 | Architecture phases | all approved |
| I1 | Foundation (registries + ST/TP + docs) | completed 2026-07-17 |
| I2 | Operational wiring (AG/MC/WF/HB + project) | completed 2026-07-17 |
| I3 | Wire `PRJ-SAAS-GROWRIXOS-001` (`web/`) + delivery AG-* maps | completed 2026-07-17 |
| I4 | SaaS knowledge pack + skill/rule bindings | completed 2026-07-17 |
| I5 | Full agent enrollment (37 Cursor agents → AG-*) | **completed 2026-07-17** |
| I6–I9 | Portable SSOT + domain packs + MCP + 85+ gate | **completed 2026-07-17** |

**D1 repo-promotion:** Option B reaffirmed. AI-BOS remains isolated root.

**Growrixos wiring:** All 37 `.cursor/agents/` registered. **5 PRJ-*** with domain packs. Rules **76–80**. Readiness **≥85**: `AI-BOS/.cursor/audits/2026-07-17-readiness-85.md`.

**Lifecycle:** Domain KO packs complete (HTML, Next, Blueprint, SEO). MCP runtime live.

### Project skills (vault SSOT under `AI-BOS/.cursor/skills/`)

| Skill | Lane | Scope |
|-------|------|-------|
| `ai-bos-architect` | AI-BOS planning | KO content authoring |
| `knowledge-validator` | AI-BOS validation | MCP `knowledge.validate` |
| `system-builder` | Vault platform | Structure, registries, copy-in, env projection |
| `senior-saas-developer` | SaaS orchestrator | Cross-layer AG-DLV-SAAS-001 (+ 15 other delivery skills copied into vault) |

**Invoke:** prefer vault skill paths when working for portability. Personal `~/.cursor/skills` may mirror as derived install.

### Local rules (vault)

| Rule | Purpose |
|------|---------|
| `75-ai-bos-governance.mdc` | Registry SSOT, phase gates, vault integrity |
| `81-agent-handoff-suggestion.mdc` | Next-agent suggestion + wrong-agent STOP |
| `82-ai-bos-vault-integrity.mdc` | Never register external roots |

### Ledger

`AI-BOS/tasks.md`

### AI-BOS — do not duplicate

| Need | Owner |
|------|-------|
| Constitution / capability / knowledge architecture content | `@ai-bos-architect` |
| New skill, rule, registry schema under AI-BOS | `@system-builder` (vault-only writes) |
| SaaS cross-layer orchestration | `@senior-saas-developer` / AG-DLV-SAAS-001 |
| SaaS implementation | Growrixos `web/` lanes |
| HTML / Next delivery | `sites/` / `Frontend_Nextjs/` lanes |
| E2E planner AG-* enrollment | Documented in `docs/reference/planner-agent-gap-matrix.md` — copy-in first |

---

## File index

| What | Path |
|------|------|
| **This anatomy (canonical)** | `~/.cursor/docs/agents_cursor.md` |
| System builder registries | `~/.cursor/skills/system-builder/registry/` |
| Personal skills | `~/.cursor/skills/` |
| Growrixos agents | `F:/PROJECTS/Growrixos/.cursor/agents/` |
| Growrixos pointer | `F:/PROJECTS/Growrixos/.cursor/agents_cursor.md` |

---

## Version log

| Date | Change |
|------|--------|
| 2026-06-26 | Initial anatomy (Growrixos Ongoing DOCS) |
| 2026-06-26 | Moved to `~/.cursor/docs/agents_cursor.md`; `@system-builder` mandatory update rule |
| 2026-06-26 | Backend & DevOps Factory — 5 agents, 4 commands, backend/devops brain, rules 73–74 |
| 2026-07-14 | Technical SEO Expert — `@technical-seo` personal skill; `Technical_SEO_expert` agent replaces deprecated `technical-seo-architect` |
| 2026-07-14 | Complete SEO Agent Suite — unified handbook `Ongoing DOCS/SEO/`; added `On_Page_SEO_expert` + `@on-page-seo`, `Off_Page_SEO_expert` + `@off-page-seo`; Technical handbook moved to `SEO/technical-seo/` |
| 2026-07-16 | AI-BOS isolated root under Growrixos — project-local `@ai-bos-architect` skill, `AI-BOS/knowledge-registry/`, rule `75-ai-bos-governance.mdc`, root rules 60+70 aligned |
| 2026-07-16 | AI-BOS Phases 1–8 approved. Three-registry model (knowledge / agent / mcp) recorded in anatomy. Agent and MCP registry directories planned but not yet scaffolded — deferred to first registration in Phase 12 or per-project. |
| 2026-07-16 | AI-BOS Phases 9–12 approved. Four-registry model complete (project-registry added in Phase 11). All 12 architecture phases complete. Phase 12 committed the repository structure layout and Evolution Strategy. **D1 repo-promotion trigger CLOSED (terminal): Option B — AI-BOS remains isolated root inside Growrixos.** Re-evaluation triggers: second consumer / ≥10 ST-TP-HB KOs / explicit user request. AI-BOS transitions to implementation + evolution lifecycle. Evidence: `AI-BOS/.cursor/audits/2026-07-16-d1-repo-promotion-final-decision.md`. |
| 2026-07-17 | AI-BOS foundation implementation (I1) complete via `@system-builder`: scaffolded agent/mcp/project registries; authored 10 ST-* + 7 TP-* KOs; docs/ + docs/index.json; registered `PRJ-GOV-AI-BOS-001`; knowledge-registry now 29 objects. D1 Trigger 2 condition met (17 ST/TP ≥ 10) — re-evaluation available on request, no auto-promotion. |
| 2026-07-17 | AI-BOS I2 operational wiring complete: agents AG-KNW-ARCH-001 / AG-GOV-SYSBUILD-001 / AG-KNW-VALID-001; MCP MC-KNW-REGISTRY-001; workflows WF-GOV-PHASE-APPROVE-001 + WF-KNW-AUTHOR-001; handbooks HB-KNW-AUTHORING-001 + HB-GOV-OPS-001; project wired; knowledge-registry 33 objects. D1 Trigger 2 acknowledged — Option B reaffirmed. |
| 2026-07-17 | AI-BOS I3: wired `PRJ-SAAS-GROWRIXOS-001` to `web/`; registered 6 delivery AG-DLV-* as projections of existing Growrixos Cursor skills (no new skills). Agent registry now 9; projects 2. |
| 2026-07-17 | AI-BOS I4 SaaS agent readiness: 11 KOs (5 HB + 4 ST + 1 WF + 1 RU); knowledge-registry **44** objects; EXTEND 6 delivery skills with `references/ai-bos-binding.md`; rule `76-ai-bos-saas-binding.mdc` + rule 70 align; docs `saas-knowledge-catalog.md` + `runtime-surface-inventory.md`. No new skills. |
| 2026-07-17 | AI-BOS I6–I9 readiness 85+: `universal/` portable SSOT; +20 KOs (64 total); MCP runtime; domain packs HTML/Next/BP/SEO; rule 80; audit `2026-07-17-readiness-85.md`. |
| 2026-07-18 | **I10 vault-first governance:** RU-VAULT + RU-HANDOFF + HB-SYSBUILD + HB-SAAS-ORCH + ST-ENV + WF-SYSBUILD; copy-in 37 agents + 19 skills into `AI-BOS/.cursor/`; all 40 AG-* → `vault-*` projections (integrity PASS); SaaS orchestrator clarified; host rules 81/82 derived; knowledge-registry **70** objects. Audit: `2026-07-18-i10-vault-first-governance.md`. |
