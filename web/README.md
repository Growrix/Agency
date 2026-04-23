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

## Run

```bash
npm run dev
```

App runs on [http://localhost:5000](http://localhost:5000).

## Validation

```bash
npm run lint
npm run test
npm run build
npm run test:e2e
```

## Notes

- Auth API uses Supabase Auth when configured and keeps existing API contracts.
- Data persistence uses Supabase Postgres table `public.app_state` when configured.
- Existing routes remain unchanged: integration is adapter-based behind server domain/store layers.
