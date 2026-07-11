# API and Data Role Plan — E-Commerce + Auth Platform

**Canonical root plan:** `DOC/PROJECT PLAN/ecommerce-auth-platform-e2e-plan.md`
**Last updated:** 2026-06-29

---

## Scope

Backend domain modules, API route extensions, Supabase schema additions, S3 integration, and data contracts for phases P13 (cart/order multi-item), P14 (Supabase activation), P16 (invoices), P17 (S3), P18 (admin order APIs), P19 (notifications).

---

## Schema Additions (`web/supabase/schema.sql`)

Append to existing schema — fully additive, no breaking changes.

### `invoices` table
- Primary key: `uuid`
- FK: `order_id → orders.id` (cascade delete)
- `payment_method`: enum check — `stripe | payoneer | bank_transfer | western_union | moneygram | other`
- `payment_instructions`: JSONB — stores per-method operator details (account number, email, etc.)
- `status`: enum — `draft | sent | paid | cancelled | overdue`
- Indexes: `order_id`, `customer_email`, `status`
- RLS: deny anon/authenticated, grant service_role

### `cart_sessions` table
- Primary key: `uuid`
- `clerk_user_id text` — links to Clerk user (not FK, Clerk is external)
- `session_token text unique` — random UUID for anonymous session cookie
- `items jsonb` — array of `CartItem` objects
- `expires_at`: 7-day TTL
- Indexes: `clerk_user_id`
- RLS: deny all client roles, service_role only

---

## Data Schema Updates (`web/src/server/data/schema.ts`)

### New types
```ts
export type PaymentMethodType = 'stripe' | 'payoneer' | 'bank_transfer' | 'western_union' | 'moneygram' | 'other';
export type InvoiceStatus = 'draft' | 'sent' | 'paid' | 'cancelled' | 'overdue';

export type InvoiceRecord = {
  id: string;
  order_id: string;
  invoice_number: string;
  customer_email: string;
  customer_name: string;
  payment_method: PaymentMethodType;
  payment_instructions: Record<string, string>;
  status: InvoiceStatus;
  amount_cents: number;
  currency: 'USD';
  due_date?: string;
  paid_at?: string;
  sent_at?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
};

export type CartItemRecord = {
  product_slug: string;
  product_name: string;
  variant_slug?: string;
  tier_name?: string;
  fulfillment_type?: string;
  quantity: number;
  unit_price_cents: number;
};

export type CartSessionRecord = {
  id: string;
  clerk_user_id?: string;
  session_token: string;
  items: CartItemRecord[];
  expires_at: string;
  created_at: string;
  updated_at: string;
};
```

### `OrderRecord` extension
Add `invoice_id?: string` and `payment_method?: PaymentMethodType` fields to existing `OrderRecord`.

### `DatabaseSchema` extension
Add `invoices: InvoiceRecord[]` and `cart_sessions: CartSessionRecord[]` to `DatabaseSchema` and `DEFAULT_DATABASE`.

---

## New Domain Modules

### `server/domain/invoices.ts`

```ts
// Key function signatures

export async function createInvoice(input: {
  orderId: string;
  customerEmail: string;
  customerName: string;
  amountCents: number;
  paymentMethod: PaymentMethodType;
  notes?: string;
}): Promise<InvoiceRecord>

export async function sendInvoiceEmail(invoiceId: string): Promise<{ delivered: boolean }>

export async function markInvoicePaid(invoiceId: string, notes?: string): Promise<void>
// Calls markOrderPaid() on parent order → triggers existing download + Lark chain

export async function getInvoiceByOrder(orderId: string): Promise<InvoiceRecord | null>

export function buildInvoiceNumber(): string  // INV-YYYYMMDD-XXXXXX
```

**Payment instructions:** loaded from `web/data/payment-methods.json` (gitignored). Structure:
```json
{
  "bank_transfer": {
    "account_name": "...",
    "account_number": "...",
    "bank_name": "...",
    "swift_code": "...",
    "routing_number": "..."
  },
  "payoneer": {
    "payoneer_email": "..."
  },
  "western_union": {
    "recipient_name": "...",
    "country": "...",
    "city": "..."
  },
  "moneygram": {
    "recipient_name": "...",
    "country": "..."
  }
}
```

### `server/storage/s3.ts`

```ts
export function isS3Configured(): boolean

export function getS3Client(): S3Client | null

export async function generatePresignedDownloadUrl(
  assetPath: string,
  expiresInSeconds?: number  // default 3600
): Promise<string | null>

export async function generatePresignedUploadUrl(
  assetPath: string,
  contentType: string,
  expiresInSeconds?: number  // default 300
): Promise<string | null>
```

---

## API Route Extensions

### Extended: `POST /api/v1/orders`
Accept multi-item cart payload (backwards compatible with single-product):
```ts
// New accepted body shape
{
  // Single product (existing)
  product_slug?: string;
  product_variant_slug?: string;
  product_tier_name?: string;
  fulfillment_type?: string;
  // Multi-item cart (new)
  items?: CartItemRecord[];
  // Extended fields (new)
  payment_method?: PaymentMethodType;  // defaults to 'other' if absent
  customer_name: string;
  customer_email: string;
  customer_phone?: string;
  notes?: string;
}
```
After order creation: if `payment_method !== 'stripe'`, auto-create invoice + send invoice email.

### New Admin Routes

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/api/v1/admin/orders` | List orders. Query: `status`, `payment_status`, `fulfillment_status`, `email`, `page`, `limit` |
| `GET` | `/api/v1/admin/orders/[orderId]` | Full order detail incl. invoice, items, downloads, licenses |
| `PATCH` | `/api/v1/admin/orders/[orderId]/fulfillment` | Update `fulfillment_status`. Body: `{ status }` |
| `POST` | `/api/v1/admin/orders/[orderId]/delivery-url` | Add delivery URL. Body: `{ url, label? }` |
| `POST` | `/api/v1/admin/orders/[orderId]/invoice/send` | Send or resend invoice email |
| `PATCH` | `/api/v1/admin/orders/[orderId]/invoice/paid` | Mark invoice + order as paid. Body: `{ notes? }` |
| `GET` | `/api/v1/admin/files` | List S3 asset paths (scoped by prefix) |
| `POST` | `/api/v1/admin/files/upload` | Generate presigned S3 upload URL. Body: `{ filename, contentType }` |
| `PATCH` | `/api/v1/admin/downloads/[downloadId]/asset` | Update `asset_path` on download record. Body: `{ asset_path }` |

All admin routes: `requireAdminUser` guard, `recordAuditLog` on writes.

---

## Order-to-User Link (P14)

In `createOrder()`, after Clerk keys are active:
```ts
// In server context (API route), extract Clerk user ID from request
import { auth } from '@clerk/nextjs/server';
const { userId: clerkUserId } = auth();
if (clerkUserId) {
  // Look up Supabase user mirror by clerk_user_id
  const db = await readDatabase();
  const user = db.users.find(u => u.clerk_user_id === clerkUserId);
  order.user_id = user?.id;
}
```

This is additive — `user_id` remains nullable for guest orders.

---

## Environment Variables Required

```bash
# S3 (new)
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_REGION=ap-southeast-1
AWS_S3_BUCKET=growrix-agency-assets

# Supabase direct connection (for migration runner)
SUPABASE_DB_URL=postgresql://postgres.[ref]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres

# Payment methods config path (optional override)
PAYMENT_METHODS_CONFIG_PATH=./data/payment-methods.json
```

---

## Data Flow: Order → Invoice → Payment → Fulfillment

```
Customer submits checkout form
  → POST /api/v1/orders
    → createOrder() [creates OrderRecord, persists to Supabase]
    → if payment_method !== 'stripe':
        createInvoice() [creates InvoiceRecord]
        sendInvoiceEmail() [Resend — invoice HTML with payment instructions]
        dispatchNotification('order_placed') [Lark + admin email]
    → return { order_number, invoice_number? }

Admin marks invoice paid
  → PATCH /api/v1/admin/orders/[id]/invoice/paid
    → markInvoicePaid() [invoice.status = 'paid']
    → markOrderPaid() [order.payment_status = 'succeeded']
      → syncOrderEntitlements() [issues downloads + licenses]
      → safeSendPurchaseConfirmationEmail()
      → dispatchNotification('invoice_paid') [Lark]

Admin updates fulfillment to 'delivered'
  → PATCH /api/v1/admin/orders/[id]/fulfillment
    → updateOrderOperations() [existing]
      → safeSendDownloadReadyEmail() [with delivery URLs]
      → dispatchNotification('download_issued') [Lark]
```

---

## RLS Policy Pattern (all new tables)
```sql
alter table public.invoices enable row level security;
revoke all on table public.invoices from anon;
revoke all on table public.invoices from authenticated;
grant all on table public.invoices to service_role;

drop policy if exists invoices_client_block_all on public.invoices;
create policy invoices_client_block_all
on public.invoices for all
to anon, authenticated
using (false) with check (false);
```
(Same pattern for `cart_sessions`)
