## MODIFIED Requirements

### Requirement: Application shell menubar chrome
The system SHALL render a PrimeReact Menubar as the persistent top application chrome, visible on all core views (file explorer and letter editor).

The Menubar `start` area SHALL display an envelope brand icon (`pi-envelope`), the application title "AnyLetter", and a PrimeReact BreadCrumb for contextual navigation. The Menubar `model` SHALL remain empty. The Menubar `end` area SHALL display a dropdown language selector (with flag and label per option) allowing the user to switch between German and English.

#### Scenario: User sees consistent shell on launch
- **WHEN** the user opens the application
- **THEN** the top of the window shows a Menubar with the envelope icon, "AnyLetter" title, breadcrumb area, and language selector

#### Scenario: User returns to letters root via brand
- **WHEN** the user clicks the envelope icon or "AnyLetter" title
- **THEN** the system navigates to the file explorer root view and resets folder breadcrumb to root

#### Scenario: User changes language from shell
- **WHEN** the user selects a different language from the Menubar language selector
- **THEN** the application UI language updates across all views
