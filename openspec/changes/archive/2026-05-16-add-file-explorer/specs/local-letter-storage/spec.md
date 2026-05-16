## ADDED Requirements

### Requirement: Support hierarchical storage via Folders
The system SHALL support creating, renaming, and deleting Folder entities, and saving them to local storage.

#### Scenario: User creates a folder
- **WHEN** the user creates a new folder
- **THEN** the folder metadata is persisted to local storage

### Requirement: Parent-child relationship for drafts and folders
The system SHALL support a `parentId` field on drafts and folders to establish a hierarchical structure.

#### Scenario: User moves a draft into a folder
- **WHEN** the user moves a draft to a specific folder
- **THEN** the draft's `parentId` is updated to the folder's ID and persisted

## MODIFIED Requirements

### Requirement: Restore drafts on app startup
The system MUST discover all draft and folder JSON files (or unified storage files) in the storage directory during application startup and load every valid item into application state, maintaining their hierarchical relationships.

#### Scenario: Multiple draft and folder files exist
- **WHEN** the user launches the app and several valid items exist in the directory
- **THEN** the system loads all valid items and reconstructs the hierarchy based on `parentId`
