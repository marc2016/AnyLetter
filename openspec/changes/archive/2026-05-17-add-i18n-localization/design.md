## Context

AnyLetter is a Tauri + React + PrimeReact desktop app. UI copy is currently embedded directly in components with a mix of German (editor, breadcrumbs) and English (explorer actions, dialogs). The Menubar reserves an empty `end` slot for future settings. There is no i18n library in `package.json`.

User decisions:
- Languages: `de`, `en`
- Initial language: system locale
- Fallback: `en` when system is not `de` or `en`
- Language switcher: Menubar top right (`end`)
- Scope: all UI strings including app-generated defaults (not user-authored letter body content)

## Goals / Non-Goals

**Goals:**

- Single i18n stack (`react-i18next`) for all app UI text.
- Reliable locale resolution order: saved preference → system → fallback `en`.
- Language dropdown/toggle in Menubar `end`; choice persisted across sessions.
- PrimeReact widgets and date display follow active locale.
- Namespaced JSON files (`common`, `explorer`, `editor`, `breadcrumb`, `preview`, `confirm`) for maintainability.

**Non-Goals:**

- Additional languages beyond `de` and `en`.
- Translating user-written letter content.
- RTL layout support.
- External translation management (Crowdin, etc.).
- Localizing the legacy unused `Editor.tsx` unless trivial during migration.

## Decisions

### 1. Library: react-i18next

**Choice:** `i18next`, `react-i18next`, `i18next-browser-languagedetector` with custom detector order.

**Rationale:** Standard for React + Vite; JSON resources; `useTranslation` hook; easy test setup with fixed `lng`.

**Alternatives:** typesafe-i18n (more setup), Lingui (ICU-heavy) — rejected for MVP speed.

### 2. Locale resolution

**Choice:**

```
1. localStorage key `app.locale` (if valid de|en)
2. navigator.language → normalize to de or en prefix
3. fallbackLng: 'en'
```

**Rationale:** Matches user preference for system default on first run and `en` fallback.

```typescript
// normalize: 'de-DE' → 'de', 'en-US' → 'en', 'fr-FR' → use fallback
```

### 3. Persistence

**Choice:** `localStorage` via i18next `cache` option or manual save on `changeLanguage`.

**Rationale:** Simple, works in Tauri WebView; no extra Tauri plugin for MVP. AppData file optional later.

### 4. Menubar language control

**Choice:** PrimeReact `Dropdown` in Menubar `end` with options Deutsch / English; icons optional (`pi-globe`).

**Rationale:** Uses reserved shell slot; visible on all routes.

### 5. PrimeReact locale sync

**Choice:** On language change, call `addLocale` if needed and update `PrimeReactProvider` `locale` prop (or `locale` option API) to `de` / `en`. Import PrimeReact locale objects or minimal inline locale for Calendar.

**Rationale:** Calendar month names and filter labels must match app language.

### 6. Date/number formatting

**Choice:** Helper `formatAppDate(date, i18n.language)` using `Intl.DateTimeFormat` with `de-DE` or `en-US` derived from active language; replace hardcoded `toLocaleDateString('de-DE')` in `LetterPreview` and grid.

### 7. App-generated defaults

**Choice:** Use `t('defaults.untitledLetter')` etc. when displaying or creating items (e.g. empty subject in grid, breadcrumb, `createEmptyDraft` display names only at UI layer — stored subject can remain empty string).

**Rationale:** User asked to localize defaults; empty `subject` in JSON stays `""`; UI shows translated "Untitled" / "Unbenannt".

**Note:** `handleNewFolder` uses `t('defaults.newFolder')` at creation time so folder name is in active language when created.

### 8. File structure

```
src/i18n/
  index.ts                 # init, detectors, exports
src/locales/
  de/common.json
  de/explorer.json
  ...
  en/common.json
  ...
```

### 9. Testing

**Choice:** Initialize i18n in test setup with `lng: 'en'`; prefer `data-testid` for new tests; update integration tests to use stable language or test ids.

## Risks / Trade-offs

- **[Risk] Large string migration touch many files** → Mitigation: namespace-by-namespace tasks; grep for hardcoded strings checklist.
- **[Risk] Tests break on translated text** → Mitigation: fixed test locale in vitest setup.
- **[Trade-off] Folder name at create time is localized** → Folder created in EN stays English if user switches language (acceptable; display name is stored).
- **[Risk] PrimeReact locale bundle size** → Import only needed locale files.

## Migration Plan

1. Add dependencies and i18n bootstrap before app render.
2. Add locale JSON with all keys (can start with DE as source, EN translations).
3. Wire Menubar language selector.
4. Migrate components namespace by namespace.
5. PrimeReact + Intl helpers.
6. Fix tests; manual Tauri smoke test both languages.

Rollback: remove i18n provider and restore hardcoded strings from git.

## Open Questions

- None. Fallback language confirmed as `en`.
