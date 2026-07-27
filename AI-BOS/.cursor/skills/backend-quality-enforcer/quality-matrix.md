# Backend Quality Matrix

Adapted from QG1–QG13 + Growrixos `npm run health:check` server subset.

| Step | Check | Command / delegate | Phase |
|------|-------|-------------------|-------|
| 1 | Static lint | `npm run lint` in `web/` | All |
| 2 | Typecheck | `npm run typecheck` in `web/` | All |
| 3 | Build | `npm run build` in `web/` | P2+ |
| 4 | Unit tests | `npm run test` (server paths if filtered) | P2+ |
| 5 | Contract | Zod/OpenAPI parity — readonly api-contract checklist | P1+ |
| 6 | Webhook | Signature + idempotency — provider test vectors | P3+ |
| 7 | Env boot | Vars match `runtime.ts` + `.env.example` | P1+ |
| 8 | Integration smoke | `/api/health`, `/api/ready`, one commerce path | P3+ |
| 9 | Security | OWASP subset, rate limits, no secret leak — Security doc checklist | P3+ |
| 10 | Data | Supabase schema review if migrations touched | P4 |
| 11 | Regression | E2E release-gates subset or documented manual smoke | P6 |
| 12 | Deploy readiness | DevOps checklist — env matrix, smoke routes | P5 only |

## Pass criteria

- All applicable steps PASS for current phase
- Zero unresolved diagnostics on touched server/API files
- No invented env vars in implementation

## Block criteria

Any step FAIL → BLOCK → report fix owner:

| Failure type | Fix owner |
|--------------|-----------|
| Layering / Zod / webhook | `@senior-backend-devops-developer` |
| Contract drift | `@api-contract-architect` then backend lead |
| Provider env | `@integration-platform` |
| Deploy / CI | `@devops-release-engineer` |
| Clerk auth | `@clerk-nextjs-auth` |

## Mid-phase (not this skill)

During P1–P5 implementation: `ReadLints` + narrow lint/typecheck only — see rule 72.
