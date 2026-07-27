import { createCodebaseWatcher } from './automation/index.js';
import { type CodebaseSnapshot, type CompactAuditContext } from './schema.js';
export { SCHEMA_VERSION, CodebaseAuditRequestSchema, ModuleInfoSchema, CodebaseSnapshotSchema, LatestSnapshotStateSchema, ContractEntrySchema, } from './schema.js';
export type { CodebaseAuditRequest, CodebaseSnapshot, ModuleInfo, ContractEntry, LatestSnapshotState, CompactAuditContext, } from './schema.js';
export { createCodebaseWatcher };
export { runCodebaseCLI } from './cli/index.js';
export interface GenerateSnapshotOptions {
    objective: string;
    trigger: CodebaseSnapshot['trigger'];
    repoRoot: string;
    scanRoots: string[];
    ignoredFolders: string[];
    ignoredFilePatterns: string[];
    snapshotDir: string;
    maxAgeMs: number;
    includeTests?: boolean;
    includeDocs?: boolean;
}
export declare function generateCodebaseSnapshot(options: GenerateSnapshotOptions): Promise<CodebaseSnapshot>;
export declare function getLatestCodebaseSnapshot(snapshotDir: string): CodebaseSnapshot | null;
export declare function ensureFreshCodebaseSnapshot(options: GenerateSnapshotOptions): Promise<CodebaseSnapshot>;
export declare function readLatestCodebaseSummary(snapshotDir: string): string | null;
export declare function getCompactAuditContext(snapshotDir: string): CompactAuditContext | null;
export declare function watchConfiguredCodebaseRoots(options: {
    repoRoot: string;
    scanRoots: string[];
    ignoredFolders: string[];
    ignoredFilePatterns: string[];
    snapshotDir: string;
    pollingIntervalMs: number;
    debounceMs: number;
    maxAgeMs: number;
    scheduledRefreshMs: number;
    onError?: (error: Error) => void;
}): import("./automation/index.js").CodebaseWatcher;
//# sourceMappingURL=index.d.ts.map