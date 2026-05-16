# file-explorer-view Specification

## Purpose
TBD - created by archiving change add-file-explorer. Update Purpose after archive.
## Requirements
### Requirement: Grid-based File Explorer
The system SHALL display a grid view of folders and letter drafts on the application startup screen, replacing the flat list view.

#### Scenario: User launches application
- **WHEN** the user starts the application
- **THEN** the startup view shows a grid of files and folders located at the root level

### Requirement: Breadcrumb Navigation
The system SHALL provide a breadcrumb navigation bar to allow users to navigate through folder hierarchies.

#### Scenario: User navigates into a folder
- **WHEN** the user double-clicks a folder in the grid
- **THEN** the grid updates to show the folder's contents and the breadcrumb updates to reflect the new path

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

