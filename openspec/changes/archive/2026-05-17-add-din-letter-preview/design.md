## Context

The `LetterEditor` view currently consists of a functional form (`LetterEditorForm`) and a static placeholder preview (`LetterPreview`). To improve the user experience and provide real-time feedback, we need to bind the form data to the preview and render it accurately according to the DIN 5008 (Form B) standard for German business letters.

## Goals / Non-Goals

**Goals:**
- Implement a centralized state in `LetterEditor` to manage the letter data.
- Pass this state down to the form and the preview components.
- Implement a percentage-based, relative CSS coordinate system in `LetterPreview` to precisely place elements (address, date, subject, etc.) according to DIN 5008 proportions.
- Include visual fold and punch hole marks on the left margin.
- Ensure the preview scales responsively within its container while maintaining the 1:1.414 aspect ratio.
- Implement real-time focus highlighting: when an input field in the editor form is focused, the corresponding section in the DIN A4 preview should be highlighted/outlined with a smooth CSS transition.

**Non-Goals:**
- Full WYSIWYG editing inside the preview itself (editing remains in the form).
- PDF generation or printing (out of scope for this specific change).
- Multi-page letter support. The preview will focus on rendering a single page for now.

## Decisions

- **State Management**: We will use React `useState` at the `LetterEditor` level. A custom type `LetterData` will be defined to hold the form fields (`sender`, `recipient`, `notes`, `info`, `date`, `subject`, `content`, `footer`).
- **Interactive Field Highlighting**: We will lift an additional state `focusedField: string | null` in `LetterEditor`.
  - The `LetterEditorForm` will trigger `onFocusField(fieldName)` on `onFocus` of any field, and `onFocusField(null)` on `onBlur`.
  - The `LetterPreview` will receive `focusedField` as a prop and apply a highlight class (e.g., a dashed transition outline or active glow effect) to the matching absolute-positioned elements.
- **Layout System**: The DIN A4 preview will use `position: relative` with an `aspect-ratio: 1 / 1.414`. Child elements will use `position: absolute` with percentage (`%`) values for `top` and `left` to ensure perfect proportional scaling across any screen size.
- **DIN 5008 Mapping**: We will use the following approximate percentage mappings based on DIN 5008 Form B (210mm x 297mm):
  - Sender Line (Rücksendeangabe): `top: 10%`, `left: 12%`
  - Notes (Zusatz-/Vermerkzone): `top: 13%`, `left: 12%`
  - Recipient Address (Anschriftenzone): `top: 17%`, `left: 12%`
  - Date (in Info Block): `top: 10%`, `left: 60%`
  - Info Block Data: `top: 14%`, `left: 60%`
  - Subject: `top: 35%`, `left: 12%`
  - Rich Text Content: `top: 42%`, `left: 12%`
  - Footer: `bottom: 5%`, `left: 12%`
  - Fold Mark 1: `top: 35.35%`, `left: 0`
  - Punch Mark: `top: 50%`, `left: 0`
  - Fold Mark 2: `top: 70.7%`, `left: 0`
- **Rich Text Rendering**: The HTML output from PrimeReact's `Editor` component will be rendered using `dangerouslySetInnerHTML`. We will apply CSS to ensure the rich text styles (like margins and fonts) fit the letter aesthetic.

## Risks / Trade-offs

- **Risk**: The rich text content might overflow the single DIN A4 page.
  - **Mitigation**: We will add `overflow: hidden` to the main text container for now to prevent breaking the layout, and address pagination in a future feature.
- **Risk**: The percentage-based layout might look incorrect if the font size doesn't scale proportionally with the container.
  - **Mitigation**: We will use container query length units (`cqw`) for font sizes inside the preview, or use a CSS `transform: scale()` approach if container queries are too complex, ensuring text scales perfectly with the paper size.

