export type Freshness = 'fresh' | 'stale' | 'invalid';
export interface FreshnessCheckInput {
    generatedAt: string;
    maxAgeMs: number;
    fileSignatures: Record<string, string>;
    currentSignatures: Record<string, string>;
}
export declare function checkFreshness(input: FreshnessCheckInput): Freshness;
//# sourceMappingURL=cache.d.ts.map