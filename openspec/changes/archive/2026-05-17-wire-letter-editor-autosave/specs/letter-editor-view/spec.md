## ADDED Requirements

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
