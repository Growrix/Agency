---
id: RU-AI-BOS-SAAS-001
title: SaaS Agents Must Consume AI-BOS Project Knowledge
type: rule
category: governance
domain: saas
version: 1.1.0
status: active
owner: AI-BOS
visibility: internal
audience:
  - human
  - ai
consumers:
  - AG-DLV-SAAS-001
  - AG-DLV-FE-001
  - AG-DLV-BE-001
  - AG-DLV-QA-001
  - AG-DLV-QA-BE-001
  - AG-DLV-DEVOPS-001
dependencies:
  - AR-AI-BOS-011
  - ST-PRJ-001
  - ST-AGT-001
  - HB-DLV-SAAS-ORCH-001
  - RU-AI-BOS-HANDOFF-001
  - RU-AI-BOS-VAULT-001
related:
  - rule
  - binding
  - saas
  - orchestrator
review_cycle: quarterly
last_review: 2026-07-18
priority: critical
tags:
  - ai-bos
  - rule
  - saas
capabilities:
  - CAP-KNW-004
  - CAP-DLV-001
  - CAP-OPS-005
---

# SaaS Agents Must Consume AI-BOS Project Knowledge

## Purpose

Permanent rule: SaaS delivery agents working on Growrixos web/ must bind to PRJ-SAAS-GROWRIXOS-001 and its consumes Knowledge Objects. AG-DLV-SAAS-001 is the default cross-layer orchestrator entry.

## Scope

Applies to all AG-DLV-* agents and their vault runtime skill projections when the work root is web/.

## Principles

1. Project identity is PRJ-SAAS-GROWRIXOS-001 for web/ SaaS work.
2. Agents read KO IDs from the project consumes list before material edits.
3. AI-BOS KOs are SSOT over parallel chat summaries; Delegated depth SSOT is AI-BOS/universal/ per RU-AI-BOS-UNI-001.
4. Do not create duplicate delivery skills — extend vault bindings only (RU-AI-BOS-VAULT-001).
5. Structural AI-BOS changes route to system-builder; KO content to ai-bos-architect.
6. AG-DLV-SAAS-001 orchestrates cross-layer work; specialists own deep FE/BE (HB-DLV-SAAS-ORCH-001).

## Standards

### Binding checklist
1. Resolve project PRJ-SAAS-GROWRIXOS-001
2. Load HB-ENG-ARCH-001 + domain HB (FE/BE) as applicable
3. Load ST-SEC-001, ST-TST-001, ST-API-001, ST-FE-DS-001 as applicable
4. Follow WF-DLV-SAAS-FEATURE-001 for feature work
5. Record evidence in DOC/PROJECT PLAN/Tasks/tasks.md
6. End with next-agent suggestion (RU-AI-BOS-HANDOFF-001)

### Orchestrator routing
| Need | Agent |
|------|-------|
| Cross-layer / unclear SaaS | AG-DLV-SAAS-001 (default entry) |
| Frontend-only | AG-DLV-FE-001 |
| Backend-only | AG-DLV-BE-001 |
| Frontend gates | AG-DLV-QA-001 |
| Backend gates | AG-DLV-QA-BE-001 |
| Release / CI / env | AG-DLV-DEVOPS-001 |

### Runtime projection
Vault SSOT: `.cursor/skills/senior-saas-developer/` and `.cursor/agents/senior-saas-developer.md`. Host IDE bindings (e.g. rule 76) are derived installs only.

## Best Practices

- Keep skill Read First lists aligned with this rule.
- When adding KOs, update project consumes in the same session.
- Prefer specialists when one domain dominates.

## Anti-patterns

- Ignoring AI-BOS and inventing standards in chat.
- Creating a second senior SaaS skill instead of binding.
- Using AG-DLV-SAAS-001 as a monolith that skips specialists and QA enforcers.

## References

- AR-AI-BOS-011
- PRJ-SAAS-GROWRIXOS-001
- ST-PRJ-001
- HB-DLV-SAAS-ORCH-001

## Related Knowledge Objects

- WF-DLV-SAAS-FEATURE-001
- HB-ENG-FE-001
- HB-ENG-BE-001
- RU-AI-BOS-HANDOFF-001

## Change History

| Version | Date | Change |
|---------|------|--------|
| 1.0.0 | 2026-07-17 | Initial SaaS project-binding rule authored for I4. |
| 1.1.0 | 2026-07-18 | Orchestrator contract + vault/handoff bindings (I10). |
