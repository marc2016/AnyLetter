import { useTranslation } from "react-i18next";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import i18n, {
  APP_LOCALE_STORAGE_KEY,
  AppLanguage,
  SUPPORTED_LANGUAGES,
} from "../../i18n";

const LANGUAGE_OPTIONS: { label: string; value: AppLanguage; flag: string }[] = [
  { label: "Deutsch", value: "de", flag: "🇩🇪" },
  { label: "English", value: "en", flag: "🇬🇧" },
];

function resolveLanguage(lng: string): AppLanguage {
  const base = lng.split("-")[0];
  return SUPPORTED_LANGUAGES.includes(base as AppLanguage)
    ? (base as AppLanguage)
    : "en";
}

function languageOptionTemplate(option: (typeof LANGUAGE_OPTIONS)[number]) {
  return (
    <div className="flex align-items-center gap-2">
      <span className="app-lang-flag" aria-hidden>
        {option.flag}
      </span>
      <span>{option.label}</span>
    </div>
  );
}

export function LanguageSelector({ className }: { className?: string }) {
  const { i18n: i18nInstance } = useTranslation();
  const value = resolveLanguage(i18nInstance.language);
  const selected =
    LANGUAGE_OPTIONS.find((option) => option.value === value) ?? LANGUAGE_OPTIONS[1];

  const handleChange = (event: DropdownChangeEvent) => {
    const next = event.value as AppLanguage;
    void i18n.changeLanguage(next);
    localStorage.setItem(APP_LOCALE_STORAGE_KEY, next);
  };

  return (
    <Dropdown
      value={value}
      options={LANGUAGE_OPTIONS}
      optionLabel="label"
      optionValue="value"
      onChange={handleChange}
      itemTemplate={languageOptionTemplate}
      valueTemplate={() => languageOptionTemplate(selected)}
      className={["app-language-selector", className].filter(Boolean).join(" ")}
    />
  );
}
