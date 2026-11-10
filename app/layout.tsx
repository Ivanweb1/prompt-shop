import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Материалы для дизайнеров — Иван Панькин",
  description: "Промпты, инструкции, скиллы и гайды для работы дизайнеров с AI",
  icons: { icon: "/prompt-shop/brand/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru" data-scroll-behavior="smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        {/* Manrope 300 нужен для тонких крупных заголовков */}
        <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body><Header /><main>{children}</main><Footer /></body>
    </html>
  );
}
