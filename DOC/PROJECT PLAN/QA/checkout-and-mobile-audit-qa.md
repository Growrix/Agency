---
document_type: role-plan
role: QA
parent_artifact: DOC/PROJECT PLAN/auth-account-cart-dashboard-e2e-plan.md
status: active
last_audit_date: 2026-07-01
---

# Checkout polish + mobile audit — QA plan (Phase 5)

## Scope

- Q1 — checkout UX polish (step indicator, inline validation, smart submit disable).
- Q2 — Playwright mobile-chrome smoke spec for the highest-traffic routes (`/`, `/cart`,
  `/checkout`, `/dashboard`).
- Safe-area / bottom-nav verification per `web/AGENTS.md` mobile rules.

## Q1 — Checkout polish acceptance

| Behavior | Where | Verification |
|---|---|---|
| Step indicator shows Cart → Sign-in → Review → Payment | `components/checkout/CheckoutSteps.tsx` mounted at top of form | Mobile smoke spec asserts `<ol aria-label="Checkout progress">` is visible |
| Active step follows viewer + submit state | Computed in `CheckoutExperience` | Manual: load `/checkout` while signed out → "Sign in" active; sign in → "Review" active |
| Inline validation messages with `aria-live` | Name/email fields + status row | Manual: blur an empty name field → "Full name is required." surfaces; tab through to confirm screen reader announces via `aria-describedby` |
| Submit disabled until form valid | `Button.disabled` wired to `formValid` | Manual: blank name → submit stays disabled; fill both → submit enables |

## Q2 — Mobile smoke spec

`tests/e2e/mobile-smoke.spec.ts` (Playwright project `mobile-chrome` — Pixel 5):

1. Homepage renders within 8s + critical axe violations = 0
2. `/cart` exposes a "Browse"/"Continue shopping" link
3. `/checkout?cart=1` with an empty cart renders the "empty cart" copy (no `product` fallback should appear)
4. `/checkout?cart=1` regression guard — the step indicator is visible even when the cart is empty
5. `/dashboard` redirects unauthenticated to `/dashboard/login` or `/sign-in`
6. Homepage safe-area: `#main` is visible (smoke; full safe-area-inset asserted via
   `MobileBottomNav` inline style)

The desktop-chrome project keeps owning `release-gates.spec.ts`; mobile-chrome runs alongside.

## Checkout redirect matrix (regression coverage)

| Trigger | Cart size | Expected URL |
|---|---|---|
| Product-detail "Buy now" | any | `/checkout?product=<slug>&variant=&tier=&fulfillment=` (built by `getCheckoutHref`) |
| `CartHoverMenu` "Proceed to Checkout" | 1 | Same single-item URL as above |
| `CartHoverMenu` "Proceed to Checkout" | 2+ | `/checkout?cart=1` |
| `CartHoverMenu` "Continue Shopping" | any | `/digital-products` |
| `CartPage` "Proceed to checkout" | 1 | Single-item URL |
| `CartPage` "Proceed to checkout" | 2+ | `/checkout?cart=1` |
| `CartPage` CheckoutSteps Information tab | 0 | non-interactive (no href) |
| `CartPage` CheckoutSteps Information tab | 1+ | same as Proceed CTA |
| `/checkout` with no `?product=` and no `?cart=1` | any | Renders the "choose a product" empty state (unchanged) |
| `/checkout?cart=1` | 0 | Renders "Your cart is empty" empty state |
| `/checkout?cart=1` | 1+ | Renders the checkout form with `CartOrderSummary` in the right column |

## Safe-area / bottom-nav

`MobileBottomNav` already uses `paddingBottom: max(env(safe-area-inset-bottom), 8px)` and
`AppChrome` applies `pb-24 lg:pb-0` to `<main>` so content clears the bottom nav. No code
change required; the mobile smoke spec acts as the regression guard.

`DashboardChrome` strips the public bottom-nav entirely — dashboard pages render inside
`DashboardShell` with its own collapsible mobile sidebar. No additional safe-area work needed
for `/dashboard/account` or `/cart` until the dashboard surfaces add a floating action layer.

## Deferred to a later cycle

- Cross-device cart sync e2e (operator says when Phase 3 server-sync gets time on staging).
- Per-route axe sweep for every dashboard route (D1 specs name the test paths; specific
  fixtures land when seeded customer/order data exists in CI).
- Estimated taxes/discounts surface on `/checkout` (waits for the tax engine to land — the
  existing `OrderRecord.tax_cents`/`discount_cents` fields already support it).

## Verification

```
npm run lint
npm run typecheck
npm run perf:budgets
npm run test
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY= CLERK_SECRET_KEY= CLERK_WEBHOOK_SIGNING_SECRET= npm run build
npm run test:e2e -- tests/e2e/release-gates.spec.ts --project=desktop-chrome
npm run test:e2e -- tests/e2e/mobile-smoke.spec.ts --project=mobile-chrome
```
