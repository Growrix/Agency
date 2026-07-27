import { z } from 'zod';
export const SCHEMA_VERSION = '1.0.0';
// --- Audit Request ---
export const CodebaseAuditRequestSchema = z.object({
    objective: z.string().min(1),
    focus: z.enum(['planning', 'execution', 'debugging', 'analysis']).optional(),
    roots: z.array(z.string()).optional(),
    includeTests: z.boolean().optional(),
    includeDocs: z.boolean().optional(),
    mode: z.enum(['on-demand', 'event', 'scheduled', 'auto']).optional(),
    trigger: z.enum(['startup', 'fs-change', 'doc-planning', 'orchestrator', 'manual', 'scheduled']).optional(),
    maxAgeMs: z.number().int().positive().optional(),
});
// --- Module Info ---
export const ModuleInfoSchema = z.object({
    path: z.string().min(1),
    type: z.enum(['mcp', 'contract', 'runtime', 'orchestrator', 'tool', 'ui', 'doc', 'unknown']),
    domain: z.string().optional(),
    layer: z.string().optional(),
    exports: z.array(z.string()),
    status: z.enum(['built', 'partial', 'scaffolded', 'missing', 'unknown']),
    tested: z.boolean(),
    dependencies: z.array(z.string()),
    usedBy: z.array(z.string()),
});
// --- Contract Entry ---
export const ContractEntrySchema = z.object({
    name: z.string().min(1),
    path: z.string().min(1),
    usedBy: z.array(z.string()),
});
// --- Codebase Snapshot ---
export const CodebaseSnapshotSchema = z.object({
    schemaVersion: z.string().min(1),
    objective: z.string().min(1),
    generatedAt: z.string().min(1),
    repoRoot: z.string().min(1),
    includedRoots: z.array(z.string()),
    trigger: z.enum(['startup', 'fs-change', 'doc-planning', 'orchestrator', 'manual', 'scheduled']),
    freshness: z.enum(['fresh', 'stale', 'invalid']),
    summary: z.string(),
    modules: z.array(ModuleInfoSchema),
    contracts: z.array(ContractEntrySchema),
    reuseCandidates: z.array(z.string()),
    gaps: z.array(z.string()),
    risks: z.array(z.string()),
    invalidationHints: z.array(z.string()),
});
// --- Latest Snapshot State ---
export const LatestSnapshotStateSchema = z.object({
    snapshotPath: z.string().min(1),
    summaryPath: z.string().min(1),
    generatedAt: z.string().min(1),
    watchedRoots: z.array(z.string()),
    maxAgeMs: z.number().int().positive(),
    fileSignatures: z.record(z.string(), z.string()),
});
//# sourceMappingURL=schema.js.map