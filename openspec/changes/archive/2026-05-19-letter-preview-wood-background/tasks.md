## 1. Preview pane chrome

- [x] 1.1 Import `background_letter_wood.png` in `LetterPreview.tsx` and apply it to the scrollable preview container (`background-size: cover`, centered, no repeat)
- [x] 1.2 Remove or override `surface-200` on the preview splitter panel in `LetterEditor.tsx` so the wood background is visible

## 2. Zoomed page presentation

- [x] 2.1 Wrap the existing A4 page element in a scale wrapper with `transform: scale(~0.88)` and `transform-origin: top center`, preserving internal `210mm × 297mm` dimensions
- [x] 2.2 Ensure scroll/center layout still works with the scaled wrapper (adequate padding/margin so the page does not clip)

## 3. Verification

- [x] 3.1 Manually verify preview shows wood border around the letter and DIN layout/focus highlights still align
- [x] 3.2 Manually verify PDF export is unchanged (white page only, no wood background)
