# AI Business Operating System (AI-BOS)

**Isolated root:** `F:/PROJECTS/Growrixos/AI-BOS/`  
**Status:** Planning (Version 2 — greenfield architecture)  
**Governance:** `@system-builder` (structural changes) + `@ai-bos-architect` (content authoring)

## What this is

AI-BOS is a **tool-independent** business operating system — the permanent knowledge, governance, and capability foundation for the business. It is **not** a coding project and **not** a SaaS delivery lane.

SaaS development (`web/`), HTML templates (`sites/`), and Next.js migrations (`Frontend_Nextjs/`) remain separate delivery surfaces. AI-BOS sits above them as the shared brain.

## Core separation (never mix)

| Layer | What it is | What it is NOT |
|-------|------------|----------------|
| **Knowledge** | Reusable handbooks, standards, patterns | Agents, MCP, projects |
| **Agents** | Consumers of knowledge | Knowledge owners |
| **MCP** | Capability providers | Documentation |
| **Projects** | Consumers of all layers | Knowledge |
| **Runtime** (`.cursor/`, `.github/`, etc.) | Tool-specific config | Knowledge |

## How to operate

1. Read [RUN.md](RUN.md) for session workflow.
2. Attach `@ai-bos-architect` to execute phased planning.
3. Attach `@system-builder` for structural changes (new skills, rules, registry schema).
4. Track progress in [tasks.md](tasks.md).

## Key paths

| Path | Purpose |
|------|---------|
| `knowledge-registry/` | Machine-readable index (SSOT for discovery) |
| `.cursor/skills/ai-bos-architect/` | Planning skill + references |
| `.cursor/rules/75-ai-bos-governance.mdc` | Local governance rule |
| `tasks.md` | Execution ledger |

## Relationship to Growrixos

AI-BOS lives inside the Growrixos monorepo as an **isolated root** per the [isolated-local-system](C:/Users/User/.cursor/skills/system-builder/isolated-local-system.md) pattern. It does not replace `DOC/PROJECT PLAN/` (SaaS SSOT) or delivery lanes.

Original planning prompts remain in `Ongoing DOCS/` as reference until Phase 1 is approved; canonical copies live under `.cursor/skills/ai-bos-architect/references/`.

## Phased deliverables (planning only)

1. Constitution  
2. Capability Model  
3. Knowledge Architecture  
4. Documentation Architecture  
5. Agent Architecture  
6. MCP Architecture  
7. Execution Architecture  
8. Governance  
9. Project Architecture  
10. Standards  
11. Templates  
12. Evolution Strategy  

Repository structure is the **final** output — never the first.
