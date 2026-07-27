# Release Checklist

## Pre-deploy

- [ ] All open blockers in `DOC/PROJECT PLAN/Tasks/tasks.md` reviewed
- [ ] Env vars enumerated vs Vercel project settings
- [ ] Web and Studio pipelines isolated
- [ ] `@backend-quality-enforcer` steps 1–10 pass for release scope
- [ ] No secrets in client bundles or logs

## Deploy verify (web)

- [ ] `npm run health:check` passes locally
- [ ] `GET /api/health` → 200
- [ ] `GET /api/ready` → 200
- [ ] One commerce path smoke
- [ ] Clerk sign-in route loads

## Post-deploy

- [ ] Stripe webhook endpoint registered (if commerce)
- [ ] Clerk webhook endpoint registered
- [ ] Sanity revalidate secret configured (if CMS)

## Rollback

- Document previous Vercel deployment ID
- Revert env changes in Vercel dashboard if deploy-related
- Notify via tasks.md log entry

## Remote actions

Push / production deploy — **user explicit request only**.
