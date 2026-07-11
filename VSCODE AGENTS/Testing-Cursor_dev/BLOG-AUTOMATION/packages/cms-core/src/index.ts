export type ConnectorStatus = "draft" | "active" | "paused" | "disabled";
export type ConnectorTargetCms = "sanity" | "wordpress";
export type ConnectorPublishMode =
  | "draft_only"
  | "draft_with_human_media_review"
  | "scheduled_publish_after_approval"
  | "auto_publish_low_risk";

export interface ConnectorContentTypeMapEntry {
  documentType: string;
  requiredFields: string[];
}

export interface ConnectorReferenceStrategy {
  mode: "env_or_fallback_reference";
  envVar: string;
  fallbackRef: string;
}

export interface ConnectorCredentialReferences {
  cmsEnv: string[];
  revalidateEnv: string[];
}

export interface ConnectorRevalidationConfig {
  mode: "none" | "http_callback";
  urlEnv?: string;
  secretEnv?: string;
  documentTypeParam?: string;
  siteBaseUrlEnv?: string;
}

export interface ConnectorEditorialPolicy {
  requiresHumanApproval: boolean;
  requiresManualMediaReview: boolean;
  authorStrategy: ConnectorReferenceStrategy;
  categoryStrategy: ConnectorReferenceStrategy;
}

export interface ConnectorQualityProfile {
  niche: string;
  riskLevel: "low" | "standard" | "high";
}

export interface ConnectorDefinition {
  connectorId: string;
  siteSlug: string;
  clientName: string;
  status: ConnectorStatus;
  targetCms: ConnectorTargetCms;
  publishMode: ConnectorPublishMode;
  contentTypeMap: {
    post: ConnectorContentTypeMapEntry;
  };
  credentialsRef: ConnectorCredentialReferences;
  revalidation: ConnectorRevalidationConfig;
  editorialPolicy: ConnectorEditorialPolicy;
  qualityProfile: ConnectorQualityProfile;
}

export interface ConnectorRegistryDocument {
  version: number;
  connectors: ConnectorDefinition[];
}

export interface PublishablePostSeo {
  metaTitle?: string;
  metaDescription?: string;
  canonicalUrl?: string;
  noIndex?: boolean;
}

export interface PublishablePost {
  title: string;
  slug: string;
  excerpt: string;
  publishedAt: string;
  documentType?: string;
  scheduledPublishAt?: string;
  readMinutes?: number;
  tags?: string[];
  accent?: string;
  bodyMarkdown?: string;
  authorRef?: string;
  categoryRef?: string;
  publishMode?: ConnectorPublishMode;
  connectorId?: string;
  workflowRunId?: string;
  correlationId?: string;
  seo?: PublishablePostSeo;
}

export interface CmsAdapter<TOutput> {
  name: string;
  map(post: PublishablePost): TOutput;
}