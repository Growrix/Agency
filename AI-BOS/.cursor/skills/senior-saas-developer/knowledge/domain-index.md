# Domain Index — Senior SaaS Developer

Maps work types to discovery targets, validation checks, and project doc locations. Load project-local docs when discovery finds them; this index does not embed project-specific paths or provider catalogs.

## How to Use

1. After [project-discovery.md](../project-discovery.md), identify which domains the request touches.
2. For each domain, load project docs if present (see "Load if present" columns).
3. Run listed validation checks before declaring completion.
4. Report `missing_knowledge` for any domain that cannot be verified from project evidence.

---

## Frontend / UI

**Triggers:** Component, page, layout, styling, client-side logic, public marketing surface changes.

**Load if present:**

- `.cursor/rules/` frontend or UI rules
- Design system docs (`design-system/`, Storybook config, component README)
- Frontend planning docs in project `DOC/` or `docs/`
- Framework config (`next.config.*`, `vite.config.*`)

**Discovery targets:**

- Route directories (`app/`, `pages/`, `src/routes/`)
- Shared components and layout shells
- CSS/styling approach (Tailwind, CSS modules, styled-components)
- i18n/locale config if multi-language

**Validation checks:**

- Responsive/mobile at common breakpoints (375px, 768px, 1280px or project-defined)
- Accessibility: semantic elements, form labels, keyboard focus, alt text, aria where needed
- SEO on public pages: title, meta description, h1 hierarchy, canonical if applicable
- Linter and typecheck on touched files (QG1)
- Visual regression only if project docs require it — not a default portable gate

---

## Backend / API

**Triggers:** Route handlers, server actions, middleware, background jobs, webhooks.

**Load if present:**

- API rules in `.cursor/rules/` or project docs
- OpenAPI/Swagger specs
- Auth configuration docs
- Webhook handler documentation

**Discovery targets:**

- API route directories
- Middleware and auth guards
- Request/response types or schemas (Zod, Pydantic, etc.)
- Error handling conventions

**Validation checks:**

- Contract correctness for changed endpoints
- Auth boundaries enforced on protected routes
- Input validation on changed handlers
- Security: no secrets in code, no SQL injection patterns in changed queries
- Performance: no obvious N+1 or unbounded fetches in changed code
- Regression: existing API tests pass (QG3)

---

## Data / Database

**Triggers:** Schema changes, migrations, queries, ORM models, seed data.

**Load if present:**

- Database rules in project docs
- Migration README or schema docs
- ORM config (`prisma/schema.prisma`, drizzle config, etc.)

**Discovery targets:**

- Migration directories and pending migrations
- ORM schema files
- Connection config and pool settings
- Seed/fixture scripts

**Validation checks:**

- Migration applies cleanly (or ORM push equivalent per project docs)
- Queries respect existing constraints and indexes
- No breaking schema change without user approval
- Data layer tests pass when present

---

## Integrations

**Triggers:** Third-party providers (auth, payments, email, analytics, storage, webhooks).

**Load if present:**

- Integration docs in `DOC/` or `docs/`
- Provider SDK config files
- Webhook route handlers and signature verification code

**Discovery targets:**

- `package.json` / lockfile dependencies
- Env vars in `.env.example` tied to providers
- Webhook endpoints in API routes
- Inngest/Trigger/QStash or queue config if present

**Validation checks:**

- Provider behavior verified against project docs — never assumed from skill bundle
- Webhook signature verification present when webhooks are touched
- Env vars for provider enumerated (QG4)
- Unverified providers listed as `missing_knowledge`

**Never:** Invent provider choice, API version, or webhook secret location.

---

## Auth

**Triggers:** Login, signup, session, RBAC, protected routes, middleware auth.

**Load if present:**

- Auth provider docs in project
- RBAC/permissions matrix
- Session/cookie configuration

**Discovery targets:**

- Auth middleware and session config
- Provider SDK usage (Clerk, NextAuth, Supabase Auth, etc.) — from project files only
- Protected route patterns

**Validation checks:**

- Protected routes remain protected after changes
- Public routes do not leak private data
- Auth entry flow smoke check when auth exists (QG3)

---

## DevOps / Runtime (local only)

**Triggers:** Build config, dev server, env setup, local scripts — not remote deploy.

**Load if present:**

- README setup section
- Docker Compose or local infra docs
- CI workflow files (for parity awareness, not deploy execution)

**Discovery targets:**

- `package.json` scripts, Makefile, task runners
- `.env.example`
- Docker/devcontainer config

**Validation checks:**

- Build passes (QG2)
- Dev server boots after build/repair (QG2)
- Required env vars documented and present or reported missing (QG4)

**Out of scope:** Production deploy, DNS, CDN, remote secrets — user or future deploy lane.

---

## Testing / QA

**Triggers:** Any material code change; explicit verify or audit modes.

**Load if present:**

- Testing rules in project docs
- CI workflow test steps
- Critical path declarations in plans

**Discovery targets:**

- Test config files
- Test directory layout
- Coverage config if present

**Validation checks:**

- QG3 test + smoke
- QG8 non-placeholder tests for declared critical paths
- Verify-only mode respects QG5

---

## Documentation

**Triggers:** Behavior, API, command, or contract changes.

**Load if present:**

- Existing docs at discovered docs root
- CHANGELOG or release notes conventions

**Validation checks:**

- README setup still accurate when scripts/env changed
- API docs updated when endpoints changed
- Plan parity when locked plan exists (QG7)

---

## Planning / Architecture

**Triggers:** Cross-layer features, net-new modules, refactors spanning multiple domains.

**Load if present:**

- Active plan in `DOC/PROJECT PLAN/`, `docs/plans/`, `.cursor/plans/`
- ADRs, architecture overviews

**Validation checks:**

- Plan exists before code for under-documented architectural scope
- QG7 parity when executing locked plan
- Conflicts between plan and user request surfaced to user

---

## System Governance (defer)

**Triggers:** User asks to create/modify skills, rules, hooks, registries, or lane architecture.

**Action:** Block with `SENIOR_DEV_SYSTEM_SCOPE_DRIFT`; hand off to `@system-builder`. Do not execute in this skill.

---

## Domain Coverage Matrix

| Request type | Domains to activate |
|--------------|---------------------|
| UI bug fix | Frontend |
| New API endpoint | Backend, Data (if persistence), Testing |
| Full-stack feature | Frontend, Backend, Data, Integrations (if any), Testing, Documentation |
| Payment webhook | Backend, Integrations, Testing |
| Env/setup fix | DevOps/Runtime |
| Readiness audit | All discovered domains |
| Verify-only pass | Testing, DevOps/Runtime |

---

## missing_knowledge Template

When a domain cannot be verified:

```markdown
- **item:** <env var | API | integration | config path>
- **domain:** <Frontend | Backend | ...>
- **why needed:** <blocks plan | blocks implementation | blocks validation>
- **checked:** <paths searched>
```
