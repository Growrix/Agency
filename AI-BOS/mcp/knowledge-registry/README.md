# Knowledge Registry MCP Server

**ID:** `MC-KNW-REGISTRY-001`  
**Transport:** stdio (Node.js ≥18)

## Tools

| Tool | Description |
|------|-------------|
| `knowledge.search` | Search by query + optional type |
| `knowledge.read` | Read KO metadata + markdown body |
| `knowledge.related` | Related objects for an ID |
| `knowledge.dependencies` | Direct dependencies |
| `knowledge.validate` | Registry integrity check |

## Setup

```bash
cd AI-BOS/mcp/knowledge-registry
npm install
npm run smoke
```

## Cursor wiring

Workspace `.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "ai-bos-knowledge-registry": {
      "command": "node",
      "args": ["AI-BOS/mcp/knowledge-registry/index.js"]
    }
  }
}
```

## Agent

`AG-KNW-VALID-001` invokes `knowledge.validate` via this server or the `knowledge-validator` skill checklist.
