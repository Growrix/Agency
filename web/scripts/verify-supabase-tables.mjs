#!/usr/bin/env node
import { Client } from "pg";

const expected = [
  "products",
  "product_variants",
  "orders",
  "order_items",
  "downloads",
  "licenses",
  "leads",
  "lead_events",
  "service_requests",
  "conversations",
  "conversation_messages",
  "notification_log",
  "submission_notes",
  "cart_items",
  "coupons",
  "wishlist_items",
  "product_reviews",
  "job_queue",
  "app_state",
];

const connectionString = process.env.SUPABASE_DB_URL ?? process.env.DATABASE_URL;
if (!connectionString) {
  console.error("SUPABASE_DB_URL (or DATABASE_URL) is required.");
  process.exit(2);
}

const client = new Client({
  connectionString,
  ssl: { rejectUnauthorized: false },
});

try {
  await client.connect();

  const sql =
    "select table_name from information_schema.tables where table_schema='public' and table_name = any($1::text[]) order by table_name";

  const result = await client.query(sql, [expected]);
  const found = result.rows.map((row) => row.table_name);
  const missing = expected.filter((name) => !found.includes(name));

  console.log(`FOUND ${found.length}`);
  console.log(found.join(","));
  console.log(`MISSING ${missing.length}`);

  if (missing.length > 0) {
    console.log(missing.join(","));
    process.exitCode = 1;
  }
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
} finally {
  await client.end();
}
