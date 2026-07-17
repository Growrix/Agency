---
id: HB-ENG-FE-001
title: SaaS Frontend Engineering Handbook
type: handbook
category: engineering
domain: saas-frontend
version: 1.0.0
status: active
owner: AI-BOS
visibility: internal
audience:
  - human
  - ai
consumers:
  - AG-DLV-FE-001
  - AG-DLV-SAAS-001
  - AG-DLV-QA-001
dependencies:
  - AR-AI-BOS-004
  - ST-FE-DS-001
  - ST-TST-001
related:
  - frontend
  - saas
  - design-system
review_cycle: quarterly
last_review: 2026-07-17
priority: critical
tags:
  - ai-bos
  - handbook
  - frontend
  - saas
---

# SaaS Frontend Engineering Handbook

## Purpose

Authoritative frontend handbook for SaaS delivery under PRJ-SAAS-GROWRIXOS-001. Enhanced from Universal Enterprise Level Guide frontend docs for AI-BOS reuse.

## Scope

Applies to SaaS UI surfaces (public, client, admin, developer). Does not cover HTML template lane (`sites/`) or agency-only Next migrations.

## Principles

1. Backend is the source of truth for identity, workflow state, and payments.
2. Separate experience surfaces by role; prevent privilege leakage in shared UI.
3. Pages stay thin; business rules live in services/contracts, not components.
4. Design tokens and shared primitives are mandatory — no ad-hoc styling constants.
5. Accessibility (WCAG 2.1 AA) and performance budgets are non-negotiable.

## Standards

### Experience surfaces
Public, Client, Admin, Developer — route groups isolated by privilege.

### Structure
Prefer `app/` route groups, `components/` primitives, `features/` modules, `lib/` shared utilities.

### Rendering
Server-render auth-bound dashboards and SEO pages; client components for interactive islands only.

### State
Server state from APIs/RSC; client state limited to UI; optimistic UI only where rollback is safe.

### Design system
Central tokens for color, type, space, radius, elevation. No hardcoded brand colors in features.

### Accessibility
Keyboard operable, visible focus, semantic structure, labeled forms, reduced-motion respect.

### Definition of done
Contracts consumed; a11y checked; no privilege leakage; tokens used; surfaces role-correct.

## Best Practices

- Load ST-FE-DS-001 before new UI work.
- Prefer shared primitives over one-off components.
- Keep chat/file/queue UIs contract-driven.

## Anti-patterns

- Business rules only in React state.
- Shared layouts that leak admin controls to clients.
- Hardcoded colors/spacing bypassing tokens.

## References

- DOC/Universal/Enterprise Level Guide/frontend/* (source reference; not SSOT after this KO)
- ST-FE-DS-001, ST-TST-001, AR-AI-BOS-004

## Related Knowledge Objects

- ST-FE-DS-001
- HB-ENG-ARCH-001
- WF-DLV-SAAS-FEATURE-001

## Change History

| Version | Date | Change |
|---------|------|--------|
| 1.0.0 | 2026-07-17 | Initial SaaS frontend handbook authored for I4 from Universal guides. |
