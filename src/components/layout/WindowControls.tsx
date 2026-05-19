import { useTranslation } from "react-i18next";
import { getCurrentWindow } from "@tauri-apps/api/window";
import { usesCustomWindowControls } from "../../utils/platform";

export function WindowControls() {
  const { t } = useTranslation("common");

  if (!usesCustomWindowControls()) {
    return null;
  }

  const appWindow = getCurrentWindow();

  return (
    <div className="app-shell-window-controls flex align-items-center shrink-0" role="group" aria-label={t("windowControls")}>
      <button
        type="button"
        className="app-shell-window-control"
        aria-label={t("windowMinimize")}
        onClick={() => void appWindow.minimize()}
      >
        <i className="pi pi-minus" aria-hidden />
      </button>
      <button
        type="button"
        className="app-shell-window-control"
        aria-label={t("windowMaximize")}
        onClick={() => void appWindow.toggleMaximize()}
      >
        <i className="pi pi-stop" aria-hidden />
      </button>
      <button
        type="button"
        className="app-shell-window-control app-shell-window-control--close"
        aria-label={t("windowClose")}
        onClick={() => void appWindow.close()}
      >
        <i className="pi pi-times" aria-hidden />
      </button>
    </div>
  );
}
