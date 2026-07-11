import * as fs from 'node:fs';
import * as os from 'node:os';
import * as path from 'node:path';
import { afterEach, describe, expect, it } from 'vitest';
import { MemoryManager } from '../src/memoryManager';
import { ProjectManager } from '../src/projectManager';
import { Retriever } from '../src/retriever';

const roots: string[] = [];

afterEach(() => {
  for (const root of roots.splice(0)) {
    if (fs.existsSync(root)) {
      fs.rmSync(root, { recursive: true, force: true });
    }
  }
});

describe('Retriever', () => {
  it('finds memory by keyword', () => {
    const root = path.join(os.tmpdir(), `founderos_rt_${Date.now()}`);
    roots.push(root);

    const projectManager = new ProjectManager(root);
    const memoryManager = new MemoryManager(root);
    projectManager.initialize();
    memoryManager.initialize();

    const created = projectManager.createProject('Plumbing Website', 'product');
    projectManager.addDecision(created.project.project_id, 'Use five page structure', 'Scope alignment');
    memoryManager.saveSummary('Plumbing Website needs conversion-first content.', created.project.project_id);

    const retriever = new Retriever(root);
    const result = retriever.search('plumbing conversion', 5);

    expect(result.results.length).toBeGreaterThan(0);
  });
});
