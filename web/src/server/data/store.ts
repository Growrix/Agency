import "server-only";

import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { DEFAULT_DATABASE, type DatabaseSchema } from "@/server/data/schema";

const DATA_DIRECTORY = path.join(process.cwd(), ".data");
const DATABASE_PATH = path.join(DATA_DIRECTORY, "agency-db.json");

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
  };
}

export async function readDatabase(): Promise<DatabaseSchema> {
  await ensureDataDirectory();

  try {
    const content = await readFile(DATABASE_PATH, "utf8");
    return { ...cloneDefaultDatabase(), ...(JSON.parse(content) as Partial<DatabaseSchema>) };
  } catch {
    return cloneDefaultDatabase();
  }
}

export async function writeDatabase(updater: (database: DatabaseSchema) => DatabaseSchema | Promise<DatabaseSchema>) {
  await ensureDataDirectory();

  writeQueue = writeQueue.then(async () => {
    const current = await readDatabase();
    const next = await updater(current);
    await writeFile(DATABASE_PATH, JSON.stringify(next, null, 2), "utf8");
  });

  await writeQueue;
}

export async function withDatabase<T>(selector: (database: DatabaseSchema) => T | Promise<T>) {
  const database = await readDatabase();
  return selector(database);
}
