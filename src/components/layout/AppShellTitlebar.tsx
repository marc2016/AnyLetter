import { ReactNode } from "react";
import { Menubar } from "primereact/menubar";
import { useTitlebarDrag } from "../../hooks/useTitlebarDrag";
import { isTauriDesktop, usesMacOsOverlayTitlebar } from "../../utils/platform";

type AppShellTitlebarProps = {
  menubarClassName: string;
  start: ReactNode;
  end: ReactNode;
};

export function AppShellTitlebar({
  menubarClassName,
  start,
  end,
}: AppShellTitlebarProps) {
  const handleMouseDown = useTitlebarDrag();
  const isMacOverlay = usesMacOsOverlayTitlebar();

  const titlebarClassName = [
    "app-shell-titlebar",
    isMacOverlay ? "app-shell-titlebar--macos" : "",
    isTauriDesktop() && !isMacOverlay ? "app-shell-titlebar--win-drag" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={titlebarClassName}>
      {isMacOverlay ? (
        <div
          className="app-shell-drag-backdrop"
          data-tauri-drag-region
          aria-hidden
        />
      ) : null}
      <div
        className="app-shell-titlebar-content"
        onMouseDown={isTauriDesktop() && !isMacOverlay ? handleMouseDown : undefined}
      >
        <Menubar model={[]} start={start} end={end} className={menubarClassName} />
      </div>
    </div>
  );
}
