# DevOps Discipline (backend lead view)

Full release playbook: `@devops-release-engineer`.

## P5 responsibilities

- Enumerate env from `runtime.ts` + `.env.example`
- Confirm web/studio pipeline isolation
- Run smoke routes post-deploy
- Gate step 11 via `@backend-quality-enforcer`

## Commands (Growrixos)

| Command | Purpose |
|---------|---------|
| `/backend-factory` | Intent routing |
| `/phase-gate-backend` | Phase-end gates |
| `/resume-backend-brain` | Session recovery |

## Verify (web)

```bash
cd web && npm run health:check
```

## Git

Commit locally after phase validation. Never push unless user explicitly requests (rule 71).
