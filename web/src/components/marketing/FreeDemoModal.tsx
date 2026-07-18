"use client";

import { Dialog } from "@headlessui/react";
import { MarketingViewportGate } from "@/components/marketing/MarketingViewportGate";
import { FreeDemoCounter } from "@/components/marketing/FreeDemoCounter";
import { IntakeForm } from "@/components/intake/IntakeForm";
import { Button } from "@/components/primitives/Button";
import { cn } from "@/lib/utils";

type Props = {
  open: boolean;
  showForm: boolean;
  onClose: () => void;
  onOpenForm: () => void;
};

function PromoPanel({ onOpenForm, onClose }: { onOpenForm: () => void; onClose: () => void }) {
  return (
    <div className="space-y-5">
      <div>
        <p className="text-xs uppercase tracking-[0.18em] text-primary">Growrix OS Launch Special</p>
        <Dialog.Title className="mt-2 font-display text-2xl tracking-tight text-text sm:text-3xl">
          First 20 founders get a FREE AI-powered website strategy demo
        </Dialog.Title>
        <p className="mt-2 text-sm text-text-muted">
          Share your business goals, references, and files — we turn it into an accurate website plan worth $499.
        </p>
      </div>
      <FreeDemoCounter />
      <div className="flex flex-col gap-2 sm:flex-row">
        <Button type="button" fullWidth onClick={onOpenForm}>
          Claim my free demo
        </Button>
        <Button type="button" variant="outline" fullWidth onClick={onClose}>
          Maybe later
        </Button>
      </div>
    </div>
  );
}

export function FreeDemoModal({ open, showForm, onClose, onOpenForm }: Props) {
  const desktopPanel = (
    <Dialog.Panel
      className={cn(
        "w-full max-w-2xl rounded-md border border-border bg-surface p-6 shadow-(--shadow-3)",
        showForm && "max-w-3xl",
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <p className="text-xs uppercase tracking-[0.18em] text-text-muted">
          {showForm ? "Project intake" : "Limited launch offer"}
        </p>
        <button
          type="button"
          className="rounded-sm px-2 py-1 text-sm text-text-muted hover:text-text"
          onClick={onClose}
          aria-label="Close free demo modal"
        >
          ✕
        </button>
      </div>
      <div className="mt-4">
        {showForm ? <IntakeForm onSuccess={onClose} isFreeDemo /> : <PromoPanel onOpenForm={onOpenForm} onClose={onClose} />}
      </div>
    </Dialog.Panel>
  );

  const mobilePanel = (
    <Dialog.Panel className="flex max-h-[90dvh] w-full flex-col overflow-hidden rounded-t-2xl border border-border bg-surface shadow-(--shadow-3)">
      <div className="flex items-center justify-between border-b border-border/60 px-4 py-3">
        <Dialog.Title className="font-display text-lg">
          {showForm ? "Tell us about your project" : "Free demo launch"}
        </Dialog.Title>
        <button type="button" className="text-sm text-text-muted" onClick={onClose} aria-label="Close">
          ✕
        </button>
      </div>
      <div className="overflow-y-auto px-4 py-4">
        {showForm ? <IntakeForm onSuccess={onClose} isFreeDemo /> : <PromoPanel onOpenForm={onOpenForm} onClose={onClose} />}
      </div>
    </Dialog.Panel>
  );

  return (
    <Dialog open={open} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-overlay/60" aria-hidden />
      <MarketingViewportGate
        mobile={
          <div className="fixed inset-x-0 bottom-0 flex items-end justify-center">
            {mobilePanel}
          </div>
        }
        desktop={
          <div className="fixed inset-0 flex items-center justify-center p-4">{desktopPanel}</div>
        }
      />
    </Dialog>
  );
}
