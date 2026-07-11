import {
  milestone1RouteCatalog,
  type RouteContract,
  type RouteScaffoldPayload
} from "@blog-automation/contracts";
import { summarizeWeeklyAnalytics, shouldRefreshPost } from "@blog-automation/analytics-engine";
import { buildBriefSeed, buildOutlinePreview } from "@blog-automation/blog-planner";
import { mapToSanityDocument } from "@blog-automation/cms-adapter-sanity";
import { scoreKeywordOpportunity } from "@blog-automation/keyword-engine";
import {
  buildEeatEnhancementPlan,
  buildHumanizationChecklist,
  buildStatsInsertionPlan,
  createDraftStagePlan
} from "@blog-automation/post-creator";
import { runPublicationReadiness } from "@blog-automation/quality-gates";
import { evaluateSeoChecklist } from "@blog-automation/seo-optimizer";
import { milestone1WorkflowCatalog } from "@blog-automation/workflow-runtime";

export const automationApiRouteCatalog = milestone1RouteCatalog;

function buildKeywordPreview() {
  return {
    keyword: "how to fix a leaking pipe",
    score: scoreKeywordOpportunity({
      monthlySearches: 8100,
      difficulty: 28,
      cpc: 2.4,
      serpFeatures: ["featured_snippet", "paa"],
      trend: "stable"
    })
  };
}

export function buildScaffoldPayload(
  route: RouteContract,
  context: { briefId?: string } = {}
): RouteScaffoldPayload {
  if (route.id.startsWith("keywords.")) {
    return {
      routeId: route.id,
      milestone: "milestone-1",
      status: "scaffold",
      preview: buildKeywordPreview()
    };
  }

  if (route.id.startsWith("briefs.") || route.id.startsWith("outlines.")) {
    const brief = buildBriefSeed("how to fix a leaking pipe");
    return {
      routeId: route.id,
      milestone: "milestone-1",
      status: "scaffold",
      preview: route.id === "briefs.get"
        ? { ...brief, id: context.briefId ?? "sample-brief-001" }
        : route.id === "outlines.generate"
          ? buildOutlinePreview(brief.targetKeyword)
          : brief
    };
  }

  if (route.id.startsWith("posts.")) {
    const keyword = "how to fix a leaking pipe";
    const preview = route.id === "posts.humanize"
      ? buildHumanizationChecklist()
      : route.id === "posts.enhance-eeat"
        ? buildEeatEnhancementPlan()
        : route.id === "posts.insert-stats"
          ? buildStatsInsertionPlan()
          : createDraftStagePlan(keyword);

    return {
      routeId: route.id,
      milestone: "milestone-1",
      status: "scaffold",
      preview
    };
  }

  if (route.id.startsWith("seo.")) {
    return {
      routeId: route.id,
      milestone: "milestone-1",
      status: "scaffold",
      preview: evaluateSeoChecklist({
        titleLength: 58,
        metaLength: 150,
        keywordInH1: true,
        keywordInFirstParagraph: true,
        internalLinkCount: 4,
        hasFaqSection: true,
        totalWordCount: 2450
      })
    };
  }

  if (route.id.startsWith("quality.")) {
    return {
      routeId: route.id,
      milestone: "milestone-1",
      status: "scaffold",
      preview: runPublicationReadiness({
        wordCount: 2450,
        seoScore: 86,
        readabilityScore: 58,
        eeatSignals: 4,
        citationCount: 5,
        duplicateRisk: false,
        requiresHumanReview: false
      })
    };
  }

  if (route.id.startsWith("publish.")) {
    return {
      routeId: route.id,
      milestone: "milestone-1",
      status: "scaffold",
      preview: mapToSanityDocument({
        title: "How to Fix a Leaking Pipe",
        slug: "how-to-fix-a-leaking-pipe",
        excerpt: "A structured scaffold payload for milestone-1 publishing.",
        publishedAt: "2026-05-18T10:00:00.000Z"
      })
    };
  }

  return {
    routeId: route.id,
    milestone: "milestone-1",
    status: "scaffold",
    preview: route.id === "analytics.weekly-report"
      ? summarizeWeeklyAnalytics([
          { clicks: 42, impressions: 610, averagePosition: 8.2 },
          { clicks: 27, impressions: 420, averagePosition: 6.7 }
        ])
      : route.id === "analytics.evaluate-refresh"
        ? shouldRefreshPost({
            clicks: 12,
            impressions: 420,
            averagePosition: 11.3,
            trafficDeltaPercent: -23,
            ageInDays: 390
          })
        : { workflows: milestone1WorkflowCatalog }
  };
}