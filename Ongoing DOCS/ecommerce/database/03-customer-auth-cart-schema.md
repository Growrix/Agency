# Customer Auth Cart Schema

Document status: database contract
Owner: Data, auth, customer

## Purpose

Define account-adjacent and cart data needed for customer identity, sessions, addresses, preferences, and cart recovery.

## Core Tables

| Table | Purpose | Key fields |
| --- | --- | --- |
| `users` | Login identity | id, email, passwordHash, status, emailVerifiedAt |
| `profiles` | Customer display data | userId, name, phone, birthDate, preferences |
| `sessions` | Auth session | id, userId, deviceId, refreshHash, expiresAt, revokedAt |
| `devices` | Trusted device metadata | id, userId, fingerprintHash, label, lastSeenAt |
| `roles` | Staff/customer role group | id, key, name |
| `permissions` | Atomic capability | id, key, description |
| `addresses` | Customer addresses | id, userId, type, name, phone, address lines, default flags |
| `carts` | Guest or user cart | id, userId, guestTokenHash, status, currency, expiresAt |
| `cart_items` | Cart contents | id, cartId, variantId, quantity, priceSnapshot, metadata |

## Rules

- Guest cart identity should be tokenized and not expose raw tokens in storage.
- User cart merge must be deterministic after login.
- Session records enable revocation and device management.
- Customer addresses must support billing and shipping defaults separately.
- Role and permission assignments require audit records.

## Privacy Considerations

- Personal data should be minimized and retention-aware.
- Exports and deletion/anonymization must preserve order accounting where legally required.
- Sensitive tokens are stored hashed.

## Acceptance Criteria

- Guest and logged-in cart flows share one cart model.
- Customer-owned records support ownership checks.
- Auth records support refresh rotation, revocation, and device trust.
