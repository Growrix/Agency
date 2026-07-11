# Customer Dashboard Admin Operations Plan

## Purpose
Define the operator-side workflows required to support the customer dashboard so customer actions do not end in dead UI.

## Why Admin Dashboard Is In Scope
Customer dashboard actions create operational work for internal staff:
- support requests and replies
- appointment reschedule/cancel requests
- order issue handling
- data export and deletion requests
- customer-visible notification resolution

Without admin/operator planning, customer dashboard UX cannot complete end-to-end.

## Operator Workflows Required

### Support Inbox Mirror
- Admin must see dashboard-originated support requests in a dedicated queue or filter.
- Each support request must support:
  - customer-visible replies
  - internal-only notes
  - status transitions
  - linked order/product/download context
  - assignee and SLA tracking

### Appointment Request Handling
- Admin must review customer reschedule and cancellation requests.
- Admin actions:
  - approve and update appointment
  - request clarification
  - reject with explanation
- Customer sees only customer-safe status and reply copy.

### Order And Download Issue Handling
- Operators need a route from customer-reported issue -> order detail -> download record -> delivery remediation.
- Customer-facing replies must be separate from internal troubleshooting notes.

### Account Request Handling
- Admin must process:
  - data export requests
  - privacy access requests
  - account deletion requests
- Workflow requires status visibility, immutable audit, and completion response.

## Admin UI Requirements
- Add filters/tags for records originating from `/dashboard/**`.
- Add customer-visible vs internal-only message composer controls.
- Add request-state badges for customer action items.
- Add timeline/history drawer for support and account requests.
- Add quick links back to customer-facing context where safe.

## Admin API Expectations
- Admin support APIs must distinguish internal notes from customer-visible replies.
- Admin appointment mutation endpoints must support request-resolution metadata.
- Admin order issue flows must be able to trigger customer notifications.
- Admin account-request endpoints must update request status and resolution notes.

## Policy Rules
- Only privileged admin roles can resolve account deletion/export requests.
- Editors/support roles may reply to support threads but not hard-delete records.
- Every customer-visible operator action must create an audit event.

## Exit Criteria
- Every customer dashboard action that requires human follow-up has an operator-side owning workflow.
- No customer-facing request depends on raw JSON editing or hidden internal-only mutations.
