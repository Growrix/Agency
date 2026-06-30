---
document_type: role-plan
role: Frontend
parent_artifact: DOC/PROJECT PLAN/auth-account-cart-dashboard-e2e-plan.md
status: active
last_audit_date: 2026-07-01
---

# Cart & Checkout — Frontend Plan (Phase 3)

## Scope

- Surface a full-page `/cart` route alongside the existing drawer.
- Server-sync the cart for signed-in customers so it follows them across devices.
- Keep guests on localStorage only.

## Route + components

| Path | File | Notes |
|---|---|---|
| `/cart` | `web/src/app/cart/page.tsx` (server) + `CartPage.tsx` (client) | Mirrors the drawer with larger rows, line totals, summary card. Reuses `formatUsdFromCents`. |
| Cart drawer | `web/src/components/shop/CartDrawer.tsx` | No structural change — both surfaces feed the same store. |
| Cart store | `web/src/lib/cart-store.ts` | Extended with server-sync layer (see below). |

## Server-sync behavior

`rehydrateCartStore()` becomes the single entry point for hydration. After Zustand's local rehydrate:

1. If Clerk is configured (`NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` is set):
   - If localStorage has items → PUT `/api/v1/me/cart` with `mode: "merge"` to combine
     local and server (per-key last-wins).
   - Otherwise → GET `/api/v1/me/cart` for the existing server set.
   - 401/403 (no session or incomplete signup) → silent noop, keep localStorage as-is.
2. Replace the in-memory store with the canonical server result.
3. Subscribe to in-memory changes; debounce 400ms then PUT `/api/v1/me/cart` with `mode: "replace"`.

Server-sync stays best-effort: any network failure leaves the local store intact. The user keeps a
working cart; we just don't roundtrip until the next change.

## Guests vs signed-in

| User type | Persistence | Cross-device |
|---|---|---|
| Guest (no Clerk session) | localStorage (zustand persist) | No |
| Signed-in (complete signup) | localStorage + server | Yes |
| Signed-in (incomplete signup) | localStorage | No (server gate returns 403) |

The third row is intentional: until a Clerk user completes `/complete-account`, they can't reach
any `/api/v1/me/*` endpoint. Their cart still works locally; first server sync happens after
signup completes and they reload.

## Reused primitives

- `Card`, `Button`, `LinkButton`, `Container`, `Section`
- `useCartStore` selectors (items, itemCount, totalCents, removeItem, updateQuantity)
- `formatUsdFromCents`

## Deferred

- `CartInventoryNotice` — passive notice for unavailable items. Inventory check is deferred until
  the catalog flips to live stock state. Not on the path to closing the persistence gap.
- Full-page recommendations grid below the line items.
- E2E test for cross-device sync.

## Acceptance criteria

- Signed-in customer adds 2 items on Device A, signs in on Device B, sees the same 2 items in the
  cart drawer and at `/cart`.
- Updating quantity in either drawer or `/cart` persists across page reloads.
- Guest cart still works without a Clerk session.
- `requireCompletedSubscriber` rejects signed-in-but-incomplete users from `/api/v1/me/cart`.
- All standard gates pass: lint, typecheck, perf:budgets, test, build, release-gates.
