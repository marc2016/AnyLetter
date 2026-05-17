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
  - Date in the info block area with a localized label prefix and the formatted date value, left-aligned, sharing the same horizontal offset as the info block.
  - Info Block directly below the date, left-aligned, using the same horizontal offset as the date.
  - Subject line bolded above the main content.
  - Page numbering right-aligned above the footer.
  - Fold Marks for small letterhead (kleiner Briefkopf) at 87mm and 192mm from the top edge.
  - Punch Hole Mark at 148.5mm from the top edge.

### Requirement: PDF export from letter data
The system SHALL generate a PDF using `@react-pdf/renderer` from the current letter field data and DIN layout coordinates shared with the preview (including fold and punch marks at 87mm, 148.5mm, and 192mm from the top edge). The PDF layout SHALL use A4 page size with millimeter-based positioning. The PDF SHALL include a localized date label prefix, page numbering in the form "Seite x von y" or "Page x of y", and black text for all rendered letter fields.

#### Scenario: User exports a filled letter
- **WHEN** the user activates the export control while the letter contains data in one or more fields
- **THEN** the system produces a PDF that reflects the letter field values and DIN layout including fold and punch marks, localized date label, page numbers, and black typography

#### Scenario: Fold and punch marks in PDF
- **WHEN** the user exports a letter to PDF
- **THEN** the PDF includes fold marks at 87mm and 192mm and a punch mark at 148.5mm from the top edge

## ADDED Requirements

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
