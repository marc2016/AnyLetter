# local-letter-storage Specification

## Purpose
TBD - created by archiving change build-letter-app-tauri-react. Update Purpose after archive.
## Requirements
### Requirement: Persist drafts locally as separate files
The system SHALL persist letter drafts to local device storage without any external network service. Each draft SHALL be stored as its own JSON file within an application-managed directory. The system MUST NOT rely on a single monolithic JSON file that contains all drafts for MVP.

#### Scenario: New draft is created
- **WHEN** the user creates a new draft
- **THEN** the system creates a new JSON file for that draft in the drafts directory

#### Scenario: Existing draft is updated
- **WHEN** a draft’s data changes and is persisted
- **THEN** the system writes the updated content to that draft’s JSON file only

### Requirement: Debounced autosave while editing
The system SHALL persist draft changes to that draft’s JSON file after the user pauses editing for a debounce interval following changes to recipient, subject, or body.

#### Scenario: User types and pauses
- **WHEN** the user edits a draft field and then stops changing input for longer than the configured debounce period
- **THEN** the system writes the current draft state to the corresponding JSON file in local storage

### Requirement: Restore drafts on app startup
The system MUST discover all draft JSON files in the storage directory during application startup and load every valid draft into application state.

#### Scenario: Multiple draft files exist
- **WHEN** the user launches the app and several valid draft JSON files exist in the directory
- **THEN** the system loads all valid drafts and displays them in the draft list

### Requirement: Delete draft removes its file
The system SHALL remove a draft’s JSON file from local storage when that draft is deleted in the application.

#### Scenario: User deletes a draft
- **WHEN** the user confirms deletion of a draft
- **THEN** the system deletes that draft’s JSON file and the draft no longer appears after the next load

### Requirement: Handle invalid storage data safely
The system SHALL handle invalid or corrupted individual draft files without crashing. A failure for one file MUST NOT prevent loading other valid draft files.

#### Scenario: One draft file is invalid
- **WHEN** the app reads a malformed or incompatible JSON file for a single draft
- **THEN** the system skips that draft or recovers with an empty state for that id only, preserves a recoverable backup of the invalid file if applicable, and continues loading remaining drafts

