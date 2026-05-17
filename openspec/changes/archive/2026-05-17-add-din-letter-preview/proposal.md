## Why

The current letter editor has a static placeholder for the DIN A4 preview. To provide a WYSIWYG (What You See Is What You Get) experience, users need to see their letter rendered exactly as it will appear on paper. This is especially critical for business letters where standard formatting (like DIN 5008) dictates precise placement of sender information, recipient addresses, and fold marks to ensure compatibility with standard windowed envelopes.

## What Changes

- Lift the letter form state up to a shared parent component (`LetterEditor`) to enable live data binding.
- Transform the static `LetterPreview` placeholder into a functional, live-rendering component.
- Implement a percentage-based, responsive CSS layout inside the preview container to perfectly match the DIN 5008 Form B standard.
- Add specific layout areas: Address Window (with Sender Line, Notes, and Recipient), Info Block & Date, Subject, Rich Text Content, and Footer.
- Render fold and punch hole marks on the left edge of the preview for enhanced realism and print orientation.

## Capabilities

### New Capabilities
(None)

### Modified Capabilities
- `letter-editor-view`: Requires adding live data binding, DIN 5008 (Form B) conformant layout elements (address window, info block, fold marks), and responsive percentage-based positioning for the preview pane.

## Impact

- **State Management**: Modifies `LetterEditor.tsx` to handle state and passes it to both `LetterEditorForm.tsx` and `LetterPreview.tsx`.
- **CSS Layout**: Introduces new relative/absolute CSS positioning logic to `LetterPreview.tsx`.
- **Rich Text Rendering**: Requires rendering HTML output from the PrimeReact Editor safely inside the preview pane.
