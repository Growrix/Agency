"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useAuth, useClerk } from "@clerk/nextjs";
import { FreeDemoAuthGate } from "@/components/marketing/FreeDemoPopup";
import { FileUploadField } from "@/components/intake/FileUploadField";
import { Button, LinkButton } from "@/components/primitives/Button";
import { isClerkConfiguredClient } from "@/lib/clerk-client";
import {
  clearPendingIntake,
  markFreeDemoSeen,
  readPendingIntake,
  savePendingIntake,
  useFreeDemoStore,
} from "@/lib/free-demo-store";
import { cn } from "@/lib/utils";

export type IntakeFormValues = {
  business_name: string;
  industry: string;
  industry_custom: string;
  target_audience: string;
  brand_voice: string;
  business_description: string;
  goals: string[];
  competitors: string[];
  reference_sites: Array<{ url: string; note: string }>;
  drive_links: Array<{ url: string; label: string; type: "gdrive" | "dropbox" | "onedrive" | "other" }>;
  budget_range: string;
  budget_custom: string;
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
  "Construction / contracting",
  "Legal services",
  "Finance / insurance",
  "Food & beverage",
  "Fitness / wellness",
  "Automotive",
  "Travel / tourism",
  "Media / entertainment",
  "Manufacturing",
  "Agriculture",
  "Creative / design",
  "Marketing agency",
  "Consulting",
  "Non-profit / NGO",
  "Government",
  "Religious / spiritual",
  "Other",
];

const BUDGETS = [
  "Under $500",
  "$500 – $1k",
  "$1k – $2k",
  "$2k – $5k",
  "$5k – $10k",
  "$10k+",
  "Not sure yet",
  "Custom",
];
const TIMELINES = ["ASAP (2–4 weeks)", "1–2 months", "3+ months", "Flexible"];

const STEPS = ["About", "Goals", "Assets", "Budget", "Review"] as const;

type Props = {
  /** Optional callback after a successful submit (does not close the host modal). */
  onSuccess?: () => void;
  /** Close the host modal from the success panel. */
  onClose?: () => void;
  isFreeDemo?: boolean;
};

const EMPTY_VALUES: IntakeFormValues = {
  business_name: "",
  industry: "",
  industry_custom: "",
  target_audience: "",
  brand_voice: "",
  business_description: "",
  goals: [],
  competitors: [],
  reference_sites: [{ url: "", note: "" }],
  drive_links: [{ url: "", label: "", type: "gdrive" }],
  budget_range: "",
  budget_custom: "",
  timeline: "",
  must_have_features: [],
};

function coerceIntakeValues(raw: Record<string, unknown> | undefined): IntakeFormValues {
  if (!raw) {
    return { ...EMPTY_VALUES, reference_sites: [{ url: "", note: "" }], drive_links: [{ url: "", label: "", type: "gdrive" }] };
  }
  return {
    business_name: typeof raw.business_name === "string" ? raw.business_name : "",
    industry: typeof raw.industry === "string" ? raw.industry : "",
    industry_custom: typeof raw.industry_custom === "string" ? raw.industry_custom : "",
    target_audience: typeof raw.target_audience === "string" ? raw.target_audience : "",
    brand_voice: typeof raw.brand_voice === "string" ? raw.brand_voice : "",
    business_description: typeof raw.business_description === "string" ? raw.business_description : "",
    goals: Array.isArray(raw.goals) ? raw.goals.filter((item): item is string => typeof item === "string") : [],
    competitors: Array.isArray(raw.competitors)
      ? raw.competitors.filter((item): item is string => typeof item === "string")
      : [],
    reference_sites: Array.isArray(raw.reference_sites)
      ? (raw.reference_sites as IntakeFormValues["reference_sites"])
      : [{ url: "", note: "" }],
    drive_links: Array.isArray(raw.drive_links)
      ? (raw.drive_links as IntakeFormValues["drive_links"])
      : [{ url: "", label: "", type: "gdrive" }],
    budget_range: typeof raw.budget_range === "string" ? raw.budget_range : "",
    budget_custom: typeof raw.budget_custom === "string" ? raw.budget_custom : "",
    timeline: typeof raw.timeline === "string" ? raw.timeline : "",
    must_have_features: Array.isArray(raw.must_have_features)
      ? raw.must_have_features.filter((item): item is string => typeof item === "string")
      : [],
  };
}

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

export function IntakeForm({ onSuccess, onClose, isFreeDemo = false }: Props) {
  const { isSignedIn, isLoaded, getToken } = useAuth();
  const clerk = useClerk();
  const clerkEnabled = isClerkConfiguredClient();
  const bumpClaimed = useFreeDemoStore((state) => state.bumpClaimed);

  const [step, setStep] = useState(0);
  const [files, setFiles] = useState<File[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [awaitingAuth, setAwaitingAuth] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [submissionNumber, setSubmissionNumber] = useState<string | null>(null);
  const [needsFileReattach, setNeedsFileReattach] = useState(false);
  const [values, setValues] = useState<IntakeFormValues>(() => ({
    ...EMPTY_VALUES,
    reference_sites: [{ url: "", note: "" }],
    drive_links: [{ url: "", label: "", type: "gdrive" }],
  }));

  const pendingSubmitRef = useRef(false);
  const restoredPendingRef = useRef(false);
  const valuesRef = useRef(values);
  const filesRef = useRef(files);
  const [pendingRestoreReady, setPendingRestoreReady] = useState(false);

  useEffect(() => {
    valuesRef.current = values;
    filesRef.current = files;
  }, [values, files]);

  // Restore draft after Clerk full-page redirect so auto-submit can finish.
  useEffect(() => {
    if (restoredPendingRef.current) {
      return;
    }
    const draft = readPendingIntake();
    if (!draft) {
      return;
    }
    restoredPendingRef.current = true;

    // Defer restoration to a microtask so it does not trigger cascading renders.
    queueMicrotask(() => {
      const restored = coerceIntakeValues(draft.values);
      setValues(restored);
      valuesRef.current = restored;
      setStep(STEPS.length - 1);
      setNeedsFileReattach(Boolean(draft.hadFiles));
      pendingSubmitRef.current = true;
      setAwaitingAuth(true);
      setPendingRestoreReady(true);
    });
  }, []);

  const progress = useMemo(() => ((step + 1) / STEPS.length) * 100, [step]);

  function update<K extends keyof IntakeFormValues>(key: K, value: IntakeFormValues[K]) {
    setValues((current) => ({ ...current, [key]: value }));
  }

  async function submitIntake() {
    const current = valuesRef.current;
    const currentFiles = filesRef.current;
    setSubmitting(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.set("business_name", current.business_name);
      formData.set(
        "industry",
        current.industry === "Other" ? current.industry_custom.trim() : current.industry,
      );
      formData.set("target_audience", current.target_audience);
      formData.set("brand_voice", current.brand_voice);
      formData.set("business_description", current.business_description);
      formData.set("goals", JSON.stringify(current.goals));
      formData.set("competitors", JSON.stringify(current.competitors));
      formData.set(
        "reference_sites",
        JSON.stringify(current.reference_sites.filter((item) => item.url.trim())),
      );
      formData.set(
        "drive_links",
        JSON.stringify(current.drive_links.filter((item) => item.url.trim())),
      );
      formData.set(
        "budget_range",
        current.budget_range === "Custom" ? current.budget_custom.trim() : current.budget_range,
      );
      formData.set("timeline", current.timeline);
      formData.set("must_have_features", JSON.stringify(current.must_have_features));
      formData.set("is_free_demo", isFreeDemo ? "true" : "false");
      for (const file of currentFiles) {
        formData.append("files", file);
      }

      const headers: HeadersInit = {};
      if (clerkEnabled) {
        const token = await getToken().catch(() => null);
        if (token) {
          headers.Authorization = `Bearer ${token}`;
        }
      }

      const response = await fetch("/api/v1/intakes", {
        method: "POST",
        body: formData,
        credentials: "same-origin",
        headers,
      });
      const payload = (await response.json().catch(() => null)) as {
        data?: { submission_number?: string; project_id?: string };
        error?: { message?: string };
      } | null;

      if (!response.ok) {
        throw new Error(payload?.error?.message ?? "Unable to submit your request.");
      }

      clearPendingIntake();
      markFreeDemoSeen();
      setAwaitingAuth(false);
      setNeedsFileReattach(false);
      const number = payload?.data?.submission_number ?? "confirmed";
      setSubmissionNumber(number);
      setSuccessMessage(
        `Request submitted (${number}). Open My projects in your dashboard to track progress.`,
      );
      if (isFreeDemo) {
        bumpClaimed();
      }
      onSuccess?.();
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Unable to submit your request.");
    } finally {
      setSubmitting(false);
    }
  }

  function handleSubmit() {
    setError(null);

    if (clerkEnabled && isLoaded && !isSignedIn) {
      pendingSubmitRef.current = true;
      setAwaitingAuth(true);
      savePendingIntake({
        values: valuesRef.current as unknown as Record<string, unknown>,
        hadFiles: filesRef.current.length > 0,
        isFreeDemo,
      });
      const returnUrl = typeof window !== "undefined" ? window.location.href : "/";
      try {
        clerk.openSignIn({
          forceRedirectUrl: returnUrl,
          fallbackRedirectUrl: returnUrl,
        });
      } catch {
        // Fallback UI (FreeDemoAuthGate) remains visible below.
      }
      return;
    }

    void submitIntake();
  }

  useEffect(() => {
    if (!isLoaded || !isSignedIn || !pendingSubmitRef.current) {
      return;
    }
    pendingSubmitRef.current = false;
    setAwaitingAuth(false);
    void submitIntake();
    // submitIntake closes over refs + stable props; intentionally omit from deps.
    // eslint-disable-next-line react-hooks/exhaustive-deps -- auto-submit once after auth
  }, [isLoaded, isSignedIn, pendingRestoreReady]);

  if (successMessage) {
    return (
      <div className="space-y-4 rounded-md border border-success/30 bg-success/10 p-4" data-testid="intake-success">
        <p className="text-xs uppercase tracking-[0.18em] text-success">Request received</p>
        <p className="font-medium text-text">{successMessage}</p>
        {submissionNumber ? (
          <p className="text-sm text-text-muted" data-testid="intake-submission-number">
            Submission ID: <span className="font-mono text-text">{submissionNumber}</span>
          </p>
        ) : null}
        <div className="flex flex-col gap-2 sm:flex-row">
          <LinkButton href="/dashboard/projects">Open my projects</LinkButton>
          {onClose ? (
            <Button type="button" variant="ghost" onClick={onClose}>
              Close
            </Button>
          ) : null}
        </div>
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
            {values.industry === "Other" ? (
              <input
                id="industry_custom"
                className="signal-input mt-2"
                value={values.industry_custom}
                onChange={(event) => update("industry_custom", event.target.value)}
                placeholder="Type your industry"
                aria-label="Your industry"
              />
            ) : null}
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
            {values.budget_range === "Custom" ? (
              <input
                id="budget_custom"
                className="signal-input mt-2"
                value={values.budget_custom}
                onChange={(event) => update("budget_custom", event.target.value)}
                placeholder="e.g. $3,200 or $750–$1,500"
                aria-label="Your custom budget"
              />
            ) : null}
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
          {needsFileReattach ? (
            <p className="rounded-md border border-warning/40 bg-warning/10 px-3 py-2 text-warning">
              You had files attached before sign-in. Please re-attach them below if needed, then submit again.
            </p>
          ) : null}
          {needsFileReattach ? <FileUploadField files={files} onChange={setFiles} /> : null}
          <p>
            <strong>Business:</strong> {values.business_name || "—"}
          </p>
          <p>
            <strong>Industry:</strong>{" "}
            {values.industry === "Other"
              ? values.industry_custom.trim() || "—"
              : values.industry || "—"}
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
            <strong>Budget / timeline:</strong>{" "}
            {values.budget_range === "Custom"
              ? values.budget_custom.trim() || "—"
              : values.budget_range || "—"}{" "}
            · {values.timeline || "—"}
          </p>
        </div>
      ) : null}

      {error ? <p className={cn("text-sm text-destructive")}>{error}</p> : null}

      {awaitingAuth ? (
        <FreeDemoAuthGate
          title="Sign in to finish your free demo request"
          description="Your answers are saved in this form. After you sign in or sign up, we submit automatically."
        />
      ) : null}

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
          <Button type="button" disabled={submitting} onClick={() => handleSubmit()}>
            {submitting ? "Submitting…" : awaitingAuth ? "Sign in to submit" : "Submit request"}
          </Button>
        )}
      </div>
    </div>
  );
}
