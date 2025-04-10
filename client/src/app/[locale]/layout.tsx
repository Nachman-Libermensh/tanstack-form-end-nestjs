import type { Metadata } from "next";

import "./globals.css";
import { ThemeProvider } from "@/providers/theme-provider";
import { UILibraryProvider } from "@/providers/ui-library-provider";
import { Toaster } from "@/components/ui/sonner";

import { GithubIcon } from "lucide-react";
import ToggleTheme from "@/components/toggle-theme";
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import Navigation from "@/components/navigation";
import LanguageSwitcher from "@/components/language-switcher";
import LibrarySwitcher from "@/components/library-switcher";
import { Link } from "@/i18n/navigation";
import { getDirection } from "@/lib/get-dir";
import Background from "./bacground";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: t("site.title"),
    description: t("site.description"),
  };
}

export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages({ locale });

  return (
    <html lang={locale} dir={getDirection(locale)} suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground antialiased relative selection:bg-primary/30">
        {/* Modern dynamic background */}
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
          <Background />
        </div>

        <NextIntlClientProvider locale={locale} messages={messages}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <UILibraryProvider>
              <div className="flex flex-col min-h-screen">
                {/* Header */}
                <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-background/70 border-b border-border/40 shadow-sm transition-colors">
                  <div className="w-full max-w-screen-xl mx-auto px-4 md:px-6 lg:px-8 flex h-16 items-center justify-between">
                    <div className="flex items-center gap-6">
                      <Link href="/" className="flex items-center gap-2 group">
                        <div className="rounded-lg bg-primary p-1 text-primary-foreground shadow-md transition-transform group-hover:scale-105">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-5 w-5"
                          >
                            <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
                            <path d="M13 2v7h7" />
                          </svg>
                        </div>
                        <h1 className="text-xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                          TanStack Form + NestJS
                        </h1>
                      </Link>
                      <Navigation />
                    </div>
                    <div className="flex items-center gap-3">
                      <LibrarySwitcher />
                      <LanguageSwitcher />
                      <ToggleTheme />
                      <Link
                        href="https://github.com/Nachman-Libermensh/tanstack-form-end-nestjs"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <GithubIcon className="h-4 w-4" />
                        <span className="hidden sm:inline">GitHub</span>
                      </Link>
                    </div>
                  </div>
                </header>

                {/* Main content */}
                <main className="flex-1 w-full max-w-screen-xl mx-auto px-4 md:px-6 lg:px-8 py-6">
                  {children}
                </main>
              </div>
              <Toaster />
            </UILibraryProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
