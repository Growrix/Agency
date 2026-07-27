# Founder OS Memory (Dual-Tier)

Two tiers under one home — see **ST-STR-MEMORY-001** v1.1.

## Tiers

| Tier | Path | Lifetime |
|------|------|----------|
| **Personal** (OpenClaw-style) | `personal/` | Forever — identity, goals, brand, ICP |
| **Project** | `projects/<slug>/` | Per initiative — archivable on rewire |

## Quick start

1. Fill in [`personal/profile.md`](personal/profile.md) once — your standing identity.
2. Set active project: edit [`active-project.json`](active-project.json) → `"slug": "my-project"`.
3. Drop files in [`shared-inbox/`](shared-inbox/) — agent classifies → personal or project.
4. Personal summaries: `personal/summaries/` | Project summaries: `projects/<slug>/memory/summaries/`

## Session load order

```text
personal/profile.md → personal/summaries/ → active project summaries → shared-inbox/
```

## Classification (write path)

| Signal | Route to |
|--------|----------|
| Goals, brand, ICP, standing pricing | `personal/` |
| Client, deadline, this build, this campaign | `projects/<slug>/` |
| Ambiguous | Ask once; default **project** |

## Record shape

```json
{
  "scope": "personal|project",
  "project_slug": null,
  "type": "goal|research|marketing|...",
  "stability": "standing|ephemeral",
  "summary": "..."
}
```

## Rewire

- **Personal:** never auto-wiped (`ST-PLT-REWIRE-001` v1.1)
- **Project:** archive to `projects/_archive/<slug>-YYYYMMDD/` on rewire

Do not store API keys or passwords in any memory folder.
