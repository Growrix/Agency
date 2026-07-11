# Customer Dashboard API And Data Plan

## Purpose
Freeze the API contracts, schema additions, and source-of-truth boundaries needed to complete the customer dashboard experience.

## Current Baseline
Already present:
- `GET /api/v1/me`
- `POST /api/v1/me/update`
- `GET /api/v1/me/orders`
- `GET /api/v1/me/appointments`
- `GET /api/v1/me/downloads`
- `GET /api/v1/me/licenses`
- `POST /api/v1/downloads/[downloadId]/signed-url`
- `POST /api/v1/service-requests`

Missing or incomplete:
- profile detail contract beyond basic names
- notification read model
- customer support thread records
- customer-safe order detail contract
- appointment customer-action endpoints
- account request contract

## Canonical Data Ownership
- Clerk: canonical identity and session.
- PostgreSQL/Supabase: dashboard profile, preferences, notifications, support threads, appointments, orders, downloads, licenses, account requests.
- Sanity: excluded for dashboard transactional surfaces.

## Additive Schema Plan

### customer_profiles
- `user_id uuid primary key references users(id)`
- `phone text`
- `company_name text`
- `job_title text`
- `timezone text`
- `avatar_url text`
- `country_code text`
- `marketing_opt_in boolean default false`
- `created_at timestamptz`
- `updated_at timestamptz`

### customer_preferences
- `user_id uuid primary key references users(id)`
- `email_order_updates boolean default true`
- `email_support_updates boolean default true`
- `email_marketing boolean default false`
- `preferred_contact_channel text`
- `ui_preferences jsonb default '{}'::jsonb`
- `created_at timestamptz`
- `updated_at timestamptz`

### dashboard_notifications
- `id uuid primary key`
- `user_id uuid not null references users(id)`
- `kind text not null`
- `title text not null`
- `body text not null`
- `cta_href text`
- `read_at timestamptz`
- `metadata jsonb default '{}'::jsonb`
- `created_at timestamptz`

### service_request_messages
- `id uuid primary key`
- `service_request_id uuid not null references service_requests(id)`
- `author_type text not null check (author_type in ('customer','admin','system'))`
- `author_user_id uuid`
- `body text not null`
- `visibility text not null check (visibility in ('customer_visible','internal_only'))`
- `created_at timestamptz`

### customer_account_requests
- `id uuid primary key`
- `user_id uuid not null references users(id)`
- `request_type text not null check (request_type in ('data_export','account_deletion','privacy_access'))`
- `status text not null check (status in ('new','in_review','completed','rejected'))`
- `details jsonb default '{}'::jsonb`
- `resolved_at timestamptz`
- `created_at timestamptz`
- `updated_at timestamptz`

### appointments extensions
- `customer_action_status text` for pending reschedule/cancel request state
- `customer_note text`
- `reschedule_requested_at timestamptz`
- `cancellation_requested_at timestamptz`

## API Additions

### Dashboard aggregate
- `GET /api/v1/me/dashboard`
  - returns overview cards, recent orders, ready downloads, open support items, upcoming appointments, unread notification count

### Profile
- `GET /api/v1/me/profile`
- `PATCH /api/v1/me/profile`
- `GET /api/v1/me/preferences`
- `PATCH /api/v1/me/preferences`

### Notifications
- `GET /api/v1/me/notifications`
- `POST /api/v1/me/notifications/[notificationId]/read`
- optional bulk action later: `POST /api/v1/me/notifications/read-all`

### Orders and downloads
- `GET /api/v1/me/orders/[orderId]`
- `GET /api/v1/me/downloads/[downloadId]`
- existing `POST /api/v1/downloads/[downloadId]/signed-url` remains authoritative for asset authorization

### Appointments
- `POST /api/v1/me/appointments/[appointmentId]/reschedule-request`
- `POST /api/v1/me/appointments/[appointmentId]/cancel-request`

### Support threads
- `GET /api/v1/me/service-requests`
- `GET /api/v1/me/service-requests/[requestId]`
- `POST /api/v1/me/service-requests`
- `GET /api/v1/me/service-requests/[requestId]/messages`
- `POST /api/v1/me/service-requests/[requestId]/messages`

### Account requests
- `POST /api/v1/me/account-requests`
- `GET /api/v1/me/account-requests`

## Response Contract Rules
- All list endpoints use the standard response envelope.
- Customer-facing detail endpoints must not expose internal notes, raw audit records, or private admin metadata.
- All timestamps ISO UTC.
- Monetary values remain cents.
- IDs remain UUIDs, user-facing order identifiers remain `order_number`.

## RLS And Ownership Rules
- Customer can read only own profile, preferences, notifications, orders, downloads, appointments, service requests, and account requests.
- Customer can create only their own support messages and account requests.
- Admin can access customer records only through server-mediated admin endpoints.
- Internal-only support messages must never be queryable by customer endpoints.

## Migration Strategy
1. Add new tables and appointment columns additively.
2. Extend domain services and endpoint contracts.
3. Backfill profile rows from existing `users` data.
4. Keep customer support on the old single-submit path until thread endpoints are ready.
5. Switch frontend to new aggregate/detail endpoints after tests pass.

## Exit Criteria
- Schema supports profile, preferences, notifications, support threads, appointment requests, and account requests.
- Dashboard page actions no longer rely on placeholder data.
- Ownership and visibility rules are explicit in both schema and API contract.
