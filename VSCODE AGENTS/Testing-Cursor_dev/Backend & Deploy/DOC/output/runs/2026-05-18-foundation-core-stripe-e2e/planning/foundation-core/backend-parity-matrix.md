# Backend Parity Matrix

| Domain | Coverage In This Plan | Classification | Notes |
| --- | --- | --- | --- |
| Existing Foundation runtime baseline | Already validated outside this run | implemented_now | Auth, content, forms, media, preview, diagnostics, and observability already exist. |
| Stripe billing backend module | Fully specified for implementation | required_before_clone | Checkout, portal, webhook sync, repos, DTOs, and diagnostics must exist before calling Stripe support reusable. |
| Stripe offer resolution contract | Fully specified for implementation | required_before_clone | `offer_key` to Stripe `lookup_key` is the template-safe contract. |
| Template pricing presentation | Intentionally excluded from Foundation ownership | later | Frontend UI remains template-owned and is attached after the backend contract exists. |
| Receipt and lifecycle emails | Optional extension | later | Can be added after the core billing mirror is stable. |
| Metered billing and advanced tax | Explicitly deferred | later | Not required for the first reusable subscription baseline. |
| DevOps and monitoring gates | Fully specified for billing release | required_before_clone | Stripe test/live separation, webhook delivery visibility, and rollback rules are mandatory. |
| Security controls | Fully specified for billing release | required_before_clone | Raw-body verification, idempotency, and no client-owned billing state are mandatory. |
| Automated tests | Fully specified for billing release | required_before_clone | Unit, integration, webhook, and attach smoke coverage are required before claiming readiness. |
