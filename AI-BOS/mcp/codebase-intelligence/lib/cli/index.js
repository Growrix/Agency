import { generateCodebaseSnapshot, readLatestCodebaseSummary } from '../index.js';
import { createCodebaseWatcher } from '../automation/index.js';
import { readState, snapshotExists } from '../snapshot/storage.js';
export async function runCodebaseCLI(mode, settings) {
    switch (mode) {
        case 'snapshot': {
            const snapshot = await generateCodebaseSnapshot({
                objective: 'CLI snapshot',
                trigger: 'manual',
                repoRoot: settings.repoRoot,
                scanRoots: settings.scanRoots,
                ignoredFolders: settings.ignoredFolders,
                ignoredFilePatterns: settings.ignoredFilePatterns,
                snapshotDir: settings.snapshotDir,
                maxAgeMs: settings.maxAgeMs,
            });
            return {
                success: true,
                message: `Snapshot generated: ${snapshot.modules.length} modules, ${snapshot.contracts.length} contracts`,
            };
        }
        case 'status': {
            const exists = snapshotExists(settings.snapshotDir);
            const state = readState(settings.snapshotDir);
            const summary = readLatestCodebaseSummary(settings.snapshotDir);
            return {
                success: true,
                status: {
                    snapshotExists: exists,
                    generatedAt: state?.generatedAt ?? null,
                    watchedRoots: state?.watchedRoots ?? [],
                    maxAgeMs: state?.maxAgeMs ?? settings.maxAgeMs,
                    summaryAvailable: summary !== null,
                },
            };
        }
        case 'watch': {
            // Initial snapshot
            await generateCodebaseSnapshot({
                objective: 'CLI watch initial',
                trigger: 'startup',
                repoRoot: settings.repoRoot,
                scanRoots: settings.scanRoots,
                ignoredFolders: settings.ignoredFolders,
                ignoredFilePatterns: settings.ignoredFilePatterns,
                snapshotDir: settings.snapshotDir,
                maxAgeMs: settings.maxAgeMs,
            });
            const watcher = createCodebaseWatcher({
                ...settings,
                onSnapshot: async (event) => {
                    try {
                        await generateCodebaseSnapshot({
                            objective: `Watch ${event.reason}`,
                            trigger: event.reason === 'initial' ? 'startup' : 'fs-change',
                            repoRoot: settings.repoRoot,
                            scanRoots: settings.scanRoots,
                            ignoredFolders: settings.ignoredFolders,
                            ignoredFilePatterns: settings.ignoredFilePatterns,
                            snapshotDir: settings.snapshotDir,
                            maxAgeMs: settings.maxAgeMs,
                        });
                    }
                    catch (error) {
                        // Watcher errors are non-fatal
                    }
                },
            });
            return { success: true, message: 'Watching for changes...', close: () => watcher.close() };
        }
        case 'auto': {
            // Initial snapshot
            await generateCodebaseSnapshot({
                objective: 'CLI auto initial',
                trigger: 'startup',
                repoRoot: settings.repoRoot,
                scanRoots: settings.scanRoots,
                ignoredFolders: settings.ignoredFolders,
                ignoredFilePatterns: settings.ignoredFilePatterns,
                snapshotDir: settings.snapshotDir,
                maxAgeMs: settings.maxAgeMs,
            });
            const watcher = createCodebaseWatcher({
                ...settings,
                onSnapshot: async (event) => {
                    try {
                        const trigger = event.reason === 'initial' ? 'startup'
                            : event.reason === 'scheduled' ? 'scheduled'
                                : 'fs-change';
                        await generateCodebaseSnapshot({
                            objective: `Auto ${event.reason}`,
                            trigger,
                            repoRoot: settings.repoRoot,
                            scanRoots: settings.scanRoots,
                            ignoredFolders: settings.ignoredFolders,
                            ignoredFilePatterns: settings.ignoredFilePatterns,
                            snapshotDir: settings.snapshotDir,
                            maxAgeMs: settings.maxAgeMs,
                        });
                    }
                    catch (error) {
                        // Auto mode errors are non-fatal
                    }
                },
            });
            return {
                success: true,
                message: 'Codebase auto mode active (watcher + scheduled refresh)',
                close: () => watcher.close(),
            };
        }
        default:
            return { success: false, message: `Unknown mode: ${mode}` };
    }
}
//# sourceMappingURL=index.js.map