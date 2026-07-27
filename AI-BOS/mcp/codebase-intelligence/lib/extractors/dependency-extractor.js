import fs from 'fs';
export function extractDependencies(filePath) {
    let content;
    try {
        content = fs.readFileSync(filePath, 'utf-8');
    }
    catch {
        return [];
    }
    const deps = [];
    // Match: import ... from '...' and import ... from "..."
    const importPattern = /import\s+(?:[\s\S]*?)\s+from\s+['"]([^'"]+)['"]/g;
    // Match: require('...')
    const requirePattern = /require\s*\(\s*['"]([^'"]+)['"]\s*\)/g;
    let match;
    while ((match = importPattern.exec(content)) !== null) {
        deps.push(match[1]);
    }
    while ((match = requirePattern.exec(content)) !== null) {
        deps.push(match[1]);
    }
    return [...new Set(deps)].sort();
}
//# sourceMappingURL=dependency-extractor.js.map