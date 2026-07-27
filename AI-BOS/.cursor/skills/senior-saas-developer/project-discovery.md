# Project Discovery — Option C

Runtime-first discovery protocol. The skill bundle holds condensed principles; project-specific knowledge lives in the target repo and is loaded when found. Never assume a fixed docs tree or integration catalog.

## Purpose

Establish enough grounded context to audit, plan, or execute safely without inventing integrations, env vars, APIs, or stack choices.

## When to Run

Always at the start of a material `@senior-saas-developer` session, before current-state audit and before any code edits.

## Project Root Resolution

Resolve in this order:

1. Explicit user-supplied path or argument
2. Nearest project root from active editor file (look for `.git`, `package.json`, workspace markers)
3. Terminal cwd when clearly tied to the request
4. Workspace root when request is unambiguous

If more than one root is plausible and the choice affects writes, ask one concise question. Call `move_agent_to_root` MCP once root is confirmed and it differs from workspace cwd.

## Discovery Scan Order

Run scans from `project_root`. Use Read, Glob, and Grep — do not assume files exist.

### 1. Identity and scripts

| Target | Look for |
|--------|----------|
| `package.json` | Scripts: `dev`, `build`, `test`, `lint`, `typecheck` |
| `pnpm-workspace.yaml`, `turbo.json`, `nx.json` | Monorepo layout |
| `pyproject.toml`, `go.mod`, `Cargo.toml` | Non-Node primary stack |
| `README.md`, `README` | Setup, env, architecture overview |

Record: primary package manager, dev command, build command, test command.

### 2. Documentation roots

Scan for governed docs (first match wins for planning; load all found for context):

| Path pattern | Typical contents |
|--------------|------------------|
| `DOC/` | Plans, specs, validation, knowledge bases |
| `docs/` | User/dev documentation, ADRs, plans |
| `.cursor/rules/` | Project conventions and constraints |
| `.cursor/plans/` | Cursor-native plans |
| `docs/plans/`, `planning/` | Ad-hoc plan artifacts |

Record: docs root path, active plan location, README pointers.

### 3. Environment contract

| Target | Look for |
|--------|----------|
| `.env.example`, `.env.sample`, `env.example` | Required var names |
| README env sections | Setup instructions |
| Config files referencing `process.env`, `env(` | Implicit var usage |

Record: enumerated env vars with present/missing status. Never invent var names — report unclear contracts as `missing_knowledge`.

### 4. Frontend surface

| Target | Look for |
|--------|----------|
| `app/`, `pages/`, `src/app/`, `src/pages/` | Route structure |
| `components/`, `src/components/` | UI layer |
| `tailwind.config.*`, design-system docs | Styling conventions |
| `next.config.*`, `vite.config.*` | Framework and build |
| Public/marketing route dirs | SEO-relevant pages |

Record: framework, router type, design system location, changed-surface relevance.

### 5. Backend surface

| Target | Look for |
|--------|----------|
| `api/`, `app/api/`, `routes/`, `src/server/` | API routes |
| `prisma/`, `drizzle/`, `migrations/`, `supabase/` | Data layer |
| `middleware.*`, auth config | Security boundaries |
| OpenAPI/Swagger specs | API contracts |

Record: API style, ORM/database, auth provider (from docs/deps only).

### 6. Integrations

Discover from project evidence only:

- `package.json` dependencies (stripe, clerk, resend, etc.)
- Webhook route directories
- Integration docs in `DOC/` or `docs/`
- `.cursor/rules/` mentioning providers

Do not assume providers not found in project files. List discovered integrations and flag unverified ones as `missing_knowledge`.

### 7. Tests and CI

| Target | Look for |
|--------|----------|
| `**/*.test.*`, `**/*.spec.*`, `__tests__/` | Test files |
| `vitest.config.*`, `jest.config.*`, `playwright.config.*` | Test runners |
| `.github/workflows/`, CI config | Automated gates |

Record: test commands, critical path coverage, CI expectations.

### 8. Git and task state

| Target | Look for |
|--------|----------|
| `.git/` | Repo presence |
| `tasks.md` at project root | Active ledger |
| Legacy task trackers in docs | Historical context only |

Follow `@task-ledger`; canonical ledger is `<project_root>/tasks.md`.

## Discovery Report Template

Emit as part of Current-State Audit:

```markdown
### Discovery Summary
- **project_root:** <absolute path>
- **stack:** <discovered primary stack or unknown>
- **package manager:** <npm|pnpm|yarn|other|unknown>
- **dev command:** <script or none>
- **build command:** <script or none>
- **test command:** <script or none>
- **docs root:** <path or none>
- **plan location:** <path or none>
- **env vars (required):** <list or missing_knowledge>
- **frontend root:** <path or N/A>
- **backend root:** <path or N/A>
- **integrations (verified):** <list from project evidence>
- **integrations (unverified):** <missing_knowledge items>
```

## Anti-Hallucination Rules

- If a file or integration is not found, say so — do not fill gaps with defaults.
- Prefer README and `.env.example` over assumptions from dependency names alone.
- When dependency suggests a provider (e.g. `@clerk/nextjs`), still verify config files or docs before claiming it is active.
- Report `missing_knowledge` with exact item name and why it blocks progress.
- For external blockers, follow `@system-builder` External Input Intake Protocol when user prefers Bangla intake.

## Monorepo Handling

When monorepo markers exist:

1. Identify which package owns the requested behavior
2. Resolve write target before edits
3. Run discovery per relevant package root
4. If ambiguous, block with `SENIOR_DEV_REPO_TARGET_AMBIGUOUS`

## Minimum Viable Discovery

For small, well-scoped requests (single-file fix, explicit path), minimum scan:

- Confirm `project_root`
- Read target file and immediate dependencies
- Check `package.json` scripts if Node project
- Read `tasks.md` if present

Still required: audit statement in output even when scope is narrow.

## After Discovery

1. Complete full current-state audit (workflow Phase 1)
2. Classify working mode
3. Load domain-specific checks from [knowledge/domain-index.md](knowledge/domain-index.md)
4. Load project docs surfaced by discovery before planning or editing
