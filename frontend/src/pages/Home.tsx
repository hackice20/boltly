import { Navbar } from '../components/landing/Navbar';
import { Hero } from '../components/landing/Hero';
import { About } from '../components/landing/About';
import { Features } from '../components/landing/Features';
import { HowItWorks } from '../components/landing/HowItWorks';
import { WhyBoltly } from '../components/landing/WhyBoltly';
import { OpenSource } from '../components/landing/OpenSource';
import { Footer } from '../components/landing/Footer';

export function Home() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-electric-500/30 font-sans">
      <Navbar />
      <Hero />
      <Features />
      {/* Keeping these sections as they fit the mood, maybe refactor later if requested */}
      <About />
      <HowItWorks />
      <WhyBoltly />
      <OpenSource />
      <Footer />
    </div>
  );
}