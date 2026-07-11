export type ProjectType = 'client' | 'product' | 'idea' | 'internal';
export type ProjectStatus = 'active' | 'paused' | 'archived';
export type TaskStatus = 'todo' | 'doing' | 'blocked' | 'done';
export type Priority = 'low' | 'medium' | 'high';

export interface Project {
  project_id: string;
  name: string;
  slug: string;
  type: ProjectType;
  status: ProjectStatus;
  created_at: string;
  updated_at: string;
  summary: string;
  goals: string[];
  tasks: string[];
  decisions: string[];
  references: string[];
}

export interface Task {
  task_id: string;
  project_id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: Priority;
  created_at: string;
  updated_at: string;
  source_id: string;
}

export interface Decision {
  decision_id: string;
  project_id: string;
  decision: string;
  reason: string;
  impact: string;
  created_at: string;
  source_id: string;
}

export interface ChatMessage {
  message_id: string;
  role: 'user' | 'assistant' | 'system';
  project_id: string;
  timestamp: string;
  content: string;
  tags: string[];
  related_ids: string[];
}

export interface MemoryRecord {
  id: string;
  timestamp: string;
  source: 'chat' | 'meeting' | 'document' | 'manual';
  project_id: string;
  client_id: string | null;
  type: 'discussion' | 'decision' | 'task' | 'summary' | 'meeting' | 'idea' | 'plan';
  importance: 'low' | 'medium' | 'high';
  tags: string[];
  content: string;
  summary: string;
  next_actions: string[];
  related_ids: string[];
  status: 'active' | 'archived';
}

export interface SearchResult {
  title: string;
  filePath: string;
  preview: string;
  relevance: number;
  type: 'summary' | 'decision' | 'task' | 'chat' | 'note' | 'metadata';
}

export interface IngestResult {
  summary: string;
  tasks: string[];
  decisions: string[];
  open_questions: string[];
  project_hint: string;
  source: 'model' | 'fallback';
}

export interface ProjectInfo {
  project_id: string;
  name: string;
  type: ProjectType;
  status: ProjectStatus;
  folderPath: string;
}

export interface ParseIssue {
  filePath: string;
  message: string;
}

export interface TaskQueryResult {
  tasks: Array<Task & { projectName: string }>;
  parseIssues: ParseIssue[];
}

export interface DecisionQueryResult {
  decisions: Array<Decision & { projectName: string }>;
  parseIssues: ParseIssue[];
}

export interface RetrievalResponse {
  results: SearchResult[];
  parseIssues: ParseIssue[];
}
