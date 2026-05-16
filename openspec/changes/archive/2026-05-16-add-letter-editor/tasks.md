## 1. Setup

- [x] 1.1 Add `quill` dependency to `package.json` and install via `npm install`.
- [x] 1.2 Create the new `LetterEditor` parent component structure, along with separate `LetterEditorForm` (left pane) and `LetterPreview` (right pane) subcomponents, and register the route.

## 2. Layout Implementation

- [x] 2.1 Implement PrimeReact `Splitter` for the main layout.
- [x] 2.2 Create the DIN A4 preview placeholder component for the right pane.
- [x] 2.3 Style the preview pane with CSS aspect-ratio `1 / 1.414` and responsive scaling.

## 3. Form Implementation

- [x] 3.1 Implement Row 1: Recipient and Sender fields using `<FloatLabel>` and `<InputTextarea>`.
- [x] 3.2 Implement Row 2: Notes and Info Block fields using `<FloatLabel>` and `<InputTextarea>`.
- [x] 3.3 Implement Row 3: Date field using `<FloatLabel>` and `<Calendar>`.
- [x] 3.4 Implement Row 4: Subject field using `<FloatLabel>` and `<InputText>`.
- [x] 3.5 Implement Row 5: Content field using `<FloatLabel>` and `<Editor>`.
- [x] 3.6 Implement Row 6: Footer field using `<FloatLabel>` and `<InputTextarea>`.
- [x] 3.7 Apply PrimeFlex classes to arrange the form fields in a 2-column grid layout for the appropriate rows.
