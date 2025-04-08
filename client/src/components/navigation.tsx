"use client";

import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import React from "react";
import { Link } from "@/i18n/navigation";
import { useDirection } from "@/hooks/use-direction";

export default function Navigation() {
  const t = useTranslations("navigation");
  const pathname = usePathname();
  const direction = useDirection();
  const mainLinks = [
    { href: "/", label: t("home") },
    { href: "/how-it-works", label: t("howItWorks") },
    { href: "/playground", label: t("playground") },
  ];

  const exampleCategories = [
    {
      title: t("categories.basic"),
      examples: [
        { href: "/examples/login", label: t("examples.login") },
        { href: "/examples/contact", label: t("examples.contact") },
        { href: "/examples/subscribe", label: t("examples.subscribe") },
      ],
    },
    {
      title: t("categories.advanced"),
      examples: [
        { href: "/examples/multistep", label: t("examples.multistep") },
        { href: "/examples/fileupload", label: t("examples.fileupload") },
        { href: "/examples/dynamic", label: t("examples.dynamic") },
      ],
    },
    {
      title: t("categories.complex"),
      examples: [
        { href: "/examples/nested", label: t("examples.nested") },
        { href: "/examples/conditional", label: t("examples.conditional") },
        { href: "/examples/wizard", label: t("examples.wizard") },
      ],
    },
  ];

  return (
    <NavigationMenu dir={direction}>
      <NavigationMenuList>
        {mainLinks.map((link) => {
          const isActive =
            pathname === link.href ||
            (link.href !== "/" && pathname.startsWith(link.href));

          return (
            <NavigationMenuItem key={link.href}>
              <Link href={link.href} passHref>
                <NavigationMenuLink
                  className={cn(
                    navigationMenuTriggerStyle(),
                    isActive && "font-medium bg-accent text-accent-foreground"
                  )}
                >
                  {link.label}
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          );
        })}

        <NavigationMenuItem>
          <NavigationMenuTrigger>
            {t("examples.examples")}
          </NavigationMenuTrigger>
          <NavigationMenuContent className="NavigationMenuContent">
            <div className="grid p-6 w-[560px] grid-cols-3 gap-5">
              {exampleCategories.map((category) => (
                <div key={category.title}>
                  <h4 className="text-sm font-semibold mb-3 pb-1 border-b">
                    {category.title}
                  </h4>
                  <ul className="space-y-2">
                    {category.examples.map((example) => (
                      <li key={example.href}>
                        <Link href={example.href} passHref>
                          <NavigationMenuLink
                            className={cn(
                              "block text-sm rounded-md px-3 py-2 hover:bg-accent/30 hover:text-accent-foreground transition-colors",
                              pathname === example.href
                                ? "bg-accent/60 text-accent-foreground font-medium"
                                : "text-foreground/70"
                            )}
                          >
                            {example.label}
                          </NavigationMenuLink>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
