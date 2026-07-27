# Third-Party Integration Patterns

Load this file in **P4 Integration** only.

## Stack awareness (Growrixos web/)

| Service | Typical use | Config source |
|---------|-------------|-----------------|
| Clerk | Auth, sessions | env + `@clerk-nextjs-auth` skill |
| Sanity | CMS content | env, studio isolated app |
| Stripe | Checkout, billing | env, server routes |
| Supabase | Database (not auth) | env, Prisma |
| Resend | Transactional email | env |
| shadcn/ui | UI primitives | `components/ui/`, design tokens |

## Integration rules

1. Read `.env.example` — never invent env var names
2. Use existing wrappers/hooks before adding dependencies
3. Presentation in components; secrets and server logic in route handlers
4. Clerk: follow project Clerk migration docs when in `web/`
5. shadcn: extend tokens — do not override with one-off CSS

## UI integration checklist

- [ ] Loading, error, empty states for async UI
- [ ] Focus-visible and keyboard paths
- [ ] Mobile layout for payment/auth flows
- [ ] No secrets in client bundles

## When blocked on credentials

Stop and request from user. Follow `@system-builder` Bangla external-input protocol if preferred.

## Handoff

Complex API/backend wiring → `@senior-saas-developer`.
