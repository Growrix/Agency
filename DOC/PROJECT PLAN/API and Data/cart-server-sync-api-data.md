---
document_type: role-plan
role: API and Data
parent_artifact: DOC/PROJECT PLAN/auth-account-cart-dashboard-e2e-plan.md
status: active
last_audit_date: 2026-07-01
---

# Cart Server-Sync — API and Data Plan

## Scope

Phase 3 (P23) — persist the cart for signed-in customers so it survives device switches; keep
guests on localStorage only.

## Schema

`public.cart_items` (added to `web/supabase/schema.sql`):

```sql
create table if not exists public.cart_items (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  product_slug text not null,
  product_name text not null,
  product_variant_slug text,
  product_tier_name text,
  fulfillment_type text,
  quantity integer not null check (quantity > 0),
  unit_price_cents integer not null check (unit_price_cents >= 0),
  updated_at timestamptz not null default timezone('utc', now()),
  unique (user_id, product_slug, coalesce(product_variant_slug, ''), coalesce(product_tier_name, ''))
);
create index if not exists cart_items_user_idx on public.cart_items (user_id, updated_at desc);
```

Trigger: `cart_items_set_updated_at` keeps `updated_at` fresh on update.

RLS: joined into the existing `do $$ ... revoke ... grant service_role ...` block. anon and
authenticated roles are blocked outright; API handlers enforce per-user ownership.

`CartItemRecord` TS type is appended to `web/src/server/data/schema.ts`. `DatabaseSchema.cart_items`
is added with `DEFAULT_DATABASE.cart_items: []`. `web/src/server/data/store.ts` includes the array
in `createEmptyDatabase()`.

## Domain module

`web/src/server/domain/cart.ts` exposes:

| Function | Behavior |
|---|---|
| `getCartForUser(userId)` | Returns `{ items, subtotal_cents, item_count }` sorted by `updated_at` desc |
| `addCartItem(userId, input)` | Upserts; if key matches, increments quantity |
| `updateCartQuantity(userId, key, quantity)` | Sets quantity; 0 removes the row |
| `removeCartItem(userId, key)` | Deletes by composite key |
| `clearCart(userId)` | Removes all rows for the user |
| `replaceCart(userId, inputs)` | Atomic replace — drops user's rows, inserts new set |
| `mergeLocalIntoServer(userId, inputs)` | Sign-in merge: per-key last-wins by `max(server.quantity, local.quantity)` |

Composite key for de-duplication: `(product_slug, product_variant_slug ?? '', product_tier_name ?? '')`.

## Endpoints

All guarded by `requireCompletedSubscriber` (Phase 1 gate).

| Method | Path | Body / Query | Behavior |
|---|---|---|---|
| GET | `/api/v1/me/cart` | — | Returns the current cart |
| PUT | `/api/v1/me/cart` | `{ mode: "replace" | "merge", items: CartItem[] }` | Replace or merge the whole cart in one call (used by client hydration) |
| POST | `/api/v1/me/cart/items` | `{ item: CartItem }` | Add or increment a single item |
| DELETE | `/api/v1/me/cart/items?productSlug=&variantSlug=&tierName=` | — | Remove a single item |
| PATCH | `/api/v1/me/cart/items/quantity` | `{ product_slug, product_variant_slug?, product_tier_name?, quantity }` | Set explicit quantity (0 removes) |

Validation:

- `product_slug`, `product_name`, `quantity`, `unit_price_cents` required on every payload that
  introduces a new item. Items without these are silently dropped from arrays.
- All endpoints return the full updated cart view to keep the client in sync.

## Hydration contract

The client store calls these endpoints in this order on `rehydrateCartStore`:

1. `useCartStore.persist.rehydrate()` — local first
2. If `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` set:
   - If local cart has items: `PUT /api/v1/me/cart` with `mode: "merge"`
   - Otherwise: `GET /api/v1/me/cart`
3. On 401/403 (no session OR incomplete signup): noop — keep local cart
4. On 2xx: replace in-memory store with the returned set
5. Subscribe to in-memory changes; debounce 400ms then `PUT /api/v1/me/cart` with `mode: "replace"`

## Test plan

- Unit: domain functions for upsert, quantity clamp, merge semantics.
- Integration: full round trip add → list → quantity → remove via the endpoints. Add at least
  one test that confirms `requireCompletedSubscriber` rejects an incomplete-signup user.
- E2E (deferred to Phase 5): sign-in cross-device cart sync.

## Migration

The Supabase migration is additive. `web/scripts/migrate-supabase.mjs` already applies
`web/supabase/schema.sql` against `SUPABASE_DB_URL` for the operator. No data backfill is required —
existing carts are localStorage-only.
