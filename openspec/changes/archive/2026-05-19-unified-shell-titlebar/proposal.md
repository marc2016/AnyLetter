## Why

The desktop app currently shows two stacked top bars: the native system title bar (with a generic window title) and the PrimeReact Menubar below it. That wastes vertical space, looks unfinished, and splits “app chrome” across system and in-app UI. Users expect a single top row—window controls plus brand, breadcrumb, and language selector—consistent across macOS, Windows, and Linux.

## What Changes

- Merge the system title bar with the application Menubar into one unified top chrome row on all desktop platforms.
- On **macOS**: use Tauri overlay title bar so native traffic-light controls remain visible; extend the Menubar into that row with appropriate left inset and drag regions.
- On **Windows and Linux**: disable native window decorations and render in-chrome minimize, maximize, and close controls on the right side of the Menubar (platform convention).
- Add window-drag behavior on non-interactive areas of the unified chrome (Tauri drag region / `startDragging`).
- Update Tauri window configuration (`tauri.conf.json`, capabilities) and shell layout/CSS (`AppLayout`, new window-controls component).
- Set the window title to the application name for task switcher/Dock; hide duplicate title text in the native bar.
- Provide a browser/dev fallback when not running inside Tauri (no custom window controls, standard layout).

## Capabilities

### New Capabilities

_None — behavior extends the existing desktop shell._

### Modified Capabilities

- `desktop-shell`: Requirements updated for unified title chrome (single top row, platform-specific window controls, drag behavior, Menubar remains the navigation shell).

## Impact

- `src-tauri/tauri.conf.json` — `titleBarStyle`, `decorations`, `hiddenTitle`, window title
- `src-tauri/capabilities/default.json` — window permissions (`start-dragging`, minimize, maximize, close)
- `src/components/layout/AppLayout.tsx` — unified shell header layout
- New component(s) e.g. `WindowControls.tsx`, optional `AppShellHeader` wrapper
- `src/App.css` — titlebar insets, drag regions, fixed chrome height
- `openspec/specs/desktop-shell/spec.md` — delta for unified titlebar requirements
