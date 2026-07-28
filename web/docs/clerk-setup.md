# Clerk setup — Growrix OS `web/`

Linked Clerk application: `app_3FlyfqLmY1Bp3okOLCmbtF8rTlQ`  
Frontend API: `https://generous-lioness-64.clerk.accounts.dev`

## One-time CLI setup (operator)

The project ships `clerk` as a devDependency and links to `app_3FlyfqLmY1Bp3okOLCmbtF8rTlQ` via `web/.clerk/config.json`. **Do not run `clerk init`** on this repo — P11 already wired `proxy.ts`, providers, webhooks, and public routes; init would overwrite custom middleware.

From `web/` (interactive terminal required for browser login):

```bash
npm run clerk:login
npm run clerk:env
npm run clerk:doctor
```

Or the bundled script after login:

```bash
npm run clerk:setup
```

`clerk env pull` merges keys into `.env.local` without removing existing vars.

Do not commit `.env.local`. After pull, confirm these keys exist (names only):

- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
- `CLERK_SECRET_KEY`
- `CLERK_WEBHOOK_SIGNING_SECRET`

Recommended public URLs (already defaulted in code):

```
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
```

## Production deployment (required)

Clerk only serves `clerk-js` for origins listed on the instance. Localhost is allowlisted by default; production domains are **not**.

### Symptom

Browser console on `https://www.growrixos.com`:

```
ClerkRuntimeError: Failed to load Clerk
(code="failed_to_load_clerk_js_timeout" | "failed_to_load_clerk_js")
```

Script URL looks like:

`https://generous-lioness-64.clerk.accounts.dev/npm/@clerk/clerk-js@5/dist/clerk.browser.js`

Sign in / Sign up UI appears blank because `<SignIn>` / `<SignUp>` wait for clerk-js. Local `npm run dev` may still work.

### Fix — Allowed origins (mandatory)

In [Clerk Dashboard](https://dashboard.clerk.com) → the instance that owns the publishable key → **Allowed origins** (sometimes labeled Domains / Satellite domains):

1. Add `https://growrixos.com`
2. Add `https://www.growrixos.com`
3. Keep `http://localhost:3000` (and any preview origins you use)

Hard-reload `/sign-in` after saving. No code deploy is required for this step alone.

### Recommended — Production (live) instance

The current Frontend API (`*.clerk.accounts.dev`) is a **test** instance (`pk_test_…`). For production:

1. Create a Clerk **Production** instance and copy `pk_live_…` + `sk_live_…`.
2. Set those keys on the Vercel **Production** environment (Preview/Development can keep `pk_test_…`).
3. Redeploy — `NEXT_PUBLIC_*` values are baked at build time.
4. Register the live webhook endpoint (below) with the live signing secret.

CSP in `web/next.config.ts` already allowlists `https://*.clerk.accounts.dev` and `https://*.clerk.com`.

## Webhook (production)

Register in [Clerk Dashboard](https://dashboard.clerk.com):

- Endpoint: `https://www.growrixos.com/api/webhooks/clerk`
- Events: `user.created`, `user.updated`, `user.deleted`

## Admin access

Set `publicMetadata.role = "admin"` on operator accounts in Clerk Dashboard.

## Verify locally

```bash
npm run dev
```

Open `/`, confirm header Sign in / Sign up, complete sign-up, land on `/dashboard`.

## Verify production

1. Open `https://www.growrixos.com/sign-in` — Clerk card must render (no `failed_to_load_clerk_js` in DevTools).
2. If clerk-js is blocked, `/sign-in` shows a recovery panel with Retry + alternate login (code hardening in `ClerkLoadGuard`).
3. Complete sign-in → land on `/dashboard`.
