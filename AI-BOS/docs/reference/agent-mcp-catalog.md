# Agent and MCP Catalog

Snapshot after **I10 vault-first governance** (2026-07-18). SSOT: `AI-BOS/agent-registry/registry.json`.  
Runtime bodies: `AI-BOS/.cursor/{agents,skills,rules}/` with `vault-skill:` / `vault-agent:` projections.

## Governance agents (3)

| ID | Name | Authority | Runtime |
|----|------|-----------|---------|
| AG-KNW-ARCH-001 | AI-BOS Architect | supervised | `@ai-bos-architect` |
| AG-GOV-SYSBUILD-001 | System Builder | supervised | `@system-builder` |
| AG-KNW-VALID-001 | Knowledge Validator | autonomous | `@knowledge-validator` + MCP `knowledge.validate` |

## SaaS delivery — PRJ-SAAS-GROWRIXOS-001 (13)

| ID | Name | Authority | Runtime |
|----|------|-----------|---------|
| AG-DLV-SAAS-001 | Senior SaaS Developer (orchestrator) | supervised | `vault-skill:senior-saas-developer` |
| AG-DLV-FE-001 | Senior Frontend Specialist | supervised | `@senior-frontend-specialist` |
| AG-DLV-BE-001 | Senior Backend DevOps Developer | supervised | `@senior-backend-devops-developer` |
| AG-DLV-QA-001 | Frontend Quality Enforcer | advisory | `@frontend-quality-enforcer` |
| AG-DLV-QA-BE-001 | Backend Quality Enforcer | advisory | `@backend-quality-enforcer` |
| AG-DLV-DEVOPS-001 | DevOps Release Engineer | supervised | `@devops-release-engineer` |
| AG-DLV-API-001 | API Contract Architect | supervised | `@api-contract-architect` |
| AG-DLV-INT-001 | Integration Platform Engineer | supervised | `@integration-platform` |
| AG-DLV-CONTENT-001 | Frontend Content Strategist | supervised | `@frontend-content-strategist` |
| AG-DLV-CONV-001 | Frontend System Architect | supervised | `@frontend-ui-converter` |
| AG-GRO-SEO-TECH-001 | Technical SEO Expert | supervised | `@technical-seo` |
| AG-GRO-SEO-ON-001 | On-Page SEO Expert | supervised | `@on-page-seo` |
| AG-GRO-SEO-OFF-001 | Off-Page SEO Expert | supervised | `@off-page-seo` |

## HTML templates — PRJ-TMPL-HTML-001 (5)

| ID | Name | Authority | Runtime |
|----|------|-----------|---------|
| AG-DLV-HTML-LEAD-001 | Frontend Architect | supervised | `@html-website-builder` |
| AG-DLV-HTML-DS-001 | Design System Architect | supervised | `design-system-architect` |
| AG-DLV-HTML-A11Y-001 | Accessibility Auditor | advisory | `accessibility-auditor` |
| AG-DLV-HTML-PERF-001 | Performance Optimizer | supervised | `performance-optimizer` |
| AG-DLV-HTML-QA-001 | Code Reviewer | advisory | `code-reviewer` |

## Next.js migration — PRJ-TMPL-NEXT-001 (6)

| ID | Name | Authority | Runtime |
|----|------|-----------|---------|
| AG-DLV-NEXT-LEAD-001 | Next.js Migration Architect | supervised | `@nextjs-site-migrator` |
| AG-DLV-NEXT-DS-001 | Tailwind Design System Architect | supervised | `tailwind-design-system-architect` |
| AG-DLV-NEXT-A11Y-001 | Next.js Accessibility Auditor | advisory | `nextjs-accessibility-auditor` |
| AG-DLV-NEXT-PERF-001 | Next.js Performance Optimizer | supervised | `nextjs-performance-optimizer` |
| AG-DLV-NEXT-QA-001 | Next.js Code Reviewer | advisory | `nextjs-code-reviewer` |
| AG-DLV-NEXT-PARITY-001 | Next.js Visual Parity Auditor | advisory | `nextjs-visual-parity-auditor` |

## Blueprint factory — PRJ-BP-WEB-001 (13)

| ID | Name | Authority | Runtime |
|----|------|-----------|---------|
| AG-BP-DIR-001 | Blueprint Director | supervised | `@website-blueprint-factory` |
| AG-BP-STG-001 … AG-BP-STG-012 | Stages 01–12 | supervised / advisory (11) | `bp-01` … `bp-12` |

**Total agents:** 40 (3 gov + 37 delivery/growth/blueprint)

## MCP

| ID | Name | Role |
|----|------|------|
| MC-KNW-REGISTRY-001 | Knowledge Registry Server | five canonical knowledge services (runtime still planned) |

## Presents Knowledge Objects

- AR-AI-BOS-007
- AR-AI-BOS-008
- ST-AGT-001
- ST-MCP-001
