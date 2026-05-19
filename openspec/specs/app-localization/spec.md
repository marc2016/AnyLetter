# app-localization Specification

## Purpose
Defines internationalization for the AnyLetter desktop UI: supported languages, locale detection, persistence, and localized strings across shell, explorer, and editor views.
## Requirements
### Requirement: Supported application languages
The system SHALL support German (`de`) and English (`en`) for all application user interface text.

#### Scenario: Application loads with German resources
- **WHEN** the active language is German
- **THEN** all UI strings resolved through the localization layer are displayed in German

#### Scenario: Application loads with English resources
- **WHEN** the active language is English
- **THEN** all UI strings resolved through the localization layer are displayed in English

### Requirement: Initial language from system locale
The system SHALL determine the initial language on first launch from the operating system or browser locale, mapping locale codes to `de` or `en` when the language prefix matches.

#### Scenario: System locale is German
- **WHEN** the user launches the app for the first time and the system locale is German (e.g. `de-DE`)
- **THEN** the application UI language is set to German

#### Scenario: System locale is unsupported
- **WHEN** the user launches the app for the first time and the system locale is neither German nor English (e.g. `fr-FR`)
- **THEN** the application UI language defaults to English

### Requirement: Persisted language preference
The system SHALL persist the user's explicitly selected language and use it on subsequent launches instead of re-detecting the system locale.

#### Scenario: User changes language and restarts
- **WHEN** the user selects German from the language control and later restarts the application
- **THEN** the application UI remains in German regardless of the current system locale

### Requirement: Language selector in application shell
The system SHALL provide a language selector control on the settings page allowing the user to switch between German and English at any time. The selector SHALL be implemented as a dropdown showing each language option with a country flag icon and label inside the control (selected value and list items), not as a separate flag outside the dropdown.

#### Scenario: User switches to English
- **WHEN** the user selects English from the language control on the settings page
- **THEN** the visible UI updates to English without requiring an application restart

#### Scenario: Language options show flags in dropdown
- **WHEN** the user opens the language selector on the settings page
- **THEN** each option displays a flag icon and the language name within the dropdown

### Requirement: Localized app-generated labels
The system SHALL use the active language for application-generated display labels and default names, including untitled letter titles, breadcrumb segments, empty-state messages, dialog text, toasts, and default folder names at creation time.

#### Scenario: Untitled letter in German
- **WHEN** the active language is German and a draft has no subject
- **THEN** the file explorer and breadcrumb display the German untitled label

#### Scenario: New folder default name
- **WHEN** the active language is English and the user creates a new folder
- **THEN** the initial folder name uses the English default new-folder label

### Requirement: Locale-aware formatting
The system SHALL format dates and locale-sensitive values according to the active application language.

#### Scenario: Date in letter preview
- **WHEN** the active language is German and a date is shown in the DIN preview
- **THEN** the date is formatted using German locale conventions

### Requirement: PrimeReact component localization
The system SHALL apply PrimeReact locale settings consistent with the active application language for localized widgets such as the Calendar.

#### Scenario: Calendar in German
- **WHEN** the active language is German and the user opens the date picker
- **THEN** month and day labels appear in German

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

