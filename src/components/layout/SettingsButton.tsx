import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";

export function SettingsButton() {
  const { t } = useTranslation("settings");
  const navigate = useNavigate();
  const label = t("openSettings");

  return (
    <Button
      type="button"
      icon="pi pi-cog"
      rounded
      text
      className="app-shell-settings-button shrink-0"
      aria-label={label}
      tooltip={label}
      tooltipOptions={{ position: "bottom" }}
      onClick={() => navigate("/settings")}
    />
  );
}
