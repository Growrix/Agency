"use client";

export type BillingAddressValues = {
  country: string;
  address_line1: string;
  address_line2: string;
  city: string;
  region: string;
  postal_code: string;
};

export const EMPTY_BILLING_ADDRESS: BillingAddressValues = {
  country: "",
  address_line1: "",
  address_line2: "",
  city: "",
  region: "",
  postal_code: "",
};

const COUNTRIES: Array<{ value: string; label: string }> = [
  { value: "US", label: "United States" },
  { value: "CA", label: "Canada" },
  { value: "GB", label: "United Kingdom" },
  { value: "AU", label: "Australia" },
  { value: "IN", label: "India" },
  { value: "BD", label: "Bangladesh" },
  { value: "SG", label: "Singapore" },
  { value: "AE", label: "United Arab Emirates" },
  { value: "DE", label: "Germany" },
  { value: "FR", label: "France" },
  { value: "OTHER", label: "Other" },
];

type BillingAddressFieldsetProps = {
  values: BillingAddressValues;
  onChange: (values: BillingAddressValues) => void;
};

export function BillingAddressFieldset({ values, onChange }: BillingAddressFieldsetProps) {
  function update<K extends keyof BillingAddressValues>(key: K, value: BillingAddressValues[K]) {
    onChange({ ...values, [key]: value });
  }

  return (
    <fieldset className="space-y-3">
      <legend className="font-mono text-[11px] uppercase tracking-wider text-text-muted">
        Billing address
      </legend>

      <div className="grid gap-3 sm:grid-cols-2">
        <label className="block sm:col-span-2">
          <span className="font-mono text-[10px] uppercase tracking-wider text-text-muted">
            Country *
          </span>
          <select
            required
            className="signal-input mt-1"
            value={values.country}
            onChange={(event) => update("country", event.target.value)}
          >
            <option value="">Select country…</option>
            {COUNTRIES.map((country) => (
              <option key={country.value} value={country.value}>
                {country.label}
              </option>
            ))}
          </select>
        </label>

        <label className="block sm:col-span-2">
          <span className="font-mono text-[10px] uppercase tracking-wider text-text-muted">
            Address *
          </span>
          <input
            type="text"
            required
            className="signal-input mt-1"
            value={values.address_line1}
            onChange={(event) => update("address_line1", event.target.value)}
            placeholder="123 Main Street"
            autoComplete="address-line1"
          />
        </label>

        <label className="block sm:col-span-2">
          <span className="font-mono text-[10px] uppercase tracking-wider text-text-muted">
            Apartment, suite, etc.
          </span>
          <input
            type="text"
            className="signal-input mt-1"
            value={values.address_line2}
            onChange={(event) => update("address_line2", event.target.value)}
            placeholder="Optional"
            autoComplete="address-line2"
          />
        </label>

        <label className="block">
          <span className="font-mono text-[10px] uppercase tracking-wider text-text-muted">
            City *
          </span>
          <input
            type="text"
            required
            className="signal-input mt-1"
            value={values.city}
            onChange={(event) => update("city", event.target.value)}
            autoComplete="address-level2"
          />
        </label>

        <label className="block">
          <span className="font-mono text-[10px] uppercase tracking-wider text-text-muted">
            State / Region *
          </span>
          <input
            type="text"
            required
            className="signal-input mt-1"
            value={values.region}
            onChange={(event) => update("region", event.target.value)}
            autoComplete="address-level1"
          />
        </label>

        <label className="block sm:col-span-2">
          <span className="font-mono text-[10px] uppercase tracking-wider text-text-muted">
            ZIP / Postal code *
          </span>
          <input
            type="text"
            required
            className="signal-input mt-1"
            value={values.postal_code}
            onChange={(event) => update("postal_code", event.target.value)}
            autoComplete="postal-code"
            inputMode="text"
          />
        </label>
      </div>
    </fieldset>
  );
}
