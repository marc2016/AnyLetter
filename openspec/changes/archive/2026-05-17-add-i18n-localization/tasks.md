## 1. i18n foundation

- [x] 1.1 Add `i18next`, `react-i18next`, and language detector dependencies
- [x] 1.2 Create `src/i18n/index.ts` with init, supported langs (`de`, `en`), fallback `en`, detection order (saved → system)
- [x] 1.3 Add locale JSON structure under `src/locales/de` and `src/locales/en` (namespaces: common, explorer, editor, breadcrumb, preview, confirm)
- [x] 1.4 Wrap app with `I18nextProvider` in `main.tsx` before render

## 2. Menubar language selector

- [x] 2.1 Add language `Dropdown` (or equivalent) to Menubar `end` in `AppLayout`
- [x] 2.2 Persist selection on change; sync `document.documentElement.lang`
- [x] 2.3 Update PrimeReact locale on language change (`addLocale` + provider value)

## 3. Formatting helpers

- [x] 3.1 Add `formatAppDate` / locale helper using `Intl` based on active i18n language
- [x] 3.2 Replace hardcoded `de-DE` date formatting in `LetterPreview` and explorer grid

## 4. String migration — shell and navigation

- [x] 4.1 Migrate `useShellBreadcrumb` labels (Briefe, Neuer Brief, Untitled)
- [x] 4.2 Migrate any remaining shell strings (loading aria-label, etc.)

## 5. String migration — explorer

- [x] 5.1 Migrate `ExplorerActionBar` (search, sort, buttons)
- [x] 5.2 Migrate `FileExplorerView` (context menu, dialogs, toasts, empty state, defaults)
- [x] 5.3 Migrate `FileGridItem` / untitled letter display if applicable

## 6. String migration — editor

- [x] 6.1 Migrate `LetterEditorForm` labels and headings
- [x] 6.2 Migrate `LetterPreview` placeholder/sample text
- [x] 6.3 Localize app defaults when creating folders (`New Folder` → `t(...)`)

## 7. Tests and verification

- [x] 7.1 Configure vitest i18n setup with fixed `lng: 'en'` (or testids)
- [x] 7.2 Update `integration.test.tsx` for i18n compatibility
- [x] 7.3 Manual Tauri check: system locale detection, switch DE/EN in Menubar, restart persistence
