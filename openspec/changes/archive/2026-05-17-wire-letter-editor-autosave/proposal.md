## Why

The split-view `LetterEditor` keeps all letter content in local React state only and never calls `DraftContext`, so edits are lost when leaving the view or restarting the Tauri app. The storage layer and debounced autosave already exist for the legacy editor but are unused by the current UI. Users expect every field in the letter form to persist automatically after a short pause while typing.

## What Changes

- Wire `LetterEditor` to `DraftContext`: load existing drafts by route id, create a draft file when opening `/new`, and call `updateDraft` on every form change.
- Extend the `Draft` model and JSON file schema to include all letter editor fields (sender, recipient, notes, info, date, subject, content, footer) instead of only recipient, subject, and body.
- Increase autosave debounce to approximately 2.5 seconds; flush pending saves on app window close (existing behavior).
- Migrate or default missing fields when loading older draft JSON files.
- Map `LetterData` ↔ `Draft` in one place (load/save helpers).
- Remove or deprecate reliance on the unused `Editor.tsx` save-on-blur flow for routed views.

## Capabilities

### New Capabilities

_None._

### Modified Capabilities

- `local-letter-storage`: Extended draft schema for full letter fields; debounce interval and autosave scope updated to cover all editor fields.
- `letter-editor-view`: Editor must persist and restore full letter data via local storage integration.

## Impact

- `src/models/Draft.ts` (or `draft.ts`) — extended interface
- `src/storage/adapter.ts` — load/save normalization for legacy drafts
- `src/context/DraftContext.tsx` — debounce constant (~2500 ms)
- `src/components/views/LetterEditor/LetterEditor.tsx` — route params, context wiring, autosave on change
- Optional: `src/utils/letterDraftMapping.ts` — `LetterData` ↔ `Draft` conversion
- `openspec/specs/local-letter-storage/spec.md`, `openspec/specs/letter-editor-view/spec.md` (via deltas)
- Explorer grid may show richer snippets once `content`/`subject` persist from editor
