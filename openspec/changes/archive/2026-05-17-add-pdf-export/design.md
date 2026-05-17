## Context

AnyLetter is a Tauri 2 + React + PrimeReact desktop app. The letter editor shows a live DIN 5008 Form B preview (`LetterPreview`) at fixed A4 dimensions (210mm × 297mm) with fold/punch marks for small letterhead (kleiner Briefkopf: 87mm, 148.5mm, 192mm), percentage-based layout, container-query font sizes (`cqw`), and rich HTML body content from PrimeReact Editor. PDF export was explicitly out of scope for the original DIN preview change; users now need to save the letter as a shareable/printable PDF.

The app uses `@tauri-apps/plugin-fs` for draft storage and `@tauri-apps/plugin-dialog` for native save.

## Goals / Non-Goals

**Goals:**

- Export letter data to PDF via `@react-pdf/renderer` using shared DIN layout coordinates (`dinLayout.ts`) including small-letterhead fold marks (87mm, 148.5mm, 192mm).
- Floating export button fixed to the bottom-right of the preview pane (does not scroll with the page).
- Export renders only real field data; empty fields stay blank (no placeholders or sample content).
- No focus-highlight styling in the exported PDF (PDF is built from data, not the interactive preview DOM).
- Native Tauri save dialog first; generate PDF only after the user confirms a path. Suggested filename `{subject} {today's date}.pdf` (locale-aware date, sanitized; subject fallback `Brief` when empty).
- Localized button label and error feedback (de/en).

**Non-Goals:**

- Pixel-perfect WYSIWYG match between HTML preview (`cqw` fonts) and PDF (separate layout engine).
- Multi-page pagination or overflow handling beyond current single-page preview behavior.
- Browser-only download fallback (desktop Tauri target only for this change).
- Print dialog / `@media print` workflow.
- Exporting from views other than the letter editor preview.

## Decisions

### PDF generation: @react-pdf/renderer

- **Choice:** `LetterPdfDocument` + `pdf().toBlob()` with `Page size="A4"` and mm-based absolute positioning from `dinLayout.ts`.
- **Rationale:** html2pdf.js (html2canvas) produced poor spacing and hung with `Page size={[210, 297]}`; react-pdf gives sharp vector text and reliable DIN positioning.
- **Alternatives:** html2pdf.js (rejected: raster, layout hang); `window.print()`; Tauri/Rust PDF.
- **Quill HTML:** Parsed to flat paragraphs before `pdf()` via `parseQuillHtmlToParagraphs()` (not during react-pdf render).

### Save path: Tauri dialog + fs write

- **Choice:** `@tauri-apps/plugin-dialog` `save()` then `writeFile` from `@tauri-apps/plugin-fs`.
- **Flow:** User clicks export → native `save()` with suggested filename → if path chosen, generate PDF blob → `writeFile(path, bytes)`. Cancel dialog: no PDF generation, no write, no error toast.

### Fold and punch marks (kleiner Briefkopf)

- **Choice:** Shared constants in `FOLD_MARKS_MM`: fold 87mm, punch 148.5mm, fold 192mm from top edge. Used by preview (`mmToTopPercent`) and PDF (`dinLayout.ts`).

### UI placement

- **Choice:** Preview wrapper `position: relative; height: 100%`; PrimeReact `Button` `position: absolute; bottom/right` with `z-index` above scroll area.

### Filename helper

- **Choice:** `buildPdfExportFilename(subject, date, locale)` — trim subject, fallback `Brief`, locale date via `formatAppDate`, sanitize filesystem-invalid characters.

### Tauri wiring

- Register `tauri-plugin-dialog` in `src-tauri`; capabilities: `dialog:default`, `fs:allow-write-file`, scoped paths for user-selected locations.

## Risks / Trade-offs

- **[Risk] Preview vs PDF visual drift** → Mitigation: shared mm coordinates; preview keeps `cqw`, PDF uses pt sizes tuned to match approximately.
- **[Risk] Long body text clipped** → Mitigation: unchanged from preview single-page model; pagination is a future change.
- **[Risk] Quill HTML formatting loss** → Mitigation: paragraph-level mapping; bold/lists as plain text bullets for now.
- **[Risk] Tauri capability misconfiguration blocks write** → Mitigation: test save on macOS dev build.

## Migration Plan

1. Dependencies: `@react-pdf/renderer`, `pako` (Vite alias), `@tauri-apps/plugin-dialog`.
2. `dinLayout.ts`, `LetterPdfDocument`, `exportLetterPdf.tsx`, filename helper + tests.
3. Export button + i18n in `LetterPreview`.
4. Manual QA: export, cancel dialog, de/en filenames, fold marks in PDF.

No data migration. Rollback: remove plugin and export UI.

## Open Questions

(none)
