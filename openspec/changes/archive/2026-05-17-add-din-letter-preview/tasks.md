## 1. State Management & Integration

- [x] 1.1 Define `LetterData` type/interface in `LetterEditor` or a shared types file.
- [x] 1.2 Implement `useState` in `LetterEditor` to manage the letter form data.
- [x] 1.3 Update `LetterEditorForm` to accept `data` and `onUpdate` props.
- [x] 1.4 Update `LetterPreview` to accept the `data` prop.
- [x] 1.5 Connect the form fields to the state in `LetterEditorForm` using the `onUpdate` callback.
- [x] 1.6 Implement `focusedField` state in `LetterEditor` and pass it along with focus/blur callbacks to `LetterEditorForm` and `LetterPreview`.

## 2. DIN A4 Preview Layout

- [x] 2.1 Update `LetterPreview.tsx` to use a `relative` container with the 1:1.414 aspect ratio.
- [x] 2.2 Implement the address window area (Sender, Notes, Recipient) using absolute positioning and percentages.
- [x] 2.3 Implement the Info Block and Date area on the right side using absolute positioning.
- [x] 2.4 Implement the Subject line rendering.
- [x] 2.5 Implement the Rich Text content rendering using `dangerouslySetInnerHTML`.
- [x] 2.6 Implement the Footer area at the bottom.

## 3. Visual Details & Polish

- [x] 3.1 Add CSS for Fold Marks (35.35% and 70.7%) on the left edge.
- [x] 3.2 Add CSS for the Punch Hole Mark (50%) on the left edge.
- [x] 3.3 Apply professional typography and spacing to match a printed letter aesthetic.
- [x] 3.4 Ensure responsive scaling of text using `cqw` or a similar technique if needed.
- [x] 3.5 Implement active-focus highlight border styles and animations in `LetterPreview` using the `focusedField` state.
