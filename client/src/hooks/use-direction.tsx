"use client";

import { useLocale } from "next-intl";

export function useDirection() {
  const locale = useLocale();
  return locale === "he" ? "rtl" : "ltr";
}
