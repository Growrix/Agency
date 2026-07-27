# Junks MCP Port Matrix (I13)

Reference for what was accepted or rejected from external MCP experiments.

## Summary

| Folder | Decision |
|--------|----------|
| `F:/PROJECTS/Junks/MCP` | **Partial port** — 2 servers only |
| `F:/PROJECTS/Junks/MCPNEW` | **Reject entire tree** — stubs |
| `F:/PROJECTS/Junks/MCPPLAN` | **Reject MCP servers** — stubs; team-task-hub is reference SaaS sample only |

## Accepted into AI-BOS vault

| MCP ID | Vault path | Source | Notes |
|--------|------------|--------|-------|
| `MC-PLT-CODEBASE-001` | `AI-BOS/mcp/codebase-intelligence/` | Junks `codebase-intelligence-mcp` dist | Snapshot/summary tools |
| `MC-KNW-RETRIEVE-001` | `AI-BOS/mcp/knowledge-retrieve/` | Inspired by Junks `knowledge-mcp` | AI-BOS native: registry + founder memory |

## Rejected (document only)

| Item | Source | Reason |
|------|--------|--------|
| website-planner-mcp | MCP / MCPNEW / MCPPLAN | Static stub output |
| website-builder-mcp | MCP / MCPNEW / MCPPLAN | Hard-coded HTML / no real build |
| debug-mcp (stub) | MCPNEW / MCPPLAN | Canned responses |
| content-mcp / funnel-mcp | MCP | RuntimeDelegating stubs |
| execution-mcp wrapper | MCP | Does not safely edit code |
| MCPNEW orchestrator | MCPNEW | Routes to stubs |
| MCPPLAN analysis-mcp | MCPPLAN | Canned findings |

## Security

- **Never copy** `Junks/MCP/.env` — rotate any exposed API keys separately.

## Related

- `ST-MCP-PORT-001`
- `AR-AI-BOS-008` v1.1
