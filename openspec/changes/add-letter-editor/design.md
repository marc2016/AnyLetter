## Context

The user needs a primary interface for creating and editing letters. A split-view approach allows for simultaneous data entry (metadata, content) and visualizing the final output (DIN A4 representation). The application relies on PrimeReact for UI components.

## Goals / Non-Goals

**Goals:**
- Implement a split-view layout using PrimeReact's `Splitter`.
- Implement a data entry form on the left pane with specific fields.
- Use `<FloatLabel>` to optimize vertical space and provide a modern look.
- Implement a responsive DIN A4 preview pane on the right.

**Non-Goals:**
- Fully implementing the live rendering of the letter inside the preview pane (for now, it's just a properly scaled placeholder).
- Generating PDF or printing functionality.

## Decisions

- **UI Framework:** Leverage PrimeReact `Splitter` for the layout, as it provides built-in drag-to-resize functionality which fits the split-view requirement perfectly.
- **Component Architecture:** The interface will be strictly separated into modular React components: a parent `LetterEditor` (managing the `Splitter` and state), a `LetterEditorForm` (left pane), and a `LetterPreview` (right pane) to ensure clean separation of concerns and maintainability.
- **Form Controls:** Use `<FloatLabel>` wrapping around `InputTextarea`, `InputText`, `Calendar`, and `Editor`. Float labels improve the UI aesthetics and are supported natively in PrimeReact v10.
- **Rich Text Editor:** Use PrimeReact's `<Editor>` component for the letter content. This requires adding `quill` to `package.json`.
- **Preview Scaling:** The DIN A4 preview will use a CSS container with an aspect ratio of `1 / 1.414`. It will scale down proportionally to fit smaller screens rather than requiring scrollbars.

## Risks / Trade-offs

- **Risk:** Quill editor styles might conflict with the app's global theme.
  - *Mitigation:* Ensure PrimeReact's Editor component is properly wrapped and scoped, applying theme overrides if necessary.
- **Risk:** Complex form state management across multiple rich/complex inputs.
  - *Mitigation:* Use standard React state management or a form library if necessary, keeping component structure clean.
