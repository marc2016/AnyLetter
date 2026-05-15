## Why

Users need a focused desktop app for writing and managing letters offline without depending on browser tabs or cloud tools. Building this now establishes the core product foundation and validates the Tauri + React stack for future features.

## What Changes

- Create a cross-platform desktop application using Tauri and React.
- Use PrimeReact as the primary UI component library for screens and controls.
- Strictly extract and organize all UI elements into modular, reusable React components.
- Add a letter editor flow to create, edit, and delete letter drafts (plain text body, debounced autosave while typing).
- Add local persistence so letters are saved and restored between app sessions (one JSON file per draft under app-local storage).
- Add a basic desktop shell with navigation, window controls, and app metadata.

## Capabilities

### New Capabilities
- `letter-editor`: Compose, update, and remove letter drafts in a structured editor view.
- `local-letter-storage`: Persist letter drafts locally and restore them on app startup.
- `desktop-shell`: Provide the Tauri desktop app shell, including navigation and app lifecycle behavior.

### Modified Capabilities
None.

## Impact

- New frontend code in React for routes, views, components, and state handling.
- New Tauri backend wiring for desktop runtime configuration and file access.
- New project dependencies for Tauri, React tooling, PrimeReact (and theme/icons as configured), and app packaging.
- No external APIs required for the initial version; all data remains local on disk as multiple JSON documents managed by the app.
