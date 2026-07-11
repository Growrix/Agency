export interface KeywordOpportunityInput {
  monthlySearches: number;
  difficulty: number;
  cpc: number;
  serpFeatures: string[];
  trend: "rising" | "stable" | "declining";
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

export function scoreKeywordOpportunity(input: KeywordOpportunityInput): number {
  const volumeScore = Math.log10(Math.max(input.monthlySearches, 1)) / 5;
  const difficultyScore = (100 - clamp(input.difficulty, 0, 100)) / 100;
  const cpcScore = Math.min(Math.max(input.cpc, 0) / 10, 1);
  const featuredSnippetBonus = input.serpFeatures.includes("featured_snippet") ? 0.2 : 0;
  const trendBonus = input.trend === "rising" ? 0.1 : 0;

  return Number(
    ((volumeScore * 0.3) + (difficultyScore * 0.4) + (cpcScore * 0.2) + featuredSnippetBonus + trendBonus).toFixed(3)
  );
}