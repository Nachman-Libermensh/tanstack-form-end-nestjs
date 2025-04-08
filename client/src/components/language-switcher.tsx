"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { Toggle } from "@/components/ui/toggle";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const otherLocale = locale === "en" ? "he" : "en";
  const pathname = usePathname();

  const t = useTranslations("common.languageSwitcher");

  const languages = [
    { id: "en", name: "English", flag: "🇺🇸" },
    { id: "he", name: "עברית", flag: "🇮🇱" },
  ];

  return (
    <div className="flex items-center border rounded-md overflow-hidden">
      {languages.map((lang) => (
        <TooltipProvider key={lang.id}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle
                asChild
                variant="outline"
                size="sm"
                pressed={locale === lang.id}
                className={`
                  cursor-pointer
                  flex items-center gap-2 px-3 py-1.5 h-9 border-0 rounded-none
                  transition-colors
                  ${
                    locale === lang.id
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-accent hover:text-accent-foreground"
                  }
                `}
                aria-label={`Switch to ${lang.name}`}
              >
                <Link href={pathname} locale={otherLocale}>
                  <span>{lang.flag}</span>
                  <span className="hidden sm:inline text-sm">{lang.name}</span>
                </Link>
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>
              <p>{t("switchToLanguage", { language: lang.name })}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ))}
    </div>
  );
}
