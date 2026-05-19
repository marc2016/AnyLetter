## 1. Plain-text snippets

- [x] 1.1 Add `htmlToPlainText` utility (DOMParser + trim) with unit tests for Quill HTML samples
- [x] 1.2 Use utility in `FileExplorerView` to build ~100-character snippets with ellipsis when longer

## 2. Single-click navigation

- [x] 2.1 Replace `onDoubleClick` with `onClick` on `FileGridItem` and rename handler in `FileExplorerView`

## 3. Fixed grid card sizing

- [x] 3.1 Update `FileGrid` to fixed column width (280px, no `1fr` stretch)
- [x] 3.2 Set uniform fixed height on `FileGridItem` cards; ensure title/snippet overflow is clipped

## 4. Verification

- [x] 4.1 Manually verify: no HTML in snippets, single-click opens folder/letter, cards keep size on window resize
