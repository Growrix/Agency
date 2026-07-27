import type { ModuleInfo } from '../schema.js';
export interface RiskReport {
    risks: string[];
    invalidationHints: string[];
}
export declare function analyzeRisks(modules: ModuleInfo[]): RiskReport;
//# sourceMappingURL=risk-analyzer.d.ts.map