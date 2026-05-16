## 1. Storage & Data Model Updates

- [x] 1.1 Define `Folder` model interface and update `Draft` model to include `parentId?: string | null`
- [x] 1.2 Update local storage persistence layer to support saving and loading `Folder` files
- [x] 1.3 Update `DraftContext` to load folders on startup alongside drafts and expose folder-related state
- [x] 1.4 Add context methods for folder operations: `createFolder`, `renameFolder`, `deleteFolder`
- [x] 1.5 Add context method to update draft/folder `parentId` (moving items)

## 2. File Explorer UI Components

- [x] 2.1 Create reusable `FileGrid` component utilizing CSS Grid
- [x] 2.2 Create `FileGridItem` component to render individual items (Folder or File icon, name, date)
- [x] 2.3 Implement Breadcrumb navigation component based on the current active folder
- [x] 2.4 Create the Top Action Bar component (Search input, Sort dropdown, Add buttons)

## 3. View Integration

- [x] 3.1 Create `FileExplorerView` component to replace the existing `DraftList` view
- [x] 3.2 Implement local state in `FileExplorerView` to manage the active `currentFolderId` and sorting/search filters
- [x] 3.3 Connect `FileExplorerView` to `DraftContext` to render folders and drafts based on the active path
- [x] 3.4 Wire up the right-click context menu (PrimeReact `ContextMenu`) to trigger rename/move/delete actions
- [x] 3.5 Wire up navigation so double-clicking a folder updates the active folder state

## 4. Final Polish

- [x] 4.1 Implement "Move to..." dialog allowing the user to select a destination folder
- [x] 4.2 Verify application startup loads hierarchy correctly
- [x] 4.3 Ensure item (folder/file) deletion confirmation dialog works
