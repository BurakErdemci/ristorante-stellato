import { Cormorant_Garamond, Montserrat } from "next/font/google";
import "./globals.css";

// 1. Lüks Başlık Fontu (Serif) - Cormorant, fine-dining için mükemmeldir.
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

export const metadata = {
  title: "Ristorante Stellato | Ultra-Luxury Italian Dining",
  description: "Geleneksel İtalyan lezzetlerinin modern gastronomi ile buluştuğu nokta.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr" className="scroll-smooth">
      <body
        // bg-[#050505] ile component arkaplanlarını eşitledik.
        // selection:... ile kullanıcı metni seçtiğinde altın rengi yanmasını sağladık.
        className={`${cormorant.variable} ${montserrat.variable} antialiased bg-stellato-black text-stone-300 selection:bg-stellato-gold selection:text-black overflow-x-hidden`}
      >
        {children}
      </body>
    </html>
  );
}