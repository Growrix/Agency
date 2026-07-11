# Ownership Matrix

| Area | Foundation Core | Attached Or Imported Template | Operator | Stripe |
| --- | --- | --- | --- | --- |
| Billing client creation | Owns server-only Stripe SDK boundary | No ownership | Supplies environment secrets | Issues API responses |
| Checkout API | Owns `/api/billing/checkout` contract and validation | Calls the endpoint with `offer_key`, `success_url`, and `cancel_url` | Supplies secrets and dashboard catalog | Hosts checkout session |
| Portal API | Owns `/api/billing/portal` contract | Presents manage-billing CTA where needed | Enables Customer Portal in dashboard | Hosts portal session |
| Webhook sync | Owns `/api/webhooks/stripe`, signature verification, idempotency, DB mirroring | No ownership | Registers webhook endpoints per environment | Sends billing events |
| Billing data mirror | Owns `customers`, `subscriptions`, and `invoices` persistence rules | Reads normalized billing state indirectly through attached backend surfaces | Maintains DB access and migrations | Remains billing source of truth |
| Offer catalog semantics | Resolves Stripe prices by `lookup_key` | Chooses which `offer_key` values a template emits | Creates prices and lookup keys in dashboard | Stores products and prices |
| Pricing copy and CTA placement | No ownership | Owns labels, layouts, and offer selection UI | Approves offer strategy | No ownership |
| Success and cancel routes | Validates contract fields | Owns user-facing success and cancel destinations | Ensures route existence in deployed template | Redirects to supplied URLs |
| Monitoring and runbooks | Owns diagnostics, logs, tests, and deployment gates | Participates in attached smoke once wired | Configures alerts and webhook delivery monitoring | Exposes delivery logs |

## Ownership Split Rule
Foundation Core owns payment infrastructure and normalized contracts. Templates own visible pricing UX and the decision to expose a billing journey at all.
