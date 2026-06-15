import type { ReactNode } from 'react';

interface FormFieldProps {
  id: string;
  label: string;
  children: ReactNode;
  hint?: string;
  error?: string;
}

export function FormField({ id, label, children, hint, error }: FormFieldProps) {
  return (
    <div className="mb-4 flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-semibold text-text">
        {label}
      </label>
      {children}
      {hint && <p className="text-caption text-text-muted">{hint}</p>}
      {error && (
        <p className="text-caption text-error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

export const inputClass =
  'w-full min-h-11 rounded-[var(--radius-md)] border border-border-strong bg-bg px-4 py-3 text-text focus:border-secondary focus:outline-none focus:ring-2 focus:ring-primary-soft';

export const selectClass = `${inputClass} appearance-none`;
