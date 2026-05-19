## Context

The file explorer (`FileExplorerView` at `/letters`) renders folders and letter drafts as PrimeReact `Card` components in a CSS grid (`FileGrid` / `FileGridItem`). Letter previews are built by slicing the first 100 characters of `draft.content`, which is Quill HTML. Cards open on double-click and use `grid-template-columns: repeat(auto-fill, minmax(250px, 1fr))`, causing tiles to stretch horizontally when the viewport changes.

## Goals / Non-Goals

**Goals:**

- Show plain-text preview snippets (~100 characters) with no visible HTML markup.
- Open folders and letters with a single click on the card.
- Use fixed card width and uniform card height across all grid items.

**Non-Goals:**

- Rich-text or formatted preview inside cards.
- Changing context menu, sort, search, or breadcrumb behavior beyond updating navigation trigger from double-click to single-click.
- Redesigning card visual style beyond sizing and interaction.

## Decisions

1. **HTML to plain text**: Add a small `htmlToPlainText(html: string)` utility using `DOMParser` and `textContent`, consistent with `quillHtmlToPdf.tsx`. Trim whitespace, collapse internal line breaks to spaces if needed, then slice to 100 characters and append `...` when longer.
   - *Rationale*: Reliable for Quill output; avoids fragile regex stripping.
   - *Alternative*: Regex tag removal — rejected due to edge cases.

2. **Single-click navigation**: Replace `onDoubleClick` with `onClick` on `FileGridItem` for both `file` and `folder` types. Keep the same handler in `FileExplorerView` (`handleItemDoubleClick` can be renamed to `handleItemClick`).
   - *Rationale*: Matches user expectation for card UIs; entire card is already styled as clickable.
   - *Alternative*: Keep double-click and add click — rejected as redundant.

3. **Fixed grid width**: Change `FileGrid` to `repeat(auto-fill, 280px)` (no `1fr` max). Optionally expose width via a CSS variable on the grid container.
   - *Rationale*: Prevents horizontal stretching; 280px is close to current minimum and fits card content.
   - *Alternative*: `minmax(280px, 280px)` — equivalent; use whichever reads clearer.

4. **Uniform card height**: Set a fixed height on the card wrapper (e.g. `height: 220px` or `min-height` + flex layout) so folder and letter cards align. Use existing `line-clamp` on snippet and ellipsis on title to prevent overflow.
   - *Rationale*: User requested equal height for visual consistency.
   - *Alternative*: `grid-auto-rows` on the grid — also valid; fixed height on item is simpler to tune per card content.

5. **Snippet length**: Keep 100 characters after HTML stripping, as in the original card-view design.

## Risks / Trade-offs

- **Risk**: `DOMParser` is unavailable in non-browser environments (tests).
  - *Mitigation*: Unit-test `htmlToPlainText` with jsdom (already used in Vitest) or mock `DOMParser` in tests.

- **Risk**: Very short or empty content after stripping shows placeholder only.
  - *Mitigation*: Existing `defaults.noContent` fallback remains.

- **Trade-off**: Single-click may conflict with text selection on cards — `select-none` is already applied on the wrapper.

## Migration Plan

No data migration. Deploy as a frontend-only change. Users accustomed to double-click will get single-click immediately.

## Open Questions

_None — sizing (280px width, uniform height) and 100-character snippets confirmed with stakeholder._
