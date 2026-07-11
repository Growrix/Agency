# Milestone 1 Execution Spec

## Purpose
Define the first complete, production-minded execution slice for `BLOG-AUTOMATION/`.

## Delivery Goal
Prove this exact end-to-end lane:

```text
seed keywords
-> opportunity scoring
-> approved brief
-> draft content creation
-> SEO + quality gates
-> Sanity publish
-> post record persistence
-> weekly performance sync
```

## In Scope
- isolated workspace scaffold under `BLOG-AUTOMATION/`
- `apps/automation-api/`
- `packages/contracts/`
- `packages/shared/`
- `packages/keyword-engine/`
- `packages/blog-planner/`
- `packages/post-creator/`
- `packages/seo-optimizer/`
- `packages/quality-gates/`
- `packages/cms-core/`
- `packages/cms-adapter-sanity/`
- `packages/analytics-engine/`
- `packages/workflow-runtime/`
- `storage/`
- `infra/n8n/`
- milestone-1 tests and runbooks

## Out of Scope
- WordPress publishing
- Ghost/Contentful publishing
- AI image generation as a release requirement
- ops dashboard as a milestone-1 blocker
- blind auto-publish without review controls

## Required Outputs
- isolated package/app scaffold
- stable milestone-1 route groups
- env example categories
- storage migrations
- test entrypoints
- runbook and readiness checklist coverage

## Delivery Order
1. workspace scaffold and contracts
2. shared utilities and persistence boundaries
3. keyword + planning packages
4. content + SEO + quality packages
5. CMS core + Sanity adapter
6. automation API composition
7. workflow runtime + infra templates
8. tests and verification

## Readiness Classification
- `blocked`
- `scaffold_ready_implementation_pending`
- `milestone_1_ready`

## Failure Modes
- `M1_SCOPE_DRIFT`
- `M1_ROUTE_CONTRACT_MISSING`
- `M1_REVIEW_GATES_MISSING`
- `M1_SANITY_PATH_MISSING`