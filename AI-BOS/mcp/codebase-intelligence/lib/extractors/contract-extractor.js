import fs from 'fs';
import path from 'path';
function normalizePath(filePath) {
    return filePath.replace(/\\/g, '/');
}
function extractNamedExports(content) {
    const names = [];
    const patterns = [
        /export\s+const\s+(\w+Schema)\b/g,
        /export\s+interface\s+(\w+)/g,
        /export\s+type\s+(\w+)/g,
        /export\s+enum\s+(\w+)/g,
    ];
    for (const pattern of patterns) {
        let match;
        while ((match = pattern.exec(content)) !== null) {
            names.push(match[1]);
        }
    }
    return [...new Set(names)].sort();
}
export function extractContracts(filePath, repoRoot) {
    let content;
    try {
        content = fs.readFileSync(filePath, 'utf-8');
    }
    catch {
        return [];
    }
    const relativePath = normalizePath(path.relative(repoRoot, filePath));
    const names = extractNamedExports(content);
    return names.map(name => ({
        name,
        path: relativePath,
        usedBy: [], // resolved later via cross-reference
    }));
}
//# sourceMappingURL=contract-extractor.js.map