## ADDED Requirements

### Requirement: Create and edit letter drafts
The system SHALL allow users to create a new letter draft and edit its fields, including recipient, subject, and body, within the editor view.

#### Scenario: User creates a new draft
- **WHEN** the user starts a new letter from the editor flow
- **THEN** the system creates a draft with empty editable fields and opens it for editing

#### Scenario: User updates an existing draft
- **WHEN** the user changes recipient, subject, or body in an opened draft
- **THEN** the system keeps the updated values in the active draft state

### Requirement: Delete letter drafts
The system MUST provide a way to delete an existing letter draft from the application.

#### Scenario: User deletes a draft from list view
- **WHEN** the user confirms draft deletion in the letter list
- **THEN** the system removes the draft and no longer shows it in the list or editor selection

### Requirement: Display draft list metadata
The system SHALL display a list of drafts with sufficient metadata to identify each letter, including subject and last updated timestamp.

#### Scenario: User views draft overview
- **WHEN** the user opens the draft list screen
- **THEN** the system shows all drafts with subject and last updated timestamp for each item

### Requirement: Plain text letter body
The letter body field SHALL accept and store plain text only. The system MUST NOT interpret the body as markdown or other markup for display or persistence in the MVP.

#### Scenario: User enters multiline plain text
- **WHEN** the user enters line breaks and characters in the body field
- **THEN** the system stores and displays the body as literal plain text without markdown rendering
