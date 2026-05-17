# file-explorer-view Specification

## Purpose
TBD - created by archiving change add-file-explorer. Update Purpose after archive.
## Requirements
### Requirement: Grid-based File Explorer
The system SHALL display a grid view of folders and letter drafts on the application startup screen, replacing the flat list view. The grid items SHALL be rendered as rich cards displaying additional context inside the card, including the modification date, text snippets for letters, and child item counts for folders, and SHALL exhibit interactive hover elevation effects.

#### Scenario: User launches application
- **WHEN** the user starts the application
- **THEN** the startup view shows a grid of files and folders rendered as interactive cards located at the root level

### Requirement: Breadcrumb Navigation
The system SHALL provide breadcrumb navigation for folder hierarchies in the global application Menubar (not as a separate control inside the explorer content area), allowing users to navigate through folder paths and return to the explorer root.

#### Scenario: User navigates into a folder
- **WHEN** the user double-clicks a folder in the grid
- **THEN** the grid updates to show the folder's contents and the Menubar breadcrumb updates to reflect the new path

#### Scenario: User navigates via breadcrumb segment
- **WHEN** the user clicks a folder segment in the Menubar breadcrumb
- **THEN** the explorer grid updates to show that folder's contents

#### Scenario: User returns to explorer root via breadcrumb home
- **WHEN** the user clicks the home segment in the Menubar breadcrumb while in a subfolder
- **THEN** the explorer shows root-level folders and files and the breadcrumb reflects the root

### Requirement: Item Context Menu
The system SHALL provide a context menu for items (folders and files) when right-clicked, offering rename, move, and delete actions.

#### Scenario: User right-clicks an item
- **WHEN** the user right-clicks an item in the grid
- **THEN** a context menu appears with options to Rename, Move, and Delete

### Requirement: Sort Controls
The system SHALL allow sorting of items in the grid view by name or modification date via a dropdown.

#### Scenario: User changes sort order
- **WHEN** the user selects "Sort by Name" from the dropdown
- **THEN** the items in the grid are reordered alphabetically

### Requirement: Folder Rendering Priority
The system SHALL render folders before files in the grid view, regardless of the active sorting method.

#### Scenario: Mixed content sorting
- **WHEN** the grid contains both files and folders and is sorted by date
- **THEN** all folders appear first sorted by date, followed by all files sorted by date

### Requirement: Delete Confirmation
The system SHALL display a confirmation dialog before deleting any item (file or folder).

#### Scenario: User attempts to delete an item
- **WHEN** the user selects the "Delete" action from the context menu
- **THEN** a confirmation dialog appears asking if the user is sure, and the deletion only proceeds if confirmed
