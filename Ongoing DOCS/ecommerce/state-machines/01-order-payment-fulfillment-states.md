# Order Payment Fulfillment State Machines

Document status: active state contract
Owner: Architecture, backend, QA, operations

## Purpose

Define allowed lifecycle states and transitions for carts, checkout sessions, inventory reservations, orders, payments, invoices, shipments, returns, refunds, and notifications.

## Scope

These state machines are implementation contracts. Agents must not invent new states without updating this file and dependent API/frontend/backend docs.

## Cart States
| State | Meaning | Allowed transitions |
| --- | --- | --- |
| `active` | Cart can be edited and checked out. | `merged`, `expired`, `converted` |
| `merged` | Guest cart merged into customer cart. | terminal |
| `expired` | Cart no longer valid. | terminal or restore to `active` by policy |
| `converted` | Cart produced an order. | terminal |

Rules:
- Only `active` carts can start checkout.
- `converted` carts cannot be mutated except read-only recovery by support/admin policy.

## Checkout Session States
| State | Meaning | Allowed transitions |
| --- | --- | --- |
| `draft` | Customer has checkout form/cart context but has not submitted final review. | `validating`, `abandoned`, `expired` |
| `validating` | Server is checking cart, address, coupon, inventory, shipping/tax. | `ready`, `blocked`, `expired` |
| `ready` | Final server totals are available for review/submit. | `submitting`, `expired`, `blocked` |
| `blocked` | Checkout cannot continue until user fixes issue. | `validating`, `abandoned`, `expired` |
| `submitting` | Final submit/payment is in progress. | `order_created`, `payment_pending`, `failed` |
| `payment_pending` | Provider/manual payment is not final yet. | `order_created`, `failed`, `expired` |
| `order_created` | Order exists. | terminal |
| `failed` | Submission failed but recovery may be possible. | `ready`, `abandoned` |
| `abandoned` | Customer left or timed out before order. | terminal or restore by policy |
| `expired` | Reservation/session expired. | terminal or new session |

## Inventory Reservation States
| State | Meaning | Allowed transitions |
| --- | --- | --- |
| `held` | Stock reserved for checkout. | `confirmed`, `released`, `expired` |
| `confirmed` | Reservation converted to order allocation. | terminal |
| `released` | Reservation manually/system released. | terminal |
| `expired` | Reservation timed out. | terminal |

Rules:
- Expired/released reservations cannot confirm.
- Confirmation must be tied to a valid order ID.

## Order States
| State | Meaning | Allowed transitions |
| --- | --- | --- |
| `draft` | Internal pre-order, not visible as placed order. | `placed`, `cancelled` |
| `placed` | Customer submitted order; payment may be pending/manual. | `payment_pending`, `paid`, `cancelled`, `review_required` |
| `payment_pending` | Waiting for payment/provider/manual confirmation. | `paid`, `payment_failed`, `cancelled` |
| `payment_failed` | Payment failed and order is not fulfillable. | `payment_pending`, `cancelled` |
| `paid` | Payment confirmed or manual payment accepted. | `review_required`, `fulfillment_pending`, `refunded`, `partially_refunded` |
| `review_required` | Fraud/manual review blocks fulfillment. | `fulfillment_pending`, `cancelled`, `refunded` |
| `fulfillment_pending` | Ready for fulfillment. | `partially_fulfilled`, `fulfilled`, `cancelled` |
| `partially_fulfilled` | Some items fulfilled. | `fulfilled`, `return_requested`, `partially_refunded` |
| `fulfilled` | All fulfillable items fulfilled. | `return_requested`, `partially_refunded`, `refunded`, `closed` |
| `return_requested` | Customer requested return. | `return_approved`, `return_rejected` |
| `return_approved` | Return accepted. | `partially_refunded`, `refunded`, `exchange_pending` |
| `return_rejected` | Return denied by policy/admin. | `closed` |
| `partially_refunded` | Some amount refunded. | `refunded`, `closed` |
| `refunded` | Fully refunded. | `closed` |
| `cancelled` | Cancelled before completion/fulfillment. | terminal |
| `closed` | Lifecycle complete. | terminal |

Rules:
- Fulfillment is blocked unless order state allows fulfillment.
- Refund cannot exceed paid minus already refunded.
- Admin override requires permission, reason, and audit log.

## Payment States
| State | Meaning | Allowed transitions |
| --- | --- | --- |
| `not_required` | Free/manual/no online payment flow. | terminal or `manual_pending` |
| `manual_pending` | Offline/manual payment expected. | `succeeded`, `failed`, `cancelled` |
| `intent_created` | Provider payment intent/session created. | `processing`, `cancelled`, `failed` |
| `processing` | Payment in progress. | `succeeded`, `failed`, `pending` |
| `pending` | Provider has not finalized. | `succeeded`, `failed`, `cancelled` |
| `succeeded` | Payment confirmed. | `partially_refunded`, `refunded`, `disputed` |
| `failed` | Payment failed. | `intent_created`, `cancelled` |
| `partially_refunded` | Partial refund completed. | `refunded`, `disputed` |
| `refunded` | Full refund completed. | terminal or `disputed` |
| `disputed` | Chargeback/dispute opened. | `succeeded`, `refunded`, `lost` |
| `lost` | Dispute lost. | terminal |
| `cancelled` | Payment flow cancelled. | terminal |

## Invoice States
| State | Meaning | Allowed transitions |
| --- | --- | --- |
| `draft` | Invoice created but not sent. | `sent`, `void` |
| `sent` | Invoice delivered or available. | `paid`, `overdue`, `void` |
| `overdue` | Payment deadline missed. | `paid`, `void` |
| `paid` | Invoice settled. | terminal |
| `void` | Invoice cancelled. | terminal |

## Shipment States
| State | Meaning | Allowed transitions |
| --- | --- | --- |
| `not_required` | Digital/service/no shipment required. | terminal |
| `pending` | Shipment not created. | `label_created`, `cancelled` |
| `label_created` | Label/tracking generated. | `in_transit`, `cancelled` |
| `in_transit` | Carrier has package. | `delivered`, `failed_delivery`, `lost` |
| `delivered` | Delivered. | terminal |
| `failed_delivery` | Delivery failed. | `in_transit`, `returned_to_sender` |
| `returned_to_sender` | Returned by carrier. | terminal or return/refund flow |
| `lost` | Carrier lost package. | terminal or support resolution |
| `cancelled` | Shipment cancelled. | terminal |

## Notification States
| State | Meaning | Allowed transitions |
| --- | --- | --- |
| `queued` | Message queued. | `sent`, `failed`, `cancelled` |
| `sent` | Provider accepted or delivered. | terminal |
| `failed` | Provider/send failure. | `queued`, `dead_letter` |
| `dead_letter` | Retries exhausted. | terminal/manual resolution |
| `cancelled` | Message intentionally cancelled. | terminal |

## Acceptance Criteria

- APIs reject invalid transitions with conflict errors.
- UI enables actions only when current state and permission allow them.
- Tests cover happy transitions, invalid transitions, duplicate events, and admin overrides.
- Audit logs record sensitive financial, fulfillment, refund, and override transitions.
