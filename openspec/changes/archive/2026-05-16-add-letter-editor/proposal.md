## Why

The core functionality of AnyLetter requires a modern and intuitive interface for drafting and previewing letters. We need a split-view layout that allows users to edit letter metadata (recipient, sender, date, subject, etc.) and rich-text content on one side, while instantly visualizing how it looks on a DIN A4 page on the other side.

## What Changes

- Introduce a new split-view layout for the main letter editor using PrimeReact `Splitter`.
- Implement a form on the left side utilizing PrimeReact components (`InputText`, `InputTextarea`, `Calendar`, `Editor`) wrapped in `<FloatLabel>` for a clean and space-efficient modern design.
- Define specific form fields: Recipient, Sender, Notes, Info Block, Date, Subject, Content (Rich Text), and Footer.
- Implement a responsive DIN A4 preview placeholder on the right side that scales down proportionally to fit the available screen space.
- Add `quill` as a new dependency to support the PrimeReact `Editor` component for rich text editing.

## Capabilities

### New Capabilities
- `letter-editor-view`: Defines the layout, form fields, and responsive behavior of the split-view letter editor interface.

### Modified Capabilities
- (None)

## Impact

- **Dependencies**: Requires adding `quill` to `package.json` for the PrimeReact `Editor` component.
- **UI Architecture**: Adds a major new view to the application, serving as the primary workspace for letter creation.
- **Routing**: Likely requires a new route for the letter editor view (if not replacing an existing one).
