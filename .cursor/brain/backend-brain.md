# Backend Platform Brain — `web/src/server/` + `web/src/app/api/`

Last updated: 2026-06-26
Scope: Growrix OS backend services, API routes, integrations, and data layer.

## Purpose

Session recovery anchor for backend-only work. Update when adding routes, domain modules, integrations, or webhook handlers.

## Layer Map

| Layer | Path | Responsibility |
|-------|------|----------------|
| Route handlers | `web/src/app/api/**/route.ts` | HTTP only — validate, auth gate, delegate |
| Domain | `web/src/server/domain/*.ts` | Business logic, orchestration |
| Data | `web/src/server/data/` | Persistence adapters (Supabase / file store) |
| Config | `web/src/server/config/runtime.ts` | Env contract — **never invent var names** |
| Auth | `web/src/server/auth/` + Clerk | Identity via `@clerk-nextjs-auth` — not Supabase Auth |
| Integrations | `web/src/server/` clients + domain | Stripe, Resend, OpenAI, Lark, Sanity fetch |

## Active Domain Modules

| Module | File | Notes |
|--------|------|-------|
| Catalog | `domain/catalog.ts` | Services, products, portfolio listings |
| Orders | `domain/orders.ts` | Checkout, Stripe webhook mirror |
| Leads | `domain/leads.ts` | Lead capture, scoring |
| Contact | `domain/contact.ts` | Contact form + Resend |
| Appointments | `domain/appointments.ts` | Booking flow |
| Newsletter | `domain/newsletter.ts` | Subscription |
| Conversations | `domain/conversations.ts` | AI concierge sessions |
| Commerce emails | `domain/commerce-emails.ts` | Order/fulfillment email |
| Downloads | `domain/downloads.ts` | Signed download URLs |
| Notifications | `domain/notifications.ts` | Lark hot-lead alerts |
| Service requests | `domain/service-requests.ts` | Product-led service requests |

## API Surface (grouped)

### System

- `/api/health`, `/api/ready`
- `/api/contact`, `/api/preview`, `/api/preview/disable`, `/api/revalidate`
- `/api/cron/warm-cache`

### Webhooks

- `/api/webhooks/clerk` — Clerk user lifecycle (Clerk signing secret)
- `/api/v1/orders/webhook` — Stripe checkout events

### V1 Public

- Auth (legacy JWT paths coexist with Clerk migration): `/api/v1/auth/login|logout|register`
- Commerce: `/api/v1/shop/*`, `/api/v1/orders/*`, `/api/v1/me/*`
- Content: `/api/v1/services/*`, `/api/v1/portfolio/*`
- Engagement: `/api/v1/contact`, `/api/v1/newsletter`, `/api/v1/appointments/*`, `/api/v1/leads`, `/api/v1/events/track`
- AI: `/api/v1/ai-concierge`, `/api/v1/chat/start`
- Utilities: `/api/v1/cta/whatsapp`, `/api/v1/downloads/*`, `/api/v1/service-requests`
- Observability: `/api/v1/observability/errors`

### V1 Admin (product-led)

- `/api/v1/admin/analytics`, `appointments`, `downloads`, `funnel`, `inquiries`, `leads`, `licenses`, `notifications`, `orders`, `portfolio`, `products`, `service-requests`, `services`

### Preview / templates

- `/api/website-templates-html-preview/[templateSlug]`
- `/api/html-business-profiles/[templateSlug]`

Full route list: `memories/repo/site-brain.md` (sync on major changes).

## Integration Ownership

| Provider | Role | Env source | Skill |
|----------|------|------------|-------|
| Clerk | Auth / sessions | `runtime.ts` → `clerk.*` | `@clerk-nextjs-auth` |
| Supabase | PostgreSQL persistence | `runtime.ts` → `supabase.*` | `@integration-platform` |
| Stripe | Payments + webhooks | `runtime.ts` → `stripe.*` | `@integration-platform` |
| Resend | Transactional email | `runtime.ts` → `contact.resendApiKey` | `@integration-platform` |
| OpenAI | AI concierge | `runtime.ts` → `openAi.*` | `@integration-platform` |
| Lark | Internal ops alerts | `runtime.ts` → `notifications.*` | `@integration-platform` |
| Sanity | CMS (server fetch) | Studio + server adapters | `@integration-platform` |

Machine-readable catalog: `.cursor/brain/integration-catalog.yaml`

## Active Backend Work

_None in progress. Update when a backend phase starts._

Template when active:

```markdown
### Backend phase: [P0–P6 label]
- Started: YYYY-MM-DD
- Scope doc: DOC/PROJECT PLAN/... or integration-plan output
- Domain/routes touched: list
- Integrations: list
- Ledger task IDs: T###
```

## Context Recovery Read Order

1. `.cursor/brain/lane-router.yaml` → `backend_platform` lane
2. This file
3. `.cursor/brain/integration-catalog.yaml`
4. `DOC/PROJECT PLAN/ai-context.yaml`
5. `DOC/PROJECT PLAN/Backend/ai-context.yaml` or `API and Data/ai-context.yaml` per task
6. `DOC/PROJECT PLAN/Tasks/tasks.md`
7. `@senior-backend-devops-developer` skill bundle (max 7 total at start)

## Handoff Gates

- New API surface → `@api-contract-architect` before implementation
- Provider wiring → `@integration-platform` + `/integration-plan` env checklist
- Clerk identity → `@clerk-nextjs-auth` — never reimplement in backend skill
- Phase complete → `@backend-quality-enforcer` via `/phase-gate-backend`
- UI-heavy scope → `@senior-frontend-specialist`
- Cross-layer without backend dominance → `@senior-saas-developer`
