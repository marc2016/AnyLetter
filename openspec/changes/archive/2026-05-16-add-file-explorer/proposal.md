## Why

The current startup view is a simple, flat list of letter drafts, which feels limited for a desktop application. Adding a File Explorer view with folder support and a modern grid layout provides a familiar, professional, and more powerful interface for organizing and finding documents.

## What Changes

- Replace the flat `DraftList` on startup with a new File Explorer view.
- Introduce the concept of Folders (folders can contain letters or other folders).
- Display items in a Grid layout (large icons, name below, date faintly below the name).
- Add breadcrumb navigation (e.g., `Home > Applications`).
- Add a top action bar with Search, Sort Dropdown (by Date, Name), and "New Folder" / "New Letter" buttons.
- Implement a right-click context menu for items (Rename, Move to..., Delete).
- **BREAKING**: Modifies the storage data model to support a hierarchical structure (e.g., adding `parentId` or creating a new Folder entity).

## Capabilities

### New Capabilities
- `file-explorer-view`: The UI capability covering the grid view, breadcrumbs, context menus, and sorting/search controls for the new startup screen.

### Modified Capabilities
- `local-letter-storage`: Storage requirements change to support hierarchical folders, parent/child relationships, moving items between folders, and folder management.

## Impact

- `DraftContext` and local storage models will need updates to handle folders and `parentId`.
- The `DraftList` view component will be completely replaced or heavily refactored.
- Routing may need to accommodate folder navigation (e.g., `/letters?folder=id`).
