---
id: ST-VER-001
title: Versioning and Evolution Standard
type: standard
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
  - AR-AI-BOS-012
  - ST-KNW-001
related:
  - standard
  - versioning-evolution
review_cycle: quarterly
last_review: 2026-07-17
priority: critical
tags:
  - ai-bos
  - standard
  - versioning-evolution
---

# Versioning and Evolution Standard

## Purpose

Define semver policy, migration protocol, deprecation protocol, registry schema evolution, and backward compatibility.

## Scope

Applies to all versioned AI-BOS artifacts: Knowledge Objects, agents, MCP servers, projects, and registry schemas.

## Principles

1. Semver is mandatory.
2. MAJOR requires migration_note and deprecated prior version.
3. IDs are never deleted; archive is terminal.
4. Backward compatibility is the default.
5. Registry schema_version is independent of KO versions.

## Standards

### Semver

| Change | When | Migration |
|--------|------|-----------|
| MAJOR | Breaking contract/schema | Required |
| MINOR | Backward-compatible addition | Changelog recommended |
| PATCH | Fix/clarification | Changelog recommended |

### Migration steps

author new version → migration_note → supersedes → deprecate prior → update dependents → validate → Change History

### Deprecation

status deprecated → deprecated_on → replaced_by → keep readable → archive when consumers migrated

### Pinning

ID-only → latest non-deprecated; version pin → that version until archived.

## Best Practices

- Deprecate before delete (never delete).
- Migrate dependents in the same session when possible.

## Anti-patterns

- Silent MAJOR bumps.
- Removing deprecated IDs from the registry.
- Breaking consumers on MINOR/PATCH.

## References

- AR-AI-BOS-012 — Evolution Strategy

## Related Knowledge Objects

- ST-KNW-001
- ST-REG-001
- ST-GOV-001

## Change History

| Version | Date | Change |
|---------|------|--------|
| 1.0.0 | 2026-07-17 | Initial Versioning and Evolution Standard authored in implementation phase. |
