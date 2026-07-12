# Full Schema Contract

Document status: active database implementation contract
Owner: Data architecture, backend, security, QA

## Purpose

Define column-level schema expectations, constraints, row-level security, migration order, and seed requirements so agents do not invent incompatible ecommerce data models.

## Global Database Rules

- Use stable primary keys for every business entity.
- Store money in integer minor units with explicit `currency`.
- Store order, payment, address, tax, discount, and shipping snapshots as immutable historical records.
- Prefer explicit lifecycle status fields over hard delete for commerce records.
- Use soft delete/archive for records that affect audit, finance, fulfillment, or legal history.
- Store provider payloads only as safe metadata; never store secrets, raw card data, OTPs, or password reset tokens in plain text.
- Every protected customer-owned row must include an ownership field or join path.
- Every admin-sensitive mutation must have a matching audit log event.

## Required Table Groups

### Identity And Access

| Table | Required columns |
| --- | --- |
| `users` | `id`, `email`, `emailVerifiedAt`, `role`, `status`, `createdAt`, `updatedAt`, `deletedAt` |
| `sessions` | `id`, `userId`, `deviceId`, `refreshTokenHash`, `ipHash`, `userAgent`, `expiresAt`, `revokedAt`, `createdAt`, `lastUsedAt` |
| `roles` | `id`, `key`, `name`, `description`, `createdAt` |
| `permissions` | `id`, `key`, `description`, `createdAt` |
| `role_permissions` | `roleId`, `permissionId`, `createdAt` |
| `user_roles` | `userId`, `roleId`, `assignedBy`, `createdAt` |

### Customer Profile

| Table | Required columns |
| --- | --- |
| `customer_profiles` | `id`, `userId`, `name`, `phone`, `status`, `marketingConsent`, `createdAt`, `updatedAt` |
| `addresses` | `id`, `userId`, `label`, `name`, `phone`, `line1`, `line2`, `city`, `region`, `postalCode`, `country`, `isDefaultShipping`, `isDefaultBilling`, `createdAt`, `updatedAt`, `archivedAt` |
| `support_tickets` | `id`, `userId`, `orderId`, `subject`, `status`, `priority`, `createdAt`, `updatedAt`, `closedAt` |
| `support_messages` | `id`, `ticketId`, `authorUserId`, `visibility`, `body`, `createdAt` |

### Catalog

| Table | Required columns |
| --- | --- |
| `products` | `id`, `slug`, `title`, `description`, `status`, `productType`, `brandId`, `seoTitle`, `seoDescription`, `createdAt`, `updatedAt`, `archivedAt` |
| `product_variants` | `id`, `productId`, `sku`, `title`, `price`, `compareAtPrice`, `currency`, `taxClass`, `weight`, `dimensions`, `requiresShipping`, `inventoryManaged`, `status`, `createdAt`, `updatedAt` |
| `categories` | `id`, `parentId`, `slug`, `name`, `description`, `sortOrder`, `status`, `seoTitle`, `seoDescription` |
| `product_categories` | `productId`, `categoryId`, `createdAt` |
| `product_media` | `id`, `productId`, `variantId`, `url`, `alt`, `type`, `sortOrder`, `createdAt` |
| `product_reviews` | `id`, `productId`, `userId`, `orderId`, `rating`, `title`, `body`, `status`, `createdAt`, `moderatedAt` |

### Cart And Promotions

| Table | Required columns |
| --- | --- |
| `carts` | `id`, `userId`, `guestTokenHash`, `status`, `currency`, `expiresAt`, `convertedOrderId`, `createdAt`, `updatedAt` |
| `cart_items` | `id`, `cartId`, `productId`, `variantId`, `quantity`, `unitPriceSnapshot`, `metadata`, `createdAt`, `updatedAt` |
| `coupons` | `id`, `code`, `type`, `value`, `startsAt`, `endsAt`, `usageLimit`, `perCustomerLimit`, `stackingPolicy`, `status`, `createdAt`, `updatedAt` |
| `coupon_redemptions` | `id`, `couponId`, `userId`, `cartId`, `orderId`, `discountAmount`, `createdAt` |
| `gift_cards` | `id`, `codeHash`, `initialBalance`, `currentBalance`, `currency`, `status`, `expiresAt`, `createdAt` |
| `store_credit_ledger` | `id`, `userId`, `orderId`, `type`, `amount`, `currency`, `reason`, `createdBy`, `createdAt` |

### Inventory

| Table | Required columns |
| --- | --- |
| `warehouses` | `id`, `name`, `status`, `addressSnapshot`, `createdAt`, `updatedAt` |
| `inventory_stock` | `id`, `variantId`, `warehouseId`, `available`, `reserved`, `damaged`, `updatedAt` |
| `inventory_reservations` | `id`, `cartId`, `checkoutId`, `orderId`, `variantId`, `warehouseId`, `quantity`, `status`, `expiresAt`, `createdAt`, `updatedAt` |
| `inventory_adjustments` | `id`, `variantId`, `warehouseId`, `delta`, `reason`, `actorId`, `createdAt` |

### Orders And Fulfillment

| Table | Required columns |
| --- | --- |
| `orders` | `id`, `orderNumber`, `userId`, `guestEmail`, `status`, `paymentStatus`, `fulfillmentStatus`, `currency`, `subtotal`, `discountTotal`, `taxTotal`, `shippingTotal`, `grandTotal`, `billingAddressSnapshot`, `shippingAddressSnapshot`, `createdAt`, `updatedAt`, `closedAt` |
| `order_items` | `id`, `orderId`, `productId`, `variantId`, `sku`, `title`, `variantTitle`, `quantity`, `unitPrice`, `discountTotal`, `taxTotal`, `lineTotal`, `metadata` |
| `shipments` | `id`, `orderId`, `carrier`, `trackingNumber`, `status`, `labelUrl`, `shippedAt`, `deliveredAt`, `createdAt`, `updatedAt` |
| `invoices` | `id`, `orderId`, `invoiceNumber`, `status`, `amountDue`, `amountPaid`, `currency`, `sentAt`, `paidAt`, `voidedAt`, `createdAt` |
| `returns` | `id`, `orderId`, `userId`, `status`, `reason`, `requestedAt`, `approvedAt`, `rejectedAt`, `closedAt` |
| `return_items` | `id`, `returnId`, `orderItemId`, `quantity`, `condition`, `resolution` |

### Payments And Finance

| Table | Required columns |
| --- | --- |
| `payments` | `id`, `orderId`, `provider`, `method`, `status`, `amount`, `currency`, `idempotencyKey`, `providerPaymentId`, `createdAt`, `updatedAt` |
| `transactions` | `id`, `paymentId`, `providerEventId`, `type`, `status`, `amount`, `currency`, `safeMetadata`, `createdAt` |
| `refunds` | `id`, `orderId`, `paymentId`, `amount`, `currency`, `reason`, `status`, `providerRefundId`, `createdBy`, `createdAt`, `updatedAt` |
| `disputes` | `id`, `paymentId`, `providerDisputeId`, `status`, `amount`, `currency`, `reason`, `createdAt`, `updatedAt` |

### Operations And Analytics

| Table | Required columns |
| --- | --- |
| `notifications` | `id`, `userId`, `orderId`, `channel`, `templateKey`, `status`, `recipientHash`, `providerMessageId`, `failureReason`, `createdAt`, `sentAt` |
| `email_templates` | `id`, `key`, `subject`, `textBody`, `htmlBody`, `status`, `version`, `updatedBy`, `updatedAt` |
| `audit_logs` | `id`, `actorId`, `action`, `targetType`, `targetId`, `beforeState`, `afterState`, `reason`, `requestId`, `createdAt` |
| `analytics_events` | `id`, `eventName`, `userId`, `anonymousId`, `orderId`, `properties`, `consentState`, `createdAt` |
| `settings` | `id`, `namespace`, `key`, `value`, `updatedBy`, `updatedAt` |

## Required Constraints And Indexes

- Unique `products.slug`, `product_variants.sku`, `categories.slug`, `orders.orderNumber`, `invoices.invoiceNumber`.
- Unique provider event IDs per payment provider in `transactions`.
- Unique active cart item key per cart and product/variant/configuration.
- Foreign keys for all ownership and lifecycle relationships.
- Index orders by `userId`, `status`, `paymentStatus`, `fulfillmentStatus`, and `createdAt`.
- Index inventory by `variantId` and `warehouseId`.
- Index audit logs by `actorId`, `targetType`, `targetId`, `action`, and `createdAt`.
- Index analytics events by `eventName`, `orderId`, `userId`, and `createdAt`.

## Row-Level Security And Access

- Customers can read only their own profiles, addresses, orders, invoices, tickets, wishlist, and sessions.
- Staff/admin access requires permission checks in application code and database policy where supported.
- Public catalog reads expose only published, non-archived records.
- Raw provider metadata, audit logs, settings, and payment internals are admin/service-only.

## Migration Order

1. Identity and access tables.
2. Customer profile and addresses.
3. Catalog and media.
4. Cart, coupons, gift cards, store credit.
5. Inventory and reservations.
6. Orders, order items, shipments, invoices, returns.
7. Payments, transactions, refunds, disputes.
8. Notifications, templates, audit logs, analytics, settings.
9. Indexes, constraints, RLS policies, seed data.

## Seed Requirements

- Seed roles and permissions before admin screens are tested.
- Seed catalog, inventory, coupons, users, orders, payments, invoices, returns, notifications, and audit logs from `fixtures/01-ecommerce-test-data.md`.
- Seed data must be resettable and safe for local/staging environments.

## Acceptance Criteria

- Implementation schemas include the required columns, constraints, indexes, RLS/access rules, and migration order.
- State fields align with `state-machines/01-order-payment-fulfillment-states.md`.
- Every P0/P1 E2E scenario has database support and deterministic fixture data.
