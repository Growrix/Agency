"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { preferenceKeys } from "@/lib/localization";

export type AuthSession = {
  fullName: string;
  email: string;
};

type AuthContextValue = {
  session: AuthSession | null;
  isAuthenticated: boolean;
  login: (email: string) => void;
  register: (fullName: string, email: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

function deriveDisplayName(email: string) {
  const localPart = email.split("@")[0] ?? "driver";
  return localPart
    .split(/[._-]/)
    .filter(Boolean)
    .map((chunk) => chunk.slice(0, 1).toUpperCase() + chunk.slice(1))
    .join(" ");
}

function writeSession(session: AuthSession | null) {
  if (typeof window === "undefined") return;

  if (!session) {
    localStorage.removeItem(preferenceKeys.authSession);
    document.cookie = `${preferenceKeys.authSession}=; path=/; max-age=0`;
    return;
  }

  const serialized = JSON.stringify(session);
  localStorage.setItem(preferenceKeys.authSession, serialized);
  document.cookie = `${preferenceKeys.authSession}=${encodeURIComponent(serialized)}; path=/; max-age=2592000; SameSite=Lax`;
}

function readSession(): AuthSession | null {
  if (typeof window === "undefined") return null;

  const fromStorage = localStorage.getItem(preferenceKeys.authSession);

  if (!fromStorage) {
    return null;
  }

  try {
    const parsed = JSON.parse(fromStorage) as AuthSession;
    if (!parsed.email || !parsed.fullName) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<AuthSession | null>(() => readSession());

  const login = (email: string) => {
    const nextSession = {
      email,
      fullName: deriveDisplayName(email),
    };

    setSession(nextSession);
    writeSession(nextSession);
  };

  const register = (fullName: string, email: string) => {
    const normalizedName = fullName.trim() || deriveDisplayName(email);
    const nextSession = { email, fullName: normalizedName };

    setSession(nextSession);
    writeSession(nextSession);
  };

  const logout = () => {
    setSession(null);
    writeSession(null);
  };

  const value = useMemo(
    () => ({
      session,
      isAuthenticated: Boolean(session),
      login,
      register,
      logout,
    }),
    [session],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}