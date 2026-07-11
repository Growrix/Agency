export interface PublicationReadinessInput {
  wordCount: number;
  seoScore: number;
  readabilityScore: number;
  eeatSignals: number;
  citationCount: number;
  duplicateRisk: boolean;
  requiresHumanReview: boolean;
}

export function runPublicationReadiness(input: PublicationReadinessInput) {
  const failures: string[] = [];

  if (input.wordCount < 1800) failures.push("word_count");
  if (input.seoScore < 82) failures.push("seo_score");
  if (input.readabilityScore < 45) failures.push("readability_score");
  if (input.eeatSignals < 3) failures.push("eeat_signals");
  if (input.citationCount < 2) failures.push("citation_count");
  if (input.duplicateRisk) failures.push("duplicate_risk");
  if (input.requiresHumanReview) failures.push("human_review_required");

  return {
    passes: failures.length === 0,
    failures
  };
}