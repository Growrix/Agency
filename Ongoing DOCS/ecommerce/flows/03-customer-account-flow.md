# Customer Account Flow

Document status: active flow specification
Owner: Customer experience, frontend, backend, QA

## Purpose

Define the customer self-service journey after checkout and across account management.

## Scope

This specification covers dashboard overview, orders, order detail, invoices, downloads, addresses, profile, security, sessions, wishlist, returns, support tickets, notifications, store credit, rewards, and referrals.

## Source Documents

- `frontend/06-customer-and-admin-dashboards.md`
- `api/02-auth-customer-api.md`
- `api/05-orders-admin-webhook-api.md`
- `backend/02-user-profile-address-service.md`
- `auth/03-login-session-jwt-refresh.md`
- `state-machines/01-order-payment-fulfillment-states.md`

## Customer Routes

| Route/screen | Purpose | Required states |
| --- | --- | --- |
| `/dashboard` | Account overview | loading, loaded, empty/new customer |
| `/dashboard/orders` | Order history | empty, loading, filtered, error |
| `/dashboard/orders/:id` | Owned order detail | loaded, forbidden, not found, return eligible/ineligible |
| `/dashboard/addresses` | Address management | list, create, edit, delete, default change |
| `/dashboard/security` | Password/session/device controls | sessions list, revoke, password reset link |
| `/dashboard/support` | Tickets/messages | list, create, detail, closed |
| `/dashboard/wishlist` | Wishlist products | empty, active, unavailable item |

## Login And Return Behavior
1. Customer attempts protected dashboard route.
2. If unauthenticated, route redirects to sign-in with return URL.
3. After sign-in/sign-up, customer returns to original route when permitted.
4. If the route references a resource not owned by the customer, API returns 403 or safe 404.
5. UI shows permission-safe error without exposing another customer's data.

## Order History Behavior
- Orders are sorted by newest first by default.
- Each row/card shows order number, date, total, payment status, fulfillment status, primary next action, and support link.
- Empty state explains that orders will appear after purchase and links to products.
- Pagination or load-more is required for large histories.

## Order Detail Behavior
Required panels:
- Order summary.
- Line-item snapshot.
- Payment status.
- Invoice/download links when available.
- Fulfillment/tracking status.
- Return/refund eligibility.
- Support/ticket entry point.
- Customer-visible notes/messages.

## Customer Actions
| Action | Preconditions | Result |
| --- | --- | --- |
| Download invoice | Order owned and invoice available | Secure invoice view/download. |
| Track shipment | Shipment exists | Tracking info displayed or carrier link opened. |
| Request return | Order delivered/eligible and within policy | Return request created. |
| Cancel order | Order state allows cancellation | Cancellation request or immediate cancellation. |
| Contact support | Customer owns order or general support allowed | Ticket created with order context. |
| Edit address | Address owned and not locked by completed order snapshot | Address updated for future use only. |
| Revoke session | Session owned | Session revoked and security event recorded. |

## Ownership And Privacy Rules
- Customer APIs never return another customer's orders, addresses, invoices, sessions, tickets, wishlist, or payment methods.
- Existing order snapshots do not change when customer edits saved address.
- Sensitive account changes trigger security notification where configured.
- Saved payment methods are tokenized/provider-owned; never expose raw card data.

## Failure And Edge Cases
- Order not found: show safe not-found state.
- Forbidden order: show safe not-found or access denied according to security policy.
- Invoice pending: show pending invoice state and support route.
- Digital entitlement expired: show expiration message and support route.
- Return window closed: show reason and support escalation option.
- Product discontinued in reorder/wishlist: show unavailable state.

## Acceptance Criteria

- Customers can see and act on their own orders from checkout through support.
- Customer account routes preserve ownership and privacy.
- Empty, loading, error, forbidden, and ineligible states are explicit.
- Customer actions map to API endpoints, state transitions, notifications, and tests.
