import { scanRoots, collectFileSignatures } from '../scanner/index.js';
function collectSourceSnapshot(options) {
    const files = scanRoots(options.scanRoots, {
        ignoredFolders: options.ignoredFolders,
        ignoredFilePatterns: options.ignoredFilePatterns,
    });
    const snapshot = new Map();
    const sigs = collectFileSignatures(files);
    for (const [filePath, sig] of Object.entries(sigs)) {
        snapshot.set(filePath, { filePath, signature: sig });
    }
    return snapshot;
}
function diffFileSnapshots(previous, next) {
    const changed = new Set();
    for (const [filePath, entry] of next.entries()) {
        const prev = previous.get(filePath);
        if (!prev || prev.signature !== entry.signature) {
            changed.add(filePath);
        }
    }
    for (const filePath of previous.keys()) {
        if (!next.has(filePath)) {
            changed.add(filePath);
        }
    }
    return [...changed].sort();
}
export function createCodebaseWatcher(options) {
    let fileSnapshot = collectSourceSnapshot(options);
    let closed = false;
    let isProcessing = false;
    let pendingReason;
    let pendingFiles = new Set();
    let debounceTimer;
    const emitSnapshot = (reason, changedFiles) => {
        if (closed || isProcessing)
            return;
        isProcessing = true;
        try {
            options.onSnapshot({ reason, changedFiles });
        }
        catch (error) {
            options.onError?.(error instanceof Error ? error : new Error(String(error)));
        }
        finally {
            isProcessing = false;
            if (!closed && pendingReason) {
                const nextReason = pendingReason;
                const nextFiles = [...pendingFiles].sort();
                pendingReason = undefined;
                pendingFiles = new Set();
                emitSnapshot(nextReason, nextFiles);
            }
        }
    };
    const scheduleSnapshot = (reason, changedFiles) => {
        pendingReason = reason === 'change' ? 'change' : (pendingReason ?? reason);
        changedFiles.forEach(f => pendingFiles.add(f));
        if (debounceTimer)
            clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
            debounceTimer = undefined;
            const nextReason = pendingReason ?? 'change';
            const nextFiles = [...pendingFiles].sort();
            pendingReason = undefined;
            pendingFiles = new Set();
            emitSnapshot(nextReason, nextFiles);
        }, options.debounceMs);
    };
    // Initial build
    scheduleSnapshot('initial', []);
    // Polling watcher
    const pollInterval = setInterval(() => {
        if (closed)
            return;
        try {
            const nextSnapshot = collectSourceSnapshot(options);
            const changedFiles = diffFileSnapshots(fileSnapshot, nextSnapshot);
            fileSnapshot = nextSnapshot;
            if (changedFiles.length > 0) {
                scheduleSnapshot('change', changedFiles);
            }
        }
        catch (error) {
            options.onError?.(error instanceof Error ? error : new Error(String(error)));
        }
    }, options.pollingIntervalMs);
    // Scheduled refresh
    const refreshInterval = setInterval(() => {
        if (closed)
            return;
        scheduleSnapshot('scheduled', []);
    }, options.scheduledRefreshMs);
    return {
        close() {
            closed = true;
            if (debounceTimer)
                clearTimeout(debounceTimer);
            clearInterval(pollInterval);
            clearInterval(refreshInterval);
        },
    };
}
//# sourceMappingURL=index.js.map