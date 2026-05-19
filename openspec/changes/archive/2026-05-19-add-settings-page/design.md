## Context

AnyLetter uses a PrimeReact Menubar as persistent shell chrome. The Menubar `end` area currently renders `WindowControls` (Windows/Linux) and a `LanguageSelector` dropdown. Language switching already persists via `localStorage` and updates i18n immediately.

The user wants a dedicated settings page (v1: language only), a gear icon with tooltip in the Menubar instead of the inline language dropdown, and no keyboard shortcut.

## Goals / Non-Goals

**Goals:**

- Add route `/settings` with a settings view containing the language selector.
- Replace Menubar language dropdown with a gear icon button that navigates to `/settings`; show a localized tooltip on hover/focus.
- Keep existing language persistence, i18n switching, and PrimeReact locale sync unchanged.
- Integrate settings into shell breadcrumb navigation.
- Preserve unified titlebar behavior: settings button is clickable (not a drag region).

**Non-Goals:**

- Additional settings sections (theme, defaults, about) in v1.
- Keyboard shortcut to open settings (e.g. `Cmd+,`).
- Settings modal, sidebar, or overlay instead of a full page.
- Changes to language detection or supported languages.

## Decisions

### 1. Full-page route over overlay

**Choice:** Add `/settings` as a child route under `AppLayout`, rendered via `<Outlet />`.

**Rationale:** User requested an "Einstellungsseite"; a route gives a stable URL, breadcrumb context, and a natural place for future settings.

**Alternatives considered:**

- PrimeReact Sidebar — faster but no breadcrumb/URL; harder to extend.
- Dialog — feels transient, not a settings destination.

### 2. Reuse `LanguageSelector` on the settings page

**Choice:** Move the existing `LanguageSelector` component from `AppLayout` to `SettingsView`; optionally add a `className` prop for settings-page layout (wider dropdown).

**Rationale:** Logic (change handler, flags, persistence) already works; avoids duplication.

**Alternatives considered:**

- Radio buttons or list — different UX without benefit for two languages.
- Duplicate component — unnecessary maintenance.

### 3. `SettingsButton` in Menubar `end`

**Choice:** New small presentational component: PrimeReact `Button` with `icon="pi pi-cog"`, `text`/`rounded` styling to match chrome, wrapped in PrimeReact `Tooltip`. `aria-label` uses the same localized string as the tooltip. `onClick` navigates to `/settings`.

**Rationale:** Matches existing PrimeReact patterns; tooltip satisfies icon-only discoverability requirement.

### 4. Shell navigation extensions

**Choice:**

- Extend `ShellViewKind` with `"settings"`.
- `useShellBreadcrumb`: when pathname is `/settings`, breadcrumb shows a single "Settings" segment (home icon still navigates to explorer root).
- Brand click (`goToExplorerRoot`) unchanged — returns to `/letters` from settings.

**Rationale:** Minimal changes; consistent with existing explorer/editor breadcrumb patterns.

### 5. i18n namespace

**Choice:** Add `settings` namespace with keys: `title`, `languageLabel`, `openSettings` (tooltip/aria). Reuse `common.language`, `common.languageDe`, `common.languageEn` where applicable.

**Rationale:** Keeps settings strings grouped; tooltip lives in settings namespace for clarity.

### 6. Styling

**Choice:** Settings page uses a centered or left-aligned card/panel within main content area (`max-width`, padding consistent with explorer). Gear button styled to match Menubar chrome (similar size to window controls).

**Rationale:** Simple, consistent with app layout; no new design system.

## Risks / Trade-offs

- **[Discoverability]** Language change requires two clicks (gear → select) instead of one → Acceptable; language changes are infrequent.
- **[Spec drift]** Existing specs mandate Menubar language selector → Delta specs update `desktop-shell` and `app-localization` before implementation.
- **[Active route]** Settings gear could be styled as active on `/settings` → Optional polish; not required for v1.

## Migration Plan

No data migration. Existing `localStorage` language key unchanged. Deploy as a single frontend change; no Tauri/Rust changes required.

## Open Questions

None — scope confirmed: language only, icon + tooltip, no shortcut.
