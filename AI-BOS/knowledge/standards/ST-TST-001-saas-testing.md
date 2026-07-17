---
id: ST-TST-001
title: SaaS Testing and Quality Standard
type: standard
category: quality
domain: saas
version: 1.0.0
status: active
owner: AI-BOS
visibility: internal
audience:
  - human
  - ai
consumers:
  - AG-DLV-QA-001
  - AG-DLV-QA-BE-001
  - AG-DLV-SAAS-001
  - AG-DLV-FE-001
  - AG-DLV-BE-001
dependencies:
  - AR-AI-BOS-004
  - ST-EXE-001
related:
  - testing
  - quality
  - gates
review_cycle: quarterly
last_review: 2026-07-17
priority: critical
tags:
  - ai-bos
  - standard
  - testing
---

# SaaS Testing and Quality Standard

## Purpose

Mandatory testing pyramid, critical-path E2E, and release-gate expectations for SaaS.

## Scope

Applies to unit/integration/E2E and CI gates for SaaS delivery projects.

## Principles

1. Build → Validate → Test → Verify before approve.
2. Critical business paths have automated coverage.
3. Phase-end gates beat ad-hoc manual-only QA.
4. CI parity required before push/deploy claims.
5. Failures stop the line — fix root cause.

## Standards

### Pyramid
Unit for pure logic; integration for services/DB contracts; E2E for auth, payments, queue, critical UX.

### Gates
Project health/CI scripts; a11y smoke; security headers where configured; release-gates suite when applicable.

### Definition of done
Applicable gates green; evidence paths in ledger; no known red diagnostics on touched files.

## Best Practices

- Prefer narrow mid-phase checks; full gates at phase end / push.
- Record gate command + exit code in tasks.md.

## Anti-patterns

- Shipping with failing CI.
- E2E-only coverage with no unit tests for domain rules.

## References

- DOC/Universal/Enterprise Level Guide/quality/*
- ST-EXE-001

## Related Knowledge Objects

- WF-DLV-SAAS-FEATURE-001
- HB-OPS-REL-001
- ST-SEC-001

## Change History

| Version | Date | Change |
|---------|------|--------|
| 1.0.0 | 2026-07-17 | Initial SaaS testing standard authored for I4. |
