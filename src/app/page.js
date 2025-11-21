import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import MenuSection from '@/components/MenuSection';
import Gallery from '@/components/Gallery';
import Contact from '@/components/Contact';
import Accolades from '@/components/Accolades';

export default function Home() {
  return (
    <main className="w-full">
      <Navbar />
      <Hero />
      <Accolades/>
      <About />
      <MenuSection />
       <Gallery />
      <Contact />
    </main>
  );
}