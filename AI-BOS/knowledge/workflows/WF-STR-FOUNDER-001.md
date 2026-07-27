---
id: WF-STR-FOUNDER-001
title: Founder Intake-to-Plan Workflow
type: workflow
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
dependencies:
  - HB-STR-FOUNDER-001
  - ST-STR-MEMORY-001
  - AR-AI-BOS-009
  - RU-AI-BOS-HANDOFF-001
related:
  - founder-os
  - intake
  - e2e-plan
review_cycle: quarterly
last_review: 2026-07-18
priority: high
tags:
  - ai-bos
  - workflow
  - founder
capabilities:
  - CAP-STR-006
  - CAP-STR-007
  - CAP-KNW-007
---

# Founder Intake-to-Plan Workflow

## Purpose

Define the repeatable workflow from founder intake through business architecture and E2E build plan, ending with a structured handoff to delivery agents.

## Scope

All new initiatives handled by `AG-STR-FOUNDER-001`. Does not include implementation phases (those follow delivery workflows).

## Principles

1. **Disk before chat** — material plans must exist as files before handoff.
2. **Human gates at external actions** — stop for credentials, subscriptions, account setup.
3. **One initiative at a time** — finish intake and plan before spawning delivery work.

## Standards

### Workflow steps

```text
1. SESSION START
   ├── Read founder-os-brain.md
   ├── Read founder-os-memory/ (recent memory + inbox)
   └── Read AI-BOS/tasks.md for I12+ governance state

2. INTAKE
   ├── Capture founder goal (services / digital product / SaaS / automation)
   ├── Ingest client conversations, forms, pasted files from inbox/
   ├── Read database (read-only) if credentials supplied
   └── Write raw intake record → founder-os-memory/memory/

3. RESEARCH (when needed)
   ├── Market / competitor / feasibility research
   ├── Report missing_knowledge if unverified
   └── Record findings → memory/

4. BUSINESS ARCHITECTURE
   ├── Revenue model, audience, offer, constraints
   ├── Map to AI-BOS capabilities and delivery lanes
   └── Produce scope doc on disk (path per initiative type)

5. E2E BUILD PLAN
   ├── For SaaS: align with DOC/PROJECT PLAN/ pattern or master planner output
   ├── For templates: route to sites/ or blueprints/ lane
   ├── For automations: scope n8n/integration agents
   └── List external human actions required (API keys, accounts, subscriptions)

6. HUMAN GATE
   ├── Present plan + external action checklist (Bangla if human-facing)
   └── Wait for human approval before delivery handoff

7. HANDOFF
   ├── Route to AG-DLV-SAAS-001 / AG-DLV-HTML-LEAD-001 / AG-BP-DIR-001 / etc.
   ├── Pass structured brief (goal, scope doc path, memory refs, blockers)
   └── Emit পরবর্তী ধাপ (সহজ বাংলা) per RU-AI-BOS-HANDOFF-001
```

### Output artifacts (minimum)

| Artifact | When |
|----------|------|
| Intake record (JSON + MD summary) | Every session with new input |
| Scope doc | Before delivery handoff |
| External action checklist | When human-only steps exist |
| Handoff brief | At delivery delegation |

## Best Practices

- Use `ST-PLT-REWIRE-001` when switching the active delivery project
- Link memory records by project slug under `founder-os-memory/projects/`
- For returning clients, read prior project memory before re-planning

## Anti-patterns

- Skipping intake and jumping to code requests
- Handing off without a scope doc on disk
- Storing API keys in memory files
- Running full E2E planning when user only asked a quick question

## References

- HB-STR-FOUNDER-001
- ST-STR-MEMORY-001
- AR-AI-BOS-009 — execution architecture

## Related Knowledge Objects

- WF-DLV-SAAS-FEATURE-001 — downstream SaaS delivery
- ST-PLT-REWIRE-001 — project rewire

## Change History

| Version | Date | Change |
|---------|------|--------|
| 1.0.0 | 2026-07-18 | Initial intake-to-plan workflow (I12). |
