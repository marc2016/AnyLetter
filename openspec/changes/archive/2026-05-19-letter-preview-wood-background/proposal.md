## Why

The letter preview pane currently shows the DIN A4 page on a plain gray surface. A rustic wooden desk background makes the preview feel more like a real letter on a writing surface and improves visual appeal without affecting print/PDF output.

## What Changes

- Use the existing asset `src/assets/background_letter_wood.png` as the background of the letter preview pane (behind the A4 page, not on the page itself).
- Scale the A4 preview page slightly smaller (zoom out) so more of the wood texture is visible around the letter.
- Add a subtle drop shadow on the white page so it stands out against the busy wood grain.
- PDF export and DIN layout coordinates remain unchanged — only the interactive preview chrome changes.

## Capabilities

### New Capabilities

(None)

### Modified Capabilities

- `letter-editor-view`: Extend the DIN A4 preview pane requirement to include a wooden background image and a scaled-down page presentation in the preview container.

## Impact

- **Frontend**: `LetterPreview.tsx` — preview container background, page scaling/wrapper layout.
- **Assets**: `src/assets/background_letter_wood.png` (already present).
- **No impact** on PDF export, `dinLayout.ts`, or form behavior.
