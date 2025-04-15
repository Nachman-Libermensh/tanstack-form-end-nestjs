import type { Metadata } from "next";

import "./globals.css";
import { ThemeProvider } from "@/providers/theme-provider";
import { UILibraryProvider } from "@/providers/ui-library-provider";
import { Toaster } from "@/components/ui/sonner";

// import { GithubIcon } from "lucide-react";
// import ToggleTheme from "@/components/toggle-theme";
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
// import Navigation from "@/components/navigation";
// import LanguageSwitcher from "@/components/language-switcher";
// import LibrarySwitcher from "@/components/library-switcher";
// import { Link } from "@/i18n/navigation";
import Background from "./bacground";
// import Image from "next/image";
import Header from "./header";
import { getDirection } from "@/lib/direction";

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
  const dir = await getDirection();
  return (
    <html lang={locale} dir={dir} suppressHydrationWarning>
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
                <Header />
                {/* Main content */}
                <main className="flex-1 w-full px-4 md:px-6 lg:px-8 py-10">
                  {children}
                </main>

                {/* Optional Footer */}
                <footer className="w-full py-6 text-center text-sm text-muted-foreground">
                  <p>
                    © {new Date().getFullYear()} TanStack Playground. All rights
                    reserved.
                  </p>
                </footer>
              </div>
              <Toaster />
            </UILibraryProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
