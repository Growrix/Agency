import * as path from 'node:path';
import * as vscode from 'vscode';
import { resolveCommand, stripLeadingCommand } from './commandRouter';
import { IngestProcessor } from './ingestProcessor';
import { MemoryManager } from './memoryManager';
import { ProjectManager } from './projectManager';
import { composeSearchResults, composeStatus, composeTasksBoard } from './responseComposer';
import { Retriever } from './retriever';
import type { IngestResult, ProjectInfo } from './types/schemas';
import { createId, ensureDir, ensureTextFileIfMissing, nowIso, todayIsoDate, writeText } from './utils/fileUtils';
import { writeJsonFile } from './utils/jsonUtils';
import { safeJoin } from './utils/pathUtils';

export class CoreAgent {
  private readonly projectManager: ProjectManager;
  private readonly memoryManager: MemoryManager;
  private readonly retriever: Retriever;
  private readonly ingestProcessor: IngestProcessor;

  constructor(
    private readonly storageRoot: string,
    private readonly autoSave: boolean,
    private readonly maxContextChars: number
  ) {
    this.projectManager = new ProjectManager(storageRoot);
    this.memoryManager = new MemoryManager(storageRoot);
    this.retriever = new Retriever(storageRoot);
    this.ingestProcessor = new IngestProcessor();
  }

  async initialize(): Promise<void> {
    ensureDir(this.storageRoot);
    ensureDir(path.join(this.storageRoot, 'config'));
    ensureDir(path.join(this.storageRoot, 'inbox', 'raw'));
    ensureDir(path.join(this.storageRoot, 'inbox', 'processed'));
    ensureDir(path.join(this.storageRoot, 'discussions', 'active'));
    ensureDir(path.join(this.storageRoot, 'discussions', 'archived'));
    ensureDir(path.join(this.storageRoot, 'exports', 'markdown'));
    ensureDir(path.join(this.storageRoot, 'exports', 'json'));
    ensureDir(path.join(this.storageRoot, 'exports', 'reports'));

    this.projectManager.initialize();
    this.memoryManager.initialize();

    this.bootstrapConfigFiles();
  }

  async handle(
    request: vscode.ChatRequest,
    context: vscode.ChatContext,
    stream: vscode.ChatResponseStream,
    token: vscode.CancellationToken
  ): Promise<void> {
    const resolvedCommand = resolveCommand(request.command, request.prompt);
    const commandInput = request.command ? request.prompt.trim() : stripLeadingCommand(request.prompt);

    if (resolvedCommand === 'new-client') {
      await this.handleNewClient(commandInput, stream);
      return;
    }

    if (resolvedCommand === 'new-project') {
      await this.handleNewProject(commandInput, stream);
      return;
    }

    if (resolvedCommand === 'ingest') {
      await this.handleIngest(commandInput, stream, token);
      return;
    }

    if (resolvedCommand === 'summarize') {
      await this.handleSummarize(commandInput, context, stream, token);
      return;
    }

    if (resolvedCommand === 'retrieve') {
      await this.handleRetrieve(commandInput, stream);
      return;
    }

    if (resolvedCommand === 'tasks') {
      await this.handleTasks(stream);
      return;
    }

    if (resolvedCommand === 'status') {
      await this.handleStatus(stream);
      return;
    }

    await this.handleChat(request.prompt.trim(), stream, token);
  }

  private async handleNewClient(name: string, stream: vscode.ChatResponseStream): Promise<void> {
    if (!name) {
      stream.markdown('Provide a client name. Example: /new-client Acme Corp');
      return;
    }

    const created = this.projectManager.createClient(name);
    stream.markdown([
      `## Client Created: ${created.project.name}`,
      '',
      `Path: ${created.folderPath}`,
      '',
      'Initialized: metadata, overview, scope, plan, tasks, decisions, chat logs, meeting notes, documents.',
      '',
      'Next: start discussing this client and run /summarize after key planning moments.'
    ].join('\n'));
  }

  private async handleNewProject(name: string, stream: vscode.ChatResponseStream): Promise<void> {
    if (!name) {
      stream.markdown('Provide a project name. Example: /new-project Plumbing Website');
      return;
    }

    const created = this.projectManager.createProject(name, 'product');
    stream.markdown([
      `## Project Created: ${created.project.name}`,
      '',
      `Path: ${created.folderPath}`,
      '',
      'Initialized: metadata, overview, roadmap, plan, tasks, decisions, chat logs, meeting notes, research.',
      '',
      'Next: ask planning questions and use /tasks to track execution.'
    ].join('\n'));
  }

  private async handleIngest(content: string, stream: vscode.ChatResponseStream, token: vscode.CancellationToken): Promise<void> {
    if (!content) {
      stream.markdown('Paste your note after /ingest so FounderOS can structure it.');
      return;
    }

    const model = await this.selectModel();
    const result = await this.ingestProcessor.process(content, model ? (input) => this.extractWithModel(model, input, token) : undefined);

    const rawPath = this.memoryManager.saveRawIngest(content, 'chat', result.project_hint || 'general');
    const sourceId = createId('ing');

    const matchedProject = this.tryMatchProject(result.project_hint);
    let processedPath = '';

    if (matchedProject) {
      for (const task of result.tasks) {
        this.projectManager.addTask(matchedProject.project_id, task, '', 'medium', sourceId);
      }
      for (const decision of result.decisions) {
        this.projectManager.addDecision(matchedProject.project_id, decision, 'Extracted from ingest content', sourceId);
      }

      const doc = this.formatIngestMarkdown(result, matchedProject.name);
      processedPath = this.memoryManager.saveProcessedIngest(matchedProject.folderPath, 'ingest', doc);
    }

    const summaryPath = this.memoryManager.saveSummary(this.formatIngestMarkdown(result, matchedProject?.name ?? 'general'), matchedProject?.project_id ?? 'general');

    stream.markdown([
      '## Ingest Result',
      '',
      `Summary: ${result.summary}`,
      '',
      `Tasks extracted: ${result.tasks.length}`,
      `Decisions extracted: ${result.decisions.length}`,
      `Open questions: ${result.open_questions.length}`,
      `Source mode: ${result.source}`,
      '',
      `Raw saved: ${rawPath}`,
      `Summary saved: ${summaryPath}`,
      processedPath ? `Project note saved: ${processedPath}` : 'Project note: no matching project found, saved to summary memory only.',
      matchedProject ? `Linked project: ${matchedProject.name}` : 'Linked project: none'
    ].join('\n'));
  }

  private async handleSummarize(
    extraContext: string,
    context: vscode.ChatContext,
    stream: vscode.ChatResponseStream,
    token: vscode.CancellationToken
  ): Promise<void> {
    const historyText = this.extractHistory(context);
    if (!historyText) {
      stream.markdown('No conversation history available to summarize yet.');
      return;
    }

    const model = await this.selectModel();
    let summary = '';

    if (model) {
      summary = await this.summarizeWithModel(model, historyText, extraContext, token);
    } else {
      summary = this.fallbackSummary(historyText, extraContext);
    }

    const summaryPath = this.memoryManager.saveSummary(summary, 'general');
    stream.markdown(`${summary}\n\nSaved: ${summaryPath}`);
  }

  private async handleRetrieve(topic: string, stream: vscode.ChatResponseStream): Promise<void> {
    if (!topic) {
      stream.markdown('Provide a topic. Example: /retrieve Acme');
      return;
    }

    const matchedProject = this.tryMatchProject(topic);
    const retrieval = this.retriever.search(topic, 8, matchedProject?.folderPath);

    stream.markdown(composeSearchResults(topic, retrieval.results));
  }

  private async handleTasks(stream: vscode.ChatResponseStream): Promise<void> {
    const taskResult = this.projectManager.getAllTasks();
    if (taskResult.tasks.length === 0 && taskResult.parseIssues.length === 0) {
      stream.markdown('No tasks found yet. Ingest notes or add tasks via project work.');
      return;
    }

    stream.markdown(composeTasksBoard(taskResult));
  }

  private async handleStatus(stream: vscode.ChatResponseStream): Promise<void> {
    const projects = this.projectManager.listProjects('active');
    const clientProjects = projects.filter((project) => project.type === 'client').length;
    const productProjects = projects.filter((project) => project.type === 'product').length;
    const taskResult = this.projectManager.getAllTasks();
    const decisionResult = this.projectManager.getAllDecisions();
    const summaries = this.retriever.listSummaries(1000);

    const markdown = composeStatus({
      storageRoot: this.storageRoot,
      activeProjects: projects.length,
      clientProjects,
      productProjects,
      summaries: summaries.length,
      openTasks: taskResult.tasks.filter((task) => task.status !== 'done').length,
      decisions: decisionResult.decisions.length,
      taskIssues: taskResult.parseIssues,
      decisionIssues: decisionResult.parseIssues
    });

    stream.markdown(markdown);
  }

  private async handleChat(prompt: string, stream: vscode.ChatResponseStream, token: vscode.CancellationToken): Promise<void> {
    if (!prompt) {
      stream.markdown([
        'FounderOS Core Brain ready.',
        '',
        'Commands:',
        '- /new-client <name>',
        '- /new-project <name>',
        '- /ingest <content>',
        '- /summarize',
        '- /retrieve <topic>',
        '- /tasks',
        '- /status'
      ].join('\n'));
      return;
    }

    const project = this.tryMatchProject(prompt);
    const contextBlock = this.retriever.buildContextBlock(prompt, this.maxContextChars, project?.folderPath);
    const recentSummaries = this.retriever.listSummaries(2)
      .map((item) => `### ${item.title}\n${item.preview}`)
      .join('\n\n');

    const model = await this.selectModel();
    let responseText = '';

    if (model) {
      const systemPrompt = [
        'You are FounderOS Core Brain.',
        'Answer as a business planning assistant with context continuity.',
        'Use concise markdown and include next steps.',
        project ? `Current likely project: ${project.name}` : 'No clear project context detected.',
        '',
        contextBlock,
        '',
        recentSummaries ? `## Recent Summaries\n\n${recentSummaries}` : ''
      ].join('\n');

      const response = await model.sendRequest(
        [
          vscode.LanguageModelChatMessage.User(systemPrompt),
          vscode.LanguageModelChatMessage.User(prompt)
        ],
        {},
        token
      );

      for await (const chunk of response.text) {
        responseText += chunk;
        stream.markdown(chunk);
      }
    } else {
      responseText = [
        'Copilot model is unavailable. Returning context-based fallback response.',
        '',
        contextBlock || 'No relevant stored memory was found.',
        '',
        'Next steps:',
        '- Use /ingest to add structured context',
        '- Use /summarize after planning conversations',
        '- Use /retrieve <topic> to pull old decisions'
      ].join('\n');
      stream.markdown(responseText);
    }

    if (this.autoSave) {
      const projectId = project?.project_id ?? 'general';
      this.memoryManager.saveChatMessage('user', prompt, projectId);
      this.memoryManager.saveChatMessage('assistant', responseText, projectId);
    }
  }

  private bootstrapConfigFiles(): void {
    const configRoot = safeJoin(this.storageRoot, 'config');
    ensureDir(configRoot);
    ensureDir(path.join(configRoot, 'schemas'));

    const settingsPath = path.join(configRoot, 'settings.json');
    const profilePath = path.join(configRoot, 'agent_profile.md');

    ensureTextFileIfMissing(profilePath, '# FounderOS Core Brain Profile\n\n- Mode: Phase 1\n- Scope: Local memory and continuity\n');

    if (!vscode.workspace.fs || !vscode.workspace.workspaceFolders) {
      // no-op, keeps logic deterministic and local-only
    }

    writeJsonFile(settingsPath, {
      storageRoot: this.storageRoot,
      autoSave: this.autoSave,
      maxContextChars: this.maxContextChars,
      lastInitializedAt: nowIso()
    });

    const schemasDir = path.join(configRoot, 'schemas');
    writeText(path.join(schemasDir, 'project.schema.json'), schemaProject);
    writeText(path.join(schemasDir, 'task.schema.json'), schemaTask);
    writeText(path.join(schemasDir, 'decision.schema.json'), schemaDecision);
    writeText(path.join(schemasDir, 'chat.schema.json'), schemaChat);
    writeText(path.join(schemasDir, 'memory_record.schema.json'), schemaMemory);
  }

  private tryMatchProject(text: string): ProjectInfo | undefined {
    const projects = this.projectManager.listProjects();
    const lower = text.toLowerCase();
    return projects.find((project) => {
      return lower.includes(project.name.toLowerCase());
    });
  }

  private async selectModel(): Promise<vscode.LanguageModelChat | undefined> {
    const models = await vscode.lm.selectChatModels({ vendor: 'copilot' });
    if (models.length > 0) {
      return models[0];
    }

    const fallback = await vscode.lm.selectChatModels();
    return fallback[0];
  }

  private async extractWithModel(
    model: vscode.LanguageModelChat,
    content: string,
    token: vscode.CancellationToken
  ): Promise<string> {
    const prompt = [
      'Extract structured business memory as JSON only.',
      'Return shape:',
      '{"summary":"","tasks":[],"decisions":[],"open_questions":[],"project_hint":"general"}',
      '',
      'Input:',
      content
    ].join('\n');

    let output = '';
    const response = await model.sendRequest([vscode.LanguageModelChatMessage.User(prompt)], {}, token);
    for await (const chunk of response.text) {
      output += chunk;
    }
    return output;
  }

  private async summarizeWithModel(
    model: vscode.LanguageModelChat,
    historyText: string,
    extraContext: string,
    token: vscode.CancellationToken
  ): Promise<string> {
    const prompt = [
      'Summarize this conversation in markdown.',
      'Use sections:',
      '## What Was Discussed',
      '## Decisions',
      '## Action Items',
      '## Open Questions',
      '',
      `Date: ${todayIsoDate()}`,
      extraContext ? `Extra Context: ${extraContext}` : '',
      '',
      'Conversation:',
      historyText
    ].join('\n');

    let output = '';
    const response = await model.sendRequest([vscode.LanguageModelChatMessage.User(prompt)], {}, token);
    for await (const chunk of response.text) {
      output += chunk;
    }

    return output;
  }

  private fallbackSummary(historyText: string, extraContext: string): string {
    const short = historyText.slice(0, 1400);
    const lines = [
      `# Summary - ${todayIsoDate()}`,
      '',
      '## What Was Discussed',
      `- ${short.slice(0, 280).replace(/\n/g, ' ')}`,
      '',
      '## Decisions',
      '- None explicitly captured by model. Review chat log.',
      '',
      '## Action Items',
      '- [ ] Convert important actions into /ingest or project tasks',
      '- [ ] Run /retrieve on key topics before next planning session',
      '',
      '## Open Questions',
      extraContext ? `- ${extraContext}` : '- None captured'
    ];

    return lines.join('\n');
  }

  private extractHistory(context: vscode.ChatContext): string {
    const lines: string[] = [];

    for (const turn of context.history) {
      if (turn instanceof vscode.ChatRequestTurn) {
        lines.push(`User: ${turn.prompt}`);
        continue;
      }

      if (turn instanceof vscode.ChatResponseTurn) {
        const markdownParts = turn.response.filter(
          (part): part is vscode.ChatResponseMarkdownPart => part instanceof vscode.ChatResponseMarkdownPart
        );
        const responseText = markdownParts.map((part) => part.value.value).join('');
        if (responseText.trim().length > 0) {
          lines.push(`Assistant: ${responseText}`);
        }
      }
    }

    return lines.join('\n\n');
  }

  private formatIngestMarkdown(result: IngestResult, target: string): string {
    const lines: string[] = [];
    lines.push(`# Ingest Summary - ${todayIsoDate()}`);
    lines.push('');
    lines.push(`- Target: ${target}`);
    lines.push(`- Source mode: ${result.source}`);
    lines.push('');
    lines.push('## Summary');
    lines.push(result.summary);
    lines.push('');
    lines.push('## Tasks');
    if (result.tasks.length === 0) {
      lines.push('- None extracted');
    } else {
      for (const task of result.tasks) {
        lines.push(`- [ ] ${task}`);
      }
    }
    lines.push('');
    lines.push('## Decisions');
    if (result.decisions.length === 0) {
      lines.push('- None extracted');
    } else {
      for (const decision of result.decisions) {
        lines.push(`- ${decision}`);
      }
    }
    lines.push('');
    lines.push('## Open Questions');
    if (result.open_questions.length === 0) {
      lines.push('- None extracted');
    } else {
      for (const question of result.open_questions) {
        lines.push(`- ${question}`);
      }
    }

    return lines.join('\n');
  }
}

const schemaProject = JSON.stringify(
  {
    type: 'object',
    required: ['project_id', 'name', 'slug', 'type', 'status', 'created_at', 'updated_at'],
    additionalProperties: true
  },
  null,
  2
);

const schemaTask = JSON.stringify(
  {
    type: 'object',
    required: ['task_id', 'project_id', 'title', 'status', 'priority', 'created_at', 'updated_at'],
    additionalProperties: true
  },
  null,
  2
);

const schemaDecision = JSON.stringify(
  {
    type: 'object',
    required: ['decision_id', 'project_id', 'decision', 'reason', 'created_at'],
    additionalProperties: true
  },
  null,
  2
);

const schemaChat = JSON.stringify(
  {
    type: 'object',
    required: ['message_id', 'role', 'project_id', 'timestamp', 'content'],
    additionalProperties: true
  },
  null,
  2
);

const schemaMemory = JSON.stringify(
  {
    type: 'object',
    required: ['id', 'timestamp', 'source', 'project_id', 'type', 'content'],
    additionalProperties: true
  },
  null,
  2
);
