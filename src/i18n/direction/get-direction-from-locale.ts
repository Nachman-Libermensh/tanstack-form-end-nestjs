const rtlLanguages = ["he", "ar", "fa", "ur"];

export function getDirectionFromLocale(locale: string): "rtl" | "ltr" {
  return rtlLanguages.includes(locale) ? "rtl" : "ltr";
}
