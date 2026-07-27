import fs from 'fs';
import path from 'path';
const SOURCE_EXTENSIONS = new Set(['.ts', '.tsx', '.js', '.jsx', '.py', '.json']);
const DOC_EXTENSIONS = new Set(['.md']);
function normalizePath(filePath) {
    return filePath.replace(/\\/g, '/');
}
function matchesGlobPattern(fileName, pattern) {
    if (pattern.startsWith('*.')) {
        return fileName.endsWith(pattern.slice(1));
    }
    return fileName === pattern;
}
function shouldIgnoreFolder(folderName, ignoredFolders) {
    return ignoredFolders.some(ignored => folderName === ignored || folderName.toLowerCase() === ignored.toLowerCase());
}
function shouldIgnoreFile(fileName, ignoredFilePatterns) {
    return ignoredFilePatterns.some(pattern => matchesGlobPattern(fileName, pattern));
}
function isSourceFile(fileName, includeDocs) {
    const ext = path.extname(fileName).toLowerCase();
    if (SOURCE_EXTENSIONS.has(ext))
        return true;
    if (includeDocs && DOC_EXTENSIONS.has(ext))
        return true;
    return false;
}
function walkDirectory(dirPath, options, results) {
    if (!fs.existsSync(dirPath))
        return;
    let entries;
    try {
        entries = fs.readdirSync(dirPath, { withFileTypes: true });
    }
    catch {
        return;
    }
    for (const entry of entries) {
        const fullPath = path.join(dirPath, entry.name);
        if (entry.isDirectory()) {
            if (shouldIgnoreFolder(entry.name, options.ignoredFolders))
                continue;
            if (!options.includeTests && entry.name === 'tests')
                continue;
            walkDirectory(fullPath, options, results);
            continue;
        }
        if (!entry.isFile())
            continue;
        if (shouldIgnoreFile(entry.name, options.ignoredFilePatterns))
            continue;
        if (!isSourceFile(entry.name, options.includeDocs ?? false))
            continue;
        results.push(normalizePath(fullPath));
    }
}
export function scanRoots(roots, options) {
    const results = [];
    for (const root of roots) {
        walkDirectory(root, options, results);
    }
    return results.sort((a, b) => a.localeCompare(b));
}
export function collectFileSignatures(filePaths) {
    const signatures = {};
    for (const filePath of filePaths) {
        try {
            const stats = fs.statSync(filePath);
            signatures[normalizePath(filePath)] = `${stats.mtimeMs}:${stats.size}`;
        }
        catch {
            // File may have been deleted
        }
    }
    return signatures;
}
//# sourceMappingURL=index.js.map