import { useEffect } from 'react';
import { Navbar } from '@/components/stomatologie/Navbar';
import { HeroSection } from '@/components/stomatologie/HeroSection';
import { AboutSection } from '@/components/stomatologie/AboutSection';
import { ServicesSection } from '@/components/stomatologie/ServicesSection';
import { TeamSection } from '@/components/stomatologie/TeamSection';
import { TarifeSection } from '@/components/stomatologie/TarifeSection';
import { TestimonialsSection } from '@/components/stomatologie/TestimonialsSection';
import { ContactSection } from '@/components/stomatologie/ContactSection';
import { Footer } from '@/components/stomatologie/Footer';
import { useClinic } from '@/context/ClinicContext';

const Index = () => {
  const clinic = useClinic();

  useEffect(() => {
    document.title = `Stomatologie ${clinic.city}`;
  }, [clinic.city]);

  return (
    <div className="relative overflow-hidden">
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <TeamSection />
        <TarifeSection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;

