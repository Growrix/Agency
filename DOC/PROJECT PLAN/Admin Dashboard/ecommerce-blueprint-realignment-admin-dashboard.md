# Ecommerce Blueprint Realignment Admin Dashboard Plan

## Purpose
Close ecommerce operator workflow gaps so admin actions are structured, auditable, and launch-ready.

## Current State
- Admin route and API foundations are strong.
- Workflow maturity is uneven: some flows remain JSON-heavy, fragmented, or weakly policy-bound.

## Priority Gaps
1. Catalog operations
- Structured product and category workflows with publish-state controls.
- Consistent taxonomy and merchandising controls.

2. Order and fulfillment operations
- Clear order state transitions, delivery linkage, refund/return controls, and escalation notes.

3. Support and submissions
- Unified triage and SLA-aware workflows for customer issues.
- Clear visibility boundaries for customer-facing vs internal notes.

4. Sensitive operations
- Role-protected paths for data exports, payment overrides, role changes, and critical config edits.

5. Analytics and operations visibility
- Actionable admin dashboards for conversion, payment risk, and backlog aging.

## Reuse Targets
- Existing /admin route families and admin APIs.
- Existing auth guard and audit logging patterns.

## Deliverables
- Operator workflow map aligned with blueprint phases 10-14.
- Admin mutation policy checklist.
- Release-readiness checklist for admin-facing operations.

## Exit Criteria
- Core commerce operations can be completed end-to-end by operators without ad hoc/manual workarounds.
- High-risk actions are role-protected and auditable.
