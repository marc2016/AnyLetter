## MODIFIED Requirements

### Requirement: Grid-based File Explorer
The system SHALL display a grid view of folders and letter drafts on the application startup screen, replacing the flat list view. The grid items SHALL be rendered as rich cards displaying additional context inside the card, including the modification date, text snippets for letters, and child item counts for folders, and SHALL exhibit interactive hover elevation effects.

#### Scenario: User launches application
- **WHEN** the user starts the application
- **THEN** the startup view shows a grid of files and folders rendered as interactive cards located at the root level
