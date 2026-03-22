import { Cormorant_Garamond, Montserrat } from "next/font/google";
import "./globals.css";
import type { Metadata } from "next";
import { ThemeProvider } from "@/components/ThemeProvider";
import { LanguageProvider } from "@/components/LanguageProvider";
import ServiceWorkerRegister from "@/components/ServiceWorkerRegister";

// 1. Lüks Başlık Fontu (Serif)
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

// 2. Modern Gövde Fontu (Sans-Serif)
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["300", "400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ristorante Stellato | Ultra-Luxury Italian Dining",
  description: "Geleneksel İtalyan lezzetlerinin modern gastronomi ile buluştuğu nokta.",
  manifest: "/manifest.json",
  themeColor: "#D4AF37",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Stellato",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" className="scroll-smooth">
      <body className={`${cormorant.variable} ${montserrat.variable} antialiased`}>
        <ThemeProvider>
          <LanguageProvider>
            {children}
            <ServiceWorkerRegister />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
