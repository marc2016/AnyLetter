## MODIFIED Requirements

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
