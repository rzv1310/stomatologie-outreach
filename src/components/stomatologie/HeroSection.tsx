import { motion } from 'framer-motion';
import { Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useClinic } from '@/context/ClinicContext';
import heroBg from '@/assets/hero-bg-desktop.png';
import heroMobile from '@/assets/hero-mobile.jpeg';

export const HeroSection = () => {
  const clinic = useClinic();

  return (
    <section className="relative h-screen md:h-screen flex items-end justify-center overflow-hidden pb-6 md:pb-[15px] -mt-[80px] md:mt-0">
      {/* Background Image - Desktop Only */}
      <div
        className="absolute inset-0 hidden md:block bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
      />

      {/* Background Image - Mobile Only */}
      <div
        className="absolute inset-0 md:hidden bg-cover bg-center bg-no-repeat -top-[15px]"
        style={{ backgroundImage: `url(${heroMobile})` }}
      />

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        {/* Glass card wrapper */}
        <div className="backdrop-blur-md bg-background/50 rounded-2xl px-4 py-5 md:px-6 md:py-8 max-w-3xl mx-auto mt-[80px] md:mt-0">
          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-4"
          >
            <span className="text-primary">Stomatologie {clinic.city}</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="font-body text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-6 md:mb-6 px-2"
          >
            Tehnologie de ultimă generație și expertiză medicală de excepție
            pentru zâmbetul pe care îl meriți.
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="flex items-center justify-center"
          >
            <Button
              size="lg"
              asChild
              className="px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg font-semibold rounded-[10px] bg-primary hover:bg-primary/90 text-white transition-all duration-300"
            >
              <a href={`tel:${clinic.phoneTel}`}>
                <Phone className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-white" />
                {clinic.phoneFormatted}
              </a>
            </Button>
          </motion.div>
        </div>
      </div>


    </section>
  );
};
