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
      <NavigationMenuList dir="rtl">
        {mainLinks.map((link) => {
          const isActive =
            pathname === link.href ||
            (link.href !== "/" && pathname.startsWith(link.href));

          return (
            <NavigationMenuItem dir="rtl" key={link.href}>
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
          <NavigationMenuContent>
            <div className="grid gap-3 p-4 md:w-[500px] lg:w-[600px] lg:grid-cols-3">
              {exampleCategories.map((category) => (
                <div key={category.title} className="space-y-2">
                  <h4 className="text-sm font-medium leading-none">
                    {category.title}
                  </h4>
                  <div className="space-y-1">
                    {category.examples.map((example) => (
                      <Link key={example.href} href={example.href} passHref>
                        <NavigationMenuLink
                          className={cn(
                            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                            pathname === example.href &&
                              "bg-accent text-accent-foreground"
                          )}
                        >
                          <div className="text-sm font-medium leading-none">
                            {example.label}
                          </div>
                        </NavigationMenuLink>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
