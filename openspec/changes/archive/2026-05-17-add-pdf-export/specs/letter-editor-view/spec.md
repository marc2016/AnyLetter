## MODIFIED Requirements

### Requirement: DIN A4 Preview Pane
The system SHALL display a preview pane on the right side that maintains the aspect ratio of a standard DIN A4 paper (1:1.414) and arranges elements according to the DIN 5008 (Form B) standard.

#### Scenario: Resizing the window
- **WHEN** the application window is resized
- **THEN** the DIN A4 preview pane maintains its fixed physical dimensions (210mm x 297mm), and the container becomes scrollable if it is smaller than the preview page.

#### Scenario: DIN 5008 Layout Elements
- **WHEN** the preview is rendered
- **THEN** it MUST display the following elements in their standardized positions:
  - Sender Line (small) at the top of the address window area.
  - Notizblock (Notes) directly below the sender line.
  - Recipient Address below the notes within the address window area.
  - Date at the top right of the info block area.
  - Info Block below the date.
  - Subject line bolded above the main content.
  - Fold Marks for small letterhead (kleiner Briefkopf) at 87mm and 192mm from the top edge.
  - Punch Hole Mark at 148.5mm from the top edge.

## ADDED Requirements

### Requirement: PDF export control in preview pane
The system SHALL display a floating export control fixed to the bottom-right corner of the letter preview pane. The control SHALL remain visible when the preview content scrolls.

#### Scenario: Export control visible in editor
- **WHEN** the user views the letter editor with the DIN A4 preview pane
- **THEN** an export control is shown at the bottom-right of the preview pane area

#### Scenario: Export control localized
- **WHEN** the application UI language is German or English
- **THEN** the export control accessible name/label is shown in the active language

### Requirement: PDF export from letter data
The system SHALL generate a PDF using `@react-pdf/renderer` from the current letter field data and DIN layout coordinates shared with the preview (including fold and punch marks at 87mm, 148.5mm, and 192mm from the top edge). The PDF layout SHALL use A4 page size with millimeter-based positioning.

#### Scenario: User exports a filled letter
- **WHEN** the user activates the export control while the letter contains data in one or more fields
- **THEN** the system produces a PDF that reflects the letter field values and DIN layout including fold and punch marks

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
