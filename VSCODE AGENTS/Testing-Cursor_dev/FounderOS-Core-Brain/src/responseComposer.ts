import type { DecisionQueryResult, SearchResult, TaskQueryResult } from './types/schemas';
import { formatParseIssues } from './validationReporter';

export function composeSearchResults(topic: string, results: SearchResult[]): string {
  if (results.length === 0) {
    return `No memory found for "${topic}". Try a broader keyword.`;
  }

  const chunks: string[] = [];
  chunks.push(`## Retrieved Memory for "${topic}"`);
  chunks.push('');

  for (const result of results) {
    chunks.push(`### ${result.type.toUpperCase()} - ${result.title}`);
    chunks.push(`Path: ${result.filePath}`);
    chunks.push('```text');
    chunks.push(result.preview);
    chunks.push('```');
    chunks.push('');
  }

  return chunks.join('\n');
}

export function composeTasksBoard(taskResult: TaskQueryResult): string {
  const todo = taskResult.tasks.filter((task) => task.status === 'todo');
  const doing = taskResult.tasks.filter((task) => task.status === 'doing');
  const blocked = taskResult.tasks.filter((task) => task.status === 'blocked');
  const done = taskResult.tasks.filter((task) => task.status === 'done');

  const chunks: string[] = [];
  chunks.push('## FounderOS Task Board');
  chunks.push('');

  if (doing.length > 0) {
    chunks.push('### In Progress');
    for (const task of doing) {
      chunks.push(`- [${task.priority}] ${task.title} (${task.projectName})`);
    }
    chunks.push('');
  }

  if (blocked.length > 0) {
    chunks.push('### Blocked');
    for (const task of blocked) {
      chunks.push(`- [${task.priority}] ${task.title} (${task.projectName})`);
    }
    chunks.push('');
  }

  if (todo.length > 0) {
    chunks.push('### To Do');
    for (const task of todo) {
      chunks.push(`- [${task.priority}] ${task.title} (${task.projectName})`);
    }
    chunks.push('');
  }

  chunks.push(`Done: ${done.length} | Total: ${taskResult.tasks.length}`);
  const warnings = formatParseIssues(taskResult.parseIssues);
  if (warnings) {
    chunks.push('');
    chunks.push(warnings.trim());
  }

  return chunks.join('\n');
}

export function composeStatus(metrics: {
  storageRoot: string;
  activeProjects: number;
  clientProjects: number;
  productProjects: number;
  summaries: number;
  openTasks: number;
  decisions: number;
  taskIssues: TaskQueryResult['parseIssues'];
  decisionIssues: DecisionQueryResult['parseIssues'];
}): string {
  const chunks: string[] = [];
  chunks.push('## FounderOS Status');
  chunks.push('');
  chunks.push('| Metric | Value |');
  chunks.push('| --- | --- |');
  chunks.push(`| Storage Root | ${metrics.storageRoot} |`);
  chunks.push(`| Active Projects | ${metrics.activeProjects} |`);
  chunks.push(`| Client Projects | ${metrics.clientProjects} |`);
  chunks.push(`| Product Projects | ${metrics.productProjects} |`);
  chunks.push(`| Saved Summaries | ${metrics.summaries} |`);
  chunks.push(`| Open Tasks | ${metrics.openTasks} |`);
  chunks.push(`| Logged Decisions | ${metrics.decisions} |`);

  const issues = [...metrics.taskIssues, ...metrics.decisionIssues];
  const warnings = formatParseIssues(issues);
  if (warnings) {
    chunks.push('');
    chunks.push(warnings.trim());
  }

  return chunks.join('\n');
}
