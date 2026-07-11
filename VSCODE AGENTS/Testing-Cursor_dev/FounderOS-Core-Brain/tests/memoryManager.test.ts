import * as fs from 'node:fs';
import * as os from 'node:os';
import * as path from 'node:path';
import { afterEach, describe, expect, it } from 'vitest';
import { MemoryManager } from '../src/memoryManager';

const roots: string[] = [];

afterEach(() => {
  for (const root of roots.splice(0)) {
    if (fs.existsSync(root)) {
      fs.rmSync(root, { recursive: true, force: true });
    }
  }
});

describe('MemoryManager', () => {
  it('saves chat logs and summary docs', () => {
    const root = path.join(os.tmpdir(), `founderos_mm_${Date.now()}`);
    roots.push(root);

    const manager = new MemoryManager(root);
    manager.initialize();

    manager.saveChatMessage('user', 'Need project plan', 'general');
    const summaryPath = manager.saveSummary('## What Was Discussed\n- Project planning', 'general');

    expect(fs.existsSync(summaryPath)).toBe(true);
    const chatsDir = path.join(root, 'memory', 'chats');
    const chatFiles = fs.readdirSync(chatsDir);
    expect(chatFiles.length).toBe(1);
  });
});
