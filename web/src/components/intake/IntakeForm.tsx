"use client";

import { useMemo, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { FreeDemoAuthGate } from "@/components/marketing/FreeDemoPopup";
import { FileUploadField } from "@/components/intake/FileUploadField";
import { Button, LinkButton } from "@/components/primitives/Button";
import { isClerkConfiguredClient } from "@/lib/clerk-client";
import { cn } from "@/lib/utils";

export type IntakeFormValues = {
  business_name: string;
  industry: string;
  target_audience: string;
  brand_voice: string;
  business_description: string;
  goals: string[];
  competitors: string[];
  reference_sites: Array<{ url: string; note: string }>;
  drive_links: Array<{ url: string; label: string; type: "gdrive" | "dropbox" | "onedrive" | "other" }>;
  budget_range: string;
  timeline: string;
  must_have_features: string[];
};

const INDUSTRIES = [
  "Professional services",
  "E-commerce / retail",
  "Healthcare",
  "SaaS / technology",
  "Real estate",
  "Education",
  "Hospitality",
  "Other",
];

const BUDGETS = ["Under $2k", "$2k – $5k", "$5k – $10k", "$10k+", "Not sure yet"];
const TIMELINES = ["ASAP (2–4 weeks)", "1–2 months", "3+ months", "Flexible"];

const STEPS = ["About", "Goals", "Assets", "Budget", "Review"] as const;

type Props = {
  onSuccess?: () => void;
  isFreeDemo?: boolean;
};

function TagInput({
  label,
  values,
  onChange,
  placeholder,
}: {
  label: string;
  values: string[];
  onChange: (values: string[]) => void;
  placeholder: string;
}) {
  const [draft, setDraft] = useState("");

  function addValue() {
    const next = draft.trim();
    if (!next || values.includes(next)) {
      setDraft("");
      return;
    }
    onChange([...values, next]);
    setDraft("");
  }

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-text">{label}</label>
      <div className="flex gap-2">
        <input
          className="signal-input flex-1"
          value={draft}
          placeholder={placeholder}
          onChange={(event) => setDraft(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              addValue();
            }
          }}
        />
        <Button type="button" size="sm" variant="outline" onClick={addValue}>
          Add
        </Button>
      </div>
      {values.length > 0 ? (
        <ul className="flex flex-wrap gap-2">
          {values.map((value) => (
            <li key={value} className="rounded-full bg-inset/40 px-3 py-1 text-xs text-text">
              {value}
              <button
                type="button"
                className="ml-2 text-text-muted hover:text-destructive"
                onClick={() => onChange(values.filter((item) => item !== value))}
                aria-label={`Remove ${value}`}
              >
                ×
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

export function IntakeForm({ onSuccess, isFreeDemo = false }: Props) {
  const { isSignedIn } = useAuth();
  const clerkEnabled = isClerkConfiguredClient();
  const needsAuth = clerkEnabled && !isSignedIn;

  const [step, setStep] = useState(0);
  const [files, setFiles] = useState<File[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [values, setValues] = useState<IntakeFormValues>({
    business_name: "",
    industry: "",
    target_audience: "",
    brand_voice: "",
    business_description: "",
    goals: [],
    competitors: [],
    reference_sites: [{ url: "", note: "" }],
    drive_links: [{ url: "", label: "", type: "gdrive" }],
    budget_range: "",
    timeline: "",
    must_have_features: [],
  });

  const progress = useMemo(() => ((step + 1) / STEPS.length) * 100, [step]);

  function update<K extends keyof IntakeFormValues>(key: K, value: IntakeFormValues[K]) {
    setValues((current) => ({ ...current, [key]: value }));
  }

  async function handleSubmit() {
    setSubmitting(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.set("business_name", values.business_name);
      formData.set("industry", values.industry);
      formData.set("target_audience", values.target_audience);
      formData.set("brand_voice", values.brand_voice);
      formData.set("business_description", values.business_description);
      formData.set("goals", JSON.stringify(values.goals));
      formData.set("competitors", JSON.stringify(values.competitors));
      formData.set(
        "reference_sites",
        JSON.stringify(values.reference_sites.filter((item) => item.url.trim())),
      );
      formData.set(
        "drive_links",
        JSON.stringify(values.drive_links.filter((item) => item.url.trim())),
      );
      formData.set("budget_range", values.budget_range);
      formData.set("timeline", values.timeline);
      formData.set("must_have_features", JSON.stringify(values.must_have_features));
      formData.set("is_free_demo", isFreeDemo ? "true" : "false");
      for (const file of files) {
        formData.append("files", file);
      }

      const response = await fetch("/api/v1/intakes", {
        method: "POST",
        body: formData,
        credentials: "same-origin",
      });
      const payload = (await response.json().catch(() => null)) as {
        data?: { submission_number?: string };
        error?: { message?: string };
      } | null;

      if (!response.ok) {
        throw new Error(payload?.error?.message ?? "Unable to submit your request.");
      }

      setSuccessMessage(
        `Request submitted (${payload?.data?.submission_number ?? "confirmed"}). Check your dashboard for updates.`,
      );
      onSuccess?.();
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Unable to submit your request.");
    } finally {
      setSubmitting(false);
    }
  }

  if (needsAuth) {
    return (
      <div className="space-y-4">
        <FreeDemoAuthGate />
        <p className="text-xs text-text-muted">After signing in, this form will continue where you left off.</p>
      </div>
    );
  }

  if (successMessage) {
    return (
      <div className="space-y-4 rounded-md border border-success/30 bg-success/10 p-4">
        <p className="font-medium text-text">{successMessage}</p>
        <LinkButton href="/dashboard/projects">Open my projects</LinkButton>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div>
        <div className="mb-2 flex items-center justify-between text-xs text-text-muted">
          <span>
            Step {step + 1} of {STEPS.length}: {STEPS[step]}
          </span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-inset/40">
          <div className="h-full bg-primary transition-all duration-300" style={{ width: `${progress}%` }} />
        </div>
      </div>

      {step === 0 ? (
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-text" htmlFor="business_name">
              Business name *
            </label>
            <input
              id="business_name"
              className="signal-input mt-1"
              value={values.business_name}
              onChange={(event) => update("business_name", event.target.value)}
              placeholder="e.g. Sunterra Solar"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-text" htmlFor="industry">
              Industry
            </label>
            <select
              id="industry"
              className="signal-input mt-1"
              value={values.industry}
              onChange={(event) => update("industry", event.target.value)}
            >
              <option value="">Select industry</option>
              {INDUSTRIES.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-text" htmlFor="target_audience">
              Who is your ideal customer?
            </label>
            <input
              id="target_audience"
              className="signal-input mt-1"
              value={values.target_audience}
              onChange={(event) => update("target_audience", event.target.value)}
              placeholder="Homeowners in Texas looking for solar savings"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-text" htmlFor="brand_voice">
              Brand voice / personality
            </label>
            <input
              id="brand_voice"
              className="signal-input mt-1"
              value={values.brand_voice}
              onChange={(event) => update("brand_voice", event.target.value)}
              placeholder="Trustworthy, modern, friendly"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-text" htmlFor="business_description">
              Tell us about your business *
            </label>
            <textarea
              id="business_description"
              className="signal-input mt-1 min-h-28"
              value={values.business_description}
              onChange={(event) => update("business_description", event.target.value)}
              placeholder="What you do, who you help, and what makes you different."
            />
          </div>
        </div>
      ) : null}

      {step === 1 ? (
        <div className="space-y-4">
          <TagInput
            label="Website goals"
            values={values.goals}
            onChange={(next) => update("goals", next)}
            placeholder="Generate leads, showcase portfolio…"
          />
          <TagInput
            label="Competitors or peers"
            values={values.competitors}
            onChange={(next) => update("competitors", next)}
            placeholder="Company name"
          />
          <div className="space-y-3">
            <p className="text-sm font-medium text-text">Reference websites you like</p>
            {values.reference_sites.map((site, index) => (
              <div key={`ref-${index}`} className="grid gap-2 sm:grid-cols-2">
                <input
                  className="signal-input"
                  placeholder="https://example.com"
                  value={site.url}
                  onChange={(event) => {
                    const next = [...values.reference_sites];
                    next[index] = { ...next[index], url: event.target.value };
                    update("reference_sites", next);
                  }}
                />
                <input
                  className="signal-input"
                  placeholder="What you like about it"
                  value={site.note}
                  onChange={(event) => {
                    const next = [...values.reference_sites];
                    next[index] = { ...next[index], note: event.target.value };
                    update("reference_sites", next);
                  }}
                />
              </div>
            ))}
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={() => update("reference_sites", [...values.reference_sites, { url: "", note: "" }])}
            >
              Add another reference
            </Button>
          </div>
        </div>
      ) : null}

      {step === 2 ? (
        <div className="space-y-4">
          <FileUploadField files={files} onChange={setFiles} />
          <div className="space-y-3">
            <p className="text-sm font-medium text-text">Drive / folder links</p>
            {values.drive_links.map((link, index) => (
              <div key={`drive-${index}`} className="grid gap-2 sm:grid-cols-[1fr_140px]">
                <input
                  className="signal-input"
                  placeholder="Google Drive, Dropbox, OneDrive link"
                  value={link.url}
                  onChange={(event) => {
                    const next = [...values.drive_links];
                    next[index] = { ...next[index], url: event.target.value };
                    update("drive_links", next);
                  }}
                />
                <select
                  className="signal-input"
                  value={link.type}
                  onChange={(event) => {
                    const next = [...values.drive_links];
                    next[index] = {
                      ...next[index],
                      type: event.target.value as IntakeFormValues["drive_links"][number]["type"],
                    };
                    update("drive_links", next);
                  }}
                >
                  <option value="gdrive">Google Drive</option>
                  <option value="dropbox">Dropbox</option>
                  <option value="onedrive">OneDrive</option>
                  <option value="other">Other</option>
                </select>
              </div>
            ))}
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={() =>
                update("drive_links", [...values.drive_links, { url: "", label: "", type: "gdrive" }])
              }
            >
              Add another link
            </Button>
          </div>
        </div>
      ) : null}

      {step === 3 ? (
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-text" htmlFor="budget_range">
              Budget range
            </label>
            <select
              id="budget_range"
              className="signal-input mt-1"
              value={values.budget_range}
              onChange={(event) => update("budget_range", event.target.value)}
            >
              <option value="">Select budget</option>
              {BUDGETS.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-text" htmlFor="timeline">
              Timeline
            </label>
            <select
              id="timeline"
              className="signal-input mt-1"
              value={values.timeline}
              onChange={(event) => update("timeline", event.target.value)}
            >
              <option value="">Select timeline</option>
              {TIMELINES.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
          <TagInput
            label="Must-have features or pages"
            values={values.must_have_features}
            onChange={(next) => update("must_have_features", next)}
            placeholder="Booking, pricing, blog…"
          />
        </div>
      ) : null}

      {step === 4 ? (
        <div className="space-y-3 text-sm">
          <p>
            <strong>Business:</strong> {values.business_name || "—"}
          </p>
          <p>
            <strong>Industry:</strong> {values.industry || "—"}
          </p>
          <p>
            <strong>Goals:</strong> {values.goals.join(", ") || "—"}
          </p>
          <p>
            <strong>References:</strong>{" "}
            {values.reference_sites.filter((item) => item.url.trim()).length || 0} site(s)
          </p>
          <p>
            <strong>Files:</strong> {files.length} attached
          </p>
          <p>
            <strong>Drive links:</strong> {values.drive_links.filter((item) => item.url.trim()).length}
          </p>
          <p>
            <strong>Budget / timeline:</strong> {values.budget_range || "—"} · {values.timeline || "—"}
          </p>
        </div>
      ) : null}

      {error ? <p className={cn("text-sm text-destructive")}>{error}</p> : null}

      <div className="flex flex-col gap-2 sm:flex-row sm:justify-between">
        <Button type="button" variant="ghost" disabled={step === 0 || submitting} onClick={() => setStep((s) => s - 1)}>
          Back
        </Button>
        {step < STEPS.length - 1 ? (
          <Button
            type="button"
            disabled={
              submitting ||
              (step === 0 && (!values.business_name.trim() || values.business_description.trim().length < 20))
            }
            onClick={() => setStep((s) => s + 1)}
          >
            Continue
          </Button>
        ) : (
          <Button type="button" disabled={submitting} onClick={() => void handleSubmit()}>
            {submitting ? "Submitting…" : "Submit request"}
          </Button>
        )}
      </div>
    </div>
  );
}
