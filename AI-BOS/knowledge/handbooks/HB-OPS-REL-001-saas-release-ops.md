---
id: HB-OPS-REL-001
title: SaaS Release and Operations Handbook
type: handbook
category: operations
domain: saas-release
version: 1.0.0
status: active
owner: AI-BOS
visibility: internal
audience:
  - human
  - ai
consumers:
  - AG-DLV-DEVOPS-001
  - AG-DLV-SAAS-001
  - AG-DLV-QA-001
dependencies:
  - ST-TST-001
  - ST-SEC-001
related:
  - devops
  - release
  - environments
review_cycle: quarterly
last_review: 2026-07-17
priority: high
tags:
  - ai-bos
  - handbook
  - ops
  - saas
---

# SaaS Release and Operations Handbook

## Purpose

Environments, deployment discipline, release gates, and operational controls for SaaS delivery.

## Scope

Applies to local/staging/production promotion for SaaS apps. Not for static template double-click delivery.

## Principles

1. Environment isolation is mandatory.
2. Release gates precede production promotion.
3. Secrets never in git; env matrix is documented.
4. Rollback path exists before risky deploys.
5. CI parity beats local-only green.

## Standards

### Environments
Local → Staging → Production with separate secrets and data.

### Pre-deploy
Migrations reviewed; health checks; smoke paths; feature flags when needed.

### Gates
Align with ST-TST-001 and project `health:check` / `ci:check` expectations.

### Definition of done
CI green on SHA; smoke pass; rollback noted.

## Best Practices

- Run CI parity before push when web/ changed.
- Keep env matrices in docs, not chat.

## Anti-patterns

- Deploying from laptop without CI.
- Shared prod credentials in staging.

## References

- DOC/Universal/Enterprise Level Guide/process/deployment-and-environments.md
- DOC/Universal/Enterprise Level Guide/quality/qa-and-release-gates.md

## Related Knowledge Objects

- ST-TST-001
- ST-SEC-001
- WF-DLV-SAAS-FEATURE-001

## Change History

| Version | Date | Change |
|---------|------|--------|
| 1.0.0 | 2026-07-17 | Initial SaaS release/ops handbook authored for I4. |
