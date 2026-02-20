import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import clinicPhoto from '@/assets/clinic-photo.jpg';
import { useClinic } from '@/context/ClinicContext';

const features = [
  'Echipamente de ultimă generație',
  'Sterilizare la cele mai înalte standarde',
  'Radiografie digitală 3D',
  'Tratamente minim invazive',
];


export const AboutSection = () => {
  const clinic = useClinic();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    },
  };

  return (
    <section id="about" className="relative py-16 sm:py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/30 to-background" />
      <div className="absolute inset-0 grid-pattern opacity-50" />
      
      {/* Floating Elements */}
      <motion.div
        className="absolute top-20 right-10 w-64 h-64 rounded-full bg-accent/5 blur-3xl"
        animate={{ 
          scale: [1, 1.2, 1],
          rotate: [0, 90, 0],
        }}
        transition={{ duration: 15, repeat: Infinity }}
      />

      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-6xl mx-auto"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-10 sm:mb-20">
            <motion.span 
              className="inline-block px-4 py-2 rounded-full glass text-sm font-medium text-accent mb-4"
              whileHover={{ scale: 1.05 }}
            >
              Despre Noi
            </motion.span>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold mb-6">
              <span className="text-foreground">Excelență în </span>
              <span className="gradient-text">Stomatologie</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              De peste 15 ani, suntem lideri în furnizarea de servicii stomatologice 
              de înaltă calitate în {clinic.city}. Combinăm tehnologia avansată cu
              experiența medicală pentru rezultate excepționale.
            </p>
          </motion.div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center mb-16 md:mb-24">
            {/* Left - Image/Visual */}
            <motion.div 
              variants={itemVariants}
              className="relative"
            >
              <div className="relative aspect-square max-w-md mx-auto">
                {/* Clinic Photo */}
                <motion.div 
                  className="absolute inset-8 rounded-3xl overflow-hidden"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <img 
                    src={clinicPhoto} 
                    alt="Cabinet stomatologic modern" 
                    className="w-full h-full object-cover"
                  />
                </motion.div>

                {/* Floating Badge */}
                <motion.div 
                  className="absolute -top-4 -right-4 glass px-4 py-2 rounded-full"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <span className="text-sm font-medium text-accent">✨ Premium</span>
                </motion.div>
              </div>
            </motion.div>

            {/* Right - Content */}
            <motion.div variants={itemVariants} className="space-y-8">
              <div>
                <h3 className="font-display text-2xl font-bold mb-4 text-foreground">
                  De ce să ne alegi ?
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Pentru noi - fiecare pacient este unic. Oferim tratamente personalizate, 
                  într-un mediu confortabil și sigur.
                </p>
              </div>

              {/* Features List */}
              <div className="space-y-4">
                {features.map((feature, i) => (
                  <motion.div
                    key={i}
                    className="flex items-center gap-4 p-4 bg-primary rounded-xl group hover:bg-primary/90 transition-colors"
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    whileHover={{ x: 10 }}
                  >
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
                      <motion.div
                        className="w-3 h-3 rounded-full bg-white"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                      />
                    </div>
                    <span className="font-medium text-white">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
