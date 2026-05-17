## ADDED Requirements

### Requirement: Application shell menubar chrome
The system SHALL render a PrimeReact Menubar as the persistent top application chrome, visible on all core views (file explorer and letter editor).

The Menubar `start` area SHALL display an envelope brand icon (`pi-envelope`), the application title "AnyLetter", and a PrimeReact BreadCrumb for contextual navigation. The Menubar `model` SHALL remain empty. The Menubar `end` area MAY be empty in this version to reserve space for future actions such as settings.

#### Scenario: User sees consistent shell on launch
- **WHEN** the user opens the application
- **THEN** the top of the window shows a Menubar with the envelope icon, "AnyLetter" title, and breadcrumb area

#### Scenario: User returns to letters root via brand
- **WHEN** the user clicks the envelope icon or "AnyLetter" title
- **THEN** the system navigates to the file explorer root view and resets folder breadcrumb to root

## MODIFIED Requirements

### Requirement: Provide in-app navigation for core views
The system MUST provide navigation between core views, including draft list and editor screens, using the global Menubar breadcrumb and brand controls instead of a separate back button.

#### Scenario: User navigates from list to editor
- **WHEN** the user selects a draft from the list
- **THEN** the system navigates to the editor view for the selected draft and the Menubar breadcrumb updates to reflect the editor context

#### Scenario: User navigates back to list via breadcrumb
- **WHEN** the user is on the editor view and activates the list/home breadcrumb segment
- **THEN** the system navigates to the file explorer view without requiring a dedicated back button
