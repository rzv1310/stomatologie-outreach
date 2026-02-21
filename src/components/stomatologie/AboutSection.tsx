import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Cpu, ShieldCheck, HeartPulse } from 'lucide-react';
import clinicPhoto from '@/assets/clinic-photo.jpg';
import DisplayCards from '@/components/ui/display-cards';
import { useClinic } from '@/context/ClinicContext';

const featureCards = [
  {
    icon: <Cpu className="size-4 text-primary" />,
    title: 'Echipamente',
    description: 'Aparatură de ultimă generație',
    date: 'Tehnologie modernă',
    iconClassName: 'text-primary',
    titleClassName: 'text-primary',
    className:
      "[grid-area:stack] hover:-translate-y-10 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
  },
  {
    icon: <ShieldCheck className="size-4 text-primary" />,
    title: 'Sterilizare',
    description: 'Standarde înalte de sterilizare',
    date: 'Siguranță maximă',
    iconClassName: 'text-primary',
    titleClassName: 'text-primary',
    className:
      "[grid-area:stack] translate-x-12 translate-y-10 hover:-translate-y-1 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
  },
  {
    icon: <HeartPulse className="size-4 text-primary" />,
    title: 'Tratamente',
    description: 'Tratamente minim invazive',
    date: 'Confort pacient',
    iconClassName: 'text-primary',
    titleClassName: 'text-primary',
    className:
      "[grid-area:stack] translate-x-24 translate-y-20 hover:translate-y-10",
  },
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
    <section id="about" className="relative py-16 sm:py-24 md:py-20 overflow-hidden">
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
               De peste 7 ani, suntem dedicați în furnizarea de servicii stomatologice
               de înaltă calitate în {clinic.city}.
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
                <p className="text-muted-foreground leading-relaxed mb-12">
                  Pentru noi - fiecare pacient este unic. Oferim tratamente personalizate,
                  într-un mediu confortabil și sigur.
                </p>
              </div>

              {/* Features Display Cards */}
              <DisplayCards cards={featureCards} />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
