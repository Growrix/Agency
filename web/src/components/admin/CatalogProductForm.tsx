"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/primitives/Button";

export type CatalogProductFormValues = {
  slug: string;
  name: string;
  price: string;
  livePreviewUrl?: string;
  embeddedPreviewUrl?: string;
  category: string;
  categorySlug: string;
  type: string;
  typeSlug: string;
  industry: string;
  industrySlug: string;
  teaser: string;
  summary: string;
  audience: string;
  published?: boolean;
  includes: string[];
  stack: string[];
  highlights: { label: string; value: string }[];
  previewVariant: string;
  /** Deep fields kept as JSON for now; structured editors deferred. */
  advancedJson: string;
};

type CatalogProductFormProps = {
  initial: CatalogProductFormValues;
  onSubmit: (values: CatalogProductFormValues) => Promise<void> | void;
  submitting?: boolean;
};

function splitList(value: string): string[] {
  return value
    .split(/[\n,]+/)
    .map((entry) => entry.trim())
    .filter(Boolean);
}

export function CatalogProductForm({ initial, onSubmit, submitting }: CatalogProductFormProps) {
  const [values, setValues] = useState(initial);
  const [includesText, setIncludesText] = useState(initial.includes.join("\n"));
  const [stackText, setStackText] = useState(initial.stack.join(", "));
  const [highlightsText, setHighlightsText] = useState(
    initial.highlights.map((entry) => `${entry.label}: ${entry.value}`).join("\n"),
  );
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [advancedJson, setAdvancedJson] = useState(initial.advancedJson);
  const [jsonError, setJsonError] = useState<string | null>(null);

  function update<K extends keyof CatalogProductFormValues>(key: K, value: CatalogProductFormValues[K]) {
    setValues((previous) => ({ ...previous, [key]: value }));
  }

  function parseHighlights(value: string): { label: string; value: string }[] {
    return value
      .split("\n")
      .map((line) => {
        const [label, ...rest] = line.split(":");
        if (!label || rest.length === 0) return null;
        return { label: label.trim(), value: rest.join(":").trim() };
      })
      .filter((entry): entry is { label: string; value: string } => entry !== null && entry.label !== "");
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

    await onSubmit({
      ...values,
      includes: splitList(includesText),
      stack: splitList(stackText),
      highlights: parseHighlights(highlightsText),
      advancedJson,
    });
  }

  return (
    <form className="space-y-3" onSubmit={handleSubmit}>
      <div className="grid grid-cols-2 gap-3">
        <label className="block">
          <span className="font-mono text-[10px] uppercase tracking-wider text-text-muted">Slug</span>
          <input className="signal-input mt-1" value={values.slug} onChange={(event) => update("slug", event.target.value)} required />
        </label>
        <label className="block">
          <span className="font-mono text-[10px] uppercase tracking-wider text-text-muted">Price</span>
          <input className="signal-input mt-1" value={values.price} onChange={(event) => update("price", event.target.value)} />
        </label>
      </div>

      <label className="block">
        <span className="font-mono text-[10px] uppercase tracking-wider text-text-muted">Name</span>
        <input className="signal-input mt-1" value={values.name} onChange={(event) => update("name", event.target.value)} required />
      </label>

      <div className="grid grid-cols-2 gap-3">
        <label className="block">
          <span className="font-mono text-[10px] uppercase tracking-wider text-text-muted">Category</span>
          <input className="signal-input mt-1" value={values.category} onChange={(event) => update("category", event.target.value)} />
        </label>
        <label className="block">
          <span className="font-mono text-[10px] uppercase tracking-wider text-text-muted">Category slug</span>
          <input className="signal-input mt-1" value={values.categorySlug} onChange={(event) => update("categorySlug", event.target.value)} />
        </label>
        <label className="block">
          <span className="font-mono text-[10px] uppercase tracking-wider text-text-muted">Type</span>
          <input className="signal-input mt-1" value={values.type} onChange={(event) => update("type", event.target.value)} />
        </label>
        <label className="block">
          <span className="font-mono text-[10px] uppercase tracking-wider text-text-muted">Type slug</span>
          <input className="signal-input mt-1" value={values.typeSlug} onChange={(event) => update("typeSlug", event.target.value)} />
        </label>
        <label className="block">
          <span className="font-mono text-[10px] uppercase tracking-wider text-text-muted">Industry</span>
          <input className="signal-input mt-1" value={values.industry} onChange={(event) => update("industry", event.target.value)} />
        </label>
        <label className="block">
          <span className="font-mono text-[10px] uppercase tracking-wider text-text-muted">Industry slug</span>
          <input className="signal-input mt-1" value={values.industrySlug} onChange={(event) => update("industrySlug", event.target.value)} />
        </label>
      </div>

      <label className="block">
        <span className="font-mono text-[10px] uppercase tracking-wider text-text-muted">Teaser</span>
        <input className="signal-input mt-1" value={values.teaser} onChange={(event) => update("teaser", event.target.value)} />
      </label>
      <label className="block">
        <span className="font-mono text-[10px] uppercase tracking-wider text-text-muted">Summary</span>
        <textarea className="signal-input mt-1 min-h-20" value={values.summary} onChange={(event) => update("summary", event.target.value)} />
      </label>
      <label className="block">
        <span className="font-mono text-[10px] uppercase tracking-wider text-text-muted">Audience</span>
        <input className="signal-input mt-1" value={values.audience} onChange={(event) => update("audience", event.target.value)} />
      </label>

      <div className="grid grid-cols-2 gap-3">
        <label className="block">
          <span className="font-mono text-[10px] uppercase tracking-wider text-text-muted">Live preview URL</span>
          <input className="signal-input mt-1" value={values.livePreviewUrl ?? ""} onChange={(event) => update("livePreviewUrl", event.target.value)} />
        </label>
        <label className="block">
          <span className="font-mono text-[10px] uppercase tracking-wider text-text-muted">Embedded preview URL</span>
          <input className="signal-input mt-1" value={values.embeddedPreviewUrl ?? ""} onChange={(event) => update("embeddedPreviewUrl", event.target.value)} />
        </label>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <label className="block">
          <span className="font-mono text-[10px] uppercase tracking-wider text-text-muted">Preview variant</span>
          <input className="signal-input mt-1" value={values.previewVariant} onChange={(event) => update("previewVariant", event.target.value)} />
        </label>
        <label className="flex items-center gap-2 pt-5 text-sm text-text">
          <input
            type="checkbox"
            checked={values.published ?? false}
            onChange={(event) => update("published", event.target.checked)}
          />
          Published
        </label>
      </div>

      <label className="block">
        <span className="font-mono text-[10px] uppercase tracking-wider text-text-muted">Includes (one per line)</span>
        <textarea className="signal-input mt-1 min-h-20" value={includesText} onChange={(event) => setIncludesText(event.target.value)} />
      </label>
      <label className="block">
        <span className="font-mono text-[10px] uppercase tracking-wider text-text-muted">Stack (comma- or newline-separated)</span>
        <textarea className="signal-input mt-1 min-h-16" value={stackText} onChange={(event) => setStackText(event.target.value)} />
      </label>
      <label className="block">
        <span className="font-mono text-[10px] uppercase tracking-wider text-text-muted">Highlights (one per line as &quot;Label: Value&quot;)</span>
        <textarea className="signal-input mt-1 min-h-20" value={highlightsText} onChange={(event) => setHighlightsText(event.target.value)} />
      </label>

      <div className="rounded-md border border-border/60 bg-inset/20">
        <button
          type="button"
          className="flex w-full items-center justify-between px-3 py-2 text-left text-sm font-medium"
          onClick={() => setAdvancedOpen((open) => !open)}
        >
          Advanced JSON (variants, faqs, related, customization upsells, image, gallery)
          <span className="text-xs text-text-muted">{advancedOpen ? "Hide" : "Show"}</span>
        </button>
        {advancedOpen ? (
          <div className="border-t border-border/60 p-3">
            <p className="text-xs text-text-muted">
              These nested fields aren&apos;t in the structured form yet. Edit raw JSON below; the
              server merges this into the saved record alongside the structured fields above.
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
          {submitting ? "Saving…" : "Save product"}
        </Button>
      </div>
    </form>
  );
}
