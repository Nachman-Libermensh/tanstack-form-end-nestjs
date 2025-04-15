import { getLocale } from "next-intl/server";
import { getDirectionFromLocale } from "./get-direction-from-locale";

export async function getDirection(): Promise<"rtl" | "ltr"> {
  const locale = await getLocale();
  return getDirectionFromLocale(locale);
}
