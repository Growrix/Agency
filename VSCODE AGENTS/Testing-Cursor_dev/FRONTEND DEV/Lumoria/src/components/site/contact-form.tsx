"use client";

import { FormEvent, useMemo, useState } from "react";

type Status = "idle" | "error" | "success";

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  const validationError = useMemo(() => {
    if (!name.trim()) {
      return "Please provide your name.";
    }

    if (!email.trim() || !email.includes("@")) {
      return "Please provide a valid email address.";
    }

    if (!message.trim() || message.trim().length < 20) {
      return "Please share at least 20 characters about your project.";
    }

    return null;
  }, [email, message, name]);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (validationError) {
      setStatus("error");
      return;
    }

    setStatus("success");
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-2xl border border-(--lumoria-color-border) bg-white p-6"
    >
      <h3 className="font-(family-name:--lumoria-font-heading) text-xl font-semibold text-(--lumoria-color-secondary)">
        Project Inquiry
      </h3>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <label className="text-sm font-medium text-(--lumoria-color-secondary)">
          Name
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="mt-2 w-full rounded-xl border border-(--lumoria-color-border) px-3 py-2"
            placeholder="Your name"
          />
        </label>

        <label className="text-sm font-medium text-(--lumoria-color-secondary)">
          Email
          <input
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="mt-2 w-full rounded-xl border border-(--lumoria-color-border) px-3 py-2"
            placeholder="name@company.com"
          />
        </label>
      </div>

      <label className="mt-4 block text-sm font-medium text-(--lumoria-color-secondary)">
        Message
        <textarea
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          rows={5}
          className="mt-2 w-full rounded-xl border border-(--lumoria-color-border) px-3 py-2"
          placeholder="Tell us about your project scope, location, and timeline."
        />
      </label>

      {status === "error" && validationError ? (
        <p className="mt-3 text-sm text-red-700">{validationError}</p>
      ) : null}

      {status === "success" ? (
        <p className="mt-3 text-sm text-green-700">
          Thanks. Your request was captured in this frontend flow and will be connected to backend handling in a later phase.
        </p>
      ) : null}

      <button
        type="submit"
        className="mt-5 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white"
      >
        Send Inquiry
      </button>
    </form>
  );
}
