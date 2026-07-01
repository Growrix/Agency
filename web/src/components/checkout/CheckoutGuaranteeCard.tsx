import { ShieldCheckIcon } from "@heroicons/react/24/outline";

export function CheckoutGuaranteeCard() {
  return (
    <div className="flex items-start gap-3 rounded-md border border-success/25 bg-success/8 p-4">
      <span
        aria-hidden
        className="inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-success/15 text-success"
      >
        <ShieldCheckIcon className="size-5" />
      </span>
      <div className="min-w-0">
        <p className="text-sm font-semibold text-success">30-Day Money-Back Guarantee</p>
        <p className="mt-1 text-xs leading-5 text-text-muted">
          Not satisfied? Get a full refund within 30 days of purchase.
        </p>
      </div>
    </div>
  );
}
