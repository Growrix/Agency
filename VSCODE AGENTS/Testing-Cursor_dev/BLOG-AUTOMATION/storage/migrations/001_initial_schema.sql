CREATE TABLE IF NOT EXISTS keywords (
  id TEXT PRIMARY KEY,
  keyword TEXT NOT NULL UNIQUE,
  seed_keyword TEXT NOT NULL,
  state TEXT NOT NULL,
  opportunity_score REAL NOT NULL,
  monthly_searches INTEGER NOT NULL,
  difficulty INTEGER NOT NULL,
  cpc REAL NOT NULL,
  trend TEXT NOT NULL,
  source TEXT NOT NULL,
  payload_json TEXT NOT NULL,
  created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS content_briefs (
  id TEXT PRIMARY KEY,
  keyword_id TEXT NOT NULL,
  title TEXT NOT NULL,
  slug TEXT NOT NULL,
  target_keyword TEXT NOT NULL,
  schema_type TEXT NOT NULL,
  state TEXT NOT NULL,
  payload_json TEXT NOT NULL,
  created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS posts (
  id TEXT PRIMARY KEY,
  brief_id TEXT NOT NULL,
  title TEXT NOT NULL,
  slug TEXT NOT NULL,
  content_markdown TEXT NOT NULL,
  state TEXT NOT NULL,
  seo_score INTEGER NOT NULL DEFAULT 0,
  readability_score INTEGER NOT NULL DEFAULT 0,
  eeat_signals INTEGER NOT NULL DEFAULT 0,
  citation_count INTEGER NOT NULL DEFAULT 0,
  duplicate_risk INTEGER NOT NULL DEFAULT 0,
  requires_human_review INTEGER NOT NULL DEFAULT 0,
  payload_json TEXT NOT NULL,
  cms_document_json TEXT,
  scheduled_for TEXT,
  published_at TEXT,
  created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS workflow_runs (
  id TEXT PRIMARY KEY,
  workflow_id TEXT NOT NULL,
  correlation_id TEXT NOT NULL,
  state TEXT NOT NULL,
  source_step TEXT NOT NULL,
  target_state TEXT NOT NULL,
  metadata_json TEXT NOT NULL,
  created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS command_executions (
  id TEXT PRIMARY KEY,
  route_id TEXT NOT NULL,
  correlation_id TEXT NOT NULL,
  idempotency_key TEXT NOT NULL,
  actor_type TEXT NOT NULL,
  request_hash TEXT NOT NULL,
  state TEXT NOT NULL,
  attempt_count INTEGER NOT NULL,
  response_status INTEGER,
  response_json TEXT,
  last_error TEXT,
  workflow_run_id TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  UNIQUE(route_id, idempotency_key)
);

CREATE TABLE IF NOT EXISTS dead_letters (
  id TEXT PRIMARY KEY,
  command_execution_id TEXT NOT NULL,
  route_id TEXT NOT NULL,
  correlation_id TEXT NOT NULL,
  idempotency_key TEXT NOT NULL,
  actor_type TEXT NOT NULL,
  request_hash TEXT NOT NULL,
  error_message TEXT NOT NULL,
  payload_json TEXT NOT NULL,
  created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS quality_reports (
  id TEXT PRIMARY KEY,
  post_id TEXT NOT NULL,
  passes INTEGER NOT NULL,
  failures_json TEXT NOT NULL,
  created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS analytics_snapshots (
  id TEXT PRIMARY KEY,
  post_id TEXT NOT NULL,
  clicks INTEGER NOT NULL,
  impressions INTEGER NOT NULL,
  average_position REAL NOT NULL,
  created_at TEXT NOT NULL
);