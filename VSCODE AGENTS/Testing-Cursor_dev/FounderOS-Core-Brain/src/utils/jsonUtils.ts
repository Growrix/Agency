import * as fs from 'node:fs';

export interface JsonReadResult<T> {
  ok: boolean;
  data?: T;
  error?: string;
}

export function readJsonFile<T>(filePath: string): JsonReadResult<T> {
  if (!fs.existsSync(filePath)) {
    return { ok: false, error: `File not found: ${filePath}` };
  }

  try {
    const raw = fs.readFileSync(filePath, 'utf8');
    const parsed = JSON.parse(raw) as T;
    return { ok: true, data: parsed };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return { ok: false, error: `JSON parse failed for ${filePath}: ${message}` };
  }
}

export function writeJsonFile(filePath: string, value: unknown): void {
  fs.writeFileSync(filePath, JSON.stringify(value, null, 2), 'utf8');
}

export function ensureJsonArray(filePath: string): void {
  if (!fs.existsSync(filePath)) {
    writeJsonFile(filePath, []);
    return;
  }

  const result = readJsonFile<unknown>(filePath);
  if (!result.ok || !Array.isArray(result.data)) {
    throw new Error(result.error ?? `JSON array validation failed: ${filePath}`);
  }
}

export function appendJsonArrayItem<T>(filePath: string, item: T): void {
  let current: unknown[] = [];

  if (fs.existsSync(filePath)) {
    const result = readJsonFile<unknown>(filePath);
    if (!result.ok) {
      throw new Error(result.error);
    }
    if (!Array.isArray(result.data)) {
      throw new Error(`Expected JSON array in file: ${filePath}`);
    }
    current = result.data;
  }

  current.push(item as unknown);
  writeJsonFile(filePath, current);
}
