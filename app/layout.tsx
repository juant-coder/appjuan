import type { Metadata, Viewport } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import AppInit from "@/components/layout/AppInit";

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Grana+",
  description: "Aprenda a investir de forma gamificada, no seu ritmo.",
  manifest: "/appjuan/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Grana+",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#0b0b16",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="dark">
      <body
        className={`${nunito.variable} font-sans antialiased bg-slate-100 text-slate-900 dark:bg-[#0b0b16] dark:text-slate-100`}
      >
        <AppInit />
        {children}
      </body>
    </html>
  );
}
