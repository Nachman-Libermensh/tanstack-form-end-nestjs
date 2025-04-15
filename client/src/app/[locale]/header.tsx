"use client";

import LanguageSwitcher from "@/components/language-switcher";
// import LibrarySwitcher from "@/components/library-switcher";
import Navigation from "@/components/navigation";
import ToggleTheme from "@/components/toggle-theme";
import { Link } from "@/i18n/navigation";
import { GithubIcon } from "lucide-react";
import Image from "next/image";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-background/80 border-b border-border/30 shadow-lg transition-all duration-300">
      <div className="w-full px-4 md:px-8 flex h-20 items-center justify-between transition-all duration-300">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="rounded-xl bg-gradient-to-tr from-sky-300 via-teal-200 to-yellow-200 p-1 shadow-md group-hover:scale-105 transition-transform">
              <Image src="/favicon.ico" alt="icon" width={32} height={32} />
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight bg-gradient-to-r from-neutral-900 via-muted-foreground to-neutral-500 bg-clip-text text-transparent">
              TanStackPlayground
            </h1>
          </Link>
          <nav className="hidden md:flex items-center">
            <Navigation />
          </nav>
        </div>
        <div className="flex items-center gap-3">
          {/* <LibrarySwitcher /> */}
          <LanguageSwitcher />
          <ToggleTheme />
          <Link
            href="https://github.com/Nachman-Libermensh/tanstack-form-end-nestjs"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
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
