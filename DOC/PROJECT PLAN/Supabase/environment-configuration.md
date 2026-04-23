# Environment Configuration: Supabase Across Local & Production

**Scope:** How NEXT_PUBLIC_SITE_URL, Supabase credentials, and app secrets are distributed across environments.

---

## Core Principle

**One Supabase project, multiple environments.**

```
┌──────────────────────────────────────────┐
│ Local Dev (localhost:5000)               │
├──────────────────────────────────────────┤
│ Production (https://growrixos.com)       │
└──────────────────────────────────────────┘
         ↓ (both use same credentials)
┌──────────────────────────────────────────┐
│ Supabase Project: okzrczymtlkaaxlvjnyh   │
│ Database: shared across environments     │
└──────────────────────────────────────────┘
```

---

## Environment Variables Breakdown

### Supabase Credentials (Shared)
These are **identical** in local and production. They point to the same Supabase project and database.

```yaml
# Same in .env.local AND production platform
SUPABASE_URL: https://okzrczymtlkaaxlvjnyh.supabase.co
SUPABASE_ANON_KEY: YOUR_SUPABASE_ANON_KEY
SUPABASE_SECRET_KEY: YOUR_SUPABASE_SECRET_KEY
```

**What they do:**
- `SUPABASE_URL`: Endpoint to connect to Supabase PostgreSQL
- `SUPABASE_ANON_KEY`: Client-side key (public, browser-restricted)
- `SUPABASE_SECRET_KEY`: Server-side key (private, backend only)

**Why identical:**
Both environments need to access the same database for data consistency.

---

### NEXT_PUBLIC_SITE_URL (Environment-Specific)
This variable tells the app where it's currently running.

```yaml
# Local Development (.env.local)
NEXT_PUBLIC_SITE_URL: http://localhost:5000

# Production (.env.production or deployment platform)
NEXT_PUBLIC_SITE_URL: https://growrixos.com
```

**What it controls:**
1. **Session cookies:** Domain and SameSite flags are set based on this URL
2. **OAuth redirects:** (If using third-party auth, redirect back to this URL)
3. **Email links:** Password reset, email verification links use this URL as the base
4. **Logging/monitoring:** Identifies which environment an error came from

**Example:** When a user signs up:
- **Local:** Email contains: `http://localhost:5000/verify?token=xyz`
- **Production:** Email contains: `https://growrixos.com/verify?token=xyz`

---

### App Authentication Secrets (Shared)
These are **identical** and used by the app for session encryption and admin seeding.

```yaml
# Same in .env.local AND production platform
AUTH_JWT_SECRET: YOUR_AUTH_JWT_SECRET
ADMIN_EMAIL: admin@growrixos.com
ADMIN_PASSWORD: YOUR_ADMIN_PASSWORD
```

**What they do:**
- `AUTH_JWT_SECRET`: Encrypts session cookies issued by the app
- `ADMIN_EMAIL` / `ADMIN_PASSWORD`: Seeds initial admin account on first deployment

**Why identical:**
Sessions created locally should be valid in production (if user data is synced).

---

## Local Development Setup

### File: `web/.env.local`
```dotenv
# Environment identifier (local)
NEXT_PUBLIC_SITE_URL=http://localhost:5000

# Points to shared Supabase project
SUPABASE_URL=https://okzrczymtlkaaxlvjnyh.supabase.co
SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
SUPABASE_SECRET_KEY=YOUR_SUPABASE_SECRET_KEY

# App authentication
AUTH_JWT_SECRET=YOUR_AUTH_JWT_SECRET
ADMIN_EMAIL=admin@growrixos.com
ADMIN_PASSWORD=YOUR_ADMIN_PASSWORD

# External services (same across environments)
OPENAI_API_KEY=sk-proj-...
OPENAI_MODEL=o3-mini
RESEND_API_KEY=re_YBW921rV_...
CONTACT_TO_EMAIL=growrixos@gmail.com
CONTACT_FROM_EMAIL=Growrix <hello@growrixos.com>
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=AIzaSyAiDvmPIsjcMdjDbdBGi5GbQGGCAoch7sg
NEXT_PUBLIC_GOOGLE_PLACE_SEARCH_TEXT=Growrix OS, 82, 1 Rd-2, Niekton, Gulshan 1, Dhaka 1212, Bangladesh
NEXT_PUBLIC_GOOGLE_PLACE_ID=ChIJn2bmb6pYVTcR1QwQnQwQnQw
```

### Usage:
```bash
cd web
npm run dev
```

Next.js automatically loads `.env.local` and uses it for development.

---

## Production Deployment Setup

### File: `.env.production` (Template)
Located at `web/.env.production`, but **not used at deploy time**. Instead, set these variables in your deployment platform (Vercel, Railway, Heroku, etc.).

```dotenv
# IMPORTANT: Update this to your actual production domain
NEXT_PUBLIC_SITE_URL=https://growrixos.com

# Same Supabase credentials
SUPABASE_URL=https://okzrczymtlkaaxlvjnyh.supabase.co
SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
SUPABASE_SECRET_KEY=YOUR_SUPABASE_SECRET_KEY

# Same app authentication secrets
AUTH_JWT_SECRET=YOUR_AUTH_JWT_SECRET
ADMIN_EMAIL=admin@growrixos.com
ADMIN_PASSWORD=YOUR_ADMIN_PASSWORD

# Same external services
OPENAI_API_KEY=sk-proj-...
# ... rest of secrets
```

### Deployment Platforms (Examples):

#### Vercel
1. Go to Project Settings → Environment Variables
2. Add each variable from the template above
3. Set the NEXT_PUBLIC_SITE_URL to your production domain
4. Leave SUPABASE_* and other secrets identical to local

#### Railway / Heroku / Others
Follow the platform's documentation for setting environment variables. The principle is the same: set all variables from the template.

---

## Why This Architecture Works

| Aspect | Benefit |
|---|---|
| **Shared database** | Users created locally are visible in production (seamless data flow) |
| **Shared secrets** | Sessions and auth state are portable across environments |
| **Environment-specific URL** | Each deployment identifies itself correctly for cookies and email links |
| **Easy rollback** | If production breaks, revert NEXT_PUBLIC_SITE_URL; same data is accessible from local dev |
| **CI/CD friendly** | Set NEXT_PUBLIC_SITE_URL in CI/CD pipeline, everything else is the same |

---

## Common Mistakes to Avoid

❌ **Don't:** Use different Supabase projects for local and production  
✅ **Do:** Use the same project; differ only in NEXT_PUBLIC_SITE_URL

❌ **Don't:** Change SUPABASE_SECRET_KEY between environments  
✅ **Do:** Keep credentials identical; security comes from RLS and network isolation

❌ **Don't:** Set NEXT_PUBLIC_SITE_URL to an IP address or localhost in production  
✅ **Do:** Use your actual domain (https://growrixos.com)

❌ **Don't:** Commit .env files to git  
✅ **Do:** Use `.env.local` (local only, git-ignored) and platform secrets

---

## Verification Checklist

### Local Environment
- [ ] `.env.local` exists with SUPABASE_URL pointing to okzrczymtlkaaxlvjnyh
- [ ] NEXT_PUBLIC_SITE_URL=http://localhost:5000 (not a real domain)
- [ ] `npm run dev` starts successfully
- [ ] User registration/login works against Supabase

### Production Environment (Before Deploying)
- [ ] Deployment platform has all variables from `.env.production` template
- [ ] NEXT_PUBLIC_SITE_URL is set to your actual domain (https://growrixos.com)
- [ ] SUPABASE_* values are identical to local (same project)
- [ ] Build passes: `npm run build`
- [ ] All tests pass: `npm run test`

### Post-Deployment
- [ ] Access your production domain in browser
- [ ] Test user registration and login
- [ ] Check that email links include correct domain
- [ ] Verify data persists in Supabase (same project as local)

---

## Troubleshooting

### "Invalid domain for session cookie"
**Cause:** NEXT_PUBLIC_SITE_URL doesn't match the actual running domain  
**Fix:** Set NEXT_PUBLIC_SITE_URL to the domain you're accessing (e.g., https://yourdomain.com)

### "Cannot connect to Supabase"
**Cause:** SUPABASE_URL or SUPABASE_SECRET_KEY is incorrect or missing  
**Fix:** Verify credentials in `.env.local` and deployment platform; confirm they match your Supabase project

### "Emails not arriving with correct links"
**Cause:** NEXT_PUBLIC_SITE_URL is wrong; email template uses a different domain  
**Fix:** Update NEXT_PUBLIC_SITE_URL to match the domain users actually visit

### "Production data is different from local"
**Cause:** Using different Supabase projects for local and production  
**Fix:** Ensure both environments have identical SUPABASE_URL, SUPABASE_ANON_KEY, SUPABASE_SECRET_KEY

---

## References

- **Supabase Integration Status:** [integration-status.md](./integration-status.md)
- **Verification Procedures:** [verification-procedures.md](./verification-procedures.md)
- **Project AI Context:** [DOC/PROJECT PLAN/ai-context.yaml](../ai-context.yaml)
