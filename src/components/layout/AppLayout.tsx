import { Outlet } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Menubar } from "primereact/menubar";
import { BreadCrumb } from "primereact/breadcrumb";
import { useShellNavigation } from "../../context/ShellNavigationContext";
import { useShellBreadcrumb } from "../../hooks/useShellBreadcrumb";
import { LanguageSelector } from "./LanguageSelector";

export function AppLayout() {
  const { t } = useTranslation("common");
  const { goToExplorerRoot } = useShellNavigation();
  const { home, items } = useShellBreadcrumb();

  const start = (
    <div className="flex align-items-center gap-3 flex-1 min-w-0">
      <div
        className="flex align-items-center gap-2 cursor-pointer shrink-0"
        onClick={goToExplorerRoot}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            goToExplorerRoot();
          }
        }}
      >
        <i className="pi pi-envelope text-2xl text-primary" aria-hidden />
        <span className="text-xl font-semibold text-color hover:text-primary transition-colors">
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

  const end = <LanguageSelector />;

  return (
    <div className="flex flex-column h-screen w-screen m-0 p-0 overflow-hidden surface-ground">
      <Menubar
        model={[]}
        start={start}
        end={end}
        className="app-shell-menubar border-noround border-bottom-1 surface-border px-3 py-2"
      />
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
