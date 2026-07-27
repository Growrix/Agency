# Agents Anatomy Registry

Canonical human + AI registry for all Cursor agents and personal skills.

## Canonical file (read and update)

```text
~/.cursor/docs/agents_cursor.md
```

Windows: `C:\Users\User\.cursor\docs\agents_cursor.md`

## When to read

- Before `@system-builder` DESIGN, EXTEND, REPAIR, or DOCUMENT work that touches agents/skills/lanes
- Before approving any new agent name or scope

## When to update (mandatory)

Update `~/.cursor/docs/agents_cursor.md` in the **same session** when you:

- Create or rename a personal skill under `~/.cursor/skills/`
- Create or rename a project agent under `<repo>/.cursor/agents/`
- Add or change a delivery lane, slash command, or brain router entry
- Deprecate or merge agents (mark in anti-duplication + version log)

Also update:

- [skills-index.md](skills-index.md)
- [lanes-index.md](lanes-index.md)
- Project `## Project: <name>` section in the anatomy file

## Project pointers

Repos may include `.cursor/agents_cursor.md` linking here — never fork the full registry into project docs.

## Version log

Append a row to the anatomy file version log; do not maintain a separate changelog here.
