"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

export default function Navigation() {
  const t = useTranslations("navigation");
  const pathname = usePathname();

  const links = [
    { href: "/", label: t("home") },
    { href: "/how-it-works", label: t("howItWorks") },
    { href: "/playground", label: t("playground") },
  ];

  return (
    <nav className="flex items-center space-x-4 lg:space-x-6 mx-6 rtl:space-x-reverse">
      {links.map((link) => {
        const isActive =
          pathname === link.href ||
          (link.href !== "/" && pathname.startsWith(link.href));

        return (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "text-sm transition-colors hover:text-primary",
              isActive ? "text-foreground font-medium" : "text-muted-foreground"
            )}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
