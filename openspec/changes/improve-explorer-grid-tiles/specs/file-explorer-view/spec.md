## MODIFIED Requirements

### Requirement: Grid-based File Explorer
The system SHALL display a grid view of folders and letter drafts on the application startup screen, replacing the flat list view. The grid items SHALL be rendered as rich cards with a fixed width and uniform height so tiles do not resize when the browser window changes. Letter card preview text SHALL be plain text derived from letter content with HTML markup removed, truncated to approximately 100 characters. Cards SHALL display the modification date, plain-text snippets for letters, and child item counts for folders, and SHALL exhibit interactive hover elevation effects.

#### Scenario: User launches application
- **WHEN** the user starts the application
- **THEN** the startup view shows a grid of files and folders rendered as interactive cards of consistent size located at the root level

#### Scenario: Letter card shows plain-text snippet
- **WHEN** a letter draft has HTML content in its body
- **THEN** the card preview shows readable plain text without HTML tags, truncated to approximately 100 characters

#### Scenario: Grid cards maintain fixed size on resize
- **WHEN** the user resizes the browser window
- **THEN** individual card width and height remain unchanged and only the number of columns may change

### Requirement: Breadcrumb Navigation
The system SHALL provide breadcrumb navigation for folder hierarchies in the global application Menubar (not as a separate control inside the explorer content area), allowing users to navigate through folder paths and return to the explorer root.

#### Scenario: User navigates into a folder
- **WHEN** the user clicks a folder card in the grid
- **THEN** the grid updates to show the folder's contents and the Menubar breadcrumb updates to reflect the new path

#### Scenario: User navigates via breadcrumb segment
- **WHEN** the user clicks a folder segment in the Menubar breadcrumb
- **THEN** the explorer grid updates to show that folder's contents

#### Scenario: User returns to explorer root via breadcrumb home
- **WHEN** the user clicks the home segment in the Menubar breadcrumb while in a subfolder
- **THEN** the explorer shows root-level folders and files and the breadcrumb reflects the root

#### Scenario: User opens a letter from the grid
- **WHEN** the user clicks a letter card in the grid
- **THEN** the application navigates to the letter editor for that draft
