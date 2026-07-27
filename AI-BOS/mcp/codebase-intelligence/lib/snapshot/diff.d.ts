import type { CodebaseSnapshot } from '../schema.js';
export interface SnapshotDiff {
    added: string[];
    removed: string[];
    changed: string[];
}
export declare function diffSnapshots(previous: Pick<CodebaseSnapshot, 'modules'>, next: Pick<CodebaseSnapshot, 'modules'>): SnapshotDiff;
//# sourceMappingURL=diff.d.ts.map