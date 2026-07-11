# Template Vercel Deployment Spec

## Purpose
Define the governed deployment lane for normalized templates using Vercel as the default hosting platform and subdomain routing as the default rollout model.

## Required inputs
- Validated template root under `Templates/<category>/<template-slug>/`
- Template self-audit and post-import gap-closure report
- Deployment inputs: `base_domain`, `subdomain`, optional live `FOUNDATION_BASE_URL`

## Deployment model
- Default platform: Vercel
- Default site URL pattern: `<template-slug>.<base-domain>`
- Example: `mezan.growrixos.com`

## Rules
- Do not attempt deployment until local template verification is green.
- Deployment readiness is a separate track from template-side UI wiring; it does not justify new upload UI, auth UI, or other template feature work.
- Treat missing Vercel auth, project linkage, env secrets, or DNS/domain control as external blockers.
- Keep deployment generic: no hardcoded client domain values in code or shared specs.
- Keep Foundation-Core generic: only escalate Foundation changes when deployment reveals a real missing env or startup contract requirement.
- Distinguish preview deployment checks from production deployment checks.
- Validate Foundation attach URLs separately from public template URLs.
- Record all deployment assumptions and outputs in `.audit/template-deployment-report.md`.

## Required checks
- Local deploy readiness audit
- Preview build readiness
- Production build readiness
- Domain/subdomain mapping readiness
- Post-deploy smoke routes

## Failure modes
- `TEMPLATE_DEPLOY_CREDENTIALS_MISSING`
- `TEMPLATE_DEPLOY_DOMAIN_CONTROL_MISSING`
- `TEMPLATE_DEPLOY_ENV_MISSING`
- `TEMPLATE_DEPLOY_POST_SMOKE_FAILED`