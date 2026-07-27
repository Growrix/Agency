# Sanity Server — Growrixos Playbook

**Role:** CMS content fetch + revalidation — editorial surfaces.

## Env vars (typical)

| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Project ID |
| `NEXT_PUBLIC_SANITY_DATASET` | Dataset |
| `SANITY_API_READ_TOKEN` | Server preview/draft reads |

Confirm against Studio config and `web/src/server/sanity/`.

## Routes

- `POST /api/revalidate` — on-demand ISR

## Rules

- Content ownership: blog, portfolio, shop editorial — not transactional orders
- Server adapters: `web/src/server/sanity/`
- Studio isolated in `studio/` — separate deploy

## Repo stub

`DOC/knowledge/integration-rules/cms/sanity-server.yaml`
