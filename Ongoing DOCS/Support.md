
Studio local server:
- From repository root: `npm --prefix studio run dev`
- Or from studio directory: `cd studio` then `npx sanity dev --port 3333`

Homepage featured cards (CMS control):
- Shop featured cards use published `shopItem` entries sorted by `featuredRank` (lower number appears first).
- Portfolio featured cards use published `caseStudy` entries sorted by `featuredRank` (lower number appears first).
- To hide an item from public cards, set `published` to false in the relevant document.

Card preview behavior:
- Shop cards show `mainImage` first.
- If no `mainImage`, cards try `embeddedPreviewUrl`.
- If neither is available, cards fall back to the visual fallback surface.
- Portfolio cards show `heroImage` first, then try `embeddedPreviewUrl`.

Live preview links:
- Shop cards use `livePreviewUrl` (or `embeddedPreviewUrl`) for the Live Preview button.
- Portfolio slug pages use `livePreviewUrl` for the Visit live site action.

Placeholder content guard:
- Public catalog output now suppresses placeholder records such as `new-product`/`new-project` and demo example URLs.