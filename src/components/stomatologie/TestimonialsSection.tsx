import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Ana Maria D.',
    role: 'Pacient Implantologie',
    content: 'Experiența mea a fost extraordinară! Dr. Popescu mi-a realizat 4 implanturi într-o singură ședință, fără durere. După 20 de ani cu proteze mobile, acum am dinți ficși. Mulțumesc din suflet!',
    rating: 5,
    date: 'Decembrie 2024',
    treatment: 'Implant All-on-4',
  },
  {
    name: 'Mihai P.',
    role: 'Pacient Ortodonție',
    content: 'Am purtat Invisalign timp de 14 luni și rezultatul este spectaculos. Dr. Ionescu a fost foarte atentă la fiecare detaliu. Acum zâmbesc cu încredere în fiecare poză!',
    rating: 5,
    date: 'Noiembrie 2024',
    treatment: 'Invisalign',
  },
  {
    name: 'Elena V.',
    role: 'Pacient Estetică Dentară',
    content: 'Fațetele dentare au transformat complet zâmbetul meu. Echipa a fost profesionistă, clinica este impecabilă, iar rezultatul depășește așteptările. Recomand cu căldură!',
    rating: 5,
    date: 'Octombrie 2023',
    treatment: 'Fațete ceramice',
  },
  {
    name: 'George I.',
    role: 'Părinte mulțumit',
    content: 'Fiica mea de 6 ani se temea de dentist până când am venit aici. Dr. Radu a făcut totul ca pe joacă! Acum copila mea abia așteaptă următoarea vizită.',
    rating: 5,
    date: 'Ianuarie 2026',
    treatment: 'Stomatologie Pediatrică',
  },
  {
    name: 'Cristina M.',
    role: 'Pacient Chirurgie',
    content: 'Am avut o extracție complicată de măsea de minte și mă temeam foarte mult. Intervenția a durat doar 15 minute și recuperarea a fost perfectă. Profesioniști adevărați!',
    rating: 5,
    date: 'Decembrie 2025',
    treatment: 'Chirurgie orală',
  },
];

export const TestimonialsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prev) => {
      const next = prev + newDirection;
      if (next < 0) return testimonials.length - 1;
      if (next >= testimonials.length) return 0;
      return next;
    });
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.9,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.9,
    }),
  };

  return (
    <section id="testimonials" className="relative py-16 sm:py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-background" />
      <div className="absolute inset-0 grid-pattern" />
      
      {/* Decorative Elements */}
      <motion.div
        className="absolute top-20 left-1/4 w-64 h-64 rounded-full bg-primary/5 blur-3xl"
        animate={{ scale: [1, 1.3, 1] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-20 right-1/4 w-80 h-80 rounded-full bg-accent/5 blur-3xl"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-10 sm:mb-16"
        >
          <motion.span 
            className="inline-block px-4 py-2 rounded-full glass text-sm font-medium text-accent mb-4"
            whileHover={{ scale: 1.05 }}
          >
            Testimoniale
          </motion.span>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold mb-6">
            <span className="text-foreground">Ce Spun </span>
            <span className="gradient-text">Pacienții</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Mii de zâmbete transformate, mii de povești de succes.
          </p>
        </motion.div>

        {/* Main Testimonial Carousel */}
        <div className="max-w-4xl mx-auto px-2 sm:px-4">
          <div className="relative min-h-[420px] sm:min-h-[380px] flex items-center justify-center">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="absolute w-full"
              >
                <div className="relative px-8 py-5 sm:p-8 md:p-12 rounded-3xl bg-primary mt-6">
                  {/* Quote Icon */}
                  <motion.div
                    className="absolute -top-6 left-8 w-12 h-12 rounded-full bg-muted border border-primary flex items-center justify-center"
                    initial={{ rotate: -20, scale: 0 }}
                    animate={{ rotate: 0, scale: 1 }}
                    transition={{ delay: 0.2, type: "spring" }}
                  >
                    <Quote className="w-6 h-6 text-primary" />
                  </motion.div>

                  {/* Rating */}
                  <div className="flex gap-1 mb-6 justify-center">
                    {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 + i * 0.1 }}
                      >
                        <Star className="w-6 h-6 text-yellow-400 fill-yellow-400" />
                      </motion.div>
                    ))}
                  </div>

                  {/* Content */}
                  <blockquote className="text-sm sm:text-base md:text-lg text-center leading-relaxed text-white mb-5 sm:mb-8">
                    "{testimonials[currentIndex].content}"
                  </blockquote>

                  {/* Author Info */}
                  <div className="flex flex-col items-center">
                    <h4 className="font-display text-lg font-bold text-white">
                      {testimonials[currentIndex].name}
                    </h4>
                    <p className="text-sm text-white/70 mb-2">{testimonials[currentIndex].role}</p>
                    <div className="flex items-center gap-3 text-sm text-white/60">
                      <span className="px-3 py-1 rounded-full bg-white/20">
                        {testimonials[currentIndex].treatment}
                      </span>
                      <span>{testimonials[currentIndex].date}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons — hidden on mobile, shown on sm+ */}
            <motion.button
              className="hidden sm:flex absolute left-0 sm:-translate-x-full md:-translate-x-1/2 p-3 rounded-full glass hover:bg-accent/20 transition-colors z-10"
              onClick={() => paginate(-1)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronLeft className="w-6 h-6 text-foreground" />
            </motion.button>
            <motion.button
              className="hidden sm:flex absolute right-0 sm:translate-x-full md:translate-x-1/2 p-3 rounded-full glass hover:bg-accent/20 transition-colors z-10"
              onClick={() => paginate(1)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronRight className="w-6 h-6 text-foreground" />
            </motion.button>
          </div>

          {/* Mobile Navigation — below card, visible only on mobile */}
          <div className="flex sm:hidden justify-center gap-6 mt-4">
            <motion.button
              className="p-3 rounded-full glass hover:bg-accent/20 transition-colors"
              onClick={() => paginate(-1)}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronLeft className="w-5 h-5 text-foreground" />
            </motion.button>
            <motion.button
              className="p-3 rounded-full glass hover:bg-accent/20 transition-colors"
              onClick={() => paginate(1)}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronRight className="w-5 h-5 text-foreground" />
            </motion.button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-6 sm:mt-8">
            {testimonials.map((_, i) => (
              <motion.button
                key={i}
                className={`w-3 h-3 rounded-full transition-all ${
                  i === currentIndex ? 'bg-accent w-8' : 'bg-muted hover:bg-muted-foreground/50'
                }`}
                onClick={() => {
                  setDirection(i > currentIndex ? 1 : -1);
                  setCurrentIndex(i);
                }}
                whileHover={{ scale: 1.2 }}
              />
            ))}
          </div>
        </div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-20 text-center"
        >
          <p className="text-sm text-muted-foreground mb-6">Rating pe platforme</p>
          <div className="flex flex-wrap justify-center gap-8">
            {[
              { platform: 'Google', rating: '4.9', reviews: '34' },
              { platform: 'Facebook', rating: '4.8', reviews: '19' },
              { platform: 'TopDoc', rating: '5.0', reviews: '11' },
            ].map((item, i) => (
              <motion.div
                key={i}
                className="flex items-center gap-3 px-6 py-3 glass rounded-full"
                whileHover={{ scale: 1.05 }}
              >
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  <span className="font-bold text-foreground">{item.rating}</span>
                </div>
                <span className="text-muted-foreground">{item.platform}</span>
                <span className="text-sm text-muted-foreground">({item.reviews})</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
