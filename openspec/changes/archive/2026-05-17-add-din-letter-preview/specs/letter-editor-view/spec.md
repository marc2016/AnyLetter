## ADDED Requirements

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
  - Fold Marks at 105mm and 210mm from the top edge.
  - Punch Hole Mark at 148.5mm from the top edge.
