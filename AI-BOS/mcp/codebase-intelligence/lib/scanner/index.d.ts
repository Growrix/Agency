export interface ScanOptions {
    ignoredFolders: string[];
    ignoredFilePatterns: string[];
    includeTests?: boolean;
    includeDocs?: boolean;
}
export declare function scanRoots(roots: string[], options: ScanOptions): string[];
export declare function collectFileSignatures(filePaths: string[]): Record<string, string>;
//# sourceMappingURL=index.d.ts.map