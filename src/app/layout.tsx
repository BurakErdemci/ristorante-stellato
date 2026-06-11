import { Bodoni_Moda, Jost } from "next/font/google";
import "./globals.css";
import type { Metadata, Viewport } from "next";
import { LanguageProvider } from "@/components/LanguageProvider";
import SmoothScrollProvider from "@/components/layout/SmoothScrollProvider";
import ServiceWorkerRegister from "@/components/ServiceWorkerRegister";

// Display fontu (serif, italik destekli)
const bodoni = Bodoni_Moda({
  subsets: ["latin", "latin-ext"],
  variable: "--font-bodoni",
  weight: ["400", "500"],
  style: ["normal", "italic"],
  display: "swap",
});

// Gövde fontu (sans-serif)
const jost = Jost({
  subsets: ["latin", "latin-ext"],
  variable: "--font-jost",
  weight: ["300", "400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Stellato — Cena Sotto le Stelle",
  description: "Yıldızların altında bir İtalyan akşamı. Ristorante Stellato, İstanbul.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Stellato",
  },
};

export const viewport: Viewport = {
  themeColor: "#C9A36A",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <body className={`${bodoni.variable} ${jost.variable} antialiased`}>
        <LanguageProvider>
          <SmoothScrollProvider>
            {children}
            <ServiceWorkerRegister />
          </SmoothScrollProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
