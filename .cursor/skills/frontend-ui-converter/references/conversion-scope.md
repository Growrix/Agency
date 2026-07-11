# Conversion Scope Discipline

Every Track C/D/E job requires a scope file before code changes.

## Template

Copy: `.cursor/brain/conversion-scope.template.json`

Save to: `.cursor/brain/conversions/<job-id>.scope.json`

## Required artifacts before code

| Artifact | Location |
|----------|----------|
| Scope JSON | `.cursor/brain/conversions/<job-id>.scope.json` |
| CONVERSION-MAP.md | Target folder root |
| conversion-inventory.json | Target folder (from script) |

## Locked vs extensible (Growrixos defaults)

**Locked (do not edit during conversion):**

- Source prototype files (read-only)
- `sites/` source HTML during Track A
- Other apps in `Frontend_Nextjs/` not in scope

**Extensible:**

- Target output folder only
- New files under target `components/`, `content/`, `app/`

## Update migration brain

After scope lock, add entry to `.cursor/brain/migration-brain.md` Active Migrations section.

## Ledger

Create or update task in `.cursor/execution/template-tasks.md` with job ID and track letter.
