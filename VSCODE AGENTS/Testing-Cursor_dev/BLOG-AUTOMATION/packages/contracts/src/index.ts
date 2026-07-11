export type KeywordState = "discovered" | "approved" | "briefed" | "queued" | "published" | "refreshing";
export type BriefState = "draft" | "approved" | "in_progress" | "complete" | "rejected";
export type PostState = "draft" | "review" | "approved" | "scheduled" | "published" | "updating" | "archived";
export type JobState = "queued" | "running" | "succeeded" | "failed" | "dead_letter";
export type RouteMethod = "GET" | "POST";

export interface ApiEnvelope<T> {
  status: "ok" | "accepted" | "error";
  data: T;
  meta?: Record<string, string>;
}

export interface RouteContract {
  id: string;
  method: RouteMethod;
  path: string;
  capability: string;
}

export interface RouteScaffoldPayload {
  routeId: string;
  milestone: "milestone-1";
  status: "scaffold";
  preview: unknown;
}

export const milestone1RouteCatalog: RouteContract[] = [
  { id: "keywords.research.run", method: "POST", path: "/api/keywords/research/run", capability: "keyword_research" },
  { id: "keywords.approve", method: "POST", path: "/api/keywords/approve", capability: "keyword_approval" },
  { id: "keywords.opportunities.list", method: "GET", path: "/api/keywords/opportunities", capability: "keyword_listing" },
  { id: "briefs.generate", method: "POST", path: "/api/briefs/generate", capability: "brief_generation" },
  { id: "outlines.generate", method: "POST", path: "/api/outlines/generate", capability: "outline_generation" },
  { id: "briefs.get", method: "GET", path: "/api/briefs/:id", capability: "brief_lookup" },
  { id: "posts.create-draft", method: "POST", path: "/api/posts/create-draft", capability: "draft_generation" },
  { id: "posts.humanize", method: "POST", path: "/api/posts/humanize", capability: "humanization" },
  { id: "posts.enhance-eeat", method: "POST", path: "/api/posts/enhance-eeat", capability: "eeat_enhancement" },
  { id: "posts.insert-stats", method: "POST", path: "/api/posts/insert-stats", capability: "stats_insertion" },
  { id: "seo.optimize", method: "POST", path: "/api/seo/optimize", capability: "seo_optimization" },
  { id: "quality.run", method: "POST", path: "/api/quality/run", capability: "quality_gate_run" },
  { id: "quality.approve", method: "POST", path: "/api/quality/approve", capability: "quality_gate_approval" },
  { id: "publish.draft", method: "POST", path: "/api/publish/draft", capability: "publish_draft" },
  { id: "publish.schedule", method: "POST", path: "/api/publish/schedule", capability: "publish_schedule" },
  { id: "publish.run", method: "POST", path: "/api/publish/run", capability: "publish_run" },
  { id: "publish.invalidate-cache", method: "POST", path: "/api/publish/invalidate-cache", capability: "cache_invalidation" },
  { id: "publish.notify-sitemap", method: "POST", path: "/api/publish/notify-sitemap", capability: "sitemap_notification" },
  { id: "analytics.sync", method: "POST", path: "/api/analytics/sync", capability: "analytics_sync" },
  { id: "analytics.weekly-report", method: "GET", path: "/api/analytics/weekly-report", capability: "analytics_reporting" },
  { id: "analytics.evaluate-refresh", method: "POST", path: "/api/analytics/evaluate-refresh", capability: "refresh_evaluation" }
];