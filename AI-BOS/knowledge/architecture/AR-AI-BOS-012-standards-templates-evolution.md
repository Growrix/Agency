---
id: AR-AI-BOS-012
title: AI-BOS Standards, Templates, Evolution Strategy, and Repository Structure
type: architecture
category: governance
domain: ai-bos
version: 1.0.0
status: active
owner: AI-BOS
visibility: internal
audience:
  - human
  - ai
consumers:
  - ai-bos-architect
  - system-builder
dependencies:
  - AR-AI-BOS-001
  - AR-AI-BOS-002
  - AR-AI-BOS-004
  - AR-AI-BOS-005
  - AR-AI-BOS-006
  - AR-AI-BOS-007
  - AR-AI-BOS-008
  - AR-AI-BOS-009
  - AR-AI-BOS-010
  - AR-AI-BOS-011
related:
  - standards
  - templates
  - evolution-strategy
  - repository-structure
  - versioning
  - migration
  - deprecation
review_cycle: quarterly
last_review: 2026-07-16
priority: critical
tags:
  - ai-bos
  - standards
  - templates
  - evolution
  - repository-structure
  - terminal-phase
  - foundational
---

# AI-BOS Standards, Templates, Evolution Strategy, and Repository Structure

## Purpose

This is the **terminal architecture phase** of AI-BOS. It closes the planning prompt's design order by delivering the final three deliverables — **Standards**, **Templates**, and **Evolution Strategy** — and then producing the **Repository Structure** as the final output, exactly as the planning prompt mandates: "Repository structure must be the final output — not the first."

Where Phases 5–11 defined *what* each layer is and *how* it behaves, Phase 12 defines *how the layers are formalized, reused, and evolved over time* — and finally *where they physically live*. This is the phase where AI-BOS transitions from a set of architecture decisions into a versioned, templated, evolvable system with a committed repository layout.

This phase also triggers the **final D1 repo-promotion decision** per the Phase 11 deferral. That decision is structural and routed to `@system-builder` after this artifact is approved.

## Scope

Defines:
- The **Standards layer** — named Standard Knowledge Objects (`ST-*`) that formalize the schemas and rules established across Phases 5–11
- The **Templates layer** — named Template Knowledge Objects (`TP-*`) that give every artifact type a reusable starting point
- The **Evolution Strategy** — versioning policy, migration protocol, deprecation protocol, amendment process, registry schema evolution, and backward-compatibility rules
- The **Repository Structure** — the final physical folder layout for AI-BOS, emerging from the project model (Phase 11) and capability groups (Phase 4)

Does **not** define:
- The full set of standalone `ST-*` and `TP-*` Knowledge Object files (those are authored in a post-architecture implementation phase, after this architecture is approved; Phase 12 defines the *catalog* and *structure* of standards and templates, not every instance)
- Concrete project instances (per-project instantiation, per Phase 11)
- Runtime-specific configuration files (`.cursor/`, `CLAUDE.md`, etc. — those are projections, not knowledge)

## Principles

1. **Standards are Knowledge Objects** — every standard lives in the knowledge registry with an `ST-*` ID, front matter, and body. Standards are not external documents; they are first-class knowledge.
2. **Templates are Knowledge Objects** — every template lives in the knowledge registry with a `TP-*` ID. Templates are the reusable skeletons that make new artifact authoring deterministic.
3. **Evolution is governed, not ad hoc** — every change to a Knowledge Object follows the versioning and migration protocol. No silent edits; no breaking changes without a major bump and a migration note.
4. **Repository structure emerges from the model** — folders mirror capability groups and the four-registry model, never tools or teams. The layout is the *consequence* of Phases 4–11, not an independent decision.
5. **Vendor independence survives evolution** — standards, templates, and the repository layout contain no tool-specific paths or assumptions. Runtime projections are separate.
6. **Backward compatibility is the default** — minor and patch version changes never break consumers. Major changes require a migration path documented in the KO's Change History.
7. **Phase 12 is terminal for architecture, not for AI-BOS** — after Phase 12, AI-BOS enters an implementation and evolution lifecycle governed by the Evolution Strategy defined here.

## Standards

### What a Standard is

A **Standard** is a Knowledge Object (`type: standard`, `ST-*` ID) that formalizes a schema, rule, or convention that *must* hold across all instances of a given artifact type. Standards are the contract layer: they make AI-BOS deterministic for consumers and authors.

Standards are *not* architecture — architecture describes the system; standards describe the rules artifacts must follow. Architecture references standards; standards do not reference architecture.

### Standard catalog (Phase 12 establishes; implementation authors)

Phase 12 establishes the catalog of standards AI-BOS requires. Each standard is authored as a standalone `ST-*` Knowledge Object in the post-architecture implementation phase. The catalog is derived from the schemas already locked in Phases 5–11.

| Standard ID | Title | Source phase | What it formalizes |
|-------------|-------|---------------|--------------------|
| `ST-KNW-001` | Knowledge Object Standard | Phase 5 | Front matter schema, body sections, ID convention, validation rules |
| `ST-REG-001` | Knowledge Registry Standard | Phase 5 | Registry structure, index files, root manifest, ID uniqueness, dependency integrity |
| `ST-DOC-001` | Documentation Standard | Phase 6 | Documentation types, navigation model, doc index, authoring conventions, versioning |
| `ST-AGT-001` | Agent Definition Standard | Phase 7 | Agent identity, authority levels, lifecycle, handoff contracts, registry entry shape |
| `ST-MCP-001` | MCP Server Definition Standard | Phase 8 | MCP identity, capability contracts, five canonical services, registry entry shape |
| `ST-EXE-001` | Execution Standard | Phase 9 | Execution context, six-state lifecycle, orchestration patterns, HITL gates, provenance |
| `ST-GOV-001` | Governance Standard | Phase 10 | Roles, decision process, authority matrix, amendment process, conflict resolution |
| `ST-PRJ-001` | Project Definition Standard | Phase 11 | Project identity, lifecycle, layer instantiation, registry entry shape, runtime projection |
| `ST-VER-001` | Versioning and Evolution Standard | Phase 12 | Semver policy, migration protocol, deprecation protocol (defined below) |
| `ST-TP-001` | Template Authoring Standard | Phase 12 | How templates are structured, referenced, and instantiated (defined below) |

### Standard object shape

Every Standard KO follows the standard Knowledge Object contract (per `ST-KNW-001`) plus:

```yaml
standard_type: schema | rule | convention
applies_to: [knowledge | agent | mcp | project | workflow | documentation]
mandatory: true
enforcement: registry-validation | review-gate | both
```

### Enforcement model

- **Registry validation** — the registry validator (an MCP service per Phase 8) rejects any artifact that violates a `mandatory: true` standard.
- **Review gate** — the governance review process (per Phase 10) blocks ratification of any artifact that violates a standard.
- **Both** — most standards are enforced by both; this is the default.

## Templates

### What a Template is

A **Template** is a Knowledge Object (`type: template`, `TP-*` ID) that provides a reusable skeleton for a specific artifact type. Templates make new artifact authoring deterministic — an author copies the template, fills the placeholders, and the result conforms to the corresponding Standard automatically.

Templates are *not* examples — examples (`EX-*`) show filled-in instances; templates (`TP-*`) show the empty structure with placeholders. Both are Knowledge Objects.

### Template catalog (Phase 12 establishes; implementation authors)

| Template ID | Title | Produces | Corresponding standard |
|--------------|-------|----------|------------------------|
| `TP-KNW-001` | Knowledge Object Template | Any new `HB-*`, `AR-*`, `BP-*`, `ST-*`, `RU-*`, `PT-*`, `EX-*` KO | `ST-KNW-001` |
| `TP-AGT-001` | Agent Definition Template | A new `AG-*` agent definition | `ST-AGT-001` |
| `TP-MCP-001` | MCP Server Definition Template | A new `MC-*` MCP server definition | `ST-MCP-001` |
| `TP-PRJ-001` | Project Definition Template | A new `PRJ-*` project definition | `ST-PRJ-001` |
| `TP-WF-001` | Workflow Definition Template | A new `WF-*` workflow definition | `ST-EXE-001` |
| `TP-DOC-001` | Documentation Page Template | A new documentation page | `ST-DOC-001` |
| `TP-REG-001` | Registry Entry Template | A new entry in any of the four registries | `ST-REG-001` |

### Template structure

Every Template KO follows the standard Knowledge Object contract plus a `template_body` section containing:

```text
1. Placeholder map — every {{placeholder}} and its meaning
2. Skeleton — the empty artifact with placeholders
3. Required fields — which placeholders must be filled
4. Optional fields — which placeholders may be omitted
5. Validation hints — which standard rules the filled artifact must satisfy
6. Instantiation example — one filled-in example (clearly marked as an example, not a template)
```

### Template instantiation rule

When an author instantiates a template:
1. Copy the template skeleton
2. Fill every required placeholder
3. Assign a new permanent ID per the ID convention
4. Validate against the corresponding standard
5. Register in the appropriate registry index

**Rule:** Templates are referenced by ID in the `generated_from` field of the instantiated artifact's front matter. This creates a provenance chain from every artifact back to its template.

## Evolution Strategy

### Why evolution is a first-class concern

AI-BOS is designed to be the permanent foundation of the business. "Permanent" does not mean "static" — it means *the architecture survives change*. The Evolution Strategy defines how AI-BOS changes over time without breaking its consumers.

### Versioning policy (`ST-VER-001`)

Every Knowledge Object, agent, MCP server, and project follows **semantic versioning**:

| Version change | When | Breaking? | Migration required? |
|----------------|------|-----------|--------------------|
| `MAJOR` (e.g. 1.0.0 → 2.0.0) | Schema or contract change that breaks consumers | Yes | Yes — mandatory migration note in Change History |
| `MINOR` (e.g. 1.0.0 → 1.1.0) | Backward-compatible addition (new field, new section) | No | No — recommended changelog entry |
| `PATCH` (e.g. 1.0.0 → 1.0.1) | Backward-compatible fix (typo, clarification) | No | No — recommended changelog entry |

**Rules:**
- The `version` field in front matter is the source of truth.
- A MAJOR bump requires a `migration_note` field in front matter describing how consumers transition.
- A MAJOR bump requires the prior version to remain registered with `status: deprecated` until all consumers migrate.
- Patch and minor changes never deprecate prior versions.

### Migration protocol

When a Knowledge Object requires a MAJOR version change:

```text
1. Author the new version as a new KO file with the same ID and bumped version
2. Add a `migration_note` field to front matter
3. Add a `supersedes` field pointing to the prior version (e.g. supersedes: 1.x.x)
4. Mark the prior version's status as deprecated in the registry
5. Update all dependents' `dependencies` to reference the new version
6. Run registry validation to confirm no dangling references
7. Record the migration in the KO's Change History
```

**Rule:** Migration is never silent. Every MAJOR bump produces a visible migration note and a deprecated prior version until consumers transition.

### Deprecation protocol

A Knowledge Object is deprecated when:
- It is superseded by a newer MAJOR version, **or**
- It is no longer relevant (capability removed, replaced by a different artifact)

Deprecation steps:
1. Set `status: deprecated` in front matter and registry
2. Add a `deprecated_on` date field
3. Add a `replaced_by` field pointing to the successor (if any)
4. Keep the KO in the registry (never delete — IDs are permanent)
5. After all consumers migrate, advance to `status: archived`

**Rule:** Deprecated KOs remain readable. They are never removed from the registry. Archiving is the terminal state, not deletion.

### Amendment process (cross-reference Phase 10)

Changes to AI-BOS architecture follow the Phase 10 governance amendment process:
1. Propose amendment (any role)
2. Impact assessment (Knowledge Owner)
3. Review (Auditor)
4. Decision (authority matrix — Phase 10)
5. Author the change as a new version
6. Register and validate
7. Communicate to consumers

**Rule:** Architecture amendments are versioned like any other KO. The Constitution (`AR-AI-BOS-002`) is itself a versioned KO.

### Registry schema evolution

The four registries (knowledge, agent, mcp, project) have their own `schema_version` field. Registry schema changes:
- Follow the same semver policy
- A MAJOR registry schema change requires all entries to be migrated
- A MINOR change adds optional fields (old entries remain valid)
- A PATCH change clarifies without adding fields

**Rule:** Registry schema version is independent of the KOs it indexes. A KO version bump does not require a registry schema bump.

### Backward compatibility contract

AI-BOS guarantees:
- A consumer that reads a KO by ID at version `N` will continue to read it at version `N` even after a MAJOR bump to `N+1` (the prior version remains registered as deprecated).
- A consumer that references a KO by ID alone (no version) always receives the latest non-deprecated version.
- A consumer that pins a specific version always receives that version until it is archived.

**Rule:** Backward compatibility is the default. Breaking it requires a MAJOR bump, a migration note, and governance approval.

## Repository Structure (the final output)

### Emergence rule (recap)

Per Phase 11 (`AR-AI-BOS-011`), the repository structure is the **final output** of the design order. It emerges from:
1. The four-registry model (Phase 5, 7, 8, 11)
2. The capability groups (Phase 4)
3. The project model (Phase 11)
4. The standards and templates layers (this phase)

Folders mirror **capability groups and the four-registry model**, never tools or teams.

### The AI-BOS repository layout

This is the committed physical layout for the AI-BOS root. It applies whether AI-BOS remains an isolated root inside Growrixos or is promoted to its own repository (final D1 decision routed to `@system-builder` after this phase).

```text
AI-BOS/
├── README.md                          # Root overview, status, governance
├── RUN.md                             # Operation guide
├── ENV.example                        # Environment contract
├── .gitignore                         # Ignore patterns
├── tasks.md                           # Execution ledger
│
├── knowledge-registry/                # Registry 1: Knowledge (Phase 5)
│   ├── registry.json                  # Root manifest (SSOT)
│   ├── handbook-index.json             # HB-* objects
│   ├── architecture-index.json         # AR-* objects
│   ├── blueprint-index.json            # BP-* objects
│   ├── standard-index.json             # ST-* objects
│   ├── rule-index.json                 # RU-* objects
│   ├── pattern-index.json              # PT-* objects
│   ├── template-index.json             # TP-* objects
│   ├── workflow-index.json             # WF-* objects
│   ├── prompt-index.json               # PR-* objects
│   └── example-index.json              # EX-* objects
│
├── agent-registry/                    # Registry 2: Agents (Phase 7)
│   ├── registry.json
│   └── agent-index.json                # AG-* objects
│
├── mcp-registry/                      # Registry 3: MCP servers (Phase 8)
│   ├── registry.json
│   └── mcp-index.json                  # MC-* objects
│
├── project-registry/                  # Registry 4: Projects (Phase 11)
│   ├── registry.json
│   └── project-index.json              # PRJ-* objects
│
├── knowledge/                         # Knowledge Object content (by type)
│   ├── architecture/                  # AR-* (architecture decisions)
│   ├── handbooks/                      # HB-* (reusable handbooks)
│   ├── blueprints/                     # BP-* (project blueprints)
│   ├── standards/                      # ST-* (formal standards)
│   ├── rules/                          # RU-* (governance rules)
│   ├── patterns/                       # PT-* (reusable patterns)
│   ├── templates/                      # TP-* (artifact templates)
│   ├── workflows/                      # WF-* (workflow definitions)
│   ├── prompts/                        # PR-* (prompt library)
│   └── examples/                       # EX-* (filled-in examples)
│
├── docs/                              # Human-facing documentation (Phase 6)
│   ├── index.json                      # Documentation index (separate from knowledge registry)
│   ├── guides/                         # How-to guides
│   ├── reference/                      # Reference documentation
│   └── concepts/                       # Conceptual overviews
│
└── .cursor/                           # Runtime projection (NOT knowledge)
    ├── rules/                          # Local governance rules (.mdc)
    ├── skills/                         # Local skills (e.g. ai-bos-architect)
    └── audits/                         # Audit artifacts (e.g. D1 evaluations)
```

### Layout rules

| Rule | Enforcement |
|------|-------------|
| Four registries are top-level siblings | `knowledge-registry/`, `agent-registry/`, `mcp-registry/`, `project-registry/` — never nested |
| Knowledge content organized by type, not by project | `knowledge/architecture/`, `knowledge/handbooks/`, etc. — never `knowledge/project-x/` |
| Documentation is separate from knowledge | `docs/` has its own index; documentation presents knowledge, it is not knowledge |
| Runtime is separate from knowledge | `.cursor/` holds projections (rules, skills, audits); knowledge content never lives here |
| Folders named after types or capabilities, never tools or teams | No `cursor/`, `claude/`, `team-x/` folders in the knowledge layer |
| Registry indexes are flat JSON, not nested | One index per type; root `registry.json` is the SSOT manifest |
| Audit artifacts live under runtime | `.cursor/audits/` — audits are process artifacts, not knowledge |

### Why this layout

- **Four registries as siblings** honors the one-way dependency (Project → Agent → MCP → Knowledge). Nesting would imply hierarchy that does not exist.
- **Knowledge by type** makes reuse trivial — any project can consume any KO by ID without traversing project-specific folders.
- **Documentation separate** honors Phase 6's binding rule: documentation presents knowledge, it is not knowledge. Mixing them would blur the consumer model.
- **Runtime under `.cursor/`** keeps vendor-specific projections isolated. If AI-BOS is consumed from Claude Code, a parallel `.claude/` projection can coexist without touching knowledge.
- **Audits under runtime** because audits are process evidence, not reusable knowledge. They inform governance but are not consumed by agents.

### Migration from current state

The current AI-BOS root already matches most of this layout. Gaps to close in the post-architecture implementation phase:
1. **Create `agent-registry/`, `mcp-registry/`, `project-registry/` directories** (currently only `knowledge-registry/` exists; the other three registries are defined but not scaffolded per Phase 8 and Phase 11 deferrals).
2. **Reorganize `knowledge/` by type** — currently `knowledge/architecture/` exists; add the other type folders (`handbooks/`, `standards/`, `templates/`, etc.) as content is authored.
3. **Create `docs/` with its own `index.json`** per Phase 6 (currently documentation is implicit in knowledge artifacts; a separate docs layer is defined but not yet scaffolded).
4. **Author the `ST-*` and `TP-*` Knowledge Objects** listed in the catalogs above.

**Rule:** These gaps are implementation work, not architecture decisions. The layout is committed by this phase; the scaffolding follows in implementation.

## Best Practices

- Author the `ST-*` standards before the `TP-*` templates — templates instantiate standards, so standards must exist first.
- Pin a `schema_version` on every registry from day one; bump it deliberately, never accidentally.
- When a MAJOR version bump is needed, author the new version *before* deprecating the old one — consumers need a migration target.
- Keep the `generated_from` field populated on every artifact instantiated from a template; it is the provenance chain.
- Treat the repository layout as versioned: any structural change to `AI-BOS/` follows the amendment process (Phase 10) and is recorded in `tasks.md`.
- When a new capability group is added (Phase 4 amendment), add the corresponding `knowledge/<type>/` folder only when the first KO of that type is authored — do not pre-create empty folders.
- Keep `.cursor/audits/` for process evidence and `knowledge/` for reusable knowledge; never mix them.
- When the repository layout changes, update `registry.json` path entries and the anatomy docs in the same session.

## Anti-patterns

- Authoring `TP-*` templates before the corresponding `ST-*` standard exists (templates would have no contract to enforce).
- Silent MAJOR version bumps (no migration note, no deprecated prior version) — breaks the backward-compatibility contract.
- Deleting a deprecated KO from the registry (IDs are permanent; deprecation is terminal at `archived`, not deletion).
- Organizing `knowledge/` by project instead of by type (destroys reuse; violates the one-way dependency).
- Putting runtime config (`.cursor/rules/`, skills) inside `knowledge/` (blurs the knowledge/runtime boundary).
- Designing a new repository layout outside the amendment process (Phase 10) — the layout is governed like any other KO.
- Pre-creating empty registry or knowledge folders "in case" — folders emerge from content, not speculation.
- Skipping the final D1 re-evaluation at this phase gate (per Phase 11 deferral — the decision is now due).

## References

- `knowledge/architecture/AR-AI-BOS-001-vision.md` — Vision (dependency)
- `knowledge/architecture/AR-AI-BOS-002-constitution-toc.md` — Constitution TOC (dependency)
- `knowledge/architecture/AR-AI-BOS-004-capability-model.md` — Capability Model (dependency; source of capability groups that inform `knowledge/` organization)
- `knowledge/architecture/AR-AI-BOS-005-knowledge-architecture.md` — Knowledge Architecture (dependency; source of KO and registry standards)
- `knowledge/architecture/AR-AI-BOS-006-documentation-architecture.md` — Documentation Architecture (dependency; source of `docs/` separation)
- `knowledge/architecture/AR-AI-BOS-007-agent-architecture.md` — Agent Architecture (dependency; source of `agent-registry/`)
- `knowledge/architecture/AR-AI-BOS-008-mcp-architecture.md` — MCP Architecture (dependency; source of `mcp-registry/`)
- `knowledge/architecture/AR-AI-BOS-009-execution-architecture.md` — Execution Architecture (dependency; source of `ST-EXE-001`)
- `knowledge/architecture/AR-AI-BOS-010-governance.md` — Governance (dependency; source of amendment process referenced in Evolution Strategy)
- `knowledge/architecture/AR-AI-BOS-011-project-architecture.md` — Project Architecture (dependency; source of repository emergence rule and `project-registry/`)
- `AI-BOS/.cursor/audits/2026-07-16-d1-repo-promotion-reevaluation.md` — D1 re-evaluation (deferred final decision to after Phase 12)

## Related Knowledge Objects

- `ST-KNW-001` — Knowledge Object Standard (authored I1)
- `ST-REG-001` — Knowledge Registry Standard (authored I1)
- `ST-VER-001` — Versioning and Evolution Standard (authored I1)
- `ST-TP-001` — Template Authoring Standard (authored I1)
- `TP-KNW-001` — Knowledge Object Template (authored I1)
- `HB-KNW-AUTHORING-001` / `HB-GOV-OPS-001` — starter handbooks (authored I2)
- `WF-GOV-PHASE-APPROVE-001` / `WF-KNW-AUTHOR-001` — starter workflows (authored I2)
- `AR-AI-BOS-003` — Assumption Review (D1 trigger source; terminal Option B + Trigger 2 acknowledged)

## Change History

| Version | Date | Change |
|---------|------|--------|
| 1.0.0 | 2026-07-16 | Initial Phase 12 terminal deliverable — Standards catalog (10 standards), Templates catalog (7 templates), Evolution Strategy (semver, migration, deprecation, amendment, registry schema evolution, backward compatibility), final Repository Structure (four registries as siblings, knowledge by type, docs separate, runtime under `.cursor/`), layout rules, migration gaps. Final D1 repo-promotion decision flagged for `@system-builder` after approval. Awaiting user approval. |
| 1.0.0 | 2026-07-17 | Related Knowledge Objects updated after I1/I2 implementation — ST/TP/HB/WF authored; D1 Trigger 2 acknowledged with Option B reaffirmed. |
