---
id: ST-STR-MEMORY-001
title: Founder Personal Memory Architecture
type: standard
category: strategy
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
  - AG-STR-RESEARCH-001
  - AG-GRO-MARKET-001
  - AG-GRO-SALES-001
  - AG-PLT-AUTOMATION-001
dependencies:
  - HB-STR-FOUNDER-001
  - AR-AI-BOS-011
  - RU-AI-BOS-VAULT-001
related:
  - founder-memory
  - personal-memory
  - project-memory
  - shared-inbox
review_cycle: quarterly
last_review: 2026-07-18
priority: critical
tags:
  - ai-bos
  - standard
  - memory
  - founder
  - dual-tier
capabilities:
  - CAP-KNW-007
  - CAP-STR-006
---

# Founder Personal Memory Architecture

## Purpose

Define how founder inputs, chat logs, client conversations, and ongoing context are stored locally for `AG-STR-FOUNDER-001` — filesystem-backed, privacy-first, **dual-tier** (personal forever + project ephemeral), no vector DB or cloud sync in Phase 1.

## Scope

Runtime memory under `.cursor/brain/founder-os-memory/`. Does not replace AI-BOS knowledge registry (KOs) or project ledgers.

## Principles

1. **Local filesystem only** — no vector DB, Supabase, PostgreSQL, or auto-upload.
2. **Dual-tier memory** — personal (identity, forever) vs project (initiative, archivable).
3. **Layered memory** — raw → normalized JSON → Markdown summary → decisions → tasks.
4. **Human inbox** — founder pastes files into `shared-inbox/`; agent classifies and routes.
5. **No secrets in memory files** — reference env var names; never store API keys or passwords.
6. **Personal never auto-wiped** — rewire archives project memory only; personal requires explicit human edit/delete.

## Standards

### Dual-tier model

| Tier | Lifetime | Contents | Clean / rewire |
|------|----------|----------|----------------|
| **Personal** | Forever (human-edited only) | Founder identity, long-term goals, brand voice, ICP, standing offers, preferences, standing decisions | **Never auto-wipe** |
| **Project** | Per initiative (`project_slug`) | Client briefs, research, funnel, sprint decisions, project tasks | Archive on rewire; delete only with human OK |

### Folder structure (v1.1)

```text
.cursor/brain/founder-os-memory/
├── personal/                    # FOREVER — OpenClaw-style identity memory
│   ├── profile.md               # Who you are, business model, north-star goals
│   ├── goals/                   # Long-lived goals (JSON + MD)
│   ├── preferences/             # Working style, language, constraints
│   ├── brand/                   # Voice, positioning, default offers
│   ├── decisions/               # Standing decisions (pricing philosophy, markets)
│   ├── summaries/               # Stable rollups for session start
│   └── inbox/                   # Personal-only drops (optional)
├── projects/
│   ├── _archive/                # Archived project folders after rewire
│   └── <project-slug>/          # EPHEMERAL per initiative
│       ├── meta.json            # slug, status, linked PRJ-*, dates
│       ├── inbox/
│       ├── chat-logs/
│       ├── memory/
│       │   ├── raw/
│       │   ├── records/
│       │   ├── summaries/
│       │   ├── decisions/
│       │   └── tasks/
│       ├── discussions/
│       └── exports/
├── active-project.json          # { "slug": null | "<slug>" } — pointer only
├── shared-inbox/                # Human drop zone; agent classifies → personal OR project
├── logs/                        # Processing + rewire audit
└── README.md
```

### Classification rule (write path)

Every write must answer: **Does this change who I am / what I always sell, or only this initiative?**

| Signal | Route to |
|--------|----------|
| "My goal is…", "I always…", brand voice, ICP, standing pricing | `personal/` |
| Client name, deadline, this SaaS feature, this site blueprint | `projects/<slug>/` |
| Ambiguous | Ask human once; default to **project** (safer) |

### Record shape (minimum)

```json
{
  "id": "mem-20260718-001",
  "scope": "personal|project",
  "project_slug": null,
  "type": "goal|preference|brand|intake|research|marketing|sales|finance|automation|decision|handoff",
  "stability": "standing|ephemeral",
  "created": "2026-07-18T10:00:00Z",
  "source": "chat|inbox|database-read|form",
  "summary": "One-line human-readable summary",
  "refs": ["path/to/raw/file.md"],
  "tags": ["saas", "client-acme"]
}
```

- Personal records: `scope=personal`, `project_slug=null`, `stability=standing`
- Project records: `scope=project`, `project_slug` required, `stability=ephemeral` (unless promoted)

### Session load order (read path)

```text
1. personal/profile.md + personal/summaries/ (always)
2. active-project.json → projects/<slug>/memory/summaries/ (if slug set)
3. shared-inbox/ (process and classify)
4. Then run WF-STR-FOUNDER-001
```

### Memory layers (within each tier)

| Layer | Format | Purpose |
|-------|--------|---------|
| Raw | Original files in inbox or `memory/raw/` | Preserve source |
| Record | JSON in `memory/records/` or tier-specific folders | Structured, machine-readable |
| Summary | MD in `summaries/` | Fast session start read |
| Decision | JSON + MD in `decisions/` | Rationale for future reference |
| Task | JSON in `memory/tasks/` or `projects/<slug>/memory/tasks/` | Handoff and human action items |

### Database read access

- **Read-only** — SELECT / read APIs only; no writes unless routed to delivery agent
- Credentials supplied by human (env vars, connection strings pasted in chat once — not stored in memory files)
- Summarize findings into active project `memory/summaries/`; do not dump full DB into git

### Inbox processing workflow

```text
1. Human pastes file/folder → shared-inbox/ (or personal/inbox/)
2. Agent reads on session start
3. Agent classifies: personal vs project (default project if ambiguous)
4. Agent creates record + summary in target tier
5. Agent archives processed raw; logs in logs/
```

### Promotion (project → personal)

When project research becomes standing identity (e.g. "this is now my ICP"), human confirms promotion:

```text
1. Copy or summarize into personal/goals/ or personal/brand/
2. Record promotion in personal/decisions/ with source project_slug
3. Keep project copy for audit; do not delete project record
```

## Best Practices

- Keep personal summaries under 500 words for fast brain load
- Use `project_slug` consistently across project records
- Set `active-project.json` when starting a new initiative
- Archive old project chat-logs on rewire; keep personal summaries permanent
- Run rewire per ST-PLT-REWIRE-001 when switching primary delivery project

## Anti-patterns

- Storing API keys, passwords, or payment details in memory files
- Mixing personal goals into project folders without promotion
- Auto-deleting or archiving `personal/` during rewire
- Replacing project ledger (tasks.md) with founder memory
- Vector DB dependency in I14 scope

## References

- HB-STR-FOUNDER-001
- ST-PLT-REWIRE-001
- AR-AI-BOS-011 — PRJ-STR-FOUNDEROS-001 binding

## Related Knowledge Objects

- WF-STR-FOUNDER-001
- TP-STR-FOUNDER-001
- RU-AI-BOS-FOUNDER-001

## Change History

| Version | Date | Change |
|---------|------|--------|
| 1.0.0 | 2026-07-18 | Initial founder memory standard (I12). |
| 1.1.0 | 2026-07-18 | I14 — dual-tier personal forever + project ephemeral; classification, session load, promotion rules. |
