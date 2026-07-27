---
id: ST-MCP-PORT-001
title: MCP Port Standard — Vault Copy-In from External Experiments
type: standard
category: platform
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
dependencies:
  - RU-AI-BOS-VAULT-001
  - AR-AI-BOS-008
related:
  - mcp-port
  - junks
review_cycle: quarterly
last_review: 2026-07-18
priority: high
tags:
  - standard
  - mcp
capabilities:
  - CAP-PLT-002
  - CAP-PLT-003
---

# MCP Port Standard — Vault Copy-In from External Experiments

## Purpose

Rules for copying MCP servers from external folders (e.g. Junks) into `AI-BOS/mcp/` as portable SSOT.

## Standards

1. **Copy-in first** — never register Junks paths in mcp-registry.
2. **No secrets** — never copy `.env`; use env var placeholders in mcp.json.
3. **No node_modules in git** — run `npm install` in port folder; document in README.
4. **Reject stubs** — do not port hard-coded stub servers (MCPNEW, MCPPLAN stubs).
5. **Register** — add `MC-*` to mcp-registry + wire `.cursor/mcp.json`.
6. **Document** — port matrix in `docs/reference/junks-mcp-port-matrix.md`.

## Change History

| Version | Date | Change |
|---------|------|--------|
| 1.0.0 | 2026-07-18 | Initial (I13). |
