import { addLocale, locale } from "primereact/api";

const de = {
  firstDayOfWeek: 1,
  dayNames: [
    "Sonntag",
    "Montag",
    "Dienstag",
    "Mittwoch",
    "Donnerstag",
    "Freitag",
    "Samstag",
  ],
  dayNamesShort: ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"],
  dayNamesMin: ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"],
  monthNames: [
    "Januar",
    "Februar",
    "März",
    "April",
    "Mai",
    "Juni",
    "Juli",
    "August",
    "September",
    "Oktober",
    "November",
    "Dezember",
  ],
  monthNamesShort: [
    "Jan",
    "Feb",
    "Mär",
    "Apr",
    "Mai",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Okt",
    "Nov",
    "Dez",
  ],
  today: "Heute",
  clear: "Löschen",
  weekHeader: "KW",
  dateFormat: "dd.mm.yy",
};

const en = {
  firstDayOfWeek: 0,
  dayNames: [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ],
  dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  dayNamesMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
  monthNames: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
  monthNamesShort: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
  today: "Today",
  clear: "Clear",
  weekHeader: "Wk",
  dateFormat: "mm/dd/yy",
};

let registered = false;

export function ensurePrimeLocalesRegistered() {
  if (registered) return;
  addLocale("de", de);
  addLocale("en", en);
  registered = true;
}

export function applyPrimeLocale(language: string) {
  ensurePrimeLocalesRegistered();
  const code = language.startsWith("de") ? "de" : "en";
  locale(code);
}
