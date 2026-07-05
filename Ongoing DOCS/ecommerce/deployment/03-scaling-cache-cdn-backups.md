# Scaling Cache CDN Backups

Document status: deployment source
Owner: DevOps and architecture

## Purpose

Define scaling, caching, CDN, background jobs, search performance, and backup requirements.

## Scaling Strategy

- Cache public catalog and content where freshness rules allow.
- Keep cart, checkout, payment, and account data dynamic and authorization-aware.
- Use background jobs for notifications, indexing, exports, cleanup, and retries.
- Use queues for provider calls that do not need synchronous customer confirmation.

## Cache Rules

- Public product/category pages can use ISR or CDN caching with invalidation from catalog events.
- Cart and checkout responses must not be publicly cached.
- Admin APIs must disable shared caching.
- Search cache must respect product lifecycle and availability updates.

## Backups

- Database backups with restore testing.
- Object storage backup or replication for critical assets.
- Search index rebuild plan.
- Provider reconciliation export strategy.

## Performance Targets

- Fast product discovery and PDP render.
- Low checkout API latency.
- Reliable webhook processing under bursts.
- Recoverable queue failures.

## Acceptance Criteria

- Caching does not expose private data or stale checkout state.
- Backups are restorable and tested.
- Critical async jobs have retry, dead-letter, and alert behavior.
