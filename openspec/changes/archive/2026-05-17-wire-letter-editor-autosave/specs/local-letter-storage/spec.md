## MODIFIED Requirements

### Requirement: Debounced autosave while editing
The system SHALL persist draft changes to that draft's JSON file after the user pauses editing for approximately 2.5 seconds (configurable debounce interval) following changes to any letter editor field, including sender, recipient, notes, info, date, subject, content (rich text), and footer.

#### Scenario: User types and pauses
- **WHEN** the user edits any letter editor field and then stops changing input for longer than the configured debounce period
- **THEN** the system writes the current full draft state to the corresponding JSON file in local storage

#### Scenario: User closes app before debounce elapses
- **WHEN** the user closes the application window while a debounced save is still pending
- **THEN** the system flushes pending draft writes to disk before shutdown completes

## ADDED Requirements

### Requirement: Full letter field persistence in draft files
The system SHALL store all letter editor fields in each draft JSON file: sender, recipient, notes, info, date, subject, content, and footer, in addition to metadata (id, parentId, createdAt, updatedAt).

#### Scenario: User edits multiple fields
- **WHEN** the user changes sender, date, and content in the letter editor and the debounced save runs
- **THEN** the draft JSON file on disk contains the updated values for all changed fields

### Requirement: Legacy draft migration on load
The system SHALL load drafts that only contain the legacy `body` field by mapping `body` to `content` and defaulting any missing letter fields to empty values without failing to load other drafts.

#### Scenario: Legacy draft file opened
- **WHEN** the app loads a draft JSON file with `body` but no `content` field
- **THEN** the letter editor displays the former body text as content and other fields appear empty
