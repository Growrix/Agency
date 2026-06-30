"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/primitives/Button";

export type CatalogPortfolioFormValues = {
  slug: string;
  name: string;
  livePreviewUrl?: string;
  embeddedPreviewUrl?: string;
  industry: string;
  service: string;
  summary: string;
  metric?: string;
  accent: string;
  /** hero_image + detail are kept as JSON until structured editors land. */
  advancedJson: string;
};

type CatalogPortfolioFormProps = {
  initial: CatalogPortfolioFormValues;
  onSubmit: (values: CatalogPortfolioFormValues) => Promise<void> | void;
  submitting?: boolean;
};

export function CatalogPortfolioForm({ initial, onSubmit, submitting }: CatalogPortfolioFormProps) {
  const [values, setValues] = useState(initial);
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [advancedJson, setAdvancedJson] = useState(initial.advancedJson);
  const [jsonError, setJsonError] = useState<string | null>(null);

  function update<K extends keyof CatalogPortfolioFormValues>(key: K, value: CatalogPortfolioFormValues[K]) {
    setValues((previous) => ({ ...previous, [key]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setJsonError(null);
    if (advancedJson.trim()) {
      try {
        JSON.parse(advancedJson);
      } catch (error) {
        setJsonError(`Advanced JSON is not valid: ${error instanceof Error ? error.message : "parse error"}`);
        return;
      }
    }

    await onSubmit({ ...values, advancedJson });
  }

  return (
    <form className="space-y-3" onSubmit={handleSubmit}>
      <div className="grid grid-cols-2 gap-3">
        <label className="block">
          <span className="font-mono text-[10px] uppercase tracking-wider text-text-muted">Slug</span>
          <input className="signal-input mt-1" value={values.slug} onChange={(event) => update("slug", event.target.value)} required />
        </label>
        <label className="block">
          <span className="font-mono text-[10px] uppercase tracking-wider text-text-muted">Industry</span>
          <input className="signal-input mt-1" value={values.industry} onChange={(event) => update("industry", event.target.value)} />
        </label>
      </div>

      <label className="block">
        <span className="font-mono text-[10px] uppercase tracking-wider text-text-muted">Name</span>
        <input className="signal-input mt-1" value={values.name} onChange={(event) => update("name", event.target.value)} required />
      </label>

      <label className="block">
        <span className="font-mono text-[10px] uppercase tracking-wider text-text-muted">Summary</span>
        <textarea className="signal-input mt-1 min-h-20" value={values.summary} onChange={(event) => update("summary", event.target.value)} />
      </label>

      <div className="grid grid-cols-2 gap-3">
        <label className="block">
          <span className="font-mono text-[10px] uppercase tracking-wider text-text-muted">Service slug</span>
          <input className="signal-input mt-1" value={values.service} onChange={(event) => update("service", event.target.value)} />
        </label>
        <label className="block">
          <span className="font-mono text-[10px] uppercase tracking-wider text-text-muted">Metric</span>
          <input className="signal-input mt-1" value={values.metric ?? ""} onChange={(event) => update("metric", event.target.value)} />
        </label>
        <label className="block">
          <span className="font-mono text-[10px] uppercase tracking-wider text-text-muted">Accent gradient</span>
          <input className="signal-input mt-1" value={values.accent} onChange={(event) => update("accent", event.target.value)} placeholder="from-slate-500 to-slate-700" />
        </label>
        <label className="block">
          <span className="font-mono text-[10px] uppercase tracking-wider text-text-muted">Live preview URL</span>
          <input className="signal-input mt-1" value={values.livePreviewUrl ?? ""} onChange={(event) => update("livePreviewUrl", event.target.value)} />
        </label>
        <label className="block">
          <span className="font-mono text-[10px] uppercase tracking-wider text-text-muted">Embedded preview URL</span>
          <input className="signal-input mt-1" value={values.embeddedPreviewUrl ?? ""} onChange={(event) => update("embeddedPreviewUrl", event.target.value)} />
        </label>
      </div>

      <div className="rounded-md border border-border/60 bg-inset/20">
        <button
          type="button"
          className="flex w-full items-center justify-between px-3 py-2 text-left text-sm font-medium"
          onClick={() => setAdvancedOpen((open) => !open)}
        >
          Advanced JSON (hero_image + detail object)
          <span className="text-xs text-text-muted">{advancedOpen ? "Hide" : "Show"}</span>
        </button>
        {advancedOpen ? (
          <div className="border-t border-border/60 p-3">
            <p className="text-xs text-text-muted">
              hero_image and the detailed case-study fields (challenge, strategy, build, results,
              gallery) aren&apos;t in the structured form yet. Edit raw JSON below.
            </p>
            <textarea
              className="signal-input mt-2 min-h-40 font-mono text-xs"
              value={advancedJson}
              onChange={(event) => setAdvancedJson(event.target.value)}
            />
            {jsonError ? <p className="mt-2 text-xs text-destructive">{jsonError}</p> : null}
          </div>
        ) : null}
      </div>

      <div className="flex justify-end pt-1">
        <Button type="submit" size="sm" disabled={submitting}>
          {submitting ? "Saving…" : "Save project"}
        </Button>
      </div>
    </form>
  );
}
