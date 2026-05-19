## 1. i18n and routing

- [x] 1.1 Add `settings` namespace to `src/locales/de/settings.json` and `src/locales/en/settings.json` (`title`, `languageLabel`, `openSettings`)
- [x] 1.2 Register `settings` namespace in `src/i18n/index.ts`
- [x] 1.3 Add `/settings` route in `App.tsx` rendering `SettingsView` under `AppLayout`

## 2. Settings view

- [x] 2.1 Create `SettingsView` with page title and language section label
- [x] 2.2 Render existing `LanguageSelector` on the settings page (optional `className` for settings layout)
- [x] 2.3 Add CSS for settings page layout in `App.css`

## 3. Menubar settings entry

- [x] 3.1 Create `SettingsButton` with `pi-cog` icon, localized tooltip, and `aria-label`
- [x] 3.2 Replace `LanguageSelector` in `AppLayout` `end` slot with `SettingsButton` (after `WindowControls`)
- [x] 3.3 Style gear button to match Menubar chrome; ensure it is excluded from titlebar drag regions

## 4. Shell navigation

- [x] 4.1 Extend `ShellViewKind` in `ShellNavigationContext` with `"settings"`
- [x] 4.2 Update `useShellBreadcrumb` to show settings segment on `/settings`; home navigates to explorer root
- [x] 4.3 Add breadcrumb translation key for settings in `src/locales/{de,en}/breadcrumb.json`

## 5. Tests and verification

- [x] 5.1 Add or update tests: settings route renders language control; gear navigates to settings
- [x] 5.2 Manual check: tooltip on gear hover/focus; language switch on settings page updates UI; persistence after restart; breadcrumb home from settings
