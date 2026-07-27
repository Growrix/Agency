import type { CodebaseIntelligenceSettings } from '../../../../../config/codebase-intelligence-settings.js';
export type CodebaseCLIMode = 'snapshot' | 'watch' | 'auto' | 'status';
export interface CodebaseCLIResult {
    success: boolean;
    message?: string;
    status?: Record<string, unknown>;
    close?: () => void;
}
export declare function runCodebaseCLI(mode: CodebaseCLIMode, settings: CodebaseIntelligenceSettings): Promise<CodebaseCLIResult>;
//# sourceMappingURL=index.d.ts.map