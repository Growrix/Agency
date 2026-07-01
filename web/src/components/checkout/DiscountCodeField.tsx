"use client";

import { useState } from "react";
import { Button } from "@/components/primitives/Button";

type DiscountCodeFieldProps = {
  applied: string | null;
  onApply: (code: string) => void;
  onClear: () => void;
};

export function DiscountCodeField({ applied, onApply, onClear }: DiscountCodeFieldProps) {
  const [open, setOpen] = useState(Boolean(applied));
  const [value, setValue] = useState(applied ?? "");

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="text-xs font-medium text-primary hover:underline"
      >
        Have a discount code?
      </button>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <input
        type="text"
        value={value}
        onChange={(event) => setValue(event.target.value.toUpperCase())}
        placeholder="WELCOME10"
        className="signal-input h-9 flex-1 text-sm"
        aria-label="Discount code"
      />
      {applied ? (
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => {
            setValue("");
            onClear();
          }}
        >
          Clear
        </Button>
      ) : (
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => value.trim() && onApply(value.trim())}
          disabled={!value.trim()}
        >
          Apply
        </Button>
      )}
    </div>
  );
}
