import * as fs from 'node:fs';
import * as os from 'node:os';
import * as path from 'node:path';
import { afterEach, describe, expect, it } from 'vitest';
import { createId, ensureDir, readText, writeText } from '../src/utils/fileUtils';
import { toSlug } from '../src/utils/pathUtils';

const tempRoots: string[] = [];

afterEach(() => {
  for (const root of tempRoots.splice(0)) {
    if (fs.existsSync(root)) {
      fs.rmSync(root, { recursive: true, force: true });
    }
  }
});

describe('file utilities', () => {
  it('writes and reads text files', () => {
    const root = path.join(os.tmpdir(), `founderos_test_${Date.now()}_a`);
    tempRoots.push(root);
    ensureDir(root);

    const target = path.join(root, 'sample.txt');
    writeText(target, 'hello');

    expect(readText(target)).toBe('hello');
  });

  it('builds stable ids and slugs', () => {
    const id = createId('task');
    expect(id.startsWith('task_')).toBe(true);
    expect(toSlug('Acme Corp 2026')).toBe('acme_corp_2026');
  });
});
