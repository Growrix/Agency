# Environments And Runtime Strategy

Document status: architecture source
Owner: DevOps and architecture

## Purpose

Define how ecommerce runtime environments should be separated and promoted.

## Environments

| Environment | Purpose | Data policy |
| --- | --- | --- |
| Local | Developer work and fast feedback | Local or sanitized seed data only. |
| Preview | Branch-level validation | No production secrets; disposable data. |
| Staging | Production-like release rehearsal | Sanitized or controlled test data. |
| Production | Customer traffic and business operations | Protected live data and monitored changes. |

## Runtime Components

- Web application runtime.
- API/server runtime.
- Database.
- Object storage.
- Cache.
- Queue/worker.
- Search index.
- Payment webhook endpoint.
- Messaging providers.
- Monitoring and logging.

## Promotion Rules

- Staging must pass migrations, smoke tests, checkout tests, and webhook tests before production.
- Production deploys require rollback instructions and release notes for customer-facing changes.
- Secrets must be environment-specific and never copied into documentation or code.
- Provider sandbox and live modes must be visibly separated.

## Acceptance Criteria

- Each environment has a purpose, data policy, and provider mode.
- Release validation includes payment, checkout, auth, and admin smoke paths.
- Rollback and incident visibility exist before production launch.
