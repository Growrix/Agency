"use client";

import { create } from "zustand";

type FreeDemoState = {
  isOpen: boolean;
  showForm: boolean;
  open: (options?: { showForm?: boolean }) => void;
  close: () => void;
  openForm: () => void;
};

export const FREE_DEMO_SEEN_KEY = "growrixos:freeDemoSeen";

export const useFreeDemoStore = create<FreeDemoState>((set) => ({
  isOpen: false,
  showForm: false,
  open: (options) => set({ isOpen: true, showForm: options?.showForm ?? false }),
  close: () => set({ isOpen: false, showForm: false }),
  openForm: () => set({ isOpen: true, showForm: true }),
}));
