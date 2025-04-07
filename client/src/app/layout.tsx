import type { Metadata } from "next";

import "./globals.css";
import { ThemeProvider } from "@/providers/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import Link from "next/link";
import { GithubIcon } from "lucide-react";
import ToggleTheme from "@/components/toggle-theme";

export const metadata: Metadata = {
  title: "מערכת טפסים מתקדמת",
  description: "מערכת לניהול טפסים באמצעות TanStack Form ו-Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl" suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {" "}
          <div className="flex flex-col min-h-screen">
            {/* Header - מתוח מקצה לקצה */}

            <header className="w-full bg-background border-b">
              <div className="flex h-16 items-center justify-between px-4">
                <h1 className="text-xl font-bold">TanStack Form + NestJS</h1>
                <div className="flex items-center gap-4">
                  <ToggleTheme />
                  <Link
                    href="https://github.com/Nachman-Libermensh/tanstack-form-end-nestjs"
                    className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
                  >
                    <GithubIcon className="h-4 w-4" />
                    <span>GitHub</span>
                  </Link>
                </div>
              </div>
            </header>

            {children}
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
