# Growrix Agency Web

Next.js App Router frontend + API surface for the Agency platform.

## Local setup

1. Install dependencies:

```bash
npm install
```

2. Create environment file from template:

```bash
cp .env.example .env.local
```

3. Configure Supabase (recommended for production-like auth + db):
	- Set `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `SUPABASE_SECRET_KEY`
	- Run [supabase/schema.sql](supabase/schema.sql) in your Supabase SQL editor

	Notes:
	- `SUPABASE_ANON_KEY` maps to the dashboard publishable key.
	- `SUPABASE_SECRET_KEY` maps to the dashboard secret key.
	- `SUPABASE_SERVICE_ROLE_KEY` is still supported as a legacy alias if you are using older Supabase credentials.

If Supabase variables are not set, the server falls back to local file persistence under `.data/agency-db.json`.

4. Configure Sanity CMS (optional, for blog content management):
	- Set `SANITY_PROJECT_ID` and `SANITY_DATASET`
	- Optionally set `SANITY_API_TOKEN` for private datasets
	- Keep `SANITY_API_VERSION` pinned (default: `2025-01-01`)

If Sanity variables are not set or Sanity is unavailable, the blog automatically falls back to static content in `src/lib/content.ts`.

## Run

```bash
npm run dev
```

App runs on [http://localhost:5000](http://localhost:5000).

The local dev and build scripts intentionally use Next.js Webpack mode for reliable execution in this workspace's Windows environment, where Turbopack native bindings are not loading correctly.

For mobile testing on the same LAN, the dev config now auto-allows the machine's active local IPv4 addresses for Next.js development origins. Restart the dev server after your IP changes so the updated origin list is picked up.

## Validation

```bash
npm run lint
npm run test
npm run build
npm run test:e2e
```

On this Windows workspace, `npm run build` uses `next build --webpack` for the same native-binding reason as local dev.

Vitest scripts now use `--configLoader runner` to avoid local rolldown config-bundling failures on this Windows environment.

## Notes

- Auth API uses Supabase Auth when configured and keeps existing API contracts.
- Data persistence uses Supabase Postgres table `public.app_state` when configured.
- Existing routes remain unchanged: integration is adapter-based behind server domain/store layers.
- Blog content uses Sanity CMS when configured, with automatic static fallback.
