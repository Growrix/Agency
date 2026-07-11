import { describe, expect, it } from "vitest";
import { summarizeWeeklyAnalytics } from "../../packages/analytics-engine/src/index";
import { buildBriefSeed } from "../../packages/blog-planner/src/index";
import { milestone1RouteCatalog } from "../../packages/contracts/src/index";
import { scoreKeywordOpportunity } from "../../packages/keyword-engine/src/index";
import { runPublicationReadiness } from "../../packages/quality-gates/src/index";

describe("blog automation scaffold", () => {
  it("scores keyword opportunities deterministically", () => {
    const score = scoreKeywordOpportunity({
      monthlySearches: 8100,
      difficulty: 28,
      cpc: 2.4,
      serpFeatures: ["featured_snippet", "paa"],
      trend: "stable"
    });

    expect(score).toBeGreaterThan(0.7);
  });

  it("builds a brief seed from a target keyword", () => {
    const brief = buildBriefSeed("how to fix a leaking pipe");

    expect(brief.slug).toBe("how-to-fix-a-leaking-pipe");
    expect(brief.schemaType).toBe("HowTo");
  });

  it("evaluates publish readiness", () => {
    const result = runPublicationReadiness({
      wordCount: 2450,
      seoScore: 86,
      readabilityScore: 58,
      eeatSignals: 4,
      citationCount: 5,
      duplicateRisk: false,
      requiresHumanReview: false
    });

    expect(result.passes).toBe(true);
  });

  it("summarizes analytics snapshots", () => {
    const summary = summarizeWeeklyAnalytics([
      { clicks: 42, impressions: 610, averagePosition: 8.2 },
      { clicks: 27, impressions: 420, averagePosition: 6.7 }
    ]);

    expect(summary.totalClicks).toBe(69);
    expect(summary.totalImpressions).toBe(1030);
  });

  it("locks the expected milestone-1 route contract count", () => {
    expect(milestone1RouteCatalog).toHaveLength(21);
  });
});