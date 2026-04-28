---
document_type: role-scope-plan
role: api-and-data
scope: cms-content-operations
parent_plan: DOC/PROJECT PLAN/cms-content-operations-e2e-plan.md
status: planning-ready
last_updated: 2026-04-28
---

# API And Data CMS Content Operations Plan

## Purpose
- Lock the source-of-truth boundaries, API envelopes, webhook flows, and migration rules for the CMS/content-operations rollout.
- Prevent ambiguity between Sanity-managed editorial content and PostgreSQL-managed operational data.

## Canonical Inputs
- `DOC/PROJECT PLAN/cms-content-operations-e2e-plan.md`
- `DOC/PROJECT PLAN/API and Data/ai-context.yaml`
- `DOC/PROJECT PLAN/Admin Dashboard/cms-content-operations-admin-dashboard.md`
- `DOC/PROJECT PLAN/Security/cms-content-operations-security.md`

## Source-Of-Truth Matrix

| Domain | Source of truth | Key documents or tables | Primary consumers | Notes |
|---|---|---|---|---|
| Blog content | Sanity | `blogPost`, `author`, `category` | public blog routes | Existing model remains primary |
| Services content | Sanity | `servicePage` | services routes, AI knowledge | Preserve fixed route map |
| Portfolio content | Sanity | `caseStudy` | portfolio routes, admin catalog status views | References service and proof relationships |
| Shop merchandising content | Sanity | `shopCategory`, `shopItem` | shop routes, homepage merchandising, admin catalog status views | Separate editorial merchandising from order state |
| FAQ and singleton marketing content | Sanity | `faqItem`, `homePage`, `aboutPage`, `siteSettings` | homepage, FAQ, about, shared site sections | Singletons must remain normalized into frontend view models |
| Newsletter issues and templates | Sanity | `newsletterIssue`, `newsletterTemplate` | admin newsletter operations | Editorial content only |
| Subscribers and unsubscribe state | PostgreSQL | `newsletter_subscribers`, `newsletter_unsubscribes` | newsletter admin ops, public subscribe API | Never store subscriber lifecycle in Sanity |
| Send logs and delivery outcomes | PostgreSQL | `newsletter_campaign_sends` | admin newsletter ops, audit surfaces | Required for operator visibility |
| Orders, inquiries, appointments, users, audit | PostgreSQL | existing operational tables | public and admin APIs | Remain outside CMS |

## Required Contract Additions

### Public Read Layer
- Add normalized query adapters that read Sanity content and emit stable view models to existing routes.
- Preserve current response envelopes for any public API surfaces that become CMS-backed.
- Keep static fallback compatibility until parity is verified route by route.

### Admin And Operational APIs
- Plan for stable admin contracts covering:
  - shop content create, update, publish, unpublish, archive, and media lifecycle actions
  - portfolio content create, update, publish, unpublish, archive, and media lifecycle actions
  - newsletter subscriber status, assignment, note, unsubscribe, and send-log reads
  - inquiry and booking assignment, note, and status transition writes
- Every new or changed endpoint must preserve the standard success and error envelopes in `ai-context.yaml`.

### Webhook And Revalidation Contracts
- Sanity publish and unpublish events must authenticate before triggering cache invalidation.
- Revalidation contracts must map content changes to exact route sets instead of broad global invalidation.
- Publication events should be recorded in a server-authoritative log if admin auditability requires replay or review.

## Planned PostgreSQL Additions
- `newsletter_subscribers`
  - subscriber identity
  - consent source and timestamp
  - status (`active`, `unsubscribed`, `bounced`, `suppressed`)
- `newsletter_unsubscribes`
  - subscriber reference
  - token or signed-request reference
  - reason and timestamp
- `newsletter_campaign_sends`
  - issue/template reference
  - subscriber reference
  - provider status
  - delivery timestamp and failure details
- `content_publication_events`
  - content type
  - content identifier
  - action (`preview`, `publish`, `unpublish`, `revalidate`)
  - actor and timestamp

## Compatibility Rules
- Preserve existing API envelopes, request IDs, and error semantics.
- Keep current file-backed compatibility mode only as a local-development fallback during migration.
- Do not make frontend components parse raw CMS documents or mixed operational payloads.
- Keep order, appointment, inquiry, and auth records out of Sanity.

## Migration And Backfill Sequence
1. Seed Sanity documents from current static content modules for portfolio, shop, services, FAQ, homepage, and about.
2. Add PostgreSQL newsletter lifecycle tables before newsletter campaign send workflows are introduced.
3. Introduce normalized query adapters and revalidation flow while static fallback remains available.
4. Remove obsolete fallback branches only after regression evidence is captured.

## File Targets For Future Implementation
- `web/src/server/domain/catalog.ts`
- `web/src/server/domain/newsletter.ts`
- `web/src/server/data/schema.ts`
- `web/src/server/sanity/**`
- `web/src/app/api/revalidate/route.ts`
- `web/src/app/api/v1/admin/**`
- `web/src/app/api/v1/newsletter/route.ts`

## Exit Criteria
- Every CMS-managed surface has an explicit source-of-truth decision.
- Newsletter lifecycle storage is defined in PostgreSQL before operator features start.
- Webhook and revalidation behavior is documented tightly enough that builders do not invent contracts during implementation.