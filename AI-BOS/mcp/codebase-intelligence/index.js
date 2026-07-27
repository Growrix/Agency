#!/usr/bin/env node
/**
 * MC-PLT-CODEBASE-001 — Codebase Intelligence MCP (stdio)
 * Ported from Junks/MCP codebase-intelligence-mcp (lib/).
 */
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { mkdirSync } from "node:fs";
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import {
  generateCodebaseSnapshot,
  getLatestCodebaseSnapshot,
  ensureFreshCodebaseSnapshot,
  readLatestCodebaseSummary,
  getCompactAuditContext,
} from "./lib/index.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const WORKSPACE_ROOT = resolve(__dirname, "../../..");
const DEFAULT_SNAPSHOT_DIR = join(WORKSPACE_ROOT, ".cursor", "brain", "codebase-snapshots");

function defaultScanRoots() {
  return ["web", "sites", "Frontend_Nextjs", "AI-BOS"].map((p) =>
    join(WORKSPACE_ROOT, p)
  );
}

function snapshotOptions(extra = {}) {
  mkdirSync(DEFAULT_SNAPSHOT_DIR, { recursive: true });
  return {
    objective: extra.objective ?? "Founder OS planning snapshot",
    trigger: extra.trigger ?? "manual",
    repoRoot: WORKSPACE_ROOT,
    scanRoots: extra.scanRoots ?? defaultScanRoots(),
    ignoredFolders: ["node_modules", ".next", "dist", ".git", "out"],
    ignoredFilePatterns: [],
    snapshotDir: DEFAULT_SNAPSHOT_DIR,
    maxAgeMs: extra.maxAgeMs ?? 3600000,
    includeTests: true,
    includeDocs: true,
  };
}

const server = new Server(
  { name: "ai-bos-codebase-intelligence", version: "1.0.0" },
  { capabilities: { tools: {} } }
);

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: "codebase.generate_snapshot",
      description: "Generate fresh codebase snapshot for planning",
      inputSchema: {
        type: "object",
        properties: { objective: { type: "string" } },
      },
    },
    {
      name: "codebase.get_latest_snapshot",
      description: "Read latest snapshot JSON",
      inputSchema: { type: "object", properties: {} },
    },
    {
      name: "codebase.ensure_fresh_snapshot",
      description: "Return fresh snapshot (regenerate if stale)",
      inputSchema: { type: "object", properties: {} },
    },
    {
      name: "codebase.get_summary",
      description: "Read latest human-readable summary",
      inputSchema: { type: "object", properties: {} },
    },
    {
      name: "codebase.get_compact_audit",
      description: "Compact audit context for agents",
      inputSchema: { type: "object", properties: {} },
    },
  ],
}));

server.setRequestHandler(CallToolRequestSchema, async (req) => {
  const opts = snapshotOptions();
  try {
    switch (req.params.name) {
      case "codebase.generate_snapshot": {
        const snap = await generateCodebaseSnapshot({
          ...opts,
          objective: req.params.arguments?.objective ?? opts.objective,
        });
        return {
          content: [{ type: "text", text: JSON.stringify(snap, null, 2) }],
        };
      }
      case "codebase.get_latest_snapshot": {
        const snap = getLatestCodebaseSnapshot(opts.snapshotDir);
        return {
          content: [{ type: "text", text: JSON.stringify(snap ?? { error: "no_snapshot" }, null, 2) }],
        };
      }
      case "codebase.ensure_fresh_snapshot": {
        const snap = await ensureFreshCodebaseSnapshot(opts);
        return {
          content: [{ type: "text", text: JSON.stringify(snap, null, 2) }],
        };
      }
      case "codebase.get_summary": {
        const summary = readLatestCodebaseSummary(opts.snapshotDir);
        return {
          content: [{ type: "text", text: summary ?? "No summary available" }],
        };
      }
      case "codebase.get_compact_audit": {
        const ctx = getCompactAuditContext(opts.snapshotDir);
        return {
          content: [{ type: "text", text: JSON.stringify(ctx ?? { error: "no_snapshot" }, null, 2) }],
        };
      }
      default:
        throw new Error(`Unknown tool: ${req.params.name}`);
    }
  } catch (err) {
    return {
      content: [{ type: "text", text: JSON.stringify({ error: String(err) }) }],
      isError: true,
    };
  }
});

const transport = new StdioServerTransport();
await server.connect(transport);
