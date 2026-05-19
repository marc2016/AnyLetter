## Why

The file explorer grid cards show raw HTML in letter preview snippets, require a double-click to open items, and resize with the window because columns use flexible `1fr` sizing. These issues make the dashboard feel broken and harder to scan than intended.

## What Changes

- Strip HTML from letter content before generating the ~100-character preview snippet (plain text only).
- Open folders and letters with a single click on the card (replacing double-click).
- Use a fixed card width in the grid so tiles do not stretch when the window is resized.
- Give all grid cards a uniform height so the layout stays visually consistent.

## Capabilities

### New Capabilities

_None._

### Modified Capabilities

- `file-explorer-view`: Snippet generation, card interaction (single-click open), and grid card sizing requirements.

## Impact

- `FileExplorerView` — snippet extraction logic
- `FileGrid` — CSS grid column definition
- `FileGridItem` — click handler, fixed dimensions
- New or shared utility for HTML-to-plain-text conversion
- `openspec/specs/file-explorer-view/spec.md` — delta for navigation and grid behavior
