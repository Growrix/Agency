# Admin Product Inventory Flow

Document status: active flow specification
Owner: Catalog, inventory, admin, operations, QA

## Purpose

Define admin workflows for product management, variant management, media, SEO, inventory adjustment, stock reservation visibility, and low-stock operations.

## Scope

This flow covers admin product list, product create/edit/archive, variants, media, category assignment, SEO, inventory adjustments, low-stock alerts, reservation visibility, and audit logs.

## Routes

| Route/screen | Purpose | Required states |
| --- | --- | --- |
| `/admin/products` | Search/filter/manage products | loading, loaded, empty, filtered empty, permission denied |
| `/admin/products/new` | Create product | draft, validation error, saving, saved |
| `/admin/products/:id` | Edit product | loaded, stale conflict, archived, permission denied |
| `/admin/inventory` | Stock overview | loading, low stock, reservations, filtered empty |
| `/admin/inventory/:variantId` | Variant stock ledger | loaded, adjust, audit, conflict |

## Product Create/Edit Flow
1. Admin opens product form.
2. API validates permission `products.manage`.
3. Admin enters title, slug, description, product type, categories, SEO metadata, media, and variants.
4. Draft can save without all publish requirements.
5. Publish requires valid slug, at least one active variant, price/currency, fulfillment policy, media/alt policy, and SEO metadata.
6. Server checks slug/SKU uniqueness.
7. Save writes product/variant records and audit log.
8. Search index update job is queued.
9. UI reloads source state and shows durable confirmation.

## Inventory Adjustment Flow
1. Admin opens variant stock ledger.
2. API validates permission `inventory.adjust`.
3. UI shows available, reserved, damaged, low-stock threshold, active reservations, and recent adjustments.
4. Admin enters stock delta and reason.
5. Server validates that available stock cannot go negative unless correction policy allows it.
6. Adjustment writes durable ledger row and audit log.
7. Low-stock alert state is recalculated.
8. UI reloads current stock from server.

## Required Admin Actions

| Action | Permission | Preconditions | Result |
| --- | --- | --- | --- |
| Create product | `products.manage` | Valid draft fields | Product draft created. |
| Publish product | `products.manage` | Publish requirements met | Product appears publicly after cache/index update. |
| Archive product | `products.manage` | Product exists | Removed from public listings, retained for historical orders. |
| Create/update variant | `products.manage` | Unique SKU and valid price | Variant available according to status/inventory policy. |
| Upload product media | `products.manage` | File policy passes | Media stored with alt text and safe URL. |
| Adjust inventory | `inventory.adjust` | Reason and stock rules pass | Stock ledger/audit updated. |
| View reservations | `inventory.adjust` or `orders.view` | Staff permission | Active holds visible for support/reconciliation. |

## Failure Cases
- Duplicate slug/SKU returns conflict with field-level error.
- Stale edit returns conflict and latest updated timestamp.
- Search index failure does not roll back product save, but creates retryable job/log.
- Media upload failure keeps draft editable.
- Permission denied hides action and API returns 403.

## Tests
- Create draft product.
- Publish product with variants and SEO.
- Duplicate slug/SKU conflict.
- Archive product and verify public route hidden.
- Adjust inventory with valid reason.
- Reject negative stock when policy disallows it.
- Low-stock alert appears.
- Permission denial for unauthorized admin user.

## Acceptance Criteria

- Admin can manage products and inventory without direct database access.
- Product changes are validated, indexed, audited, and visible in public discovery when published.
- Inventory changes are ledgered, permissioned, and reconciled with checkout reservations.
