## Context

The change introduces a new desktop product based on Tauri and React, starting from an empty baseline with no existing capabilities. The first milestone is a usable MVP for writing and managing letters locally. The app must run cross-platform and keep user data on-device without requiring an online backend.

## Goals / Non-Goals

**Goals:**
- Deliver a Tauri desktop shell that hosts a React frontend.
- Enable users to create, edit, and delete letter drafts.
- Persist drafts locally and reload them reliably on app startup.
- Keep implementation modular so future capabilities (templates, export, sync) can be added.

**Non-Goals:**
- Cloud sync, authentication, or multi-device collaboration.
- Advanced rich text formatting and WYSIWYG editing in the first release.
- Markdown or rich markup in the letter body for the first release (plain text only).
- Encryption-at-rest in the first release (local files are stored without application-level encryption).
- Multi-window workflows or plugin architecture.

## Decisions

- Use Tauri 2.x with a React + TypeScript frontend scaffold.
  - Rationale: Tauri provides small binaries, native packaging, and secure Rust-backed capabilities while React keeps UI iteration fast.
  - Alternative considered: Electron. Rejected due to larger runtime footprint for this MVP.

- Use a single-window app with route-based navigation (`/letters`, `/letters/:id`, `/new`).
  - Rationale: Keeps user flow simple while allowing future modular expansion.
  - Alternative considered: Multi-window editor and list view. Rejected to reduce complexity in v1.

- Manage UI state with lightweight local state + context store pattern.
  - Rationale: Current scope does not justify heavy global state libraries; context and hooks remain simple and testable.
  - Alternative considered: Redux Toolkit. Rejected for MVP due to setup overhead.

- Persist letters as **one JSON file per draft** under an **application-managed directory** in app-local storage, using Tauri filesystem APIs (e.g. `<appData>/…/letters/<draftId>.json`; exact base path is an implementation detail).
  - Rationale: Human-readable storage, schema versioning per document, smaller write units on autosave, and corruption or parse errors affect **at most one** draft.
  - Alternative considered: Single monolithic JSON for all drafts. Rejected in favor of per-draft files for isolation and incremental writes.
  - Alternative considered: SQLite. Deferred because query complexity is low for early versions.

- Introduce a versioned data schema for letter drafts (`schemaVersion` field).
  - Rationale: Prevents migration issues as model evolves.
  - Alternative considered: Unversioned payload. Rejected due to long-term compatibility risk.

- Use **PrimeReact** as the primary UI component library (with its theme and PrimeIcons as needed).
  - Rationale: Consistent, accessible components and faster delivery for list, forms, dialogs, and layout.
  - Alternative considered: Headless primitives only (e.g. Radix). Rejected to prioritize speed and a cohesive look out of the box.

- **Strictly extract all UI parts into modular, reusable React components.**
  - Rationale: Ensures maintainability, testability, and a clean architecture as the application grows.

- **Autosave** on user input with a **debounce** after typing pauses (no separate “Save” requirement for MVP).
  - Rationale: Matches user expectation for a draft-focused editor and aligns with the desktop close-flush behavior.
  - Alternative considered: Explicit save plus periodic checkpoints. Rejected for MVP in favor of debounced autosave only.

- Letter **body** is **plain text** only in MVP (single multiline text field; no markdown pipeline).
  - Rationale: Reduces scope and storage/format ambiguity.
  - Alternative considered: Markdown in body. Deferred.

- **No encryption** of persisted files in MVP; rely on OS filesystem permissions.
  - Rationale: Keeps first milestone small; encryption can be a later capability if needed.
  - Alternative considered: Application-level encryption at rest. Explicitly out of scope for phase 1.

## Risks / Trade-offs

- [Data loss from interrupted writes] -> Mitigation: use atomic write pattern (write temp file, then rename) and debounce saves.
- [Corrupted local JSON in one draft file] -> Mitigation: validate each file on load, quarantine or back up the bad file, skip that draft, load the rest.
- [Stray or non-draft files in the directory] -> Mitigation: only treat files matching the agreed naming pattern as drafts; ignore others.
- [Platform-specific filesystem path differences] -> Mitigation: centralize path resolution through a storage adapter with integration tests.
- [Scope creep in editor UX] -> Mitigation: lock MVP to plain structured fields (recipient, subject, body) and track enhancements separately.

## Migration Plan

- Initialize Tauri + React project structure and confirm desktop startup.
- Implement frontend routes and baseline letter editor/list screens.
- Add storage adapter and persistence lifecycle (load, autosave, delete).
- Add schema validation and migration hook for future versions.
- Package and test app on target OS platforms.

Rollback strategy:
- If desktop integration fails, keep React UI isolated behind an interface and temporarily disable persistence writes.
- If storage migration fails, preserve affected draft files and revert to last stable schema parser for reads.

## Resolved product decisions

- Autosave: **yes**, triggered while editing, with **debounce** after input pauses.
- Body format: **plain text** only for MVP.
- Encryption: **none** in MVP; optional follow-up milestone.
- UI library: **PrimeReact** as the default component set.
- Storage layout: **multiple JSON files** (one file per letter draft), not one combined archive file.
