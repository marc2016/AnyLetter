## Why

The current app shell uses a minimal custom header (back button + title) that feels disconnected from the rest of the PrimeReact-based UI. Folder breadcrumbs live only inside the file explorer view, while route-level context (list vs. editor) is handled separately. A unified PrimeReact Menubar with integrated breadcrumb navigation will give the Tauri desktop app a cohesive, professional chrome and a single place for wayfinding—without relying on visible URLs.

## What Changes

- Replace the custom `AppLayout` header with a PrimeReact `Menubar` (brand area: `pi-envelope` icon + "AnyLetter" title; empty `model`; empty `end` slot reserved for future settings).
- Move breadcrumb navigation into the Menubar `start` area using PrimeReact `BreadCrumb`, driven by app state (route + explorer folder context), not user-visible URLs.
- Introduce shared shell/navigation context so the explorer folder path and editor draft title can feed the global breadcrumb.
- Remove the per-view `ExplorerBreadcrumbs` component from `FileExplorerView` once the global breadcrumb covers folder hierarchy.
- Remove the conditional "Zurück" back button; navigation is handled via clickable breadcrumb segments and the brand click (return to letters root).
- Keep explorer action bar (search, sort, new folder/letter) in the content area unchanged for this change.

## Capabilities

### New Capabilities

_None — this change extends existing shell and explorer navigation behavior._

### Modified Capabilities

- `desktop-shell`: Shell chrome becomes a Menubar with integrated breadcrumb; navigation requirements updated to reflect unified wayfinding.
- `file-explorer-view`: Breadcrumb requirement relocated from explorer content area to global app shell; behavior unchanged for folder hierarchy navigation.

## Impact

- `src/components/layout/AppLayout.tsx` — primary refactor to Menubar + BreadCrumb
- New context/hook for shell navigation state (folder id, breadcrumb model)
- `src/components/views/FileExplorerView.tsx` — lift folder navigation state; remove `ExplorerBreadcrumbs`
- `src/components/explorer/ExplorerBreadcrumbs.tsx` — logic reused or removed after migration
- `src/components/views/LetterEditor/LetterEditor.tsx` — may need draft id/title wiring for editor breadcrumb segment (phase 3 in design)
- OpenSpec deltas: `openspec/specs/desktop-shell/spec.md`, `openspec/specs/file-explorer-view/spec.md`
