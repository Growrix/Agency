# API & Data Contracts

**Complete API schema and database structure for the Agency SaaS website.**

This document locks down all API request/response formats, data types, database schemas, error handling, and webhook events. Both backend and frontend teams must reference this contract before implementation.

---

## Quick Navigation

- **[AI-first entrypoint](#ai-context)**: `ai-context.yaml`
- **[Response Envelope](#response-envelope)**: success, paginated, error formats
- **[Error Codes](#error-codes)**: standardized error handling
- **[Database Schema](#database)**: users, services, products, orders, appointments, inquiries
- **[API Endpoints](#endpoints)**: auth, services, products, orders, appointments, contact
- **[Data Types](#types)**: timestamps, money, UUIDs, enums
- **[Webhooks](#webhooks)**: event schemas for order, payment, appointment

---

## API Base URL

```
https://api.agency.com/api/v1
```

All requests must include:
- `Content-Type: application/json`
- `Authorization: Bearer {token}` (for authenticated endpoints)

---

## Response Envelope

### Success Response

```json
{
  "success": true,
  "data": { /* endpoint-specific data */ },
  "timestamp": "2025-04-18T14:30:00Z",
  "request_id": "550e8400-e29b-41d4-a716-446655440000"
}
```

### Paginated Response

```json
{
  "success": true,
  "data": [ /* array of items */ ],
  "pagination": {
    "total": 150,
    "page": 1,
    "page_size": 20,
    "total_pages": 8
  },
  "timestamp": "2025-04-18T14:30:00Z",
  "request_id": "550e8400-e29b-41d4-a716-446655440000"
}
```

### Error Response

```json
{
  "success": false,
  "error": {
    "code": "INVALID_REQUEST",
    "message": "Email is required",
    "details": {
      "field": "email"
    }
  },
  "timestamp": "2025-04-18T14:30:00Z",
  "request_id": "550e8400-e29b-41d4-a716-446655440000"
}
```

---

## Error Codes & HTTP Status

| Code | HTTP | Description |
|---|---|---|
| UNAUTHORIZED | 401 | Missing or invalid token |
| INVALID_CREDENTIALS | 401 | Incorrect email/password |
| TOKEN_EXPIRED | 401 | Auth token expired, refresh required |
| FORBIDDEN | 403 | User lacks permission |
| RESOURCE_NOT_OWNED | 403 | Trying to access another user's resource |
| INVALID_REQUEST | 400 | Malformed request or invalid parameter |
| MISSING_REQUIRED_FIELD | 400 | Required field missing |
| FIELD_VALIDATION_FAILED | 400 | Field value invalid |
| NOT_FOUND | 404 | Resource does not exist |
| RESOURCE_DELETED | 410 | Resource was deleted |
| CONFLICT | 409 | Operation violates unique constraint |
| RATE_LIMIT_EXCEEDED | 429 | Too many requests |
| INTERNAL_ERROR | 500 | Unexpected server error |
| SERVICE_UNAVAILABLE | 503 | External service down |

---

## Database Schema

### users
- **id** (UUID, PK)
- **email** (VARCHAR 255, UNIQUE)
- **password_hash** (VARCHAR 255, bcrypt)
- **first_name, last_name** (VARCHAR)
- **phone** (VARCHAR 20)
- **role** (ENUM: visitor, subscriber, customer, admin) DEFAULT visitor
- **profile_picture_url** (TEXT)
- **created_at, updated_at** (TIMESTAMP UTC)

**Indexes**: email (unique), role, created_at

---

### services
- **id** (UUID, PK)
- **title** (VARCHAR 255)
- **slug** (VARCHAR 255, UNIQUE)
- **description** (TEXT)
- **service_type** (ENUM: saas_app, website, mcp_server, automation)
- **pricing_model** (ENUM: contact, tiered, fixed)
- **base_price_cents** (INT, nullable for "contact us")
- **delivery_timeline_days** (INT)
- **support_level** (ENUM: standard, premium, enterprise)
- **tech_stack** (JSONB array)
- **use_cases** (JSONB array)
- **created_at, updated_at** (TIMESTAMP UTC)

**Indexes**: slug (unique), service_type

---

### products
- **id** (UUID, PK)
- **sku** (VARCHAR 100, UNIQUE)
- **title** (VARCHAR 255)
- **slug** (VARCHAR 255, UNIQUE)
- **description** (TEXT)
- **category** (ENUM: template, mcp_server, ready_website, mobile_app)
- **price_cents** (INT) — USD cents
- **discount_price_cents** (INT, nullable)
- **discount_valid_until** (TIMESTAMP, nullable)
- **file_url** (TEXT) — presigned S3 URL
- **file_size_bytes** (BIGINT)
- **delivery_method** (ENUM: instant_download, email_link, manual)
- **support_level** (ENUM: none, email, priority)
- **status** (ENUM: draft, active, discontinued)
- **created_at, updated_at** (TIMESTAMP UTC)

**Indexes**: sku (unique), slug (unique), category, status

---

### orders
- **id** (UUID, PK)
- **customer_id** (UUID, FK users, nullable for guests)
- **order_number** (VARCHAR 50, UNIQUE) — human-readable, e.g., ORD-20250418-001
- **subtotal_cents** (INT)
- **tax_cents** (INT)
- **discount_cents** (INT, nullable)
- **total_cents** (INT)
- **currency** (VARCHAR 3) DEFAULT USD
- **payment_status** (ENUM: pending, succeeded, failed, refunded)
- **payment_method** (ENUM: stripe_card, stripe_bank, apple_pay, google_pay)
- **stripe_transaction_id** (VARCHAR 255)
- **fulfillment_status** (ENUM: pending, fulfilling, delivered, archived)
- **customer_email** (VARCHAR 255)
- **customer_name** (VARCHAR 255)
- **customer_phone** (VARCHAR 20)
- **notes** (TEXT)
- **created_at, completed_at, refunded_at** (TIMESTAMP UTC)

**Indexes**: customer_id (FK), order_number (unique), payment_status, created_at

---

### order_items
- **id** (UUID, PK)
- **order_id** (UUID, FK orders)
- **product_id** (UUID, FK products)
- **quantity** (INT) DEFAULT 1
- **unit_price_cents** (INT)
- **discount_cents** (INT, nullable)
- **total_cents** (INT)

**Indexes**: order_id (FK), product_id (FK)

---

### appointments
- **id** (UUID, PK)
- **visitor_email** (VARCHAR 255)
- **visitor_name** (VARCHAR 255)
- **visitor_phone** (VARCHAR 20)
- **service_id** (UUID, FK services, nullable)
- **service_interested_in** (TEXT)
- **preferred_datetime** (TIMESTAMP)
- **timezone** (VARCHAR 50) e.g., "America/New_York"
- **duration_minutes** (INT) DEFAULT 30
- **status** (ENUM: inquiry, confirmed, completed, cancelled, no_show)
- **calendar_event_id** (VARCHAR 255) — external calendar ID
- **notes** (TEXT)
- **internal_notes** (TEXT)
- **follow_up_required** (BOOLEAN) DEFAULT false
- **assigned_to_user_id** (UUID, FK users, nullable)
- **created_at, confirmed_at, completed_at** (TIMESTAMP UTC)

**Indexes**: visitor_email, service_id (FK), status, preferred_datetime, assigned_to_user_id

---

### contact_inquiries
- **id** (UUID, PK)
- **visitor_email** (VARCHAR 255)
- **visitor_name** (VARCHAR 255)
- **subject** (VARCHAR 255)
- **message** (TEXT)
- **inquiry_type** (ENUM: general, support, partnership, other)
- **status** (ENUM: new, read, responded, closed, spam) DEFAULT new
- **assigned_to_user_id** (UUID, FK users, nullable)
- **response_message** (TEXT)
- **responded_at** (TIMESTAMP, nullable)
- **created_at, updated_at** (TIMESTAMP UTC)

**Indexes**: visitor_email, status, assigned_to_user_id, created_at

---

## API Endpoints

### Authentication

**POST /auth/register**
```json
{
  "email": "user@example.com",
  "password": "securePassword123",
  "first_name": "Jane",
  "last_name": "Doe"
}
```
Response: `{ user, token, expires_in }`

**POST /auth/login**
```json
{
  "email": "user@example.com",
  "password": "securePassword123"
}
```
Response: `{ user, token, expires_in }`

**POST /auth/refresh-token**
```json
{
  "refresh_token": "..."
}
```
Response: `{ token, expires_in }`

---

### Services

**GET /services** (paginated)
```
Query params: page, page_size, service_type (optional)
```
Response: `[ { id, title, slug, description, service_type, pricing_model, base_price_cents, ... } ]`

**GET /services/[serviceId]**
Response: single Service object

---

### Products

**GET /shop/categories**
Response: `[ "template", "mcp_server", "ready_website", "mobile_app" ]`

**GET /shop/products** (paginated)
```
Query params: category (optional), search (optional), page, page_size
```
Response: `[ { id, title, price_cents, category, rating, ... } ]`

**GET /shop/products/[productSlug]**
Response: single Product object with delivery info

---

### Orders

**POST /orders**
```json
{
  "items": [ { "product_id": "...", "quantity": 1 } ],
  "customer_email": "buyer@example.com",
  "customer_name": "John Doe",
  "customer_phone": "+1-555-123-4567",
  "coupon_code": "SAVE10" (optional)
}
```
Response: `{ id, order_number, total_cents, payment_status, stripe_client_secret }`

**GET /orders/[orderId]** (authenticated)
Response: full Order object with fulfillment_status and delivery_urls

**POST /orders/[orderId]/download** (authenticated)
Response: redirect to presigned S3 download URL

---

### Appointments

**POST /appointments**
```json
{
  "visitor_email": "visitor@example.com",
  "visitor_name": "Jane Smith",
  "visitor_phone": "+1-555-321-7654",
  "service_id": "...",
  "preferred_datetime": "2025-04-25T14:00:00Z",
  "timezone": "America/New_York",
  "notes": "I'm interested in a custom SaaS application..."
}
```
Response: `{ id, status: "inquiry", confirmation_sent: true }`

**GET /appointments/[appointmentId]**
Response: full Appointment object

---

### Contact

**POST /contact**
```json
{
  "visitor_email": "visitor@example.com",
  "visitor_name": "Jane Smith",
  "subject": "Question about your services",
  "message": "I'd like to know more about...",
  "inquiry_type": "general"
}
```
Response: `{ id, status: "new", message: "Thank you, we'll respond soon" }`

---

## Data Types

### timestamp
- Format: ISO 8601
- Example: `2025-04-18T14:30:00Z`
- Timezone: UTC always

### money
- Format: integer (cents)
- Example: `9999` represents $99.99
- Currency: USD

### uuid
- Format: RFC 4122
- Example: `550e8400-e29b-41d4-a716-446655440000`

### email
- Format: RFC 5322 compliant
- Validation: standard email format + optional domain verification

### phone
- Format: E.164 or dash-separated
- Example: `+1-555-123-4567`

### enum
- Represented as lowercase with underscores
- Example: `payment_status: "stripe_card"`

---

## Webhook Events

### order.created
```json
{
  "event_type": "order.created",
  "payload": {
    "order_id": "...",
    "order_number": "ORD-20250418-001",
    "customer_email": "buyer@example.com",
    "total_cents": 9999,
    "items": [ { "product_id": "...", "quantity": 1 } ],
    "created_at": "2025-04-18T14:30:00Z"
  }
}
```

### payment.succeeded
```json
{
  "event_type": "payment.succeeded",
  "payload": {
    "order_id": "...",
    "stripe_transaction_id": "ch_...",
    "amount_cents": 9999,
    "timestamp": "2025-04-18T14:30:00Z"
  }
}
```

### appointment.confirmed
```json
{
  "event_type": "appointment.confirmed",
  "payload": {
    "appointment_id": "...",
    "visitor_email": "visitor@example.com",
    "service_id": "...",
    "preferred_datetime": "2025-04-25T14:00:00Z",
    "confirmed_at": "2025-04-18T14:30:00Z"
  }
}
```

---

## Implementation Notes

1. **All monetary amounts are in cents** to avoid floating-point precision errors.
2. **All timestamps are ISO 8601, UTC** — never use local time in API responses.
3. **All IDs are UUIDs** except human-readable identifiers like order_number.
4. **Webhooks must be idempotent** — handle duplicate deliveries gracefully.
5. **Rate limiting**: 100 requests per minute per IP.
6. **CORS**: enabled for frontend origin.
7. **SSL/TLS**: enforced on all endpoints (HTTPS only).

---

## How to Use This Contract

- **Backend**: implement all endpoints and schemas exactly as specified
- **Frontend**: build UI based on these response structures; never assume additional fields
- **QA**: validate all responses match the schema
- **DevOps**: set up monitoring for webhook delivery failures
