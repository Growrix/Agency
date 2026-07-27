---
id: TP-GRO-MKOS-001
title: Marketing OS Project Template
type: template
category: growth
domain: ai-bos
version: 1.0.0
status: active
owner: AI-BOS
visibility: internal
audience:
  - human
  - ai
consumers:
  - AG-GRO-CMO-001
  - AG-GOV-SYSBUILD-001
dependencies:
  - ST-PRJ-001
  - AR-GRO-MKOS-001
  - RU-AI-BOS-MKOS-001
  - ST-GRO-MKT-MEMORY-001
related:
  - marketing-os
  - project-template
review_cycle: quarterly
last_review: 2026-07-18
priority: high
tags:
  - ai-bos
  - template
  - marketing
  - mktos
capabilities:
  - CAP-GRO-002
  - CAP-GRO-006
  - CAP-GRO-007
  - CAP-GRO-008
  - CAP-GRO-009
  - CAP-GRO-010
  - CAP-GRO-011
  - CAP-GRO-012
  - CAP-GRO-013
  - CAP-GRO-014
  - CAP-GRO-015
  - CAP-OPS-005
---

# Marketing OS Project Template

## Purpose

Template for instantiating **`PRJ-GRO-MKOS-001`** — the Marketing OS project binding all marketing division agents and knowledge objects.

## Scope

Project registry entry shape and runtime scaffold checklist. Per-client/product work uses project slug under founder memory, linked via `marketing/meta.json`.

## Principles

1. **Marketing project is advisory** — not a code root.
2. **CMO is default agent entry** — registry lists CMO first.
3. **Consumes list is exhaustive for Wave 0** — extend in same session when adding KOs.

## Standards

### Project registry entry (canonical)

```json
{
  "id": "PRJ-GRO-MKOS-001",
  "name": "Growrix Marketing OS",
  "version": "1.0.0",
  "status": "active",
  "owner": "human: founder",
  "capabilities": [
    "CAP-GRO-001",
    "CAP-GRO-002",
    "CAP-GRO-003",
    "CAP-GRO-004",
    "CAP-GRO-006",
    "CAP-GRO-007",
    "CAP-GRO-008",
    "CAP-GRO-009",
    "CAP-GRO-010",
    "CAP-GRO-011",
    "CAP-GRO-012",
    "CAP-GRO-013",
    "CAP-GRO-014",
    "CAP-GRO-015",
    "CAP-KNW-007",
    "CAP-ORG-003"
  ],
  "consumes": [
    "AR-GRO-MKOS-001",
    "HB-GRO-MKOS-001",
    "HB-GRO-UNIVERSAL-001",
    "HB-GRO-INTEL-001",
    "HB-GRO-BRAND-001",
    "HB-GRO-CONTENT-001",
    "HB-GRO-SEO-GEO-001",
    "HB-GRO-SOCIAL-001",
    "HB-GRO-ADS-001",
    "HB-GRO-EMAIL-001",
    "HB-GRO-CRO-001",
    "HB-GRO-ANALYTICS-001",
    "HB-GRO-CREATIVE-001",
    "HB-GRO-VIDEO-001",
    "HB-GRO-COMMUNITY-001",
    "HB-GRO-MKT-MEMORY-001",
    "HB-GRO-MARKET-001",
    "ST-GRO-MKT-MEMORY-001",
    "ST-GRO-SCORECARD-001",
    "ST-GRO-CLAIMS-001",
    "RU-AI-BOS-MKOS-001",
    "RU-AI-BOS-HANDOFF-001",
    "RU-AI-BOS-VAULT-001",
    "WF-GRO-CAMPAIGN-001",
    "WF-GRO-LAUNCH-001",
    "WF-GRO-OFFER-001"
  ],
  "agents": [
    "AG-GRO-CMO-001",
    "AG-GRO-MARKET-001",
    "AG-GRO-INTEL-CUST-001",
    "AG-GRO-INTEL-COMP-001",
    "AG-GRO-BRAND-001",
    "AG-GRO-BRAND-GUARD-001",
    "AG-GRO-CONTENT-STRAT-001",
    "AG-GRO-CONTENT-PLAN-001",
    "AG-GRO-COPY-001",
    "AG-GRO-BLOG-001",
    "AG-GRO-REPURPOSE-001",
    "AG-GRO-SEO-GEO-001",
    "AG-GRO-SOCIAL-MGR-001",
    "AG-GRO-SOCIAL-WRITE-001",
    "AG-GRO-ADS-PPC-001",
    "AG-GRO-ADS-META-001",
    "AG-GRO-EMAIL-STRAT-001",
    "AG-GRO-ANALYTICS-001",
    "AG-GRO-MKT-MEMORY-001"
  ],
  "mcp_servers": ["MC-KNW-REGISTRY-001"],
  "workflows": ["WF-GRO-CAMPAIGN-001", "WF-GRO-LAUNCH-001"],
  "governance": {
    "knowledge_owners": ["AG-KNW-ARCH-001"],
    "executive": "AG-GRO-CMO-001"
  },
  "runtime_projection": "cursor",
  "root_path": "F:/PROJECTS/Growrixos/",
  "memory_path": ".cursor/brain/founder-os-memory/projects/<slug>/marketing/",
  "updated": "2026-07-18"
}
```

### Runtime scaffold checklist

- [ ] `AI-BOS/knowledge/` Wave 0 KOs registered in knowledge-registry indexes
- [ ] Vault skills under `AI-BOS/.cursor/skills/marketing-*` and `mkt-*`
- [ ] Host projections under `.cursor/skills/` per rewire protocol
- [ ] `lane-router.yaml` includes `marketing_os` lane → `AG-GRO-CMO-001`
- [ ] `AG-GRO-CMO-001` in agent-registry
- [ ] Founder handoff from `RU-AI-BOS-FOUNDER-001` references CMO

### Spawning a client/product marketing slug

1. Founder sets `active-project.json` slug
2. CMO initializes `projects/<slug>/marketing/` per `ST-GRO-MKT-MEMORY-001`
3. Link `meta.json` `prj_id` to `PRJ-GRO-MKOS-001`
4. Run `WF-GRO-CAMPAIGN-001` Phase 0

## Best Practices

- Keep agent list in registry synchronized with `i15-mktos-generate.mjs` output.
- One slug per client or product initiative — do not fork PRJ id per client.

## Anti-patterns

- Using PRJ-GRO-MKOS-001 as substitute for delivery PRJ when code work starts
- Marketing work with no slug folder initialized

## References

- ST-PRJ-001
- AR-GRO-MKOS-001
- RU-AI-BOS-MKOS-001

## Related Knowledge Objects

- TP-STR-FOUNDER-001
- ST-GRO-MKT-MEMORY-001
- AR-AI-BOS-011

## Change History

| Version | Date | Change |
|---------|------|--------|
| 1.0.0 | 2026-07-18 | Initial Marketing OS project template (I15 Wave 0). |
