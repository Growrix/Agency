"use client";

import { create } from "zustand";

type FreeDemoState = {
  isOpen: boolean;
  showForm: boolean;
  /** Timestamp bumped after a successful free-demo claim so the counter refetches immediately. */
  lastClaimedAt: number;
  open: (options?: { showForm?: boolean }) => void;
  close: () => void;
  openForm: () => void;
  openOffer: () => void;
  bumpClaimed: () => void;
};

/** Bumped when offer UX changes so prior dismissals do not permanently hide the modal. */
export const FREE_DEMO_SEEN_KEY = "growrixos:freeDemoSeen:v2";

/** Pending intake draft across Clerk sign-in/up full-page redirects. */
export const INTAKE_PENDING_KEY = "growrixos:intake-pending:v1";

export type PendingIntakeDraft = {
  values: Record<string, unknown>;
  pending: true;
  hadFiles: boolean;
  isFreeDemo: boolean;
  savedAt: number;
};

export function markFreeDemoSeen() {
  if (typeof window === "undefined") {
    return;
  }
  window.localStorage.setItem(FREE_DEMO_SEEN_KEY, "1");
}

export function hasSeenFreeDemo() {
  if (typeof window === "undefined") {
    return false;
  }
  return window.localStorage.getItem(FREE_DEMO_SEEN_KEY) === "1";
}

export function savePendingIntake(draft: {
  values: Record<string, unknown>;
  hadFiles: boolean;
  isFreeDemo: boolean;
}) {
  if (typeof window === "undefined") {
    return;
  }
  const payload: PendingIntakeDraft = {
    ...draft,
    pending: true,
    savedAt: Date.now(),
  };
  window.sessionStorage.setItem(INTAKE_PENDING_KEY, JSON.stringify(payload));
}

export function readPendingIntake(): PendingIntakeDraft | null {
  if (typeof window === "undefined") {
    return null;
  }
  try {
    const raw = window.sessionStorage.getItem(INTAKE_PENDING_KEY);
    if (!raw) {
      return null;
    }
    const parsed = JSON.parse(raw) as PendingIntakeDraft;
    if (!parsed?.pending || !parsed.values || typeof parsed.values !== "object") {
      return null;
    }
    // Discard drafts older than 2 hours.
    if (typeof parsed.savedAt === "number" && Date.now() - parsed.savedAt > 2 * 60 * 60 * 1000) {
      clearPendingIntake();
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

export function clearPendingIntake() {
  if (typeof window === "undefined") {
    return;
  }
  window.sessionStorage.removeItem(INTAKE_PENDING_KEY);
}

export function hasPendingIntake() {
  return Boolean(readPendingIntake());
}

export const useFreeDemoStore = create<FreeDemoState>((set) => ({
  isOpen: false,
  showForm: false,
  lastClaimedAt: 0,
  open: (options) => set({ isOpen: true, showForm: options?.showForm ?? false }),
  close: () => set({ isOpen: false, showForm: false }),
  openForm: () => set({ isOpen: true, showForm: true }),
  openOffer: () => set({ isOpen: true, showForm: false }),
  bumpClaimed: () => set({ lastClaimedAt: Date.now() }),
}));
