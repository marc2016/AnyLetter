## Why

The file explorer grid currently uses simple icons and labels. While functional, upgrading the grid items to use PrimeReact `Card` components provides a more premium feel, allows displaying richer context (like letter snippets and folder stats), and enables better interactive hover effects, aligning with our goal of a modern, dynamic UI.

## What Changes

- Replace the simple icon-based `FileGridItem` with a PrimeReact `Card`-based component.
- Display a snippet (first ~100 characters) of the letter body on letter cards.
- Display the recipient on letter cards.
- Display the item count (number of children) on folder cards.
- Add hover effects (elevation/shadow) to the cards.
- Adjust the CSS Grid layout to accommodate wider cards (e.g., increasing minimum column width).

## Capabilities

### New Capabilities

### Modified Capabilities
- `file-explorer-view`: Grid item rendering requirements are changing to include rich card content and hover states.

## Impact

- `FileGridItem` component will be heavily updated to use PrimeReact `Card`.
- `FileGrid` CSS grid layout configuration will be adjusted.
- `FileExplorerView` or the context will need to compute and pass child counts for folders.
