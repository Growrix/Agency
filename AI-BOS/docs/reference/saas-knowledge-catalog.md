# SaaS Knowledge Catalog (I4)

Human-facing index of Knowledge Objects authored for **`PRJ-SAAS-GROWRIXOS-001`** (`web/`).  
SSOT remains `AI-BOS/knowledge-registry/`. Source material was adapted from `DOC/Universal/Enterprise Level Guide/` without refactoring that tree.

## Handbooks

| ID | Path | Use |
|----|------|-----|
| HB-ENG-FE-001 | `knowledge/handbooks/HB-ENG-FE-001-saas-frontend.md` | Frontend delivery |
| HB-ENG-BE-001 | `knowledge/handbooks/HB-ENG-BE-001-saas-backend.md` | Backend / API |
| HB-ENG-ARCH-001 | `knowledge/handbooks/HB-ENG-ARCH-001-saas-architecture.md` | Cross-layer architecture |
| HB-ENG-DATA-001 | `knowledge/handbooks/HB-ENG-DATA-001-saas-data.md` | Data / persistence |
| HB-OPS-REL-001 | `knowledge/handbooks/HB-OPS-REL-001-saas-release-ops.md` | Release / CI / env |

## Standards

| ID | Path | Use |
|----|------|-----|
| ST-SEC-001 | `knowledge/standards/ST-SEC-001-saas-security.md` | Security baseline |
| ST-TST-001 | `knowledge/standards/ST-TST-001-saas-testing.md` | Testing / gates |
| ST-API-001 | `knowledge/standards/ST-API-001-saas-api.md` | API contracts |
| ST-FE-DS-001 | `knowledge/standards/ST-FE-DS-001-saas-design-system.md` | Design system |

## Workflow + rule

| ID | Path | Use |
|----|------|-----|
| WF-DLV-SAAS-FEATURE-001 | `knowledge/workflows/WF-DLV-SAAS-FEATURE-001.md` | Feature delivery workflow |
| RU-AI-BOS-SAAS-001 | `knowledge/rules/RU-AI-BOS-SAAS-001-saas-project-binding.md` | Project binding (mirrors rule 76) |

## Runtime projections

| Surface | Location |
|---------|----------|
| Cursor rule | `.cursor/rules/76-ai-bos-saas-binding.mdc` (`globs: web/**`) |
| Skill bindings | `~/.cursor/skills/*/references/ai-bos-binding.md` (6 delivery skills) |

## Consumer

`PRJ-SAAS-GROWRIXOS-001` lists these IDs under `consumes` and `workflows` in `project-registry/registry.json`.
