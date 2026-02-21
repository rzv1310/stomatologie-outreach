import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Tag, Info } from 'lucide-react';

const tarife = [
  {
    categorie: 'Implantologie',
    color: 'from-emerald-500/20 to-teal-500/20',
    servicii: [
      { nume: 'Implant dentar (inclusiv bont)', pret: 'de la 750 €' },
      { nume: 'Implant All-on-4 (arcadă completă)', pret: 'de la 3.000 €' },
      { nume: 'Grefă osoasă', pret: 'de la 200 €' },
    ],
  },
  {
    categorie: 'Ortodonție',
    color: 'from-cyan-500/20 to-blue-500/20',
    servicii: [
      { nume: 'Aparat dentar metalic', pret: 'de la 1.200 €' },
      { nume: 'Aparat ceramic', pret: 'de la 1.800 €' },
      { nume: 'Invisalign (aliniere invizibilă)', pret: 'de la 2.500 €' },
    ],
  },
  {
    categorie: 'Estetică Dentară',
    color: 'from-amber-500/20 to-yellow-500/20',
    servicii: [
      { nume: 'Albire profesională cabinet', pret: 'de la 250 €' },
      { nume: 'Fațete ceramice (per dinte)', pret: 'de la 350 €' },
      { nume: 'Coroană zirconiu', pret: 'de la 280 €' },
    ],
  },
  {
    categorie: 'Tratamente Generale',
    color: 'from-purple-500/20 to-violet-500/20',
    servicii: [
      { nume: 'Consultație + radiografie', pret: '100 lei' },
      { nume: 'Detartraj + periaj profesional', pret: 'de la 150 lei' },
      { nume: 'Plombă (obturație)', pret: 'de la 200 lei' },
      { nume: 'Extracție simplă', pret: 'de la 150 lei' },
      { nume: 'Tratament de canal (endodonție)', pret: 'de la 500 lei' },
    ],
  },
];

export const TarifeSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="tarife" className="relative py-16 sm:py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />
      <div className="absolute inset-0 grid-pattern opacity-50" />

      {/* Floating orb */}
      <motion.div
        className="absolute top-1/3 left-0 w-96 h-96 rounded-full bg-primary/5 blur-3xl"
        animate={{ x: [0, 60, 0], scale: [1, 1.2, 1] }}
        transition={{ duration: 12, repeat: Infinity }}
      />

      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.span
            className="inline-block px-4 py-2 rounded-full glass text-sm font-medium text-accent mb-4"
            whileHover={{ scale: 1.05 }}
          >
            <div className="flex items-center gap-2">
              <Tag className="w-4 h-4" />
              <span>Tarife</span>
            </div>
          </motion.span>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold mb-6">
            <span className="text-foreground">Prețuri </span>
            <span className="gradient-text">Transparente</span>
          </h2>
          <motion.p
            className="text-base sm:text-lg text-foreground max-w-3xl mx-auto"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            Toate tarifele vor fi personalizate pentru dvs. si vom crea o pagină dedicată pentru prețuri
          </motion.p>
        </motion.div>

        {/* Grid of categories */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
          {tarife.map((cat, catIndex) => (
            <motion.div
              key={catIndex}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: catIndex * 0.12 }}
              className="group relative rounded-3xl glass overflow-hidden"
            >
              {/* Gradient bg on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${cat.color} opacity-100`} />

              <div className="relative z-10 p-4 sm:p-6 md:p-8">
                <h3 className="font-display text-lg font-bold text-foreground mb-5 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-accent inline-block" />
                  {cat.categorie}
                </h3>

                <div className="space-y-0 divide-y divide-border/30">
                  {cat.servicii.map((s, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: catIndex * 0.1 + i * 0.06 }}
                      className="flex items-center justify-between py-3 gap-4"
                    >
                      <span className="text-sm text-muted-foreground">{s.nume}</span>
                      <span className="text-sm font-semibold text-foreground whitespace-nowrap">{s.pret}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Bottom glow */}
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          ))}
        </div>

        {/* Disclaimer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-10 flex items-start gap-3 p-5 glass rounded-2xl max-w-3xl mx-auto"
        >
          <Info className="w-5 h-5 text-accent shrink-0 mt-0.5" />
          <p className="text-sm text-muted-foreground">
            Prețurile sunt orientative și pot varia în funcție de complexitatea cazului. Vă rugăm să programați o consultație pentru un deviz personalizat.
          </p>
        </motion.div>
      </div>
    </section>
  );
};
