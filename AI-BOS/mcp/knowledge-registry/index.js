#!/usr/bin/env node
/**
 * MC-KNW-REGISTRY-001 — Knowledge Registry MCP Server (stdio)
 * Read-only access to AI-BOS knowledge-registry + KO markdown bodies.
 */
import { readFileSync, existsSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const AI_BOS_ROOT = resolve(__dirname, "../..");
const REGISTRY_PATH = join(AI_BOS_ROOT, "knowledge-registry/registry.json");

function loadRegistry() {
  const raw = readFileSync(REGISTRY_PATH, "utf8");
  return JSON.parse(raw);
}

function allObjects() {
  return loadRegistry().objects ?? [];
}

function findById(id) {
  return allObjects().find((o) => o.id === id);
}

function readKoBody(obj) {
  const full = join(AI_BOS_ROOT, obj.path);
  if (!existsSync(full)) {
    return null;
  }
  return readFileSync(full, "utf8");
}

function searchObjects(query, type) {
  const q = (query ?? "").toLowerCase().trim();
  return allObjects().filter((o) => {
    if (type && o.type !== type) return false;
    if (!q) return true;
    const hay = `${o.id} ${o.title ?? ""} ${o.path ?? ""}`.toLowerCase();
    return hay.includes(q);
  });
}

function relatedObjects(id) {
  const obj = findById(id);
  if (!obj) return { error: "not_found" };
  const relatedIds = new Set([
    ...(obj.related ?? []),
    ...(obj.consumers ?? []),
  ]);
  for (const other of allObjects()) {
    if ((other.dependencies ?? []).includes(id)) relatedIds.add(other.id);
    if ((other.related ?? []).includes(id)) relatedIds.add(other.id);
  }
  relatedIds.delete(id);
  return { results: [...relatedIds].map((rid) => findById(rid)).filter(Boolean) };
}

function dependencyObjects(id, seen = new Set()) {
  const obj = findById(id);
  if (!obj) return { error: "not_found" };
  if (seen.has(id)) return { error: "cycle_detected" };
  seen.add(id);
  const deps = (obj.dependencies ?? []).map((did) => findById(did)).filter(Boolean);
  return { results: deps };
}

function parseFrontMatter(text) {
  if (!text.startsWith("---")) return { error: "invalid_frontmatter" };
  const end = text.indexOf("---", 3);
  if (end === -1) return { error: "invalid_frontmatter" };
  const block = text.slice(3, end).trim();
  const fm = {};
  for (const line of block.split("\n")) {
    const m = line.match(/^(\w+):\s*(.*)$/);
    if (m) fm[m[1]] = m[2].trim();
  }
  return { frontMatter: fm };
}

function validateRegistry() {
  const objects = allObjects();
  const ids = objects.map((o) => o.id);
  const dupes = ids.filter((id, i) => ids.indexOf(id) !== i);
  const issues = [];

  if (dupes.length) {
    issues.push({ code: "duplicate_id", ids: [...new Set(dupes)] });
  }

  for (const obj of objects) {
    for (const dep of obj.dependencies ?? []) {
      if (!findById(dep)) {
        issues.push({ code: "broken_dependency", id: obj.id, dependency: dep });
      }
    }
    const full = join(AI_BOS_ROOT, obj.path);
    if (!existsSync(full)) {
      issues.push({ code: "missing_file", id: obj.id, path: obj.path });
      continue;
    }
    const body = readFileSync(full, "utf8");
    const parsed = parseFrontMatter(body);
    if (parsed.error) {
      issues.push({ code: "invalid_frontmatter", id: obj.id });
    } else if (parsed.frontMatter.id && parsed.frontMatter.id !== obj.id) {
      issues.push({
        code: "id_mismatch",
        id: obj.id,
        frontMatterId: parsed.frontMatter.id,
      });
    }
  }

  return {
    result: {
      valid: issues.length === 0,
      objectCount: objects.length,
      issues,
    },
  };
}

const server = new Server(
  {
    name: "ai-bos-knowledge-registry",
    version: "1.0.0",
  },
  { capabilities: { tools: {} } }
);

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: "knowledge.search",
      description: "Search knowledge registry by query and optional type",
      inputSchema: {
        type: "object",
        properties: {
          query: { type: "string" },
          type: { type: "string" },
        },
      },
    },
    {
      name: "knowledge.read",
      description: "Read a knowledge object by ID (metadata + body)",
      inputSchema: {
        type: "object",
        properties: { id: { type: "string" } },
        required: ["id"],
      },
    },
    {
      name: "knowledge.related",
      description: "List related knowledge objects for an ID",
      inputSchema: {
        type: "object",
        properties: { id: { type: "string" } },
        required: ["id"],
      },
    },
    {
      name: "knowledge.dependencies",
      description: "List direct dependencies for an ID",
      inputSchema: {
        type: "object",
        properties: { id: { type: "string" } },
        required: ["id"],
      },
    },
    {
      name: "knowledge.validate",
      description: "Validate registry integrity (IDs, deps, front matter)",
      inputSchema: { type: "object", properties: {} },
    },
  ],
}));

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    if (name === "knowledge.search") {
      const results = searchObjects(args?.query, args?.type);
      return {
        content: [{ type: "text", text: JSON.stringify({ results }, null, 2) }],
      };
    }

    if (name === "knowledge.read") {
      const id = args?.id;
      const obj = findById(id);
      if (!obj) {
        return {
          content: [{ type: "text", text: JSON.stringify({ error: "not_found", id }) }],
          isError: true,
        };
      }
      const body = readKoBody(obj);
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify({ object: obj, body }, null, 2),
          },
        ],
      };
    }

    if (name === "knowledge.related") {
      const out = relatedObjects(args?.id);
      return {
        content: [{ type: "text", text: JSON.stringify(out, null, 2) }],
        isError: !!out.error,
      };
    }

    if (name === "knowledge.dependencies") {
      const out = dependencyObjects(args?.id);
      return {
        content: [{ type: "text", text: JSON.stringify(out, null, 2) }],
        isError: !!out.error,
      };
    }

    if (name === "knowledge.validate") {
      const out = validateRegistry();
      return {
        content: [{ type: "text", text: JSON.stringify(out, null, 2) }],
      };
    }

    return {
      content: [{ type: "text", text: JSON.stringify({ error: "unknown_tool", name }) }],
      isError: true,
    };
  } catch (err) {
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify({ error: String(err?.message ?? err) }),
        },
      ],
      isError: true,
    };
  }
});

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
