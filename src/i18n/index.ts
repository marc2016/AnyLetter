import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import deCommon from "../locales/de/common.json";
import deExplorer from "../locales/de/explorer.json";
import deEditor from "../locales/de/editor.json";
import deBreadcrumb from "../locales/de/breadcrumb.json";
import dePreview from "../locales/de/preview.json";
import deSettings from "../locales/de/settings.json";

import enCommon from "../locales/en/common.json";
import enExplorer from "../locales/en/explorer.json";
import enEditor from "../locales/en/editor.json";
import enBreadcrumb from "../locales/en/breadcrumb.json";
import enPreview from "../locales/en/preview.json";
import enSettings from "../locales/en/settings.json";

export const APP_LOCALE_STORAGE_KEY = "app.locale";
export const SUPPORTED_LANGUAGES = ["de", "en"] as const;
export type AppLanguage = (typeof SUPPORTED_LANGUAGES)[number];

const resources = {
  de: {
    common: deCommon,
    explorer: deExplorer,
    editor: deEditor,
    breadcrumb: deBreadcrumb,
    preview: dePreview,
    settings: deSettings,
  },
  en: {
    common: enCommon,
    explorer: enExplorer,
    editor: enEditor,
    breadcrumb: enBreadcrumb,
    preview: enPreview,
    settings: enSettings,
  },
};

void i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    supportedLngs: [...SUPPORTED_LANGUAGES],
    fallbackLng: "en",
    load: "languageOnly",
    defaultNS: "common",
    ns: ["common", "explorer", "editor", "breadcrumb", "preview", "settings"],
    detection: {
      order: ["localStorage", "navigator"],
      lookupLocalStorage: APP_LOCALE_STORAGE_KEY,
      caches: ["localStorage"],
    },
    interpolation: {
      escapeValue: false,
    },
  });

document.documentElement.lang = i18n.language;

export default i18n;
