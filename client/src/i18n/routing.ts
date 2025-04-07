import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ["en", "he"],

  // Used when no locale matches
  defaultLocale: "he",
  localePrefix: "never", // הוספת השורה הזו תסתיר את ה-prefix
});
