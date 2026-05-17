import i18n from "../i18n";

export function getIntlLocale(language?: string): string {
  const lng = language ?? i18n.language;
  return lng.startsWith("de") ? "de-DE" : "en-US";
}

export function formatAppDate(
  date: Date,
  options?: Intl.DateTimeFormatOptions,
  language?: string,
): string {
  return date.toLocaleDateString(getIntlLocale(language), options);
}
