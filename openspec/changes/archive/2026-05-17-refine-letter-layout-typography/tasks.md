## 1. Layout and shared constants

- [x] 1.1 Update `DIN_LAYOUT` in `dinLayout.ts`: set `date` and `info` `left` to ~57%, add `pageNumber` box above footer, set `PDF_COLORS.text` to `#000000`
- [x] 1.2 Add preview style helpers in `dinLayout.ts` (percent top/left/width/bottom from mm layout) for reuse in `LetterPreview`

## 2. Internationalization

- [x] 2.1 Add `dateLabel` and `pageOf` keys to `src/locales/de/preview.json` and `src/locales/en/preview.json`

## 3. DIN A4 preview

- [x] 3.1 Refactor `LetterPreview.tsx` to use shared layout helpers for date, info, footer, and page number
- [x] 3.2 Render date as `{t("dateLabel")}{displayDate}` with left alignment; position info below date at shared offset
- [x] 3.3 Set all preview letter text colors to `#000000` (fields and placeholders)
- [x] 3.4 Add always-visible page line via `t("pageOf", { page: 1, total: 1 })` right-aligned above footer
- [x] 3.5 Ensure rich-text content stays black (CSS on `.preview-rich-content` if Quill inline colors appear)

## 4. PDF export

- [x] 4.1 Update `LetterPdfDocument.tsx`: black typography, date label prop, page number with `render` + `fixed`, layout from `DIN_LAYOUT`
- [x] 4.2 Pass `dateLabel` and `pageOf` formatter from `exportLetterPdf.tsx` using active language
- [x] 4.3 Update or add tests in `exportPdf.test.tsx` for date label and page numbering if assertions exist

## 5. Verification

- [x] 5.1 Manually verify preview: date/info left-aligned and shifted left, black text, page 1 of 1 in DE and EN
- [x] 5.2 Manually verify exported PDF matches preview layout and typography
