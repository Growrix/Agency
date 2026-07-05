# Suite Rules

Document status: governance source
Owner: Documentation governance

## Purpose

Define the rules that keep this ecommerce documentation suite maintainable, implementation-ready, and safe for AI/MCP consumption.

## Folder Scope Rules

- Ecommerce blueprint documentation lives under `Ongoing DOCS/ecommerce`.
- Do not place app code, package files, environment files, generated assets, or build output in this suite.
- Cross-reference external implementation paths only when necessary; keep source decisions here.

## Documentation Rules

- Each document owns one clear decision area.
- Avoid copying long rules into multiple docs; link or reference the owning doc instead.
- Use numbered, kebab-case filenames for stable retrieval.
- Update `00-suite-map.md` when documents are added, renamed, or removed.
- Update `execution/tasks.md` when phase scope, readiness, or acceptance changes.

## Feature Ownership Rules

- Business behavior starts in `handbook/` or `blueprint/`.
- Persistent state starts in `database/`.
- Client-server behavior starts in `api/`.
- User-visible behavior starts in `frontend/`.
- Stateful business implementation starts in `backend/`.
- Access control starts in `auth/` and `security/`.
- Release confidence starts in `testing/` and `deployment/`.

## Naming Rules

- Use stable domain nouns: product, variant, cart, checkout, order, payment, refund, shipment, customer, admin.
- Use consistent status names across docs and APIs.
- Event names use lowercase dot notation, such as `order.completed`.
- Permission names should use resource-action format, such as `orders.refund`.

## Security Rules

- Money, inventory, auth, payment, and admin decisions are server-side.
- UI hiding is not authorization.
- Admin mutations require actor, permission, and audit trail.
- Webhooks require signature verification and idempotency.
- Secrets and sensitive tokens never appear in docs, logs, client payloads, or screenshots.

## UI/UX Rules

- Customer-facing ecommerce flows must include loading, empty, error, success, and recovery states.
- Checkout must explain recoverable failures clearly.
- Mobile behavior is first-class, not a simplified afterthought.
- Accessibility is part of definition of done.

## MCP Agent Rules

- Read `00-suite-map.md` first.
- Load only the smallest domain docs required for the task.
- Reconcile doc conflicts before implementation.
- Do not infer missing policy from code; update the source doc first.
- Keep execution tasks linked to source docs.

## Acceptance Criteria

- Contributors can identify the source-of-truth doc for any ecommerce decision.
- AI agents can retrieve compact, domain-specific context.
- Documentation updates remain traceable, scoped, and consistent.
