import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Материалы для дизайнеров — Иван Панькин",
  description: "Промпты, инструкции, скиллы и гайды для работы дизайнеров с AI",
  icons: { icon: "/brand/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ru" data-scroll-behavior="smooth"><body><Header /><main>{children}</main><Footer /></body></html>;
}
