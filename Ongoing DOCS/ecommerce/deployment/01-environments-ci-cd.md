# Environments CI CD

Document status: deployment source
Owner: DevOps

## Purpose

Define environment setup, deployment promotion, and CI/CD requirements for ecommerce delivery.

## Environment Requirements

- Local development with safe test data.
- Preview deployments for branch validation.
- Staging with production-like configuration and sandbox providers.
- Production with live providers, monitoring, backups, and rollback.

## CI Gates

- Install and dependency audit where applicable.
- Lint.
- Type check.
- Unit tests.
- Integration/API tests.
- Build.
- E2E smoke tests for auth, catalog, cart, checkout, payment sandbox, admin.
- Accessibility and performance checks for critical routes.

## Deployment Rules

- Migrations must run in controlled order and be rollback-aware.
- Environment variables are managed outside source control.
- Preview deployments do not use production provider secrets.
- Production release notes identify customer-facing changes and rollback path.

## Acceptance Criteria

- The pipeline blocks release on critical quality failures.
- Staging validates payment and webhook sandbox flows.
- Production deploy has rollback and monitoring readiness.
