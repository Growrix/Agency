export function checkFreshness(input) {
    if (!input.generatedAt || input.generatedAt.length === 0) {
        return 'invalid';
    }
    const generatedTime = new Date(input.generatedAt).getTime();
    if (isNaN(generatedTime)) {
        return 'invalid';
    }
    const age = Date.now() - generatedTime;
    if (age > input.maxAgeMs) {
        return 'stale';
    }
    // Check if file signatures differ
    const prevKeys = Object.keys(input.fileSignatures);
    const currKeys = Object.keys(input.currentSignatures);
    if (prevKeys.length !== currKeys.length) {
        return 'stale';
    }
    for (const key of prevKeys) {
        if (input.fileSignatures[key] !== input.currentSignatures[key]) {
            return 'stale';
        }
    }
    for (const key of currKeys) {
        if (!(key in input.fileSignatures)) {
            return 'stale';
        }
    }
    return 'fresh';
}
//# sourceMappingURL=cache.js.map