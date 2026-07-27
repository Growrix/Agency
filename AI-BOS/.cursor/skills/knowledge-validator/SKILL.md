---
name: knowledge-validator
description: >-
  Invokes AI-BOS knowledge registry validation via MC-KNW-REGISTRY-001 MCP
  knowledge.validate tool. Use after registry or KO edits under AI-BOS/.
---

# Knowledge Validator

Thin invocable surface for `AG-KNW-VALID-001`.

## Read First

1. [references/ai-bos-binding.md](references/ai-bos-binding.md)
2. `AI-BOS/mcp/knowledge-registry/README.md`

## Validate

1. Ensure MCP server `ai-bos-knowledge-registry` is available (`.cursor/mcp.json`)
2. Call tool **`knowledge.validate`** with empty input
3. If `valid: false`, fix issues listed in `issues[]` before declaring phase complete
4. Optionally run `npm run smoke --prefix AI-BOS/mcp/knowledge-registry`

## Fallback (no MCP host)

```bash
npm run smoke --prefix AI-BOS/mcp/knowledge-registry
```

Manual spot-check: `RU-AI-BOS-UNI-001` registered, no `DOC/Universal/` in KO References sections.
