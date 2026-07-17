---
id: HB-ENG-DATA-001
title: SaaS Data and Persistence Handbook
type: handbook
category: engineering
domain: saas-data
version: 1.0.0
status: active
owner: AI-BOS
visibility: internal
audience:
  - human
  - ai
consumers:
  - AG-DLV-BE-001
  - AG-DLV-SAAS-001
dependencies:
  - HB-ENG-ARCH-001
  - ST-API-001
  - ST-SEC-001
related:
  - data
  - postgres
  - rls
review_cycle: quarterly
last_review: 2026-07-17
priority: high
tags:
  - ai-bos
  - handbook
  - data
  - saas
---

# SaaS Data and Persistence Handbook

## Purpose

Canonical data modeling, audit conventions, RLS posture, and persistence rules for SaaS platforms.

## Scope

Applies to relational schema, migrations, storage access, and entity ownership for SaaS.

## Principles

1. UUIDs and audit columns are default.
2. Module ownership of tables is explicit.
3. RLS backs authorization; application authz remains primary.
4. Migrations are forward-reviewed and environment-safe.
5. Private-by-default for files and PII.

## Standards

### Entity conventions
Stable IDs; created/updated timestamps; soft-delete only when product-required.

### Access
Server enforces access; signed URLs for private files; no public buckets for deliverables.

### Migrations
Expand/contract patterns for zero-downtime where needed; never edit applied migrations.

### Definition of done
Schema matches contracts; RLS policies reviewed; indexes for hot paths.

## Best Practices

- Pair schema changes with ST-API-001 contract updates.
- Document PII fields and retention expectations.

## Anti-patterns

- Client-direct table access bypassing services.
- Shared god-tables without owners.

## References

- DOC/Universal/Enterprise Level Guide/data/data-model.md
- ST-SEC-001

## Related Knowledge Objects

- HB-ENG-BE-001
- ST-API-001

## Change History

| Version | Date | Change |
|---------|------|--------|
| 1.0.0 | 2026-07-17 | Initial SaaS data handbook authored for I4. |
