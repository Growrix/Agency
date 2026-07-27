---
id: AR-ENG-SAASOS-001
title: Engineering OS Architecture
type: architecture
category: engineering
domain: ai-bos
version: 1.0.0
status: active
owner: AI-BOS
visibility: internal
audience:
  - human
  - ai
consumers:
  - AG-ENG-CTO-001
  - AG-STR-FOUNDER-001
dependencies:
  - AR-AI-BOS-004
  - AR-AI-BOS-007
  - HB-ENG-CTO-001
  - RU-AI-BOS-ENGOS-001
related:
  - engineering-os
  - saas
  - founder-os
review_cycle: quarterly
last_review: 2026-07-18
priority: critical
tags:
  - ai-bos
  - architecture
  - engineering
  - engos
capabilities:
  - CAP-ENG-001
  - CAP-DLV-001
  - CAP-DLV-004
  - CAP-DLV-005
---

# Engineering OS Architecture

## Purpose

Define the **Engineering Operating System (Engineering OS)** — a Chief Technology Officer-led department under Founder OS that orchestrates all engineering delivery (SaaS, HTML templates, Next.js migrations, performance, documentation) without replacing lane-specific delivery agents.

## Scope

Architecture for Engineering OS under `PRJ-ENG-SAASOS-001`. Covers hierarchy, authority, memory, human gates, and handoffs. Does **not** define vault runtime projections (those follow `RU-AI-BOS-VAULT-001`).

## Principles

1. **Peer to Marketing OS** — CTO sits alongside CMO under Founder; neither subordinates the other.
2. **Reuse delivery agents** — 22 existing `AG-DLV-*` agents remain lane owners; Engineering OS adds executive + missing divisions only.
3. **Contract-first** — API/schema before cross-layer implementation.
4. **Human gates** — production deploy, secrets, OAuth, payments require human approval.
5. **Memory on disk** — programs, ADRs, incidents, benchmarks under `engineering/` subtree.

## Hierarchy

```text
AG-STR-FOUNDER-001 (Founder OS)
├── AG-GRO-CMO-001 (Marketing OS) — peer
└── AG-ENG-CTO-001 (Engineering OS) — peer
    ├── AG-DLV-SAAS-001 (web/ cross-layer orchestrator)
    ├── AG-DLV-HTML-LEAD-001 (sites/ lead)
    ├── AG-DLV-NEXT-LEAD-001 (Frontend_Nextjs/ lead)
    ├── AG-ENG-PERF-001 (Performance Engineering)
    ├── AG-ENG-DOCS-001 (Documentation)
    └── AG-GRO-MKT-MEMORY-001 (shared memory curator)
```

## Authority matrix

| Scope | Owner | Notes |
|-------|-------|-------|
| Engineering department intake | AG-ENG-CTO-001 | Multi-track or ambiguous engineering |
| web/ cross-layer SaaS | AG-DLV-SAAS-001 | Reports to CTO |
| sites/ HTML | AG-DLV-HTML-LEAD-001 | Reports to CTO |
| Frontend_Nextjs/ | AG-DLV-NEXT-LEAD-001 | Reports to CTO |
| Performance / CWV / cost | AG-ENG-PERF-001 | Specialist |
| ADRs / runbooks / changelogs | AG-ENG-DOCS-001 | Specialist |
| Business strategy | AG-STR-FOUNDER-001 | CTO escalates |
| Marketing coordination | AG-GRO-CMO-001 | Peer handoff |

## Memory layout

Under `founder-os-memory/projects/<slug>/engineering/`:

| Subtree | Purpose |
|---------|---------|
| `programs/` | Engineering program roadmaps and briefs |
| `adr/` | Architecture decision records |
| `incidents/` | Incident postmortems |
| `benchmarks/` | Performance benchmarks |
| `runbooks/` | Operational runbooks |
| `changelogs/` | Release notes |

## Human gates

- Production deploy
- Secrets / API keys / OAuth credentials
- Payment provider configuration
- Database migrations in production

## Coverage vs 16 divisions

| Division | Status | Agent / KO |
|----------|--------|------------|
| Executive / CTO | NEW | AG-ENG-CTO-001 |
| Solution Architecture | COVERED | AG-DLV-SAAS-001 + HB-ENG-ARCH-001 |
| Frontend Engineering | COVERED | AG-DLV-FE-001 |
| Backend Engineering | COVERED | AG-DLV-BE-001 |
| Quality Assurance | COVERED | AG-DLV-QA-001, AG-DLV-QA-BE-001 |
| Performance Engineering | NEW | AG-ENG-PERF-001 |
| Documentation | NEW | AG-ENG-DOCS-001 |
| Product Discovery | PARTIAL | AG-STR-FOUNDER-001 + AG-STR-RESEARCH-001 |
| AI Engineering | PARTIAL | AG-DLV-INT-001 |
| Database | PARTIAL | AG-DLV-BE-001 + HB-ENG-DATA-001 |
| DevOps | PARTIAL | AG-DLV-DEVOPS-001 + HB-OPS-REL-001 |
| Security | PARTIAL | ST-SEC-001 + AG-DLV-QA-BE-001 |
| Developer Experience | PARTIAL | AG-GOV-SYSBUILD-001 |
| Operations | PARTIAL | AG-DLV-DEVOPS-001 |
| Automation | PARTIAL | AG-PLT-AUTOMATION-001 |
| Knowledge & Memory | PARTIAL | AG-GRO-MKT-MEMORY-001 |

## Related Knowledge Objects

- HB-ENG-CTO-001
- WF-ENG-PROGRAM-001
- ST-ENG-SCORECARD-001
- RU-AI-BOS-ENGOS-001
- TP-ENG-SAASOS-001
- AR-GRO-MKOS-001 (peer department)

## Change History

| Version | Date | Change |
|---------|------|--------|
| 1.0.0 | 2026-07-18 | I17 — initial Engineering OS architecture. |
