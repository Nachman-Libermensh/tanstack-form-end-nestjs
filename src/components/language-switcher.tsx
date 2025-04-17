"use client";

import { useLocale } from "next-intl";
import { usePathname } from "@/i18n/navigation";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDirection } from "@/i18n/direction";

const languages = [
  { id: "en", name: "English", flag: "🇺🇸" },
  { id: "he", name: "עברית", flag: "🇮🇱" },
  // { id: "fr", name: "Français", flag: "🇫🇷" },
  // { id: "ru", name: "Русский", flag: "🇷🇺" },
];

export default function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const dir = useDirection();
  const handleChange = (langId: string) => {
    router.push(`/${langId}${pathname}`);
  };

  return (
    <Select dir={dir} defaultValue={locale} onValueChange={handleChange}>
      <SelectTrigger>
        <SelectValue
          placeholder="Select Language"
          className="flex items-center gap-2"
        />
      </SelectTrigger>
      <SelectContent className="w-36 rounded-md border bg-popover shadow-xl">
        {languages.map((lang) => (
          <SelectItem key={lang.id} value={lang.id}>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-base">{lang.flag}</span>
              <span>{lang.name}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
