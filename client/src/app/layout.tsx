import { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
// import { Provider } from "jotai";
import GlobalModal from "@/_components/modal-views/container";
import ContextProvider from "@/providers/context-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tanstack Form עם NestJS",
  description: "דוגמה לשימוש ב-Tanstack Form עם NestJS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl">
      <body className={inter.className}>
        <ContextProvider>
          {children} <GlobalModal />
        </ContextProvider>
      </body>
    </html>
  );
}
