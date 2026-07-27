# Delivery Lanes Registry

Future home for delivery-lane Cursor skills (frontend phases, backend/deploy, rebrand, etc.). Populated incrementally as Copilot agents migrate to Cursor skills.

## Meta Lane (implemented)

| Lane | Skill | Status | Notes |
|------|-------|--------|-------|
| System governance | `@system-builder` | active | Mother agent for all Cursor agent authoring |
| Task continuity | `@task-ledger` | active | Shared by all material-work skills |
| Agents anatomy | `~/.cursor/docs/agents_cursor.md` | active | Canonical agent/skill inventory; `@system-builder` maintains |

## Optional Convenience Entrypoint (implemented)

| Lane | Skill / Agent | Status | Notes |
|------|---------------|--------|-------|
| Full-stack SaaS generalist | `@senior-saas-developer` | active | Audit-first delivery across FE/BE/data/integrations; does not replace phased lanes below |
| Clerk auth integration | `@clerk-nextjs-auth` | active | Identity provider wiring for Next.js 16+ SaaS apps; pair with `@senior-saas-developer` for migrations |

## Frontend Production Factory (implemented — Growrixos)

| Lane | Owner | Status | Notes |
|------|-------|--------|-------|
| Agency frontend build | `@senior-frontend-specialist` | active | DS-first, P0–P5 phases, web/ + Frontend_Nextjs/ |
| Cross-framework conversion | `@frontend-system-architect` + `frontend-ui-converter` skill | active | Tracks A–E; CONVERSION-MAP + scope JSON |
| Content / SEO / CMS model | `@frontend-content-strategist` | active | Disk artifacts before UI implementation |
| Phase-end gates | `@frontend-quality-enforcer` | active | Readonly; `/phase-gate` command |
| Factory routing | `/frontend-factory` | active | Intent → agent via `.cursor/brain/lane-router.yaml` |
| Session recovery | `/resume-brain` | active | Brain + ledger context recovery |

Project agents: `F:/PROJECTS/Growrixos/.cursor/agents/senior-*.md`, `frontend-*.md`
Project brain: `F:/PROJECTS/Growrixos/.cursor/brain/`

## SEO Agent Suite (implemented — cross-cutting)

| Lane | Owner | Status | Notes |
|------|-------|--------|-------|
| Technical SEO audit/architecture | `@technical-seo` + `Technical_SEO_expert` | active | Build/Audit modes; handbook at `Ongoing DOCS/SEO/technical-seo/` |
| On-page SEO strategy | `@on-page-seo` + `On_Page_SEO_expert` | active | Audit/Build/Content Strategy; handbook at `Ongoing DOCS/SEO/on-page-seo/` |
| Off-page SEO / authority | `@off-page-seo` + `Off_Page_SEO_expert` | active | Audit/Link/PR/Local; handbook at `Ongoing DOCS/SEO/off-page-seo/` |
| Copy/SEO content modeling (brand voice) | `@frontend-content-strategist` | active | Final copy — not technical or off-page SEO |
| HTML template SEO gates | `performance-optimizer` + `html-website-builder` | active | CWV + head metadata for `sites/` |
| Next.js SEO gates | `nextjs-performance-optimizer` + release gates | active | Metadata, JSON-LD, CWV for `Frontend_Nextjs/` and `web/` |

Shared SEO taxonomy: `F:/PROJECTS/Growrixos/Ongoing DOCS/SEO/README.md`

Project agents:
- `F:/PROJECTS/Growrixos/.cursor/agents/Technical_SEO_expert.md`
- `F:/PROJECTS/Growrixos/.cursor/agents/On_Page_SEO_expert.md`
- `F:/PROJECTS/Growrixos/.cursor/agents/Off_Page_SEO_expert.md`

Handbook SSOT: `F:/PROJECTS/Growrixos/Ongoing DOCS/SEO/`

Deprecated: `technical-seo-architect` (merged into `Technical_SEO_expert`)

## AI-BOS Isolated Lane (implemented — Growrixos)

| Lane | Owner | Status | Notes |
|------|-------|--------|-------|
| AI-BOS architecture planning | `@ai-bos-architect` | active | Phases 1–12; Knowledge Objects + `knowledge-registry/` |
| AI-BOS structural governance | `@system-builder` | active | Skills, rules, registry schema under `AI-BOS/` |

Project skill: `F:/PROJECTS/Growrixos/AI-BOS/.cursor/skills/ai-bos-architect/`  
Ledger: `F:/PROJECTS/Growrixos/AI-BOS/tasks.md`  
Local rule: `AI-BOS/.cursor/rules/75-ai-bos-governance.mdc`

**AI-BOS project bindings (I5):**

| PRJ | Path | Rule |
|-----|------|------|
| PRJ-SAAS-GROWRIXOS-001 | `web/` | `76-ai-bos-saas-binding` |
| PRJ-TMPL-HTML-001 | `sites/` | `77-ai-bos-html-binding` |
| PRJ-TMPL-NEXT-001 | `Frontend_Nextjs/` | `78-ai-bos-next-binding` |
| PRJ-BP-WEB-001 | `blueprints/` | `79-ai-bos-blueprint-binding` |

Agent catalog: `AI-BOS/docs/reference/agent-mcp-catalog.md` (**40** AG-*)

## Shared Frontend Entry (planned — not migrated)

| Copilot source | Planned skill name | Status |
|----------------|-------------------|--------|
| `phase1-site-replication.agent.md` | `phase1-site-replication` | planned |
| `phase1.1-pixel-replicator.agent.md` | `phase1-pixel-replicator` | planned |
| `phase1.2-replica-to-nextjs-frontend.agent.md` | `phase1-replica-to-nextjs` | planned |
| `rebrand-phase2.1-planner.agent.md` | `rebrand-planner` | planned |
| `rebrand-phase2.2-executor.agent.md` | `rebrand-executor` | planned |

## Foundation-Core / template deploy (deferred v2)

| Copilot source | Planned skill name | Status |
|----------------|-------------------|--------|
| `phase4-foundation-planning.agent.md` | `phase4-foundation-planning` | deferred v2 |
| `phase7-template-deployment.agent.md` | `phase7-template-deployment` | deferred v2 |

## Backend & DevOps Factory (implemented — Growrixos)

| Lane | Owner | Status | Notes |
|------|-------|--------|-------|
| Backend API / services | `@senior-backend-devops-developer` | active | P0–P6 phases; `web/src/server/`, `web/src/app/api/` |
| API contracts | `@api-contract-architect` | active | Before new API surface |
| Integrations | `@integration-platform` | active | Stripe, Supabase, Resend P0 playbooks |
| DevOps / release | `@devops-release-engineer` | active | Vercel web + studio isolated |
| Backend phase-end gates | `@backend-quality-enforcer` | active | Readonly; `/phase-gate-backend` |
| Factory routing | `/backend-factory` | active | Intent → agent via lane-router |
| Integration planning | `/integration-plan` | active | Env checklist before code |
| Session recovery | `/resume-backend-brain` | active | Backend + devops brain + ledger |

Project agents: `F:/PROJECTS/Growrixos/.cursor/agents/senior-backend-devops-developer.md`, `api-contract-architect.md`, `integration-platform-engineer.md`, `devops-release-engineer.md`, `backend-quality-enforcer.md`
Project brain: `F:/PROJECTS/Growrixos/.cursor/brain/backend-brain.md`, `devops-brain.md`, `integration-catalog.yaml`

## Isolated Local Systems

Register project-local isolated systems here when promoted to tracked patterns:

| Name | Root path | Status |
|------|-----------|--------|
| AI-BOS | `F:/PROJECTS/Growrixos/AI-BOS/` | active — docs-first business OS; `@ai-bos-architect` + `@system-builder` governance |

## Handoff Convention

Delivery skills hand off using exact `@skill-name` references listed above once migrated. Until migration, document Copilot source filename in skill blueprint only.
