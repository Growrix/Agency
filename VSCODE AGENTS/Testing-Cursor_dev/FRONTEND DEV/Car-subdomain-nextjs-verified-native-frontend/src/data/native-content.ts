import nativePagesData from "./native-pages.json";
import nativeRouteListData from "./native-route-list.json";
import nativeShellData from "./native-shell.json";

export type SliderVariant = "one" | "two" | "three" | null;

export type NativeTextNode = {
  type: "text";
  value: string;
};

export type NativePlaceholderNode = {
  type: "placeholder";
  name: "contact" | "booking";
};

export type NativeElementNode = {
  type: "element";
  tag: string;
  attrs: Record<string, string>;
  children: NativeNode[];
};

export type NativeNode = NativeTextNode | NativePlaceholderNode | NativeElementNode;

export type NativeRouteEntry = {
  slug: string;
  fileName: string;
  htmlPath: string;
  canonicalPath: string;
};

export type NativePageData = {
  title: string;
  description: string;
  bodyClass: string;
  scripts: string[];
  sliderVariant: SliderVariant;
  route: NativeRouteEntry;
  content: NativeNode[];
};

export type NativeShellData = {
  header: NativeNode[];
  footer: NativeNode[];
  extraPanel: NativeNode[];
};

export const nativeShell = nativeShellData as unknown as NativeShellData;
export const nativePagesBySlug = nativePagesData as unknown as Record<string, NativePageData>;
export const nativeRouteList = nativeRouteListData as unknown as NativeRouteEntry[];

export const getNativePageBySlug = (slug: string) => {
  return nativePagesBySlug[slug] ?? null;
};
