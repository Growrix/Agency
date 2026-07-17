---
id: HB-ENG-BE-001
title: SaaS Backend Engineering Handbook
type: handbook
category: engineering
domain: saas-backend
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
  - AG-DLV-QA-BE-001
dependencies:
  - AR-AI-BOS-004
  - ST-API-001
  - ST-SEC-001
related:
  - backend
  - saas
  - api
review_cycle: quarterly
last_review: 2026-07-17
priority: critical
tags:
  - ai-bos
  - handbook
  - backend
  - saas
---

# SaaS Backend Engineering Handbook

## Purpose

Authoritative backend handbook for SaaS authority boundaries, services, auth, integrations, and observability.

## Scope

Applies to server routes, domain services, persistence, and integrations for SaaS products. Not for static HTML templates.

## Principles

1. Backend is system of authority for authz, queue, payments, assignments, files.
2. Domain rules live in services — not only route handlers.
3. Integrations after durable state; retries must be idempotent.
4. Explicit authorization on every privileged operation.
5. Observability required for critical paths.

## Standards

### Layers
Interface (routes/webhooks/jobs) → Domain services → Persistence → Integrations.

### Service ownership
Auth, queue, assignment, payments, delivery, notification — each owns its entities and transitions.

### AuthZ
Role-aware checks at boundary; persistence RLS as backstop, not sole control.

### Integrations
Stripe/webhooks/email/AI providers: verify signatures, idempotency keys, reconcile state.

### Definition of done
Service-owned rules; testable authz; recovery paths; docs match contracts.

## Best Practices

- Follow ST-API-001 and ST-SEC-001 on every new endpoint.
- Prefer transactional updates before side effects.

## Anti-patterns

- Business logic only in route handlers.
- Trusting client role claims without server verification.
- Non-idempotent webhook handlers.

## References

- DOC/Universal/Enterprise Level Guide/backend/*
- ST-API-001, ST-SEC-001

## Related Knowledge Objects

- HB-ENG-DATA-001
- ST-API-001
- ST-SEC-001

## Change History

| Version | Date | Change |
|---------|------|--------|
| 1.0.0 | 2026-07-17 | Initial SaaS backend handbook authored for I4 from Universal guides. |
