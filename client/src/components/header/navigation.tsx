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
import { Link } from "@/i18n/navigation";
import { Home, Settings, PlayCircle, MenuSquare } from "lucide-react";
import { useDirection } from "@/i18n/direction";

import { Example } from "@/types";
import { MobileNavigation } from "./mobile-navigation";
// Component for a single main navigation link
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
}) => {
  const direction = useDirection();

  return (
    <NavigationMenuItem>
      <NavigationMenuLink
        asChild
        className={cn(
          navigationMenuTriggerStyle(),
          "flex items-center !flex-row !gap-2 rounded-lg text-sm font-medium hover:bg-accent/40 transition-colors whitespace-nowrap",
          isActive && "bg-accent/60 text-accent-foreground shadow-sm"
        )}
      >
        <Link href={href} passHref>
          <span className="inline-flex items-center justify-center">
            {icon}
          </span>
          <span className={direction === "rtl" ? "me-2" : "ms-2"}>{label}</span>
        </Link>
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
};

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

export default function Navigation() {
  const t = useTranslations("navigation");
  const pathname = usePathname();
  const direction = useDirection();

  const mainLinks = [
    {
      href: "/",
      label: t("home"),
      icon: <Home className="w-4 h-4" />,
    },
    {
      href: "/how-it-works",
      label: t("howItWorks"),
      icon: <Settings className="w-4 h-4" />,
    },
    {
      href: "/playground",
      label: t("playground"),
      icon: <PlayCircle className="w-4 h-4" />,
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
    <div className="flex items-center w-full">
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
            <NavigationMenuTrigger className="px-4 py-2 rounded-lg text-sm font-medium hover:bg-accent/40 transition-colors flex items-center gap-2 whitespace-nowrap">
              <span className="inline-flex items-center justify-center">
                <MenuSquare className="w-4 h-4" />
              </span>
              <span>{t("examples.examples")}</span>
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
