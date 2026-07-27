import fs from 'fs';
import path from 'path';
function normalizePath(filePath) {
    return filePath.replace(/\\/g, '/');
}
export function classifyModuleType(relativePath) {
    const normalized = normalizePath(relativePath).toLowerCase();
    if (normalized.includes('mcp-servers/') || normalized.includes('/mcp/'))
        return 'mcp';
    if (normalized.includes('contracts/') || normalized.includes('/contract'))
        return 'contract';
    if (normalized.includes('orchestrator/'))
        return 'orchestrator';
    if (normalized.includes('execution-runtime/') || normalized.includes('execution/'))
        return 'runtime';
    if (normalized.includes('tools/'))
        return 'tool';
    if (normalized.includes('saas/') || normalized.endsWith('.tsx') || normalized.endsWith('.jsx'))
        return 'ui';
    if (normalized.endsWith('.md'))
        return 'doc';
    return 'unknown';
}
export function detectImplementationStatus(filePath) {
    try {
        const content = fs.readFileSync(filePath, 'utf-8');
        const lines = content.split('\n');
        const nonEmptyLines = lines.filter(l => l.trim().length > 0 && !l.trim().startsWith('//') && !l.trim().startsWith('/*') && !l.trim().startsWith('*'));
        if (nonEmptyLines.length === 0)
            return 'missing';
        const lowerContent = content.toLowerCase();
        const hasNotImplemented = lowerContent.includes('not implemented') || lowerContent.includes('todo: implement');
        const hasThrowNotImpl = lowerContent.includes("throw new error('not implemented')") || lowerContent.includes('throw new error("not implemented")');
        if (hasThrowNotImpl || (hasNotImplemented && nonEmptyLines.length < 10))
            return 'scaffolded';
        // Count meaningful exported functions/classes
        const exportCount = (content.match(/export\s+(function|class|const|interface|type|enum)/g) || []).length;
        if (exportCount === 0 && nonEmptyLines.length < 5)
            return 'scaffolded';
        // If there are exports but very few lines of logic
        const logicLines = nonEmptyLines.filter(l => !l.trim().startsWith('import') && !l.trim().startsWith('export type') &&
            !l.trim().startsWith('export interface') && !l.trim().startsWith('}'));
        if (logicLines.length < 3 && exportCount > 0)
            return 'partial';
        return 'built';
    }
    catch {
        return 'missing';
    }
}
function extractExports(content) {
    const exports = [];
    const patterns = [
        /export\s+(?:async\s+)?function\s+(\w+)/g,
        /export\s+const\s+(\w+)/g,
        /export\s+class\s+(\w+)/g,
        /export\s+interface\s+(\w+)/g,
        /export\s+type\s+(\w+)/g,
        /export\s+enum\s+(\w+)/g,
    ];
    for (const pattern of patterns) {
        let match;
        while ((match = pattern.exec(content)) !== null) {
            exports.push(match[1]);
        }
    }
    return [...new Set(exports)].sort();
}
function detectDomain(relativePath) {
    const normalized = normalizePath(relativePath).toLowerCase();
    if (normalized.includes('/webdev/'))
        return 'webdev';
    if (normalized.includes('/marketing/'))
        return 'marketing';
    if (normalized.includes('/shared/'))
        return 'shared';
    return undefined;
}
function detectLayer(relativePath) {
    const normalized = normalizePath(relativePath).toLowerCase();
    if (normalized.includes('/foundation/'))
        return 'foundation';
    if (normalized.includes('/system/'))
        return 'system';
    if (normalized.includes('orchestrator/'))
        return 'orchestrator';
    if (normalized.includes('execution/') || normalized.includes('execution-runtime/'))
        return 'runtime';
    if (normalized.includes('tools/'))
        return 'tool';
    if (normalized.includes('validation/'))
        return 'validation';
    if (normalized.includes('pipeline/'))
        return 'pipeline';
    if (normalized.includes('config/'))
        return 'config';
    return undefined;
}
function hasTestFile(filePath, repoRoot) {
    const normalized = normalizePath(filePath);
    const relativePath = normalizePath(path.relative(repoRoot, filePath));
    const baseName = path.basename(filePath, path.extname(filePath));
    // Check for common test patterns
    const testPatterns = [
        path.join(repoRoot, 'mcp-system/tests/unit', `${baseName}.test.ts`),
        path.join(repoRoot, 'mcp-system/tests/integration', `${baseName}.test.ts`),
    ];
    return testPatterns.some(p => fs.existsSync(p));
}
export function extractModuleInfo(filePath, repoRoot) {
    const relativePath = normalizePath(path.relative(repoRoot, filePath));
    let content = '';
    try {
        content = fs.readFileSync(filePath, 'utf-8');
    }
    catch {
        // File may not exist or be unreadable
    }
    return {
        path: relativePath,
        type: classifyModuleType(relativePath),
        domain: detectDomain(relativePath),
        layer: detectLayer(relativePath),
        exports: extractExports(content),
        status: detectImplementationStatus(filePath),
        tested: hasTestFile(filePath, repoRoot),
        dependencies: [], // Filled by dependency-extractor
        usedBy: [], // Filled by cross-referencing
    };
}
//# sourceMappingURL=module-extractor.js.map