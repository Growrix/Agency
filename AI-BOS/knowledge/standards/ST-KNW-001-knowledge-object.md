---
id: ST-KNW-001
title: Knowledge Object Standard
type: standard
category: knowledge
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
  - AR-AI-BOS-005
  - AR-AI-BOS-012
related:
  - standard
  - knowledge-object
review_cycle: quarterly
last_review: 2026-07-17
priority: critical
tags:
  - ai-bos
  - standard
  - knowledge-object
---

# Knowledge Object Standard

## Purpose

Define the mandatory contract for every Knowledge Object in AI-BOS: YAML front matter, ID convention, body sections, and validation rules.

## Scope

Applies to all Knowledge Objects (HB, AR, BP, ST, RU, PT, TP, WF, PR, EX and architecture artifacts). Does not define agent-registry, mcp-registry, or project-registry entry shapes (see ST-AGT-001, ST-MCP-001, ST-PRJ-001).

## Principles

1. Every Knowledge Object has YAML front matter and a Markdown body.
2. IDs are permanent; paths may change.
3. Content is vendor-independent — no runtime tool lock-in in the knowledge body.
4. One document = one responsibility.
5. Dependencies reference IDs, never filesystem paths.

## Standards

### Required front matter fields

| Field | Type | Values / notes |
|-------|------|----------------|
| id | string | Permanent ID matching prefix convention |
| title | string | Human-readable |
| type | enum | handbook, architecture, blueprint, standard, rule, pattern, template, workflow, agent, mcp, prompt, example |
| category | string | Top-level grouping |
| domain | string | Specific domain |
| version | semver | Document version |
| status | enum | draft, active, deprecated, archived |
| owner | string | Owning entity |
| visibility | enum | public, internal, private |
| audience | list | human, ai |
| priority | enum | low, medium, high, critical |
| tags | list | Search tags |

### Recommended front matter fields

consumers, dependencies, related, review_cycle, last_review, capabilities, generated_from, migration_note, supersedes, deprecated_on, replaced_by

### ID prefix convention

| Prefix | Type |
|--------|------|
| HB | Handbook |
| AR | Architecture |
| BP | Blueprint |
| ST | Standard |
| RU | Rule |
| PT | Pattern |
| TP | Template |
| WF | Workflow |
| AG | Agent definition (knowledge-layer) |
| MC | MCP definition (knowledge-layer) |
| PR | Prompt |
| EX | Example |

Pattern: {PREFIX}-{CATEGORY}-{DOMAIN}-{NNN} (zero-padded).

### Mandatory body sections

1. Purpose 2. Scope 3. Principles 4. Standards 5. Best Practices 6. Anti-patterns 7. References 8. Related Knowledge Objects 9. Change History

### Validation rules

- id unique across all knowledge-registry indexes
- dependencies resolve to existing or co-authored IDs
- no cycles in dependencies
- capabilities field required once capability binding is enforced
- status transitions follow ST-VER-001

## Best Practices

- Fill capabilities on every new KO.
- Prefer related topic keywords plus hard dependencies for true prerequisites.
- Keep body free of runtime paths; put runtime detail in projections.

## Anti-patterns

- Changing an ID after registration.
- Embedding tool-specific runtime paths in knowledge bodies.
- Skipping mandatory body sections.
- Storing secrets or credentials in Knowledge Objects.

## References

- AR-AI-BOS-005 — Knowledge Architecture
- AR-AI-BOS-012 — Standards catalog source

## Related Knowledge Objects

- ST-REG-001 — Registry Standard
- ST-VER-001 — Versioning Standard
- TP-KNW-001 — Knowledge Object Template

## Change History

| Version | Date | Change |
|---------|------|--------|
| 1.0.0 | 2026-07-17 | Initial Knowledge Object Standard authored in implementation phase. |
