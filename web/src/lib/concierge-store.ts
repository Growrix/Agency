"use client";

import { create } from "zustand";

type ConciergeState = {
  initialPrompt?: string;
  isOpen: boolean;
  close: () => void;
  open: (prompt?: string) => void;
  toggle: (prompt?: string) => void;
};

export const useConciergeStore = create<ConciergeState>((set) => ({
  initialPrompt: undefined,
  isOpen: false,
  close: () => set({ isOpen: false }),
  open: (prompt) => set({ initialPrompt: prompt, isOpen: true }),
  toggle: (prompt) =>
    set((state) => ({
      initialPrompt: prompt ?? state.initialPrompt,
      isOpen: !state.isOpen,
    })),
}));