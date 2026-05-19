## ADDED Requirements

### Requirement: Settings page route
The system SHALL provide a settings view at route `/settings` rendered within the application shell layout (Menubar and main content area).

#### Scenario: User navigates to settings
- **WHEN** the user opens `/settings`
- **THEN** the system displays the settings view in the main content area with the Menubar visible

### Requirement: Language setting on settings page
The settings view in v1 SHALL contain only the language preference control, allowing the user to switch between German and English.

#### Scenario: User sees language control on settings page
- **WHEN** the user is on the settings view
- **THEN** the system displays a labeled language selector for German and English

#### Scenario: User changes language from settings
- **WHEN** the user selects a different language on the settings page
- **THEN** the application UI language updates immediately across all views without requiring a restart

### Requirement: Settings entry in Menubar
The system SHALL provide a settings entry control in the Menubar `end` area that navigates to the settings view. The control SHALL display a gear icon (`pi-cog`) and SHALL show a localized tooltip on hover or keyboard focus. The control SHALL expose an accessible name matching the tooltip text.

#### Scenario: User opens settings from Menubar
- **WHEN** the user activates the settings gear control in the Menubar
- **THEN** the system navigates to `/settings`

#### Scenario: User sees settings tooltip
- **WHEN** the user hovers or focuses the settings gear control
- **THEN** the system displays a localized tooltip indicating settings

### Requirement: Settings breadcrumb navigation
When the user is on the settings view, the Menubar breadcrumb SHALL display a settings segment. The home breadcrumb control SHALL navigate to the file explorer root.

#### Scenario: User sees settings breadcrumb
- **WHEN** the user is on the settings view
- **THEN** the Menubar breadcrumb shows a settings segment

#### Scenario: User returns to explorer from settings via home
- **WHEN** the user is on the settings view and activates the home breadcrumb control
- **THEN** the system navigates to the file explorer root view
