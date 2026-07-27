import type { ModuleInfo } from '../schema.js';
export interface StatusReport {
    built: string[];
    partial: string[];
    scaffolded: string[];
    missing: string[];
    unknown: string[];
    reuseCandidates: string[];
    gaps: string[];
}
export declare function analyzeImplementationStatus(modules: ModuleInfo[]): StatusReport;
//# sourceMappingURL=status-analyzer.d.ts.map