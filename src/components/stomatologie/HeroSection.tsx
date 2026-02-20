import { motion } from 'framer-motion';
import { ChevronDown, Calendar, Phone, Sparkles } from 'lucide-react';
import { ParticleField } from './ParticleField';
import { Button } from '@/components/ui/button';
import { useClinic } from '@/context/ClinicContext';

export const HeroSection = () => {
  const clinic = useClinic();

  const scrollToServices = () => {
    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Background Elements */}
      <div className="absolute inset-0 grid-pattern" />
      <ParticleField />
      
      {/* Floating Geometric Shapes - z-[2] to be above teeth but below content */}
      <motion.div
        className="absolute top-20 left-10 w-32 h-32 rounded-full bg-accent/10 blur-3xl z-[2]"
        animate={{ 
          scale: [1, 1.2, 1],
          x: [0, 30, 0],
          y: [0, -20, 0],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-32 right-20 w-48 h-48 rounded-full bg-primary/10 blur-3xl z-[2]"
        animate={{ 
          scale: [1, 1.3, 1],
          x: [0, -40, 0],
          y: [0, 30, 0],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">

        {/* Main Title */}
        <motion.h1 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 md:mb-8"
        >
          <span className="text-foreground">Stomatologie </span>
          <span className="gradient-text glow-text">{clinic.city}</span>
        </motion.h1>


        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="font-body text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 md:mb-12 px-2"
        >
          Tehnologie de ultimă generație și expertiză medicală de excepție 
          pentru zâmbetul pe care îl meriți. Descoperă viitorul stomatologiei.
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

        {/* Stats Preview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="mt-12 md:mt-20 grid grid-cols-3 gap-4 sm:gap-8 max-w-xl mx-auto px-2"
        >
          {[
            { value: '15+', label: 'Ani Experiență' },
            { value: '10k+', label: 'Pacienți Fericiți' },
            { value: '98%', label: 'Rată Succes' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              className="text-center"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="font-display text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold gradient-text">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm text-muted-foreground mt-1">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

    </section>
  );
};
