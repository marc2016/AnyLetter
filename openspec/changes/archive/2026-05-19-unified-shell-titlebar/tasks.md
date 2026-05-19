## 1. Tauri window configuration

- [x] 1.1 Set window title to "AnyLetter" and configure macOS overlay title bar (`titleBarStyle: Overlay`, `hiddenTitle: true`, `decorations: true`) via platform config or Rust `setup`
- [x] 1.2 Configure Windows and Linux with `decorations: false` via platform-specific Tauri config
- [x] 1.3 Add window permissions to `capabilities/default.json`: `allow-start-dragging`, `allow-minimize`, `allow-toggle-maximize`, `allow-close`

## 2. Platform detection and window controls

- [x] 2.1 Add a small utility or hook to detect Tauri runtime and host OS (`macos` | `windows` | `linux` | `web`)
- [x] 2.2 Create `WindowControls` component with minimize, maximize, and close actions using `@tauri-apps/api/window`
- [x] 2.3 Style window control buttons to match Menubar chrome (compact, hover states, accessible labels)

## 3. Unified shell layout

- [x] 3.1 Update `AppLayout` Menubar `end` slot: render `WindowControls` on Windows/Linux (before `LanguageSelector`); omit on macOS and web
- [x] 3.2 Add macOS-specific Menubar CSS (`padding-left` inset for traffic lights, consistent `min-height`)
- [x] 3.3 Add `data-tauri-drag-region` (or equivalent spacer + drag handler) on non-interactive chrome areas only
- [x] 3.4 Ensure interactive shell controls (brand, breadcrumb, language, window buttons) remain fully clickable

## 4. Verification

- [x] 4.1 Manually verify macOS: single chrome row, native traffic lights visible, drag works, navigation clicks work
- [x] 4.2 Manually verify Windows: single chrome row, custom controls work, no double title bar
- [x] 4.3 Manually verify `npm run dev` (browser): Menubar renders without errors when Tauri APIs are absent
- [x] 4.4 Confirm window close still flushes pending draft saves
