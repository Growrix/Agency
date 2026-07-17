# AI Business Operating System (AI-BOS)

**Isolated root:** `F:/PROJECTS/Growrixos/AI-BOS/`  
**Status:** Architecture 1–12 + I1–I4 complete (SaaS knowledge pack + `web/` bindings)  
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
| Projects | `PRJ-GOV-AI-BOS-001` (AI-BOS), `PRJ-SAAS-GROWRIXOS-001` (`web/`) |
| Governance agents | `AG-KNW-ARCH-001`, `AG-GOV-SYSBUILD-001`, `AG-KNW-VALID-001` |
| Delivery agents | `AG-DLV-SAAS-001`, `AG-DLV-FE-001`, `AG-DLV-BE-001`, `AG-DLV-QA-001`, `AG-DLV-QA-BE-001`, `AG-DLV-DEVOPS-001` |
| MCP | `MC-KNW-REGISTRY-001` |
| Workflows | `WF-GOV-PHASE-APPROVE-001`, `WF-KNW-AUTHOR-001`, `WF-DLV-SAAS-FEATURE-001` |
| Handbooks | governance `HB-KNW-*` / `HB-GOV-*` + SaaS `HB-ENG-*` / `HB-OPS-REL-001` (7) |
| Standards | governance ST-* (10) + SaaS `ST-SEC/TST/API/FE-DS-001` (14 total) |
| Rules | `RU-AI-BOS-SAAS-001` (Cursor: rule `76`) |
| Templates | `TP-KNW-001` … `TP-REG-001` (7) |
| Architecture | `AR-AI-BOS-001` … `AR-AI-BOS-012` (12) |
| Knowledge total | **44** objects in `knowledge-registry/` |

## How to operate

1. Read [RUN.md](RUN.md) and [HB-GOV-OPS-001](knowledge/handbooks/HB-GOV-OPS-001.md).
2. Author knowledge via `@ai-bos-architect` using `ST-KNW-001` / `TP-KNW-001` / `WF-KNW-AUTHOR-001`.
3. Structural changes via `@system-builder` (`AG-GOV-SYSBUILD-001`).
4. Track work in [tasks.md](tasks.md).

## Key paths

| Path | Purpose |
|------|---------|
| `knowledge-registry/` | Knowledge Object SSOT |
| `agent-registry/` | Agents |
| `mcp-registry/` | MCP servers |
| `project-registry/` | Projects |
| `knowledge/` | KO content by type |
| `docs/` | Human docs (separate index) |
| `.cursor/skills/ai-bos-architect/` | Content skill |
| `tasks.md` | Execution ledger |

## D1 status

Isolated root retained (Option B). Trigger 2 met and acknowledged 2026-07-17; no auto-promotion. Promote only on Trigger 1 (second consumer) or Trigger 3 (explicit request).
