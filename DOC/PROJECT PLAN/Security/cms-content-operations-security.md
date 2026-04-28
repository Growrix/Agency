---
document_type: role-scope-plan
role: security
scope: cms-content-operations
parent_plan: DOC/PROJECT PLAN/cms-content-operations-e2e-plan.md
status: planning-ready
last_updated: 2026-04-28
---

# Security CMS Content Operations Plan

## Purpose
- Define the security, privacy, token-ownership, and audit requirements for the CMS/content-operations rollout.
- Prevent preview, publish, webhook, and newsletter operations from bypassing existing auth and audit controls.

## Canonical Inputs
- `DOC/PROJECT PLAN/cms-content-operations-e2e-plan.md`
- `DOC/PROJECT PLAN/Security/ai-context.yaml`
- `DOC/PROJECT PLAN/API and Data/cms-content-operations-api-data.md`
- `DOC/PROJECT PLAN/Admin Dashboard/cms-content-operations-admin-dashboard.md`

## Secret And Token Matrix

| Secret or token | Owner surface | Storage rule | Used by | Notes |
|---|---|---|---|---|
| Sanity read token | Server only | environment secret, never client-exposed | server query adapters | Least privilege; separate from write-capable tokens |
| Sanity write or management token | Server/admin integrations only | environment secret, restricted access | publish-management flows if required | Must never reach client bundles |
| Preview secret | Server only | environment secret, rotated on compromise | draft-mode entrypoints | Preview access must also require authenticated admin/editor state |
| Sanity webhook secret | Server only | environment secret | incoming publish/unpublish webhook validation | Reject unsigned or mismatched requests |
| Revalidation secret | Server only | environment secret | internal revalidation route | Must not be reused as a public preview toggle |
| Resend API key | Server only | environment secret | newsletter send workflows | No key material in logs or client-visible errors |
| Supabase service-role key | Server only | environment secret with minimum distribution | newsletter lifecycle and admin-only writes | Never exposed to frontend runtime |

## Access-Control Matrix

| Role | Allowed actions | Blocked actions |
|---|---|---|
| `super_admin` | full preview, publish, unpublish, subscriber export, audit-log review, secret-backed operational actions | none beyond explicit break-glass policies |
| `editor` | create/edit content, request preview, publish or unpublish where approved, view publish status | subscriber export, destructive admin-policy changes, secret inspection |
| `support` | subscriber, inquiry, and booking triage; note and assignment actions; operational status review | content editing, publish actions, preview-secret usage, audit export |

## Required Security Controls
- Preview access must require authenticated admin or editor state in addition to the preview secret.
- Publish and unpublish webhooks must verify signature or secret before triggering revalidation.
- Revalidation endpoints must invalidate exact path sets and log the initiating actor or provider.
- Newsletter subscribe, unsubscribe, and send flows must protect PII, avoid raw token leakage, and record audit events for sensitive actions.
- Subscriber export and bulk send actions must be explicitly role-gated and audited.
- All preview, publish, send, export, assignment, and note mutations must emit immutable audit records.
- CMS tokens, webhook secrets, and provider keys must remain server-only and must not appear in browser bundles, logs, or client error payloads.

## Abuse And Privacy Controls
- Public newsletter subscribe endpoints require rate limiting, validation, and abuse detection.
- Unsubscribe flows must use signed or opaque tokens and must not reveal unrelated subscriber data.
- Inquiry and booking records remain confidential and must not leak into CMS preview or editorial tooling.
- Publish failure, webhook failure, and repeated authz failure patterns must be observable in admin-safe telemetry.

## Release Gates
- Security review covers preview auth, webhook auth, revalidation auth, role enforcement, subscriber privacy handling, and audit completeness.
- No CMS rollout slice is production-ready until these controls are implemented and validated.

## Exit Criteria
- Builders can implement preview, publish, webhook, and newsletter operations without inventing secret-handling or authz rules.
- Every privileged CMS or operator action has a documented security owner, control boundary, and audit expectation.