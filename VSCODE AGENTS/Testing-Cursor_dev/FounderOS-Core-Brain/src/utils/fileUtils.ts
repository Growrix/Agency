import * as fs from 'node:fs';
import * as path from 'node:path';

export function ensureDir(dirPath: string): void {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

export function ensureTextFileIfMissing(filePath: string, content: string): void {
  if (!fs.existsSync(filePath)) {
    writeText(filePath, content);
  }
}

export function writeText(filePath: string, content: string): void {
  ensureDir(path.dirname(filePath));
  fs.writeFileSync(filePath, content, 'utf8');
}

export function appendText(filePath: string, content: string): void {
  ensureDir(path.dirname(filePath));
  fs.appendFileSync(filePath, content, 'utf8');
}

export function readText(filePath: string): string | null {
  if (!fs.existsSync(filePath)) {
    return null;
  }
  try {
    return fs.readFileSync(filePath, 'utf8');
  } catch {
    return null;
  }
}

export function exists(filePath: string): boolean {
  return fs.existsSync(filePath);
}

export function listDirectories(dirPath: string): string[] {
  if (!fs.existsSync(dirPath)) {
    return [];
  }

  return fs.readdirSync(dirPath).filter((entry) => {
    const full = path.join(dirPath, entry);
    return fs.statSync(full).isDirectory();
  });
}

export function listFiles(dirPath: string): string[] {
  if (!fs.existsSync(dirPath)) {
    return [];
  }

  return fs.readdirSync(dirPath)
    .map((entry) => path.join(dirPath, entry))
    .filter((filePath) => fs.statSync(filePath).isFile());
}

export function walkFiles(dirPath: string, extensions?: string[]): string[] {
  if (!fs.existsSync(dirPath)) {
    return [];
  }

  const output: string[] = [];

  for (const entry of fs.readdirSync(dirPath)) {
    const full = path.join(dirPath, entry);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      output.push(...walkFiles(full, extensions));
      continue;
    }

    if (!extensions || extensions.some((ext) => full.endsWith(ext))) {
      output.push(full);
    }
  }

  return output;
}

export function nowIso(): string {
  return new Date().toISOString();
}

export function todayIsoDate(): string {
  return new Date().toISOString().split('T')[0];
}

export function createId(prefix: string): string {
  const random = Math.random().toString(36).slice(2, 10);
  return `${prefix}_${Date.now()}_${random}`;
}
