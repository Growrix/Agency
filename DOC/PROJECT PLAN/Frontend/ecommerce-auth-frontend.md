# Frontend Role Plan — E-Commerce + Auth Platform

**Canonical root plan:** `DOC/PROJECT PLAN/ecommerce-auth-platform-e2e-plan.md`
**Last updated:** 2026-06-29

---

## Scope

Frontend changes for phases P12 (auth modal), P13 (cart), P15 (checkout redesign + upsell), and P18 (admin order UI). All new UI must reuse existing design system primitives.

---

## Phase P12 — Auth UX: Modal + Header Dashboard Controls

### Changes to `PublicAuthControls.tsx`

**Sign-out state (existing → change `mode`):**
- Desktop: `SignInButton mode="modal"` wrapping existing button + `SignUpButton mode="modal"` wrapping existing `Button`
- Mobile: same modal mode in `mobileNav` variant
- Keep `LegacySignInLink` fallback for when Clerk is not configured (unchanged)

**Sign-in state (new `SignedIn` branch for desktop):**
```
SignedIn:
  Desktop:
    UserButton (existing)
    LinkButton href="/dashboard" size="sm" — "Dashboard"
  Mobile:
    UserButton (existing)
    Link href="/dashboard" — LayoutDashboard icon (HeroIcon: Squares2X2Icon or RectangleGroupIcon)
```

**Clerk modal redirect:** `forceRedirectUrl="/dashboard"` stays on both buttons.

**Do not change:**
- `/sign-in` and `/sign-up` standalone pages
- `NEXT_PUBLIC_CLERK_SIGN_IN_URL` and `NEXT_PUBLIC_CLERK_SIGN_UP_URL` env vars
- Legacy fallback path

---

## Phase P13 — Cart System

### `lib/cart-store.ts`
- Zustand store with `persist` middleware to `localStorage` key `growrix-cart`
- State shape:
  ```ts
  type CartItem = {
    product_slug: string;
    product_name: string;
    variant_slug?: string;
    tier_name?: string;
    fulfillment_type?: string;
    quantity: number;
    unit_price_cents: number;
  }
  type CartStore = {
    items: CartItem[];
    addItem: (item: CartItem) => void;
    removeItem: (product_slug: string, variant_slug?: string) => void;
    updateQuantity: (product_slug: string, variant_slug: string | undefined, qty: number) => void;
    clearCart: () => void;
    totalCents: () => number;
    itemCount: () => number;
  }
  ```
- `addItem`: if item with same `product_slug + variant_slug` exists, increment quantity
- SSR hydration guard: export `useCartStore` with `skipHydration: true` pattern to avoid mismatch

### `components/shop/CartDrawer.tsx`
- Slide-over panel (right side), `position: fixed`, `z-index` above header
- Triggered by cart icon in header (`open` state in `Header.tsx` via `useState`)
- Sections: header ("Cart · {count} items"), item list, subtotal row, "Proceed to Checkout" CTA (`LinkButton` href="/checkout?cart=1"), "Continue Shopping" close button
- Item row: product name, tier, qty stepper (−/+), unit price, remove button
- Empty state: "Your cart is empty" + "Browse products" link
- Accessible: focus trap when open, `Escape` closes, `role="dialog"`, `aria-modal`

### Cart icon in Header
- Insert between `DesktopHeaderNav` and `PublicAuthControls` in `Header.tsx`
- `ShoppingBagIcon` (already imported) with absolute-positioned badge
- Badge: `itemCount > 0` → show count, hide at 0
- Click → `setCartOpen(true)` (new state in `Header.tsx`)
- Mobile: same in `HeaderMobileNav.tsx` or bottom nav

### "Add to Cart" on product detail
- Add below existing "Buy Now" CTA in `app/shop/[slug]/page.tsx`
- Pass `product_slug`, `product_name`, selected variant info, price
- Button label: "Add to Cart" — secondary style (`variant="outline"`)
- On click: `addItem(...)` from cart store, show toast or open cart drawer

### Checkout multi-item adaptation
- `CheckoutExperience.tsx`: on mount, read `useCartStore` items
- If `items.length > 0` AND `?cart=1` param: render cart item list in order summary
- Submit: send `items[]` array to `POST /api/v1/orders`
- If `items.length === 0` AND product slug in URL params: fall back to existing single-product path
- After successful order: call `clearCart()`

---

## Phase P15 — Checkout Redesign + Upsell

### `components/checkout/PaymentMethodSelector.tsx`
- Radio group with 5 options:
  1. **Invoice (default)** — "We'll email you a payment invoice with instructions"
  2. **Bank Transfer** — "Pay directly to our bank account"
  3. **Payoneer** — "Pay via Payoneer"
  4. **Western Union / MoneyGram** — "International money transfer"
  5. **Stripe (Coming Soon)** — grayed out, `disabled`, tooltip "Stripe card payments launching soon"
- Renders below order summary, above submit button
- Value passed in form submission as `payment_method` field

### `components/checkout/CheckoutUpsell.tsx`
- Props: `currentProductSlug`, `currentCategory`
- Fetches from `listPublicShopProducts()` — filter same category, exclude current slug, take 2-3
- Render: compact horizontal card list (image thumbnail, name, price, "Add to Cart" button)
- Position: below checkout form, above footer
- Label: "You might also like"
- Server component (use `async` — no client hydration needed for upsell)

### Order confirmation inline message
- In `CheckoutExperience.tsx` success state: add dynamic text based on `payment_method`:
  - Invoice: "Your invoice will arrive by email within a few minutes. Please complete payment using the instructions in the email."
  - Bank: "Bank transfer details are in your invoice email."
  - etc.

### `/success` page upsell
- Fetch 2 products from same category as ordered product
- Render "Customers also bought" section using `ShopProductCatalogCard` (existing)

---

## Phase P18 — Admin Order Management UI

### `app/admin/orders/page.tsx`
- Server component
- Fetch orders via `GET /api/v1/admin/orders` (paginated, filter by status)
- Render `DataTable` (reuse existing admin table pattern if it exists, otherwise build simple `<table>`)
- Columns: Order #, Customer, Total, Payment Status, Fulfillment, Date, Actions (View)
- Filter bar: payment_status, fulfillment_status dropdowns + email search input
- "New order" badge for `payment_status: pending` rows

### `app/admin/orders/[orderId]/page.tsx` + `OrderDetailShell.tsx`
- Server component fetches order detail
- `OrderDetailShell` is client component for action interactions
- Sections:
  1. Order summary (order number, date, customer, items table, total)
  2. Invoice section (invoice number, status, payment method, "Send Invoice" / "Resend" button, "Mark Paid" button)
  3. Fulfillment section (current status dropdown, "Update" button, delivery URLs list, "Add URL" input)
  4. Downloads section (list of download records, asset link status)
  5. Audit log (recent events)
- Action modals: confirmation dialogs for "Mark Paid" and status transitions

### Reuse targets
- Existing admin shell and nav (`app/admin/` layout)
- `requireAdminUser` guard (server-side)
- Existing `Card`, `Button`, `Badge`, `Container` primitives
- Existing `DashboardShell` pattern for layout consistency

---

## Accessibility Requirements
- Cart drawer: focus trap, `role="dialog"`, `aria-labelledby`, `Escape` closes
- Modal auth: Clerk handles internally, verify no focus leak on close
- Payment method selector: keyboard navigable `<fieldset>`/`<legend>` structure
- Admin order table: `<caption>`, sortable columns announce sort state

## Component File Index

| Component | Path | Phase |
|-----------|------|-------|
| `PublicAuthControls.tsx` | `web/src/components/shell/PublicAuthControls.tsx` | P12 |
| `cart-store.ts` | `web/src/lib/cart-store.ts` | P13 |
| `CartDrawer.tsx` | `web/src/components/shop/CartDrawer.tsx` | P13 |
| `PaymentMethodSelector.tsx` | `web/src/components/checkout/PaymentMethodSelector.tsx` | P15 |
| `CheckoutUpsell.tsx` | `web/src/components/checkout/CheckoutUpsell.tsx` | P15 |
| `CheckoutExperience.tsx` (extend) | `web/src/app/checkout/CheckoutExperience.tsx` | P13+P15 |
| `app/admin/orders/page.tsx` | new | P18 |
| `app/admin/orders/[orderId]/page.tsx` | new | P18 |
| `OrderDetailShell.tsx` | `web/src/app/admin/orders/[orderId]/OrderDetailShell.tsx` | P18 |
