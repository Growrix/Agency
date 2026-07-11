import * as fs from 'node:fs';
import * as os from 'node:os';
import * as path from 'node:path';
import { afterEach, describe, expect, it } from 'vitest';
import { ProjectManager } from '../src/projectManager';

const roots: string[] = [];

afterEach(() => {
  for (const root of roots.splice(0)) {
    if (fs.existsSync(root)) {
      fs.rmSync(root, { recursive: true, force: true });
    }
  }
});

describe('ProjectManager', () => {
  it('creates client workspace and appends tasks', () => {
    const root = path.join(os.tmpdir(), `founderos_pm_${Date.now()}`);
    roots.push(root);

    const manager = new ProjectManager(root);
    manager.initialize();

    const created = manager.createClient('Acme Plumbing');
    expect(fs.existsSync(path.join(created.folderPath, 'metadata.json'))).toBe(true);
    expect(fs.existsSync(path.join(created.folderPath, 'tasks.json'))).toBe(true);

    manager.addTask(created.project.project_id, 'Prepare quote');
    const tasks = manager.getAllTasks();
    expect(tasks.tasks.length).toBe(1);
    expect(tasks.tasks[0].title).toBe('Prepare quote');
  });
});
