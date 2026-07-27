#!/usr/bin/env node
/**
 * MC-KNW-RETRIEVE-001 — Knowledge Retrieve MCP (stdio)
 * AI-BOS native; dual-tier founder memory (personal + active project).
 */
import { readFileSync, readdirSync, existsSync, statSync } from "node:fs";
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
const MEMORY_ROOT = resolve(AI_BOS_ROOT, "..", ".cursor", "brain", "founder-os-memory");
const ACTIVE_PROJECT_PATH = join(MEMORY_ROOT, "active-project.json");

function loadRegistry() {
  return JSON.parse(readFileSync(REGISTRY_PATH, "utf8"));
}

function loadActiveSlug() {
  if (!existsSync(ACTIVE_PROJECT_PATH)) return null;
  try {
    const data = JSON.parse(readFileSync(ACTIVE_PROJECT_PATH, "utf8"));
    const slug = data?.slug;
    return slug && typeof slug === "string" ? slug : null;
  } catch {
    return null;
  }
}

function memorySearchRoots() {
  const roots = [
    { tier: "personal", path: join(MEMORY_ROOT, "personal") },
    { tier: "shared-inbox", path: join(MEMORY_ROOT, "shared-inbox") },
  ];
  const slug = loadActiveSlug();
  if (slug) {
    roots.push({
      tier: "project",
      path: join(MEMORY_ROOT, "projects", slug),
    });
  }
  return roots.filter((r) => existsSync(r.path));
}

function walkMd(dir, acc = []) {
  if (!existsSync(dir)) return acc;
  for (const name of readdirSync(dir)) {
    if (name.startsWith("_") && statSync(join(dir, name)).isDirectory()) continue;
    const full = join(dir, name);
    const st = statSync(full);
    if (st.isDirectory()) walkMd(full, acc);
    else if (name.endsWith(".md") || name.endsWith(".json")) acc.push(full);
  }
  return acc;
}

function collectMemoryFiles() {
  const files = [];
  for (const { tier, path } of memorySearchRoots()) {
    for (const f of walkMd(path)) {
      files.push({ tier, path: f });
    }
  }
  return files;
}

function searchText(fileEntries, query, limit = 10) {
  const q = (query ?? "").toLowerCase().trim();
  if (!q) return [];
  const hits = [];
  for (const { tier, path } of fileEntries) {
    try {
      const text = readFileSync(path, "utf8");
      if (text.toLowerCase().includes(q)) {
        hits.push({ tier, path, excerpt: text.slice(0, 400) });
        if (hits.length >= limit) break;
      }
    } catch {
      /* skip */
    }
  }
  return hits;
}

const server = new Server(
  { name: "ai-bos-knowledge-retrieve", version: "1.1.0" },
  { capabilities: { tools: {} } }
);

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: "retrieve.search",
      description: "Search personal + active project founder memory and KO titles",
      inputSchema: {
        type: "object",
        properties: {
          query: { type: "string" },
          limit: { type: "number" },
        },
        required: ["query"],
      },
    },
    {
      name: "retrieve.ground",
      description: "Assemble grounding from personal profile, summaries, active project, and KOs",
      inputSchema: {
        type: "object",
        properties: { query: { type: "string" } },
        required: ["query"],
      },
    },
    {
      name: "retrieve.memory_list",
      description: "List founder memory summary files (personal first, then active project)",
      inputSchema: { type: "object", properties: { limit: { type: "number" } } },
    },
  ],
}));

server.setRequestHandler(CallToolRequestSchema, async (req) => {
  const memoryFiles = collectMemoryFiles();
  const regObjects = loadRegistry().objects ?? [];
  const activeSlug = loadActiveSlug();

  switch (req.params.name) {
    case "retrieve.search": {
      const query = req.params.arguments?.query ?? "";
      const limit = req.params.arguments?.limit ?? 10;
      const koHits = regObjects
        .filter((o) => `${o.id} ${o.title ?? ""}`.toLowerCase().includes(query.toLowerCase()))
        .slice(0, limit)
        .map((o) => ({ type: "ko", id: o.id, title: o.title, path: o.path }));
      const memHits = searchText(memoryFiles, query, limit).map((h) => ({
        type: "memory",
        tier: h.tier,
        path: h.path,
        excerpt: h.excerpt,
      }));
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify({ activeProject: activeSlug, koHits, memHits }, null, 2),
          },
        ],
      };
    }
    case "retrieve.ground": {
      const query = req.params.arguments?.query ?? "";
      const memHits = searchText(memoryFiles, query, 5);
      const profilePath = join(MEMORY_ROOT, "personal", "profile.md");
      const profile =
        existsSync(profilePath) ? readFileSync(profilePath, "utf8").slice(0, 1500) : null;
      const koHits = regObjects
        .filter((o) => `${o.id} ${o.title ?? ""}`.toLowerCase().includes(query.toLowerCase()))
        .slice(0, 5);
      const bodies = koHits.map((o) => {
        const full = join(AI_BOS_ROOT, o.path);
        if (!existsSync(full)) return { id: o.id, body: null };
        const raw = readFileSync(full, "utf8");
        return { id: o.id, body: raw.slice(0, 2000) };
      });
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(
              { query, activeProject: activeSlug, profile, memory: memHits, knowledge: bodies },
              null,
              2
            ),
          },
        ],
      };
    }
    case "retrieve.memory_list": {
      const limit = req.params.arguments?.limit ?? 20;
      const personal = walkMd(join(MEMORY_ROOT, "personal", "summaries")).map((p) => ({
        tier: "personal",
        path: p,
      }));
      const project =
        activeSlug != null
          ? walkMd(join(MEMORY_ROOT, "projects", activeSlug, "memory", "summaries")).map((p) => ({
              tier: "project",
              slug: activeSlug,
              path: p,
            }))
          : [];
      const summaries = [...personal, ...project].slice(0, limit);
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify({ activeProject: activeSlug, summaries }, null, 2),
          },
        ],
      };
    }
    default:
      throw new Error(`Unknown tool: ${req.params.name}`);
  }
});

const transport = new StdioServerTransport();
await server.connect(transport);
