import * as os from 'node:os';
import * as path from 'node:path';
import { describe, expect, it } from 'vitest';
import { expandHome, resolveStorageRoot } from '../src/utils/pathUtils';

describe('path utilities', () => {
  it('uses the G drive default on Windows when storageRoot is empty', () => {
    const expected = process.platform === 'win32'
      ? path.join('G:\\', 'founderos_core_brain')
      : path.join(os.homedir(), 'founderos_core_brain');

    expect(resolveStorageRoot('')).toBe(expected);
  });

  it('expands home shorthand paths', () => {
    expect(expandHome('~')).toBe(os.homedir());
    expect(expandHome('~/founderos_core_brain')).toBe(
      path.join(os.homedir(), 'founderos_core_brain'),
    );
  });
});