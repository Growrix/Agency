import * as path from 'node:path';
import {
  createId,
  ensureDir,
  ensureTextFileIfMissing,
  exists,
  listDirectories,
  nowIso,
  todayIsoDate,
  writeText
} from './utils/fileUtils';
import { appendJsonArrayItem, ensureJsonArray, readJsonFile, writeJsonFile } from './utils/jsonUtils';
import { safeJoin, toSlug } from './utils/pathUtils';
import type {
  Decision,
  DecisionQueryResult,
  ParseIssue,
  Priority,
  Project,
  ProjectInfo,
  ProjectStatus,
  ProjectType,
  Task,
  TaskQueryResult
} from './types/schemas';

export class ProjectManager {
  private readonly projectsDir: string;

  constructor(private readonly storageRoot: string) {
    this.projectsDir = safeJoin(storageRoot, 'projects');
  }

  initialize(): void {
    ensureDir(this.projectsDir);
    ensureDir(path.join(this.projectsDir, 'archive'));
  }

  createClient(name: string): { folderPath: string; project: Project } {
    return this.createProjectByType(name, 'client');
  }

  createProject(name: string, type: Exclude<ProjectType, 'client'> = 'product'): { folderPath: string; project: Project } {
    return this.createProjectByType(name, type);
  }

  listProjects(statusFilter?: ProjectStatus): ProjectInfo[] {
    const folders = listDirectories(this.projectsDir).filter((folder) => folder !== 'archive');
    const projects: ProjectInfo[] = [];

    for (const folder of folders) {
      const folderPath = path.join(this.projectsDir, folder);
      const metadataPath = path.join(folderPath, 'metadata.json');
      const metadataResult = readJsonFile<Project>(metadataPath);

      if (!metadataResult.ok || !metadataResult.data) {
        continue;
      }

      const info: ProjectInfo = {
        project_id: metadataResult.data.project_id,
        name: metadataResult.data.name,
        type: metadataResult.data.type,
        status: metadataResult.data.status,
        folderPath
      };

      if (!statusFilter || info.status === statusFilter) {
        projects.push(info);
      }
    }

    return projects;
  }

  findProject(projectIdOrName: string): ProjectInfo | undefined {
    const normalized = projectIdOrName.trim().toLowerCase();
    const slug = toSlug(projectIdOrName);

    return this.listProjects().find((project) => {
      return (
        project.project_id.toLowerCase() === normalized ||
        project.name.toLowerCase() === normalized ||
        toSlug(project.name) === slug
      );
    });
  }

  addTask(projectId: string, title: string, description = '', priority: Priority = 'medium', sourceId = ''): Task {
    const project = this.findProject(projectId);
    if (!project) {
      throw new Error(`Project not found for task: ${projectId}`);
    }

    const task: Task = {
      task_id: createId('task'),
      project_id: project.project_id,
      title,
      description,
      status: 'todo',
      priority,
      created_at: nowIso(),
      updated_at: nowIso(),
      source_id: sourceId
    };

    const filePath = path.join(project.folderPath, 'tasks.json');
    appendJsonArrayItem(filePath, task);
    return task;
  }

  addDecision(projectId: string, decisionText: string, reason: string, sourceId = '', impact = ''): Decision {
    const project = this.findProject(projectId);
    if (!project) {
      throw new Error(`Project not found for decision: ${projectId}`);
    }

    const decision: Decision = {
      decision_id: createId('dec'),
      project_id: project.project_id,
      decision: decisionText,
      reason,
      impact,
      created_at: nowIso(),
      source_id: sourceId
    };

    const filePath = path.join(project.folderPath, 'decisions.json');
    appendJsonArrayItem(filePath, decision);
    return decision;
  }

  getAllTasks(statusFilter?: Task['status']): TaskQueryResult {
    const parseIssues: ParseIssue[] = [];
    const tasks: Array<Task & { projectName: string }> = [];

    for (const project of this.listProjects()) {
      const tasksPath = path.join(project.folderPath, 'tasks.json');
      const result = readJsonFile<unknown>(tasksPath);
      if (!result.ok) {
        parseIssues.push({ filePath: tasksPath, message: result.error ?? 'Unknown tasks parse error' });
        continue;
      }

      if (!Array.isArray(result.data)) {
        parseIssues.push({ filePath: tasksPath, message: 'Expected tasks.json to be an array' });
        continue;
      }

      for (const rawItem of result.data) {
        const task = rawItem as Task;
        if (statusFilter && task.status !== statusFilter) {
          continue;
        }
        tasks.push({ ...task, projectName: project.name });
      }
    }

    return { tasks, parseIssues };
  }

  getAllDecisions(): DecisionQueryResult {
    const parseIssues: ParseIssue[] = [];
    const decisions: Array<Decision & { projectName: string }> = [];

    for (const project of this.listProjects()) {
      const decisionsPath = path.join(project.folderPath, 'decisions.json');
      const result = readJsonFile<unknown>(decisionsPath);
      if (!result.ok) {
        parseIssues.push({ filePath: decisionsPath, message: result.error ?? 'Unknown decisions parse error' });
        continue;
      }

      if (!Array.isArray(result.data)) {
        parseIssues.push({ filePath: decisionsPath, message: 'Expected decisions.json to be an array' });
        continue;
      }

      for (const rawItem of result.data) {
        decisions.push({ ...(rawItem as Decision), projectName: project.name });
      }
    }

    return { decisions, parseIssues };
  }

  private createProjectByType(name: string, type: ProjectType): { folderPath: string; project: Project } {
    const slug = toSlug(name);
    if (slug.length === 0) {
      throw new Error('Name must contain at least one letter or number.');
    }

    const prefix = type === 'client' ? 'client' : type === 'product' ? 'product' : type === 'idea' ? 'idea' : 'internal';
    const folderPath = path.join(this.projectsDir, `${prefix}_${slug}`);

    if (exists(folderPath)) {
      throw new Error(`Project folder already exists: ${folderPath}`);
    }

    ensureDir(folderPath);
    ensureDir(path.join(folderPath, 'chat_logs'));
    ensureDir(path.join(folderPath, 'meeting_notes'));
    ensureDir(path.join(folderPath, 'archive'));
    ensureDir(path.join(folderPath, 'exports'));

    if (type === 'client') {
      ensureDir(path.join(folderPath, 'documents'));
    }

    if (type === 'product') {
      ensureDir(path.join(folderPath, 'research'));
    }

    if (type === 'idea') {
      ensureDir(path.join(folderPath, 'notes'));
    }

    const now = nowIso();
    const project: Project = {
      project_id: createId('proj'),
      name,
      slug,
      type,
      status: 'active',
      created_at: now,
      updated_at: now,
      summary: '',
      goals: [],
      tasks: [],
      decisions: [],
      references: []
    };

    writeJsonFile(path.join(folderPath, 'metadata.json'), project);

    ensureTextFileIfMissing(
      path.join(folderPath, 'overview.md'),
      `# ${name}\n\n- Type: ${type}\n- Status: active\n- Created: ${todayIsoDate()}\n\n## Overview\n\n\n## Goals\n\n- \n`
    );

    if (type === 'client') {
      ensureTextFileIfMissing(
        path.join(folderPath, 'scope.md'),
        `# ${name} Scope\n\n## In Scope\n\n- \n\n## Out of Scope\n\n- \n\n## Deliverables\n\n- \n`
      );
    }

    if (type === 'product') {
      ensureTextFileIfMissing(
        path.join(folderPath, 'roadmap.md'),
        `# ${name} Roadmap\n\n## Phase 1\n\n- [ ] \n\n## Phase 2\n\n- [ ] \n\n## Phase 3\n\n- [ ] \n`
      );
    }

    if (type === 'idea') {
      ensureTextFileIfMissing(
        path.join(folderPath, 'validation.md'),
        `# ${name} Validation\n\n## Assumptions\n\n- \n\n## Risks\n\n- \n\n## Next Validation Steps\n\n- [ ] \n`
      );
    }

    ensureTextFileIfMissing(path.join(folderPath, 'plan.md'), '# Plan\n\n## Current Plan\n\n- \n');

    writeText(path.join(folderPath, 'tasks.json'), '[]\n');
    writeText(path.join(folderPath, 'decisions.json'), '[]\n');

    ensureJsonArray(path.join(folderPath, 'tasks.json'));
    ensureJsonArray(path.join(folderPath, 'decisions.json'));

    return { folderPath, project };
  }
}
