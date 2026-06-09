#!/usr/bin/env node
/**
 * Apply Supabase normalized schema (T048) against the project database.
 *
 * Usage:
 *   SUPABASE_DB_URL="postgres://postgres:<password>@<host>:5432/postgres" \
 *     node scripts/migrate-supabase.mjs
 *
 * The script reads `web/supabase/schema.sql`, splits it on top-level
 * statement terminators, and executes each statement sequentially in a
 * single connection. `create table if not exists` and `create policy`
 * blocks are idempotent — re-running is safe.
 *
 * NOTE: This is intentionally manual. It must NEVER run automatically on
 * a shared environment without operator approval. Run from a trusted
 * workstation with the service-role DB URL available.
 */
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const schemaPath = resolve(__dirname, "..", "supabase", "schema.sql");

const databaseUrl = process.env.SUPABASE_DB_URL ?? process.env.DATABASE_URL;
if (!databaseUrl) {
  console.error(
    "ERROR: SUPABASE_DB_URL (or DATABASE_URL) is required. Use the Supabase 'Connection string' (URI) for the service role.",
  );
  process.exit(2);
}

let Client;
try {
  ({ Client } = await import("pg"));
} catch {
  console.error(
    "ERROR: The 'pg' package is required. Install it with: npm install --no-save pg",
  );
  process.exit(2);
}

const sql = await readFile(schemaPath, "utf8");

const client = new Client({
  connectionString: databaseUrl,
  ssl: databaseUrl.includes("sslmode=disable") ? false : { rejectUnauthorized: false },
});

const started = Date.now();
console.log(`[migrate] connecting to ${redactUrl(databaseUrl)}`);
await client.connect();

try {
  console.log(`[migrate] applying schema (${sql.length} bytes)`);
  await client.query(sql);
  console.log(`[migrate] success in ${Date.now() - started}ms`);
} catch (error) {
  console.error("[migrate] failed:", error instanceof Error ? error.message : error);
  process.exitCode = 1;
} finally {
  await client.end();
}

function redactUrl(url) {
  try {
    const parsed = new URL(url);
    if (parsed.password) parsed.password = "***";
    return parsed.toString();
  } catch {
    return "(unparseable url)";
  }
}
