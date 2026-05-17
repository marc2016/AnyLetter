## MODIFIED Requirements

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
