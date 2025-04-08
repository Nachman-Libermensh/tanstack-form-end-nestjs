export function getDirection(locale: string): "rtl" | "ltr" {
  // List of RTL languages
  const rtlLanguages = ["he", "ar", "fa", "ur"];

  // Check if the locale is in the RTL languages list
  return rtlLanguages.includes(locale) ? "rtl" : "ltr";
}
