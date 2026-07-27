---
id: HB-PLT-SYSBUILD-001
title: System Builder Handbook — Vault Platform Builder
type: handbook
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
  - AR-AI-BOS-001
  - AR-AI-BOS-004
  - AR-AI-BOS-007
  - AR-AI-BOS-008
  - AR-AI-BOS-009
  - AR-AI-BOS-010
  - AR-AI-BOS-011
  - AR-AI-BOS-012
  - ST-AGT-001
  - ST-GOV-001
  - ST-REG-001
  - RU-AI-BOS-VAULT-001
  - RU-AI-BOS-HANDOFF-001
related:
  - system-builder
  - vault
  - platform
review_cycle: quarterly
last_review: 2026-07-18
priority: critical
tags:
  - ai-bos
  - handbook
  - system-builder
capabilities:
  - CAP-OPS-005
  - CAP-PLT-001
  - CAP-PLT-003
  - CAP-PLT-005
  - CAP-STR-004
---

# System Builder Handbook — Vault Platform Builder

## Purpose

Define how AG-GOV-SYSBUILD-001 plans, researches, expands, and validates the AI-BOS vault as a portable agentic business operating system — not only individual Cursor wrappers.

## Scope

Structural work under the AI-BOS vault: agents, skills, rules, MCP, registries, brain, environment packs. Knowledge Object body authoring stays with AG-KNW-ARCH-001. Product feature code stays with delivery agents.

## Principles

1. Vault-first (RU-AI-BOS-VAULT-001) — never register external roots as SSOT.
2. Capabilities before folders (AR-AI-BOS-004).
3. Agents consume knowledge; they are not knowledge (AR-AI-BOS-007).
4. Research before inventing — report `missing_knowledge` when unverified.
5. Handoffs are suggestions to humans (RU-AI-BOS-HANDOFF-001).

## Standards

### Modes

| Mode | Use |
|------|-----|
| DESIGN | New capability, agent, MCP, or vault surface |
| AUDIT | Inventory gaps; vault integrity |
| EXTEND | Add/revise artifacts inside vault |
| ALIGN | Propagate approved policy across vault surfaces |
| REPAIR | Close declared drift with smallest complete set |
| DOCUMENT | Refresh registries and catalogs |

### Decision tree (intake)

1. Is this structural (skill/rule/registry/MCP/agent tree)? → System Builder.
2. Is this KO body content? → hand off to AG-KNW-ARCH-001.
3. Is this product code? → hand off to delivery AG-*.
4. Does the file live outside the vault? → copy-in first (RU-AI-BOS-VAULT-001).
5. Is online research needed? → research protocol below, then design.

### Copy-in protocol

1. Source path (outside vault) identified.
2. Destination under `.cursor/agents|skills|rules|brain/` or `mcp/` or `universal/`.
3. Copy complete bundle (no partial skill without SKILL.md).
4. Rewrite projections to `vault-skill:` / `vault-agent:`.
5. Register + validate + ledger evidence.

### Research protocol

When decisions need external facts (vendor APIs, Cursor surface changes, MCP specs):

1. State the question and why it blocks the design.
2. Use web research tools when available; cite URLs in evidence.
3. Never invent APIs, env vars, or product behavior.
4. Record findings under `AI-BOS/.cursor/audits/` or the KO Change History.
5. If research is blocked, emit Bangla external-input brief per System Builder skill.

### Read-before-build (minimum KO set)

AR-AI-BOS-001, 004, 007, 008, 009, 010, 011, 012; ST-AGT-001, ST-GOV-001, ST-REG-001, ST-EXE-001; RU-AI-BOS-VAULT-001; HB-GOV-OPS-001; vault `tasks.md`.

### Output contract

Every material run: System Audit → Change Plan → Files Created/Updated → Remaining Gaps → Validation Results → Next agent suggestion.

## Best Practices

- Expand the vault tree before inventing parallel roots.
- Prefer EXTEND of existing AG-* over new duplicates.
- Keep environment packs generated under the vault (ST-PLT-ENV-001).
- End with RU-AI-BOS-HANDOFF-001 suggestions.

## Anti-patterns

- Wiring Growrixos host `.cursor/` or personal skills as canonical.
- Merging Architect and System Builder into one performer.
- Silent registry registration without on-disk vault files.
- Skipping research and inventing platform APIs.

## References

- Vault skill: `.cursor/skills/system-builder/SKILL.md`
- WF-PLT-SYSBUILD-001, ST-PLT-ENV-001

## Related Knowledge Objects

- RU-AI-BOS-VAULT-001
- RU-AI-BOS-HANDOFF-001
- WF-PLT-SYSBUILD-001
- ST-PLT-ENV-001
- HB-GOV-OPS-001

## Change History

| Version | Date | Change |
|---------|------|--------|
| 1.0.0 | 2026-07-18 | Initial System Builder handbook (I10). |
