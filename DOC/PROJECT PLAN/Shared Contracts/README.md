# Shared System Contracts

**Contract-first blueprint for the Agency SaaS website.**

This document defines the canonical system surfaces, roles, domain entities, API contracts, integrations, and non-functional requirements that all specialized roles (frontend, backend, security, DevOps, QA) must follow.

---

## Quick Navigation

- **[AI-first entrypoint](#ai-context)**: `ai-context.yaml`
- **[System Architecture](#system-architecture)**: surfaces, roles, entities
- **[API Contract Index](#api-contracts)**: all endpoints
- **[Integration Inventory](#integrations)**: Stripe, WhatsApp, Calendar, Email, AI, Chat, Analytics
- **[Non-Functional Requirements](#nfr)**: performance, security, scalability
- **[Implementation Sequence](#phases)**: 5 phases from MVP to optimization

---

## System Overview

### Surfaces

The system consists of four distinct surfaces, each with specific purposes, routes, authentication requirements, and integrations:

1. **Public Marketing** (`/`, `/blog`, `/blog/[slug]`, `/services`, `/portfolio`, `/pricing`, `/about`, `/faq`, `/contact`)
   - No auth required
   - Public browsing, service discovery, credibility proof
   - Read-only for public users

2. **Commerce** (`/shop`, `/shop/[slug]`, `/checkout`)
   - Optional auth (browsing) or required (checkout)
   - Digital product sales (templates, MCP servers, ready websites, mobile apps)
   - Stripe payment integration
   - Order fulfillment

3. **Conversion** (`/book-appointment`, `/ai-concierge`, `/contact`, `/live-chat`)
   - No auth required
   - Booking inquiries, AI chatbot, contact forms, live support
   - Calendar, WhatsApp, Email, AI/LLM integration

4. **Admin** (internal only)
   - Auth required (admin role only)
   - Service and product management
   - Order and booking management
   - Analytics and settings

---

## Domain Entities & Lifecycle

- **Visitor**: unauthenticated user → discovers → engages → books or purchases
- **Subscriber**: registered user → receives communications → tracks orders/bookings
- **Customer**: completed transaction → accesses order history → potential repeat buyer
- **Service**: branded offering (SaaS, websites, MCP, automation) with pricing and support model
- **Product**: digital item for sale (template, MCP, ready website, mobile app) with SKU and delivery
- **Project**: active custom service engagement with timeline and budget
- **Appointment**: booked consultation with status tracking

---

## Role Model

- **Public**: browse, initiate chat/booking, view shop (no checkout)
- **Subscriber**: public + email comms + inquiry tracking + order history
- **Customer**: subscriber + project access + support + reorder
- **Admin**: full access + manage content + view analytics

---

## Core Invariants

1. **All surfaces follow the same role and permission model** — no surface-specific role reinvention.
2. **Domain entities and lifecycle states are canonical** — defined here, inherited by all roles.
3. **API contracts and event payloads are explicit** — no backend invention allowed.
4. **Integrations are centrally managed** — not scattered across frontend or backend silos.
5. **Frontend must not invent server-backed behavior** — all server flows are defined in the contract.
6. **Backend must not invent UX-critical states** — all stateful flows are documented.

---

## API Contract Index

### Public Endpoints

- `GET /api/v1/services`: list all services
- `GET /api/v1/services/[serviceId]`: service detail with pricing and messaging
- `GET /api/v1/portfolio`: list portfolio projects
- `GET /api/v1/portfolio/[slug]`: portfolio detail with images and testimonials
- `GET /api/v1/shop/categories`: product categories
- `GET /api/v1/shop/products`: list products with filters and pagination
- `GET /api/v1/shop/products/[productSlug]`: product detail with delivery info

### Conversion Endpoints

- `POST /api/v1/appointments`: create booking inquiry
- `GET /api/v1/appointments/[appointmentId]`: retrieve appointment status
- `POST /api/v1/contact`: contact form submission
- `POST /api/v1/ai-concierge`: LLM chat query for FAQ/service questions
- `POST /api/v1/chat/start`: initiate live chat session

### AI Concierge Contract Rules

- The Ask the concierge CTA opens the dedicated `/ai-concierge` chat interface; the launcher and mobile chat entry should route into the same surface.
- The concierge may answer only from approved internal Growrix content sources: services, pricing guidance, FAQs, portfolio proof, shop catalog, booking/contact instructions, and policy copy.
- The concierge must not use open-web browsing or unsupported model knowledge as a response source.
- If the request is outside approved knowledge, the concierge must return a bounded no-answer response and offer escalation to WhatsApp, booking, or contact.
- The backend owns grounding, prompt policy, lead qualification, and source attribution; the frontend owns chat rendering, composer state, and escalation UX.

### Commerce Endpoints

- `POST /api/v1/orders`: create order (Stripe payment processing)
- `GET /api/v1/orders/[orderId]`: order status and delivery tracking
- `POST /api/v1/orders/[orderId]/download`: download digital product

### Subscriber Endpoints

- `GET /api/v1/me`: current user profile
- `POST /api/v1/me/update`: update profile
- `GET /api/v1/me/orders`: order history
- `GET /api/v1/me/appointments`: appointment history

### Admin Endpoints

- `POST/PUT/DELETE /api/v1/admin/services`: manage services
- `POST/PUT/DELETE /api/v1/admin/products`: manage products
- `POST/PUT/DELETE /api/v1/admin/portfolio`: manage portfolio
- `GET /api/v1/admin/orders`, `/appointments`, `/inquiries`: view all
- `POST /api/v1/admin/content/settings`: configure site settings
- `GET /api/v1/admin/analytics`: analytics dashboard

---

## Integration Inventory

| Integration | Purpose | Owner | Contract |
|---|---|---|---|
| **Stripe** | Payment processing | Backend | Webhook integration, order creation |
| **WhatsApp** | Escalation from chat | Backend + Chat | WhatsApp Business API or Zapier |
| **Calendar API** | Availability & booking | Backend | Google Calendar or similar |
| **Email Service** | Transactional & marketing | Backend | SendGrid, SES, or similar |
| **AI/LLM** | Grounded concierge chatbot | Backend | OpenAI Responses API or similar with retrieval over curated internal knowledge only |
| **Live Chat** | Real-time support | Frontend + Backend | Intercom, Drift, or custom |
| **Analytics** | Behavior tracking, conversions | Frontend + Backend | Google Analytics, Mixpanel |
| **Zapier** | Workflow automation | Backend | Order fulfillment, CRM sync |

---

## Non-Functional Requirements

### Performance
- Homepage: < 2s load time
- Product pages: < 1.5s
- API responses: < 500ms
- Shop search: < 200ms

### Availability
- Uptime target: 99.5%
- Graceful degradation if integrations fail
- Offline mode for marketing pages

### Security
- HTTPS on all traffic
- CSRF protection
- XSS prevention
- Role-based access control (RBAC)
- PCI compliance for Stripe
- GDPR-compliant data retention

### Scalability
- Support 10k+ concurrent visitors
- 1000+ products in catalog
- 100+ orders per day peak capacity

### Accessibility
- WCAG 2.1 AA compliance
- Keyboard navigation, screen reader support
- Alt text on all images

### Localization Readiness
- Language switching framework (defer to future)
- Time zone handling for bookings
- Multi-currency support (defer to future)

---

## Implementation Phases

### Phase 1: MVP (Weeks 1–4)
- Public marketing site
- Portfolio showcase
- Booking form with calendar
- Email notifications
- Live chat

### Phase 2: Commerce (Weeks 5–8)
- Product shop
- Stripe checkout
- Order confirmation and delivery
- Customer order history

### Phase 3: AI Concierge (Weeks 9–11)
- Grounded AI chat for FAQ, service, pricing, timeline, and product-fit questions
- Curated knowledge ingestion from approved internal content only
- WhatsApp escalation
- Lead qualification

### Phase 4: Admin Panel (Weeks 12–14)
- Admin dashboard (products, services, portfolio, orders, bookings)
- Analytics and insights

### Phase 5: Optimization (Weeks 15+)
- Performance tuning
- SEO optimization
- A/B testing
- Multi-currency and localization roadmap

---

## Assumptions & Unresolved Questions

### Assumptions
- Stripe account is configured
- Calendar system (Google Calendar or similar) is available
- WhatsApp Business account will be set up
- Email provider is ready
- AI/LLM service is available
- Live chat platform is chosen

### Unresolved
- Will there be a mobile app or PWA?
- Will multi-tenancy support be needed in future?
- Data retention policy for old orders?
- Affiliate/referral system in MVP?
- CRM integration: required now or future?

---

## How to Use This Contract

1. **Frontend role**: Read surfaces, routes, role model, API contracts before designing pages and components.
2. **Backend role**: Read domain entities, API contracts, integrations before defining models and endpoints.
3. **API role**: Extend the contract index, define schemas and event payloads.
4. **Security role**: Inherit role model, permission model, compliance requirements.
5. **DevOps role**: Inherit integrations, non-functional requirements.
6. **QA role**: Inherit implementation sequence, surfaces, critical workflows.

**All roles must reference this contract before diverging into specialized documentation.**
