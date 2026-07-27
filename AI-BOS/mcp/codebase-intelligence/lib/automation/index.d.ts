import type { CodebaseIntelligenceSettings } from '../../../../../config/codebase-intelligence-settings.js';
export interface CodebaseWatchEvent {
    reason: 'initial' | 'change' | 'scheduled';
    changedFiles: string[];
}
export interface CodebaseWatcher {
    close(): void;
}
export interface CodebaseWatcherOptions extends CodebaseIntelligenceSettings {
    onSnapshot: (event: CodebaseWatchEvent) => void;
    onError?: (error: Error) => void;
}
export declare function createCodebaseWatcher(options: CodebaseWatcherOptions): CodebaseWatcher;
//# sourceMappingURL=index.d.ts.map