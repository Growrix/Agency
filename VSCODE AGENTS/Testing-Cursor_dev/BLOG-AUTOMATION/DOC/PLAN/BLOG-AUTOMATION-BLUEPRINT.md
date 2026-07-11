# BLOG AUTOMATION SYSTEM — Canonical Blueprint

Status: Planning expanded and clarified before implementation

Canonical root: `BLOG-AUTOMATION/`

This document supersedes earlier ad hoc planning copies for execution decisions. The earlier blueprint remains useful as ideation material, but this file is the canonical plan for future build work.

---

## 0. Planning Goal

Build a production-minded blog automation system that can:
- discover opportunities
- generate structured briefs
- create high-quality draft content
- optimize for SEO and editorial quality
- publish through a CMS adapter
- monitor performance and trigger refresh workflows

This is not just a writing tool. It is an end-to-end content operations system with strict workflow, review, and quality controls.

---

## 1. Non-Negotiable Workspace Boundary

All blog automation assets must live under the isolated root:

```text
BLOG-AUTOMATION/
```

This includes:
- `.github/agents/`
- `DOC/`
- application code
- infrastructure definitions
- tests
- scripts
- env examples
- dashboards

Rules:
- Do not place blog-automation-specific code in the workspace root.
- Do not place blog-automation-specific agents in the workspace root.
- Do not mix this project with the existing factory lanes under `Backend & Deploy/`.
- If we want native VS Code agent discovery for this project, open `BLOG-AUTOMATION/` as its own workspace root when implementation starts.

---

## 2. Locked Decisions

These decisions are now locked unless you explicitly change them later.

### 2.1 Project boundary
- This system is an isolated project rooted at `BLOG-AUTOMATION/`.
- Future code, docs, agents, infra, and validation artifacts stay inside that root.

### 2.2 Product shape
- The system is API-first.
- n8n orchestrates jobs, schedules, and approval-triggered automations.
- The app owns business logic, data persistence, validation, and adapter contracts.

### 2.3 CMS strategy
- Architecture remains CMS-adapter based.
- Delivery sequence is phased:
  - v1 shipping target: Sanity
  - v1.1: WordPress
  - v2 candidates: Ghost, Contentful

Rationale:
- the adapter contract should be designed once
- but publishing every CMS in the first milestone would create unnecessary delivery risk

### 2.4 Media strategy
- v1 should not depend on AI-generated images for release readiness.
- v1 media path should support:
  - curated stock/free-stock assets
  - manual upload
  - CMS asset upload
- AI image generation remains optional and can be added later behind a separate quality and brand-safety gate.

### 2.5 Review strategy
- Publish is never fully blind by default.
- The system must support human approval checkpoints before publication.
- High-risk niches must require human review before publish.

### 2.6 Quality strategy
- A post can move to publish only if content, SEO, citation, duplication, and policy gates pass.
- Failures must route to a review queue with explicit reasons.

### 2.7 Reuse and delivery model
- `BLOG-AUTOMATION/` is a reusable product-level automation system.
- The default operating model is one central BLOG-AUTOMATION service with per-site connectors.
- Client sites are delivered as separate projects and must not become the permanent home of the automation runtime.
- The reusable boundary is API + adapter + connector configuration, not source-code embedding into each client site.

### 2.8 Client integration model
- Every target site must be onboarded through a connector profile.
- A connector profile owns CMS field mapping, publish mode, revalidation behavior, and site-scoped credentials.
- Per-client isolated BLOG-AUTOMATION deployments are allowed as an exception path for stronger isolation, but they remain separate from the client site repo.

---

## 3. Clarifications Added To Avoid Later Rework

The original blueprint was strong conceptually, but these areas needed explicit clarification before implementation:

### 3.1 Phased scope instead of one-shot everything
- The system architecture can support multiple CMS targets and advanced analytics.
- The first production milestone should prove one full path end to end instead of partially implementing every branch.

### 3.2 Delivery target for milestone 1
Milestone 1 must prove this exact flow:

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

### 3.3 Operations and failure handling were under-specified
The canonical plan now requires:
- idempotent workflow execution
- retry rules per integration
- dead-letter or failed-job review state
- human review routing
- structured audit logs
- cost guardrails for API-heavy tasks

### 3.4 Compliance and content provenance were under-specified
The canonical plan now requires:
- source attribution tracking
- claim/citation traceability
- duplicate detection
- manual review mode for YMYL or high-liability niches
- robots/TOS-aware crawling policy review before SERP scraping is enabled in production

---

## 4. Canonical Folder Layout

The earlier flat file tree is now upgraded into a more maintainable isolated project layout.

```text
BLOG-AUTOMATION/
│
├── .github/
│   └── agents/
│       └── README.md
│
├── DOC/
│   ├── PLAN/
│   │   └── BLOG-AUTOMATION-BLUEPRINT.md
│   ├── execution/
│   ├── validation/
│   ├── runbooks/
│   └── decisions/
│
├── apps/
│   ├── automation-api/
│   └── ops-dashboard/
│
├── packages/
│   ├── contracts/
│   ├── shared/
│   ├── keyword-engine/
│   ├── blog-planner/
│   ├── post-creator/
│   ├── seo-optimizer/
│   ├── quality-gates/
│   ├── cms-core/
│   ├── cms-adapter-sanity/
│   ├── cms-adapter-wordpress/
│   ├── analytics-engine/
│   └── workflow-runtime/
│
├── infra/
│   ├── docker/
│   ├── n8n/
│   └── env/
│
├── storage/
│   ├── migrations/
│   └── seeds/
│
├── scripts/
├── tests/
├── package.json
├── .env.example
└── README.md
```

Why this structure is better:
- keeps planning and execution assets close but separated
- keeps agent docs inside the project root
- avoids future root-level mixing
- gives each subsystem a clear owner

---

## 5. Logical Module Map

The original 7 modules remain valid. They are now mapped into maintainable ownership boundaries.

| Logical Module | Package / App Owner | Release Target |
|---|---|---|
| Keyword Research Engine | `packages/keyword-engine` | Milestone 1 |
| Blog Planner | `packages/blog-planner` | Milestone 1 |
| Post Creator | `packages/post-creator` | Milestone 1 |
| SEO Optimizer | `packages/seo-optimizer` | Milestone 1 |
| Quality Gates | `packages/quality-gates` | Milestone 1 |
| CMS Adapter Contract | `packages/cms-core` | Milestone 1 |
| Sanity Adapter | `packages/cms-adapter-sanity` | Milestone 1 |
| WordPress Adapter | `packages/cms-adapter-wordpress` | Milestone 2 |
| Analytics Engine | `packages/analytics-engine` | Milestone 2 |
| n8n Workflow Runtime | `packages/workflow-runtime` + `infra/n8n` | Milestone 1 |
| Ops Dashboard | `apps/ops-dashboard` | Milestone 2 |
| Automation API | `apps/automation-api` | Milestone 1 |

---

## 6. Required API Surface

n8n should not call low-level package code directly. It should call application endpoints exposed by `apps/automation-api`.

Required route groups:

### 6.1 Keyword routes
- `POST /api/keywords/research/run`
- `POST /api/keywords/approve`
- `GET /api/keywords/opportunities`

### 6.2 Planning routes
- `POST /api/briefs/generate`
- `POST /api/outlines/generate`
- `GET /api/briefs/:id`

### 6.3 Content routes
- `POST /api/posts/create-draft`
- `POST /api/posts/humanize`
- `POST /api/posts/enhance-eeat`
- `POST /api/posts/insert-stats`

### 6.4 SEO + quality routes
- `POST /api/seo/optimize`
- `POST /api/quality/run`
- `POST /api/quality/approve`

### 6.5 Publish routes
- `POST /api/publish/draft`
- `POST /api/publish/schedule`
- `POST /api/publish/run`
- `POST /api/publish/invalidate-cache`
- `POST /api/publish/notify-sitemap`

### 6.6 Analytics routes
- `POST /api/analytics/sync`
- `GET /api/analytics/weekly-report`
- `POST /api/analytics/evaluate-refresh`

Constraint:
- n8n workflows must treat these endpoints as stable contracts.
- Internal refactors must not break workflow payload expectations.

Additional integration rule:
- client sites must integrate through connector-aware publish contracts rather than importing low-level BLOG-AUTOMATION runtime code.

---

## 7. Workflow State Model

The earlier plan defined states informally. They are now locked as explicit contracts.

### 7.1 Keyword lifecycle
`discovered -> approved -> briefed -> queued -> published -> refreshing`

### 7.2 Brief lifecycle
`draft -> approved -> in_progress -> complete -> rejected`

### 7.3 Post lifecycle
`draft -> review -> approved -> scheduled -> published -> updating -> archived`

### 7.4 Job lifecycle
`queued -> running -> succeeded -> failed -> dead_letter`

Rules:
- every workflow run must write state transitions explicitly
- repeated runs must be idempotent where feasible
- retries must not create duplicate posts or duplicate publish events

---

## 8. Data and Storage Clarifications

### 8.1 Local development
- local development can start with SQLite for speed and simplicity

### 8.2 Production posture
- production design must avoid hard-coupling logic to SQLite-only features
- storage access should sit behind repository/service boundaries

### 8.3 Required persistence domains
- keywords
- clusters
- content briefs
- posts
- publish queue
- workflow runs
- quality reports
- citation/source provenance
- analytics snapshots

### 8.4 Provenance requirement
Every generated post must be able to answer:
- which brief produced it
- which sources influenced it
- which workflow run generated it
- which quality gates passed or failed

---

## 9. Reliability, Safety, and Compliance Requirements

These are mandatory additions to the earlier plan.

### 9.1 Reliability
- retries must be bounded and logged
- external API calls require backoff
- publish operations require idempotency protection
- cache invalidation and sitemap notifications must be retry-safe

### 9.2 Cost control
- define per-run token budget
- define per-post maximum content generation budget
- define rate limits for DataForSEO and LLM calls
- stop or downgrade expensive optional stages when budget thresholds are hit

### 9.3 Compliance and editorial safety
- keep citation/source logs for factual claims
- add review mode for sensitive niches
- add advertiser-safe content screening before publish
- add duplication/similarity screening before publish

### 9.4 Search platform caution
- production SERP collection needs explicit review of robots, provider terms, and fallback collection strategies
- if direct scraping creates unacceptable risk, the workflow must degrade gracefully instead of blocking the entire system design

---

## 10. Environment Contract Categories

Exact env files can be finalized during implementation, but the plan must reserve these categories now:

- application runtime
- LLM provider credentials
- keyword/SERP provider credentials
- CMS credentials
- analytics credentials
- queue/runtime credentials
- webhook secrets
- cache invalidation settings
- notification provider credentials

Initial env namespaces to reserve:

```text
APP_*
ANTHROPIC_*
DATAFORSEO_*
SANITY_*
WORDPRESS_*
GA4_*
GSC_*
REDIS_*
N8N_*
NOTIFY_*
```

Connector-scoped client settings must also be reserved during implementation, for example:

```text
CONNECTOR_*
CLIENT_*
REVALIDATE_*
```

---

## 11. Agent and Documentation Placement

This project will need its own agents, but they must remain local to this root.

Canonical placement:

```text
BLOG-AUTOMATION/.github/agents/
BLOG-AUTOMATION/DOC/
```

Initial intended agent responsibilities:
- local system builder for this isolated project
- backend planner for services, schemas, queues, and APIs
- workflow architect for n8n orchestration and runbooks
- content ops planner for prompt contracts and editorial states
- validator for smoke tests, quality gates, and release checks

---

## 12. Milestone Plan

### Milestone 0 — Planning and Scaffolding
- establish isolated project root
- lock canonical folder layout
- define package/app boundaries
- define local agent/document surfaces

### Milestone 1 — One Full Publishing Lane
- keyword discovery
- brief generation
- draft generation
- SEO + quality gates
- Sanity publish
- workflow state persistence

### Milestone 2 — Operations Depth
- analytics sync
- refresh triggers
- ops dashboard
- WordPress adapter

### Milestone 3 — Expansion
- Ghost/Contentful candidates
- optional AI image generation
- deeper reporting and revenue analysis

---

## 13. Open Inputs Still Needed Before Implementation

These must be answered before we start code generation in this new root:

1. Which niche is the first real target for v1?
2. What is the first real client connector target after the core product? Current answer: Growrixos.
3. Will the first connector start in `draft_only`, `draft_with_human_media_review`, `scheduled_publish_after_approval`, or `auto_publish_low_risk` mode?
4. What notification target should review failures use first: email, Slack, or dashboard only?
5. Do you want local-only deployment first, or Docker-first from day one?
6. What connector registry shape should we lock first for multi-client onboarding?

---

## 14. Immediate Next Discussion Scope

After this planning pass, the next useful discussion should be implementation planning inside `BLOG-AUTOMATION/` only:
- repo scaffolding
- local agent creation
- package/app boundary creation order
- milestone 1 execution spec
- multi-client operating model
- connector registry contract
- first client connector spec

Do not start mixing implementation files into the workspace root.