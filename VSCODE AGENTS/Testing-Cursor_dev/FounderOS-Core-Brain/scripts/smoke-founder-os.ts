import * as fs from 'node:fs';
import * as os from 'node:os';
import * as path from 'node:path';
import { IngestProcessor } from '../src/ingestProcessor';
import { MemoryManager } from '../src/memoryManager';
import { ProjectManager } from '../src/projectManager';
import { Retriever } from '../src/retriever';

async function run(): Promise<void> {
  const root = path.join(os.tmpdir(), `founderos_smoke_runtime_${Date.now()}`);
  fs.mkdirSync(root, { recursive: true });

  try {
    const projectManager = new ProjectManager(root);
    const memoryManager = new MemoryManager(root);
    const retriever = new Retriever(root);
    const ingest = new IngestProcessor();

    projectManager.initialize();
    memoryManager.initialize();

    const createdClient = projectManager.createClient('Acme Plumbing');
    const createdProject = projectManager.createProject('Plumbing Website', 'product');

    memoryManager.saveChatMessage('user', 'Need next plan for Acme', createdClient.project.project_id);
    memoryManager.saveChatMessage('assistant', 'We should finalize scope and send quote.', createdClient.project.project_id);
    memoryManager.saveSummary('Acme needs a 5-page site and quote by Friday.', createdClient.project.project_id);

    const ingestResult = await ingest.process(
      'Meeting notes: client Acme needs a 5 page plumbing website. TODO: send quote by Friday. Decision: use blue-white brand.'
    );

    for (const task of ingestResult.tasks) {
      projectManager.addTask(createdProject.project.project_id, task, '', 'medium', 'smoke_ingest');
    }
    for (const decision of ingestResult.decisions) {
      projectManager.addDecision(createdProject.project.project_id, decision, 'smoke ingest', 'smoke_ingest');
    }

    const retrieval = retriever.search('Acme quote plumbing');
    if (retrieval.results.length === 0) {
      throw new Error('Smoke failed: retrieval returned no results');
    }

    const allTasks = projectManager.getAllTasks();
    if (allTasks.tasks.length === 0) {
      throw new Error('Smoke failed: no tasks found after ingest');
    }

    const allDecisions = projectManager.getAllDecisions();
    if (allDecisions.decisions.length === 0) {
      throw new Error('Smoke failed: no decisions found after ingest');
    }

    console.log('FounderOS smoke passed');
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
}

void run().catch((error) => {
  console.error('FounderOS smoke failed:', error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
});
