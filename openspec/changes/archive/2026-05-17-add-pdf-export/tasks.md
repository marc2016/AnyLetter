## 1. Dependencies and Tauri setup

- [x] 1.1 Add `html2pdf.js` to `package.json`
- [x] 1.2 Add `@tauri-apps/plugin-dialog` to `package.json` and register `tauri-plugin-dialog` in `src-tauri`
- [x] 1.3 Configure Tauri capabilities for dialog save and writing the user-selected PDF path

## 2. Export utilities

- [x] 2.1 Implement `buildPdfExportFilename(subject, date, locale)` with filesystem sanitization and subject fallback `Brief`
- [x] 2.2 Add unit tests for filename helper (subject present/empty, sanitization, locale date segment)

## 3. Preview UI and export-mode rendering

- [x] 3.1 Wrap preview pane in relative container; add floating export `Button` bottom-right (PrimeReact, PDF icon, i18n aria-label)
- [x] 3.2 Add `isExporting` state: skip placeholders/sample content, omit focus highlights; keep fold/punch marks
- [x] 3.3 Add `ref` on inner A4 root element for html2pdf target

## 4. PDF generation and save flow

- [x] 4.1 Implement `exportLetterPdf` flow: toggle export mode → rAF → html2pdf blob (`a4`, `margin: 0`, `scale: 2`) → native `save` dialog → `writeFile`
- [x] 4.2 Handle cancel (no write) and errors (toast/message via i18n); disable button while exporting
- [x] 4.3 Add `preview.exportPdf` and error strings to `de`/`en` `preview.json`

## 5. Verification

- [x] 5.1 Manual QA: filled letter, empty fields, focused field during export, rich text formatting, fold marks visible in PDF
- [x] 5.2 Manual QA: suggested filename de/en; cancel dialog; successful save opens valid PDF
