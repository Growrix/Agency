"use client";

import { useEffect } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { AnimatePresence, motion } from "@/components/motion/Motion";
import { ConciergeExperience } from "@/components/ai/ConciergeChat";
import { useConciergeStore } from "@/lib/concierge-store";

export function ConciergeModal() {
  const close = useConciergeStore((state) => state.close);
  const initialPrompt = useConciergeStore((state) => state.initialPrompt);
  const isOpen = useConciergeStore((state) => state.isOpen);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [close, isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="concierge-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[80]"
        >
          <button
            type="button"
            aria-label="Close concierge chat"
            className="absolute inset-0 bg-black/55 backdrop-blur-sm"
            onClick={close}
          />

          <div className="absolute inset-0 flex items-end justify-center p-0 sm:items-center sm:p-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 16 }}
              transition={{ type: "spring", stiffness: 280, damping: 28, mass: 0.8 }}
              className="relative flex h-[100dvh] w-full overflow-hidden rounded-none bg-surface shadow-(--shadow-3) sm:h-[min(88vh,860px)] sm:w-[min(1120px,calc(100%-2rem))] sm:rounded-[24px] sm:border sm:border-border"
            >
              <button
                type="button"
                aria-label="Close concierge chat"
                onClick={close}
                className="absolute right-4 top-4 z-10 hidden size-10 items-center justify-center rounded-full border border-border bg-surface/85 text-text shadow-(--shadow-1) backdrop-blur hover:bg-inset sm:inline-flex"
              >
                <XMarkIcon className="size-5" />
              </button>
              <ConciergeExperience mode="modal" initialPrompt={initialPrompt} onClose={close} />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}