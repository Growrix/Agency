# AI Business Operating System (AI-BOS)

**Isolated root:** `F:/PROJECTS/Growrixos/AI-BOS/`  
**Status:** Architecture 1–12 + I1–I9 complete — **readiness ≥85** (2026-07-17)  
**Governance:** `@system-builder` (structural) + `@ai-bos-architect` (content)

## What this is

AI-BOS is a **tool-independent** business operating system — the permanent knowledge, governance, and capability foundation for the business. It is **not** a SaaS delivery lane.

## Core separation

| Layer | What it is | What it is NOT |
|-------|------------|----------------|
| **Knowledge** | Handbooks, standards, patterns, workflows | Agents, MCP, projects |
| **Agents** | Consumers of knowledge | Knowledge owners |
| **MCP** | Capability providers | Documentation |
| **Projects** | Consumers of all layers | Knowledge |
| **Runtime** | Tool-specific projections | Knowledge |

## Registered baseline

| Kind | IDs |
|------|-----|
| Projects | **5** — gov, SaaS, HTML, Next, blueprints |
| Agents | **40** — see `docs/reference/agent-mcp-catalog.md` |
| MCP | `MC-KNW-REGISTRY-001` — **runtime live** (`mcp/knowledge-registry/`) |
| Universal SSOT | `universal/` — copied Universal + SEO (161 files) |
| Domain packs | HTML, Next, Blueprint, SEO (+ SaaS I4 pack) |
| Knowledge total | **64** objects in `knowledge-registry/` |

## How to operate

1. Read [RUN.md](RUN.md) and [HB-GOV-OPS-001](knowledge/handbooks/HB-GOV-OPS-001.md).
2. Deep detail: [universal/README.md](universal/README.md) + `RU-AI-BOS-UNI-001`.
3. Validate registry: `@knowledge-validator` or MCP `knowledge.validate`.
4. Track work in [tasks.md](tasks.md).

## Key paths

| Path | Purpose |
|------|---------|
| `knowledge-registry/` | Knowledge Object SSOT |
| `universal/` | Portable delegated depth SSOT |
| `agent-registry/` | Agents |
| `mcp-registry/` + `mcp/knowledge-registry/` | MCP contracts + runtime |
| `project-registry/` | Projects |
| `knowledge/` | KO content by type |
| `.cursor/skills/ai-bos-architect/` | Content skill |
| `.cursor/skills/knowledge-validator/` | Validation invocable surface |

## Readiness audit

Evidence: [`.cursor/audits/2026-07-17-readiness-85.md`](.cursor/audits/2026-07-17-readiness-85.md)

## D1 status

Isolated root retained (Option B). Re-evaluate on second consumer project or explicit user request.
