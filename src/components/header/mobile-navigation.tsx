import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useDirection } from "@/i18n/direction";
import { useRouter } from "next/navigation";
import { Menu } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
} from "@/components/ui/command";
import { ExampleCategory } from "@/types";

export const MobileNavigation = ({
  mainLinks,
  exampleCategories,
  pathname,
}: {
  mainLinks: { href: string; label: string; icon: React.ReactNode }[];
  exampleCategories: ExampleCategory[];
  pathname: string;
}) => {
  const [open, setOpen] = useState(false);
  const t = useTranslations("navigation");
  const direction = useDirection();
  const router = useRouter();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="md:hidden flex items-center justify-center"
          aria-label={t("menuAriaLabel")}
        >
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent
        side={direction === "rtl" ? "right" : "left"}
        className={cn(
          "w-[300px] p-0",

          "rtl:[&>button:has(svg.lucide-x)]:left-4 rtl:[&>button:has(svg.lucide-x)]:right-auto",
          "ltr:[&>button:has(svg.lucide-x)]:right-4 ltr:[&>button:has(svg.lucide-x)]:left-auto",
          "[&>button:has(svg.lucide-x)]:cursor-pointer"
        )}
      >
        {/* מסגרת חיצונית - גובה מלא עם ריפוד */}
        <div className="h-full flex flex-col p-6">
          {/* כותרת - גובה קבוע */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold">{t("menuTitle")}</h2>
            {/* <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
              <X className="h-5 w-5" />
            </Button> */}
          </div>

          {/* קישורים ראשיים - גובה קבוע */}
          <nav className="space-y-1 mb-6">
            {mainLinks.map((link) => {
              const isActive =
                pathname === link.href ||
                (link.href !== "/" && pathname.startsWith(link.href));

              return (
                <Link
                  href={link.href}
                  key={link.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                    isActive
                      ? "bg-accent/70 text-accent-foreground"
                      : "hover:bg-accent/30"
                  )}
                >
                  <span className="inline-flex items-center justify-center">
                    {link.icon}
                  </span>
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* חלק הדוגמאות - ממלא את כל הגובה הנותר */}
          <div className="flex flex-col flex-1 min-h-0">
            <h3 className="text-sm font-semibold text-muted-foreground mb-3">
              {t("examples.examples")}
            </h3>

            {/* Command - ממלא את כל המרחב הנותר */}
            <div className="flex-1 border  rounded-md flex flex-col">
              <Command className="flex flex-col h-full flex-1">
                <CommandInput placeholder={t("searchExamples")} />
                {/* עדכון CommandList: הקצאת flex-1, min-h-0 ו- overflow-y-auto */}
                <CommandList className="flex-1 min-h-0  h-9/12  overflow-y-auto">
                  <CommandEmpty>{t("noExamplesFound")}</CommandEmpty>
                  {/* עדכון ScrollArea: נרצה שיתפוס את כל הגובה הזמין */}
                  <ScrollArea dir={direction} className="h-full w-full">
                    {exampleCategories.map((category) => (
                      <CommandGroup
                        key={category.title}
                        heading={category.title}
                      >
                        {category.examples.map((example) => (
                          <CommandItem
                            key={example.href}
                            onSelect={() => {
                              router.push(example.href);
                              setOpen(false);
                            }}
                            className={cn(
                              "cursor-pointer",
                              pathname === example.href ? "bg-accent/40" : ""
                            )}
                          >
                            {example.label}
                            {pathname === example.href && (
                              <CommandShortcut>
                                <span className="bg-accent/60 text-accent-foreground text-xs px-1 py-0.5 rounded">
                                  {t("current")}
                                </span>
                              </CommandShortcut>
                            )}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    ))}
                  </ScrollArea>
                </CommandList>
              </Command>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
