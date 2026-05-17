## 1. Draft model and mapping

- [x] 1.1 Extend `Draft` interface with sender, notes, info, date, content, footer (retain recipient, subject; migrate `body` → `content` on read)
- [x] 1.2 Add `src/utils/letterDraftMapping.ts` with `draftToLetterData` and `letterDataToDraftPartial`
- [x] 1.3 Normalize legacy drafts in load path (map `body` to `content`, default missing fields)

## 2. Autosave timing

- [x] 2.1 Set `AUTOSAVE_DEBOUNCE_MS` to 2500 in `DraftContext` and use it for `updateDraft`
- [x] 2.2 Verify window-close handler still flushes pending debounced saves

## 3. LetterEditor integration

- [x] 3.1 Wire `LetterEditor` with `useParams`, `useLocation`, `useNavigate`, and `useDrafts`
- [x] 3.2 On `/new`: create draft via `addDraft` (with `parentId` from state), redirect to `/letters/:id` with replace
- [x] 3.3 On `/letters/:id`: load draft into `letterData` on mount; redirect to explorer if missing
- [x] 3.4 Update `handleUpdate` to call `updateDraft` with mapped partial after local state update
- [x] 3.5 Handle loading state while draft is resolving (avoid flash of empty form on existing id)

## 4. Verification

- [x] 4.1 Tauri manual test: edit all field types, wait 3s, restart app — data restored
- [x] 4.2 Tauri manual test: new letter from folder — `parentId` preserved in JSON file
- [x] 4.3 Open a legacy draft (body-only JSON) — content appears in editor
