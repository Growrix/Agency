# AI-BOS Knowledge Object — Front Matter Schema

Reference for `@ai-bos-architect`. Every Knowledge Object begins with YAML front matter.

## Required fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Permanent ID — never changes |
| `title` | string | Human-readable title |
| `type` | enum | handbook, architecture, blueprint, standard, rule, pattern, template, workflow, agent, mcp, prompt, example |
| `category` | string | Top-level grouping (e.g. engineering, governance, domain) |
| `domain` | string | Specific domain (e.g. security, saas, ai-bos) |
| `version` | semver | Document version |
| `status` | enum | draft, active, deprecated, archived |
| `owner` | string | Owning entity (e.g. AI-BOS) |
| `visibility` | enum | public, internal, private |
| `audience` | list | human, ai |
| `priority` | enum | low, medium, high, critical |
| `tags` | list | Search tags |

## Recommended fields

| Field | Type | Description |
|-------|------|-------------|
| `consumers` | list | Agent or role IDs that consume this object |
| `dependencies` | list | Knowledge Object IDs this document depends on |
| `related` | list | Topic keywords or related IDs |
| `review_cycle` | string | e.g. quarterly, annual |
| `last_review` | date | ISO date of last review |

## ID prefix convention

| Prefix | Type | Example |
|--------|------|---------|
| HB | Handbook | HB-ENG-SEC-001 |
| AR | Architecture | AR-AI-001 |
| BP | Blueprint | BP-VISION-001 |
| ST | Standard | ST-KNOWLEDGE-001 |
| RU | Rule | RU-GOV-001 |
| PT | Pattern | PT-AGENT-001 |
| TP | Template | TP-DOC-001 |
| WF | Workflow | WF-PLAN-001 |
| AG | Agent | AG-SAAS-ARCH-001 |
| MC | MCP | MC-GITHUB-001 |
| PR | Prompt | PR-INTAKE-001 |
| EX | Example | EX-HB-001 |

Pattern: `{PREFIX}-{CATEGORY}-{DOMAIN}-{NNN}` (zero-padded sequence per prefix+category+domain).

## Example

```yaml
---
id: AR-AI-BOS-001
title: AI-BOS Vision Statement
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
dependencies: []
related:
  - vision
  - capability-model
review_cycle: quarterly
last_review: 2026-07-16
priority: critical
tags:
  - ai-bos
  - vision
  - constitution
---
```

## Body structure (mandatory sections)

1. Purpose
2. Scope
3. Principles
4. Standards
5. Best Practices
6. Anti-patterns
7. References
8. Related Knowledge Objects
9. Change History

## Validation rules

- `id` must match prefix convention
- `id` must be unique across all registry indexes
- `dependencies` entries must exist in registry (or be marked draft in same batch)
- No tool-specific paths (`.cursor/`, `claude.md`, etc.) in knowledge body — runtime is separate

## Registry registration

After authoring, add entry to the appropriate index:

```json
{
  "id": "AR-AI-BOS-001",
  "title": "AI-BOS Vision Statement",
  "type": "architecture",
  "path": "knowledge/architecture/AR-AI-BOS-001-vision.md",
  "version": "1.0.0",
  "status": "draft",
  "updated": "2026-07-16"
}
```

Path in registry may change; ID never does.
