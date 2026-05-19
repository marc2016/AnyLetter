## Context

AnyLetter is a Tauri 2 desktop app with a React + PrimeReact shell. `AppLayout` renders a PrimeReact `Menubar` as persistent chrome (brand, breadcrumb, language selector). The Tauri main window still uses default decorations: a native title bar appears above the Menubar, showing the generic config title (`tauri-app`) and wasting vertical space.

Tauri 2 platform APIs differ: `titleBarStyle: Overlay` with native traffic lights is **macOS-only**. Windows has no equivalent title-bar overlay in Tauri 2; Linux behavior varies by desktop environment. A cross-platform “one row” experience therefore requires a **single React shell layout** with **platform-specific window configuration**, not one identical `tauri.conf.json` flag everywhere.

## Goals / Non-Goals

**Goals:**

- One visible top chrome row on macOS, Windows, and Linux: window controls + existing Menubar content.
- Keep **native** macOS traffic-light controls (overlay title bar).
- On Windows and Linux, provide in-chrome minimize / maximize / close on the **right** (platform convention).
- Window draggable from non-interactive areas of the chrome row.
- Menubar remains the navigation shell (brand, breadcrumb, language) per existing spec.
- Browser-only dev (`npm run dev`) continues to work without Tauri APIs.

**Non-Goals:**

- Pixel-identical custom window buttons on macOS (would require `decorations: false` and lose native controls).
- Windows 11 `titleBarOverlay` parity with Electron (not available in Tauri 2).
- Changing Menubar navigation rules, breadcrumb logic, or language selector behavior.
- Multi-window or secondary window title bars.

## Decisions

### 1. Two-mode platform strategy (not one config for all OSes)

**Choice:**

| Platform | Tauri window config | Window controls |
|----------|---------------------|-----------------|
| macOS | `titleBarStyle: "Overlay"`, `decorations: true`, `hiddenTitle: true`, title `"AnyLetter"` | Native traffic lights (left inset on Menubar) |
| Windows, Linux | `decorations: false` | Custom `WindowControls` in Menubar `end` (before language selector) |

**Rationale:** Only path that preserves native Mac buttons while achieving one-row chrome everywhere. Matches VS Code / Discord pattern.

**Alternatives considered:**

- Overlay on all platforms — not supported on Windows/Linux in Tauri 2.
- `decorations: false` everywhere — unified but removes native Mac traffic lights.
- Keep default decorations on Windows — double chrome remains; rejected.

### 2. Single `AppShellHeader` composition in React

**Choice:** Wrap or extend `AppLayout` with a header row that always renders the Menubar; conditionally renders `WindowControls` when `!isMacOS && isTauri()`.

Structure:

```
┌─────────────────────────────────────────────────────────┐
│ [mac: inset]  Menubar start (brand + breadcrumb)  end │
│               WindowControls (win/linux) + Language    │
└─────────────────────────────────────────────────────────┘
```

**Rationale:** One component owns layout; platform detection via `@tauri-apps/api/os` or `import.meta.env` + feature detection.

**Alternatives considered:**

- Separate titlebar div above Menubar — rejected; recreates two-row feel.
- Rust-only layout — rejected; Menubar is React/PrimeReact.

### 3. Drag region placement

**Choice:** Apply `data-tauri-drag-region` to a dedicated flex spacer in the Menubar start area (between brand and breadcrumb, or on trailing empty flex), **not** on interactive elements (brand button, breadcrumb links, language dropdown, window control buttons).

Optional: `mousedown` + `startDragging()` on brand row background if drag-region attribute is insufficient on overlay macOS.

**Rationale:** Tauri docs warn overlay drag fails when unfocused; minimizing drag on controls avoids click conflicts.

### 4. macOS left inset and height

**Choice:** CSS class on Menubar e.g. `.app-shell-menubar--macos` with `padding-left` ~78px (tune in implementation; use `trafficLightPosition` in config if needed). Fixed `min-height` on chrome (~36–40px) for consistent cross-platform row height.

**Rationale:** Overlay title bar height varies by macOS version; padding is simpler than hard-coding title bar height in Rust initially.

### 5. Tauri permissions and window title

**Choice:** Add to `capabilities/default.json`:

- `core:window:allow-start-dragging`
- `core:window:allow-minimize`
- `core:window:allow-toggle-maximize`
- `core:window:allow-close`

Set window `title` to `"AnyLetter"` for Dock/Alt+Tab; hide visible native title via `hiddenTitle` on macOS.

### 6. `WindowControls` component

**Choice:** Small presentational component with three buttons calling `getCurrentWindow()` minimize / toggleMaximize / close. Use PrimeIcons or minimal SVG (─ □ ✕), styled to match Menubar surface. Place in Menubar `end` before `LanguageSelector`.

**Rationale:** No new dependencies; consistent with PrimeReact shell.

### 7. Dev / web fallback

**Choice:** Detect Tauri with `import.meta.env.TAURI_ENV_PLATFORM` or `@tauri-apps/api/core` `isTauri()`. When not in Tauri, skip `WindowControls` and macOS inset; Menubar unchanged.

**Rationale:** `npm run dev` uses Vite only; must not throw on missing window APIs.

### 8. Platform-specific Tauri config files (optional)

**Choice:** Prefer `src-tauri/tauri.macos.conf.json` and `src-tauri/tauri.windows.conf.json` (and `.linux.conf.json`) for `titleBarStyle` / `decorations` split if supported by the project’s Tauri setup; otherwise set in Rust `setup` with `#[cfg(target_os = "...")]`.

**Rationale:** Keeps main `tauri.conf.json` readable; official Tauri pattern for per-OS window options.

## Risks / Trade-offs

- **[Risk] Linux decoration quirks (KDE vs GNOME)** → Test on target DEs; document known limitations; avoid transparent window hacks unless needed.
- **[Risk] macOS overlay title bar height drift** → Use generous left padding; verify on Sonoma/Sequoia; adjust `trafficLightPosition` if controls overlap Menubar content.
- **[Risk] Drag region blocks clicks** → Restrict drag to spacer only; QA breadcrumb and language selector.
- **[Risk] Unfocused window not draggable on macOS overlay** → Known Tauri limitation; acceptable for MVP.
- **[Trade-off] Windows controls are custom, not native** → Style to feel system-neutral; position on right per convention.
- **[Trade-off] Slightly taller effective chrome on Mac** → Menubar shares row with traffic lights; acceptable vs. previous double bar.

## Migration Plan

1. Add Tauri window config and capabilities.
2. Add `WindowControls` + platform detection hook.
3. Update `AppLayout` / CSS for unified row and macOS inset.
4. Manual test: macOS (traffic lights, drag, breadcrumb clicks), Windows (custom controls, maximize), Linux smoke test.
5. Verify window-close autosave still fires (unchanged close path).

Rollback: revert `tauri.conf.json` decorations/titleBarStyle and `AppLayout` wrapper; remove `WindowControls`.

## Open Questions

- None blocking. Fine-tune macOS `padding-left` and `trafficLightPosition` during implementation QA.
