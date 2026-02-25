import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Analytics } from "@vercel/analytics/react"

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ВетерОК! — Ветеринарная клиника",
  description: "Сеть ветеринарных клиник ВетерОК! — профессиональная помощь вашим питомцам. Терапия, хирургия, диагностика и многое другое.",
  keywords: ["ветклиника", "ветеринар", "ветеринарная клиника", "ВетерОК", "лечение животных"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={`${inter.variable} font-sans antialiased`}>
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
