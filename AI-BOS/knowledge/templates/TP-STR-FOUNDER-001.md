---
id: TP-STR-FOUNDER-001
title: Founder OS Project Template
type: template
category: strategy
domain: ai-bos
version: 1.0.0
status: active
owner: AI-BOS
visibility: internal
audience:
  - human
  - ai
consumers:
  - AG-STR-FOUNDER-001
  - AG-GOV-SYSBUILD-001
dependencies:
  - ST-PRJ-001
  - HB-STR-FOUNDER-001
  - ST-STR-MEMORY-001
  - ST-PLT-REWIRE-001
related:
  - founder-os
  - project-template
review_cycle: quarterly
last_review: 2026-07-18
priority: high
tags:
  - ai-bos
  - template
  - founder
  - project
capabilities:
  - CAP-STR-006
  - CAP-STR-007
  - CAP-OPS-005
---

# Founder OS Project Template

## Purpose

Template for instantiating `PRJ-STR-FOUNDEROS-001` or spawning a new founder-scoped initiative under the Growrix OS workspace.

## Scope

Project registry entry shape and runtime scaffold checklist. Copy and adapt for new founder initiatives.

## Principles

1. Founder project is the **entry lane**, not a code root.
2. Delivery projects spin out with their own `PRJ-*` when implementation begins.

## Standards

### Project registry entry (canonical)

```json
{
  "id": "PRJ-STR-FOUNDEROS-001",
  "name": "Growrix Founder OS",
  "version": "1.0.0",
  "status": "active",
  "owner": "human: founder",
  "capabilities": [
    "CAP-STR-001",
    "CAP-STR-002",
    "CAP-STR-006",
    "CAP-STR-007",
    "CAP-KNW-005",
    "CAP-KNW-007",
    "CAP-ORG-001",
    "CAP-ORG-002",
    "CAP-GRO-001",
    "CAP-GRO-002",
    "CAP-DLV-003",
    "CAP-DLV-006"
  ],
  "consumes": [
    "HB-STR-FOUNDER-001",
    "WF-STR-FOUNDER-001",
    "ST-STR-MEMORY-001",
    "ST-PLT-REWIRE-001",
    "AR-AI-BOS-004",
    "AR-AI-BOS-007",
    "AR-AI-BOS-011",
    "RU-AI-BOS-HANDOFF-001",
    "RU-AI-BOS-VAULT-001"
  ],
  "agents": [
    "AG-STR-FOUNDER-001",
    "AG-DLV-SAAS-001",
    "AG-GOV-SYSBUILD-001",
    "AG-KNW-ARCH-001",
    "AG-GRO-SEO-TECH-001",
    "AG-GRO-SEO-ON-001",
    "AG-GRO-SEO-OFF-001"
  ],
  "mcp_servers": ["MC-KNW-REGISTRY-001"],
  "workflows": ["WF-STR-FOUNDER-001"],
  "governance": {
    "knowledge_owners": ["AG-KNW-ARCH-001"],
    "auditor": "AG-KNW-VALID-001"
  },
  "runtime_projection": "cursor",
  "root_path": "F:/PROJECTS/Growrixos/",
  "ledger_path": "AI-BOS/tasks.md",
  "memory_path": ".cursor/brain/founder-os-memory/",
  "updated": "2026-07-18"
}
```

### Runtime scaffold checklist

- [ ] `.cursor/brain/founder-os-brain.md` exists
- [ ] `.cursor/brain/founder-os-memory/` tree per ST-STR-MEMORY-001
- [ ] `lane-router.yaml` has `founder_os` lane
- [ ] `AI-BOS/.cursor/skills/founder-os/SKILL.md` in vault
- [ ] Host `.cursor/skills/founder-os/` derived copy
- [ ] `AG-STR-FOUNDER-001` in agent-registry

### Spawning a delivery project from founder intake

When implementation is approved:

1. Register new `PRJ-*` (e.g. `PRJ-SAAS-CLIENT-002`)
2. Run ST-PLT-REWIRE-001 Part A steps 2–6 for that lane
3. Hand off to `AG-DLV-SAAS-001` with scope doc path
4. Link founder memory project slug to new PRJ id in `memory/records/`

## Best Practices

- Keep founder project `root_path` at workspace root for cross-lane orchestration
- Use `memory_path` for all founder-specific persistence, not product code dirs

## Anti-patterns

- Using founder project as the only PRJ when multiple clients exist
- Skipping delivery PRJ registration when code work starts

## References

- ST-PRJ-001
- ST-PLT-REWIRE-001
- HB-STR-FOUNDER-001

## Related Knowledge Objects

- AR-AI-BOS-011
- WF-STR-FOUNDER-001

## Change History

| Version | Date | Change |
|---------|------|--------|
| 1.0.0 | 2026-07-18 | Initial founder project template (I12). |
