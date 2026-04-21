# Backend System Plan

**Backend architecture and service design for the Agency SaaS website.**

This document defines service boundaries, domain models, state machines, integrations, job queuing, observability, and reliability patterns. All backend services must align with the shared contract in [DOC/PROJECT PLAN/Shared Contracts/](../Shared%20Contracts/).

---

## Quick Navigation

- **[AI-first entrypoint](#ai-context)**: `ai-context.yaml`
- **[Service Boundaries](#services)**: auth, catalog, portfolio, shop, orders, appointments, contact, concierge, chat, notifications
- **[Domain Models](#models)**: User, Service, Product, Order, Appointment, Inquiry
- **[State Machines](#state-machines)**: appointment and order lifecycle
- **[Integrations](#integrations)**: Stripe, Calendar, Email, LLM, Chat, CRM, Zapier
- **[Queues & Jobs](#queues)**: order fulfillment, appointment reminders, lead routing
- **[Observability](#observability)**: logging, metrics, tracing, alerts
- **[Reliability Patterns](#reliability)**: circuit breakers, retries, fallbacks

---

## Service Boundaries

The backend is organized into loosely-coupled services, each with clear responsibility, models, endpoints, and integrations:

### Auth Service
**Responsibility**: user registration, login, session management, token generation

**Models**: User, Session, ApiKey, Role, Permission

**Endpoints**:
- `POST /api/v1/auth/register`
- `POST /api/v1/auth/login`
- `POST /api/v1/auth/logout`
- `POST /api/v1/auth/refresh-token`
- `GET /api/v1/auth/me`

**Integrations**: none (internal)

---

### Service Catalog Service
**Responsibility**: service definitions, pricing, availability, messaging

**Models**: Service, ServicePricing, ServiceFeature, ServiceFAQ

**Endpoints**:
- `GET /api/v1/services`
- `GET /api/v1/services/[serviceId]`
- `POST/PUT/DELETE /api/v1/admin/services` (admin only)

**Integrations**: none (internal)

---

### Portfolio Service
**Responsibility**: portfolio projects, case studies, testimonials, proof

**Models**: PortfolioProject, Testimonial, ProjectImage, ProjectMilestone

**Endpoints**:
- `GET /api/v1/portfolio`
- `GET /api/v1/portfolio/[slug]`
- `POST/PUT/DELETE /api/v1/admin/portfolio` (admin only)

**Integrations**: none (internal)

---

### Product Shop Service
**Responsibility**: digital product catalog, inventory, categories

**Models**: Product, Category, ProductVariant, Inventory, Rating

**Endpoints**:
- `GET /api/v1/shop/categories`
- `GET /api/v1/shop/products`
- `GET /api/v1/shop/products/[productSlug]`
- `POST/PUT/DELETE /api/v1/admin/products` (admin only)

**Integrations**: storage_service (S3 for product files)

---

### Order Service
**Responsibility**: order creation, payment processing, fulfillment, delivery

**Models**: Order, OrderItem, OrderStatus, Payment, Refund, Delivery

**Endpoints**:
- `POST /api/v1/orders`
- `GET /api/v1/orders/[orderId]`
- `POST /api/v1/orders/[orderId]/download`
- `GET /api/v1/me/orders` (subscriber only)
- `GET /api/v1/admin/orders` (admin only)

**Integrations**:
- Stripe (payment)
- Email service (confirmations, delivery notification)
- Fulfillment service (Zapier or internal queue)
- Storage service (deliver purchased files)

---

### Appointment Service
**Responsibility**: booking inquiries, availability checking, confirmation

**Models**: Appointment, TimeSlot, AppointmentStatus, BookingNote

**Endpoints**:
- `POST /api/v1/appointments`
- `GET /api/v1/appointments/[appointmentId]`
- `GET /api/v1/me/appointments` (subscriber only)
- `GET /api/v1/admin/appointments` (admin only)

**Integrations**:
- Calendar API (Google Calendar or similar)
- Email service (confirmations, reminders, follow-up)
- WhatsApp service (optional escalation)
- CRM service (lead tracking)

---

### Contact Inquiry Service
**Responsibility**: contact form submissions, inquiry routing

**Models**: ContactInquiry, InquiryStatus, InquiryResponse

**Endpoints**:
- `POST /api/v1/contact`
- `GET /api/v1/admin/inquiries` (admin only)

**Integrations**:
- Email service (acknowledge receipt, FAQ, route to team)

---

### AI Concierge Service
**Responsibility**: grounded chatbot responses, lead qualification, service recommendation, and safe escalation

**Models**: ConversationSession, Message, LLMQuery, QualifiedLead, KnowledgeDocument, KnowledgeChunk

**Endpoints**:
- `POST /api/v1/ai-concierge`
- `GET /api/v1/ai-concierge/[sessionId]`

**Integrations**:
- LLM service (OpenAI Responses API or similar)
- Internal knowledge base service built from approved Growrix content
- CRM service (save conversations, track leads)
- Email service (route high-intent leads to sales)

**Behavior rules**:
- Retrieval is restricted to approved internal content; no open-web tools or uncontrolled knowledge sources.
- When retrieval does not produce a grounded answer, the service returns a no-answer state instead of improvising.
- Responses should include source metadata for frontend rendering and suggested escalation actions when confidence is low or human follow-up is preferred.

---

### Live Chat Service
**Responsibility**: real-time visitor support, escalation to team

**Models**: ChatSession, Message, ChatTranscript, Escalation

**Endpoints**:
- `POST /api/v1/chat/start`
- `GET /api/v1/chat/[sessionId]/messages`
- `POST /api/v1/chat/[sessionId]/message`

**Integrations**:
- Live chat platform (Intercom, Drift, or custom WebSocket)
- WhatsApp service (escalation)
- Email service (session transcript)

---

### Notification Service
**Responsibility**: email, SMS, push notifications for transactional events

**Models**: Notification, NotificationTemplate, NotificationLog

**Integrations**:
- Email service (SendGrid, SES)
- SMS service (optional)
- Push service (optional, browser notifications)

---

### Integration Service
**Responsibility**: manage all third-party integrations, webhooks

**Models**: IntegrationConfig, WebhookLog, IntegrationError

**Integrations**:
- Stripe webhooks
- Zapier webhooks
- CRM webhooks (HubSpot, Pipedrive)

---

## Domain Models

### User
- **id** (UUID)
- **email** (unique)
- **password_hash** (bcrypt)
- **first_name, last_name**
- **phone** (optional)
- **role** (visitor, subscriber, customer, admin)
- **profile_picture_url** (optional)
- **created_at, updated_at**

**Lifecycle**: visitor → subscriber (register) → customer (first purchase) → admin (staff promotion)

---

### Service
- **id, title, slug** (unique)
- **description, service_type** (saas_app, website, mcp_server, automation)
- **pricing_model** (contact, tiered, fixed)
- **base_price, delivery_timeline, support_level**
- **tech_stack, use_cases** (arrays)

---

### Product
- **id, sku** (unique), **title, slug** (unique)
- **description, category** (template, mcp_server, ready_website, mobile_app)
- **price_usd, discount_price_usd** (nullable)
- **file_url** (presigned S3)
- **delivery_method** (instant_download, email_link, manual)
- **support_level, status** (draft, active, discontinued)

---

### Order
- **id, order_number** (unique, human-readable)
- **customer_id** (FK to User, nullable for guests)
- **items** (array of OrderItem)
- **subtotal, tax, discount, total** (USD)
- **payment_status** (pending, succeeded, failed, refunded)
- **payment_method** (stripe_card, apple_pay, google_pay)
- **stripe_transaction_id**
- **fulfillment_status** (pending, fulfilling, delivered, archived)
- **delivery_urls** (product download links)
- **customer_email, name, phone**
- **created_at, completed_at, refunded_at**

---

### Appointment
- **id, visitor_email, visitor_name, visitor_phone**
- **service_id** (FK to Service)
- **preferred_datetime, timezone**
- **duration_minutes** (default 30)
- **status** (inquiry, confirmed, completed, cancelled, no_show)
- **calendar_event_id** (external)
- **notes, internal_notes**
- **follow_up_required, assigned_to**
- **created_at, confirmed_at, completed_at**

---

### ContactInquiry
- **id, visitor_email, visitor_name**
- **subject, message** (content)
- **inquiry_type** (general, support, partnership, other)
- **status** (new, read, responded, closed, spam)
- **assigned_to** (FK to User)
- **response_message, responded_at**

---

## State Machines

### Appointment Lifecycle

```
inquiry
  ├─ confirmed (admin confirms or auto-confirm)
  │   ├─ completed (time passes, marked done)
  │   ├─ no_show (time passes, no completion)
  │   └─ cancelled (visitor or admin cancels)
  └─ cancelled (visitor or admin cancels from inquiry)
```

**State Transitions**:
- `inquiry → confirmed`: admin confirms or auto-confirm via calendar
- `inquiry → cancelled`: visitor or admin cancels
- `confirmed → completed`: time passes, appointment marked done
- `confirmed → no_show`: time passes, never marked completed
- `confirmed → cancelled`: visitor or admin cancels

---

### Order Lifecycle

```
pending (Stripe payment intent created)
  ├─ succeeded (payment captured)
  │   ├─ fulfilling (files being prepared)
  │   │   └─ delivered (customer received product)
  │   └─ refunded (refund issued)
  └─ failed (payment declined or timeout)
```

**Fulfillment Substates**:
- `pending`: awaiting download or manual fulfillment
- `fulfilling`: files being prepared or sent
- `delivered`: customer received product
- `archived`: order older than retention window

---

## Queue & Job Models

### Order Fulfillment Job
- **Trigger**: order moved to `succeeded` state
- **Payload**: order_id, customer_email, product_download_urls, delivery_method
- **Handler**: fulfillment_service
- **Retry**: exponential backoff, max 3 retries
- **Timeout**: 5 minutes

### Appointment Reminder Job
- **Trigger**: scheduled 24 hours before appointment
- **Payload**: appointment_id, customer_email, appointment_datetime
- **Handler**: notification_service
- **Retry**: linear backoff, max 2 retries

### AI Lead Routing Job
- **Trigger**: visitor achieves high intent score
- **Payload**: conversation_session_id, visitor_email, recommended_service_id, lead_score
- **Handler**: CRM service (via Zapier or direct integration)
- **Retry**: exponential backoff, max 3 retries

---

## Webhook Integrations

### Stripe Webhooks
- `payment_intent.succeeded`
- `payment_intent.payment_failed`
- `charge.refunded`
- `customer.subscription.updated`

**Handler**: order_service  
**Retry policy**: Stripe retries for 3 days

---

### Zapier Webhooks
- Order created → fulfillment workflow
- Appointment confirmed → CRM sync

**Handler**: integration_service

---

### CRM Webhooks
- Deal updated, Contact has conversation

**Sync back**: Appointment.assigned_to, lead scoring

---

## Observability

### Logging
- All state transitions logged
- All integration calls logged
- All errors logged with stack trace
- Structured logging (JSON) with `tracing_id`

### Metrics
- Order count, revenue, fulfillment rate by day
- Appointment count, no-show rate by day
- API response time by endpoint (p50, p95, p99)
- Stripe payment success rate
- Email delivery rate, LLM latency/cost

### Tracing
- All requests assigned `tracing_id`
- Distributed tracing across services
- Flame graphs for slow requests

### Alerts
- Payment failures > 5% in 1 hour
- Order fulfillment failures > 10%
- API response time p95 > 1 second
- Critical service outages
- Email delivery errors
- LLM API errors

---

## Reliability Patterns

### Circuit Breaker
- **Stripe API**: fail fast if unavailable
- **Calendar API**: fail fast if booking unavailable
- **Email service**: queue for retry if down
- **LLM API**: fall back to FAQ if chatbot unavailable

### Retry Logic
- **Transient failures**: exponential backoff
- **Permanent failures**: immediate failure, alert
- **Rate limits**: respect Retry-After header

### Fallback Behavior
- **Stripe down**: "payment service unavailable"
- **Calendar down**: "booking unavailable, collect inquiry"
- **LLM down**: show FAQ or "contact sales"
- **Email down**: queue in background, alert if still failing after 1 hour

### Data Consistency
- No eventual consistency for critical state
- Transactional consistency within service
- Cross-service consistency via event-driven model
- Appointments and orders immutable once confirmed/paid
- Refunds are audit trail (append-only)

---

## Implementation Priority

1. **Phase 1 (MVP)**: Auth, Service Catalog, Portfolio, Appointments, Email, Notifications
2. **Phase 2**: Order Service, Stripe, Shop, Fulfillment
3. **Phase 3**: AI Concierge, LLM integration
4. **Phase 4**: Admin Panel, Analytics, CRM integration
5. **Phase 5**: Performance tuning, multi-currency, localization

---

## How to Use This Plan

- **Backend developers**: follow service boundaries, use domain models, implement state machines
- **Frontend developers**: only call endpoints defined in shared contract; never invent state
- **API role**: extend the contract index in Shared Contracts with detailed schemas
- **DevOps**: deploy services with circuit breakers, queue workers, webhook handlers
- **QA**: test state transitions, integration failures, retry logic, edge cases
