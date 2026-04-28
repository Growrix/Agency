# E2E Planning Template

Use this template for all fresh, scale, and hybrid planning work in the Agency workspace.

Documentation materialization rule:
- Instantiate this template into a real markdown file under `DOC/PROJECT PLAN/` before updating `DOC/PROJECT PLAN/Tasks/tasks.md`.
- For cross-role scope, store the artifact at the `DOC/PROJECT PLAN/` root using a scope-specific name such as `<scope>-e2e-plan.md`.
- Create or update the affected role-specific planning docs in their owning folders before considering the plan complete.
- Chat summaries are secondary and never replace the canonical planning artifact.

## 0. Artifact Metadata
- Canonical artifact path:
- Affected downstream role docs:
- Planning request source:
- Planning mode:
- Status:
- Last updated:

## 1. Planning Mode And Objective
- Planning mode: fresh, scale, or hybrid
- Why this mode fits the request:
- Scope boundaries:
- Explicit non-goals:
- Current implementation compatibility requirements:

## 2. Current-State Audit

### Tracker Status
- Done:
- Partial:
- Blocked:
- Not started:

### Existing Codebase Inventory
- Reusable routes:
- Reusable layouts and shells:
- Reusable sections and components:
- Reusable data/store modules:
- Existing API handlers and contracts:
- Existing CMS or Studio schemas:
- Existing admin/operator flows:
- Existing integrations already wired:

### Reuse-First Delta Map
- Reuse without changes:
- Extend carefully:
- Refactor in place:
- Net-new additions that are truly required:
- Items rejected to avoid architecture drift:

## 3. Platform Decision Matrix

| Capability | Current State | Decision | Required Now / Later / Excluded | Notes |
|---|---|---|---|---|
| Next.js |  |  |  |  |
| React |  |  |  |  |
| TypeScript |  |  |  |  |
| Sanity CMS |  |  |  |  |
| Supabase |  |  |  |  |
| PostgreSQL |  |  |  |  |
| Prisma |  |  |  |  |
| Lark |  |  |  |  |
| Resend |  |  |  |  |
| Pusher |  |  |  |  |
| S3 |  |  |  |  |

## 4. CMS And Content Operations Plan

### Content Surfaces
- Blog:
- Services:
- Shop/catalog:
- Case studies/portfolio:
- FAQ, landing pages, and static trust content:

### Sanity Structure
- Document types:
- Field groups and validation:
- Taxonomies and references:
- Media model:
- Slug and preview rules:
- Draft, review, publish flow:
- Revalidation or cache invalidation model:

### Editorial And Operator Workflow
- Who creates blog posts and where:
- How services are created or updated:
- How shop content is managed:
- How portfolio and proof content is managed:
- What belongs in Sanity Studio vs admin dashboard vs code:

## 5. Data, Database, And Storage Plan
- Source of truth per domain:
- Supabase responsibilities:
- PostgreSQL schema impact:
- Prisma decision and justification:
- Row-level security or access policy considerations:
- File or asset storage plan:
- Data migration or backfill needs:

## 6. Integration Plan

| Integration | Purpose | Trigger Points | Owner Surface | Fallback / Failure Mode | Notes |
|---|---|---|---|---|---|
| Lark |  |  |  |  |  |
| Resend |  |  |  |  |  |
| Pusher |  |  |  |  |  |
| S3 |  |  |  |  |  |
| Payments |  |  |  |  |  |
| Calendar |  |  |  |  |  |

## 7. Global Site Invariants
- Reuse existing design system, layouts, primitives, and interaction patterns before adding new UI.
- Prefer extending current routes, schemas, and data modules over introducing parallel systems.
- The common footer copyright string must be planned as:
  `© {year} {Company Name or Site Name}. All right reserved. Built & Maintenece by Growrix OS.`
- Link `Growrix OS` to `https://www.growrixos.com`.

## 8. E2E Phase Plan

### Shared Contracts
- Inputs:
- Deliverables:
- Reuse targets:
- Entry criteria:
- Exit criteria:
- Risks and fallback:

### CMS And Content Operations
- Inputs:
- Deliverables:
- Reuse targets:
- Entry criteria:
- Exit criteria:
- Risks and fallback:

### Frontend
- Inputs:
- Deliverables:
- Reuse targets:
- Entry criteria:
- Exit criteria:
- Risks and fallback:

### Backend
- Inputs:
- Deliverables:
- Reuse targets:
- Entry criteria:
- Exit criteria:
- Risks and fallback:

### API And Data
- Inputs:
- Deliverables:
- Reuse targets:
- Entry criteria:
- Exit criteria:
- Risks and fallback:

### Security
- Inputs:
- Deliverables:
- Entry criteria:
- Exit criteria:
- Risks and fallback:

### DevOps
- Inputs:
- Deliverables:
- Entry criteria:
- Exit criteria:
- Risks and fallback:

### QA
- Inputs:
- Deliverables:
- Entry criteria:
- Exit criteria:
- Risks and fallback:

## 9. Execution Backlog
1. Task, owner hint, dependency, target docs/files
2. Task, owner hint, dependency, target docs/files
3. Task, owner hint, dependency, target docs/files

## 10. Release-Gate And Validation Matrix

| Gate | Scope | Blocking? | Owner | Evidence Required |
|---|---|---|---|---|
| Static validation |  |  |  |  |
| Unit tests |  |  |  |  |
| Integration tests |  |  |  |  |
| E2E tests |  |  |  |  |
| Accessibility |  |  |  |  |
| Performance |  |  |  |  |
| Security |  |  |  |  |
| Regression |  |  |  |  |

## 11. Risks, Assumptions, And Open Decisions
- Risks:
- Assumptions:
- Open decisions:

## 12. Tracker And Documentation Updates
- Files updated:
- Downstream role docs updated:
- Task tracker deltas:
- New planning artifacts created: