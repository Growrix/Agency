---
id: AR-AI-BOS-004
title: AI-BOS Business Capability Model
type: architecture
category: governance
domain: ai-bos
version: 1.0.0
status: draft
owner: AI-BOS
visibility: internal
audience:
  - human
  - ai
consumers:
  - ai-bos-architect
dependencies:
  - AR-AI-BOS-001
  - AR-AI-BOS-002
  - AR-AI-BOS-003
related:
  - capability-model
  - capabilities
  - business-architecture
review_cycle: quarterly
last_review: 2026-07-16
priority: critical
tags:
  - ai-bos
  - capability-model
  - business-architecture
  - foundational
---

# AI-BOS Business Capability Model

## Purpose

Define the **permanent business capabilities** the AI Business Operating System must provide. Capabilities are the stable spine of the system — they do not change when tools, providers, or projects change. Every downstream layer (Knowledge, Documentation, Agents, MCP, Projects, Repository) is derived from these capabilities, never the reverse.

This model replaces the question "what folders should exist?" with "what must the business be able to do?" Folders are a consequence, not a starting point.

## Scope

Defines capability groups and individual capabilities at the business-architecture level. Does **not** specify:
- Folder or repository structure (final layer, designed in Phase 11)
- Specific tools, agents, or MCP servers (Phases 7–8)
- Knowledge object schemas (Phase 5)
- Project instantiation (Phase 11)

Capabilities are intentionally tool-agnostic and provider-agnostic.

## Principles

1. **Capabilities are permanent** — they survive technology swaps, provider changes, and project turnover.
2. **Capabilities are not org units** — a capability may be served by humans, AI, or both; the capability is the function, not the performer.
3. **One capability = one responsibility** — like Knowledge Objects, capabilities are mutually exclusive.
4. **Capabilities drive everything downstream** — Knowledge, Agents, MCP, and Projects exist to serve capabilities, not the other way around.
5. **SaaS is one domain, not the domain** — the model covers all long-term vision domains (Vision §"Long Term Vision").
6. **Stable grouping, evolvable members** — capability groups are extremely durable; individual capabilities may be added but rarely removed.

## Standards

### Capability ID convention

`CAP-<GROUP>-<NNN>` where `<GROUP>` is the 3-letter group code and `<NNN>` is a zero-padded sequence.

### Capability groups

| Code | Group | Why this group exists |
|------|-------|-----------------------|
| `STR` | Strategy & Planning | The business must decide what to do before doing it — vision, planning, research, prioritization |
| `DLV` | Delivery | The business must produce outputs — software, sites, content, proposals |
| `GRO` | Growth | The business must attract and convert demand — marketing, SEO, lead generation, sales |
| `OPS` | Operations & Governance | The business must run itself — SOPs, quality, security, compliance, finance |
| `KNW` | Knowledge & Learning | The business must capture, organize, and reuse what it knows — the AI-BOS core mission |
| `PLT` | Platform & Infrastructure | The business must provide reusable technical substrate — agents, MCP, registry, automation |
| `ORG` | Organization & People | The business must coordinate performers — humans, AI agents, roles, onboarding |

### Capability register

#### Group: Strategy & Planning (STR)

| ID | Capability | Definition | Produces | Consumed by |
|----|-----------|------------|----------|-------------|
| CAP-STR-001 | Vision & Direction | Articulate and maintain the long-term destination of the business and AI-BOS | Vision artifacts, Constitution | All other groups |
| CAP-STR-002 | Business Planning | Translate vision into business plans, objectives, and roadmaps | Business plans, OKRs | Delivery, Growth |
| CAP-STR-003 | Product Planning | Define what products/services to build and their evolution | Product specs, roadmaps | Delivery |
| CAP-STR-004 | Research & Intelligence | Investigate markets, competitors, technologies, and feasibility | Research reports, competitor analyses | Strategy, Growth |
| CAP-STR-005 | Prioritization & Decision | Decide what to do, what to defer, what to reject; record rationale | Decision logs, priority matrices | All groups |

#### Group: Delivery (DLV)

| ID | Capability | Definition | Produces | Consumed by |
|----|-----------|------------|----------|-------------|
| CAP-DLV-001 | SaaS Development | Design, build, ship, and operate SaaS products | SaaS applications, releases | Growth, Operations |
| CAP-DLV-002 | Web Development Agency | Build and deliver client websites and web apps | Client sites, deliverables | Growth, Operations |
| CAP-DLV-003 | Client Delivery | Manage client engagements end-to-end | Proposals, contracts, deliverables, handoffs | Growth, Operations |
| CAP-DLV-004 | Architecture & Design | Produce technical and visual architecture for any delivery | Architecture docs, design systems, blueprints | All Delivery capabilities |
| CAP-DLV-005 | Coding Workflows | Execute implementation with consistent quality and velocity | Code, reviews, builds | SaaS, Agency |
| CAP-DLV-006 | Proposal Generation | Generate winning proposals from requirements and prior knowledge | Proposals, statements of work | Client Delivery, Growth |

#### Group: Growth (GRO)

| ID | Capability | Definition | Produces | Consumed by |
|----|-----------|------------|----------|-------------|
| CAP-GRO-001 | Lead Generation | Attract and capture potential-client interest | Leads, lead magnets, funnels | Sales, Client Delivery |
| CAP-GRO-002 | Marketing | Communicate value to the market across channels | Campaigns, content, assets | Lead Generation |
| CAP-GRO-003 | SEO | Improve discoverability and authority in search | Technical SEO, on-page, off-page outputs | Marketing, Lead Gen |
| CAP-GRO-004 | Social Media Content | Produce and publish social content | Social posts, calendars | Marketing |
| CAP-GRO-005 | Sales & Conversion | Convert leads into clients | Pipelines, deals, contracts | Client Delivery |

#### Group: Operations & Governance (OPS)

| ID | Capability | Definition | Produces | Consumed by |
|----|-----------|------------|----------|-------------|
| CAP-OPS-001 | Internal SOPs | Define and maintain standard operating procedures | SOPs, playbooks | All groups |
| CAP-OPS-002 | Quality Assurance | Verify outputs meet the quality bar before delivery | Audit reports, gate results | Delivery, Growth |
| CAP-OPS-003 | Security & Compliance | Protect assets, data, and customers; meet obligations | Security policies, audit logs, compliance evidence | All groups |
| CAP-OPS-004 | Finance & Billing | Track money in and out; invoice and report | Invoices, reports, forecasts | Operations |
| CAP-OPS-005 | Governance & Evolution | Govern the AI-BOS itself and evolve it over time | Amendments, version logs, registry changes | All groups (meta) |

#### Group: Knowledge & Learning (KNW) — AI-BOS core

| ID | Capability | Definition | Produces | Consumed by |
|----|-----------|------------|----------|-------------|
| CAP-KNW-001 | Knowledge Capture | Author and ingest knowledge as Knowledge Objects | Knowledge Objects (handbooks, standards, patterns) | All groups |
| CAP-KNW-002 | Knowledge Organization | Maintain the registry, IDs, dependencies, and taxonomy | Registry entries, indexes, dependency graphs | Knowledge consumers |
| CAP-KNW-003 | Knowledge Discovery | Find knowledge by ID, tag, dependency, or semantic query | Search results, related-object maps | All knowledge consumers |
| CAP-KNW-004 | Knowledge Reuse | Apply existing knowledge to new projects without duplication | Reused artifacts, reference links | Delivery, Growth, Operations |
| CAP-KNW-005 | Learning & Onboarding | Bring humans and AI agents up to competence on the system | Learning paths, onboarding guides | Organization, Platform |
| CAP-KNW-006 | Knowledge Validation | Verify knowledge is current, non-duplicate, and well-formed | Validation reports, deprecation notices | Knowledge Organization |

#### Group: Platform & Infrastructure (PLT)

| ID | Capability | Definition | Produces | Consumed by |
|----|-----------|------------|----------|-------------|
| CAP-PLT-001 | Agent Platform | Provide, version, and govern AI agents that consume knowledge | Agent definitions, agent registry entries | All groups |
| CAP-PLT-002 | MCP Capability Layer | Provide tool/capability servers (MCP) that agents call | MCP servers, capability contracts | Agent Platform |
| CAP-PLT-003 | Registry & Storage | Maintain the machine-readable registry and storage substrate | Registry, indexes, storage backend | Knowledge Organization |
| CAP-PLT-004 | Automation & Workflows | Encode repeatable multi-step workflows | Workflows, automation scripts | All groups |
| CAP-PLT-005 | Tooling & Integration | Integrate external tools (IDEs, providers, dev tools) without lock-in | Integration adapters, tool configs | Platform, Delivery |

#### Group: Organization & People (ORG)

| ID | Capability | Definition | Produces | Consumed by |
|----|-----------|------------|----------|-------------|
| CAP-ORG-001 | Role Definition | Define human and AI roles and their authority | Role definitions, RACI matrices | All groups |
| CAP-ORG-002 | Onboarding | Bring new humans or agents into productive operation | Onboarding plans, ramp artifacts | Organization |
| CAP-ORG-003 | Coordination & Handoffs | Route work between performers cleanly | Handoff contracts, routing rules | All groups |
| CAP-ORG-004 | Performance & Feedback | Measure and improve performer effectiveness | Reviews, feedback loops | Organization |

### Capability-to-vision coverage map

Confirms every long-term vision domain is served by at least one capability.

| Vision domain | Primary capabilities |
|---------------|---------------------|
| SaaS development | CAP-DLV-001, CAP-DLV-004, CAP-DLV-005 |
| Web development agency | CAP-DLV-002, CAP-DLV-003, CAP-DLV-006 |
| Client delivery | CAP-DLV-003, CAP-DLV-006, CAP-OPS-002 |
| Research | CAP-STR-004 |
| Business planning | CAP-STR-002 |
| Product planning | CAP-STR-003 |
| Lead generation | CAP-GRO-001, CAP-GRO-002 |
| Marketing | CAP-GRO-002, CAP-GRO-004 |
| SEO | CAP-GRO-003 |
| Social media content | CAP-GRO-004 |
| Documentation | CAP-KNW-001, CAP-KNW-002 |
| Proposal generation | CAP-DLV-006 |
| Architecture | CAP-DLV-004 |
| Coding workflows | CAP-DLV-005 |
| MCP servers | CAP-PLT-002 |
| AI Agents | CAP-PLT-001 |
| Knowledge management | CAP-KNW-001 through CAP-KNW-006 |
| Learning | CAP-KNW-005, CAP-ORG-002 |
| Internal SOPs | CAP-OPS-001 |
| Future business domains | Inherited via capability groups (no new groups needed) |

### Capability derivation rule (binding)

Every downstream layer must trace to a capability:

| Downstream layer | Derivation rule |
|------------------|-----------------|
| Knowledge Object | Must declare `consumers` referencing at least one capability ID |
| Agent | Must declare which capabilities it serves |
| MCP server | Must declare which capabilities it provides tools for |
| Project | Must declare which capabilities it instantiates |
| Repository structure | Must organize by capability group, not by tool or team |

This rule is a candidate for Constitution §5 (Permanent Rules).

## Best Practices

- When proposing a new capability, first ask which existing capability it duplicates; extend before adding.
- Group codes are immutable; capability IDs within a group are stable once ratified.
- Use the coverage map whenever a vision domain is added — if no capability serves it, that is a real gap, not a documentation issue.
- Treat `CAP-OPS-005 Governance & Evolution` as the only self-referential capability — it governs the system that contains it.

## Anti-patterns

- Designing folders first and then reverse-engineering capabilities to match them.
- Allowing one capability to absorb another's responsibility ("capability creep") instead of splitting.
- Naming capabilities after tools ("the Cursor capability") or providers ("the OpenAI capability").
- Creating a capability per project — projects instantiate capabilities, they are not capabilities.
- Treating AI agents as capabilities — agents are performers; capabilities are functions.
- Skipping the coverage map and silently leaving a vision domain unserved.

## References

- `knowledge/architecture/AR-AI-BOS-001-vision.md` — Vision (source of long-term domains)
- `knowledge/architecture/AR-AI-BOS-002-constitution-toc.md` — Constitution TOC (will ratify derivation rule in §5)
- `knowledge/architecture/AR-AI-BOS-003-assumption-review.md` — Assumption review (A3, A11 inform capability design)
- `AI-BOS/.cursor/skills/ai-bos-architect/references/ai-bos-planning-prompt.md` — Phase 4 spec

## Related Knowledge Objects

- AR-AI-BOS-005 — Knowledge Architecture (Phase 5, next; will map capabilities to Knowledge Object types)
- AR-AI-BOS-006 — Documentation Architecture (Phase 6; will map capabilities to documentation)
- AR-AI-BOS-007 — Agent Architecture (Phase 7; will map capabilities to agents)
- AR-AI-BOS-008 — MCP Architecture (Phase 8; will map capabilities to MCP servers)

## Change History

| Version | Date | Change |
|---------|------|--------|
| 1.0.0 | 2026-07-16 | Initial Phase 4 Business Capability Model — 7 groups, 30 capabilities, full vision coverage map. Awaiting user approval. |
