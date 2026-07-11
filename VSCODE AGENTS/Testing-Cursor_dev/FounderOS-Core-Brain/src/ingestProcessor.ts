import type { IngestResult } from './types/schemas';

export class IngestProcessor {
  async process(
    content: string,
    modelExtractor?: (input: string) => Promise<string>
  ): Promise<IngestResult> {
    if (modelExtractor) {
      try {
        const raw = await modelExtractor(content);
        const parsed = parseModelJson(raw);
        return {
          ...parsed,
          source: 'model'
        };
      } catch {
        return fallbackExtract(content);
      }
    }

    return fallbackExtract(content);
  }
}

interface IngestModelShape {
  summary: string;
  tasks: string[];
  decisions: string[];
  open_questions: string[];
  project_hint: string;
}

function parseModelJson(raw: string): IngestResult {
  const cleaned = raw.replace(/```json/gi, '').replace(/```/g, '').trim();
  const parsed = JSON.parse(cleaned) as IngestModelShape;

  if (!parsed.summary || !Array.isArray(parsed.tasks) || !Array.isArray(parsed.decisions) || !Array.isArray(parsed.open_questions)) {
    throw new Error('Model output missing required ingest fields');
  }

  return {
    summary: parsed.summary,
    tasks: parsed.tasks,
    decisions: parsed.decisions,
    open_questions: parsed.open_questions,
    project_hint: parsed.project_hint || 'general',
    source: 'model'
  };
}

function fallbackExtract(content: string): IngestResult {
  const lines = content
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

  const tasks = lines
    .filter((line) => /^(-\s*\[\s?\]|todo[:\s]|action[:\s])/i.test(line))
    .map((line) => line.replace(/^(-\s*\[\s?\]|todo[:\s]|action[:\s])/i, '').trim())
    .filter((line) => line.length > 0)
    .slice(0, 10);

  const inlineTasks = [...content.matchAll(/(?:todo|action)\s*:\s*([^\.\n]+)/gi)]
    .map((match) => match[1].trim())
    .filter((item) => item.length > 0)
    .slice(0, 10);

  const mergedTasks = uniqueList([...tasks, ...inlineTasks]).slice(0, 10);

  const decisions = lines
    .filter((line) => /(decision|decided|approved|finalized)/i.test(line))
    .slice(0, 10);

  const openQuestions = lines.filter((line) => line.includes('?')).slice(0, 10);

  const summary = lines.slice(0, 3).join(' ').slice(0, 260) || 'Ingested note captured.';
  const projectHint = guessProjectHint(lines.join(' '));

  return {
    summary,
    tasks: mergedTasks,
    decisions,
    open_questions: openQuestions,
    project_hint: projectHint,
    source: 'fallback'
  };
}

function uniqueList(items: string[]): string[] {
  return [...new Set(items.map((item) => item.trim()).filter((item) => item.length > 0))];
}

function guessProjectHint(text: string): string {
  const match = text.match(/(client|project)\s+([a-z0-9_\-]+)/i);
  if (!match) {
    return 'general';
  }
  return match[2].toLowerCase();
}
