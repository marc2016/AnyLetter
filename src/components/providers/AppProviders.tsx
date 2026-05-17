import { ReactNode, useEffect } from "react";
import { I18nextProvider } from "react-i18next";
import { PrimeReactProvider } from "primereact/api";
import i18n from "../../i18n";
import { applyPrimeLocale } from "../../i18n/primeLocales";

export function AppProviders({ children }: { children: ReactNode }) {
  useEffect(() => {
    const syncLocale = (lng: string) => {
      document.documentElement.lang = lng;
      applyPrimeLocale(lng);
    };

    syncLocale(i18n.language);
    i18n.on("languageChanged", syncLocale);
    return () => {
      i18n.off("languageChanged", syncLocale);
    };
  }, []);

  return (
    <I18nextProvider i18n={i18n}>
      <PrimeReactProvider>{children}</PrimeReactProvider>
    </I18nextProvider>
  );
}
