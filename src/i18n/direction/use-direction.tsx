"use client";
import { useLocale } from "next-intl";
import { getDirectionFromLocale } from "./get-direction-from-locale";

export function useDirection(): "rtl" | "ltr" {
  const locale = useLocale();
  return getDirectionFromLocale(locale);
}
