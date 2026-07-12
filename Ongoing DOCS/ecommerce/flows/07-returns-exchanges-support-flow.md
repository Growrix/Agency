# Returns Exchanges Support Flow

Document status: active flow specification
Owner: CX, operations, finance, fulfillment, QA

## Purpose

Define post-purchase support workflows for cancellations, returns, exchanges, refunds, replacements, store credit, and support tickets.

## Scope

This specification covers customer return requests, admin return decisions, refund/exchange/store-credit resolution, support tickets, customer-visible messaging, operational notes, and audit logs.

## Customer Return Flow
1. Customer opens owned order detail.
2. UI shows return/cancel eligibility based on order state, delivery state, product type, return window, and policy exceptions.
3. Customer selects item, quantity, reason, preferred resolution, and optional message/media.
4. API validates ownership and eligibility.
5. Return request is created with `return_requested` state.
6. Customer sees return request status and support route.
7. Admin queue shows return request.

## Admin Return Flow
1. Admin opens returns queue or order detail.
2. API checks `returns.manage` permission.
3. Admin reviews order, item, payment, shipment, customer history, and policy context.
4. Admin approves, rejects, or requests more information.
5. Approval selects resolution: refund, exchange, replacement, store credit, or manual review.
6. Financial resolution creates refund/credit records and audit logs.
7. Customer receives notification and dashboard state updates.

## Support Ticket Flow
1. Customer creates support ticket from dashboard/order detail/contact route.
2. Ticket links to user and optional order.
3. Support/admin views ticket with permission.
4. Staff replies internally or customer-visible.
5. Customer-visible replies trigger notification.
6. Ticket status tracks open, waiting on customer, waiting on team, resolved, closed.

## Cancellation Rules
- Customer cancellation is allowed only before configured order/fulfillment state.
- Admin cancellation requires reason and audit log.
- Cancellation releases reservations and reconciles payment/refund state.
- Shipped/fulfilled orders route to return flow instead of cancellation.

## Resolution Rules

| Resolution | Required behavior |
| --- | --- |
| Refund to original payment | Provider refund plus internal refund state. |
| Store credit | Ledger credit event with reason and order link. |
| Exchange | New fulfillment/order reference or exchange record. |
| Replacement | Shipment/replacement record and inventory impact. |
| Reject | Reason recorded; customer-visible message optional by policy. |

## Edge Cases
- Digital product return/refund follows separate entitlement policy.
- Partial return cannot exceed ordered quantity minus already returned quantity.
- Refund cannot exceed paid minus already refunded.
- Missing delivered status blocks return unless admin override applies.
- Support attachments require file validation and safe storage.

## Tests
- Customer requests eligible return.
- Customer is blocked from ineligible return with clear reason.
- Admin approves return and creates partial refund.
- Admin issues store credit.
- Customer cannot access another customer's ticket/return.
- Support internal note is hidden from customer.
- Cancellation before fulfillment releases stock/payment state.

## Acceptance Criteria

- Customers can self-serve common post-purchase issues.
- Admins can resolve returns and support cases without database access.
- Financial and fulfillment resolutions are permissioned, auditable, and reconciled.
