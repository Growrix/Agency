# API Contract Checklist

Before sign-off:

- [ ] Endpoint method + path documented
- [ ] Request body/query Zod schema with required fields
- [ ] Success response shape matches API ai-context envelope
- [ ] Error codes listed (401, 403, 400, 404, 409, 429, 500)
- [ ] Auth requirement explicit (public | Clerk session | admin)
- [ ] Rate limit class noted if public
- [ ] Pagination shape for list endpoints
- [ ] Idempotency key header for side-effect POSTs where applicable
- [ ] Breaking change assessment — version bump or deprecation window
- [ ] Cross-reference `DOC/PROJECT PLAN/Shared Contracts/` entities

## Growrixos conventions

- Base path: `/api/v1/` for domain APIs
- System routes: `/api/health`, `/api/ready`, `/api/revalidate`
- Webhooks: `/api/webhooks/clerk`, `/api/v1/orders/webhook`
