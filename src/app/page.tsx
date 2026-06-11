import Header from "@/components/layout/Header";
import CustomCursor from "@/components/layout/CustomCursor";
import Hero from "@/components/home/Hero";
import Marquee from "@/components/home/Marquee";
import Storia from "@/components/home/Storia";
import Menu from "@/components/home/Menu";
import Cantina from "@/components/home/Cantina";
import Sera from "@/components/home/Sera";
import Riserva from "@/components/home/Riserva";
import Footer from "@/components/home/Footer";

export default function Home() {
  return (
    <main className="w-full">
      <CustomCursor />
      <Header />
      <Hero />
      <Marquee />
      <Storia />
      <Menu />
      <Cantina />
      <Sera />
      <Riserva />
      <Footer />
    </main>
  );
}
