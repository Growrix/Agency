# Frontend Factory

Route agency-grade frontend work to the correct Frontend Production Factory agent.

## Steps

1. Read `.cursor/brain/lane-router.yaml` and `frontend_production_factory` section.
2. Parse user intent from message and any path arguments:

| Intent | Agent / skill |
|--------|----------------|
| Full-stack SaaS bug, API, cross-layer | `senior-saas-developer` |
| Production UI build, DS, Next.js, web/ frontend | `senior-frontend-specialist` |
| Vite / AI Studio / React → Next or HTML | `frontend-system-architect` + `frontend-ui-converter` |
| Copy, SEO, messaging, CMS model | `frontend-content-strategist` |
| Copy-only edit (strings in content files) | `frontend-content-strategist` — **content file only**, no component refactor |
| Phase complete — run gates | `frontend-quality-enforcer` via `/phase-gate` |
| HTML template only | `frontend-architect` |
| HTML → Next migration | `nextjs-migration-architect` + `/migrate-to-next` |

3. Read lane brain + ledger per router (max 7 files total at start).
4. Confirm chosen agent and phase with user only if intent is ambiguous.
5. Execute via chosen agent's skill bundle; update `.cursor/execution/template-tasks.md` or SaaS tasks ledger.

## Rules

- **Scope match** — If the user only asks for text/copy changes, edit content sources (e.g. `web/src/lib/*-content.ts`) and reuse existing components. Do not refactor JSX/CSS unless layout or structure is explicitly broken.
- **Compose safely** — Before wrapping a child component, read what root element it renders (`li`, `button`, etc.). Never nest the same semantic element (e.g. `<li>` inside `<li>`).
- Phase-end gates via `/phase-gate` — not full E2E after every edit
- **Before push** — when user requests push and `web/` changed: run `npm run ci:check --prefix web` from repo root (see `/pre-push-check`). Must exit 0.
- **Validation tier (mid-phase only)** — Copy-only: `ReadLints` + `npm run typecheck` in `web/`. Component/UI: `npm run lint` + `typecheck`. Full bundle is for phase-end and **always before push**.
- Commit at phase completion; never push unless user asks
- Materialize disk artifacts before ledger updates
