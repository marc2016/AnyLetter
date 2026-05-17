## Context

AnyLetter is a Tauri desktop app with a React + PrimeReact UI. The app shell (`AppLayout`) currently uses a minimal custom header: a conditional back button and a clickable "AnyLetter" title. Folder breadcrumbs are implemented separately in `ExplorerBreadcrumbs` inside `FileExplorerView`, using local React state (`currentFolderId`) rather than URLs. Users never see browser URLs; React Router is used internally only for view switching (`/letters`, `/letters/:id`, `/new`).

PrimeReact is already a project dependency. `ExplorerBreadcrumbs` already uses `BreadCrumb`; this change unifies navigation chrome into a single `Menubar` at the shell level.

## Goals / Non-Goals

**Goals:**

- Replace the custom header with a PrimeReact `Menubar` as persistent app chrome.
- Brand area (`start`): `pi-envelope` icon, "AnyLetter" title (click → letters root), and a global `BreadCrumb`.
- Drive breadcrumb segments from app state: current route (explorer vs. editor) + explorer folder path + editor draft title when available.
- Lift explorer folder navigation state to a shared context so the Menubar can show folder hierarchy without URL sync.
- Remove redundant navigation UI (back button, in-view `ExplorerBreadcrumbs`).
- Reserve Menubar `end` for future actions (e.g. settings); leave `model` empty.

**Non-Goals:**

- Syncing folder or draft state to visible URLs or deep-linkable routes.
- Menubar dropdown menu items (`model` entries).
- Moving explorer action bar controls (search, sort, new folder/letter) into the Menubar.
- Settings dialog or `end` slot actions in this change.

## Decisions

### 1. Menubar composition via `start` template

**Choice:** Use Menubar `start` for icon + title + `BreadCrumb`; `model={[]}`; `end` empty (null).

**Rationale:** PrimeReact Menubar is designed for this layout. Empty `model` avoids placeholder menus; `end` is reserved without visual clutter.

**Alternatives considered:**
- Custom `<header>` with flex layout — rejected; duplicates Menubar styling and theming.
- Toolbar instead of Menubar — rejected; Menubar matches the desired app-chrome pattern.

### 2. Single global breadcrumb (no duplicate in explorer)

**Choice:** One `BreadCrumb` in `AppLayout`; remove `ExplorerBreadcrumbs` from `FileExplorerView`.

**Rationale:** Explored in discovery; avoids two breadcrumb bars. Folder path and route context merge into one trail.

**Alternatives considered:**
- Keep explorer breadcrumb in content — rejected; redundant with shell breadcrumb.

### 3. Navigation state via React Context (not URL)

**Choice:** Introduce `ShellNavigationContext` (or similar) holding `explorerFolderId`, setters, and a derived `breadcrumbItems: MenuItem[]` builder.

**Rationale:** Tauri users do not see URLs; folder state is already local. Context avoids prop drilling from `FileExplorerView` to `AppLayout`.

**Alternatives considered:**
- URL query `?folder=` — rejected per user preference; no user-visible benefit.
- Lifting state only through `AppLayout` children callback — rejected; context scales better for editor title updates.

### 4. Breadcrumb segment rules

| View | Segments (example) |
|------|-------------------|
| Explorer, root | Home icon only (or Home + implicit "Briefe" — implement Home icon matching current `ExplorerBreadcrumbs`) |
| Explorer, in folders | Home › Folder1 › Folder2 |
| Editor, new | Home › Neuer Brief |
| Editor, existing | Home › Briefe › {subject \|\| Untitled} |

Home icon segment navigates to explorer root (`/letters`, `explorerFolderId = null`). Intermediate folder segments call `setExplorerFolderId`. "Briefe" / list segment navigates to `/letters`. Editor title segment is display-only or navigates to editor (no-op).

Brand click (icon + "AnyLetter"): same as Home — explorer root.

### 5. Phased implementation

**Choice:** Three phases in tasks (shell menubar → folder context → editor title).

**Rationale:** Delivers visible improvement early; editor title depends on `LetterEditor` loading draft by `id` (currently not wired).

### 6. Reuse breadcrumb path logic

**Choice:** Extract folder path → `MenuItem[]` logic from `ExplorerBreadcrumbs` into a shared utility or hook; delete the component after migration.

**Rationale:** Avoid duplication; existing logic is proven.

## Risks / Trade-offs

- **[Risk] LetterEditor lacks draft loading by route id** → Editor breadcrumb shows placeholder ("Neuer Brief" / "Untitled") until editor is wired to `DraftContext`; document as follow-up in tasks phase 3.
- **[Risk] Folder state lost when returning from editor** → Reset `explorerFolderId` only on explicit Home/brand navigation; preserve folder when navigating back from editor if desired (default: preserve in context until Home click).
- **[Trade-off] Menubar height vs. content space** → Accept slightly taller chrome; use compact BreadCrumb classes (`border-none bg-transparent p-0`).
- **[Trade-off] Spec relocation of breadcrumb** → `file-explorer-view` requirement updated to "global shell" wording; behavior unchanged for users.

## Migration Plan

1. Add context + Menubar shell without removing explorer breadcrumbs (optional intermediate — tasks may combine).
2. Wire explorer to context; switch breadcrumb to shell; remove `ExplorerBreadcrumbs`.
3. Remove back button from `AppLayout`.
4. Wire editor title when draft loading exists.

No data migration. Rollback: revert `AppLayout` and restore `ExplorerBreadcrumbs`.

## Open Questions

- None blocking. First breadcrumb segment uses Home icon (consistent with current explorer). Editor folder prefix (show parent folder path before draft title) deferred to phase 3+ if needed.
