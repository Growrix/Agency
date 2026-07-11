"use client";

import { FormEvent, useMemo, useState } from "react";

type ContactFields = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

type ContactStatus = "idle" | "submitting" | "success" | "error" | "not-configured";

const CONTACT_ENDPOINT = process.env.NEXT_PUBLIC_CONTACT_ENDPOINT?.trim() ?? "";
const CONTACT_DELIVERY_ENABLED = process.env.NEXT_PUBLIC_CONTACT_DELIVERY_ENABLED === "true";

const isConfiguredEndpoint = (value: string) => {
  if (value.length === 0) {
    return false;
  }

  const normalized = value.trim().toLowerCase();
  if (["undefined", "null", "false", "#", "action:#"].includes(normalized)) {
    return false;
  }

  return /^https?:\/\//.test(value) || value.startsWith("/");
};

const initialFields: ContactFields = {
  name: "",
  email: "",
  phone: "",
  message: "",
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const getErrors = (fields: ContactFields) => {
  return {
    name: fields.name.trim().length === 0,
    email: !emailPattern.test(fields.email.trim()),
    phone: fields.phone.trim().length === 0,
    message: fields.message.trim().length === 0,
  };
};

export function ContactForm() {
  const [fields, setFields] = useState<ContactFields>(initialFields);
  const [status, setStatus] = useState<ContactStatus>("idle");
  const [showErrors, setShowErrors] = useState(false);

  const errors = useMemo(() => getErrors(fields), [fields]);
  const hasErrors = Object.values(errors).some(Boolean);

  const updateField = (key: keyof ContactFields, value: string) => {
    setFields((current) => ({
      ...current,
      [key]: value,
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setShowErrors(true);

    if (hasErrors) {
      return;
    }

    setStatus("submitting");

    if (!CONTACT_DELIVERY_ENABLED || !isConfiguredEndpoint(CONTACT_ENDPOINT)) {
      setStatus("not-configured");
      return;
    }

    try {
      const response = await fetch(CONTACT_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(fields),
      });

      if (!response.ok) {
        throw new Error(`Contact request failed with status ${response.status}`);
      }

      setStatus("success");
      setFields(initialFields);
      setShowErrors(false);
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="success text-light p-20" role="status" aria-live="polite">
        Your message has been sent successfully.
      </div>
    );
  }

  return (
    <form className="relative z1000" onSubmit={handleSubmit} noValidate data-native-form="contact">
      <div className="field-set">
        <input
          type="text"
          className={`form-control ${showErrors && errors.name ? "error_input" : ""}`}
          placeholder="Your Name"
          value={fields.name}
          onChange={(event) => updateField("name", event.target.value)}
          aria-invalid={showErrors && errors.name}
        />
      </div>

      <div className="field-set">
        <input
          type="email"
          className={`form-control ${showErrors && errors.email ? "error_input" : ""}`}
          placeholder="Your Email"
          value={fields.email}
          onChange={(event) => updateField("email", event.target.value)}
          aria-invalid={showErrors && errors.email}
        />
      </div>

      <div className="field-set">
        <input
          type="tel"
          className={`form-control ${showErrors && errors.phone ? "error_input" : ""}`}
          placeholder="Your Phone"
          value={fields.phone}
          onChange={(event) => updateField("phone", event.target.value)}
          aria-invalid={showErrors && errors.phone}
        />
      </div>

      <div className="field-set mb20">
        <textarea
          className={`form-control ${showErrors && errors.message ? "error_input" : ""}`}
          placeholder="Your Message"
          value={fields.message}
          onChange={(event) => updateField("message", event.target.value)}
          aria-invalid={showErrors && errors.message}
        />
      </div>

      <div className="mt20">
        <button type="submit" className="btn-main" disabled={status === "submitting"}>
          {status === "submitting" ? "Sending..." : "Send Message"}
        </button>
      </div>

      {status === "error" ? (
        <div className="error mt-3" role="alert">
          Sorry, there was an error sending your message.
        </div>
      ) : null}

      {status === "not-configured" ? (
        <div className="error mt-3" role="status">
          Contact endpoint is not configured yet. Set NEXT_PUBLIC_CONTACT_ENDPOINT to enable delivery.
        </div>
      ) : null}
    </form>
  );
}