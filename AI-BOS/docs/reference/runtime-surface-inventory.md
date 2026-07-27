# Runtime Surface Inventory (Growrixos + AI-BOS)

Snapshot after **I6–I9 readiness 85+ gate** (2026-07-17). Tool-specific surfaces; knowledge SSOT stays in AI-BOS registries.

## AI-BOS registries

| Registry | Count | Notes |
|----------|-------|-------|
| Knowledge | **64** objects | 12 AR + 22 ST + 7 TP + 7 WF + 11 HB + 5 RU |
| Agents | **40** | 3 governance + 37 delivery/growth/blueprint |
| MCP | **1** | `MC-KNW-REGISTRY-001` — **runtime live** (`AI-BOS/mcp/knowledge-registry/`) |
| Projects | **5** | gov + SaaS + HTML + Next + blueprints |

## Portable SSOT

| Path | Role |
|------|------|
| `AI-BOS/universal/` | Copied Universal + SEO depth (161 files) |
| `RU-AI-BOS-UNI-001` | Policy — no repo-root `DOC/Universal/` in KOs |

## Projects → rules

| PRJ | Path | Rule |
|-----|------|------|
| PRJ-GOV-AI-BOS-001 | `AI-BOS/` | `75-ai-bos-governance` |
| PRJ-SAAS-GROWRIXOS-001 | `web/` | `76-ai-bos-saas-binding` + SEO pack |
| PRJ-TMPL-HTML-001 | `sites/` | `77-ai-bos-html-binding` |
| PRJ-TMPL-NEXT-001 | `Frontend_Nextjs/` | `78-ai-bos-next-binding` |
| PRJ-BP-WEB-001 | `blueprints/` | `79-ai-bos-blueprint-binding` |
| Conversion | `scripts/conversion/` | `80-ai-bos-conversion-binding` |

## MCP wiring

| Server | Cursor config | Agent |
|--------|---------------|-------|
| `ai-bos-knowledge-registry` | `.cursor/mcp.json` | `AG-KNW-VALID-001` via `@knowledge-validator` skill |

Tools: `knowledge.search`, `knowledge.read`, `knowledge.related`, `knowledge.dependencies`, `knowledge.validate`

## Skills with AI-BOS binding

**Personal (I4 + I5):** `@senior-saas-developer`, `@senior-frontend-specialist`, `@senior-backend-devops-developer`, `@frontend-quality-enforcer`, `@backend-quality-enforcer`, `@devops-release-engineer`, `@api-contract-architect`, `@integration-platform`, `@frontend-content-strategist`, `@technical-seo`, `@on-page-seo`, `@off-page-seo`, `@system-builder`

**Project (I5 + I6):** `html-website-builder`, `nextjs-site-migrator`, `frontend-ui-converter`, `website-blueprint-factory`, `ai-bos-architect`, `knowledge-validator`

## Rules (root + AI-BOS local)

`70` (constitution + PRJ-GOV row), `75` (AI-BOS local), `76–80` (lane bindings + conversion)

## Ledgers

| Lane | Ledger |
|------|--------|
| AI-BOS | `AI-BOS/tasks.md` |
| SaaS `web/` | `DOC/PROJECT PLAN/Tasks/tasks.md` |
| Templates / migration / blueprints | `.cursor/execution/template-tasks.md` |

## Readiness

Score **≥85** — evidence: `AI-BOS/.cursor/audits/2026-07-17-readiness-85.md`
