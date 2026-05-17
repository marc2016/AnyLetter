## Why

Users editing business letters in AnyLetter can see a live DIN A4 preview, but cannot save or share the result as a document. Exporting the letter as PDF closes the loop from drafting to printing or emailing, using the same DIN layout coordinates as the preview.

## What Changes

- Add a floating export control (bottom-right) in the letter preview pane.
- Generate a PDF via `@react-pdf/renderer` from letter field data and shared DIN layout (`dinLayout.ts`), including small-letterhead fold marks (87mm, 148.5mm, 192mm).
- Update preview fold/punch mark positions to kleiner Briefkopf (87mm, 148.5mm, 192mm).
- Render only actual field data in PDF; empty fields stay blank (no placeholders or sample text).
- Native Tauri save dialog before PDF generation; write only after the user confirms a path.
- Suggested filename `{subject} {today's date}.pdf` (locale-aware, sanitized; fallback subject `Brief`).
- Add Tauri dialog plugin and i18n strings for export action and errors.

## Capabilities

### New Capabilities

(none)

### Modified Capabilities

- `letter-editor-view`: Small-letterhead fold/punch mark positions; PDF export from preview pane, export content rules, native save dialog, and default filename convention.

## Impact

- **Frontend**: `LetterPreview.tsx`, `pdf/LetterPdfDocument.tsx`, `pdf/dinLayout.ts`, `utils/exportLetterPdf.tsx`, `utils/buildPdfExportFilename.ts`, `preview.json` locale files.
- **Dependencies**: `@react-pdf/renderer`, `pako` (Vite resolve alias).
- **Tauri**: `@tauri-apps/plugin-dialog`, plugin registration, capability permissions for save + write.
- **Testing**: Unit tests for filename helper and PDF blob generation.
