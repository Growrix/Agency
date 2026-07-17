---
id: ST-API-001
title: SaaS API Design Standard
type: standard
category: api
domain: saas
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
  - ST-KNW-001
  - ST-SEC-001
related:
  - api
  - contracts
  - openapi
review_cycle: quarterly
last_review: 2026-07-17
priority: high
tags:
  - ai-bos
  - standard
  - api
---

# SaaS API Design Standard

## Purpose

Mandatory API contract shape, validation, versioning, and error semantics for SaaS backends.

## Scope

Applies to HTTP APIs and webhook endpoints for SaaS projects.

## Principles

1. Contracts before handlers.
2. Explicit validation on all inputs.
3. Stable error shape and status codes.
4. Idempotency for mutating/retryable operations.
5. Correlation IDs for observability.

## Standards

### Contract
Documented request/response schemas (Zod/OpenAPI or equivalent).

### Errors
Typed business errors vs transport errors; never leak internals.

### Versioning
Compatible changes preferred; breaking changes require version strategy.

### Definition of done
Schema exists; authz declared; tests cover happy + auth failure paths.

## Best Practices

- Pair API changes with HB-ENG-DATA-001 when persistence changes.
- Use idempotency keys for payments/webhooks.

## Anti-patterns

- Ad-hoc JSON without schema.
- 200 OK with embedded error-only payloads for failures.

## References

- DOC/Universal/Enterprise Level Guide/api/api-design.md

## Related Knowledge Objects

- HB-ENG-BE-001
- ST-SEC-001

## Change History

| Version | Date | Change |
|---------|------|--------|
| 1.0.0 | 2026-07-17 | Initial SaaS API standard authored for I4. |
