import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import AppInit from "@/components/layout/AppInit";

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  weight: ["600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Grana+",
  description: "Aprenda a investir de forma gamificada, no seu ritmo.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${nunito.variable} font-sans antialiased bg-slate-50 text-brand-dark`}>
        <AppInit />
        {children}
      </body>
    </html>
  );
}
