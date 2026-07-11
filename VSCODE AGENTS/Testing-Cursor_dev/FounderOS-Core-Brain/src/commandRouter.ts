export type SupportedCommand =
  | 'new-client'
  | 'new-project'
  | 'ingest'
  | 'summarize'
  | 'retrieve'
  | 'tasks'
  | 'status'
  | 'chat';

export function resolveCommand(command: string | undefined, prompt: string): SupportedCommand {
  const normalized = (command ?? '').trim().toLowerCase();
  if (normalized.length > 0) {
    if (
      normalized === 'new-client' ||
      normalized === 'new-project' ||
      normalized === 'ingest' ||
      normalized === 'summarize' ||
      normalized === 'retrieve' ||
      normalized === 'tasks' ||
      normalized === 'status'
    ) {
      return normalized;
    }
  }

  const promptNormalized = prompt.trim();
  if (promptNormalized.startsWith('/new-client')) {
    return 'new-client';
  }
  if (promptNormalized.startsWith('/new-project')) {
    return 'new-project';
  }
  if (promptNormalized.startsWith('/ingest')) {
    return 'ingest';
  }
  if (promptNormalized.startsWith('/summarize')) {
    return 'summarize';
  }
  if (promptNormalized.startsWith('/retrieve')) {
    return 'retrieve';
  }
  if (promptNormalized.startsWith('/tasks')) {
    return 'tasks';
  }
  if (promptNormalized.startsWith('/status')) {
    return 'status';
  }

  return 'chat';
}

export function stripLeadingCommand(prompt: string): string {
  const trimmed = prompt.trim();
  if (!trimmed.startsWith('/')) {
    return trimmed;
  }
  const firstSpace = trimmed.indexOf(' ');
  if (firstSpace === -1) {
    return '';
  }
  return trimmed.slice(firstSpace + 1).trim();
}
