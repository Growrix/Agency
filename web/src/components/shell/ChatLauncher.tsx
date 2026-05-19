"use client";

import { ChatBubbleLeftRightIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { AnimatePresence, motion } from "@/components/motion/Motion";
import { cn } from "@/lib/utils";
import { useConciergeStore } from "@/lib/concierge-store";

export function ChatLauncher() {
  const isOpen = useConciergeStore((state) => state.isOpen);
  const toggle = useConciergeStore((state) => state.toggle);

  const buttonClass = cn(
    "size-14 rounded-full bg-primary text-surface shadow-[var(--shadow-3)] flex items-center justify-center hover:bg-primary-hover transition-colors"
  );
  const icon = isOpen ? <XMarkIcon className="size-6" /> : <ChatBubbleLeftRightIcon className="size-6" />;

  return (
    <div className="hidden lg:block fixed bottom-6 right-6 z-50">
      <motion.button
        onClick={() => toggle()}
        aria-label={isOpen ? "Close concierge chat" : "Open concierge chat"}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.92 }}
        transition={{ type: "spring", stiffness: 500, damping: 22 }}
        className={cn(buttonClass, "will-change-transform")}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={isOpen ? "close" : "open"}
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="inline-flex"
          >
            {icon}
          </motion.span>
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
