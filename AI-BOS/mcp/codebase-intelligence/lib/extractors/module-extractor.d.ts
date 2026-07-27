import type { ModuleInfo } from '../schema.js';
export declare function classifyModuleType(relativePath: string): ModuleInfo['type'];
export declare function detectImplementationStatus(filePath: string): ModuleInfo['status'];
export declare function extractModuleInfo(filePath: string, repoRoot: string): ModuleInfo;
//# sourceMappingURL=module-extractor.d.ts.map