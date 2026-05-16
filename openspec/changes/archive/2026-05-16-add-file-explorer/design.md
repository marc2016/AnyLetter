## Context

The app currently uses a flat `Draft` model (`{ id, subject, recipient, body, createdAt, updatedAt }`).
To support a file explorer with folders, we need to introduce a hierarchy.
The UI needs to render a grid view of folders and files, support breadcrumb navigation, and allow right-click context menu actions (rename, move, delete).
Since this is a desktop app using Tauri, the local storage is handled by local APIs exposed via `DraftContext`.

## Goals / Non-Goals

**Goals:**
- Migrate the flat list of drafts into a hierarchical model supporting folders.
- Create a reusable, responsive Grid view component for items.
- Implement folder navigation and breadcrumbs in the UI.

**Non-Goals:**
- Supporting file previews (just icons for now).
- Infinite nesting depth optimizations (we assume reasonable depth).
- Cloud sync (this remains local storage only).

## Decisions

1. **Folder Model**: Introduce a `Folder` entity and update `Draft` to have a `parentId`.
   - *Rationale*: A simple `parentId` approach is standard and works well for small to medium local datasets.
   - *Alternative*: Store paths as strings (`/folder/subfolder`). Rejected because `parentId` makes renaming and moving folders O(1) instead of requiring recursive path updates.

2. **Data Structure (Storage)**:
   - We will add a `folders` array in the local storage, parallel to `drafts`.
   - `Folder`: `{ id, name, parentId: string | null, createdAt, updatedAt }`
   - `Draft`: Add `parentId: string | null` (null means root).

3. **UI Grid Layout**:
   - Use CSS Grid for the layout. Large icons using PrimeIcons (`pi-folder`, `pi-file`).
   - Item display: Icon centered, name below it, date faintly below the name.
   - Sorting handled via a dropdown that sorts the in-memory array before rendering.

## Risks / Trade-offs

- **Risk**: Deleting a folder orphans its children.
  - *Mitigation*: Delete operation must recursively delete all child drafts and subfolders, or move them to root. For now, recursive hard delete with a confirmation prompt.
- **Risk**: Moving items creates circular references (e.g., moving folder A into its own child folder B).
  - *Mitigation*: The move dialog must filter out invalid target folders (descendants of the moving folder).
