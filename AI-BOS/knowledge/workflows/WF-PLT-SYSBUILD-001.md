---
id: WF-PLT-SYSBUILD-001
title: System Builder Vault Build Workflow
type: workflow
category: platform
domain: ai-bos
version: 1.0.0
status: active
owner: AI-BOS
visibility: internal
audience:
  - human
  - ai
consumers:
  - AG-GOV-SYSBUILD-001
dependencies:
  - HB-PLT-SYSBUILD-001
  - RU-AI-BOS-VAULT-001
  - RU-AI-BOS-HANDOFF-001
  - ST-PLT-ENV-001
  - ST-AGT-001
  - ST-REG-001
related:
  - workflow
  - system-builder
review_cycle: quarterly
last_review: 2026-07-18
priority: high
tags:
  - ai-bos
  - workflow
  - system-builder
capabilities:
  - CAP-PLT-004
  - CAP-OPS-005
  - CAP-PLT-001
---

# System Builder Vault Build Workflow

## Purpose

Governed sequence for designing or extending the AI-BOS vault agentic system.

## Scope

Structural changes owned by AG-GOV-SYSBUILD-001. Pattern: sequential + human_gated for lane redesign; sequential for additive enrollment.

## Principles

Follow HB-PLT-SYSBUILD-001 and RU-AI-BOS-VAULT-001.

## Standards

### Steps

| Step | Pattern | Action | Idempotent |
|------|---------|--------|------------|
| 1 | sequential | Read `tasks.md` + vault registries + RU-AI-BOS-VAULT-001 | yes |
| 2 | conditional | If external source needed → copy-in into vault | yes |
| 3 | conditional | If research needed → research protocol; cite evidence | yes |
| 4 | sequential | Expand vault tree if missing surfaces | yes |
| 5 | sequential | Author/update vault files (agents/skills/rules/MCP) | no |
| 6 | sequential | Update agent/knowledge/mcp/project registries | no |
| 7 | sequential | Validate (front matter, unique IDs, vault integrity) | yes |
| 8 | human_gated | Lane redesign or new capability group requires human approval | n/a |
| 9 | sequential | Update `tasks.md` + anatomy docs | yes |
| 10 | handoff | Emit Next agent suggestion (RU-AI-BOS-HANDOFF-001) | yes |

### Failure modes

- External path registered without copy-in → BLOCK vault integrity
- Missing KO / agent ID → BLOCK registry
- Content authoring requested → hand off to AG-KNW-ARCH-001

## Best Practices

- Smallest complete artifact set per change class.
- Run knowledge.validate when MCP available.

## Anti-patterns

- Skipping copy-in.
- Updating registry before files exist on disk.

## References

- HB-PLT-SYSBUILD-001
- ST-PLT-ENV-001

## Related Knowledge Objects

- RU-AI-BOS-VAULT-001
- RU-AI-BOS-HANDOFF-001

## Change History

| Version | Date | Change |
|---------|------|--------|
| 1.0.0 | 2026-07-18 | Initial System Builder vault workflow (I10). |
