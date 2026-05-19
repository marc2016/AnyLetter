import { Outlet } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { BreadCrumb } from "primereact/breadcrumb";
import { useShellNavigation } from "../../context/ShellNavigationContext";
import { useShellBreadcrumb } from "../../hooks/useShellBreadcrumb";
import { isTauriDesktop, usesMacOsOverlayTitlebar } from "../../utils/platform";
import { AppShellTitlebar } from "./AppShellTitlebar";
import { SettingsButton } from "./SettingsButton";
import { WindowControls } from "./WindowControls";

export function AppLayout() {
  const { t } = useTranslation("common");
  const { goToExplorerRoot } = useShellNavigation();
  const { home, items } = useShellBreadcrumb();

  const menubarClassName = [
    "app-shell-menubar",
    "border-noround",
    "px-3",
    "py-0",
    isTauriDesktop() ? "app-shell-menubar--unified" : "",
    usesMacOsOverlayTitlebar() ? "app-shell-menubar--macos" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const start = (
    <div className="flex align-items-center gap-2 flex-1 min-w-0">
      <div
        className="flex align-items-center gap-1 cursor-pointer shrink-0 app-shell-brand"
        onClick={goToExplorerRoot}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            goToExplorerRoot();
          }
        }}
      >
        <i className="pi pi-envelope text-lg" aria-hidden />
        <span className="text-base font-semibold text-color transition-colors">
          {t("appName")}
        </span>
      </div>
      <BreadCrumb
        home={home}
        model={items}
        className="app-shell-breadcrumb border-none bg-transparent p-0 flex-1 min-w-0"
      />
    </div>
  );

  const end = (
    <div className="flex align-items-center gap-2 shrink-0">
      <WindowControls />
      <SettingsButton />
    </div>
  );

  return (
    <div className="flex flex-column h-screen w-screen m-0 p-0 overflow-hidden surface-ground">
      <AppShellTitlebar
        menubarClassName={menubarClassName}
        start={start}
        end={end}
      />
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
