# desktop-shell Specification

## Purpose
TBD - created by archiving change build-letter-app-tauri-react. Update Purpose after archive.
## Requirements
### Requirement: Launch desktop shell with letter workspace
The system SHALL start as a desktop application window and load the React letter workspace as the primary interface.

#### Scenario: User launches the application
- **WHEN** the user opens the installed app
- **THEN** the system shows a desktop window containing the letter list and editor navigation

### Requirement: Application shell menubar chrome
The system SHALL render a PrimeReact Menubar as the persistent top application chrome, visible on all core views (file explorer and letter editor).

The Menubar `start` area SHALL display an envelope brand icon (`pi-envelope`), the application title "AnyLetter", and a PrimeReact BreadCrumb for contextual navigation. The Menubar `model` SHALL remain empty. The Menubar `end` area SHALL display a dropdown language selector (with flag and label per option) allowing the user to switch between German and English.

#### Scenario: User sees consistent shell on launch
- **WHEN** the user opens the application
- **THEN** the top of the window shows a Menubar with the envelope icon, "AnyLetter" title, breadcrumb area, and language selector

#### Scenario: User changes language from shell
- **WHEN** the user selects a different language from the Menubar language selector
- **THEN** the application UI language updates across all views

#### Scenario: User returns to letters root via brand
- **WHEN** the user clicks the envelope icon or "AnyLetter" title
- **THEN** the system navigates to the file explorer root view and resets folder breadcrumb to root

### Requirement: Provide in-app navigation for core views
The system MUST provide navigation between core views, including draft list and editor screens, using the global Menubar breadcrumb and brand controls instead of a separate back button.

#### Scenario: User navigates from list to editor
- **WHEN** the user selects a draft from the list
- **THEN** the system navigates to the editor view for the selected draft and the Menubar breadcrumb updates to reflect the editor context

#### Scenario: User navigates back to list via breadcrumb
- **WHEN** the user is on the editor view and activates the list/home breadcrumb segment
- **THEN** the system navigates to the file explorer view without requiring a dedicated back button

### Requirement: Preserve unsaved user work during session
The system SHALL prevent accidental session data loss by synchronizing draft state changes before app window close completes.

#### Scenario: User closes the app after editing
- **WHEN** the user closes the app window with recently changed draft content
- **THEN** the system persists pending draft changes before shutdown completes
