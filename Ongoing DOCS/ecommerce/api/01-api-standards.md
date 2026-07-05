# API Standards

Document status: API standard
Owner: Backend and API

## Purpose

Define shared rules for ecommerce HTTP APIs.

## Versioning

- Use versioned routes for public or external contracts, such as `/api/v1/...`.
- Breaking response or behavior changes require a new version or documented migration.
- Internal admin endpoints can still follow the same response and error standards.

## Response Shape

```json
{
  "data": {},
  "meta": {},
  "error": null
}
```

Error responses should include stable codes, safe messages, and request correlation where available.

## Standards

- Validate all request bodies, query params, and route params.
- Authenticate before loading protected resources.
- Authorize after resource ownership or role context is known.
- Use idempotency keys for checkout, payment, webhook, refund, and retry-prone mutations.
- Use pagination for collection endpoints.
- Never return secrets or raw provider payloads to clients.

## Money Fields

- Include currency with all money values.
- Prefer minor units in APIs where implementation uses integer money.
- Return display-ready formatted values only as optional presentation helpers.

## Acceptance Criteria

- API errors are predictable and safe.
- Protected endpoints enforce auth and authorization server-side.
- Transactional mutations are idempotent where repeat requests are likely.
