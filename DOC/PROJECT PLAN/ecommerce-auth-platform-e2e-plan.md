# E-Commerce + Auth Platform E2E Plan

## 0. Artifact Metadata
- **Canonical artifact path:** `DOC/PROJECT PLAN/ecommerce-auth-platform-e2e-plan.md`
- **Affected downstream role docs:**
  - `DOC/PROJECT PLAN/Frontend/ecommerce-auth-frontend.md`
  - `DOC/PROJECT PLAN/API and Data/ecommerce-auth-api-data.md`
  - `DOC/PROJECT PLAN/Admin Dashboard/ecommerce-auth-admin-dashboard.md`
  - `DOC/PROJECT PLAN/Security/ecommerce-auth-security.md`
- **Planning request source:** Operator session 2026-06-29 — auth modal UX, cart, invoice payment, S3 downloads, admin order UI, launch-readiness audit
- **Planning mode:** Scale (existing codebase extended, not replaced)
- **Status:** Active — not yet executed
- **Last updated:** 2026-06-29

---

## 1. Planning Mode And Objective

**Mode:** Scale-existing hybrid  
**Why this mode:** Frontend routes, checkout flow, order domain, download entitlements, customer dashboard, Clerk auth, Supabase schema, and Resend emails are all substantially built. This plan closes the gaps between current partial state and a production-ready launch without replacing working architecture.

**Scope:**
1. Auth UX — modal-based sign-in/sign-up, dashboard button/icon in header
2. Cart system — multi-item basket before checkout (client-side with server persistence)
3. Supabase activation — deploy schema, wire store reads/writes, link orders to users
4. Checkout redesign — multi-item, upsell/suggested products at checkout
5. Invoice-based payment flow — automated PDF/HTML invoice via Resend, bank/Payoneer/WU/MG/Stripe
6. S3 file storage — upload, signed URL delivery, download enforcement
7. Admin order management UI — order list, status management, invoice send, fulfillment tracking
8. Marketing upsell — related products at checkout, post-purchase upsell on success page
9. Operator notifications — Lark + Resend alerts for new orders and payments

**Execution order (operator-confirmed):** Frontend phases first, then backend phases.

**Explicit non-goals:**
- No cart sync across devices for anonymous users (localStorage only until signed in)
- No Stripe live keys right now (Stripe integration stays in place but disabled)
- No Prisma (JSON store → Supabase direct via service_role, existing pattern)
- No Pusher (real-time not required at this scope)
- No full checkout abandonment recovery (nice-to-have, deferred)
- No multi-currency (USD only, existing constraint)
- No marketplace/vendor split (single-operator shop)

**Compatibility requirements:**
- Must not break existing Clerk auth, `/sign-in`, `/sign-up` standalone pages
- Must not break existing order domain, Stripe webhook handler, or download entitlements
- Must preserve existing Supabase schema (additive only)
- Must preserve existing admin dashboard routes and shell
- Must not require new root-level config changes that affect studio or other sub-apps

---

## 2. Current-State Audit

### Tracker Status (from tasks.md as of 2026-06-29)
- **Done (P11 complete):** Clerk migration, public buyer auth routes, header controls, `clerk-sync`, proxy
- **Partial:** Product-led platform (P9), Supabase live migration (deferred), Stripe live keys, S3, admin order ops, calendar sync
- **Blocked:** Supabase schema deployment (manual operator step — `npm run db:migrate` not yet run against production Supabase)
- **Not started:** Cart system, invoice payment flow, modal auth UX, admin order management UI, S3 integration, checkout upsell

### Existing Codebase Inventory — Reuse Map

| Surface | Path | Reuse Decision |
|---------|------|---------------|
| Auth modal trigger | `PublicAuthControls.tsx` | Extend — switch mode to `modal`, add Dashboard link |
| `/sign-in`, `/sign-up` pages | `app/sign-in/`, `app/sign-up/` | Keep as fallback, no changes needed |
| Header shell | `Header.tsx`, `HeaderMobileNav.tsx` | Extend — add signed-in dashboard shortcut |
| Checkout page | `app/checkout/` + `CheckoutExperience.tsx` | Refactor — adapt for multi-item cart payload |
| Order domain | `server/domain/orders.ts` | Extend — add `user_id` attachment, invoice dispatch, cart multi-item support |
| Order APIs | `api/v1/orders/route.ts`, `[orderId]/` | Extend — cart payload, invoice trigger, payment method field |
| Commerce emails | `server/domain/commerce-emails.ts` | Extend — add invoice email template with payment instructions |
| Customer dashboard | `app/dashboard/**` | Extend — add cart state, invoice view, download progress |
| Admin dashboard | `app/admin/**` | Extend — add order management, invoice send, fulfillment UI |
| Supabase schema | `supabase/schema.sql` | Additive only — add `invoices`, `cart_sessions`, `payment_methods` tables |
| Store | `server/data/store.ts` | Reuse — already dual-mode; activate Supabase path after migration |
| Downloads domain | `server/domain/downloads.ts` | Extend — wire to S3 signed URL generation |
| Lark notifications | `server/domain/notifications.ts` | Extend — add order and payment event types |
| Sanity catalog | `server/sanity/catalog.ts` | Reuse — no changes; catalog remains Sanity-sourced |

### Reuse-First Delta Map

**Reuse without changes:**
- Existing Clerk provider, proxy, guards, sync webhook
- Existing Sanity product catalog, CMS schema, revalidation
- Existing Resend client, purchase confirmation email skeleton
- Existing order state machine (payment + fulfillment transitions)
- Existing customer dashboard shell (`DashboardShell`, nav items)
- Existing admin shell, auth guards

**Extend carefully:**
- `PublicAuthControls.tsx` — modal mode + dashboard link (small change, test Clerk SSR behavior)
- `CheckoutExperience.tsx` — adapt form for multi-item cart (preserve single-product fallback)
- `orders.ts` — add `user_id` from Clerk session, add `invoice_id` reference, accept cart items array
- `commerce-emails.ts` — add invoice HTML template (preserve existing templates)
- `downloads.ts` — swap `asset_path` stub for real S3 presigned URL generation

**Net-new additions required:**
- Cart store module (`lib/cart-store.ts` — Zustand, persisted to localStorage + Supabase for signed-in users)
- Cart drawer UI component (`components/shop/CartDrawer.tsx`)
- Cart icon in header with badge count
- Invoice domain (`server/domain/invoices.ts`) — create, send, mark paid
- Invoice schema additions to `supabase/schema.sql`
- Payment method selector at checkout (`components/checkout/PaymentMethodSelector.tsx`)
- S3 client module (`server/storage/s3.ts`) — upload, presigned URL
- Upsell panel at checkout (`components/checkout/CheckoutUpsell.tsx`)
- Post-purchase upsell on `/success` page
- Admin order management pages (`app/admin/orders/`, `app/admin/orders/[orderId]/`)

**Items rejected to avoid architecture drift:**
- No separate cart service/API (localStorage + optional Supabase row, not a cart microservice)
- No Prisma (existing JSON↔Supabase dual-store already works)
- No new auth provider (Clerk is canonical)
- No new CMS (Sanity is canonical for product content)
- No multi-step checkout wizard (single page with collapsible sections)

---

## 3. Platform Decision Matrix

| Capability | Current State | Decision | Required Now / Later / Excluded | Notes |
|---|---|---|---|---|
| Next.js 16 App Router | Active, production | Reuse | Required now | All new routes follow existing patterns |
| React 19 | Active | Reuse | Required now | — |
| TypeScript | Active | Reuse | Required now | — |
| Sanity CMS | Active — products, blog, portfolio | Reuse | Required now | No new document types needed for this scope |
| Supabase | Schema written, migration pending | Activate | Required now (blocker) | Must run `npm run db:migrate` before backend phases |
| PostgreSQL | Via Supabase | Activate with Supabase | Required now | Additive schema only |
| Prisma | Not installed | Excluded | Excluded | Existing direct Supabase client pattern is sufficient |
| Lark | Wired, some events active | Extend | Required now | Add order-placed, payment-confirmed event types |
| Resend | Active — confirmation + download emails | Extend | Required now | Add invoice email template |
| Pusher | Not installed | Excluded | Deferred — not in scope | Real-time not needed at this scale |
| S3 (AWS) | Not configured | Add | Required now (downloads) | `@aws-sdk/client-s3` + `@aws-sdk/s3-request-presigner` |
| Stripe | Wired, no live keys | Keep placeholder | Deferred (no keys) | Webhook handler preserved, checkout URL stub in place |
| Payoneer | Not integrated | Plan payment method | Required now (manual flow) | No SDK — operator manually confirms; system records payment method type |
| Bank / WU / MG | Not integrated | Plan payment method | Required now (manual flow) | Same as Payoneer — invoice email includes payment details per method |

---

## 4. CMS And Content Operations Plan

### Scope impact on CMS
This plan does **not** change the Sanity CMS structure. Products, variants, pricing, and media remain Sanity-managed. The only CMS-adjacent change is that checkout/cart reads product data from the existing `catalog.ts` (Sanity + static fallback) — no Sanity schema edits needed.

### What stays in Sanity
- Product catalog, variants, FAQs, related products/services
- Blog, services, portfolio, case studies
- All content editorial workflows

### What moves to Supabase (transactional)
- Orders, order items, invoices, cart sessions, downloads, licenses, users
- Payment method records (on orders/invoices)
- Admin-managed delivery URLs, fulfillment notes

### Editorial/operator workflow unchanged
- Products managed in Sanity Studio
- Pricing changes pushed through Sanity → revalidation webhook
- No operator-facing content in the new payment/cart scope

---

## 5. Data, Database, And Storage Plan

### Source of truth per domain
| Domain | Source of Truth |
|--------|----------------|
| Products, pricing, variants | Sanity CMS (with static fallback seed) |
| Orders, order items | Supabase `orders` + `order_items` (after migration) |
| Invoices | Supabase `invoices` (new table) |
| Cart sessions (anonymous) | localStorage client-side only |
| Cart sessions (signed-in) | Supabase `cart_sessions` (new table) |
| Downloads, licenses | Supabase `downloads` + `licenses` |
| Users (identity) | Clerk (canonical identity) |
| Users (mirror, roles) | Supabase `users` (mirror via clerk-sync webhook) |
| Files / digital assets | AWS S3 (new) |
| Notifications log | Supabase via existing `notifications` table |

### Supabase schema additions (additive only)

```sql
-- invoices table
create table if not exists public.invoices (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  invoice_number text not null unique,
  customer_email text not null,
  customer_name text not null,
  payment_method text not null check (payment_method in ('stripe','payoneer','bank_transfer','western_union','moneygram','other')),
  payment_instructions jsonb not null default '{}'::jsonb,
  status text not null default 'sent' check (status in ('draft','sent','paid','cancelled','overdue')),
  amount_cents integer not null default 0,
  currency text not null default 'USD',
  due_date timestamptz,
  paid_at timestamptz,
  sent_at timestamptz,
  notes text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);
create index if not exists invoices_order_idx on public.invoices (order_id);
create index if not exists invoices_customer_email_idx on public.invoices (customer_email);
create index if not exists invoices_status_idx on public.invoices (status);

-- cart_sessions table (server-side persistence for signed-in users)
create table if not exists public.cart_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid,
  clerk_user_id text,
  session_token text not null unique,
  items jsonb not null default '[]'::jsonb,
  expires_at timestamptz not null default timezone('utc', now()) + interval '7 days',
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);
create index if not exists cart_sessions_clerk_user_idx on public.cart_sessions (clerk_user_id);
```

### Supabase deployment status
**Status: PENDING** — `web/supabase/schema.sql` exists and is correct. The migration runner `npm run db:migrate` exists but has NOT been run against the production Supabase instance. This must be done before ANY backend phase begins. The new `invoices` and `cart_sessions` tables must be appended to `web/supabase/schema.sql` before running the migration.

### Prisma decision
**Excluded.** The existing `server/data/store.ts` dual-mode pattern (Supabase service_role client + JSON file fallback) works well and is already in production. Adding Prisma would require a migration layer, ORM dependency, and type-generation step that adds complexity without meaningful benefit at this scale.

### S3 storage plan
- **Provider:** AWS S3 (operator has account or creates one)
- **Bucket:** `growrix-agency-assets` (private, no public ACL)
- **Structure:** `digital-assets/{product_slug}/{variant_slug}/{filename}` (operator uploads)
- **Access:** Signed URLs only — generated server-side, time-limited (1 hour), download-count enforced
- **Required env vars:** `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_REGION`, `AWS_S3_BUCKET`
- **NPM packages:** `@aws-sdk/client-s3`, `@aws-sdk/s3-request-presigner`
- **Upload workflow:** Operator uploads files via Admin panel file manager (or direct S3 console initially)
- **Fallback:** When S3 unconfigured, `downloads.ts` returns `null` for signed URLs (graceful degradation, customer sees "contact us" message)

### Row-level security
All new tables follow the existing RLS pattern:
- `anon` and `authenticated` roles: blocked (deny-all policy)
- `service_role`: full access (Next.js server only)
- Customer reads happen via authenticated API handlers that enforce ownership

### Data migration / backfill
- After Supabase migration runs, existing JSON-file orders/users are NOT automatically migrated
- Any historical data in `.data/agency-db.json` can be manually imported if needed
- Going forward all new data writes to Supabase

---

## 6. Integration Plan

| Integration | Purpose | Trigger Points | Owner Surface | Fallback / Failure Mode | Notes |
|---|---|---|---|---|---|
| Clerk | Identity, auth, session | Sign-in, sign-up, user sync webhook | `proxy.ts`, `clerk-sync.ts` | Legacy JWT when keys absent | Active, no changes |
| Supabase | Transactional DB | All order/invoice/download writes | `server/data/store.ts` | JSON file fallback | Must deploy schema first |
| Sanity | Product catalog | Shop listing, product detail, checkout | `server/sanity/catalog.ts` | Static seed fallback | Active, no changes |
| Resend | Transactional email | Order confirmation, invoice, download-ready | `server/domain/commerce-emails.ts` | Silent no-op with audit log | Active; extend with invoice template |
| S3 (AWS) | Digital asset storage | Download signed URL generation, admin upload | `server/storage/s3.ts` (new) | Null URL + contact-us fallback | New integration |
| Lark | Operator notifications | New order placed, invoice paid, fulfillment action | `server/domain/notifications.ts` | Silent no-op with audit log | Active; extend with new event types |
| Stripe | Payment processing | Checkout URL (disabled without keys) | `server/domain/orders.ts` | Fallback to invoice flow | Keep wired, deferred activation |
| Payoneer | Payment method | Invoice payment method selection | No SDK; operator manual confirmation | — | Record `payment_method: 'payoneer'` on invoice; instructions in email |
| Bank transfer | Payment method | Invoice payment method selection | No SDK; operator manual confirmation | — | Bank account details in invoice email |
| Western Union / MoneyGram | Payment method | Invoice payment method selection | No SDK; operator manual confirmation | — | Transfer instructions in invoice email |

---

## 7. Global Site Invariants
- Footer copyright string: `© {year} Growrix OS. All rights reserved. Built & Maintained by Growrix OS.` — link "Growrix OS" to `https://www.growrixos.com`
- All cart and checkout UI must reuse existing `Button`, `Card`, `Container`, `Section`, `Badge` primitives
- Cart state must degrade gracefully when JavaScript fails (no cart = single-product checkout still works)
- All new admin routes must be behind existing `requireAdminUser` guard
- All new customer routes must be behind existing `auth.protect()` Clerk guard
- No new design system tokens or component libraries — extend existing CSS custom properties only
- Checkout page remains at `/checkout` — no route change
- `NEXT_PUBLIC_` env vars must never contain secrets

---

## 8. E2E Phase Plan

### Phase P12 — Auth UX: Modal + Header Dashboard Controls
**Execution order:** Frontend first

**Inputs:**
- Active Clerk keys in `web/.env.local` ✓
- `PublicAuthControls.tsx` current implementation
- `Header.tsx`, `HeaderMobileNav.tsx`

**Deliverables:**
- `PublicAuthControls.tsx`: switch `SignInButton`/`SignUpButton` to `mode="modal"` for desktop/mobile
- `PublicAuthControls.tsx`: add `SignedIn` branch — Desktop: `UserButton` + "Dashboard" text link; Mobile: `UserButton` + dashboard icon link
- Keep standalone `/sign-in`, `/sign-up` pages as Clerk fallback (no changes)
- `NEXT_PUBLIC_CLERK_SIGN_IN_URL` and `NEXT_PUBLIC_CLERK_SIGN_UP_URL` remain set (Clerk still uses them for edge-case redirects)

**Reuse targets:** Existing `PublicAuthControls.tsx`, `Button`, `LinkButton` primitives, `UserButton` from `@clerk/nextjs`

**Entry criteria:** Clerk keys active ✓

**Exit criteria:**
- Clicking "Sign in" / "Sign up" in header opens modal overlay (no full page navigation)
- After sign-in: desktop shows `UserButton` + "Dashboard" link; mobile shows `UserButton` + dashboard icon
- `/sign-in` and `/sign-up` URLs still work as direct nav
- No regression on existing Clerk test routes

**Risks:** Clerk modal mode has known quirks with `forceRedirectUrl` — test redirect to `/dashboard` after sign-up

---

### Phase P13 — Cart System (Frontend)
**Execution order:** Frontend

**Inputs:**
- Existing shop listing and product detail pages
- Existing `CheckoutExperience.tsx`
- Confirmed: multi-item cart required for launch

**Deliverables:**
- `lib/cart-store.ts` — Zustand store with `persist` middleware (localStorage). State: `items: CartItem[]`, `addItem`, `removeItem`, `updateQuantity`, `clearCart`, `totalCents`, `itemCount`
- `CartItem` type: `{ product_slug, product_name, variant_slug?, tier_name?, fulfillment_type?, quantity, unit_price_cents }`
- `components/shop/CartDrawer.tsx` — slide-over drawer with item list, quantity controls, subtotal, "Proceed to Checkout" CTA, "Continue Shopping" close
- Cart icon in header (desktop + mobile) with badge showing item count — renders in `Header.tsx` alongside `PublicAuthControls`
- "Add to Cart" button on product detail page (alongside existing "Buy Now" which goes direct to checkout)
- Checkout page (`CheckoutExperience.tsx`) — accept cart items from cart store OR single product from URL params (preserve existing single-product flow as fallback)
- `POST /api/v1/orders` — extend to accept `items[]` array (multi-item cart payload) alongside existing single `product_slug` (backwards compatible)

**Reuse targets:** Existing `Card`, `Button`, `Badge` primitives, existing product detail page, existing checkout page

**Entry criteria:** Phase P12 complete (header controls stable)

**Exit criteria:**
- User can add multiple products to cart from listing and detail pages
- Cart drawer opens from header icon, shows items + total
- Proceeding to checkout creates a multi-item order
- Single-product "Buy Now" flow still works unchanged
- Cart persists on page refresh (localStorage)
- Cart clears after successful order submission

**Risks:** Zustand `persist` + Next.js SSR hydration mismatch — use `useEffect` + `hasMounted` guard for cart badge count

---

### Phase P14 — Supabase Activation (Backend — Operator Pre-Condition)
**Execution order:** Backend — must happen before P15/P16/P17

**This is an operator manual step, not a code change.**

**Deliverables:**
1. Append `invoices` + `cart_sessions` tables to `web/supabase/schema.sql`
2. Operator runs: `npm run db:migrate` from `web/` directory (requires `SUPABASE_DB_URL` env var)
3. Verify tables exist: `app_state`, `products`, `product_variants`, `orders`, `order_items`, `downloads`, `licenses`, `invoices`, `cart_sessions`, `users` (from clerk-sync)
4. Wire `user_id` attachment in `createOrder()` — read Clerk user ID from session headers, look up Supabase user mirror, attach to order record

**Entry criteria:**
- `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` in `.env.local` ✓
- `SUPABASE_DB_URL` must be added to `.env.local` (Postgres direct connection URL from Supabase dashboard → Settings → Database)

**Exit criteria:**
- `npm run db:migrate` exits 0
- `store.ts` reads from Supabase (not JSON fallback) in production
- New orders created with `user_id` populated when signed-in user checks out
- Existing JSON fallback still works in CI/test (no `SUPABASE_DB_URL` needed in CI)

**Risks:** Supabase DB URL is a direct Postgres connection — do not commit to `.env.local` if there's a git exposure risk; add to `.gitignore` already (it is)

---

### Phase P15 — Checkout Redesign + Upsell (Frontend)
**Execution order:** Frontend (after P13 cart is built)

**Deliverables:**
- Checkout page redesign: multi-item order summary (from cart store), single-item fallback (from URL params), subtotal/tax/total breakdown
- `components/checkout/PaymentMethodSelector.tsx` — radio group: Stripe (shown but disabled/coming-soon), Payoneer, Bank Transfer, Western Union/MoneyGram, "Request Invoice" (default). Records selected method in checkout form state.
- `components/checkout/CheckoutUpsell.tsx` — "You may also like" — 2-3 related products from catalog based on current cart category. Uses existing `listPublicShopProducts()`. Shown below order summary.
- Post-checkout `/success` page: add "Customers also bought" section (2 products, same category filter)
- `getCheckoutHref()` utility updated to handle cart-based checkout (pass `?cart=1` to signal multi-item mode)
- Order confirmation step: show selected payment method and next-steps instructions inline (before invoice email arrives)

**Entry criteria:** P13 complete (cart store built), P14 not required (checkout frontend can be built without Supabase active)

**Exit criteria:**
- Cart items show correctly in checkout summary
- Payment method selector renders, records selection
- Upsell panel shows 2-3 relevant products
- Success page shows confirmation + upsell
- Single-product direct checkout still works

---

### Phase P16 — Invoice Payment Flow (Backend)
**Execution order:** Backend (requires P14 Supabase active)

**Deliverables:**

**Schema addition** (already included in P14 SQL above): `invoices` table

**`server/domain/invoices.ts`** — new domain module:
- `createInvoice(orderId, paymentMethod, paymentInstructions)` — creates invoice record, sets due_date (+14 days default)
- `sendInvoiceEmail(invoiceId)` — triggers Resend with HTML invoice template + payment instructions
- `markInvoicePaid(invoiceId, notes)` — updates invoice + parent order payment_status to `succeeded`, triggers `markOrderPaid` flow (existing)
- `getInvoiceByOrder(orderId)` — for admin/customer views

**Invoice email template** (`commerce-emails.ts` extension):
- Professional HTML email layout: company logo, order table (items, quantities, prices), total, due date
- Payment instructions section rendered per method:
  - **Bank Transfer:** Account name, account number, routing/SWIFT, reference: `{order_number}`
  - **Payoneer:** Payoneer email address, reference: `{order_number}`
  - **Western Union / MoneyGram:** Operator name, country, reference: `{order_number}`
  - **Stripe:** Link to Stripe payment page (when keys are live)
- Footer: contact email, support link
- "Print / Save as PDF" button (opens print dialog — browser PDF without server-side PDF generation)

**Payment method details stored in `invoices.payment_instructions` JSONB** (operator configures via `web/data/payment-methods.json` or env vars — see security plan)

**API extensions:**
- `POST /api/v1/orders` — after order created, if `payment_method` is not `stripe`, auto-create invoice and send email
- `POST /api/v1/admin/orders/[orderId]/invoice/send` — resend invoice email
- `PATCH /api/v1/admin/orders/[orderId]/invoice/paid` — mark invoice paid (triggers order fulfillment flow)

**Entry criteria:** P14 complete (Supabase active), Resend API key active ✓

**Exit criteria:**
- Customer submits checkout → order created → invoice created → invoice email delivered within 30s
- Invoice email includes correct payment instructions for selected method
- Admin can resend invoice and mark paid
- Marking paid triggers existing `markOrderPaid` (Lark + download-ready email chain)

**Deferred (out of scope for this plan):**
- Server-side PDF generation (browser print-to-PDF is sufficient for now)
- Automated payment reminders / overdue logic

---

### Phase P17 — S3 File Storage + Download Activation (Backend)
**Execution order:** Backend (after P14 and P16)

**Deliverables:**

**`server/storage/s3.ts`** — new storage module:
- `getS3Client()` — returns `S3Client` from `@aws-sdk/client-s3` (null when env vars absent)
- `isS3Configured()` — checks `AWS_S3_BUCKET` + credentials
- `generatePresignedDownloadUrl(assetPath, expiresInSeconds)` — returns `GetObjectCommand` presigned URL
- `generatePresignedUploadUrl(assetPath, contentType)` — for admin file upload

**`server/domain/downloads.ts` extension:**
- Replace `asset_path` stub with real presigned URL call when S3 configured
- Fallback: return null URL with message "Your download will be delivered manually. We'll email you the link."

**Admin file manager** (`app/admin/files/`):
- Upload page: file picker → `PUT /api/v1/admin/files/upload` → S3 presigned upload URL
- File list: existing `downloads` records with `asset_path`
- Link asset to order/download record: `PATCH /api/v1/admin/downloads/[downloadId]/asset`

**New env vars:**
```
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_REGION=ap-southeast-1
AWS_S3_BUCKET=growrix-agency-assets
```

**Entry criteria:** P14 complete, operator has AWS S3 bucket created

**Exit criteria:**
- Admin can upload a file to S3 via admin panel
- Customer with a paid order can download file via signed URL (expires 1 hour, max-download enforced)
- Without S3 configured, downloads gracefully show fallback message
- No public S3 URLs exist — all access via signed URLs

---

### Phase P18 — Admin Order Management UI (Frontend + Backend)
**Execution order:** Frontend (UI) then Backend (API endpoints that don't exist yet)

**Deliverables:**

**Frontend (new pages under `app/admin/`):**
- `app/admin/orders/page.tsx` — Order list: table with order_number, customer, status, total, date, payment method, fulfillment status. Filter by status. Search by email/order number.
- `app/admin/orders/[orderId]/page.tsx` — Order detail: full order info, items, invoice status, actions
  - Action: "Mark Payment Received" → calls PATCH invoice/paid
  - Action: "Send/Resend Invoice" → calls POST invoice/send
  - Action: "Update Fulfillment Status" → calls PATCH order fulfillment
  - Action: "Add Delivery URL" → input field → calls PATCH with delivery_url
  - Action: "Upload Asset" → link to file manager for this order
- `app/admin/orders/[orderId]/OrderDetailShell.tsx` — client component with action modals

**Backend (new API routes):**
- `GET /api/v1/admin/orders` — list with pagination, filter params
- `GET /api/v1/admin/orders/[orderId]` — order detail + invoice + items + downloads
- `PATCH /api/v1/admin/orders/[orderId]/fulfillment` — update fulfillment status
- `POST /api/v1/admin/orders/[orderId]/delivery-url` — add delivery URL
- `POST /api/v1/admin/orders/[orderId]/invoice/send` — send/resend invoice
- `PATCH /api/v1/admin/orders/[orderId]/invoice/paid` — mark invoice paid

**Entry criteria:** P14 active (Supabase has orders), P16 invoice domain exists

**Exit criteria:**
- Admin can see all orders, filter by status
- Admin can view order detail, send invoice, mark paid, update fulfillment
- Marking paid triggers customer download-ready email chain
- All actions are audited via existing `recordAuditLog`

---

### Phase P19 — Lark + Admin Notifications (Backend)
**Execution order:** Backend (extend existing, minimal work)

**Deliverables:**
- Add to `server/domain/notifications.ts`:
  - `order_placed` event — fires when `createOrder()` completes
  - `invoice_sent` event — fires when invoice email sent
  - `invoice_paid` event — fires when invoice marked paid
  - `download_issued` event — already wired, verify active
- Add admin email notification via Resend: new order placed → email to `CONTACT_TO_EMAIL`
- Ensure existing Lark webhook URL fires for new event types

**Entry criteria:** P16 invoice domain complete

**Exit criteria:**
- Lark message received when new order is placed
- Operator email received when new order is placed
- Lark message received when invoice is marked paid

---

### DevOps / Environment
- Add to `web/.env.local` and Vercel env vars: `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_REGION`, `AWS_S3_BUCKET`, `SUPABASE_DB_URL`
- Add to Vercel: `CLERK_WEBHOOK_SIGNING_SECRET` (production Clerk webhook, post-deploy)
- CSP update in `next.config.ts`: add `*.payoneer.com` if Payoneer embeds iframes (likely not needed for manual flow)
- Add `PAYMENT_METHODS_CONFIG` to env or `web/data/payment-methods.json` (bank account details, Payoneer email) — never commit actual account details to git

### QA / Validation Gates
| Gate | Scope | Blocking | Evidence |
|------|-------|----------|----------|
| `npm run lint` | All touched files | Yes | 0 errors |
| `npm run typecheck` | All touched files | Yes | 0 errors |
| Unit tests | Cart store, invoice domain, S3 client, order multi-item | Yes | All pass |
| Integration tests | Checkout flow, invoice email, admin order actions | Yes | All pass |
| E2E (Playwright) | Sign-in modal, add to cart, checkout, invoice email received | Yes | All pass |
| WCAG AA | Cart drawer, modal, checkout, admin order pages | Yes | Axe audit clean |
| Build | `npm run build` from `web/` | Yes | 0 errors, 0 new warnings |
| Supabase migration | `npm run db:migrate` | Yes (pre-backend) | Exits 0, all tables verified |
| Smoke: sign-up → cart → checkout → invoice | Full flow in dev | Yes | Manual confirmation |

---

## 9. Execution Backlog — Numbered Tasks (Frontend First)

### P12 — Auth UX Modal + Header Dashboard
- **T074** — Switch `SignInButton`/`SignUpButton` in `PublicAuthControls.tsx` to `mode="modal"`. Test redirect to `/dashboard` after sign-up. `web/src/components/shell/PublicAuthControls.tsx`
- **T075** — Add signed-in desktop state to `PublicAuthControls.tsx`: `UserButton` + "Dashboard" `LinkButton`. Add mobile signed-in state: `UserButton` + dashboard icon link. `web/src/components/shell/PublicAuthControls.tsx`
- **T076** — Smoke test modal on dev server; confirm `/sign-in` standalone still works as fallback

### P13 — Cart System
- **T077** — Create `web/src/lib/cart-store.ts` — Zustand + `persist` middleware. Types: `CartItem`, `CartStore`.
- **T078** — Create `web/src/components/shop/CartDrawer.tsx` — slide-over with item list, qty controls, subtotal, checkout CTA.
- **T079** — Add cart icon + badge to `Header.tsx` (desktop) and `HeaderMobileNav.tsx` (mobile). Use `ShoppingBagIcon` (already imported in header).
- **T080** — Add "Add to Cart" button to product detail page (`app/shop/[slug]/page.tsx`). Preserve existing "Buy Now" CTA.
- **T081** — Extend `CheckoutExperience.tsx` to read cart items from store. Accept multi-item cart payload. Preserve single-product URL-param fallback.
- **T082** — Extend `POST /api/v1/orders/route.ts` to accept `items[]` array (multi-item). Backwards compatible with single `product_slug`.
- **T083** — Extend `createOrder()` in `orders.ts` to handle multi-item `items[]` input.
- **T084** — Add cart unit tests (`lib/cart-store.test.ts`). Add multi-item order creation test.

### P15 — Checkout Redesign + Upsell
- **T085** — Create `web/src/components/checkout/PaymentMethodSelector.tsx`. Radio group: Stripe (disabled), Payoneer, Bank Transfer, WU/MG, Invoice (default).
- **T086** — Create `web/src/components/checkout/CheckoutUpsell.tsx`. Fetch 2-3 products from same category. Render as compact product cards with "Add to Cart" action.
- **T087** — Integrate `PaymentMethodSelector` and `CheckoutUpsell` into `CheckoutExperience.tsx`.
- **T088** — Update `/success` page with "Customers also bought" upsell section (2 products, same category).
- **T089** — Update order summary in checkout to show multi-item breakdown, subtotal, and next-steps text based on selected payment method.

### P14 — Supabase Activation (Operator + Code)
- **T090** — Append `invoices` and `cart_sessions` SQL to `web/supabase/schema.sql`.
- **T091** — OPERATOR: Add `SUPABASE_DB_URL` to `web/.env.local` (from Supabase dashboard → Settings → Database → Connection string → URI).
- **T092** — OPERATOR: Run `npm run db:migrate` from `web/`. Verify all tables exist.
- **T093** — Wire `user_id` attachment in `createOrder()`: read Clerk user from request session, look up `users` mirror table, attach `user_id` to order record.
- **T094** — Verify store reads from Supabase in dev (add health endpoint check or log).

### P16 — Invoice Payment Flow
- **T095** — Add `InvoiceRecord`, `InvoiceStatus`, `PaymentMethodType` to `web/src/server/data/schema.ts`.
- **T096** — Create `web/src/server/domain/invoices.ts` — `createInvoice`, `sendInvoiceEmail`, `markInvoicePaid`, `getInvoiceByOrder`.
- **T097** — Add invoice HTML email template to `commerce-emails.ts`. Include per-method payment instructions section.
- **T098** — Create `web/data/payment-methods.json` (gitignored) — bank details, Payoneer email, WU/MG instructions. Load via runtime config or `fs.readFileSync` server-only.
- **T099** — Extend `POST /api/v1/orders/route.ts`: after order created + payment_method ≠ stripe, auto-create invoice, send email.
- **T100** — Add `POST /api/v1/admin/orders/[orderId]/invoice/send` and `PATCH /api/v1/admin/orders/[orderId]/invoice/paid`.
- **T101** — Invoice domain unit tests.

### P17 — S3 Storage
- **T102** — Install `@aws-sdk/client-s3` and `@aws-sdk/s3-request-presigner` in `web/`.
- **T103** — Create `web/src/server/storage/s3.ts` — `isS3Configured`, `getS3Client`, `generatePresignedDownloadUrl`, `generatePresignedUploadUrl`.
- **T104** — Extend `downloads.ts` — replace stub with real presigned URL call; graceful fallback when S3 absent.
- **T105** — Create `app/admin/files/` — upload page + presigned upload URL API.
- **T106** — Create `PATCH /api/v1/admin/downloads/[downloadId]/asset` — link asset_path to download record.
- **T107** — S3 module unit tests (mock S3 client).

### P18 — Admin Order Management UI
- **T108** — Create `app/admin/orders/page.tsx` — order list table with filter/search.
- **T109** — Create `app/admin/orders/[orderId]/page.tsx` + `OrderDetailShell.tsx` — order detail with all action buttons.
- **T110** — Create `GET /api/v1/admin/orders` — paginated list with filter params.
- **T111** — Create `GET /api/v1/admin/orders/[orderId]` — full detail with invoice + items + downloads.
- **T112** — Create `PATCH /api/v1/admin/orders/[orderId]/fulfillment` and `POST /api/v1/admin/orders/[orderId]/delivery-url`.
- **T113** — Admin order management integration tests.

### P19 — Notifications
- **T114** — Extend `notifications.ts` — `order_placed`, `invoice_sent`, `invoice_paid` event types.
- **T115** — Wire `order_placed` into `createOrder()`. Wire `invoice_sent` into `sendInvoiceEmail()`. Wire `invoice_paid` into `markInvoicePaid()`.
- **T116** — Add admin new-order notification email (Resend to `CONTACT_TO_EMAIL`).

---

## 10. Release-Gate And Validation Matrix

| Gate | Scope | Blocking? | Owner | Evidence Required |
|---|---|---|---|---|
| `npm run lint` | All phases | Yes | Dev | 0 errors |
| `npm run typecheck` | All phases | Yes | Dev | 0 errors |
| Unit tests | Cart, invoices, S3, orders | Yes | Dev | All pass |
| Integration tests | Checkout, invoice, admin APIs | Yes | Dev | All pass |
| E2E Playwright | Modal auth, cart, checkout, invoice email | Yes | Dev | release-gates.spec passing |
| Supabase migration | P14 | Yes (backend blocker) | Operator | `npm run db:migrate` exits 0 |
| WCAG AA | Cart, modal, checkout, admin order | Yes | Dev | Axe clean |
| `npm run build` | All phases | Yes | Dev | 0 errors |
| Dev smoke: full cart→invoice flow | P16 | Yes | Operator | Manual walkthrough |
| Lark notification | P19 | Yes | Operator | Message received in Lark channel |
| S3 upload + download | P17 | Yes | Operator | Signed URL works, file downloads |
| Admin: mark paid → customer email | P18 | Yes | Operator | Customer receives download-ready email |
