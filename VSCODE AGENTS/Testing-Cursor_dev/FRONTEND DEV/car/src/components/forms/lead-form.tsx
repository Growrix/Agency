"use client";

import { useMemo, useState } from "react";

type LeadFormKind = "contact" | "appointment" | "career" | "newsletter" | "quote" | "listing_inquiry";

type LeadFormProps = {
  kind: LeadFormKind;
  submitLabel: string;
  className?: string;
  defaults?: Partial<Record<string, string>>;
  showMessage?: boolean;
  showServiceFields?: boolean;
  vehicle?: string;
};

type SubmitState = "idle" | "submitting" | "success" | "validation_error" | "error" | "not_configured";

const emailRegex = /.+@.+\..+/;

function normalize(value: FormDataEntryValue | null) {
  return typeof value === "string" ? value.trim() : "";
}

export function LeadForm({
  kind,
  submitLabel,
  className,
  defaults,
  showMessage = true,
  showServiceFields = false,
  vehicle,
}: LeadFormProps) {
  const [state, setState] = useState<SubmitState>("idle");
  const [errors, setErrors] = useState<string[]>([]);

  const defaultMessage = useMemo(() => {
    if (vehicle) {
      return `I am interested in ${vehicle}. Please share next steps and availability.`;
    }
    return defaults?.message ?? "";
  }, [defaults?.message, vehicle]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrors([]);
    setState("submitting");

    const formData = new FormData(event.currentTarget);
    const payload = {
      kind,
      name: normalize(formData.get("name")),
      email: normalize(formData.get("email")),
      phone: normalize(formData.get("phone")),
      message: normalize(formData.get("message")),
      service: normalize(formData.get("service")),
      date: normalize(formData.get("date")),
      time: normalize(formData.get("time")),
      vehicle: vehicle ?? normalize(formData.get("vehicle")),
    };

    const localErrors: string[] = [];

    if (!payload.name) {
      localErrors.push("Name is required.");
    }

    if (!emailRegex.test(payload.email)) {
      localErrors.push("Valid email is required.");
    }

    if (kind === "appointment") {
      if (!payload.service) {
        localErrors.push("Service is required.");
      }
      if (!payload.date) {
        localErrors.push("Date is required.");
      }
      if (!payload.time) {
        localErrors.push("Time is required.");
      }
    }

    if (kind === "listing_inquiry" && !payload.vehicle) {
      localErrors.push("Vehicle context is required.");
    }

    if (localErrors.length > 0) {
      setErrors(localErrors);
      setState("validation_error");
      return;
    }

    try {
      const response = await fetch("/api/forms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = (await response.json()) as {
        ok: boolean;
        status: SubmitState;
        message?: string;
        errors?: string[];
      };

      if (!response.ok) {
        setErrors(result.errors ?? ["Please review your submission and try again."]);
        setState("validation_error");
        return;
      }

      setState(result.status || "success");
      if (!result.ok && result.message) {
        setErrors([result.message]);
      }
      if (result.status === "success" || result.status === "not_configured") {
        event.currentTarget.reset();
      }
    } catch {
      setState("error");
      setErrors(["Something went wrong while submitting. Please try again."]);
    }
  }

  return (
    <form className={className} onSubmit={handleSubmit} noValidate>
      <div className="row g-3">
        <div className="col-md-6">
          <input
            className="form-control"
            type="text"
            name="name"
            placeholder="Your Name"
            defaultValue={defaults?.name}
            required
          />
        </div>
        <div className="col-md-6">
          <input
            className="form-control"
            type="email"
            name="email"
            placeholder="Your Email"
            defaultValue={defaults?.email}
            required
          />
        </div>
        <div className="col-md-6">
          <input
            className="form-control"
            type="tel"
            name="phone"
            placeholder="Phone"
            defaultValue={defaults?.phone}
          />
        </div>

        {showServiceFields ? (
          <>
            <div className="col-md-6">
              <select className="form-control" name="service" defaultValue={defaults?.service ?? ""} required>
                <option value="" disabled>
                  Select Service
                </option>
                <option value="Exterior Hand Wash and Wax">Exterior Hand Wash and Wax</option>
                <option value="Interior Deep Cleaning">Interior Deep Cleaning</option>
                <option value="Paint Correction">Paint Correction</option>
                <option value="Ceramic Coating Protection">Ceramic Coating Protection</option>
                <option value="Engine Bay Detailing">Engine Bay Detailing</option>
                <option value="Headlight Restoration">Headlight Restoration</option>
              </select>
            </div>
            <div className="col-md-6">
              <input className="form-control" type="date" name="date" defaultValue={defaults?.date} required />
            </div>
            <div className="col-md-6">
              <input className="form-control" type="time" name="time" defaultValue={defaults?.time} required />
            </div>
          </>
        ) : null}

        {showMessage ? (
          <div className="col-12">
            <textarea
              className="form-control"
              name="message"
              rows={4}
              placeholder="Message"
              defaultValue={defaultMessage}
            />
          </div>
        ) : null}
      </div>

      <div className="mt-4 d-flex flex-column gap-2">
        <button className="btn-main fx-slide" type="submit" disabled={state === "submitting"}>
          <span>{state === "submitting" ? "Submitting..." : submitLabel}</span>
        </button>

        {state === "success" ? <p className="m-0 text-success">Submitted successfully.</p> : null}
        {state === "not_configured" ? (
          <p className="m-0 text-warning">
            Submission received in frontend mode. Delivery integration is not configured yet.
          </p>
        ) : null}
        {state === "validation_error" || state === "error" ? (
          <ul className="m-0 ps-4 text-danger">
            {errors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        ) : null}
      </div>
    </form>
  );
}
