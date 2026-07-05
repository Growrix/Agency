import "server-only";

const DEFAULT_MAX_VISIBLE_SECTIONS = 4;

type PreviewRedactionOptions = {
  watermarkLabel: string;
  maxVisibleSections?: number;
};

export function buildRedactedPreviewHtml(rawHtml: string, options: PreviewRedactionOptions) {
  const sanitizedLabel = escapeHtml(options.watermarkLabel);
  const maxVisibleSections = Math.max(1, options.maxVisibleSections ?? DEFAULT_MAX_VISIBLE_SECTIONS);

  let redacted = stripHtmlComments(rawHtml);
  redacted = stripScriptTags(redacted);
  redacted = stripNoscriptTags(redacted);
  redacted = stripTemplateTags(redacted);
  redacted = stripMetaRefreshTags(redacted);
  redacted = stripBaseTags(redacted);
  redacted = stripInlineEventHandlers(redacted);
  redacted = replaceEmbeddedFrames(redacted);
  redacted = disableForms(redacted);
  redacted = lockAnchorLinks(redacted);
  redacted = limitVisibleSections(redacted, maxVisibleSections);

  return injectPreviewOverlay(redacted, sanitizedLabel);
}

function stripHtmlComments(html: string) {
  return html.replace(/<!--([\s\S]*?)-->/g, "");
}

function stripScriptTags(html: string) {
  return html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "");
}

function stripNoscriptTags(html: string) {
  return html.replace(/<noscript\b[^<]*(?:(?!<\/noscript>)<[^<]*)*<\/noscript>/gi, "");
}

function stripTemplateTags(html: string) {
  return html.replace(/<template\b[^<]*(?:(?!<\/template>)<[^<]*)*<\/template>/gi, "");
}

function stripMetaRefreshTags(html: string) {
  return html.replace(/<meta\b[^>]*http-equiv\s*=\s*("refresh"|'refresh'|refresh)[^>]*>/gi, "");
}

function stripBaseTags(html: string) {
  return html.replace(/<base\b[^>]*>/gi, "");
}

function stripInlineEventHandlers(html: string) {
  return html.replace(/\s+on[a-z]+\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, "");
}

function disableForms(html: string) {
  return html.replace(/<form\b([^>]*)>/gi, (_match, attrs: string) => {
    const cleanedAttributes = attrs
      .replace(/\s+action\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, "")
      .replace(/\s+method\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, "")
      .replace(/\s+target\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, "");

    return `<form${cleanedAttributes} data-preview-locked="true">`;
  });
}

function replaceEmbeddedFrames(html: string) {
  return html.replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, () => {
    return '<div class="grx-preview-embed-locked" role="note" aria-label="Embedded preview disabled">Embedded preview content is disabled in public mode.</div>';
  });
}

function lockAnchorLinks(html: string) {
  return html.replace(/<a\b([^>]*)>/gi, (_match, attrs: string) => {
    const hrefMatch = /\s+href\s*=\s*("([^"]*)"|'([^']*)'|([^\s>]+))/i.exec(attrs);
    const hrefValue = (hrefMatch?.[2] ?? hrefMatch?.[3] ?? hrefMatch?.[4] ?? "").trim();
    const normalizedHref = hrefValue.startsWith("#") ? hrefValue : "#";
    const escapedHref = escapeHtmlAttribute(normalizedHref);
    const cleanedAttributes = attrs
      .replace(/\s+href\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, "")
      .replace(/\s+target\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, "")
      .replace(/\s+download(?:\s*=\s*("[^"]*"|'[^']*'|[^\s>]+))?/gi, "")
      .replace(/\s+rel\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, "");

    return `<a${cleanedAttributes} href="${escapedHref}" rel="nofollow noopener noreferrer" data-preview-link-locked="true">`;
  });
}

function limitVisibleSections(html: string, maxVisibleSections: number) {
  const bodyOpenTagStart = html.search(/<body\b/i);
  if (bodyOpenTagStart === -1) {
    return html;
  }

  const bodyOpenTagEnd = html.indexOf(">", bodyOpenTagStart);
  const bodyCloseTagStart = html.search(/<\/body>/i);
  if (bodyOpenTagEnd === -1 || bodyCloseTagStart === -1 || bodyCloseTagStart <= bodyOpenTagEnd) {
    return html;
  }

  const bodyContent = html.slice(bodyOpenTagEnd + 1, bodyCloseTagStart);
  const sectionMatches = [...bodyContent.matchAll(/<\/section>/gi)];
  if (sectionMatches.length <= maxVisibleSections) {
    return html;
  }

  const cutoffMatch = sectionMatches[maxVisibleSections - 1];
  if (!cutoffMatch || typeof cutoffMatch.index !== "number") {
    return html;
  }

  const cutoffIndex = cutoffMatch.index + cutoffMatch[0].length;
  const visibleBody = bodyContent.slice(0, cutoffIndex);
  const lockSection = `
<section class="grx-preview-lock-section" data-preview-truncated="true" aria-label="Preview truncated">
  <div class="grx-preview-lock-card">
    <p class="grx-preview-lock-eyebrow">Preview Limited</p>
    <h2 class="grx-preview-lock-title">Full template source is not displayed in public preview.</h2>
    <p class="grx-preview-lock-copy">Purchase and license validation are required to access the complete deliverable package.</p>
  </div>
</section>`;

  return `${html.slice(0, bodyOpenTagEnd + 1)}${visibleBody}${lockSection}${html.slice(bodyCloseTagStart)}`;
}

function injectPreviewOverlay(html: string, watermarkLabel: string) {
  const previewOverlay = `
<style id="grx-preview-overlay-style">
  #grx-preview-overlay {
    position: fixed;
    top: 14px;
    left: 14px;
    z-index: 2147483647;
    padding: 8px 12px;
    border-radius: 999px;
    font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif;
    font-size: 11px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #e6fffd;
    background: rgba(0, 8, 18, 0.86);
    border: 1px solid rgba(0, 217, 255, 0.35);
    pointer-events: none;
    backdrop-filter: blur(4px);
  }

  [data-preview-locked="true"],
  [data-preview-locked="true"] * {
    pointer-events: none !important;
  }

  a[data-preview-link-locked="true"] {
    pointer-events: none !important;
    cursor: not-allowed !important;
  }

  .grx-preview-embed-locked {
    margin: 1rem auto;
    max-width: 920px;
    padding: 0.875rem 1rem;
    border: 1px dashed rgba(121, 150, 255, 0.45);
    border-radius: 12px;
    color: #c3d4ff;
    font-size: 0.9rem;
    line-height: 1.45;
    background: rgba(6, 13, 29, 0.9);
  }

  .grx-preview-lock-section {
    margin: 2rem auto;
    padding: 0 1rem 3rem;
    max-width: 920px;
  }

  .grx-preview-lock-card {
    border: 1px solid rgba(8, 134, 255, 0.24);
    background: linear-gradient(140deg, rgba(6, 16, 40, 0.95), rgba(3, 11, 24, 0.95));
    border-radius: 16px;
    padding: 1.25rem;
    color: #d7e6ff;
    box-shadow: 0 24px 60px rgba(0, 0, 0, 0.35);
  }

  .grx-preview-lock-eyebrow {
    margin: 0 0 0.5rem;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    color: #7ee8ff;
    font-size: 0.75rem;
    font-weight: 700;
  }

  .grx-preview-lock-title {
    margin: 0;
    font-size: 1.35rem;
    line-height: 1.3;
  }

  .grx-preview-lock-copy {
    margin: 0.75rem 0 0;
    color: #b7c6e4;
    line-height: 1.5;
  }
</style>
<div id="grx-preview-overlay" aria-hidden="true">${watermarkLabel}</div>`;

  if (/<\/body>/i.test(html)) {
    return html.replace(/<\/body>/i, `${previewOverlay}</body>`);
  }

  return `${html}${previewOverlay}`;
}

function escapeHtml(input: string) {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function escapeHtmlAttribute(input: string) {
  return escapeHtml(input);
}