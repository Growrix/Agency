---
id: AR-AI-BOS-005
title: AI-BOS Knowledge Architecture
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
  - AR-AI-BOS-004
related:
  - knowledge-architecture
  - knowledge-objects
  - registry
  - consumer-model
  - lifecycle
review_cycle: quarterly
last_review: 2026-07-16
priority: critical
tags:
  - ai-bos
  - knowledge-architecture
  - registry
  - foundational
---

# AI-BOS Knowledge Architecture

## Purpose

Define the architecture of the knowledge layer — the AI-BOS core. This phase specifies what a Knowledge Object is, how Knowledge Objects are typed and organized, how the registry indexes them, how capabilities declare knowledge needs, how agents and projects consume knowledge, and how knowledge evolves over its lifecycle.

This is the layer the entire AI-BOS exists to serve. Every other layer (Agents, MCP, Projects, Repository) derives from this one.

## Scope

Defines:
- Knowledge Object type taxonomy (extending the ID convention in `references/front-matter-schema.md`)
- Registry structure and index responsibilities
- Consumer model (Knowledge → Agent → Project)
- Dependency model
- Lifecycle states and transitions
- Validation rules
- Capability-to-knowledge binding

Does **not** define:
- Concrete handbooks or standards content (Phase 12)
- Agent definitions (Phase 7)
- MCP servers (Phase 8)
- Repository folder layout (Phase 11)

## Principles

1. **Knowledge is the substrate, not the output** — agents and projects are outputs; knowledge is what they are built on.
2. **One object, one responsibility** — already in the Knowledge Registry Standard; this phase enforces it via type semantics.
3. **IDs are permanent; paths are mutable** — the registry tracks path changes; references use IDs.
4. **Capabilities declare knowledge needs; knowledge does not declare capabilities** — direction is one-way to prevent coupling.
5. **Vendor independence is a property of the content, not the storage** — knowledge bodies must not assume an IDE, provider, or runtime.
6. **Validation is a gate, not a check** — invalid Knowledge Objects cannot be registered; the registry is the source of truth only for valid objects.
7. **Lifecycle is explicit** — no silent deprecation; status transitions are versioned and discoverable.

## Standards

### Knowledge Object type taxonomy

Extends the ID prefix convention from `references/front-matter-schema.md`. Each type has a defined responsibility; types are mutually exclusive.

| Prefix | Type | Responsibility | Registry index |
|--------|------|----------------|----------------|
| `HB` | Handbook | Authoritative reference on a topic (the "what and why") | `handbook-index.json` |
| `AR` | Architecture | Structural design artifacts (this document, vision, capability model) | `handbook-index.json` (architecture is a sub-kind of handbook) |
| `BP` | Blueprint | Per-project or per-feature build plan | `handbook-index.json` |
| `ST` | Standard | Mandatory rules a domain must follow | `standard-index.json` |
| `RU` | Rule | Persistent convention (often mirrored as `.mdc` in runtime) | `standard-index.json` |
| `PT` | Pattern | Reusable solution shape (not mandatory) | `standard-index.json` |
| `TP` | Template | Skeleton artifact to be filled in | `template-index.json` |
| `WF` | Workflow | Multi-step procedure encoded as a repeatable sequence | `workflow-index.json` |
| `AG` | Agent | Agent definition (consumes knowledge, performs a role) | `agent-index.json` |
| `MC` | MCP | MCP server definition (provides capabilities) | `mcp-index.json` |
| `PR` | Prompt | Reusable prompt asset | `prompt-index.json` |
| `EX` | Example | Worked example illustrating a standard or pattern | `handbook-index.json` |

**Rule:** An object's type never changes. If responsibility shifts, the object is deprecated and a new one is created with a new ID.

### Registry structure

The registry is a set of JSON indexes plus a root manifest. It stores **metadata only** — never handbook bodies.

```text
knowledge-registry/
├── registry.json              # root manifest + all objects (SSOT)
├── handbook-index.json        # HB, AR, BP, EX
├── agent-index.json           # AG
├── prompt-index.json          # PR
├── mcp-index.json             # MC
├── template-index.json        # TP
├── workflow-index.json        # WF
└── standard-index.json        # ST, RU, PT
```

**Invariants:**
- `registry.json` is the canonical SSOT; per-type indexes are derived views for fast lookup.
- Every object appears in `registry.json` AND in its type-specific index.
- IDs are unique across ALL indexes.
- Paths in indexes are relative to the AI-BOS root and may change; IDs never do.

### Registry object shape

```json
{
  "id": "AR-AI-BOS-005",
  "title": "AI-BOS Knowledge Architecture",
  "type": "architecture",
  "path": "knowledge/architecture/AR-AI-BOS-005-knowledge-architecture.md",
  "version": "1.0.0",
  "status": "draft",
  "owner": "AI-BOS",
  "consumers": ["ai-bos-architect"],
  "capabilities": ["CAP-KNW-001", "CAP-KNW-002"],
  "dependencies": ["AR-AI-BOS-004"],
  "updated": "2026-07-16"
}
```

`capabilities` is **new in this phase** — every Knowledge Object declares which capabilities it serves. This enforces the Phase 4 derivation rule.

### Consumer model (binding)

```text
Knowledge Registry
       ↓ (by ID)
Knowledge Object
       ↓ (consumed by)
Agent  ←── consumes ──┤
       ↓ (instantiates)
Project
```

| Layer | May reference | May NOT reference |
|-------|---------------|--------------------|
| Knowledge Object | Other Knowledge Object IDs, capability IDs | Agent IDs, project paths, tool names |
| Agent | Knowledge Object IDs (consumers), capability IDs | Project paths |
| Project | Knowledge Object IDs, Agent IDs, capability IDs | (no restriction — projects are leaves) |

This one-way flow prevents the classic rot where knowledge becomes contaminated with project-specific or tool-specific details.

### Dependency model

| Dependency kind | Meaning | Example |
|-----------------|---------|---------|
| `dependencies` | Object cannot be understood without these | `AR-AI-BOS-005` depends on `AR-AI-BOS-004` |
| `related` | Topical link, not a hard dependency | `AR-AI-BOS-005` related to `knowledge-registry` |
| `consumers` | Who is expected to use this object | `ai-bos-architect` |

**Validation rule:** `dependencies` must resolve to existing IDs (or co-authored IDs in the same batch). Cycles are forbidden; the registry validator rejects them.

### Lifecycle states

```text
draft ──approve──▶ active ──deprecate──▶ deprecated ──archive──▶ archived
   ▲                                                                  │
   └────────────── supersede (new version or new ID) ──────────────────┘
```

| State | Meaning | May be consumed? |
|-------|----------|------------------|
| `draft` | Authored, not yet ratified | Yes, with caveat (consumers should check status) |
| `active` | Ratified and current | Yes |
| `deprecated` | Superseded or no longer recommended | No (consumers must migrate) |
| `archived` | Historical only | No (reference only) |

**Transition rules:**
- `draft → active` requires user approval (phase gate) OR registry validation pass for non-constitutional objects.
- `active → deprecated` requires a successor object to exist OR a documented reason.
- `deprecated → archived` requires a waiting period (default 90 days, configurable per Standard).
- Re-activating an archived object creates a new version, never reopens the old one.

### Capability-to-knowledge binding

Every capability from `AR-AI-BOS-004` declares the Knowledge Object types it expects to consume. This is **declarative** — capabilities state needs; knowledge fulfills them.

| Capability | Typical knowledge types consumed |
|------------|----------------------------------|
| `CAP-STR-001` Vision & Direction | AR, ST |
| `CAP-STR-004` Research & Intelligence | HB, EX |
| `CAP-DLV-001` SaaS Development | HB, ST, PT, TP, WF |
| `CAP-DLV-004` Architecture & Design | AR, PT, TP |
| `CAP-DLV-006` Proposal Generation | TP, PR, EX |
| `CAP-GRO-003` SEO | ST, HB, WF |
| `CAP-OPS-001` Internal SOPs | WF, ST |
| `CAP-OPS-002` Quality Assurance | ST, WF |
| `CAP-OPS-003` Security & Compliance | ST, RU |
| `CAP-KNW-001..006` Knowledge & Learning | All types (meta) |
| `CAP-PLT-001` Agent Platform | AG, ST |
| `CAP-PLT-002` MCP Capability Layer | MC, ST |
| `CAP-PLT-003` Registry & Storage | AR, ST (this object) |

This table is illustrative, not exhaustive — individual Knowledge Objects declare their own `consumers` and `capabilities`.

### Validation rules (mandatory before registration)

1. **Front matter** — valid YAML per `references/front-matter-schema.md`
2. **ID format** — matches `{PREFIX}-{CATEGORY}-{DOMAIN}-{NNN}` and prefix is in the taxonomy
3. **ID uniqueness** — no duplicate across any index
4. **Type permanence** — type matches the prefix (an `HB-` ID cannot declare `type: standard`)
5. **Dependency resolution** — all `dependencies` IDs exist or are co-authored
6. **No cycles** — dependency graph is acyclic
7. **Capability binding** — `capabilities` field references valid `CAP-*` IDs from `AR-AI-BOS-004`
8. **Vendor independence** — body contains no tool/provider names in knowledge sections (runtime references allowed only in explicitly marked runtime sections)
9. **Body sections** — all 9 mandatory sections present (or N/A noted with reason)
10. **Registry sync** — object added to `registry.json` AND its type-specific index in the same commit

### Evolution strategy alignment

This phase implements **Phase 2 (Registry indexes + Dependency mapping)** of the Knowledge Registry Standard's evolution strategy. Phases 3 and 4 (agent consumption by ID, automated validation) are deferred to later AI-BOS phases.

## Best Practices

- Author the Knowledge Object body AFTER the front matter; front matter is the contract.
- When deprecating, link the successor object in the deprecation notice and update consumers.
- Use `EX` (Example) objects liberally to illustrate Standards and Patterns — examples are first-class knowledge.
- Keep `dependencies` minimal — over-linking creates brittle graphs.
- Validate before registering; never register-then-fix.
- Treat the registry as append-only for IDs; once an ID is registered, it is permanent even if the object is archived.

## Anti-patterns

- Storing handbook body content inside the registry JSON (registry is metadata only).
- Letting an Agent ID appear in a Knowledge Object's `consumers` field — agents consume knowledge, not the reverse.
- Declaring `dependencies` on objects that do not yet exist outside the current batch (creates dangling references).
- Embedding runtime paths (`.cursor/`, `claude.md`) in knowledge bodies.
- Skipping the `capabilities` field — every object must declare which capability it serves.
- Reusing an ID after archiving — create a new ID instead.
- Allowing `draft` objects to be consumed as if `active` without consumers checking status.

## References

- `AI-BOS/.cursor/skills/ai-bos-architect/references/knowledge-registry-standard.md` — Knowledge Registry Standard (input)
- `AI-BOS/.cursor/skills/ai-bos-architect/references/front-matter-schema.md` — YAML schema + ID convention (input)
- `knowledge/architecture/AR-AI-BOS-004-capability-model.md` — Capability Model (dependency; source of capability IDs)
- `AI-BOS/knowledge-registry/registry.json` — live registry (current state)

## Related Knowledge Objects

- AR-AI-BOS-006 — Documentation Architecture (Phase 6; will map Knowledge Object types to documentation structure)
- AR-AI-BOS-007 — Agent Architecture (Phase 7; will define how agents consume this registry)
- AR-AI-BOS-008 — MCP Architecture (Phase 8; will define MCP services over this registry)
- ST-KNW-001 — Knowledge Object Standard (Phase 12; will formalize validation rules as a Standard)

## Change History

| Version | Date | Change |
|---------|------|--------|
| 1.0.0 | 2026-07-16 | Initial Phase 5 Knowledge Architecture — type taxonomy, registry structure, consumer model, lifecycle, validation rules, capability binding. Awaiting user approval. |
