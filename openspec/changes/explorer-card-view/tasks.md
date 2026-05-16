## 1. Component Updates

- [x] 1.1 Update `FileGridItem` component to use PrimeReact `Card` instead of simple `div` and icons
- [x] 1.2 Modify `FileGridItem` props to accept `snippet` (for letters) and `itemCount` (for folders)
- [x] 1.3 Add CSS hover effects (`hover:shadow-4`) to the new `Card` implementation

## 2. Layout and Data Integration

- [x] 2.1 Update `FileGrid` CSS grid to increase the minimum column width (e.g., `minmax(250px, 1fr)`) to accommodate cards
- [x] 2.2 Update `FileExplorerView` to calculate and pass the `itemCount` for each folder
- [x] 2.3 Update `FileExplorerView` to calculate and pass the `snippet` (first 100 characters of body) for each letter
- [x] 2.4 Verify hover effects, truncation, and layout responsiveness
