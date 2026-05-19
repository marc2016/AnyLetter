## MODIFIED Requirements

### Requirement: Language selector in application shell
The system SHALL provide a language selector control on the settings page allowing the user to switch between German and English at any time. The selector SHALL be implemented as a dropdown showing each language option with a country flag icon and label inside the control (selected value and list items), not as a separate flag outside the dropdown.

#### Scenario: User switches to English
- **WHEN** the user selects English from the language control on the settings page
- **THEN** the visible UI updates to English without requiring an application restart

#### Scenario: Language options show flags in dropdown
- **WHEN** the user opens the language selector on the settings page
- **THEN** each option displays a flag icon and the language name within the dropdown
