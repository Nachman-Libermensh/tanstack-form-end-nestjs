"use client";

import LanguageSwitcher from "@/components/language-switcher";
import ToggleTheme from "@/components/toggle-theme";
import { Link } from "@/i18n/navigation";
import { GithubIcon } from "lucide-react";
import Image from "next/image";
import Navigation from "./navigation";
import { useEffect, useState } from "react";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Check initial scroll position

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  return (
    <header
      className={`sticky top-0 z-50 w-full backdrop-blur-xl transition-all duration-300
        ${
          scrolled
            ? "bg-background/80 border-b border-border/30 shadow-lg translate-y-0 h-16"
            : "bg-transparent border-transparent shadow-none h-24"
        }`}
    >
      <div
        className={`w-full px-4 md:px-8 flex items-center justify-between transition-all duration-300 h-full`}
      >
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-3 group">
            <div
              className={`rounded-xl bg-gradient-to-tr from-sky-300 via-teal-200 to-yellow-200 p-1 shadow-md group-hover:scale-105 transition-transform ${
                scrolled ? "scale-90" : "scale-100"
              }`}
            >
              <Image src="/favicon.ico" alt="icon" width={32} height={32} />
            </div>
            <h1
              className={`text-2xl md:text-3xl font-extrabold tracking-tight bg-gradient-to-r from-neutral-900 via-muted-foreground to-neutral-500 bg-clip-text text-transparent transition-all duration-300 ${
                scrolled ? "scale-95" : "scale-100"
              }`}
            >
              TanStackPlayground
            </h1>
          </Link>
          <nav className="flex items-center">
            <Navigation />
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <ToggleTheme />
          <Link
            href="https://github.com/Nachman-Libermensh/tanstack-form-end-nestjs"
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors ${
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
