---
document_type: page-spec
route: /admin
role: Admin Dashboard
status: active
last_audit_date: 2026-07-01
---

# /admin — Operational snapshot

## Purpose

Land-page dashboard showing volume + health of customer-facing surfaces (orders, inquiries,
appointments, downloads). Operator's first stop after sign-in.

## States

| State | Trigger | UI |
|---|---|---|
| Loading | `loadAdminState` in-flight | Skeleton cards |
| Populated | Data loaded | Summary tiles + quick links |
| Error | Aggregate fetch failure | Inline error with refresh |

## Data sources

- `loadAdminState()` (client helper) hits `/api/v1/admin/summary` (current) + several listing
  endpoints in parallel

## Mutations

None. Tile actions link to deeper routes.

## Mobile

- Sidebar collapses to bottom-sheet at < 768px
- Tiles wrap to single column

## Accessibility

- Each tile heading is a focusable link
- Live counts use `aria-live="polite"` on first paint, off afterwards

## E2E

Smoke test covered by `release-gates.spec.ts` Admin protection assertion (401/redirect when
unauthenticated).
