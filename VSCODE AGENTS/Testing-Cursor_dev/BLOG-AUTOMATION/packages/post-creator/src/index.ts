export function createDraftStagePlan(targetKeyword: string) {
  return {
    targetKeyword,
    stages: ["research", "outline", "intro", "sections", "faq", "conclusion", "quality_review"]
  };
}

export function buildHumanizationChecklist() {
  return ["vary sentence length", "remove filler phrasing", "add practical example", "use direct second-person voice"];
}

export function buildEeatEnhancementPlan() {
  return ["inject expertise note", "attach source-backed claim", "add safety caveat", "add last reviewed date"];
}

export function buildStatsInsertionPlan() {
  return ["government source", "industry benchmark", "supporting numeric proof"];
}