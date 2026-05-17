## Context

AnyLetter is a Tauri desktop app. Letter drafts are persisted as individual JSON files under AppData via `storage/adapter.ts`. `DraftContext` exposes `addDraft`, `updateDraft` (with 1s debounced `saveDraftFile`), and loads drafts on startup.

The routed `LetterEditor` (`/new`, `/letters/:id`) uses local `LetterData` state with nine fields (sender, recipient, notes, info, date, subject, content, footer) but never reads or writes `DraftContext`. The legacy `Editor.tsx` (recipient, subject, body only) is not routed. The `Draft` type still matches the old three-field editor.

Users edit in the Tauri app and expect autosave after a few seconds of inactivity across all form fields.

## Goals / Non-Goals

**Goals:**

- Persist every `LetterEditor` field to the draft JSON file.
- Load draft data when opening `/letters/:id`.
- Create and persist a new draft when opening `/new` (with optional `parentId` from navigation state).
- Trigger debounced autosave (~2.5s) on each form change via `updateDraft`.
- Backward-compatible load of legacy drafts (`body` only → map to `content`, default empty strings for new fields).
- Keep existing window-close flush for pending debounced saves.

**Non-Goals:**

- Manual Save button or save-on-blur in the letter editor UI.
- Saving on every keystroke without debounce.
- Browser/dev-mode storage fallback beyond existing adapter warnings.
- Deleting or refactoring `Editor.tsx` (may remain dead code).

## Decisions

### 1. Extended `Draft` schema (flat fields)

**Choice:** Add explicit optional/string fields on `Draft` matching `LetterData`: `sender`, `notes`, `info`, `date` (ISO 8601 string or null), `content` (rich HTML), `footer`. Keep `recipient`, `subject`. Deprecate `body` in favor of `content` with migration on read.

**Rationale:** Flat JSON is easy to inspect, matches form shape, and avoids nested blobs.

**Alternatives:** Store entire `LetterData` as JSON string in `body` — rejected (harder to query/rename in explorer).

### 2. Mapping layer

**Choice:** `letterDraftMapping.ts` with `draftToLetterData(draft)` and `letterDataToDraftPartial(data, existingDraft?)`.

**Rationale:** Single place for legacy `body` → `content` and date parsing.

### 3. New draft lifecycle on `/new`

**Choice:** On mount of `/new`, immediately `addDraft` with empty fields and `parentId` from `location.state`, then `navigate(/letters/:id, { replace: true })` so all edits use a stable id and autosave.

**Rationale:** Avoids “no id until first save” edge cases; matches explorer flow that navigates to `/new` with `parentId`.

**Alternatives:** Lazy create on first keystroke — rejected (more complex, breadcrumb/title timing).

### 4. Autosave debounce interval

**Choice:** `AUTOSAVE_DEBOUNCE_MS = 2500` in `DraftContext`.

**Rationale:** User asked for “a few seconds”; 2.5s balances safety and disk I/O. Rich-text `content` changes batch naturally.

### 5. Editor wiring

**Choice:** `LetterEditor` uses `useParams`, `useLocation`, `useDrafts`, `useNavigate`. After load, `handleUpdate` updates local state and calls `updateDraft(id, letterDataToDraftPartial(...))`.

**Rationale:** Minimal change to `LetterEditorForm`; persistence stays in context.

### 6. Legacy draft migration on load

**Choice:** In adapter or mapping: if `content` missing and `body` present, set `content = body`. Default missing string fields to `""`, `date` to `null`.

**Rationale:** Existing user data remains openable.

## Risks / Trade-offs

- **[Risk] Double navigation flash on `/new`** → Use `replace: true`; show nothing or spinner until id assigned.
- **[Risk] Rich editor fires many onChange events** → Debounce in context batches writes; 2.5s limits churn.
- **[Risk] User closes app within debounce window** → Existing `onCloseRequested` flush remains required.
- **[Trade-off] `body` field retained briefly** → Write `content` only on save; read both for migration.

## Migration Plan

1. Extend `Draft` type and mapping helpers.
2. Update `loadAllDrafts` normalization (or mapping at load).
3. Wire `LetterEditor` + adjust debounce.
4. Verify Tauri: create letter, edit fields, restart app, data restored.
5. Open legacy draft file with only `body` — confirm content appears in editor.

Rollback: revert `LetterEditor` to local-only state; old JSON files remain valid.

## Open Questions

- None. Debounce fixed at 2.5s per user preference.
