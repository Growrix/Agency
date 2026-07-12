# Operations Analytics Detailed Contracts

Document status: active API implementation contract
Owner: Operations, analytics, support, notifications, admin, QA

## Purpose

Define request and response behavior for reports, analytics events, audit logs, notification templates, support tickets, settings, and operational health.

## Endpoint Summary

| Method | Path | Auth | Purpose |
| --- | --- | --- | --- |
| POST | `/api/v1/events` | Public/customer/server | Ingest sanitized analytics event. |
| GET | `/api/v1/admin/reports/sales` | Staff permission | Sales and revenue reporting. |
| GET | `/api/v1/admin/reports/funnel` | Staff permission | Funnel and conversion reporting. |
| GET | `/api/v1/admin/audit-logs` | Staff permission | Search audit logs. |
| GET | `/api/v1/admin/notifications` | Staff permission | Notification logs. |
| GET | `/api/v1/admin/email-templates` | Staff permission | List email templates. |
| PATCH | `/api/v1/admin/email-templates/:key` | Staff permission | Update template. |
| POST | `/api/v1/admin/email-templates/:key/test` | Staff permission | Send test message. |
| GET | `/api/v1/admin/support-tickets` | Staff permission | Search support tickets. |
| PATCH | `/api/v1/admin/support-tickets/:id` | Staff permission | Update ticket status/assignment. |
| GET | `/api/v1/admin/system-health` | Staff permission | Commerce subsystem health. |

## Analytics Event Request
```json
{
  "eventName": "checkout.started",
  "anonymousId": "anon_123",
  "userId": "usr_123",
  "orderId": null,
  "properties": {
    "cartId": "cart_123",
    "currency": "USD",
    "itemCount": 2
  },
  "consentState": {
    "analytics": true,
    "marketing": false
  }
}
```

Rules:
- Client events must respect consent.
- Server-side order/payment events are required for financial milestones.
- PII must be redacted or hashed before storage/export.
- Duplicate event handling should use request ID or event ID where available.

## Sales Report Response
```json
{
  "data": {
    "range": {
      "from": "2026-07-01",
      "to": "2026-07-12"
    },
    "currency": "USD",
    "totals": {
      "grossRevenue": 250000,
      "discountTotal": 12000,
      "refundTotal": 5000,
      "netRevenue": 233000,
      "orders": 42,
      "averageOrderValue": 5547
    },
    "series": [
      {
        "date": "2026-07-12",
        "orders": 4,
        "netRevenue": 23000
      }
    ]
  },
  "meta": {},
  "error": null
}
```

## Audit Log Response
```json
{
  "data": {
    "items": [
      {
        "id": "aud_123",
        "actorId": "usr_admin",
        "action": "orders.status.update",
        "targetType": "order",
        "targetId": "ord_123",
        "reason": "Manual payment confirmed.",
        "createdAt": "2026-07-12T12:00:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "pageSize": 50,
      "total": 1
    }
  },
  "meta": {},
  "error": null
}
```

## Email Template Update Request
```json
{
  "subject": "Order {{orderNumber}} confirmed",
  "textBody": "Hi {{customerName}}, your order is confirmed.",
  "htmlBody": "<p>Hi {{customerName}}, your order is confirmed.</p>",
  "status": "active"
}
```

Rules:
- Templates require placeholder validation.
- Updating a template creates a new version or audit record.
- Test sends must be permissioned and rate limited.
- Fallback defaults remain available when a custom template is invalid.

## Support Ticket Update Request
```json
{
  "status": "waiting_on_customer",
  "assignedTo": "usr_support",
  "message": {
    "body": "We are checking this with fulfillment.",
    "visibility": "customer"
  }
}
```

Rules:
- Customer-visible support messages notify the customer.
- Internal messages stay hidden from customer APIs.
- Ticket changes write audit logs when staff performed.

## System Health Response
Required health checks:
- Database connectivity.
- Payment webhook status.
- Queue depth and worker failures.
- Email/SMS provider status.
- Storage/CDN status.
- Search index freshness.
- Shipping/tax provider status.
- Latest failed checkout/payment/notification counts.

## Acceptance Criteria

- Operations APIs expose enough data to support orders without database access.
- Analytics and reports respect consent and PII rules.
- Template, support, audit, and health endpoints are permissioned and observable.
