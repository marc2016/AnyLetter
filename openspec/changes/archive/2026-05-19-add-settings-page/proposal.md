## Why

The language selector in the Menubar takes up space in the top chrome and is the only user preference exposed there. A dedicated settings entry point keeps the shell clean, makes room for future preferences, and groups language choice with other configuration as the app grows.

## What Changes

- Add a settings page at route `/settings` with a language selector as its only setting in v1.
- Replace the Menubar language dropdown with a gear icon button that navigates to the settings page; the button shows a localized tooltip on hover/focus.
- Update shell breadcrumb navigation to show a settings segment when on the settings route.
- Remove the language selector from the Menubar `end` area (Windows/Linux: gear appears after in-chrome window controls).
- Reuse existing language switching logic and persistence (`LanguageSelector`, `localStorage`, i18n).
- No keyboard shortcut for opening settings in v1.

## Capabilities

### New Capabilities

- `app-settings`: Settings page, Menubar settings entry control, and routing/breadcrumb integration for user preferences.

### Modified Capabilities

- `desktop-shell`: Menubar `end` area hosts a settings gear button with tooltip instead of the language dropdown; unified chrome drag/click rules apply to the new control.
- `app-localization`: Language selector moves from the Menubar to the settings page; persistence and switching behavior remain unchanged.

## Impact

- `src/App.tsx` — new `/settings` route
- `src/components/layout/AppLayout.tsx` — swap `LanguageSelector` for settings button
- New `SettingsView` and `SettingsButton` (or equivalent) components
- `src/context/ShellNavigationContext.tsx` and `src/hooks/useShellBreadcrumb.ts` — settings view kind and breadcrumb
- `src/locales/{de,en}/` — settings namespace and tooltip strings
- `src/App.css` — styling for settings page and gear button
- OpenSpec deltas for `desktop-shell` and `app-localization`
