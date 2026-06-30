"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/primitives/Button";

export type CatalogServiceFormValues = {
  id: string;
  slug: string;
  title: string;
  description: string;
  short_description: string;
  service_type: string;
  pricing_model: "contact" | "tiered" | "fixed";
  delivery_timeline: string;
  pillars: string[];
};

type CatalogServiceFormProps = {
  initial: CatalogServiceFormValues;
  onSubmit: (values: CatalogServiceFormValues) => Promise<void> | void;
  submitting?: boolean;
};

function splitList(value: string): string[] {
  return value
    .split(/[\n,]+/)
    .map((entry) => entry.trim())
    .filter(Boolean);
}

export function CatalogServiceForm({ initial, onSubmit, submitting }: CatalogServiceFormProps) {
  const [values, setValues] = useState(initial);
  const [pillarsText, setPillarsText] = useState(initial.pillars.join(", "));

  function update<K extends keyof CatalogServiceFormValues>(key: K, value: CatalogServiceFormValues[K]) {
    setValues((previous) => ({ ...previous, [key]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await onSubmit({ ...values, pillars: splitList(pillarsText) });
  }

  return (
    <form className="space-y-3" onSubmit={handleSubmit}>
      <div className="grid grid-cols-2 gap-3">
        <label className="block">
          <span className="font-mono text-[10px] uppercase tracking-wider text-text-muted">Slug</span>
          <input
            className="signal-input mt-1"
            value={values.slug}
            onChange={(event) => update("slug", event.target.value)}
            required
          />
        </label>
        <label className="block">
          <span className="font-mono text-[10px] uppercase tracking-wider text-text-muted">Service type</span>
          <input
            className="signal-input mt-1"
            value={values.service_type}
            onChange={(event) => update("service_type", event.target.value)}
          />
        </label>
      </div>

      <label className="block">
        <span className="font-mono text-[10px] uppercase tracking-wider text-text-muted">Title</span>
        <input
          className="signal-input mt-1"
          value={values.title}
          onChange={(event) => update("title", event.target.value)}
          required
        />
      </label>

      <label className="block">
        <span className="font-mono text-[10px] uppercase tracking-wider text-text-muted">Short description</span>
        <input
          className="signal-input mt-1"
          value={values.short_description}
          onChange={(event) => update("short_description", event.target.value)}
        />
      </label>

      <label className="block">
        <span className="font-mono text-[10px] uppercase tracking-wider text-text-muted">Description</span>
        <textarea
          className="signal-input mt-1 min-h-24"
          value={values.description}
          onChange={(event) => update("description", event.target.value)}
        />
      </label>

      <div className="grid grid-cols-2 gap-3">
        <label className="block">
          <span className="font-mono text-[10px] uppercase tracking-wider text-text-muted">Pricing model</span>
          <select
            className="signal-input mt-1"
            value={values.pricing_model}
            onChange={(event) => update("pricing_model", event.target.value as CatalogServiceFormValues["pricing_model"])}
          >
            <option value="contact">contact</option>
            <option value="tiered">tiered</option>
            <option value="fixed">fixed</option>
          </select>
        </label>
        <label className="block">
          <span className="font-mono text-[10px] uppercase tracking-wider text-text-muted">Delivery timeline</span>
          <input
            className="signal-input mt-1"
            value={values.delivery_timeline}
            onChange={(event) => update("delivery_timeline", event.target.value)}
          />
        </label>
      </div>

      <label className="block">
        <span className="font-mono text-[10px] uppercase tracking-wider text-text-muted">Pillars</span>
        <textarea
          className="signal-input mt-1 min-h-16"
          value={pillarsText}
          onChange={(event) => setPillarsText(event.target.value)}
          placeholder="Comma- or newline-separated list"
        />
      </label>

      <div className="flex justify-end pt-1">
        <Button type="submit" size="sm" disabled={submitting}>
          {submitting ? "Saving…" : "Save service"}
        </Button>
      </div>
    </form>
  );
}
