export function diffSnapshots(previous, next) {
    const prevMap = new Map(previous.modules.map(m => [m.path, m]));
    const nextMap = new Map(next.modules.map(m => [m.path, m]));
    const added = [];
    const removed = [];
    const changed = [];
    for (const [path, mod] of nextMap.entries()) {
        if (!prevMap.has(path)) {
            added.push(path);
        }
        else {
            const prev = prevMap.get(path);
            const statusChanged = prev.status !== mod.status;
            const exportsChanged = (prev.exports?.length ?? 0) !== (mod.exports?.length ?? 0);
            if (statusChanged || exportsChanged) {
                changed.push(path);
            }
        }
    }
    for (const path of prevMap.keys()) {
        if (!nextMap.has(path)) {
            removed.push(path);
        }
    }
    return {
        added: added.sort(),
        removed: removed.sort(),
        changed: changed.sort(),
    };
}
//# sourceMappingURL=diff.js.map