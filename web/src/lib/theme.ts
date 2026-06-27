export const THEME_STORAGE_KEY = "growrix-os-theme";
export const LEGACY_THEME_STORAGE_KEYS = ["growrix-theme", "signal-theme"] as const;
export const DEFAULT_THEME = "dark" as const;

export type ThemeMode = "light" | "dark";

/** Blocking inline script — runs before paint to avoid light flash. */
export const THEME_INIT_SCRIPT = `(function(){try{var k="${THEME_STORAGE_KEY}",s=localStorage.getItem(k);if(s!=="light"&&s!=="dark"){for(var i=0,l=${JSON.stringify([...LEGACY_THEME_STORAGE_KEYS])};i<l.length;i++){var v=localStorage.getItem(l[i]);if(v==="light"||v==="dark"){s=v;break;}}}document.documentElement.setAttribute("data-theme",s==="light"?"light":"${DEFAULT_THEME}");}catch(e){document.documentElement.setAttribute("data-theme","${DEFAULT_THEME}");}})();`;

export function readStoredTheme(): ThemeMode {
  if (typeof window === "undefined") return DEFAULT_THEME;
  const stored =
    window.localStorage.getItem(THEME_STORAGE_KEY) ??
    LEGACY_THEME_STORAGE_KEYS.map((key) => window.localStorage.getItem(key)).find((value) => value != null);
  return stored === "light" ? "light" : DEFAULT_THEME;
}

export function applyTheme(mode: ThemeMode): void {
  if (typeof document === "undefined") return;
  document.documentElement.setAttribute("data-theme", mode);
}

export function persistTheme(mode: ThemeMode): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, mode);
    LEGACY_THEME_STORAGE_KEYS.forEach((key) => window.localStorage.removeItem(key));
  } catch {
    /* ignore storage errors (Safari private mode, etc.) */
  }
}
