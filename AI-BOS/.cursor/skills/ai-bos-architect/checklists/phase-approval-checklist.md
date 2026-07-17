# Phase Approval Checklist

Run before requesting user approval at the end of each AI-BOS planning phase.

## Pre-flight

- [ ] Read `AI-BOS/tasks.md` — current phase marked `in_progress`
- [ ] Prior phase has user approval recorded in ledger log
- [ ] No structural change pending (if yes → `@system-builder` first)

## Deliverable quality

- [ ] Phase deliverable written to disk (not chat-only)
- [ ] Every new document is a Knowledge Object with valid YAML front matter
- [ ] Body includes all 9 mandatory sections (or N/A noted with reason)
- [ ] Content is vendor-independent (no Cursor/Claude/Copilot lock-in)
- [ ] One document = one responsibility
- [ ] Design order respected (no premature folder/repository structure unless phase explicitly covers it)

## Registry

- [ ] All new objects registered in correct `knowledge-registry/*-index.json`
- [ ] `registry.json` `last_updated` bumped if objects added
- [ ] IDs unique across all indexes
- [ ] Dependencies reference existing or co-authored IDs
- [ ] Paths in registry match on-disk locations

## Ledger

- [ ] `AI-BOS/tasks.md` updated with evidence paths
- [ ] Phase status ready to mark completed after approval
- [ ] Log entry prepared for approval timestamp

## Diagnostics

- [ ] `ReadLints` clean on all touched markdown/JSON files
- [ ] No merge conflict markers
- [ ] No secrets in committed files

## Phase-specific gates

### Phase 1 (Vision)

- [ ] Long-term vision articulated (not only SaaS)
- [ ] Problem statement from disorganized knowledge addressed
- [ ] Design principles listed (modular, tool-independent, etc.)

### Phase 2 (Constitution TOC)

- [ ] TOC covers vision, mission, philosophy, governance, evolution
- [ ] No implementation details in constitution outline

### Phase 3 (Challenge assumptions)

- [ ] Assumptions explicitly listed and challenged
- [ ] Risks and alternatives documented

### Phase 4 (Capability Model)

- [ ] Capabilities drive knowledge/agents/MCP — not folders
- [ ] SaaS is one domain among many

### Phase 5 (Knowledge Architecture)

- [ ] Registry model aligned with Knowledge Registry Standard
- [ ] Consumer model documented (Knowledge → Agent → Project)

### Phases 6–12

- [ ] Deliverable matches phase name in planning prompt
- [ ] Cross-references use IDs not paths

## Stop condition

After checklist passes:

1. Present deliverable summary to user
2. **STOP** — request explicit approval
3. Do not begin next phase until approved

## Approval record template

Add to `tasks.md` log after user approves:

```text
| YYYY-MM-DD | Phase N approved by user. Evidence: <path>. Proceeding to Phase N+1. |
```
