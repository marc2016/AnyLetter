## Why

The DIN A4 preview and exported PDF currently use muted gray tones for several letter areas, omit a localized date label and page numbering, and position the date/info block farther right than desired for typical business letters. Users expect a closer match to printed correspondence: black body text, a clear “Datum:” line, aligned date and info on the left of the right column, and “Seite x von y” always visible above the footer.

## What Changes

- Shift the **date** and **info block** horizontally slightly left (shared `left` offset), keeping the info block **below** the date with **left-aligned** text in both preview and PDF.
- Prefix the displayed date with a localized label (`Datum: ` / `Date: `) in preview and PDF.
- Render **all letter preview and PDF text** in standard black (`#000000`), including sender, notes, recipient, date, info, subject, content, footer, and page number.
- Add **page numbering** (`Seite x von y` / `Page x of y`) right-aligned above the footer in preview and PDF; always shown (including single-page letters and empty drafts).
- Add i18n keys for the date label and page-number format.
- Derive preview positioning from shared `dinLayout` coordinates where practical to avoid preview/PDF drift.

## Capabilities

### New Capabilities

_None._

### Modified Capabilities

- `letter-editor-view`: Updated DIN layout positions for date/info; black typography; localized date prefix; always-visible page numbers in preview and PDF.
- `app-localization`: New strings and scenarios for date label and page numbering in letter preview/PDF.

## Impact

- `src/pdf/dinLayout.ts` — date/info/pageNumber positions, `PDF_COLORS.text` → black
- `src/components/views/LetterEditor/LetterPreview.tsx` — layout, colors, date prefix, page line
- `src/pdf/LetterPdfDocument.tsx` — layout, colors, date prefix, fixed page number render
- `src/utils/exportLetterPdf.tsx` — pass localized labels to PDF document
- `src/locales/de/preview.json`, `src/locales/en/preview.json` — new translation keys
- `src/pdf/exportPdf.test.tsx` — adjust expectations if needed
- `openspec/specs/letter-editor-view/spec.md`, `openspec/specs/app-localization/spec.md` — updated on archive
