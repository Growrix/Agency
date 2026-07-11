# Customer Dashboard Backend Plan

## Purpose
Define the backend orchestration required to turn the current dashboard from a read-only shell into a full customer portal with complete action flows.

## Baseline Reuse
- Reuse Clerk identity and `users` mirror.
- Reuse existing domains for orders, downloads, licenses, appointments, service requests, and notifications.
- Reuse `requireAuthenticatedUser` and ownership checks.

## Required Backend Services

### Dashboard Aggregate Service
Responsibility:
- Build a single customer dashboard read model that composes user profile, notifications, recent orders, ready downloads, appointment summary, and support summary.

Recommended functions:
- `getCustomerDashboardOverview(userId)`
- `getCustomerDashboardNavigationState(userId)`
- `getCustomerNotificationSummary(userId)`

### Customer Profile Service
Responsibility:
- Persist profile details and dashboard preferences beyond the current first/last-name-only update.

Recommended functions:
- `getCustomerProfile(userId)`
- `updateCustomerProfile(userId, input)`
- `getCustomerPreferences(userId)`
- `updateCustomerPreferences(userId, input)`
- `createCustomerAccountRequest(userId, type, details)`

### Customer Notification Service
Responsibility:
- Store and return customer-facing notifications separate from admin/operator notifications.

Recommended functions:
- `listCustomerNotifications(userId)`
- `markCustomerNotificationRead(userId, notificationId)`
- `createCustomerNotification(input)`

### Support Thread Service
Responsibility:
- Extend service requests from single submission records into customer-visible threads.

Recommended functions:
- `listCustomerServiceRequests(userId)`
- `getCustomerServiceRequestDetail(userId, requestId)`
- `createCustomerServiceRequestMessage(userId, requestId, input)`
- `createServiceRequestFromDashboard(userId, input)`

Rule:
- Internal admin notes must never be returned to customer endpoints.

### Appointment Action Service
Responsibility:
- Allow customers to request reschedule or cancellation with state transitions tracked safely.

Recommended functions:
- `requestAppointmentReschedule(userId, appointmentId, input)`
- `requestAppointmentCancellation(userId, appointmentId, input)`

### Order And Download Detail Service
Responsibility:
- Return richer customer-safe detail records rather than only shallow list summaries.

Recommended functions:
- `listCustomerOrders(userId)`
- `getCustomerOrderDetail(userId, orderId)`
- `listCustomerDownloads(userId)`
- `getCustomerDownloadDetail(userId, downloadId)`

## Event Model Extensions
- Order delivered -> create customer notification.
- Invoice/payment update -> create customer notification.
- Support reply posted by admin -> create customer notification + optional Resend email.
- Appointment updated -> create customer notification + optional Resend email.
- Account export/delete request created -> audit event + operator notification.

## Reuse And Extension Rules
- Extend existing domain modules first; do not create a parallel dashboard-only service layer unless aggregation needs a dedicated adapter.
- Keep all ownership enforcement in backend domains and guards.
- Prefer explicit domain methods over generic CRUD handlers for customer actions.

## Failure Handling
- Notification creation failure must not block primary business action; record audit warning.
- Support-thread reply email failure falls back to in-app status only.
- Appointment action request failure must not partially mutate state.
- Signed-download authorization continues to fail closed.

## Exit Criteria
- Every customer dashboard action maps to a backend service boundary.
- Customer-visible data is explicitly separated from admin-only operational data.
- Notification, profile, support, and appointment action flows are orchestrated server-side and auditable.
