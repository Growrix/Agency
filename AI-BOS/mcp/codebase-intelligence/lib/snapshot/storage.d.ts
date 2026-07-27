export declare const SNAPSHOT_FILENAME = "latest-snapshot.json";
export declare const SUMMARY_FILENAME = "latest-summary.json";
export declare const STATE_FILENAME = "state.json";
export declare function writeSnapshot(snapshotDir: string, snapshot: unknown): void;
export declare function readSnapshot(snapshotDir: string): unknown | null;
export declare function writeSummary(snapshotDir: string, summary: unknown): void;
export declare function readSummary(snapshotDir: string): unknown | null;
export declare function writeState(snapshotDir: string, state: unknown): void;
export declare function readState(snapshotDir: string): unknown | null;
export declare function snapshotExists(snapshotDir: string): boolean;
export declare function clearSnapshotDir(snapshotDir: string): void;
//# sourceMappingURL=storage.d.ts.map