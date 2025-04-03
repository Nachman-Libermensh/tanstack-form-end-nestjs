import { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import { ModalProvider } from "@/providers/modal-provider";

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
        {children}
        {/* פרוביידר למודלים */}
        <ModalProvider />
      </body>
    </html>
  );
}
