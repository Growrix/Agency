---
id: AR-AI-BOS-006
title: AI-BOS Documentation Architecture
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
  - AR-AI-BOS-004
  - AR-AI-BOS-005
related:
  - documentation-architecture
  - documentation-model
  - navigation
  - authoring
review_cycle: quarterly
last_review: 2026-07-16
priority: critical
tags:
  - ai-bos
  - documentation
  - architecture
  - foundational
---

# AI-BOS Documentation Architecture

## Purpose

Define the **documentation layer** of AI-BOS — the human-facing presentation, navigation, and authoring system that sits over the Knowledge Object substrate designed in Phase 5. Where Phase 5 answered "what is a Knowledge Object and how is it registered?", Phase 6 answers "how is documentation organized for humans to read, navigate, author, and maintain?"

This phase separates the **machine-readable knowledge layer** (registry, IDs, dependencies) from the **human-readable documentation layer** (navigation, presentation, formats, authoring conventions). Both serve the same Knowledge Objects; they are different views, not different content.

## Scope

Defines:
- The relationship between Knowledge Objects and documentation
- Documentation types (over and above Knowledge Object types)
- Navigation structure for humans
- Authoring conventions and formats
- Versioning and change presentation
- Multi-audience documentation (human + AI)
- Capability-to-documentation binding

Does **not** define:
- Concrete handbook or guide content (Phase 12)
- Repository folder layout (Phase 11)
- Tooling or static-site generators (vendor-independent by design)
- Agent definitions (Phase 7)

## Principles

1. **Documentation is a view, not a separate content store** — every documentation page is backed by one or more Knowledge Objects; documentation never duplicates knowledge, it presents it.
2. **One source of truth, many presentations** — the Knowledge Object is the SSOT; documentation may reorganize, summarize, or illustrate, but never contradict.
3. **Human-first, AI-co-readable** — documentation is authored for humans first; front matter and structure make it consumable by AI as a secondary audience.
4. **Navigation is non-linear** — humans enter documentation from many points (search, link, ID, capability); the architecture must support all entry patterns.
5. **Authoring is governed** — documentation follows the same lifecycle as Knowledge Objects (draft → active → deprecated → archived); informal notes are not documentation.
6. **Vendor independence applies to presentation too** — documentation must not assume a specific static-site generator, IDE preview, or provider.

## Standards

### Knowledge vs Documentation — the binding rule

| Property | Knowledge Object (Phase 5) | Documentation (Phase 6) |
|----------|----------------------------|--------------------------|
| Purpose | Machine-readable substrate | Human-readable presentation |
| Storage | Registry-indexed, ID-addressed | Navigation-indexed, path-addressed |
| Identity | Permanent ID | Path (may change) |
| Content | Authoritative body | Presentation, navigation, illustration |
| Duplication | Forbidden (one object, one responsibility) | Allowed (same KO may be presented many ways) |
| Lifecycle | draft → active → deprecated → archived | Mirrors backing KO lifecycle |

**Binding rule:** Every documentation page declares which Knowledge Object(s) it presents via a `presents` field in its front matter. A documentation page with no backing KO is a draft note, not ratified documentation.

### Documentation types

These are presentation types over Knowledge Objects — they are NOT new Knowledge Object types. A documentation file's type describes its presentation role, not its knowledge role.

| Doc type | Purpose | Backed by KO type | Example |
|----------|---------|-------------------|---------|
| `reference` | Authoritative reference page | HB, AR, ST | "Security Engineering Handbook" |
| `guide` | Walkthrough for a specific task | WF, TP | "How to register a Knowledge Object" |
| `tutorial` | Learning-oriented, end-to-end | EX, TP | "Build your first capability map" |
| `concept` | Explanation of a concept | AR, HB | "What is the Consumer Model" |
| `index` | Navigation hub for a domain | (multiple) | "Knowledge Architecture index" |
| `changelog` | Versioned change record | (any) | "AI-BOS v2 changelog" |
| `decision-record` | Architecture decision log | AR | "ADR-001: defer repo promotion" |

**Rule:** A documentation file's `type` is independent of its backing Knowledge Object's `type`. A single HB (handbook) may be presented as both a `reference` page and a `tutorial`.

### Documentation front matter (extends Knowledge Object schema)

```yaml
---
id: DOC-<GROUP>-<NNN>           # Documentation ID, separate from KO IDs
title: <human title>
type: reference | guide | tutorial | concept | index | changelog | decision-record
presents:                        # REQUIRED for all types except index/changelog
  - AR-AI-BOS-005                # KO IDs this doc presents
audience:
  - human
  - ai
version: 1.0.0
status: draft | active | deprecated | archived
owner: AI-BOS
capabilities:                    # Which capabilities this doc serves
  - CAP-KNW-005
updated: 2026-07-16
---
```

**ID convention for documentation:** `DOC-<GROUP>-<NNN>` where `<GROUP>` mirrors the capability group codes from Phase 4 (STR, DLV, GRO, OPS, KNW, PLT, ORG) plus `GOV` for governance docs. Documentation IDs are permanent within the documentation layer but are NOT registered in the knowledge registry — they live in a separate documentation index.

### Navigation model

Documentation is organized for **human navigation**, not for machine lookup (machines use the registry). The navigation model supports four entry patterns:

```text
1. Capability-first:   "What does CAP-DLV-001 need?" → index → KOs → docs
2. Topic-first:         "Tell me about security"      → concept doc → KOs
3. Task-first:          "How do I register a KO?"      → guide → KOs
4. ID-first:            "Show me AR-AI-BOS-005"        → KO → presenting docs
```

Every documentation page participates in a **bidirectional link graph**:
- Each page lists its `presents` KOs (outbound)
- The registry records which docs present each KO (inbound, derived)

### Documentation index (separate from knowledge registry)

A dedicated index tracks documentation pages. It is NOT part of `knowledge-registry/` — it lives alongside it.

```text
documentation/
├── documentation-index.json     # all doc pages
└── <doc files by group>
```

`documentation-index.json` shape:

```json
{
  "schema_version": "1.0.0",
  "pages": [
    {
      "id": "DOC-KNW-001",
      "title": "Knowledge Architecture Reference",
      "type": "reference",
      "presents": ["AR-AI-BOS-005"],
      "path": "documentation/knowledge/DOC-KNW-001-knowledge-architecture-reference.md",
      "version": "1.0.0",
      "status": "active",
      "updated": "2026-07-16"
    }
  ]
}
```

### Authoring conventions

| Convention | Rule |
|------------|------|
| Format | Markdown with YAML front matter (same as Knowledge Objects) |
| Body structure | Doc-type-specific (see below), not the 9-section KO body |
| Cross-references | Use KO IDs (`AR-AI-BOS-005`), never file paths |
| Code blocks | Language-tagged; no tool-specific assumptions in prose |
| Diagrams | Mermaid for flowcharts; ASCII for inline; no proprietary formats |
| Length | Reference < 500 lines; guide < 300; tutorial < 800; concept < 400 |
| Tone | Imperative for guides; declarative for reference; explanatory for concept |
| Audience markers | Mark AI-only sections with `> **AI-only:**` callouts |

### Doc-type body structures

| Doc type | Body sections |
|----------|--------------|
| `reference` | Overview, Sections (by KO body), Properties, See Also, References |
| `guide` | Goal, Prerequisites, Steps, Verification, Troubleshooting, Next |
| `tutorial` | What you will build, Setup, Walkthrough, What you learned, Next |
| `concept` | Definition, Why it matters, How it works, Examples, Related concepts |
| `index` | Intro, Capability map, KO list, Doc list, External links |
| `changelog` | Version, Date, Added, Changed, Deprecated, Removed, Notes |
| `decision-record` | Context, Decision, Status, Consequences, Alternatives, References |

### Multi-audience handling

Every documentation page declares `audience` in front matter. The default is `[human, ai]`. Pages that are AI-only (e.g. machine-readable contract docs) declare `audience: [ai]` and are marked visibly in the body.

**Rule:** No page is `[human]`-only — if a human can read it, an AI can consume it via the same front matter.

### Versioning

Documentation pages have their own semver, independent of their backing Knowledge Objects.

| Change | Doc version bump | KO version bump |
|--------|------------------|-----------------|
| Fix typo in doc | patch | none |
| Reorganize presentation | minor | none |
| Backing KO content changed | minor (sync) | per KO |
| Doc presents a new KO | minor | none |
| Doc type changes (e.g. guide → tutorial) | major | none |

**Sync rule:** When a backing KO's status changes (e.g. active → deprecated), all presenting docs must update their status within one ledger cycle.

### Capability-to-documentation binding

Documentation serves capabilities through its backing Knowledge Objects. The `capabilities` field on a doc page is the union of capabilities served by its `presents` KOs — it is denormalized for fast navigation but must stay in sync.

| Capability | Typical doc types |
|------------|-------------------|
| `CAP-STR-001` Vision & Direction | concept, reference |
| `CAP-DLV-001` SaaS Development | reference, guide, tutorial |
| `CAP-DLV-006` Proposal Generation | template, guide |
| `CAP-GRO-003` SEO | reference, guide, concept |
| `CAP-OPS-001` Internal SOPs | guide, reference |
| `CAP-KNW-005` Learning & Onboarding | tutorial, concept |
| `CAP-PLT-001` Agent Platform | reference, guide |
| `CAP-PLT-002` MCP Capability Layer | reference, guide |

### Relationship to existing artifacts

| Existing artifact | Documentation role |
|-------------------|---------------------|
| `AI-BOS/README.md` | `index` doc for the AI-BOS root (presents: AR-AI-BOS-001) |
| `AI-BOS/RUN.md` | `guide` doc for operating the build (presents: AR-AI-BOS-005, AR-AI-BOS-002) |
| `AI-BOS/tasks.md` | `changelog` (operational, not ratified documentation) |
| `AI-BOS/.cursor/audits/2026-07-16-d1-repo-promotion-evaluation.md` | `decision-record` (presents: AR-AI-BOS-003) |

These existing files can be retrofitted with documentation front matter in a later phase; this architecture defines the model, not the migration.

## Best Practices

- Author the Knowledge Object first, then the documentation that presents it — never the reverse.
- Use `index` docs as the entry point for each capability group; they are the human's map.
- Keep `reference` docs close to the KO body; use `guide` and `tutorial` docs to reframe for tasks.
- When a KO is deprecated, mark all presenting docs `deprecated` in the same change.
- Treat `decision-record` docs as the institutional memory — every Phase 3-style challenge or D1-style structural decision becomes one.
- Version docs independently so presentation improvements don't force KO re-ratification.
- Use Mermaid for diagrams — it renders in most environments and is text-diffable.

## Anti-patterns

- Authoring documentation that contains knowledge not present in any KO (creates a shadow SSOT).
- Using file paths as cross-references instead of KO IDs (breaks when paths change).
- Storing documentation in the knowledge registry (the registry is for KOs, not doc pages).
- Letting documentation and KO bodies drift — the binding rule forbids contradiction.
- Assuming a specific static-site generator or preview tool (violates vendor independence).
- Marking pages `[human]`-only (excludes AI consumers unnecessarily).
- Skipping the `presents` field on a non-index doc (orphan doc with no backing knowledge).
- Treating `tasks.md` or `README.md` as ratified documentation without front matter.

## References

- `knowledge/architecture/AR-AI-BOS-005-knowledge-architecture.md` — Knowledge Architecture (dependency; defines KO substrate)
- `knowledge/architecture/AR-AI-BOS-004-capability-model.md` — Capability Model (dependency; source of capability group codes)
- `knowledge/architecture/AR-AI-BOS-002-constitution-toc.md` — Constitution TOC (documentation layer will be referenced in §6 Layer Model)
- `AI-BOS/.cursor/skills/ai-bos-architect/references/front-matter-schema.md` — KO front matter schema (extended here for docs)

## Related Knowledge Objects

- AR-AI-BOS-007 — Agent Architecture (Phase 7; agents will consume both KOs and docs)
- AR-AI-BOS-009 — Execution Architecture (Phase 9; workflows will reference doc types)
- ST-DOC-001 — Documentation Standard (Phase 12; will formalize authoring rules as a Standard)

## Change History

| Version | Date | Change |
|---------|------|--------|
| 1.0.0 | 2026-07-16 | Initial Phase 6 Documentation Architecture — doc types, navigation model, doc index, authoring conventions, versioning, capability binding. Awaiting user approval. |
