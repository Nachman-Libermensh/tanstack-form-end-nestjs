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
import React, { useState } from "react";
import { Link } from "@/i18n/navigation";
import { Home, Settings, PlayCircle, MenuSquare, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useDirection } from "@/i18n/direction";

// Component for a single main navigation link
const MainNavLink = ({
  href,
  label,
  icon,
  isActive,
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
  isActive: boolean;
}) => (
  <NavigationMenuItem>
    <Link href={href} passHref>
      <NavigationMenuLink
        className={cn(
          navigationMenuTriggerStyle(),
          "flex items-center gap-2 rounded-lg text-sm font-medium hover:bg-accent/40 transition-colors",
          isActive && "bg-accent/60 text-accent-foreground shadow-sm"
        )}
      >
        {icon}
        <span>{label}</span>
      </NavigationMenuLink>
    </Link>
  </NavigationMenuItem>
);

// Component for a single example link in the dropdown
const ExampleLink = ({
  href,
  label,
  isActive,
}: {
  href: string;
  label: string;
  isActive: boolean;
}) => (
  <li>
    <Link href={href} passHref>
      <NavigationMenuLink
        className={cn(
          "block text-sm rounded-md px-3 py-2 hover:bg-accent/30 hover:text-accent-foreground transition-colors",
          isActive
            ? "bg-accent/60 text-accent-foreground font-medium shadow-sm"
            : "text-foreground/70"
        )}
      >
        {label}
      </NavigationMenuLink>
    </Link>
  </li>
);

// Interface for example items
interface Example {
  href: string;
  label: string;
}

// Component for a category of examples
const ExampleCategory = ({
  title,
  examples,
  pathname,
}: {
  title: string;
  examples: Example[];
  pathname: string;
}) => (
  <div>
    <h4 className="text-sm font-semibold mb-3 pb-1 border-b border-border">
      {title}
    </h4>
    <ul className="space-y-2">
      {examples.map((example) => (
        <ExampleLink
          key={example.href}
          href={example.href}
          label={example.label}
          isActive={pathname === example.href}
        />
      ))}
    </ul>
  </div>
);

// Interface for example categories
interface ExampleCategory {
  title: string;
  examples: Example[];
}

// Mobile navigation component
const MobileNavigation = ({
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

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden flex">
          <Menu className="h-5 w-5" />
          <span className="sr-only">תפריט</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] p-0">
        <div className="p-6 space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">תפריט</h2>
            <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          <nav className="space-y-1">
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
                  {link.icon}
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-muted-foreground">
              {t("examples.examples")}
            </h3>
            {exampleCategories.map((category) => (
              <div key={category.title} className="space-y-2">
                <h4 className="text-sm font-medium border-b pb-1 border-border">
                  {category.title}
                </h4>
                <div className="pl-2 space-y-1">
                  {category.examples.map((example) => (
                    <Link
                      key={example.href}
                      href={example.href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "block px-3 py-1.5 text-sm rounded transition-colors",
                        pathname === example.href
                          ? "bg-accent/60 text-accent-foreground font-medium"
                          : "text-foreground/70 hover:bg-accent/30"
                      )}
                    >
                      {example.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default function Navigation() {
  const t = useTranslations("navigation");
  const pathname = usePathname();
  const direction = useDirection();

  const mainLinks = [
    { href: "/", label: t("home"), icon: <Home className="w-4 h-4 mr-2" /> },
    {
      href: "/how-it-works",
      label: t("howItWorks"),
      icon: <Settings className="w-4 h-4 mr-2" />,
    },
    {
      href: "/playground",
      label: t("playground"),
      icon: <PlayCircle className="w-4 h-4 mr-2" />,
    },
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
    <div className="flex items-center">
      {/* Mobile Navigation */}
      <MobileNavigation
        mainLinks={mainLinks}
        exampleCategories={exampleCategories}
        pathname={pathname}
      />

      {/* Desktop Navigation */}
      <NavigationMenu dir={direction} className="hidden md:flex">
        <NavigationMenuList className="gap-1">
          {mainLinks.map((link) => {
            const isActive =
              pathname === link.href ||
              (link.href !== "/" && pathname.startsWith(link.href));

            return (
              <MainNavLink
                key={link.href}
                href={link.href}
                label={link.label}
                icon={link.icon}
                isActive={isActive}
              />
            );
          })}

          <NavigationMenuItem>
            <NavigationMenuTrigger className="px-4 py-2 rounded-lg text-sm font-medium hover:bg-accent/40 transition-colors flex items-center gap-2">
              <MenuSquare className="w-4 h-4" />
              {t("examples.examples")}
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="grid p-6 w-[560px] grid-cols-3 gap-5">
                {exampleCategories.map((category) => (
                  <ExampleCategory
                    key={category.title}
                    title={category.title}
                    examples={category.examples}
                    pathname={pathname}
                  />
                ))}
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}
