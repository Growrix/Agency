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

## Webhook (production)

Register in [Clerk Dashboard](https://dashboard.clerk.com):

- Endpoint: `https://<your-domain>/api/webhooks/clerk`
- Events: `user.created`, `user.updated`, `user.deleted`

## Admin access

Set `publicMetadata.role = "admin"` on operator accounts in Clerk Dashboard.

## Verify locally

```bash
npm run dev
```

Open `/`, confirm header Sign in / Sign up, complete sign-up, land on `/dashboard`.
