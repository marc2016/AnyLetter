# letter-editor-view Specification

## Purpose
Defines the layout and behavior of the main letter editing interface, including the split-view form and DIN A4 preview.
## Requirements
### Requirement: Split View Layout
The system SHALL display the letter editor as a split view, with a data entry form on the left and a document preview on the right.

#### Scenario: User opens letter editor
- **WHEN** the user navigates to the letter editor
- **THEN** the screen is divided into two distinct panes separated by a resizable splitter.

### Requirement: Form Fields with Float Labels
The system SHALL provide specific data entry fields on the left pane, arranged in a grid, and utilizing floating labels for a modern aesthetic.

#### Scenario: Displaying the form
- **WHEN** the form is rendered
- **THEN** it displays the following fields wrapped in Float Labels:
  - Row 1: Recipient (multiline), Sender (multiline)
  - Row 2: Notes (multiline), Info Block (multiline)
  - Row 3: Date (calendar picker)
  - Row 4: Subject (single line text)
  - Row 5: Content (rich text editor)
  - Row 6: Footer (multiline)

### Requirement: DIN A4 Preview Pane
The system SHALL display a preview pane on the right side that maintains the aspect ratio of a standard DIN A4 paper (1:1.414) and arranges elements according to the DIN 5008 (Form B) standard. The preview pane area behind the page SHALL use the asset `background_letter_wood.png` as a full-bleed background (`background-size: cover`, centered, no repeat). The white A4 page SHALL be rendered visually smaller than full size (zoomed out) so the wooden background is visible as a border around the sheet. The page SHALL retain fixed internal layout dimensions of 210mm × 297mm for DIN positioning. PDF export SHALL NOT include the wooden background or zoom scaling.

#### Scenario: Resizing the window
- **WHEN** the application window is resized
- **THEN** the DIN A4 preview page maintains its internal fixed physical dimensions (210mm x 297mm) for layout, appears scaled down within the preview pane, the wooden background fills the preview scroll area, and the container becomes scrollable if it is smaller than the scaled preview presentation

#### Scenario: DIN 5008 Layout Elements
- **WHEN** the preview is rendered
- **THEN** it MUST display the following elements in their standardized positions:
  - Sender Line (small) at the top of the address window area.
  - Notizblock (Notes) directly below the sender line.
  - Recipient Address below the notes within the address window area.
  - Date in the info block area with a localized label prefix and the formatted date value, left-aligned, sharing the same horizontal offset as the info block.
  - Info Block directly below the date, left-aligned, using the same horizontal offset as the date.
  - Subject line bolded above the main content.
  - Page numbering right-aligned above the footer.
  - Fold Marks for small letterhead (kleiner Briefkopf) at 87mm and 192mm from the top edge.
  - Punch Hole Mark at 148.5mm from the top edge.

#### Scenario: Wooden desk background visible
- **WHEN** the user views the letter editor preview pane
- **THEN** the area around the white A4 page shows the wooden background texture and the page is not flush against the pane edges at default zoom

#### Scenario: PDF export excludes preview chrome
- **WHEN** the user exports a letter to PDF
- **THEN** the PDF contains only the white A4 letter content without the wooden background or preview zoom scaling

### Requirement: Live Data Binding
The system SHALL ensure that all input from the letter editor form is immediately reflected in the DIN A4 preview pane without manual refresh.

#### Scenario: User types in form
- **WHEN** the user types text into any field in the letter editor form
- **THEN** the corresponding area in the DIN A4 preview is updated in real-time with the new content.

### Requirement: Interactive Field Highlighting
The system SHALL highlight the corresponding section in the DIN A4 preview pane when an input field in the editor form is focused.

#### Scenario: User focuses input field
- **WHEN** the user focuses or types in an input field (e.g., recipient, subject, date, notes)
- **THEN** the corresponding preview element in the DIN A4 pane shows a visual highlight border/outline.

#### Scenario: User blurs input field
- **WHEN** the user shifts focus away from an input field
- **THEN** any active highlighting on the corresponding preview element is removed.

### Requirement: Layout Navigation
The system SHALL provide a clear back-navigation path when editing or creating a letter to return to the file explorer overview.

#### Scenario: Navigating back to overview
- **WHEN** the user is in the letter editor view
- **THEN** a "Zurück" arrow button is rendered in the top header, and the brand title "AnyLetter" is made clickable, both navigating back to the main file explorer.

### Requirement: Draft persistence integration
The letter editor SHALL load and persist letter data through the application's draft storage layer (`DraftContext` and local JSON files), not isolated component state alone.

#### Scenario: User opens existing letter
- **WHEN** the user navigates to `/letters/:id` for a stored draft
- **THEN** the editor form and preview are populated from the persisted draft data

#### Scenario: User creates new letter
- **WHEN** the user navigates to `/new` (optionally with a folder parent from navigation state)
- **THEN** the system creates a new draft file, assigns a stable id, and subsequent edits autosave to that draft

#### Scenario: User edits and pauses
- **WHEN** the user changes any form field in the letter editor
- **THEN** the in-memory draft state updates immediately and the system schedules a debounced persist to local storage

#### Scenario: User returns after restart
- **WHEN** the user reopens the app and opens the same draft
- **THEN** all previously saved letter fields are restored in the editor

### Requirement: PDF export control in preview pane
The system SHALL display a floating export control fixed to the bottom-right corner of the letter preview pane. The control SHALL remain visible when the preview content scrolls.

#### Scenario: Export control visible in editor
- **WHEN** the user views the letter editor with the DIN A4 preview pane
- **THEN** an export control is shown at the bottom-right of the preview pane area

#### Scenario: Export control localized
- **WHEN** the application UI language is German or English
- **THEN** the export control accessible name/label is shown in the active language

### Requirement: PDF export from letter data
The system SHALL generate a PDF using `@react-pdf/renderer` from the current letter field data and DIN layout coordinates shared with the preview (including fold and punch marks at 87mm, 148.5mm, and 192mm from the top edge). The PDF layout SHALL use A4 page size with millimeter-based positioning. The PDF SHALL include a localized date label prefix, page numbering in the form "Seite x von y" or "Page x of y", and black text for all rendered letter fields.

#### Scenario: User exports a filled letter
- **WHEN** the user activates the export control while the letter contains data in one or more fields
- **THEN** the system produces a PDF that reflects the letter field values and DIN layout including fold and punch marks, localized date label, page numbers, and black typography

#### Scenario: Fold and punch marks in PDF
- **WHEN** the user exports a letter to PDF
- **THEN** the PDF includes fold marks at 87mm and 192mm and a punch mark at 148.5mm from the top edge

### Requirement: PDF export content without placeholders
During PDF generation, the system SHALL render only actual letter field data. Empty fields SHALL appear blank in the PDF. Placeholder text and sample body content shown in the interactive preview SHALL NOT appear in the exported PDF.

#### Scenario: Export with empty fields
- **WHEN** the user exports a letter with one or more empty form fields
- **THEN** the corresponding areas in the PDF are blank

#### Scenario: Export without focus highlights
- **WHEN** the user exports a letter while a form field is focused in the editor
- **THEN** the PDF does not include interactive focus highlight styling

### Requirement: Native save dialog for PDF export
The system SHALL prompt the user with the native save dialog to choose where to store the exported PDF file. The system SHALL generate and write PDF bytes only after the user confirms a path. If the user cancels the dialog, the system SHALL not generate a PDF file.

#### Scenario: User saves PDF successfully
- **WHEN** the user exports a letter and confirms a path in the native save dialog
- **THEN** the system generates a PDF and writes it to the selected location

#### Scenario: User cancels save dialog
- **WHEN** the user exports a letter and cancels the native save dialog
- **THEN** no file is written and the application remains in the editor without error

### Requirement: Suggested PDF filename from subject and date
The native save dialog SHALL suggest a default filename composed of the letter subject and today's date in the active application locale, with the `.pdf` extension. If the subject is empty or whitespace-only, the system SHALL use `Brief` as the subject part. The suggested filename SHALL be sanitized for the host filesystem (invalid characters removed or replaced).

#### Scenario: Suggested filename with subject
- **WHEN** the user exports a letter with subject "Angebot Fenster" on 2026-05-17 and the UI language is German
- **THEN** the save dialog suggests a filename containing "Angebot Fenster" and a locale-appropriate representation of today's date ending in `.pdf`

#### Scenario: Suggested filename without subject
- **WHEN** the user exports a letter with an empty subject
- **THEN** the save dialog suggests a filename starting with `Brief` followed by today's date and `.pdf`

### Requirement: Letter document black typography
All text rendered on the DIN A4 preview page and in the exported letter PDF SHALL use standard black (`#000000`), including sender, notes, recipient, date, info block, subject, content, footer, page number, and interactive preview placeholders.

#### Scenario: Preview typography is black
- **WHEN** the user views the letter preview with any combination of filled or placeholder fields
- **THEN** all visible letter text on the preview page is black

#### Scenario: PDF typography is black
- **WHEN** the user exports a letter to PDF
- **THEN** all rendered letter text in the PDF is black

### Requirement: Localized date label in preview and PDF
The system SHALL prefix the formatted letter date in the preview and PDF with a localized label: `Datum: ` in German and `Date: ` in English, followed by the locale-formatted date value.

#### Scenario: German date label in preview
- **WHEN** the active language is German and a date is shown in the DIN preview
- **THEN** the date line begins with `Datum: ` followed by the German-formatted date

#### Scenario: English date label in PDF
- **WHEN** the active language is English and the user exports a letter to PDF
- **THEN** the PDF date line begins with `Date: ` followed by the English-formatted date

### Requirement: Page numbering in preview and PDF
The system SHALL display page numbering right-aligned above the footer in the DIN preview and exported PDF. The format SHALL be localized (`Seite x von y` in German, `Page x of y` in English). Page numbering SHALL always be shown, including for single-page letters and when letter fields are empty.

#### Scenario: Single-page preview always shows page number
- **WHEN** the user views the letter preview for any draft
- **THEN** the preview shows page 1 of 1 in the active language above the footer on the right

#### Scenario: Single-page PDF shows page number
- **WHEN** the user exports a one-page letter to PDF
- **THEN** the PDF shows page 1 of 1 in the active language above the footer on the right

#### Scenario: Empty letter still shows page number in preview
- **WHEN** the user opens a new empty letter in the editor
- **THEN** the preview still shows page 1 of 1 above the footer

