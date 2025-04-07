import type { Metadata } from "next";

import "./globals.css";
import { ThemeProvider } from "@/providers/theme-provider";
import { UILibraryProvider } from "@/providers/ui-library-provider";
import { Toaster } from "@/components/ui/sonner";
import Link from "next/link";
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
    <html
      lang={locale}
      dir={locale === "he" ? "rtl" : "ltr"}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-background text-foreground antialiased">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <UILibraryProvider>
              <div className="flex flex-col min-h-screen">
                <header className="w-full bg-background border-b sticky top-0 z-50">
                  <div className="w-full px-4 md:px-6 lg:px-8 flex h-16 items-center justify-between">
                    <div className="flex items-center gap-6">
                      <Link href="/" className="flex items-center gap-2">
                        <div className="rounded-lg bg-primary p-1 text-primary-foreground">
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
                        <h1 className="text-xl font-bold">
                          TanStack Form + NestJS
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
                        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <GithubIcon className="h-4 w-4" />
                        <span className="hidden sm:inline">GitHub</span>
                      </Link>
                    </div>
                  </div>
                </header>
                {children}
              </div>
              <Toaster />
            </UILibraryProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
