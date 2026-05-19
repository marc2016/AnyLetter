import { useCallback } from "react";
import { getCurrentWindow } from "@tauri-apps/api/window";
import { isInteractiveTitlebarTarget } from "../utils/titlebar";
import { isTauriDesktop, usesMacOsOverlayTitlebar } from "../utils/platform";

/**
 * Windows/Linux: startDragging on mousedown; double-click toggles maximize.
 * macOS overlay: drag via data-tauri-drag-region only (native double-click maximize).
 */
export function useTitlebarDrag() {
  return useCallback((event: React.MouseEvent<HTMLElement>) => {
    if (!isTauriDesktop() || event.button !== 0) {
      return;
    }

    if (usesMacOsOverlayTitlebar()) {
      return;
    }

    if (isInteractiveTitlebarTarget(event.target)) {
      return;
    }

    event.preventDefault();

    const appWindow = getCurrentWindow();

    if (event.detail === 2) {
      void appWindow.toggleMaximize();
      return;
    }

    void appWindow.startDragging();
  }, []);
}
