## ADDED Requirements

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
The system SHALL display a preview pane on the right side that maintains the aspect ratio of a standard DIN A4 paper (1:1.414).

#### Scenario: Resizing the window
- **WHEN** the application window is resized
- **THEN** the DIN A4 preview pane proportionally scales down to ensure it remains completely visible without requiring scrollbars.
