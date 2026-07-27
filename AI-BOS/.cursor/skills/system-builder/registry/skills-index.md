# Personal Skills Registry

Managed by `@system-builder`. Update when adding, renaming, or materially changing personal skills.

| Skill | Path | Status | Purpose | Invocation |
|-------|------|--------|---------|------------|
| system-builder | `~/.cursor/skills/system-builder/` | active | Meta-agent: design, audit, extend, repair Cursor agent system | explicit `@system-builder` |
| task-ledger | `~/.cursor/skills/task-ledger/` | active | Maintains project-root `tasks.md` execution ledger | auto when material work; explicit `@task-ledger` |
| senior-saas-developer | `~/.cursor/skills/senior-saas-developer/` | active | Optional full-stack SaaS generalist: audit, plan, execute, validate | explicit `@senior-saas-developer` |
| clerk-nextjs-auth | `~/.cursor/skills/clerk-nextjs-auth/` | active | Clerk identity integration for Next.js 16+ App Router (proxy, webhooks, RBAC) | explicit `@clerk-nextjs-auth` |
| senior-frontend-specialist | `~/.cursor/skills/senior-frontend-specialist/` | active | Agency frontend lead: DS-first, phase model, no hardcoding | explicit `@senior-frontend-specialist` |
| frontend-content-strategist | `~/.cursor/skills/frontend-content-strategist/` | active | Copy, SEO, conversion, CMS content modeling | explicit `@frontend-content-strategist` |
| frontend-quality-enforcer | `~/.cursor/skills/frontend-quality-enforcer/` | active | Readonly phase-end 11-step gate matrix | explicit `@frontend-quality-enforcer` / `/phase-gate` |
| senior-backend-devops-developer | `~/.cursor/skills/senior-backend-devops-developer/` | active | Backend/DevOps lead P0–P6 | explicit `@senior-backend-devops-developer` |
| api-contract-architect | `~/.cursor/skills/api-contract-architect/` | active | Zod/OpenAPI, webhooks, idempotency | explicit `@api-contract-architect` |
| integration-platform | `~/.cursor/skills/integration-platform/` | active | Provider playbooks router | explicit `@integration-platform` |
| devops-release-engineer | `~/.cursor/skills/devops-release-engineer/` | active | Vercel, env matrix, CI smoke | explicit `@devops-release-engineer` |
| backend-quality-enforcer | `~/.cursor/skills/backend-quality-enforcer/` | active | Readonly backend QG matrix | explicit `@backend-quality-enforcer` / `/phase-gate-backend` |
| technical-seo | `~/.cursor/skills/technical-seo/` | active | Technical SEO Build/Audit modes, handbook-driven audits | explicit `@technical-seo`; select `Technical_SEO_expert` agent |
| on-page-seo | `~/.cursor/skills/on-page-seo/` | active | On-page SEO Audit/Build/Content Strategy; keywords, intent, titles, E-E-A-T | explicit `@on-page-seo`; select `On_Page_SEO_expert` agent |
| off-page-seo | `~/.cursor/skills/off-page-seo/` | active | Off-page SEO Audit/Link Building/PR/Local; white-hat authority | explicit `@off-page-seo`; select `Off_Page_SEO_expert` agent |

## Project-local skills (not in personal bundle)

| Skill | Path | Status | Purpose | Invocation |
|-------|------|--------|---------|------------|
| ai-bos-architect | `F:/PROJECTS/Growrixos/AI-BOS/.cursor/skills/ai-bos-architect/` | active | AI-BOS phased architecture planning; Knowledge Objects + registry | explicit `@ai-bos-architect` when under `AI-BOS/` |

## Agents anatomy (not a skill — canonical doc)

| Doc | Path | Updated by |
|-----|------|------------|
| agents_cursor.md | `~/.cursor/docs/agents_cursor.md` | `@system-builder` on every agent/skill/lane change |

## Notes

- **2026-07-18 I10:** Vault-first — SSOT for agentic skill/agent bodies is `AI-BOS/.cursor/skills|agents/` (`RU-AI-BOS-VAULT-001`). Personal paths remain derived/global convenience. `system-builder` + delivery skills copied into vault; projections `vault-skill:*`.
- **2026-07-17 I4:** Six Growrixos SaaS delivery skills EXTENDED with `references/ai-bos-binding.md` (no new skills): `senior-saas-developer`, `senior-frontend-specialist`, `senior-backend-devops-developer`, `frontend-quality-enforcer`, `backend-quality-enforcer`, `devops-release-engineer`. Bound to `PRJ-SAAS-GROWRIXOS-001` / rule `76`.
- **2026-07-17 I5:** Ten additional skills EXTENDED with `ai-bos-binding.md`: personal — `api-contract-architect`, `integration-platform`, `frontend-content-strategist`, `technical-seo`, `on-page-seo`, `off-page-seo`; project — `html-website-builder`, `nextjs-site-migrator`, `frontend-ui-converter`, `website-blueprint-factory`. All **37** Growrixos agents registered as AG-* in AI-BOS.

## Migration Notes

Copilot agents from Growrixos bundle (`F:\PROJECTS\Growrixos\VSCODE AGENTS\Testing-Cursor_dev\.github\agents\`) are **not** migrated in v1. Track future migrations in [lanes-index.md](lanes-index.md).

## Adding a Skill

1. Run Mode 1 blueprint or System Builder DESIGN/EXTEND.
2. Create skill bundle under `~/.cursor/skills/<name>/`.
3. Validate with [compatibility-checklist.md](../compatibility-checklist.md).
4. Add row to this table.
5. Record evidence in active `project_root/tasks.md`.
