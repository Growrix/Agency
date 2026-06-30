---
document_type: page-spec
route: /dashboard/appointments
role: Frontend
status: active
last_audit_date: 2026-07-01
---

# /dashboard/appointments — Appointments

## Purpose

List the customer's upcoming and past appointments, with reschedule/cancel actions for upcoming
ones.

## States

| State | Trigger | UI |
|---|---|---|
| Loading | Initial fetch | Skeleton rows |
| Empty | No appointments | Empty card with "Book a consultation" CTA |
| Populated | Appointments exist | Cards split into "Upcoming" and "Past" |
| Error | Endpoint failure | Inline error |

## Data sources

- `GET /api/v1/me/appointments`

## Mutations

- `PATCH /api/v1/me/appointments/[id]` — accepts `preferred_datetime` (reschedule) OR
  `cancel: true`. Triggered by AppointmentRescheduleModal already in the codebase.

## Mobile

- Reschedule modal is full-screen on narrow widths; date+time inputs stacked

## Accessibility

- Modal traps focus and announces title via `aria-labelledby`
- Reschedule/cancel actions disabled when status is already `cancelled`/`completed`

## E2E

Cover with the dashboard spec — reschedule round-trip.
