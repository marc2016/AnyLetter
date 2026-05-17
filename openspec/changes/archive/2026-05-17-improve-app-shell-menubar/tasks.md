## 1. Shell navigation foundation

- [x] 1.1 Create `ShellNavigationContext` (provider + hook) with `explorerFolderId`, `setExplorerFolderId`, and route-derived view kind
- [x] 1.2 Extract folder path → `MenuItem[]` logic from `ExplorerBreadcrumbs` into a shared utility or hook (e.g. `useFolderBreadcrumbItems`)
- [x] 1.3 Add a breadcrumb builder that composes home, route segments (Briefe / Neuer Brief / editor), and folder segments from context
- [x] 1.4 Wrap the app with `ShellNavigationProvider` (inside router, around layout routes)

## 2. Menubar app shell

- [x] 2.1 Refactor `AppLayout` to render PrimeReact `Menubar` with `model={[]}`, empty `end`, and `start` containing `pi-envelope`, "AnyLetter", and `BreadCrumb`
- [x] 2.2 Wire brand click (icon + title) to navigate to `/letters` and reset `explorerFolderId` to null
- [x] 2.3 Remove the conditional "Zurück" back button from `AppLayout`
- [x] 2.4 Style Menubar and BreadCrumb for compact transparent appearance consistent with the app theme

## 3. Explorer folder breadcrumb integration

- [x] 3.1 Update `FileExplorerView` to use `ShellNavigationContext` for `explorerFolderId` instead of local `useState`
- [x] 3.2 Remove `ExplorerBreadcrumbs` usage from `FileExplorerView` and delete the component file after logic is migrated
- [x] 3.3 Verify folder double-click and breadcrumb segment clicks update both grid and Menubar breadcrumb

## 4. Editor breadcrumb and navigation

- [x] 4.1 Extend breadcrumb builder for `/new` (Neuer Brief) and `/letters/:id` (draft subject or Untitled placeholder)
- [x] 4.2 Wire breadcrumb list/home segment to navigate from editor back to `/letters`
- [x] 4.3 (Optional follow-up) Connect `LetterEditor` to `DraftContext` via `useParams` so the last breadcrumb segment shows the real draft subject

## 5. Verification

- [x] 5.1 Manually verify explorer root, nested folders, editor, and new-letter flows show correct Menubar breadcrumbs
- [x] 5.2 Confirm no duplicate breadcrumb remains in explorer content area
