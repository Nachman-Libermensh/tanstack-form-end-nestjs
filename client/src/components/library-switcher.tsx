"use client";

import { useTranslations } from "next-intl";
import { useUILibrary } from "@/providers/ui-library-provider";
import { Toggle } from "@/components/ui/toggle";
import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function LibrarySwitcher() {
  const t = useTranslations("common.librarySwitcher");
  const { library, setLibrary } = useUILibrary();

  const libraries = [
    {
      id: "shadcn",
      name: t("shadcn"),
      icon: (
        <Image
          src="/shadcn-ui-logo.svg"
          alt="shadcn-ui-logo"
          width={16}
          height={16}
        />
      ),
    },
    {
      id: "rizzui",
      name: t("rizzui"),
      icon: (
        <Image src="/rizzUI.png" alt="rizzUI-logo" width={16} height={16} />
      ),
    },
  ];

  return (
    <div className="flex items-center border rounded-md overflow-hidden">
      {libraries.map((lib) => (
        <TooltipProvider key={lib.id}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle
                variant="outline"
                size="sm"
                pressed={library === lib.id}
                onPressedChange={() =>
                  setLibrary(lib.id as "shadcn" | "rizzui")
                }
                className={`
                  cursor-pointer
                  flex items-center gap-2 px-3 py-1.5 h-9 border-0 rounded-none
                  transition-colors
                  ${
                    library === lib.id
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-accent hover:text-accent-foreground"
                  }
                `}
                aria-label={`${t("switchTo")} ${lib.name}`}
              >
                {lib.icon}
                <span className="hidden sm:inline text-sm">{lib.name}</span>
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>
              <p>{`${t("switchTo")} ${lib.name} ${t("uiLibrary")}`}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ))}
    </div>
  );
}
