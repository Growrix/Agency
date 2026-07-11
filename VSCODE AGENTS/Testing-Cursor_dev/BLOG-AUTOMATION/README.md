# BLOG-AUTOMATION

This folder is the isolated workspace root for the blog automation system.

From this point forward, all blog-automation-specific assets should live here:
- agents
- planning documents
- implementation docs
- code
- infrastructure files
- tests
- runtime configs

Why this root exists:
- prevents cross-project file drift in the main workspace root
- keeps the blog system portable as a standalone VS Code workspace
- allows local `.github/agents/` discovery when this folder is opened as its own workspace root

Canonical planning document:
- `DOC/PLAN/BLOG-AUTOMATION-BLUEPRINT.md`

Current status:
- planning updated
- local agent system added
- milestone-1 API and package runtime implemented
- persisted idempotency and dead-letter handling added
- importable n8n workflow templates added
- central reusable service with per-site connectors now locked as the default reuse model
- connector registry runtime and Growrixos connector-aware publish contracts implemented

## Current Structure

- `.github/agents/`: local public agent surface
- `DOC/`: canonical planning, specs, checklists, runbooks, and ADRs
- `apps/automation-api/`: milestone-1 API runtime with SQLite persistence
- `packages/`: milestone-1 domain packages
- `storage/`: SQLite migrations and local runtime state
- `infra/n8n/`: workflow manifest plus importable n8n templates
- `tests/`: unit and integration coverage for runtime and orchestration assets

## Commands

- `npm install`
- `npm run typecheck`
- `npm run test`
- `npm run build`
- `npm run verify`
- `npm run dev:api`

## Local API Security Contract

Protected `/api/*` routes now require:

- `x-api-key`
- `x-correlation-id` for trace continuity
- `x-idempotency-key` on `POST` routes

`/health` remains public.

Default local development key from `.env.example`:

- `APP_API_KEY=local-dev-api-key`

## Delivery Classification

Current classification:

`milestone1_local_prototype_hardened`

This means the isolated root now includes a working local API prototype, persisted execution durability, importable n8n workflow templates, and validated test coverage. External provider adapters, durable queue infrastructure, and deployment secrets are still the main remaining production gaps.

Default reuse model:
- BLOG-AUTOMATION runs as a separate reusable automation product/service
- client sites integrate through per-site connectors
- client-site repos should not embed BLOG-AUTOMATION runtime code by default