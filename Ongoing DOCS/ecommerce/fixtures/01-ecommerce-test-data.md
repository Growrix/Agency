# Ecommerce Test Data Fixtures

Document status: active fixture contract
Owner: QA, backend, frontend

## Purpose

Define required test data so AI agents and engineers can run complete ecommerce e2e flows without inventing inconsistent fixtures.

## Scope

Fixtures cover users, roles, products, variants, inventory, coupons, carts, orders, payments, invoices, shipments, returns, refunds, reviews, notifications, and edge cases.

## Users And Roles
| Fixture | Purpose |
| --- | --- |
| `guest` | Anonymous cart and checkout. |
| `customer_basic` | Authenticated purchase and dashboard. |
| `customer_with_saved_address` | Saved-address checkout. |
| `customer_with_orders` | Order history, invoice, return tests. |
| `support_user` | Limited customer/order support. |
| `manager_user` | Product/inventory/order operations. |
| `admin_user` | Settings/payment/shipping/admin access. |
| `unauthorized_user` | Permission denial tests. |

## Product Fixtures
| Fixture | Required attributes |
| --- | --- |
| `physical_standard` | SKU, price, tax class, shippable, inventory-managed. |
| `physical_low_stock` | Available quantity below threshold. |
| `physical_out_of_stock` | Zero available quantity. |
| `digital_download` | No shipping, entitlement/download behavior. |
| `service_manual_followup` | No shipping, manual contact/order workflow. |
| `bundle_product` | Multiple components, bundle price. |
| `subscription_like` | Recurring/renewal placeholder policy. |
| `tax_exempt_product` | Tax calculation edge case. |
| `archived_product` | Not public, admin-only visibility. |

## Coupon Fixtures
| Code | Behavior |
| --- | --- |
| `WELCOME10` | 10 percent discount, valid. |
| `EXPIRED10` | Expired coupon. |
| `LIMIT1` | Usage limit reached after first use. |
| `FIRSTBUYER` | Customer eligibility restricted. |
| `NOSTACK` | Cannot stack with other discounts. |
| `FREESHIP` | Shipping discount where applicable. |

## Inventory Fixtures
- Warehouse A with sufficient stock.
- Warehouse B with zero stock.
- Active reservation that can expire.
- Confirmed reservation attached to order.
- Manual stock adjustment record.
- Low-stock alert record.

## Order Fixtures
| Fixture | Purpose |
| --- | --- |
| `order_placed_manual_pending` | Manual follow-up/paymentless order. |
| `order_paid_unfulfilled` | Admin fulfillment actions. |
| `order_fulfilled` | Customer tracking/return eligibility. |
| `order_payment_failed` | Failed payment recovery. |
| `order_partially_refunded` | Refund balance tests. |
| `order_refunded` | Closed refund lifecycle. |
| `order_return_requested` | Admin return approval/rejection. |
| `order_other_customer` | Ownership denial tests. |

## Payment And Webhook Fixtures
- Successful provider event.
- Duplicate provider event.
- Signature failure event.
- Amount mismatch event.
- Pending payment event.
- Failed payment event.
- Partial refund event.
- Dispute event.

## Invoice And Notification Fixtures
- Draft invoice.
- Sent invoice.
- Paid invoice.
- Overdue invoice.
- Order-created email queued.
- Order-created email failed/retryable.
- Dead-letter notification.
- Admin-configured email template with placeholders.

## Required Seed Behavior
- Fixtures must be deterministic and resettable.
- Test IDs/slugs should be stable.
- Secrets and real customer data must not be used.
- Fixtures should support unit, integration, API, and E2E tests.

## Acceptance Criteria

- Every P0/P1 scenario in `testing/04-e2e-scenario-matrix.md` has required fixture data.
- Fixtures cover success, failure, permission, and edge states.
- Fixture docs stay aligned with state machines and API contracts.
