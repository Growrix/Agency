# Admin Dashboard Role Plan — E-Commerce + Auth Platform

**Canonical root plan:** `DOC/PROJECT PLAN/ecommerce-auth-platform-e2e-plan.md`
**Last updated:** 2026-06-29

---

## Scope

Admin order management UI (Phase P18), file manager (Phase P17), and invoice actions. All new admin pages extend the existing `/admin/**` shell and auth guards.

---

## Existing Admin Infrastructure (Reuse)

- Admin auth: `requireAdminUser` server-side guard (existing)
- Admin shell layout: `app/admin/layout.tsx` (existing)
- Admin nav: extend to add "Orders" and "Files" links
- Primitives: `Card`, `Button`, `Badge`, `Container` (existing)

---

## New Admin Routes

### Orders List — `app/admin/orders/page.tsx`

**Route:** `/admin/orders`

**Data source:** `GET /api/v1/admin/orders?page=1&limit=25&payment_status=pending`

**UI spec:**
- Page heading: "Orders"
- Filter bar (sticky): Payment Status (All / Pending / Paid / Failed / Refunded), Fulfillment (All / Pending / Fulfilling / Delivered), Search by email or order number
- Stats row: Total orders, Pending payment count, Fulfilled count (from aggregated API response)
- Orders table:
  | Column | Source |
  |--------|--------|
  | Order # | `order_number` |
  | Customer | `customer_name` + `customer_email` |
  | Items | `items[].product_name` joined |
  | Total | `total_cents` formatted USD |
  | Payment | `payment_status` badge |
  | Fulfillment | `fulfillment_status` badge |
  | Method | `payment_method` on invoice |
  | Date | `created_at` relative |
  | Action | "View" LinkButton → `/admin/orders/[id]` |

- Badge colors: `pending` = yellow, `succeeded/paid` = green, `failed` = red, `delivered` = blue
- Pagination: "Load more" button or simple prev/next

---

### Order Detail — `app/admin/orders/[orderId]/page.tsx`

**Route:** `/admin/orders/[orderId]`

**Data source:** `GET /api/v1/admin/orders/[orderId]`

**UI spec (sections):**

#### 1. Order Header
- Order number (large), date, back link to orders list
- Customer: name, email, phone

#### 2. Order Items Table
- Product name, tier/variant, quantity, unit price, total
- Subtotal, tax, discount, **Total** row

#### 3. Invoice Panel
- Invoice number, status badge, payment method
- Sent at, due date, paid at (if paid)
- Actions:
  - "Send Invoice" / "Resend Invoice" → `POST /api/v1/admin/orders/[id]/invoice/send` (disabled if paid)
  - "Mark as Paid" → `PATCH /api/v1/admin/orders/[id]/invoice/paid` + confirm modal (disabled if already paid)
  - Payment instructions preview (collapsible, for operator reference)

#### 4. Fulfillment Panel
- Current fulfillment status badge
- Status update dropdown (valid next states per state machine)
- "Update Status" button → `PATCH /api/v1/admin/orders/[id]/fulfillment`
- Delivery URLs list (each with copy/open action)
- "Add Delivery URL" form: text input + "Add" button → `POST /api/v1/admin/orders/[id]/delivery-url`

#### 5. Downloads and Licenses
- List of download records: product, asset path status (assigned / missing), download count / max
- "Link Asset" button → opens file picker or text input for S3 path → `PATCH /api/v1/admin/downloads/[downloadId]/asset`
- License records: license key, type, status

#### 6. Notes and Audit
- Internal notes field (PATCH to order `notes`)
- Last 10 audit log entries for this order

---

### File Manager — `app/admin/files/page.tsx`

**Route:** `/admin/files`

**Purpose:** Upload digital product assets to S3, then link them to download records

**UI spec:**
- Upload form: file picker, product slug selector (from catalog), variant slug input, "Upload" button
- On submit: `POST /api/v1/admin/files/upload` → returns presigned URL → browser uploads directly to S3
- After upload: show S3 path, offer "Link to order download" action
- File list (from `downloads` table): asset_path, product, order#, status
- Search by product slug or order number

---

## Admin Nav Extension

Add to admin navigation:
```
Orders  →  /admin/orders
Files   →  /admin/files
```

---

## Operator Workflow: From New Order to Delivery

1. **New order arrives** → Lark notification + admin email received
2. Admin opens `/admin/orders` → finds pending order
3. Opens order detail → checks payment method
4. If invoice not yet sent: clicks "Send Invoice" → customer receives invoice email
5. Customer pays (bank/Payoneer/WU/MG) and sends confirmation
6. Admin clicks "Mark as Paid" → confirms → order moves to `payment_status: succeeded`
   - System auto-issues download entitlements
   - System sends purchase confirmation email to customer
7. Admin sets fulfillment to "Fulfilling" → works on delivery
8. Admin uploads file to S3 via `/admin/files`, links to download record
9. Admin sets fulfillment to "Delivered", adds delivery URL
   - System sends download-ready email with signed URL to customer
10. Customer downloads from dashboard

---

## State Machine Constraints

The admin UI must enforce valid state transitions (same as `orders.ts`):

**Payment:** `pending → succeeded/failed`, `succeeded → refunded`  
**Fulfillment:** `pending → intake_pending/fulfilling`, `intake_pending → fulfilling`, `fulfilling → qa_review/delivered`, `qa_review → fulfilling/delivered`, `delivered → archived`

Dropdowns show only valid next states — never allow invalid transitions.
