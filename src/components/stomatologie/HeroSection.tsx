import { motion } from 'framer-motion';
import { Phone } from 'lucide-react';
import { ParticleField } from './ParticleField';
import { Button } from '@/components/ui/button';
import { useClinic } from '@/context/ClinicContext';
import heroBg from '@/assets/hero-bg.jpeg';

export const HeroSection = () => {
  const clinic = useClinic();

  return (
    <section className="relative min-h-screen md:h-screen flex items-center md:items-end justify-center overflow-hidden bg-gradient-to-b from-amber-500/20 via-yellow-500/10 to-transparent md:bg-gradient-to-b md:from-background md:via-secondary/30 md:to-background pt-20 pb-10 md:pt-0 md:pb-0">
      {/* Background Image - Desktop Only */}
      <div
        className="absolute inset-0 hidden md:block bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
      />

      {/* Background Elements - Mobile Only */}
      <div className="absolute inset-0 grid-pattern md:hidden" />
      <div className="md:hidden">
        <ParticleField />
      </div>

      {/* Floating Geometric Shapes - Mobile Only */}
      <motion.div
        className="absolute top-20 left-10 w-32 h-32 rounded-full bg-accent/10 blur-3xl z-[2] md:hidden"
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 30, 0],
          y: [0, -20, 0],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-32 right-20 w-48 h-48 rounded-full bg-primary/10 blur-3xl z-[2] md:hidden"
        animate={{
          scale: [1, 1.3, 1],
          x: [0, -40, 0],
          y: [0, 30, 0],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        {/* Glass card wrapper - desktop only */}
        <div className="md:backdrop-blur-md md:bg-background/50 md:rounded-2xl md:px-6 md:py-8 md:max-w-3xl md:mx-auto">
          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-4"
          >
            <span className="text-foreground">Stomatologie </span>
            <span className="gradient-text glow-text">{clinic.city}</span>
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
