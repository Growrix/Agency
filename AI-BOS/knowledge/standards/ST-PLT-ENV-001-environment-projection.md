---
id: ST-PLT-ENV-001
title: Environment Projection Standard
type: standard
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
  - AR-AI-BOS-007
  - AR-AI-BOS-011
  - RU-AI-BOS-VAULT-001
  - ST-AGT-001
related:
  - environment
  - projection
  - portability
review_cycle: quarterly
last_review: 2026-07-18
priority: high
tags:
  - ai-bos
  - standard
  - environment
capabilities:
  - CAP-PLT-005
  - CAP-PLT-001
---

# Environment Projection Standard

## Purpose

Define how the AI-BOS vault projects to IDE and runtime environments without splitting SSOT across hosts.

## Scope

Cursor, Copilot-style agent packs, Claude-style instruction packs, and portable prompt packs generated from the vault. Does not define product deploy environments (Vercel, etc.).

## Principles

1. Vault is SSOT; environment packs are projections.
2. Projections are generated under the vault (or synced from vault).
3. No environment may become a second registry.
4. Vendor-independent agent IDs remain stable across projections.

## Standards

### Projection targets

| Target | Vault output location | Notes |
|--------|----------------------|-------|
| Cursor | `.cursor/agents/`, `.cursor/skills/`, `.cursor/rules/`, `.cursor/brain/` | Primary runtime inside vault |
| Copilot-style | `runtime/copilot/agents/` (optional pack) | Generated copies; not SSOT |
| Claude-style | `runtime/claude/` (optional pack) | Instruction slices referencing KO IDs |
| Portable prompts | `universal/Prompts/` + `runtime/portable/` | Already vault-local preferred |

### Rules

1. Create optional `runtime/<env>/` only when a second environment is requested.
2. Every projected file must declare its source `AG-*` or KO ID.
3. Host sync (vault → host `.cursor/`) is derived install only.
4. Forbidden: registering host or personal paths as `runtime_projection`.

### Naming

- Vault Cursor skill: `vault-skill:<name>` → `.cursor/skills/<name>/`
- Vault Cursor agent: `vault-agent:<name>` → `.cursor/agents/<name>.md`

## Best Practices

- Prefer opening the vault as workspace root over host sync.
- Keep Copilot/Claude packs thin wrappers around vault knowledge IDs.

## Anti-patterns

- Maintaining divergent agent bodies in host and vault.
- Generating environment packs outside the vault as SSOT.

## References

- RU-AI-BOS-VAULT-001
- AR-AI-BOS-007

## Related Knowledge Objects

- HB-PLT-SYSBUILD-001
- WF-PLT-SYSBUILD-001

## Change History

| Version | Date | Change |
|---------|------|--------|
| 1.0.0 | 2026-07-18 | Initial environment projection standard (I10). |
