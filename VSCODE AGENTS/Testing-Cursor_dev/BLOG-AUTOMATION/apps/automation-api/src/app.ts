import express, { type NextFunction, type Request, type Response } from "express";
import { acceptedEnvelope, okEnvelope } from "@blog-automation/shared";
import { AppError, createAutomationStore, type AutomationCommandContext, type AutomationStoreOptions } from "./state/automation-store";
import {
  apiKeyGuard,
  buildResponseMeta,
  buildCommandContext,
  createRateLimitMiddleware,
  idempotencyKeyGuard,
  requestContextMiddleware,
  validateRouteBody
} from "./http/middleware";
import { loadRuntimeConfig, type RuntimeConfigOverrides } from "./runtime/config";

export interface AppOptions extends AutomationStoreOptions {
  runtimeConfigOverrides?: RuntimeConfigOverrides;
}

function handleAppError(error: unknown, _request: Request, response: Response, _next: NextFunction) {
  if (error instanceof AppError) {
    response.status(error.statusCode).json({
      status: "error",
      error: error.message
    });
    return;
  }

  response.status(500).json({
    status: "error",
    error: error instanceof Error ? error.message : "Unknown error"
  });
}

function extractWorkflowRunId(payload: unknown) {
  if (typeof payload === "object" && payload !== null && "workflowRunId" in payload) {
    const workflowRunId = (payload as { workflowRunId?: unknown }).workflowRunId;

    if (typeof workflowRunId === "string") {
      return workflowRunId;
    }
  }

  return undefined;
}

function executeReadRoute(
  request: Request,
  response: Response,
  next: NextFunction,
  routeId: string,
  action: () => unknown
) {
  try {
    response.status(200).json(okEnvelope(action(), buildResponseMeta(request, routeId)));
  } catch (error) {
    next(error);
  }
}

function executeCommandRoute(
  request: Request,
  response: Response,
  next: NextFunction,
  routeId: string,
  action: (context: AutomationCommandContext) => unknown,
  store: ReturnType<typeof createAutomationStore>
) {
  let executionId: string | undefined;

  try {
    const commandContext = buildCommandContext(request);
    const started = store.beginCommandExecution(routeId, request.body, commandContext);

    if (started.kind === "replay") {
      response.status(started.responseStatus ?? 202).json(started.responseEnvelope);
      return;
    }

    executionId = started.executionId;
    const payload = action(commandContext);
    const envelope = acceptedEnvelope(payload, buildResponseMeta(request, routeId));

    if (executionId) {
      store.completeCommandExecution(executionId, 202, envelope, extractWorkflowRunId(payload));
    }

    response.status(202).json(envelope);
  } catch (error) {
    if (executionId) {
      const failure = store.failCommandExecution(executionId, request.body, error);

      if (failure.state === "dead_letter") {
        next(new AppError(`Command moved to dead letter after ${failure.attemptCount} failed attempts.`, 409));
        return;
      }
    }

    next(error);
  }
}

export function createApp(options: AppOptions = {}) {
  const app = express();
  const store = createAutomationStore(options);
  const runtimeConfig = loadRuntimeConfig(options.runtimeConfigOverrides);

  app.use(express.json());
  app.use(requestContextMiddleware);
  app.use(apiKeyGuard(runtimeConfig));
  app.use(createRateLimitMiddleware(runtimeConfig));
  app.use(idempotencyKeyGuard);

  app.locals.close = () => store.close();
  app.locals.runtimeConfig = runtimeConfig;

  app.get("/health", (request, response) => {
    response.status(200).json(
      okEnvelope({
        service: "automation-api",
        status: "healthy",
        milestone: "milestone-1",
        persistence: "sqlite",
        security: {
          apiKeyRequired: runtimeConfig.requireApiKey,
          rateLimitWindowMs: runtimeConfig.rateLimitWindowMs,
          rateLimitMax: runtimeConfig.rateLimitMax,
          workflowMaxAttempts: runtimeConfig.workflowMaxAttempts
        }
      }, {
        requestId: request.requestContext?.requestId ?? "unknown-request",
        correlationId: request.requestContext?.correlationId ?? "unknown-correlation"
      })
    );
  });

  app.post("/api/keywords/research/run", validateRouteBody("keywords.research.run"), (request, response, next) => {
    executeCommandRoute(request, response, next, "keywords.research.run", (context) => store.runKeywordResearch(request.body, context), store);
  });

  app.post("/api/keywords/approve", validateRouteBody("keywords.approve"), (request, response, next) => {
    executeCommandRoute(request, response, next, "keywords.approve", (context) => store.approveKeyword(request.body, context), store);
  });

  app.get("/api/keywords/opportunities", (request, response, next) => {
    executeReadRoute(request, response, next, "keywords.opportunities.list", () => store.listKeywords());
  });

  app.post("/api/briefs/generate", validateRouteBody("briefs.generate"), (request, response, next) => {
    executeCommandRoute(request, response, next, "briefs.generate", (context) => store.generateBrief(request.body, context), store);
  });

  app.post("/api/outlines/generate", validateRouteBody("outlines.generate"), (request, response, next) => {
    executeCommandRoute(request, response, next, "outlines.generate", (context) => store.generateOutline(request.body, context), store);
  });

  app.get("/api/briefs/:id", (request, response, next) => {
    executeReadRoute(request, response, next, "briefs.get", () => store.getBrief(request.params.id));
  });

  app.post("/api/posts/create-draft", validateRouteBody("posts.create-draft"), (request, response, next) => {
    executeCommandRoute(request, response, next, "posts.create-draft", (context) => store.createDraft(request.body, context), store);
  });

  app.post("/api/posts/humanize", validateRouteBody("posts.humanize"), (request, response, next) => {
    executeCommandRoute(request, response, next, "posts.humanize", (context) => store.humanizePost(request.body, context), store);
  });

  app.post("/api/posts/enhance-eeat", validateRouteBody("posts.enhance-eeat"), (request, response, next) => {
    executeCommandRoute(request, response, next, "posts.enhance-eeat", (context) => store.enhanceEeat(request.body, context), store);
  });

  app.post("/api/posts/insert-stats", validateRouteBody("posts.insert-stats"), (request, response, next) => {
    executeCommandRoute(request, response, next, "posts.insert-stats", (context) => store.insertStats(request.body, context), store);
  });

  app.post("/api/seo/optimize", validateRouteBody("seo.optimize"), (request, response, next) => {
    executeCommandRoute(request, response, next, "seo.optimize", (context) => store.optimizeSeo(request.body, context), store);
  });

  app.post("/api/quality/run", validateRouteBody("quality.run"), (request, response, next) => {
    executeCommandRoute(request, response, next, "quality.run", (context) => store.runQuality(request.body, context), store);
  });

  app.post("/api/quality/approve", validateRouteBody("quality.approve"), (request, response, next) => {
    executeCommandRoute(request, response, next, "quality.approve", (context) => store.approveQuality(request.body, context), store);
  });

  app.post("/api/publish/draft", validateRouteBody("publish.draft"), (request, response, next) => {
    executeCommandRoute(request, response, next, "publish.draft", (context) => store.stagePublishDraft(request.body, context), store);
  });

  app.post("/api/publish/schedule", validateRouteBody("publish.schedule"), (request, response, next) => {
    executeCommandRoute(request, response, next, "publish.schedule", (context) => store.schedulePublish(request.body, context), store);
  });

  app.post("/api/publish/run", validateRouteBody("publish.run"), (request, response, next) => {
    executeCommandRoute(request, response, next, "publish.run", (context) => store.publishPost(request.body, context), store);
  });

  app.post("/api/publish/invalidate-cache", validateRouteBody("publish.invalidate-cache"), (request, response, next) => {
    executeCommandRoute(request, response, next, "publish.invalidate-cache", (context) => store.invalidateCache(request.body, context), store);
  });

  app.post("/api/publish/notify-sitemap", validateRouteBody("publish.notify-sitemap"), (request, response, next) => {
    executeCommandRoute(request, response, next, "publish.notify-sitemap", (context) => store.notifySitemap(request.body, context), store);
  });

  app.post("/api/analytics/sync", validateRouteBody("analytics.sync"), (request, response, next) => {
    executeCommandRoute(request, response, next, "analytics.sync", (context) => store.syncAnalytics(context), store);
  });

  app.get("/api/analytics/weekly-report", (request, response, next) => {
    executeReadRoute(request, response, next, "analytics.weekly-report", () => store.weeklyReport());
  });

  app.post("/api/analytics/evaluate-refresh", validateRouteBody("analytics.evaluate-refresh"), (request, response, next) => {
    executeCommandRoute(request, response, next, "analytics.evaluate-refresh", (context) => store.evaluateRefresh(context), store);
  });

  app.use(handleAppError);

  return app;
}