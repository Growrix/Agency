"use client";

import { create } from "zustand";

type FreeDemoState = {
  isOpen: boolean;
  showForm: boolean;
  open: (options?: { showForm?: boolean }) => void;
  close: () => void;
  openForm: () => void;
  openOffer: () => void;
};

/** Bumped when offer UX changes so prior dismissals do not permanently hide the modal. */
export const FREE_DEMO_SEEN_KEY = "growrixos:freeDemoSeen:v2";

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

export const useFreeDemoStore = create<FreeDemoState>((set) => ({
  isOpen: false,
  showForm: false,
  open: (options) => set({ isOpen: true, showForm: options?.showForm ?? false }),
  close: () => set({ isOpen: false, showForm: false }),
  openForm: () => set({ isOpen: true, showForm: true }),
  openOffer: () => set({ isOpen: true, showForm: false }),
}));
