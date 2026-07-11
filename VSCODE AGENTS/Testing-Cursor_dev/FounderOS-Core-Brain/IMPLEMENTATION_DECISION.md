# FounderOS Phase 1 Implementation Decision

Date: 2026-05-21

## Decision

Use a clean isolated implementation root:

- `FounderOS-Core-Brain/`

## Why

- User explicitly requested a complete separate root folder before execution.
- Baseline compile on `Business Brain Claude/` fails because `tsconfig.json` is missing.
- Existing file layout has broken import paths and would need structural repair anyway.
- A clean root allows deterministic Phase 1 delivery aligned to the locked plan.

## Scope Lock

Build only FounderOS Phase 1 five promises:

1. Contextual business answers
2. Isolated client and project folders
3. Durable machine-readable memory
4. External input ingestion
5. Retrieval and continuity

No Phase 2 features are included in this implementation.
