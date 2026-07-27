---
id: ST-PLT-REWIRE-001
title: AI-BOS Rewire Protocol — Wire and Clean Any Project
type: standard
category: platform
domain: ai-bos
version: 1.1.0
status: active
owner: AI-BOS
visibility: internal
audience:
  - human
  - ai
consumers:
  - AG-STR-FOUNDER-001
  - AG-GOV-SYSBUILD-001
dependencies:
  - AR-AI-BOS-011
  - ST-PRJ-001
  - ST-STR-MEMORY-001
  - RU-AI-BOS-VAULT-001
  - HB-STR-FOUNDER-001
related:
  - rewire
  - project-binding
  - clean-slate
  - personal-memory
review_cycle: quarterly
last_review: 2026-07-18
priority: critical
tags:
  - ai-bos
  - standard
  - rewire
  - platform
capabilities:
  - CAP-PLT-003
  - CAP-PLT-005
  - CAP-STR-006
  - CAP-OPS-005
---

# AI-BOS Rewire Protocol — Wire and Clean Any Project

## Purpose

Provide the **single canonical instruction** for any AI agent: how to wire AI-BOS to a new or existing project, and how to clean a project's runtime data for a fresh rewire without corrupting the vault SSOT or **personal founder memory**.

## Scope

All projects registered in `AI-BOS/project-registry/`. Applies to `@founder-os`, `@system-builder`, and any agent performing project binding. Does not delete vault knowledge objects or agent definitions.

## Principles

1. **Vault is SSOT** — `AI-BOS/` never moves; projects bind to it.
2. **Clean runtime, not vault** — rewire clears project-specific runtime/memory, not KOs or registries (unless explicitly migrating).
3. **Personal memory is forever** — `founder-os-memory/personal/` is never archived or deleted during rewire.
4. **IDs over paths** — project registry uses IDs; `root_path` may change.
5. **Human confirms destructive clean** — never wipe data without explicit approval.

## Standards

### Part A — Wire AI-BOS to a new project

```text
1. REGISTER PROJECT
   └── Add PRJ-<DOMAIN>-<NAME>-001 to AI-BOS/project-registry/registry.json
       ├── capabilities[] — from AR-AI-BOS-004
       ├── agents[] — AG-* IDs to bind
       ├── consumes[] — KO IDs
       ├── root_path — absolute path to project code root
       └── ledger_path — tasks.md location

2. CREATE PROJECT BINDING RULE (if SaaS/HTML/Next)
   └── Copy pattern from rules 76–79:
       ├── RU-AI-BOS-SAAS-001 → web/
       ├── RU-AI-BOS-HTML-001 → sites/
       └── RU-AI-BOS-NEXT-001 → Frontend_Nextjs/

3. ADD LANE TO ROUTER
   └── Update .cursor/brain/lane-router.yaml:
       ├── path_prefixes
       ├── brain file
       ├── ledger
       └── primary_agents / primary_skills

4. CREATE/UPDATE ai-bos-binding.md
   └── In vault skill references/ for each bound delivery skill

5. CREATE PROJECT LEDGER
   └── tasks.md or ai-context.yaml at declared ledger_path

6. SET ACTIVE FOUNDER PROJECT (if applicable)
   └── Update founder-os-memory/active-project.json with new slug
   └── Create projects/<slug>/meta.json

7. VALIDATE
   └── Smoke: project-registry readable, lane resolves, no external-path registration
```

### Part B — Clean existing project for fresh rewire

```text
1. HUMAN CONFIRMATION REQUIRED
   └── List what will be cleared; wait for explicit "yes"

2. CLEAR RUNTIME STATE (project-scoped only)
   ├── Lane brain session notes (not SSOT KOs)
   ├── .cursor/execution/* ledgers for template lanes (if switching project)
   ├── Archive founder-os-memory/projects/<old-slug>/ → projects/_archive/<slug>-YYYYMMDD/
   └── Stale ai-context.yaml overrides if replacing project

3. DO NOT DELETE OR ARCHIVE
   ├── founder-os-memory/personal/ (NEVER — identity memory)
   ├── AI-BOS/knowledge-registry/
   ├── AI-BOS/agent-registry/
   ├── AI-BOS/project-registry/ (update, don't wipe)
   ├── Product code in web/sites/Frontend_Nextjs/ (unless human requests)
   └── Git history

4. RE-REGISTER OR UPDATE
   └── Update PRJ-* root_path, agents[], consumes[] if project moved

5. REWIRE FOUNDER PROJECT MEMORY
   └── Point active-project.json to new slug (or null)
   └── Create projects/<new-slug>/ if starting fresh initiative
   └── Record rewire event in founder-os-memory/logs/rewire-log.json

6. VALIDATE
   └── lane-router resolves new root; ledger exists; personal/ untouched; smoke PASS
```

### Dual-tier rewire table

| Action | Personal (`personal/`) | Project (`projects/<slug>/`) |
|--------|------------------------|------------------------------|
| Switch active project | Untouched | Update `active-project.json` only |
| Clean for fresh rewire | **Untouched** | Archive to `projects/_archive/` |
| Hard delete | Human-only, explicit | Human-only after archive |

### Checklist (copy for any AI)

| Step | Wire new | Clean rewire |
|------|----------|--------------|
| Register/update PRJ-* | Yes | Update only |
| Update lane-router.yaml | Yes | Yes |
| Create binding rule | If new lane | Review only |
| Clear runtime ledgers | No | Yes (with approval) |
| Archive project founder memory | No | Yes |
| Touch personal founder memory | No | **Never** |
| Touch vault KOs | Register new consumes | No |
| Human approval for destructive | N/A | Required |

## Best Practices

- Always run from `@system-builder` or `@founder-os` for structural rewire
- Document rewire in `AI-BOS/tasks.md` session log
- Keep `rewire-log.json` in `founder-os-memory/logs/` for audit trail
- Verify `personal/profile.md` still loads after every rewire

## Anti-patterns

- Deleting AI-BOS vault to "start fresh"
- Archiving or wiping `founder-os-memory/personal/` during rewire
- Registering agents outside AI-BOS/.cursor/ (RU-AI-BOS-VAULT-001 violation)
- Hardcoding project paths in KOs instead of project-registry
- Auto-cleaning without human confirmation

## References

- AR-AI-BOS-011 — project architecture
- ST-PRJ-001 — project standard
- ST-STR-MEMORY-001 — dual-tier memory
- RU-AI-BOS-VAULT-001 — vault integrity

## Related Knowledge Objects

- HB-STR-FOUNDER-001
- TP-STR-FOUNDER-001
- WF-PLT-SYSBUILD-001

## Change History

| Version | Date | Change |
|---------|------|--------|
| 1.0.0 | 2026-07-18 | Initial rewire protocol (I12). |
| 1.1.0 | 2026-07-18 | I14 — personal memory never cleaned; dual-tier rewire table; active-project.json step. |
