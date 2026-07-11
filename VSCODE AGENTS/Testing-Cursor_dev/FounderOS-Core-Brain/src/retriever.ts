import * as path from 'node:path';
import { listFiles, readText, walkFiles } from './utils/fileUtils';
import { safeJoin } from './utils/pathUtils';
import type { ParseIssue, SearchResult } from './types/schemas';

export class Retriever {
  private readonly memoryDir: string;
  private readonly projectsDir: string;
  private readonly summariesDir: string;

  constructor(private readonly storageRoot: string) {
    this.memoryDir = safeJoin(storageRoot, 'memory');
    this.projectsDir = safeJoin(storageRoot, 'projects');
    this.summariesDir = safeJoin(storageRoot, 'memory', 'summaries');
  }

  search(query: string, limit = 8, projectFolderPath?: string): { results: SearchResult[]; parseIssues: ParseIssue[] } {
    const terms = query
      .toLowerCase()
      .split(/\s+/)
      .filter((term) => term.length > 1);

    if (terms.length === 0) {
      return { results: [], parseIssues: [] };
    }

    const parseIssues: ParseIssue[] = [];
    const results: SearchResult[] = [];

    const roots = [this.memoryDir, this.projectsDir];
    if (projectFolderPath) {
      roots.unshift(projectFolderPath);
    }

    for (const root of roots) {
      const files = walkFiles(root, ['.md', '.json', '.txt']);
      for (const filePath of files) {
        if (path.basename(filePath) === 'metadata.json') {
          continue;
        }

        const content = readText(filePath);
        if (content === null) {
          parseIssues.push({ filePath, message: 'Unable to read file during retrieval' });
          continue;
        }

        const relevance = scoreContent(content, terms);
        if (relevance <= 0) {
          continue;
        }

        results.push({
          title: path.basename(filePath),
          filePath,
          preview: content.slice(0, 420),
          relevance,
          type: classify(path.basename(filePath))
        });
      }
    }

    const deduped = dedupeResults(results)
      .sort((a, b) => b.relevance - a.relevance)
      .slice(0, limit);

    return { results: deduped, parseIssues };
  }

  listSummaries(limit = 20): SearchResult[] {
    const files = listFiles(this.summariesDir)
      .filter((filePath) => filePath.endsWith('.md'))
      .sort()
      .reverse()
      .slice(0, limit);

    return files.map((filePath) => {
      const content = readText(filePath) ?? '';
      return {
        title: path.basename(filePath),
        filePath,
        preview: content.slice(0, 420),
        relevance: 1,
        type: 'summary' as const
      };
    });
  }

  buildContextBlock(query: string, maxChars: number, projectFolderPath?: string): string {
    const { results } = this.search(query, 5, projectFolderPath);
    if (results.length === 0) {
      return '';
    }

    let output = '## Relevant Memory Context\n\n';
    let total = output.length;

    for (const item of results) {
      const section = `### ${item.title}\n${item.preview}\n\n`;
      if (total + section.length > maxChars) {
        break;
      }
      output += section;
      total += section.length;
    }

    return output;
  }
}

function classify(fileName: string): SearchResult['type'] {
  const lower = fileName.toLowerCase();
  if (lower.startsWith('summary_')) {
    return 'summary';
  }
  if (lower.startsWith('chat_')) {
    return 'chat';
  }
  if (lower.includes('decision')) {
    return 'decision';
  }
  if (lower.includes('task')) {
    return 'task';
  }
  if (lower === 'metadata.json') {
    return 'metadata';
  }
  return 'note';
}

function scoreContent(content: string, terms: string[]): number {
  const lower = content.toLowerCase();
  let score = 0;

  for (const term of terms) {
    const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const matches = lower.match(new RegExp(escaped, 'g'));
    score += matches ? matches.length : 0;
  }

  return score;
}

function dedupeResults(results: SearchResult[]): SearchResult[] {
  const map = new Map<string, SearchResult>();
  for (const item of results) {
    const existing = map.get(item.filePath);
    if (!existing || item.relevance > existing.relevance) {
      map.set(item.filePath, item);
    }
  }
  return [...map.values()];
}
