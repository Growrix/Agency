'use client';

import { useMemo, useState } from 'react';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { electricalServices, solarServices } from '@/lib/site-data';

const allServices = [...solarServices, ...electricalServices];

export default function QuickQuoteForm() {
  const [form, setForm] = useState({
    service: allServices[0].slug,
    propertyType: 'Single house',
    name: '',
    phone: '',
    suburb: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const selectedService = useMemo(
    () => allServices.find((service) => service.slug === form.service),
    [form.service]
  );

  const canSubmit = form.name.trim() && form.phone.trim() && form.suburb.trim();

  function handleChange(key, value) {
    setForm((previous) => ({ ...previous, [key]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!canSubmit) {
      return;
    }

    setSubmitted(true);
  }

  function startNewQuote() {
    setSubmitted(false);
    setForm((previous) => ({ ...previous, name: '', phone: '', suburb: '' }));
  }

  if (submitted) {
    return (
      <div style={{ background: '#fff', borderRadius: 20, border: '1px solid rgba(10,10,10,0.08)', padding: 28 }}>
        <div className="inline-flex items-center gap-2 text-sm font-medium" style={{ color: '#FF5B1F' }}>
          <CheckCircle2 size={18} /> Request received
        </div>
        <h3 className="display" style={{ fontSize: 34, fontWeight: 600, marginTop: 10, marginBottom: 12 }}>
          Thanks, {form.name}.
        </h3>
        <p style={{ color: '#4A4A45', lineHeight: 1.65, fontSize: 15 }}>
          Your enquiry for {selectedService ? selectedService.name : 'your service'} at {form.suburb} has been captured in this frontend flow.
          Rayiss will follow up by phone as the next step.
        </p>
        <button
          type="button"
          onClick={startNewQuote}
          className="inline-flex items-center gap-2 rounded-full text-white text-sm font-medium mt-6"
          style={{ background: '#0A0A0A', padding: '12px 20px' }}
        >
          Submit another request <ArrowUpRight size={14} />
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ background: '#fff', borderRadius: 20, border: '1px solid rgba(10,10,10,0.08)', padding: 28 }}>
      <div className="eyebrow mb-2" style={{ color: '#FF5B1F' }}>
        Free quote request
      </div>
      <h3 className="display" style={{ fontSize: 32, fontWeight: 600, marginBottom: 14 }}>
        Tell us what you need.
      </h3>

      <div className="space-y-4">
        <label className="block">
          <span className="text-xs font-medium text-neutral-600">Service</span>
          <select
            value={form.service}
            onChange={(event) => handleChange('service', event.target.value)}
            className="w-full mt-1.5 rounded-xl border border-neutral-200 px-3 py-2.5 text-sm"
          >
            {allServices.map((service) => (
              <option key={service.slug} value={service.slug}>
                {service.name}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="text-xs font-medium text-neutral-600">Property type</span>
          <select
            value={form.propertyType}
            onChange={(event) => handleChange('propertyType', event.target.value)}
            className="w-full mt-1.5 rounded-xl border border-neutral-200 px-3 py-2.5 text-sm"
          >
            {['Single house', 'Townhouse / unit', 'Commercial building', 'Other or unsure'].map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="text-xs font-medium text-neutral-600">Name</span>
          <input
            type="text"
            value={form.name}
            onChange={(event) => handleChange('name', event.target.value)}
            className="w-full mt-1.5 rounded-xl border border-neutral-200 px-3 py-2.5 text-sm"
            placeholder="Your name"
          />
        </label>

        <label className="block">
          <span className="text-xs font-medium text-neutral-600">Phone</span>
          <input
            type="tel"
            value={form.phone}
            onChange={(event) => handleChange('phone', event.target.value)}
            className="w-full mt-1.5 rounded-xl border border-neutral-200 px-3 py-2.5 text-sm"
            placeholder="Best contact number"
          />
        </label>

        <label className="block">
          <span className="text-xs font-medium text-neutral-600">Suburb or address</span>
          <input
            type="text"
            value={form.suburb}
            onChange={(event) => handleChange('suburb', event.target.value)}
            className="w-full mt-1.5 rounded-xl border border-neutral-200 px-3 py-2.5 text-sm"
            placeholder="Property location"
          />
        </label>
      </div>

      <button
        type="submit"
        disabled={!canSubmit}
        className="inline-flex items-center gap-2 rounded-full text-white text-sm font-medium mt-6"
        style={{
          background: '#FF5B1F',
          padding: '12px 20px',
          opacity: canSubmit ? 1 : 0.5,
          cursor: canSubmit ? 'pointer' : 'not-allowed',
        }}
      >
        Submit quote request <ArrowUpRight size={14} />
      </button>
      <p className="text-xs text-neutral-500 mt-3">This frontend flow confirms intent capture and success-state behavior.</p>
    </form>
  );
}
