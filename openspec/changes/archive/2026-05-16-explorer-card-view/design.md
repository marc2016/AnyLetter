## Context

The file explorer grid was recently introduced using simple icons and text. We want to upgrade these to rich PrimeReact `Card` components with hover effects and more context (e.g. letter snippets, folder child counts).

## Goals / Non-Goals

**Goals:**
- Replace simple grid items with `Card` components.
- Show the first ~100 characters of a letter as a preview snippet.
- Show the number of items inside a folder.
- Add CSS hover elevation.

**Non-Goals:**
- Full rich-text rendering inside the snippet.
- Recursive deep child counting for folders (only immediate children will be counted).

## Decisions

1. **Card Component**: Use PrimeReact's `Card` component.
   - *Rationale*: It's the standard component library we are using, providing a consistent look and feel out of the box.

2. **Snippet Generation**: Extract the first 100 characters of the `body` field of a `Draft` and append `...` if longer.
   - *Rationale*: Simple and fast without heavy parsing.

3. **Folder Child Count**: The `FileExplorerView` or `FileGridItem` will receive a `childCount` prop for folders, calculated in the parent view based on the current state.
   - *Rationale*: Calculating it in the view is easy since we already have all drafts and folders in context.

4. **Layout**: Update `FileGrid` CSS grid to use `minmax(250px, 1fr)` instead of `120px` to fit the cards nicely.

## Risks / Trade-offs

- **Risk**: Extracting snippets from raw text might look ugly if the text starts with many empty lines.
  - *Mitigation*: Trim whitespace before slicing the snippet.
