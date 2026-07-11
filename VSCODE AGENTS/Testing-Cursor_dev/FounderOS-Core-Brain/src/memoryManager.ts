import * as path from 'node:path';
import {
  appendText,
  createId,
  ensureDir,
  ensureTextFileIfMissing,
  nowIso,
  todayIsoDate,
  writeText
} from './utils/fileUtils';
import { appendJsonArrayItem, writeJsonFile } from './utils/jsonUtils';
import type { ChatMessage, MemoryRecord } from './types/schemas';

export class MemoryManager {
  private readonly memoryDir: string;
  private readonly chatsDir: string;
  private readonly summariesDir: string;
  private readonly decisionsDir: string;
  private readonly tasksDir: string;
  private readonly entitiesDir: string;

  constructor(private readonly storageRoot: string) {
    this.memoryDir = path.join(storageRoot, 'memory');
    this.chatsDir = path.join(this.memoryDir, 'chats');
    this.summariesDir = path.join(this.memoryDir, 'summaries');
    this.decisionsDir = path.join(this.memoryDir, 'decisions');
    this.tasksDir = path.join(this.memoryDir, 'tasks');
    this.entitiesDir = path.join(this.memoryDir, 'entities');
  }

  initialize(): void {
    ensureDir(this.memoryDir);
    ensureDir(this.chatsDir);
    ensureDir(this.summariesDir);
    ensureDir(this.decisionsDir);
    ensureDir(this.tasksDir);
    ensureDir(this.entitiesDir);
    ensureDir(path.join(this.memoryDir, 'search_index'));

    const logsDir = path.join(this.storageRoot, 'logs');
    ensureDir(logsDir);
    ensureTextFileIfMissing(path.join(logsDir, 'app.log'), '');
    ensureTextFileIfMissing(path.join(logsDir, 'agent.log'), '');
    ensureTextFileIfMissing(path.join(logsDir, 'memory.log'), '');
    ensureTextFileIfMissing(path.join(logsDir, 'error.log'), '');
  }

  saveChatMessage(role: ChatMessage['role'], content: string, projectId = 'general'): ChatMessage {
    const message: ChatMessage = {
      message_id: createId('msg'),
      role,
      project_id: projectId,
      timestamp: nowIso(),
      content,
      tags: [],
      related_ids: []
    };

    const chatFile = path.join(this.chatsDir, `chat_${todayIsoDate()}.json`);
    appendJsonArrayItem(chatFile, message);
    this.appendLog('memory.log', `[CHAT] ${message.message_id} ${role}`);
    return message;
  }

  saveSummary(content: string, projectId = 'general'): string {
    const filePath = path.join(this.summariesDir, `summary_${todayIsoDate()}_${createId('sum')}.md`);
    const payload = [
      `# Summary - ${todayIsoDate()}`,
      '',
      `- Project: ${projectId}`,
      `- Generated: ${nowIso()}`,
      '',
      content,
      ''
    ].join('\n');

    writeText(filePath, payload);
    this.appendLog('memory.log', `[SUMMARY] ${filePath}`);
    return filePath;
  }

  saveRawIngest(content: string, source: string, projectId = 'general'): string {
    const rawDir = path.join(this.storageRoot, 'inbox', 'raw');
    ensureDir(rawDir);
    const filePath = path.join(rawDir, `${todayIsoDate()}_${createId('raw')}.txt`);
    const payload = [
      `Source: ${source}`,
      `Project: ${projectId}`,
      `Saved: ${nowIso()}`,
      '',
      content
    ].join('\n');

    writeText(filePath, payload);
    this.appendLog('memory.log', `[RAW_INGEST] ${filePath}`);
    return filePath;
  }

  saveProcessedIngest(projectFolderPath: string, label: string, content: string): string {
    const notesDir = path.join(projectFolderPath, 'meeting_notes');
    ensureDir(notesDir);
    const filePath = path.join(notesDir, `${label}_${todayIsoDate()}_${createId('proc')}.md`);
    writeText(filePath, content);
    this.appendLog('memory.log', `[PROCESSED_INGEST] ${filePath}`);
    return filePath;
  }

  saveMemoryRecord(record: MemoryRecord): string {
    const filePath = path.join(this.entitiesDir, `${record.id}.json`);
    writeJsonFile(filePath, record);
    this.appendLog('memory.log', `[MEM_RECORD] ${record.id}`);
    return filePath;
  }

  appendAgentLog(message: string): void {
    this.appendLog('agent.log', message);
  }

  appendErrorLog(message: string): void {
    this.appendLog('error.log', message);
  }

  private appendLog(fileName: string, message: string): void {
    const logPath = path.join(this.storageRoot, 'logs', fileName);
    appendText(logPath, `[${nowIso()}] ${message}\n`);
  }
}
