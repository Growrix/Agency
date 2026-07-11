import * as vscode from 'vscode';
import { CoreAgent } from './coreAgent';
import { resolveStorageRoot } from './utils/pathUtils';

const PARTICIPANT_ID = 'founderos.agent';

export function activate(context: vscode.ExtensionContext): void {
  const participant = vscode.chat.createChatParticipant(PARTICIPANT_ID, createChatHandler());
  participant.iconPath = new vscode.ThemeIcon('organization');

  context.subscriptions.push(participant);
  context.subscriptions.push(
    vscode.commands.registerCommand('founderos.openStorageRoot', async () => {
      const root = getRuntimeSettings().storageRoot;
      await vscode.commands.executeCommand('revealFileInOS', vscode.Uri.file(root));
    })
  );

  console.log('[FounderOS] Extension activated. Use @founderos in Copilot Chat.');
}

export function deactivate(): void {
  console.log('[FounderOS] Extension deactivated.');
}

function createChatHandler(): vscode.ChatRequestHandler {
  return async (request, chatContext, stream, token) => {
    const settings = getRuntimeSettings();
    const agent = new CoreAgent(settings.storageRoot, settings.autoSave, settings.maxContextChars);

    try {
      await agent.initialize();
      await agent.handle(request, chatContext, stream, token);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      stream.markdown(`FounderOS error: ${message}`);
    }
  };
}

function getRuntimeSettings(): { storageRoot: string; autoSave: boolean; maxContextChars: number } {
  const config = vscode.workspace.getConfiguration('founderos');
  return {
    storageRoot: resolveStorageRoot(config.get<string>('storageRoot', '')),
    autoSave: config.get<boolean>('autoSave', true),
    maxContextChars: config.get<number>('maxContextChars', 6000)
  };
}
