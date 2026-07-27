# AI-BOS Binding — AI-BOS Architect

**Project:** `PRJ-GOV-AI-BOS-001`  
**Root:** `F:/PROJECTS/Growrixos/AI-BOS/`  
**Agent:** `AG-KNW-ARCH-001`  
**Rule:** `AI-BOS/.cursor/rules/75-ai-bos-governance.mdc`

## Read before AI-BOS content work

1. `AI-BOS/project-registry/registry.json` → `PRJ-GOV-AI-BOS-001`
2. `AI-BOS/tasks.md` — execution ledger
3. `RU-AI-BOS-UNI-001` — universal SSOT under `AI-BOS/universal/`
4. `ST-KNW-001`, `TP-KNW-001` — KO authoring standards

## Structural changes

Route registry/MCP/rules work to `@system-builder` (`AG-GOV-SYSBUILD-001`).

## Validation

Registry edits: invoke `AG-KNW-VALID-001` via MCP `knowledge.validate` or `@knowledge-validator` skill.

## Do not

- Reference repo-root `DOC/Universal/` in new KOs
- Duplicate lane delivery skills into AI-BOS
