import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Services from '@/components/Services';
import Work from '@/components/Work';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import PageTransition from '@/components/PageTransition';

export default function Home() {
  return (
    <>
      <PageTransition />
      <main className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900">
        <Navbar />
        <Hero />
        <About />
        <Services />
        <Work />
        <Contact />
        <Footer />
      </main>
    </>
  );
}
