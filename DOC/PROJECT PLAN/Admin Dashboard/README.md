# Admin Dashboard Expansion Plan

This folder is the dedicated planning package for rebuilding admin operations into a usable end-to-end dashboard.

## Purpose

The existing admin routes and APIs are present but operationally shallow for real production workflow. This plan defines the fresh expansion needed for:

- Shop management end-to-end
- Portfolio management end-to-end
- Newsletter subscription record operations
- Contact inquiry record operations
- Booking submission record operations

## Canonical Entry

- AI entrypoint: DOC/PROJECT PLAN/Admin Dashboard/ai-context.yaml
- Human plan index: DOC/PROJECT PLAN/Admin Dashboard/README.md
- Execution tracker source: DOC/PROJECT PLAN/Tasks/tasks.md

## Scope-Specific Planning Doc

- `DOC/PROJECT PLAN/Admin Dashboard/cms-content-operations-admin-dashboard.md` is the canonical admin role doc for the current CMS/content-operations rollout.
- Read it together with `DOC/PROJECT PLAN/cms-content-operations-e2e-plan.md` before changing admin routes, workflow ownership, publish controls, or submissions operations.

## Planning Mode

Hybrid planning mode:

- Scale mode: extend existing admin shell/routes/APIs already in code.
- Fresh mode: redesign operator workflows and information architecture so the dashboard is actually usable by non-technical operators.

## Current Baseline (What Exists)

Frontend baseline:

- Dedicated admin routes exist (`/admin`, `/admin/activity`, `/admin/catalog`, `/admin/pipeline`).
- Shared dashboard shell exists.
- Current catalog editing relies on JSON textarea payloads.
- Pipeline view is read-focused and lacks full workflow controls.

Backend baseline:

- Admin APIs already exist for products, portfolio, inquiries, appointments, orders, services, and analytics.
- Existing auth and route protection are in place.
- Audit/analytics logging exists in current backend foundation.

Gap summary:

- Missing production operator UX (forms, filters, status actions, assignment flows, notes, exports).
- Missing explicit workflow contracts for submissions operations.
- Missing stronger role/policy and mutation guardrails for admin operations.

## Target Admin Modules

### 1. Shop Management Module

Scope:

- Template and ready-website product list and filters
- Create and edit structured product forms
- Draft, publish, unpublish lifecycle controls
- Category/type/industry tagging
- Pricing, stack, highlights, and feature metadata
- Visibility and featured controls

Backend contract outcomes:

- Stable admin CRUD endpoints with validation and status transitions
- Safe publish workflow with auditable state changes

### 2. Portfolio Management Module

Scope:

- Portfolio list, search, and ordering controls
- Create and edit structured project forms
- Media linking and gallery management
- Draft, publish, unpublish lifecycle controls
- SEO metadata fields and visibility toggles

Backend contract outcomes:

- Stable admin CRUD endpoints with publish-state transitions
- Audit-safe mutation trail for all project lifecycle actions

### 3. Submissions Inbox Module

Scope:

- Unified operations inbox with tabs for:
  - Newsletter subscribers
  - Contact inquiries
  - Booking submissions
- Search and status filters
- Status workflow actions (new -> in_progress -> resolved/closed)
- Assignee and internal notes
- Detail drawer and export capability

Backend contract outcomes:

- Standardized records contract for newsletter/inquiry/booking operations
- Status transition and assignment endpoints
- Notes and audit timeline support

## Data and Workflow Model

### Core entities

- AdminUser
- ProductTemplateRecord
- PortfolioProjectRecord
- NewsletterSubscriberRecord
- ContactInquiryRecord
- BookingSubmissionRecord
- AdminNote
- AuditEvent

### Shared workflow states

Catalog lifecycle:

- draft
- published
- archived

Submission lifecycle:

- new
- in_progress
- resolved
- closed

## Frontend Architecture Plan

Route map target:

- /admin (overview)
- /admin/catalog/shop
- /admin/catalog/portfolio
- /admin/submissions/newsletter
- /admin/submissions/inquiries
- /admin/submissions/bookings
- /admin/activity

UI system requirements:

- Reusable data table component with sorting/filtering/pagination
- Reusable structured form framework with schema validation
- Reusable status badge and status action controls
- Reusable detail drawer and timeline components
- Shared optimistic-update and rollback patterns

## Backend Architecture Plan

Contract updates:

- Expand admin API contracts for publish lifecycle operations.
- Expand submissions contracts for status workflow, assignment, notes, and exports.
- Add stricter request validation per mutation endpoint.
- Add policy checks per role and operation.
- Ensure every write emits audit log events.

Policy model extension:

- super_admin: full access
- editor: catalog and submissions operations except destructive policy-level actions
- support: submissions operations only

## Security and Compliance Plan

- Enforce explicit operation-level authorization on all admin writes.
- Enforce immutable audit records for all sensitive admin actions.
- Enforce input sanitization and schema validation for all mutation payloads.
- Preserve existing privacy requirements for inquiry and booking data.

## DevOps and Release Plan

Rollout strategy:

- Feature-flag module rollout by admin section
- Stage and verify modules in non-production environment first
- Enable progressively after e2e and security gates pass

Observability additions:

- Admin mutation error-rate dashboard
- Audit anomaly alerts for repeated failed mutation attempts
- Submission backlog aging metrics (new/in_progress duration)

## QA and Validation Gates

Mandatory gates for P7:

1. Static validation (typecheck, lint, build)
2. Unit tests for admin validation and state transition logic
3. Integration tests for admin API contracts and role enforcement
4. End-to-end tests for:
   - Shop create/edit/publish flow
   - Portfolio create/edit/publish flow
   - Submissions triage/update flow
5. Accessibility checks for all new admin forms and table actions
6. Security checks for authz/authn and mutation safeguards
7. Regression checks for existing admin and public surfaces

## Phase Mapping To Tracker

This documentation corresponds to Phase P7 and tasks:

- T034: Admin IA, boundaries, route map
- T035: Shop and portfolio backend contracts
- T036: Newsletter/inquiry/booking operations contracts
- T037: Authorization and auditability hardening
- T038: Validation and release-readiness gates

Reference tracker:

- DOC/PROJECT PLAN/Tasks/tasks.md

## Exit Criteria

Planning exit criteria:

- Admin dashboard plan is documented and linked in root project docs.
- Phase P7 tasks are machine-tracked in tasks.md.
- Frontend, backend, security, and QA expectations are explicit and non-ambiguous.

Execution readiness criteria:

- New branch for admin phase exists.
- Tracker status is updated before implementation starts.
- Module-by-module delivery sequence is approved.
