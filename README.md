# AnyLetter

Desktop-App zum Schreiben, Verwalten und Exportieren von Briefen — offline, lokal auf dem Rechner, ohne Cloud.

AnyLetter richtet sich an formelle Geschäftsbriefe nach **DIN 5008 (Form B)** mit Live-Vorschau auf DIN-A4, Ordnerstruktur für Entwürfe und PDF-Export.

## Funktionen

### Brief-Editor

- Geteilte Ansicht: Formular links, **DIN-A4-Vorschau** rechts (210 × 297 mm, feste Maße mit Scrollen bei kleinem Fenster)
- Felder: Absender, Empfänger, Notizblock, Infoblock, Datum, Betreff, Inhalt (Rich Text), Fußzeile
- **Live-Aktualisierung** der Vorschau beim Tippen
- Hervorhebung des zugehörigen Vorschau-Bereichs beim Fokus auf ein Feld
- Layout nach DIN 5008: Absenderzeile, Adressfenster, Falzmarken (87 mm / 192 mm), Lochmarke (148,5 mm), Seitennummerierung

### Datei-Explorer

- **Kachelansicht** mit einheitlicher Kartengröße für Ordner und Briefe
- Vorschau-Snippet aus dem Brieftext (Plain Text, ca. 100 Zeichen)
- **Breadcrumb-Navigation** in der Menüleiste
- Ordner anlegen, umbenennen, verschieben, löschen (mit Bestätigung)
- Sortierung nach Name oder Änderungsdatum (Ordner immer vor Briefen)
- Kontextmenü per Rechtsklick

### Lokale Speicherung

- Alle Daten bleiben **auf dem Gerät** — kein Netzwerk, keine Cloud
- Jeder Entwurf und jeder Ordner als **eigene JSON-Datei** im App-Datenverzeichnis
- Hierarchie über `parentId` (Ordner und Unterordner)
- **Autosave** nach ca. 2,5 Sekunden Pause beim Bearbeiten
- Speichern ausstehender Änderungen beim Schließen des Fensters
- Toleranter Umgang mit defekten Dateien (andere Entwürfe laden weiter)
- Migration älterer Entwürfe mit `body`-Feld auf `content`

### PDF-Export

- Export über **@react-pdf/renderer** mit denselben DIN-Koordinaten wie die Vorschau
- Nativer **Speichern-Dialog** zur Zielauswahl
- Vorgeschlagener Dateiname aus Betreff und Datum (Fallback: `Brief`)
- Leere Felder erscheinen im PDF leer (keine Platzhalter aus der Vorschau)
- Lokalisierte Datumszeile und Seitennummerierung (`Seite x von y` / `Page x of y`)

### Oberfläche & Sprache

- Desktop-Shell mit PrimeReact-Menüleiste (Marke, Breadcrumb, Sprachwahl)
- **Deutsch** und **Englisch** (UI, Kalender, Datumsformat, PDF-Texte)
- Sprache beim ersten Start aus der System-Locale, danach gespeicherte Präferenz

## Technologie

| Bereich | Stack |
|--------|--------|
| Desktop | [Tauri 2](https://v2.tauri.app/) |
| UI | React 19, TypeScript, [PrimeReact](https://primereact.org/), PrimeFlex |
| Routing | React Router |
| Editor | Quill (Rich Text) |
| PDF | @react-pdf/renderer |
| i18n | i18next, react-i18next |
| Tests | Vitest, Testing Library |
| Build (Frontend) | Vite |

## Voraussetzungen

- [Node.js](https://nodejs.org/) (LTS empfohlen) und npm
- [Rust](https://www.rust-lang.org/tools/install) (für Tauri)
- Plattform-Abhängigkeiten für Tauri: siehe [Tauri — Prerequisites](https://v2.tauri.app/start/prerequisites/)

## Entwicklung

```bash
# Abhängigkeiten installieren
npm install

# Desktop-App im Entwicklungsmodus (Frontend + Tauri)
npm run dev:desktop

# Nur Frontend (Browser, Port 1420)
npm run dev
```

## Build & Tests

```bash
# Produktions-Build der Desktop-App
npm run build:desktop

# Frontend-Build ohne Paketierung
npm run build

# Tests
npm test
```

Installierbare Artefakte liegen nach `npm run build:desktop` unter `src-tauri/target/release/bundle/`.

## Datenspeicherung

Entwürfe und Ordner werden im **App-Datenverzeichnis** des Betriebssystems abgelegt (Tauri `AppData`, Unterordner `drafts`). Jede Entwurfs- oder Ordner-Datei ist ein JSON-Dokument mit Metadaten (`id`, `parentId`, `createdAt`, `updatedAt`) und den Brief-Feldern.

## Projektstruktur (Auszug)

```
src/                 React-App (Views, Komponenten, Hooks)
src/pdf/             DIN-Layout und PDF-Generierung
src/locales/         Übersetzungen (de/en)
src/storage/         Lokale Persistenz (Tauri FS)
src-tauri/           Tauri/Rust-Backend
openspec/            Spezifikationen und Change-Historie (OpenSpec)
```

Ausführliche Anforderungen und Szenarien stehen in `openspec/specs/` (z. B. `letter-editor-view`, `file-explorer-view`, `local-letter-storage`, `app-localization`, `desktop-shell`).

## Lizenz

[MIT](LICENSE) — Copyright (c) 2026 marc2016
