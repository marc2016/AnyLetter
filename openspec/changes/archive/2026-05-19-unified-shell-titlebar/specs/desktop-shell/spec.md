## ADDED Requirements

### Requirement: Unified window title chrome
The system SHALL present a single top chrome row that combines window controls with the application Menubar on all supported desktop platforms. A separate visible system title bar showing duplicate application title text SHALL NOT appear above the Menubar.

On macOS, native window controls (traffic lights) SHALL remain visible via an overlay title bar configuration. The Menubar SHALL reserve horizontal space on the left so content does not overlap the traffic lights.

On Windows and Linux, the system SHALL disable native window decorations and SHALL render in-chrome minimize, maximize, and close controls in the Menubar end area to the left of the language selector.

The unified chrome SHALL support window dragging from designated non-interactive regions using Tauri window drag APIs, without preventing clicks on brand, breadcrumb, language selector, or window control buttons.

#### Scenario: User sees one chrome row on macOS
- **WHEN** the user opens the application on macOS
- **THEN** the window shows native traffic-light controls and the Menubar (brand, breadcrumb, language selector) in one combined top row with no additional system title bar below or above the Menubar

#### Scenario: User sees one chrome row on Windows or Linux
- **WHEN** the user opens the application on Windows or Linux
- **THEN** the window shows a single top row containing the Menubar and in-chrome window controls with no separate native title bar above the Menubar

#### Scenario: User minimizes or closes from shell on Windows or Linux
- **WHEN** the user activates minimize, maximize, or close in the Menubar window controls on Windows or Linux
- **THEN** the window performs the corresponding window action

#### Scenario: User drags window from chrome
- **WHEN** the user drags a designated non-interactive region of the unified chrome
- **THEN** the application window moves

## MODIFIED Requirements

### Requirement: Application shell menubar chrome
The system SHALL render a PrimeReact Menubar as the persistent top application chrome and unified window title row, visible on all core views (file explorer and letter editor).

The Menubar `start` area SHALL display an envelope brand icon (`pi-envelope`), the application title "AnyLetter", and a PrimeReact BreadCrumb for contextual navigation. The Menubar `model` SHALL remain empty. The Menubar `end` area SHALL display a dropdown language selector (with flag and label per option) allowing the user to switch between German and English. On Windows and Linux, in-chrome window controls SHALL appear in the `end` area before the language selector.

#### Scenario: User sees consistent shell on launch
- **WHEN** the user opens the application
- **THEN** the top of the window shows a single chrome row with the Menubar containing the envelope icon, "AnyLetter" title, breadcrumb area, and language selector, integrated with platform-appropriate window controls

#### Scenario: User changes language from shell
- **WHEN** the user selects a different language from the Menubar language selector
- **THEN** the application UI language updates across all views

#### Scenario: User returns to letters root via brand
- **WHEN** the user clicks the envelope icon or "AnyLetter" title
- **THEN** the system navigates to the file explorer root view and resets folder breadcrumb to root
