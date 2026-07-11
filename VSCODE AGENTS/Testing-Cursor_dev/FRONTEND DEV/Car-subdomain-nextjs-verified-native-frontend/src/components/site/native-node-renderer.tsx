import { createElement, Fragment, type CSSProperties, type ReactNode } from "react";
import { BookingForm } from "@/components/forms/booking-form";
import { ContactForm } from "@/components/forms/contact-form";
import type { NativeNode } from "@/data/native-content";

type NativeNodeRendererProps = {
  nodes: NativeNode[];
};

const NAMED_ENTITIES: Record<string, string> = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  nbsp: "\u00A0",
  copy: "\u00A9",
  reg: "\u00AE",
  trade: "\u2122",
  mdash: "\u2014",
  ndash: "\u2013",
  hellip: "\u2026",
  rsquo: "\u2019",
  lsquo: "\u2018",
  rdquo: "\u201D",
  ldquo: "\u201C",
};

const decodeHtmlEntities = (value: string) => {
  return value.replace(/&(#x?[0-9a-fA-F]+|[a-zA-Z][a-zA-Z0-9]+);/g, (match, entity: string) => {
    if (entity.startsWith("#x") || entity.startsWith("#X")) {
      const parsed = Number.parseInt(entity.slice(2), 16);
      return Number.isNaN(parsed) ? match : String.fromCodePoint(parsed);
    }

    if (entity.startsWith("#")) {
      const parsed = Number.parseInt(entity.slice(1), 10);
      return Number.isNaN(parsed) ? match : String.fromCodePoint(parsed);
    }

    const decoded = NAMED_ENTITIES[entity.toLowerCase()];
    return decoded ?? match;
  });
};

const ATTRIBUTE_MAP: Record<string, string> = {
  class: "className",
  for: "htmlFor",
  tabindex: "tabIndex",
  readonly: "readOnly",
  autofocus: "autoFocus",
  autocomplete: "autoComplete",
  srcset: "srcSet",
  crossorigin: "crossOrigin",
  referrerpolicy: "referrerPolicy",
  allowfullscreen: "allowFullScreen",
  frameborder: "frameBorder",
  colspan: "colSpan",
  rowspan: "rowSpan",
  maxlength: "maxLength",
  minlength: "minLength",
  playsinline: "playsInline",
  novalidate: "noValidate",
  contenteditable: "contentEditable",
  spellcheck: "spellCheck",
  acceptcharset: "acceptCharset",
  "accept-charset": "acceptCharset",
  "http-equiv": "httpEquiv",
  viewbox: "viewBox",
  "fill-rule": "fillRule",
  "clip-rule": "clipRule",
  "stroke-width": "strokeWidth",
  "stroke-linecap": "strokeLinecap",
  "stroke-linejoin": "strokeLinejoin",
  "stroke-miterlimit": "strokeMiterlimit",
  "xlink:href": "xlinkHref",
  "xmlns:xlink": "xmlnsXlink",
};

const BOOLEAN_ATTRIBUTES = new Set([
  "disabled",
  "checked",
  "selected",
  "multiple",
  "required",
  "default",
  "muted",
  "loop",
  "controls",
  "autoplay",
  "playsInline",
  "open",
  "noValidate",
  "readOnly",
]);

const toCamelCase = (value: string) => {
  return value.replace(/[-:]([a-z])/g, (_, next: string) => next.toUpperCase());
};

const parseStyle = (styleValue: string) => {
  const styleObject: CSSProperties & Record<string, string> = {};

  styleValue
    .split(";")
    .map((entry) => entry.trim())
    .filter(Boolean)
    .forEach((entry) => {
      const separator = entry.indexOf(":");
      if (separator < 1) {
        return;
      }

      const rawProperty = entry.slice(0, separator).trim();
      const rawValue = entry.slice(separator + 1).trim();
      if (!rawProperty || !rawValue) {
        return;
      }

      const property = rawProperty.startsWith("--")
        ? rawProperty
        : toCamelCase(rawProperty);
      styleObject[property] = rawValue.replace(/\s*!important\s*$/i, "");
    });

  return styleObject;
};

const normalizeAttributeName = (name: string) => {
  const lowerName = name.toLowerCase();
  if (ATTRIBUTE_MAP[lowerName]) {
    return ATTRIBUTE_MAP[lowerName];
  }

  if (name.startsWith("data-") || name.startsWith("aria-")) {
    return name;
  }

  if (name.includes("-") || name.includes(":")) {
    return toCamelCase(name);
  }

  return name;
};

const normalizeAttributeValue = (name: string, value: string) => {
  if (name === "style") {
    return parseStyle(value);
  }

  if (BOOLEAN_ATTRIBUTES.has(name)) {
    if (value === "" || value.toLowerCase() === name.toLowerCase() || value.toLowerCase() === "true") {
      return true;
    }

    if (value.toLowerCase() === "false") {
      return false;
    }
  }

  return value;
};

const buildProps = (tag: string, attrs: Record<string, string>, key: string | number) => {
  const props: Record<string, unknown> = { key };

  Object.entries(attrs).forEach(([rawName, rawValue]) => {
    if (rawName.toLowerCase().startsWith("on")) {
      return;
    }

    const normalizedName = normalizeAttributeName(rawName);
    const normalizedValue = normalizeAttributeValue(normalizedName, rawValue);

    // Keep legacy static fields uncontrolled to avoid React console warnings.
    if (normalizedName === "value" && (tag === "input" || tag === "textarea" || tag === "select")) {
      props.defaultValue = normalizedValue;
      return;
    }

    if (normalizedName === "checked" && tag === "input") {
      props.defaultChecked = normalizedValue;
      return;
    }

    props[normalizedName] = normalizedValue;
  });

  const backgroundImage = attrs["data-bgimage"];
  const backgroundColor = attrs["data-bgcolor"];

  if (backgroundImage || backgroundColor) {
    const baseStyle = ((props.style as (CSSProperties & Record<string, string>) | undefined) ?? {});
    const mergedStyle: CSSProperties & Record<string, string> = { ...baseStyle };

    if (backgroundImage && !mergedStyle.background && !mergedStyle.backgroundImage) {
      // Preserve legacy visual intent when runtime enhancers are unavailable.
      mergedStyle.background = backgroundImage;
      mergedStyle.backgroundSize = mergedStyle.backgroundSize ?? "cover";
      mergedStyle.backgroundRepeat = mergedStyle.backgroundRepeat ?? "no-repeat";
    }

    if (backgroundColor && !mergedStyle.backgroundColor) {
      mergedStyle.backgroundColor = backgroundColor;
    }

    props.style = mergedStyle;
  }

  return props;
};

const renderNativeNode = (node: NativeNode, key: string): ReactNode => {
  if (node.type === "text") {
    return decodeHtmlEntities(node.value);
  }

  if (node.type === "placeholder") {
    if (node.name === "booking") {
      return <BookingForm key={key} />;
    }

    return <ContactForm key={key} />;
  }

  const children = node.children.map((child, index) => renderNativeNode(child, `${key}-${index}`));
  const props = buildProps(node.tag, node.attrs, key);

  return createElement(node.tag, props, children.length > 0 ? children : undefined);
};

export function NativeNodeRenderer({ nodes }: NativeNodeRendererProps) {
  return <>{nodes.map((node, index) => <Fragment key={index}>{renderNativeNode(node, `${index}`)}</Fragment>)}</>;
}
