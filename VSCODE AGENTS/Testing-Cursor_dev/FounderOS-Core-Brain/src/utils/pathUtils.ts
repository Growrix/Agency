import * as os from 'node:os';
import * as path from 'node:path';

export function resolveStorageRoot(configValue: string): string {
  if (configValue.trim().length > 0) {
    return expandHome(configValue.trim());
  }
  return getDefaultStorageRoot();
}

export function getDefaultStorageRoot(): string {
  if (process.platform === 'win32') {
    return path.join('G:\\', 'founderos_core_brain');
  }

  return path.join(os.homedir(), 'founderos_core_brain');
}

export function expandHome(value: string): string {
  if (value === '~') {
    return os.homedir();
  }

  if (value.startsWith('~/') || value.startsWith('~\\')) {
    return path.join(os.homedir(), value.slice(2));
  }

  return value;
}

export function toSlug(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '')
    .slice(0, 80);
}

export function safeJoin(rootPath: string, ...segments: string[]): string {
  const joined = path.resolve(rootPath, ...segments);
  const root = path.resolve(rootPath);
  if (!joined.startsWith(root)) {
    throw new Error(`Path escapes storage root: ${joined}`);
  }
  return joined;
}
