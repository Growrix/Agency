import * as fs from 'node:fs';
import * as os from 'node:os';
import * as path from 'node:path';
import { afterEach, describe, expect, it } from 'vitest';
import { IngestProcessor } from '../src/ingestProcessor';
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

describe('Phase1 smoke flow', () => {
  it('runs create -> ingest -> retrieve flow', async () => {
    const root = path.join(os.tmpdir(), `founderos_smoke_test_${Date.now()}`);
    roots.push(root);

    const projectManager = new ProjectManager(root);
    const memoryManager = new MemoryManager(root);
    const retriever = new Retriever(root);
    const ingest = new IngestProcessor();

    projectManager.initialize();
    memoryManager.initialize();

    const created = projectManager.createClient('Acme Plumbing');

    const ingestResult = await ingest.process(
      'Meeting notes: client Acme needs a 5 page plumbing website. TODO: send quote by Friday. Decision: use blue-white brand.'
    );

    for (const task of ingestResult.tasks) {
      projectManager.addTask(created.project.project_id, task);
    }

    for (const decision of ingestResult.decisions) {
      projectManager.addDecision(created.project.project_id, decision, 'ingest');
    }

    memoryManager.saveSummary(ingestResult.summary, created.project.project_id);

    const retrieval = retriever.search('Acme quote plumbing');
    expect(retrieval.results.length).toBeGreaterThan(0);
  });
});
