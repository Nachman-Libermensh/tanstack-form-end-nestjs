"use client";

import { useEffect, useState } from "react";
import { Link } from "@/i18n/navigation";
import Navigation from "./navigation";
import LanguageSwitcher from "@/components/language-switcher";
import ToggleTheme from "@/components/toggle-theme";
import Image from "next/image";
import { GithubIcon } from "lucide-react";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full backdrop-blur-xl transition-[height,background,box-shadow] duration-300 ease-out will-change-[height,background,box-shadow]
        ${
          scrolled
            ? "h-16 bg-background/80 shadow-md border-b border-border/30"
            : "h-24 bg-transparent shadow-none border-transparent"
        }`}
    >
      <div className="flex items-center justify-between w-full h-full px-4 md:px-8 transition-all duration-300 ease-out">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-3 group">
            <div
              className={`rounded-xl bg-gradient-to-tr from-sky-300 via-teal-200 to-yellow-200 p-1 shadow-md transition-transform duration-300 ease-out ${
                scrolled ? "scale-90" : "scale-100"
              }`}
            >
              <div className="relative w-10 h-10">
                <Image
                  src="/favicon.ico"
                  alt="icon"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
            <h1
              className={`font-extrabold tracking-tight transition-transform duration-300 ease-out
                ${
                  scrolled
                    ? "scale-95 text-lg md:text-xl"
                    : "scale-100 text-2xl md:text-3xl"
                }
                text-foreground`}
            >
              TanStack Playground
            </h1>
          </Link>
          <Navigation />
        </div>
        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <ToggleTheme />
          <Link
            href="https://github.com/Nachman-Libermensh/tanstack-form-end-nestjs"
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-opacity duration-300 ${
              scrolled ? "opacity-90" : "opacity-100"
            }`}
          >
            <GithubIcon className="h-5 w-5" />
            <span className="hidden sm:inline font-medium">GitHub</span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
