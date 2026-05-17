## ADDED Requirements

### Requirement: Localized letter preview date label and page numbering
The system SHALL provide localized strings for the letter preview and PDF date label prefix and page numbering format in the `preview` translation namespace.

#### Scenario: German date label string
- **WHEN** the active language is German
- **THEN** the preview date label resolves to `Datum: `

#### Scenario: English page numbering string
- **WHEN** the active language is English and page 2 of 3 is displayed
- **THEN** the page line resolves to `Page 2 of 3`

#### Scenario: German page numbering string
- **WHEN** the active language is German and page 1 of 1 is displayed
- **THEN** the page line resolves to `Seite 1 von 1`
