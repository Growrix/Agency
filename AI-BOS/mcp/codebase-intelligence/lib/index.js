import path from 'path';
import { scanRoots, collectFileSignatures } from './scanner/index.js';
import { extractModuleInfo } from './extractors/module-extractor.js';
import { extractContracts } from './extractors/contract-extractor.js';
import { extractDependencies } from './extractors/dependency-extractor.js';
import { analyzeImplementationStatus } from './analyzers/status-analyzer.js';
import { analyzeRisks } from './analyzers/risk-analyzer.js';
import { writeSnapshot, readSnapshot, writeSummary, readSummary, writeState, readState } from './snapshot/storage.js';
import { checkFreshness } from './snapshot/cache.js';
import { createCodebaseWatcher } from './automation/index.js';
import { SCHEMA_VERSION, } from './schema.js';
// Re-export public types and schemas
export { SCHEMA_VERSION, CodebaseAuditRequestSchema, ModuleInfoSchema, CodebaseSnapshotSchema, LatestSnapshotStateSchema, ContractEntrySchema, } from './schema.js';
export { createCodebaseWatcher };
export { runCodebaseCLI } from './cli/index.js';
function normalizePath(filePath) {
    return filePath.replace(/\\/g, '/');
}
function buildSummary(modules, contracts, statusReport, riskReport) {
    const lines = [];
    lines.push(`Modules: ${modules.length} total`);
    lines.push(`  Built: ${statusReport.built.length}`);
    lines.push(`  Partial: ${statusReport.partial.length}`);
    lines.push(`  Scaffolded: ${statusReport.scaffolded.length}`);
    lines.push(`  Missing: ${statusReport.missing.length}`);
    lines.push(`Contracts: ${contracts.length}`);
    if (statusReport.reuseCandidates.length > 0) {
        lines.push(`Reuse candidates: ${statusReport.reuseCandidates.slice(0, 10).join(', ')}${statusReport.reuseCandidates.length > 10 ? '...' : ''}`);
    }
    if (statusReport.gaps.length > 0) {
        lines.push(`Gaps: ${statusReport.gaps.slice(0, 5).join('; ')}${statusReport.gaps.length > 5 ? '...' : ''}`);
    }
    if (riskReport.risks.length > 0) {
        lines.push(`Risks: ${riskReport.risks.slice(0, 5).join('; ')}${riskReport.risks.length > 5 ? '...' : ''}`);
    }
    return lines.join('\n');
}
export async function generateCodebaseSnapshot(options) {
    const files = scanRoots(options.scanRoots, {
        ignoredFolders: options.ignoredFolders,
        ignoredFilePatterns: options.ignoredFilePatterns,
        includeTests: options.includeTests,
        includeDocs: options.includeDocs,
    });
    // Extract module info
    const modules = files
        .filter(f => f.endsWith('.ts') || f.endsWith('.tsx') || f.endsWith('.js') || f.endsWith('.jsx') || f.endsWith('.py'))
        .map(f => extractModuleInfo(f, options.repoRoot));
    // Fill in dependencies
    for (const mod of modules) {
        const absPath = path.resolve(options.repoRoot, mod.path);
        mod.dependencies = extractDependencies(absPath);
    }
    // Build usedBy cross-reference
    const modulePathSet = new Set(modules.map(m => m.path));
    for (const mod of modules) {
        for (const dep of mod.dependencies) {
            // Try to resolve relative dependency to a known module
            const absModPath = path.resolve(options.repoRoot, path.dirname(mod.path), dep);
            const relResolved = normalizePath(path.relative(options.repoRoot, absModPath)).replace(/\.js$/, '.ts');
            const matchingModule = modules.find(m => m.path === relResolved ||
                m.path === relResolved + '.ts' ||
                m.path.replace(/\.ts$/, '') === relResolved.replace(/\.ts$/, ''));
            if (matchingModule && !matchingModule.usedBy.includes(mod.path)) {
                matchingModule.usedBy.push(mod.path);
            }
        }
    }
    // Extract contracts from contract files
    const contractFiles = files.filter(f => {
        const rel = normalizePath(path.relative(options.repoRoot, f));
        return rel.includes('contracts/') || rel.includes('/schema') || rel.includes('contract');
    });
    const contracts = contractFiles.flatMap(f => extractContracts(f, options.repoRoot));
    // Run analysis
    const statusReport = analyzeImplementationStatus(modules);
    const riskReport = analyzeRisks(modules);
    const snapshot = {
        schemaVersion: SCHEMA_VERSION,
        objective: options.objective,
        generatedAt: new Date().toISOString(),
        repoRoot: normalizePath(options.repoRoot),
        includedRoots: options.scanRoots.map(r => normalizePath(r)),
        trigger: options.trigger,
        freshness: 'fresh',
        summary: buildSummary(modules, contracts, statusReport, riskReport),
        modules,
        contracts,
        reuseCandidates: statusReport.reuseCandidates,
        gaps: statusReport.gaps,
        risks: riskReport.risks,
        invalidationHints: riskReport.invalidationHints,
    };
    // Persist
    writeSnapshot(options.snapshotDir, snapshot);
    writeSummary(options.snapshotDir, snapshot.summary);
    const fileSignatures = collectFileSignatures(files);
    const state = {
        snapshotPath: path.join(options.snapshotDir, 'latest-snapshot.json'),
        summaryPath: path.join(options.snapshotDir, 'latest-summary.json'),
        generatedAt: snapshot.generatedAt,
        watchedRoots: options.scanRoots.map(r => normalizePath(r)),
        maxAgeMs: options.maxAgeMs,
        fileSignatures,
    };
    writeState(options.snapshotDir, state);
    return snapshot;
}
export function getLatestCodebaseSnapshot(snapshotDir) {
    const raw = readSnapshot(snapshotDir);
    if (!raw)
        return null;
    return raw;
}
export async function ensureFreshCodebaseSnapshot(options) {
    // Check existing state
    const state = readState(options.snapshotDir);
    if (state) {
        const files = scanRoots(options.scanRoots, {
            ignoredFolders: options.ignoredFolders,
            ignoredFilePatterns: options.ignoredFilePatterns,
            includeTests: options.includeTests,
            includeDocs: options.includeDocs,
        });
        const currentSignatures = collectFileSignatures(files);
        const freshness = checkFreshness({
            generatedAt: state.generatedAt,
            maxAgeMs: options.maxAgeMs,
            fileSignatures: state.fileSignatures,
            currentSignatures,
        });
        if (freshness === 'fresh') {
            const existing = getLatestCodebaseSnapshot(options.snapshotDir);
            if (existing)
                return existing;
        }
    }
    // Stale, invalid, or missing: generate fresh
    return generateCodebaseSnapshot(options);
}
export function readLatestCodebaseSummary(snapshotDir) {
    const raw = readSummary(snapshotDir);
    if (!raw)
        return null;
    return typeof raw === 'string' ? raw : JSON.stringify(raw);
}
export function getCompactAuditContext(snapshotDir) {
    const snapshot = getLatestCodebaseSnapshot(snapshotDir);
    if (!snapshot)
        return null;
    return {
        generatedAt: snapshot.generatedAt,
        trigger: snapshot.trigger,
        reuseCandidates: snapshot.reuseCandidates.slice(0, 10),
        gaps: snapshot.gaps.slice(0, 10),
        risks: snapshot.risks.slice(0, 5),
    };
}
export function watchConfiguredCodebaseRoots(options) {
    return createCodebaseWatcher({
        ...options,
        onSnapshot: async (event) => {
            const trigger = event.reason === 'initial' ? 'startup'
                : event.reason === 'scheduled' ? 'scheduled'
                    : 'fs-change';
            await generateCodebaseSnapshot({
                objective: `Watch ${event.reason}`,
                trigger,
                repoRoot: options.repoRoot,
                scanRoots: options.scanRoots,
                ignoredFolders: options.ignoredFolders,
                ignoredFilePatterns: options.ignoredFilePatterns,
                snapshotDir: options.snapshotDir,
                maxAgeMs: options.maxAgeMs,
            });
        },
        onError: options.onError,
    });
}
//# sourceMappingURL=index.js.map