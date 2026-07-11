# Backend Factory

Route backend API, integration, and DevOps work to the Backend & DevOps Factory.

## Steps

1. Read `.cursor/brain/lane-router.yaml` and `backend_devops_factory` section.
2. Parse user intent from message and path arguments:

| Intent | Agent / skill |
|--------|----------------|
| Backend services, API routes, webhooks, data | `senior-backend-devops-developer` |
| OpenAPI / Zod / webhook contract design | `api-contract-architect` |
| Stripe / Supabase / Resend / Lark / OpenAI wiring | `integration-platform-engineer` |
| Vercel deploy, env matrix, CI, smoke | `devops-release-engineer` |
| Phase complete — backend gates | `backend-quality-enforcer` via `/phase-gate-backend` |
| Clerk auth migration / identity | `clerk-nextjs-auth` — not backend factory |
| UI + API together (no clear backend dominance) | `senior-saas-developer` |
| UI-heavy frontend | `senior-frontend-specialist` |

3. Read lane brain + ledger (max 7 files at start):
   - `backend-brain.md` or `devops-brain.md`
   - `integration-catalog.yaml`
   - `DOC/PROJECT PLAN/Tasks/tasks.md`
4. Confirm agent + phase only if intent is ambiguous.
5. Execute via chosen skill bundle; update SaaS tasks ledger.

## Rules

- Phase-end gates via `/phase-gate-backend` — not full E2E after every edit
- `/integration-plan` before multi-provider wiring
- Commit at phase completion; never push unless user asks
- Materialize disk artifacts before ledger updates
