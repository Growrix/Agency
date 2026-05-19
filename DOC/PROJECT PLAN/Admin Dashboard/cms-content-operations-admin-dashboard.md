---
document_type: role-scope-plan
role: admin-dashboard
scope: cms-content-operations
parent_plan: DOC/PROJECT PLAN/cms-content-operations-e2e-plan.md
status: planning-ready
last_updated: 2026-04-28
---

# Admin Dashboard CMS Content Operations Plan

## Purpose
- Define the operator-facing module map, ownership split, and workflow rules for the CMS/content-operations rollout.
- Make the dashboard usable for non-technical operators without turning it into a duplicate CMS.

## Canonical Inputs
- `DOC/PROJECT PLAN/cms-content-operations-e2e-plan.md`
- `DOC/PROJECT PLAN/Admin Dashboard/ai-context.yaml`
- `DOC/PROJECT PLAN/API and Data/cms-content-operations-api-data.md`
- `DOC/PROJECT PLAN/Security/cms-content-operations-security.md`

## Ownership Split

| Surface | Primary owner | Why |
|---|---|---|
| Long-form editorial content | Sanity Studio | Rich editorial authoring, media, references, draft/publish lifecycle |
| Shop and portfolio operational status views | Admin Dashboard | Operators need workflow visibility, assignment, and audit context |
| Newsletter subscribers, sends, unsubscribe handling | Admin Dashboard | Operational records, consent handling, and support workflows belong outside the CMS |
| Contact inquiries and booking submissions | Admin Dashboard | Operational triage, notes, assignment, and status management |
| Publish and revalidation activity visibility | Admin Dashboard | Operators need status feedback after editorial actions |

## Target Route And Module Map
- `/admin`
  - rollout summary, publish health, backlog indicators, and operational alerts
- `/admin/catalog/shop`
  - catalog list, status, publish state, Studio handoff, and revalidation status
- `/admin/catalog/portfolio`
  - case-study list, status, publish state, Studio handoff, and revalidation status
- `/admin/submissions/newsletter`
  - subscribers, send logs, unsubscribe handling, suppression state, and issue-send history
- `/admin/submissions/inquiries`
  - inquiry triage, assignment, notes, and resolution workflow
- `/admin/submissions/bookings`
  - booking triage, assignment, notes, follow-up status, and operational history
- `/admin/activity`
  - publish, revalidation, audit, and failure timeline for operators

## Operator Workflow Rules

### Shop And Portfolio Content
- Long-form editing happens in Sanity Studio.
- The dashboard must expose clear "open in Studio" and "view publish state" actions instead of raw JSON editors.
- Publish/unpublish and revalidation status must be visible to operators even when the primary edit surface lives in Studio.

### Newsletter Operations
- Editorial issue/template creation happens in Sanity.
- Subscriber lifecycle, consent status, unsubscribe events, send logs, and delivery issues live in the dashboard.
- The dashboard must support search, filters, assignment, notes, and export-safe operational views.

### Inquiry And Booking Operations
- These records remain fully dashboard-owned.
- Operators need status transitions, assignee selection, notes, and timeline visibility.
- Dashboard modules must not expose unsafe bulk actions without audit coverage.

## Reuse Targets
- Reuse the existing admin shell, navigation, and route structure in `web/src/app/admin/**`.
- Reuse existing auth, audit, and request-validation foundations.
- Replace raw JSON catalog editing with structured forms, status actions, and Studio handoff controls.

## File Targets For Future Implementation
- `web/src/app/admin/**`
- `web/src/app/api/v1/admin/**`
- shared admin table, drawer, status-badge, and form primitives

## Exit Criteria
- The dashboard has a clear ownership split with Sanity Studio.
- Operators can understand where content is authored, where records are triaged, and where publish status is observed.
- Builders can implement dashboard modules without guessing whether a workflow belongs in Studio or the app.