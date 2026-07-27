import { z } from 'zod';
export declare const SCHEMA_VERSION = "1.0.0";
export declare const CodebaseAuditRequestSchema: z.ZodObject<{
    objective: z.ZodString;
    focus: z.ZodOptional<z.ZodEnum<{
        planning: "planning";
        debugging: "debugging";
        execution: "execution";
        analysis: "analysis";
    }>>;
    roots: z.ZodOptional<z.ZodArray<z.ZodString>>;
    includeTests: z.ZodOptional<z.ZodBoolean>;
    includeDocs: z.ZodOptional<z.ZodBoolean>;
    mode: z.ZodOptional<z.ZodEnum<{
        "on-demand": "on-demand";
        event: "event";
        scheduled: "scheduled";
        auto: "auto";
    }>>;
    trigger: z.ZodOptional<z.ZodEnum<{
        scheduled: "scheduled";
        startup: "startup";
        "fs-change": "fs-change";
        "doc-planning": "doc-planning";
        orchestrator: "orchestrator";
        manual: "manual";
    }>>;
    maxAgeMs: z.ZodOptional<z.ZodNumber>;
}, z.core.$strip>;
export type CodebaseAuditRequest = z.infer<typeof CodebaseAuditRequestSchema>;
export declare const ModuleInfoSchema: z.ZodObject<{
    path: z.ZodString;
    type: z.ZodEnum<{
        unknown: "unknown";
        contract: "contract";
        orchestrator: "orchestrator";
        mcp: "mcp";
        runtime: "runtime";
        tool: "tool";
        ui: "ui";
        doc: "doc";
    }>;
    domain: z.ZodOptional<z.ZodString>;
    layer: z.ZodOptional<z.ZodString>;
    exports: z.ZodArray<z.ZodString>;
    status: z.ZodEnum<{
        unknown: "unknown";
        built: "built";
        partial: "partial";
        scaffolded: "scaffolded";
        missing: "missing";
    }>;
    tested: z.ZodBoolean;
    dependencies: z.ZodArray<z.ZodString>;
    usedBy: z.ZodArray<z.ZodString>;
}, z.core.$strip>;
export type ModuleInfo = z.infer<typeof ModuleInfoSchema>;
export declare const ContractEntrySchema: z.ZodObject<{
    name: z.ZodString;
    path: z.ZodString;
    usedBy: z.ZodArray<z.ZodString>;
}, z.core.$strip>;
export type ContractEntry = z.infer<typeof ContractEntrySchema>;
export declare const CodebaseSnapshotSchema: z.ZodObject<{
    schemaVersion: z.ZodString;
    objective: z.ZodString;
    generatedAt: z.ZodString;
    repoRoot: z.ZodString;
    includedRoots: z.ZodArray<z.ZodString>;
    trigger: z.ZodEnum<{
        scheduled: "scheduled";
        startup: "startup";
        "fs-change": "fs-change";
        "doc-planning": "doc-planning";
        orchestrator: "orchestrator";
        manual: "manual";
    }>;
    freshness: z.ZodEnum<{
        fresh: "fresh";
        stale: "stale";
        invalid: "invalid";
    }>;
    summary: z.ZodString;
    modules: z.ZodArray<z.ZodObject<{
        path: z.ZodString;
        type: z.ZodEnum<{
            unknown: "unknown";
            contract: "contract";
            orchestrator: "orchestrator";
            mcp: "mcp";
            runtime: "runtime";
            tool: "tool";
            ui: "ui";
            doc: "doc";
        }>;
        domain: z.ZodOptional<z.ZodString>;
        layer: z.ZodOptional<z.ZodString>;
        exports: z.ZodArray<z.ZodString>;
        status: z.ZodEnum<{
            unknown: "unknown";
            built: "built";
            partial: "partial";
            scaffolded: "scaffolded";
            missing: "missing";
        }>;
        tested: z.ZodBoolean;
        dependencies: z.ZodArray<z.ZodString>;
        usedBy: z.ZodArray<z.ZodString>;
    }, z.core.$strip>>;
    contracts: z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        path: z.ZodString;
        usedBy: z.ZodArray<z.ZodString>;
    }, z.core.$strip>>;
    reuseCandidates: z.ZodArray<z.ZodString>;
    gaps: z.ZodArray<z.ZodString>;
    risks: z.ZodArray<z.ZodString>;
    invalidationHints: z.ZodArray<z.ZodString>;
}, z.core.$strip>;
export type CodebaseSnapshot = z.infer<typeof CodebaseSnapshotSchema>;
export declare const LatestSnapshotStateSchema: z.ZodObject<{
    snapshotPath: z.ZodString;
    summaryPath: z.ZodString;
    generatedAt: z.ZodString;
    watchedRoots: z.ZodArray<z.ZodString>;
    maxAgeMs: z.ZodNumber;
    fileSignatures: z.ZodRecord<z.ZodString, z.ZodString>;
}, z.core.$strip>;
export type LatestSnapshotState = z.infer<typeof LatestSnapshotStateSchema>;
export interface CompactAuditContext {
    generatedAt: string;
    trigger: string;
    reuseCandidates: string[];
    gaps: string[];
    risks: string[];
}
//# sourceMappingURL=schema.d.ts.map