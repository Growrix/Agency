---
id: TP-DOC-001
title: Documentation Page Template
type: template
category: documentation
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
  - ST-DOC-001
  - ST-TP-001
related:
  - template
  - documentation-page
  - ST-DOC-001
review_cycle: quarterly
last_review: 2026-07-17
priority: high
tags:
  - ai-bos
  - template
  - documentation-page
---

# Documentation Page Template

## Purpose

Skeleton for a human-facing documentation page under docs/.

## Scope

Use for docs/guides, docs/reference, docs/concepts pages. Not a Knowledge Object.

## Principles

1. Declare presents KO IDs.
2. Keep page short.
3. Register in docs/index.json.

## Standards

Corresponding standard: `ST-DOC-001`

### Placeholder map

| Placeholder | Meaning |
|-------------|---------|
| {{DOC_ID}} | DOC-TYPE-NNN |
| {{TITLE}} | Page title |
| {{SECTION}} | guides / reference / concepts |
| {{PRESENTS}} | KO IDs presented |

### Skeleton

```markdown
# {{TITLE}}

Brief human-facing page.

## Presents Knowledge Objects

- {{PRESENTS}}

## Content

...
```

docs/index.json entry:

```json
{
  "id": "{{DOC_ID}}",
  "title": "{{TITLE}}",
  "path": "docs/{{SECTION}}/<file>.md",
  "presents": ["{{PRESENTS}}"],
  "status": "active",
  "updated": "YYYY-MM-DD"
}
```

### Required fields
id, title, path, presents, status, updated

### Optional fields
audience, order

### Validation hints
ST-DOC-001

### Instantiation example
docs/concepts/overview.md already follows this shape.

## Best Practices

- Instantiate only after the corresponding Standard is active.
- Keep placeholders consistent across templates.
- Register instantiated artifacts immediately.

## Anti-patterns

- Treating this template as an example instance.
- Skipping generated_from on instantiated artifacts.
- Authoring a template before its Standard exists.

## References

- ST-DOC-001
- ST-TP-001 — Template Authoring Standard
- AR-AI-BOS-012 — Templates catalog

## Related Knowledge Objects

- ST-DOC-001
- ST-TP-001
- AR-AI-BOS-012

## Change History

| Version | Date | Change |
|---------|------|--------|
| 1.0.0 | 2026-07-17 | Initial template authored in implementation phase. |
