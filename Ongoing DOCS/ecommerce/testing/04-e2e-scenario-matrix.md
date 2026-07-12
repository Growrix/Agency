# Ecommerce E2E Scenario Matrix

Document status: active QA contract
Owner: QA, frontend, backend, product

## Purpose

Define the end-to-end test scenarios required before ecommerce flows can be considered complete.

## Scope

This matrix covers public discovery, cart, checkout, payments/manual order, customer dashboard, admin operations, refunds/returns, permissions, accessibility, and regression gates.

## Test Data Dependency

Use fixtures from `fixtures/01-ecommerce-test-data.md` before running the matrix.

## Severity Legend

- P0: release blocker.
- P1: high-priority release requirement.
- P2: important but may be phased with owner approval.
- P3: enhancement/regression coverage.

## Checkout Scenarios
| ID | Priority | Scenario | Expected result |
| --- | --- | --- | --- |
| CO-01 | P0 | Guest adds physical product, completes checkout with manual/COD path | Order created, success page shown, admin order visible, notification queued. |
| CO-02 | P0 | Authenticated customer checks out with saved address | Order created under customer account, dashboard order visible. |
| CO-03 | P0 | Unauthenticated checkout redirects to sign-in/sign-up and returns | Cart, query state, and checkout draft preserved. |
| CO-04 | P0 | Double-click/place-order retry with same idempotency key | One order only, same result returned. |
| CO-05 | P0 | Out-of-stock item blocks checkout | Clear error, no order, cart recoverable. |
| CO-06 | P1 | Price changes during checkout | Customer must review updated totals before submit. |
| CO-07 | P1 | Invalid coupon | Field error, totals revert, checkout remains usable. |
| CO-08 | P1 | Reservation expires before submit | Revalidation happens, new reservation or blocking error shown. |
| CO-09 | P1 | Payment fails and retry is available | Failed state shown, cart/order attempt recoverable, no duplicate order. |
| CO-10 | P1 | Payment webhook duplicate event | One transaction/order update only. |

## Customer Account Scenarios
| ID | Priority | Scenario | Expected result |
| --- | --- | --- | --- |
| CU-01 | P0 | Customer views own order detail | Order, items, payment, invoice, fulfillment/support actions visible. |
| CU-02 | P0 | Customer attempts another customer's order URL | Safe 403/404, no data leakage. |
| CU-03 | P1 | Customer downloads invoice | Secure invoice available only to owner. |
| CU-04 | P1 | Customer requests eligible return | Return request created and visible to admin/customer. |
| CU-05 | P1 | Customer requests ineligible return | Clear reason and support route shown. |
| CU-06 | P2 | Customer edits saved address | Future default changes; existing order snapshot unchanged. |
| CU-07 | P2 | Customer revokes session | Session revoked and cannot be reused. |

## Admin Scenarios
| ID | Priority | Scenario | Expected result |
| --- | --- | --- | --- |
| AD-01 | P0 | Admin opens orders list and filters pending orders | Correct filtered list, loading/empty states work. |
| AD-02 | P0 | Admin opens order detail | Full source state visible: order, customer, payment, invoice, fulfillment, notes, audit. |
| AD-03 | P0 | Admin adds internal note | Note appears, audit log records actor/action. |
| AD-04 | P0 | Admin marks valid manual payment paid | Payment/order/invoice state reconciles, audit log written. |
| AD-05 | P0 | Unauthorized user hits admin orders API | 403 and no data leakage. |
| AD-06 | P1 | Admin sends invoice | Notification/job created and invoice state updates. |
| AD-07 | P1 | Admin creates partial refund | Refund state updates, refundable balance changes, audit log written. |
| AD-08 | P1 | Admin attempts invalid state transition | API rejects with conflict and UI reloads latest state. |
| AD-09 | P1 | Admin creates shipment/tracking | Fulfillment state updates and customer sees tracking. |
| AD-10 | P2 | Admin filters no matching orders | Empty state explains filter recovery. |

## Catalog And Cart Scenarios
| ID | Priority | Scenario | Expected result |
| --- | --- | --- | --- |
| CA-01 | P0 | Product listing to PDP to cart | Correct variant and price added. |
| CA-02 | P0 | Same product tier replace policy where configured | New tier replaces previous line for same slug. |
| CA-03 | P1 | Guest cart merges after login | Deterministic merge, no duplicate invalid lines. |
| CA-04 | P1 | Digital product checkout | No shipping required; entitlement/invoice behavior defined. |
| CA-05 | P1 | Service product checkout | Manual follow-up behavior and required notes/contact work. |

## Non-Functional Scenarios
| ID | Priority | Scenario | Expected result |
| --- | --- | --- | --- |
| NF-01 | P0 | Checkout form keyboard-only flow | All controls reachable and errors associated. |
| NF-02 | P0 | Admin order actions permission/security test | UI and API both enforce permissions. |
| NF-03 | P1 | Checkout API latency budget | Within project-defined budget under normal load. |
| NF-04 | P1 | Webhook signature failure | Rejected, logged, no state change. |
| NF-05 | P1 | Order-created notification failure | Order remains valid, notification retry/dead-letter visible. |

## Acceptance Criteria

- P0 scenarios pass before release.
- P1 scenarios pass unless explicitly deferred with owner, risk, and mitigation.
- Every failed scenario creates a task with source docs, expected behavior, and validation.
- Test reports link failures to flow specs and state-machine rules.
