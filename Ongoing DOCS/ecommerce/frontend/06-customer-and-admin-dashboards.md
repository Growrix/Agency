# Customer And Admin Dashboards

Document status: frontend source
Owner: Frontend, operations, CX

## Purpose

Define customer self-service and admin operational dashboards.

## Customer Dashboard

Required sections:

- Overview.
- Orders and tracking.
- Invoices and downloads.
- Wishlist and recently viewed.
- Addresses.
- Payment methods and saved cards where provider allows.
- Notifications and preferences.
- Profile and security.
- Sessions and devices.
- Support tickets and messages.
- Returns, refunds, store credit, reward points, subscriptions, referrals.
- Reviews.

## Admin Dashboard

Required sections:

- Dashboard and KPIs.
- Products, categories, brands, collections.
- Inventory, warehouses, suppliers, purchase orders.
- Orders, shipments, returns, refunds.
- Customers and support context.
- Coupons, gift cards, rewards, referrals.
- Reviews, Q&A, moderation.
- Blogs, CMS pages, policies, landing pages.
- Users, roles, permissions.
- Taxes, shipping, payments, integrations.
- Email templates and notifications.
- Reports, analytics, logs, audit, system health.

## UI Rules

- Customer pages require ownership-safe data loading.
- Admin navigation is permission-aware.
- Destructive admin actions require confirmation and clear consequences.
- Lists require filtering, sorting, search, pagination, and empty states.

## Acceptance Criteria

- Customer dashboard supports post-purchase self-service.
- Admin dashboard supports daily store operations without direct database access.
- Permission gaps fail closed and do not expose hidden data through APIs.
