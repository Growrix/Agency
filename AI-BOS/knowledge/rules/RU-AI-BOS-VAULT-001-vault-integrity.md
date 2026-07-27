---
id: RU-AI-BOS-VAULT-001
title: AI-BOS Vault Integrity — Single Portable Root
type: rule
category: governance
domain: ai-bos
version: 1.0.0
status: active
owner: AI-BOS
visibility: internal
audience:
  - human
  - ai
consumers:
  - AG-GOV-SYSBUILD-001
  - AG-KNW-ARCH-001
  - AG-KNW-VALID-001
dependencies:
  - AR-AI-BOS-007
  - AR-AI-BOS-011
  - AR-AI-BOS-012
  - ST-AGT-001
  - ST-REG-001
  - RU-AI-BOS-UNI-001
related:
  - vault
  - portability
  - copy-in
review_cycle: quarterly
last_review: 2026-07-18
priority: critical
tags:
  - ai-bos
  - rule
  - vault
capabilities:
  - CAP-OPS-005
  - CAP-PLT-001
  - CAP-PLT-003
  - CAP-KNW-002
---

# AI-BOS Vault Integrity — Single Portable Root

## Purpose

Lock AI-BOS as a self-contained portable vault so copying the AI-BOS root into any project carries agents, skills, rules, MCP, registries, and knowledge without missing external dependencies.

## Scope

Applies to System Builder and all structural registration of agents, skills, rules, MCP servers, brain routers, and runtime projections. Does not require product application code (SaaS app, HTML sites) to live inside the vault.

## Principles

1. **One vault root** — the AI-BOS directory is the sole SSOT for the agentic system.
2. **Copy-in, never wire-out** — useful files outside the vault must be copied in before registration.
3. **Vault-relative resolution** — registries resolve runtime surfaces inside the vault, not personal or host-absolute paths.
4. **Expand inside, not outside** — System Builder may create folders under the vault as needed.
5. **Host install is derived** — optional sync from vault to a host IDE folder is never the SSOT.

## Standards

### Canonical vault surfaces

| Surface | Vault-relative path |
|---------|---------------------|
| Knowledge Objects | `knowledge/` |
| Registries | `knowledge-registry/`, `agent-registry/`, `mcp-registry/`, `project-registry/` |
| MCP implementations | `mcp/` |
| Portable depth | `universal/` |
| Cursor agents | `.cursor/agents/` |
| Cursor skills | `.cursor/skills/` |
| Cursor rules | `.cursor/rules/` |
| Brain / router | `.cursor/brain/` |
| Ledger | `tasks.md` |

### Registration rules

1. Before registering an agent or skill, the runtime file must exist under the vault paths above.
2. `runtime_projection` values MUST use vault-local forms: `vault-skill:<name>` or `vault-agent:<name>` resolving under `.cursor/skills/<name>/` or `.cursor/agents/<name>.md`.
3. Forbidden as canonical: host project `.cursor/` outside the vault, personal skill trees outside the vault, legacy Copilot agent folders outside the vault.
4. If a file is needed from outside: copy into the vault → register → optionally mark the external copy as non-canonical.

### Copy-in protocol

1. Identify source path outside vault.
2. Copy into the matching vault surface (agents / skills / rules / brain / mcp).
3. Adjust internal references to vault-relative IDs or paths.
4. Register in the appropriate registry.
5. Record evidence in `tasks.md`.

### Host install (optional)

When a host project must load Cursor surfaces from its own `.cursor/` folder, System Builder may sync **from vault → host** as a derived install. The host copy must not be registered as SSOT.

## Best Practices

- Open or paste AI-BOS as the workspace root when operating the agentic system alone.
- Keep product roots (`web/`, `sites/`, etc.) as project `root_path` only — not agent body homes.
- Run vault integrity checks after any enrollment wave.

## Anti-patterns

- Registering an agent whose only file lives outside the vault.
- Pointing `runtime_projection` at personal skill paths outside the vault.
- Treating host `.cursor/` or personal skills as canonical after vault migration.
- Leaving half the system outside the vault so a copy of AI-BOS is incomplete.

## References

- AR-AI-BOS-007 — Agent Architecture (runtime projection)
- AR-AI-BOS-011 — Project Architecture
- AR-AI-BOS-012 — Repository structure under vault
- ST-AGT-001, ST-REG-001

## Related Knowledge Objects

- RU-AI-BOS-HANDOFF-001
- HB-PLT-SYSBUILD-001
- ST-PLT-ENV-001
- WF-PLT-SYSBUILD-001
- RU-AI-BOS-UNI-001

## Change History

| Version | Date | Change |
|---------|------|--------|
| 1.0.0 | 2026-07-18 | Initial vault integrity rule (I10). |
