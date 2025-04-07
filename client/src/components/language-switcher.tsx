"use client";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Languages } from "lucide-react";

export default function LocaleSwitcher() {
  const t = useTranslations("common.localeSwitcher");
  const locale = useLocale();
  const otherLocale = locale === "en" ? "he" : "en";
  const pathname = usePathname();

  // שפה נוכחית כטקסט מוצג
  // const currentLanguage = locale === "he" ? "עברית" : "English";
  // השפה האחרת כטקסט מוצג
  const otherLanguageName = otherLocale === "he" ? "עברית" : "English";

  // דגלים לפי שפה
  const otherFlag = otherLocale === "he" ? "🇮🇱" : "🇺🇸";

  return (
    <Button
      variant="outline"
      size="sm"
      className="h-9 flex items-center gap-2 px-3 rounded-md border-muted-foreground/20 hover:bg-accent hover:text-accent-foreground transition-colors"
      asChild
    >
      <Link href={pathname} locale={otherLocale}>
        <Languages className="h-4 w-4 mr-1" />
        <span className="font-medium">{otherFlag}</span>
        <span>
          {t("switchLocale", {
            locale: otherLanguageName,
          })}
        </span>
      </Link>
    </Button>
  );
}
