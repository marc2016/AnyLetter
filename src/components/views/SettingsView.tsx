import { useTranslation } from "react-i18next";
import { LanguageSelector } from "../layout/LanguageSelector";

export function SettingsView() {
  const { t } = useTranslation("settings");

  return (
    <div className="app-settings-page">
      <div className="app-settings-panel">
        <h1 className="app-settings-title">{t("title")}</h1>
        <div className="app-settings-field">
          <span className="app-settings-label">{t("languageLabel")}</span>
          <LanguageSelector className="app-language-selector--settings" />
        </div>
      </div>
    </div>
  );
}
