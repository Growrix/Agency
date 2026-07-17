---
id: ST-SEC-001
title: SaaS Security Standard
type: standard
category: security
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
  - AG-DLV-DEVOPS-001
  - AG-DLV-QA-BE-001
dependencies:
  - AR-AI-BOS-004
  - ST-KNW-001
related:
  - security
  - auth
  - secrets
review_cycle: quarterly
last_review: 2026-07-17
priority: critical
tags:
  - ai-bos
  - standard
  - security
---

# SaaS Security Standard

## Purpose

Mandatory security rules for SaaS auth, secrets, headers, PII, and dependency hygiene.

## Scope

Applies to all SaaS delivery under AI-BOS projects instantiating CAP-OPS-003.

## Principles

1. Never trust the client for authorization.
2. Secrets only via environment — never committed.
3. Defense in depth: app authz + RLS + headers.
4. PII minimized and access-logged where required.
5. Dependencies scanned; critical CVEs block release.

## Standards

### AuthN/AuthZ
Verified sessions/tokens; role checks server-side; no security-by-obscurity routes.

### Secrets
Env-only; rotate on leak; separate per environment.

### Headers / browser
Secure defaults for CSP/CORS as project matrix requires; no wildcard prod CORS.

### Webhooks
Signature verification mandatory; reject on failure.

### Definition of done
Authz tests exist; secrets audit clean; webhook verify present.

## Best Practices

- Treat ST-SEC-001 as gate input for ST-TST-001 releases.
- Document threat notes for new privileged endpoints.

## Anti-patterns

- Client-supplied role elevation.
- Logging secrets or raw tokens.
- Unsigned webhooks.

## References

- DOC/Universal/Enterprise Level Guide/operations/security-and-operations.md
- DOC/Universal/Enterprise Level Guide/backend/auth-authorization-and-rls.md

## Related Knowledge Objects

- HB-ENG-BE-001
- ST-TST-001
- ST-API-001

## Change History

| Version | Date | Change |
|---------|------|--------|
| 1.0.0 | 2026-07-17 | Initial SaaS security standard authored for I4. |
