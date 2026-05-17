## Why

The application UI mixes German and English strings hardcoded in components, which feels inconsistent for a German-focused letter app and blocks supporting English properly. Users running the Tauri desktop app should see a coherent interface in their preferred language.

## What Changes

- Add `i18next` and `react-i18next` with German (`de`) and English (`en`) translation resources.
- Detect initial language from the system locale on first launch; use English as fallback when the system language is neither German nor English.
- Persist the user's language choice and prefer it over system detection on subsequent launches.
- Add a language selector in the Menubar `end` area (top right).
- Replace hardcoded UI strings across explorer, editor, breadcrumbs, toasts, dialogs, and preview placeholders with translation keys.
- Synchronize PrimeReact component locales (Calendar, etc.) and `Intl` date formatting with the active app language.
- Localize app-generated defaults (e.g. untitled letter names, new folder names) via translation keys at creation/display time.

## Capabilities

### New Capabilities

- `app-localization`: Internationalization infrastructure, supported languages, locale detection, persistence, and localized UI strings.

### Modified Capabilities

- `desktop-shell`: Menubar `end` area hosts a language selector; shell chrome supports localized labels where applicable.

## Impact

- New dependencies: `i18next`, `react-i18next`, `i18next-browser-languagedetector` (or equivalent detection helper)
- New `src/i18n/` module and `src/locales/{de,en}/*.json` translation files
- `src/main.tsx`, `src/App.tsx`, `src/components/layout/AppLayout.tsx`
- All view components with user-visible text (`FileExplorerView`, `LetterEditor*`, `ExplorerActionBar`, hooks like `useShellBreadcrumb`)
- `src/integration.test.tsx` and other tests using fixed UI strings
- Optional: PrimeReact locale JSON / `addLocale` setup
