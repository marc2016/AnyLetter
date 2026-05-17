## Context

The letter editor renders a DIN 5008 Form B preview (`LetterPreview.tsx`) and exports PDFs via `@react-pdf/renderer` (`LetterPdfDocument.tsx`). Shared layout coordinates live in `src/pdf/dinLayout.ts`; date, info, footer, and page number in the preview use `layoutToPreviewPercent` / `layoutFontSizeToCqw` from that module. Address-window fields (sender, notes, recipient) still use inline percentages in the preview.

## Goals / Non-Goals

**Goals:**

- Position date and info block together in the right-hand info column: info below date, both left-aligned within their boxes. Exact horizontal offset is tuned in `dinLayout.ts` only (not fixed in the spec).
- Show localized `Datum: ` / `Date: ` before the formatted date in preview and PDF.
- Use `#000000` for all rendered letter text in preview and PDF (including placeholders shown in the interactive preview).
- Show `Seite x von y` / `Page x of y` right-aligned above the footer, always (including empty letters and single-page documents).
- Keep preview and PDF positions aligned via shared `DIN_LAYOUT` constants.
- Add i18n keys in the `preview` namespace.

**Non-Goals:**

- Multi-page content flow or dynamic page breaks in the preview.
- Stripping Quill inline color markup in stored draft HTML (optional CSS override in preview only if needed).
- Changing form field layout or draft JSON schema.

## Decisions

### 1. Date/info horizontal position

**Choice:** Shared `DIN_LAYOUT.date` and `DIN_LAYOUT.info` use the same `left` offset, left-aligned text (no `text-right` on the date line). Current implementation (as of final tuning):

| Field | `left` | `width` | `top` |
|-------|--------|---------|-------|
| date  | 70%    | 30.5%   | 10.1% |
| info  | 70%    | 20%     | 14.5% |

Exact percentages are **implementation details** in `dinLayout.ts`; the spec only requires the same horizontal offset for date and info, info below date, and left alignment. Position was iterated after implementation (57% → 62% → 70% per visual review).

**Alternative considered:** Right-anchor the block with `textAlign: right` — rejected; user required left-aligned text.

### 2. Uniform black typography

**Choice:** Set `PDF_COLORS.text` to `#000000` and remove per-style `color: PDF_COLORS.muted` overrides on notes, info, footer, and page number in PDF. Preview uses `#000000` on the page root and removes muted colors on individual fields.

**Rationale:** Matches “alle schwarz” decision; simplifies maintenance.

**Alternative considered:** Keep muted footer — rejected per user direction.

### 3. Localized date prefix

**Choice:** Add `preview.dateLabel` (`Datum: ` / `Date: `) and render `{dateLabel}{displayDate}` in preview and PDF. PDF receives `dateLabel` as a string prop from `exportLetterPdf` using the active i18n language.

**Rationale:** PDF render path has no React i18n context; pass resolved strings at export time like `displayDate`.

### 4. Page numbering

**Choice:** Add `DIN_LAYOUT.pageNumber` with `bottom` above footer (e.g. ~7% from bottom), `right` aligned with content margin (`left`/`width` matching footer zone or right edge at 88%). Preview renders static `t("pageOf", { page: 1, total: 1 })`. PDF uses `@react-pdf/renderer` fixed `Text` with `render={({ pageNumber, totalPages }) => ...}` so multi-page PDFs remain correct later.

**Rationale:** User requires always visible, including single page; PDF `render` prop is the standard pattern.

**i18n:** `preview.pageOf` — DE: `Seite {{page}} von {{total}}`, EN: `Page {{page}} of {{total}}`.

### 5. Preview coordinates from `dinLayout`

**Choice:** Export percentage helpers from `dinLayout.ts` (e.g. `layoutToPreviewStyle(box)`) and use them in `LetterPreview` for date, info, footer, page number, and other fields already defined in `DIN_LAYOUT`.

**Rationale:** Reduces preview/PDF drift called out in the proposal.

### 6. Placeholder text color

**Choice:** Placeholders and sample body in empty preview use `#000000` as well.

**Rationale:** User said all text black; placeholders are preview-only and not exported.

## Risks / Trade-offs

- **[Risk] Quill inline colors override black in preview** → Mitigation: add `.preview-rich-content { color: #000 }` and `color: inherit` on children; optional `!important` only if testing shows issues.
- **[Risk] Date label + long date wraps awkwardly in narrow info column** → Mitigation: info block uses a narrower width (20%) than date (30.5%); tune `left` / widths in `dinLayout.ts` if needed without spec change.
- **[Risk] Page number overlaps footer on long footer text** → Mitigation: fixed `bottom` offset; footer remains single block with `pre-line`.

## Migration Plan

No data migration. Ship as UI/PDF layout change; existing drafts render with new styling automatically.

## Open Questions

_None. Further horizontal tuning of date/info stays in `dinLayout.ts` unless requirements change._
