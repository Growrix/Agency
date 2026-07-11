export interface SeoChecklistInput {
  titleLength: number;
  metaLength: number;
  keywordInH1: boolean;
  keywordInFirstParagraph: boolean;
  internalLinkCount: number;
  hasFaqSection: boolean;
  totalWordCount: number;
}

export function evaluateSeoChecklist(input: SeoChecklistInput) {
  let score = 0;

  if (input.titleLength >= 50 && input.titleLength <= 60) score += 15;
  if (input.metaLength >= 145 && input.metaLength <= 160) score += 15;
  if (input.keywordInH1) score += 15;
  if (input.keywordInFirstParagraph) score += 15;
  if (input.internalLinkCount >= 3) score += 15;
  if (input.hasFaqSection) score += 10;
  if (input.totalWordCount >= 1800) score += 15;

  return {
    score,
    passes: score >= 82
  };
}