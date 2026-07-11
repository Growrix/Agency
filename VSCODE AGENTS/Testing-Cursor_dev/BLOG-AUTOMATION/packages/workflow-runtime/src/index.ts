export const milestone1WorkflowCatalog = [
  { id: "keyword-research", trigger: "manual_or_schedule" },
  { id: "brief-generation", trigger: "keyword_approved" },
  { id: "post-creation", trigger: "brief_approved" },
  { id: "publish-run", trigger: "post_approved" },
  { id: "weekly-analytics-sync", trigger: "weekly_schedule" }
] as const;

export function buildWorkflowRunDescriptor(workflowId: string, correlationId: string) {
  return {
    workflowId,
    correlationId,
    state: "queued" as const
  };
}