"use client";

import { FormEvent, useMemo, useState } from "react";

type BookingFields = {
  service: string;
  date: string;
  time: string;
  name: string;
  email: string;
  phone: string;
  message: string;
};

type BookingStatus = "idle" | "submitting" | "success" | "error" | "not-configured";

const BOOKING_ENDPOINT = process.env.NEXT_PUBLIC_BOOKING_ENDPOINT?.trim() ?? "";
const BOOKING_DELIVERY_ENABLED = process.env.NEXT_PUBLIC_BOOKING_DELIVERY_ENABLED === "true";

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

const initialFields: BookingFields = {
  service: "",
  date: "",
  time: "",
  name: "",
  email: "",
  phone: "",
  message: "",
};

const SERVICES = [
  "Exterior Hand Wash & Wax",
  "Interior Deep Cleaning",
  "Paint Correction",
  "Ceramic Coating Protection",
  "Engine Bay Detailing",
  "Headlight Restoration",
];

const TIME_SLOTS = [
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
];

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const getErrors = (fields: BookingFields) => {
  return {
    service: fields.service.trim().length === 0,
    date: fields.date.trim().length === 0,
    time: fields.time.trim().length === 0,
    name: fields.name.trim().length === 0,
    email: !emailPattern.test(fields.email.trim()),
    phone: fields.phone.trim().length === 0,
  };
};

export function BookingForm() {
  const [fields, setFields] = useState<BookingFields>(initialFields);
  const [status, setStatus] = useState<BookingStatus>("idle");
  const [showErrors, setShowErrors] = useState(false);

  const errors = useMemo(() => getErrors(fields), [fields]);
  const hasErrors = Object.values(errors).some(Boolean);

  const updateField = (key: keyof BookingFields, value: string) => {
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

    if (!BOOKING_DELIVERY_ENABLED || !isConfiguredEndpoint(BOOKING_ENDPOINT)) {
      setStatus("not-configured");
      return;
    }

    try {
      const response = await fetch(BOOKING_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(fields),
      });

      if (!response.ok) {
        throw new Error(`Booking request failed with status ${response.status}`);
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
        Thank you. Your appointment request has been submitted successfully.
      </div>
    );
  }

  return (
    <form
      className="relative z1000 bg-dark text-light rounded-1 p-40"
      onSubmit={handleSubmit}
      noValidate
      data-native-form="booking"
    >
      <div className="row g-3">
        <div className="col-lg-12">
          <h2 className="mb-3">
            <i className="fa fa-envelope-o id-color me-2" /> Make Appointment
          </h2>
          <p>
            Dirty car bringing down your shine? Get it detailed today. Book your appointment now and drive
            clean with confidence and style.
          </p>
          <div className="relative">
            <select
              className={`form-control ${showErrors && errors.service ? "error_input" : ""}`}
              value={fields.service}
              onChange={(event) => updateField("service", event.target.value)}
              aria-invalid={showErrors && errors.service}
            >
              <option value="">Select Service</option>
              {SERVICES.map((service) => (
                <option key={service} value={service}>
                  {service}
                </option>
              ))}
            </select>
            <i className="absolute top-0 inset-e-0 id-color pt-3 pe-3 icofont-simple-down" />
          </div>
        </div>

        <div className="col-lg-6">
          <input
            className={`form-control ${showErrors && errors.date ? "error_input" : ""}`}
            type="date"
            value={fields.date}
            onChange={(event) => updateField("date", event.target.value)}
            aria-invalid={showErrors && errors.date}
          />
        </div>

        <div className="col-lg-6">
          <div className="relative">
            <select
              className={`form-control ${showErrors && errors.time ? "error_input" : ""}`}
              value={fields.time}
              onChange={(event) => updateField("time", event.target.value)}
              aria-invalid={showErrors && errors.time}
            >
              <option value="">Select Time</option>
              {TIME_SLOTS.map((timeSlot) => (
                <option key={timeSlot} value={timeSlot}>
                  {timeSlot}
                </option>
              ))}
            </select>
            <i className="absolute top-0 inset-e-0 id-color pt-3 pe-3 icofont-simple-down" />
          </div>
        </div>

        <div className="col-lg-4">
          <input
            type="text"
            className={`form-control ${showErrors && errors.name ? "error_input" : ""}`}
            placeholder="Name"
            value={fields.name}
            onChange={(event) => updateField("name", event.target.value)}
            aria-invalid={showErrors && errors.name}
          />
        </div>

        <div className="col-lg-4">
          <input
            type="email"
            className={`form-control ${showErrors && errors.email ? "error_input" : ""}`}
            placeholder="Email"
            value={fields.email}
            onChange={(event) => updateField("email", event.target.value)}
            aria-invalid={showErrors && errors.email}
          />
        </div>

        <div className="col-lg-4">
          <input
            type="tel"
            className={`form-control ${showErrors && errors.phone ? "error_input" : ""}`}
            placeholder="Phone"
            value={fields.phone}
            onChange={(event) => updateField("phone", event.target.value)}
            aria-invalid={showErrors && errors.phone}
          />
        </div>

        <div className="col-lg-12">
          <textarea
            className="form-control"
            placeholder="Message"
            value={fields.message}
            onChange={(event) => updateField("message", event.target.value)}
          />
        </div>

        <div className="col-lg-12">
          <button type="submit" className="btn-main" disabled={status === "submitting"}>
            {status === "submitting" ? "Sending..." : "Send Appointment"}
          </button>
        </div>
      </div>

      {status === "error" ? (
        <div className="error mt-3" role="alert">
          Sorry, there was an error sending your appointment request.
        </div>
      ) : null}

      {status === "not-configured" ? (
        <div className="error mt-3" role="status">
          Booking endpoint is not configured yet. Set NEXT_PUBLIC_BOOKING_ENDPOINT to enable submissions.
        </div>
      ) : null}
    </form>
  );
}