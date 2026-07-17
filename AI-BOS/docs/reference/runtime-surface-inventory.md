# Runtime Surface Inventory (Growrixos + AI-BOS)

Snapshot after **I4 SaaS agent readiness** (2026-07-17). Tool-specific surfaces; knowledge SSOT stays in AI-BOS registries.

## AI-BOS registries

| Registry | Count | Notes |
|----------|-------|-------|
| Knowledge | **44** objects | 12 AR + 14 ST + 7 TP + 3 WF + 7 HB + 1 RU |
| Agents | **9** | 3 governance + 6 delivery projections |
| MCP | **1** | `MC-KNW-REGISTRY-001` (contract; runtime planned) |
| Projects | **2** | `PRJ-GOV-AI-BOS-001`, `PRJ-SAAS-GROWRIXOS-001` |

## AI-BOS agents → Cursor skills

| AG ID | Cursor skill / surface |
|-------|------------------------|
| AG-KNW-ARCH-001 | `@ai-bos-architect` (project-local) |
| AG-GOV-SYSBUILD-001 | `@system-builder` (personal) |
| AG-KNW-VALID-001 | validation via `@ai-bos-architect` / phase checklists |
| AG-DLV-SAAS-001 | `@senior-saas-developer` |
| AG-DLV-FE-001 | `@senior-frontend-specialist` |
| AG-DLV-BE-001 | `@senior-backend-devops-developer` |
| AG-DLV-QA-001 | `@frontend-quality-enforcer` |
| AG-DLV-QA-BE-001 | `@backend-quality-enforcer` |
| AG-DLV-DEVOPS-001 | `@devops-release-engineer` |

## Growrixos `.cursor/agents/` (37)

**Frontend Production:** `senior-saas-developer`, `senior-frontend-specialist`, `frontend-system-architect`, `frontend-content-strategist`, `Technical_SEO_expert`, `On_Page_SEO_expert`, `Off_Page_SEO_expert`, `frontend-quality-enforcer`

**Backend & DevOps:** `senior-backend-devops-developer`, `api-contract-architect`, `integration-platform-engineer`, `devops-release-engineer`, `backend-quality-enforcer`

**HTML (`sites/`):** `frontend-architect`, `design-system-architect`, `accessibility-auditor`, `performance-optimizer`, `code-reviewer`

**Next migration:** `nextjs-migration-architect`, `tailwind-design-system-architect`, `nextjs-accessibility-auditor`, `nextjs-performance-optimizer`, `nextjs-code-reviewer`, `nextjs-visual-parity-auditor`

**Blueprint factory:** `bp-director`, `bp-01` … `bp-12` (incl. `bp-11-uniqueness-enforcer`)

## Project skills (`.cursor/skills/`)

| Skill | Lane |
|-------|------|
| `html-website-builder` | `sites/` |
| `nextjs-site-migrator` | `Frontend_Nextjs/` |
| `frontend-ui-converter` | conversion |
| `website-blueprint-factory` | blueprints |
| `ai-bos-architect` | `AI-BOS/` (under `AI-BOS/.cursor/skills/`) |

## Personal delivery skills with AI-BOS binding (I4)

Each has `references/ai-bos-binding.md` + Read First entry:

- `@senior-saas-developer`
- `@senior-frontend-specialist`
- `@senior-backend-devops-developer`
- `@frontend-quality-enforcer`
- `@backend-quality-enforcer`
- `@devops-release-engineer`

## Commands (`.cursor/commands/`)

| Command | Purpose |
|---------|---------|
| `/frontend-factory` | SaaS / FE factory |
| `/convert-ui` | UI conversion |
| `/phase-gate` | Frontend phase-end |
| `/resume-brain` | Resume FE/SaaS |
| `/backend-factory` | Backend factory |
| `/phase-gate-backend` | Backend phase-end |
| `/integration-plan` | Integration planning |
| `/resume-backend-brain` | Resume backend |
| `/new-site`, `/new-site-phase2` | HTML templates |
| `/migrate-to-next`, `/parity-pass`, `/convert-frontend-ui` | Next migration |
| `/new-blueprint` | Blueprint factory |
| `/pre-push-check` | CI parity before push |

## Rules (`.cursor/rules/`)

| Rule | Scope |
|------|-------|
| `00-core-frontend-architect` | always / core |
| `10-single-file-html-standards` | `sites/` |
| `20-design-system` | design tokens |
| `30-accessibility` | a11y |
| `40-performance-seo` | perf/SEO |
| `50-nextjs-production-standards` | Next |
| `51-web-production-gates` | `web/` |
| `60-zero-gate-health-check` | all tracks |
| `70-execution-constitution` | brain / layers |
| `71-git-discipline` | git |
| `72-phase-gate-discipline` | phase gates |
| `73-backend-platform-standards` | backend |
| `74-devops-release-discipline` | devops |
| **`76-ai-bos-saas-binding`** | **`web/**` → AI-BOS project** |
| `75-ai-bos-governance` | under `AI-BOS/.cursor/rules/` |

## Ledgers

| Lane | Ledger |
|------|--------|
| AI-BOS | `AI-BOS/tasks.md` |
| SaaS `web/` | `DOC/PROJECT PLAN/Tasks/tasks.md` |
| Templates / migration | `.cursor/execution/template-tasks.md` |

## Out of scope / remaining gaps

- MCP `MC-KNW-REGISTRY-001` runtime implementation still planned
- Optional later KOs: SEO/content HB, integration playbooks, `PT-*` patterns
- Separate `PRJ-*` for `sites/` / `Frontend_Nextjs/` not yet registered
