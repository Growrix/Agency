import "server-only";

import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { DEFAULT_DATABASE, type DatabaseSchema } from "@/server/data/schema";
import { getSupabaseAdminClient, isSupabaseDatabaseConfigured } from "@/server/supabase/client";

const DATA_DIRECTORY = path.join(process.cwd(), ".data");
const DATABASE_PATH = path.join(DATA_DIRECTORY, "agency-db.json");
const SUPABASE_APP_STATE_ID = "primary";

let writeQueue = Promise.resolve();

async function ensureDataDirectory() {
  await mkdir(DATA_DIRECTORY, { recursive: true });
}

function cloneDefaultDatabase(): DatabaseSchema {
  return {
    inquiries: [...DEFAULT_DATABASE.inquiries],
    appointments: [...DEFAULT_DATABASE.appointments],
    conversations: [...DEFAULT_DATABASE.conversations],
    orders: [...DEFAULT_DATABASE.orders],
    users: [...DEFAULT_DATABASE.users],
    services: [...DEFAULT_DATABASE.services],
    portfolio_projects: [...DEFAULT_DATABASE.portfolio_projects],
    products: [...DEFAULT_DATABASE.products],
    analytics_events: [...DEFAULT_DATABASE.analytics_events],
    audit_logs: [...DEFAULT_DATABASE.audit_logs],
    newsletter_subscribers: [...DEFAULT_DATABASE.newsletter_subscribers],
  };
}

export async function readDatabase(): Promise<DatabaseSchema> {
  if (isSupabaseDatabaseConfigured()) {
    try {
      return await readDatabaseFromSupabase();
    } catch {
      return readDatabaseFromFile();
    }
  }

  return readDatabaseFromFile();
}

async function readDatabaseFromFile(): Promise<DatabaseSchema> {
  await ensureDataDirectory();

  try {
    const content = await readFile(DATABASE_PATH, "utf8");
    return { ...cloneDefaultDatabase(), ...(JSON.parse(content) as Partial<DatabaseSchema>) };
  } catch {
    return cloneDefaultDatabase();
  }
}

export async function writeDatabase(updater: (database: DatabaseSchema) => DatabaseSchema | Promise<DatabaseSchema>) {
  if (isSupabaseDatabaseConfigured()) {
    writeQueue = writeQueue.then(async () => {
      try {
        const current = await readDatabaseFromSupabase();
        const next = await updater(current);
        await writeDatabaseToSupabase(next);
      } catch {
        await writeDatabaseToFile(updater);
      }
    });

    await writeQueue;
    return;
  }

  await writeDatabaseToFile(updater);
}

async function writeDatabaseToFile(updater: (database: DatabaseSchema) => DatabaseSchema | Promise<DatabaseSchema>) {
  await ensureDataDirectory();

  writeQueue = writeQueue.then(async () => {
    const current = await readDatabaseFromFile();
    const next = await updater(current);
    await writeFile(DATABASE_PATH, JSON.stringify(next, null, 2), "utf8");
  });

  await writeQueue;
}

export async function withDatabase<T>(selector: (database: DatabaseSchema) => T | Promise<T>) {
  const database = await readDatabase();
  return selector(database);
}

async function readDatabaseFromSupabase(): Promise<DatabaseSchema> {
  const client = getSupabaseAdminClient();
  const { data, error } = await client
    .from("app_state")
    .select("payload")
    .eq("id", SUPABASE_APP_STATE_ID)
    .maybeSingle<{ payload: Partial<DatabaseSchema> | null }>();

  if (error) {
    throw new Error(`Supabase app_state read failed: ${error.message}`);
  }

  if (!data?.payload) {
    const initial = cloneDefaultDatabase();
    await writeDatabaseToSupabase(initial);
    return initial;
  }

  return { ...cloneDefaultDatabase(), ...data.payload };
}

async function writeDatabaseToSupabase(database: DatabaseSchema) {
  const client = getSupabaseAdminClient();
  const { error } = await client.from("app_state").upsert(
    {
      id: SUPABASE_APP_STATE_ID,
      payload: database,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "id" }
  );

  if (error) {
    throw new Error(`Supabase app_state write failed: ${error.message}`);
  }
}
