## 1. Project Setup

- [x] 1.1 Scaffold a Tauri 2.x + React + TypeScript application structure for desktop builds
- [x] 1.2 Configure development and build scripts for running web and desktop targets
- [x] 1.3 Add PrimeReact (theme, PrimeIcons if needed) and wrap the app with required providers for desktop and dev
- [x] 1.4 Add base application shell layout with routes for draft list and editor views using PrimeReact layout primitives where appropriate

## 2. Letter Editor Capability

- [x] 2.1 Implement letter draft model with fields for recipient, subject, body, timestamps, and id
- [x] 2.2 Build draft list view showing subject and last updated metadata for each draft
- [x] 2.3 Build editor view to create and modify draft fields and keep active draft state synchronized
- [x] 2.4 Add delete-draft action with confirmation and list/editor state updates

## 3. Local Storage Capability

- [x] 3.1 Implement a storage adapter using Tauri filesystem APIs: app-local drafts directory, one JSON file per draft (stable id in filename or file body), create/update/delete file operations
- [x] 3.2 Add startup discovery (list draft files in the directory, skip non-matching names) and load flow to restore all valid persisted drafts into application state
- [x] 3.3 Add debounced autosave on typing/editing (recipient, subject, body) with atomic per-file write behavior for the active draft only
- [x] 3.4 Add per-file schema validation and invalid-data handling: backup or quarantine a corrupt draft file, continue loading other drafts

## 4. Desktop Shell and Quality

- [x] 4.1 Wire desktop lifecycle handling to flush pending draft changes before window close
- [x] 4.2 Add integration tests covering create, edit, delete, restart-restore, and invalid-storage scenarios
- [x] 4.3 Validate packaging and runtime behavior on target OS platforms for MVP readiness
