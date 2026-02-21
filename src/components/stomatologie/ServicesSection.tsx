import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Stethoscope, Smile, Sparkles, Scissors, Crown, Baby, ArrowRight, ChevronRight } from 'lucide-react';
import implantologieBg from '@/assets/implantologie-bg.jpeg';
import chirurgieBg from '@/assets/chirurgie-bg.jpeg';
import ortodontieBg from '@/assets/ortodontie-bg.png';
import copiiBg from '@/assets/copii-bg.jpeg';
import proteticaBg from '@/assets/protetica-bg.png';
import albireBg from '@/assets/albire-bg.jpeg';

const services = [{
  icon: Stethoscope,
  title: 'Implantologie',
  description: 'Implanturi dentare de ultimă generație pentru un zâmbet perfect și durabil.',
  features: [] as string[],
  color: 'from-emerald-500/20 to-teal-500/20',
  bgImage: implantologieBg,
  hideDetails: true
}, {
  icon: Smile,
  title: 'Ortodonție',
  description: 'Aparate dentare invizibile și clasice pentru alinierea perfectă a dinților.',
  features: [] as string[],
  color: 'from-cyan-500/20 to-blue-500/20',
  bgImage: ortodontieBg,
  hideDetails: true
}, {
  icon: Sparkles,
  title: 'Albire Dentară',
  description: 'Tratamente profesionale de albire pentru un zâmbet strălucitor.',
  features: [] as string[],
  color: 'from-amber-500/20 to-yellow-500/20',
  bgImage: albireBg,
  hideDetails: true
}, {
  icon: Scissors,
  title: 'Chirurgie Orală',
  description: 'Intervenții chirurgicale minim invazive cu recuperare rapidă.',
  features: [] as string[],
  color: 'from-rose-500/20 to-pink-500/20',
  bgImage: chirurgieBg,
  hideDetails: true
}, {
  icon: Crown,
  title: 'Protetică',
  description: 'Coroane, fațete și proteze de înaltă calitate pentru funcționalitate perfectă.',
  features: [] as string[],
  color: 'from-purple-500/20 to-violet-500/20',
  bgImage: proteticaBg,
  hideDetails: true
}, {
  icon: Baby,
  title: 'Stomatologie Copii',
  description: 'Îngrijire dentară adaptată pentru cei mici, într-un mediu prietenos.',
  features: [] as string[],
  color: 'from-green-500/20 to-lime-500/20',
  bgImage: copiiBg,
  hideDetails: true
}];

const ServiceCard = ({
  service,
  index
}: {
  service: typeof services[0];
  index: number;
}) => {
  return <motion.div initial={{
    opacity: 0,
    y: 50
  }} whileInView={{
    opacity: 1,
    y: 0
  }} transition={{
    duration: 0.6,
    delay: index * 0.1
  }} viewport={{
    once: true,
    margin: "-50px"
  }} className="relative">
      <div className={`relative h-full p-8 rounded-3xl glass overflow-hidden ${service.bgImage ? 'flex flex-col justify-end min-h-[480px]' : ''}`}>
        {/* Background Image */}
        {service.bgImage && (
          <div className="absolute inset-0 z-0">
            <motion.img src={service.bgImage} alt="" className="w-full h-full object-cover" initial={{ scale: 1 }} whileInView={{ scale: 1.16 }} transition={{ duration: 1.5, ease: "easeOut" }} viewport={{ once: true }} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-black/10" />
          </div>
        )}

        {/* Content */}
        <div className={`relative z-10 ${service.bgImage ? 'backdrop-blur-md bg-background/50 rounded-2xl px-3 pt-3 pb-3 mt-auto' : ''}`}>
          {/* Icon */}
          {!service.bgImage && (
            <div className="w-16 h-16 rounded-2xl bg-accent/20 flex items-center justify-center mb-6">
              <service.icon className="w-8 h-8 text-accent" />
            </div>
          )}

          {/* Title */}
          <h3 className={`font-display text-xl font-bold text-foreground ${service.bgImage ? 'mb-1' : 'mb-3'}`}>
            {service.title}
          </h3>

          {/* Description */}
          <p className={`leading-relaxed ${service.bgImage ? 'mb-0 text-sm text-foreground font-medium' : 'mb-6 text-muted-foreground'}`}>
            {service.description}
          </p>

          {/* Features */}
          {service.features.length > 0 && (
            <div className="space-y-2 mb-6">
              {service.features.map((feature, i) => (
                <div key={i} className="flex items-center gap-2 text-sm">
                  <ChevronRight className="w-4 h-4 text-accent" />
                  <span className="text-foreground/80">{feature}</span>
                </div>
              ))}
            </div>
          )}

          {/* CTA */}
          {!service.hideDetails && (
            <div className="flex items-center gap-2 text-accent font-medium">
              <span>Detalii</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          )}
        </div>
      </div>
    </motion.div>;
};

export const ServicesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "-100px"
  });
  return <section id="services" className="relative py-16 sm:py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/15 to-transparent" />
      <div className="absolute inset-0 grid-pattern" />

      {/* Floating Orbs */}
      <motion.div className="absolute top-40 left-10 w-72 h-72 rounded-full bg-primary/5 blur-3xl" animate={{
      scale: [1, 1.2, 1],
      x: [0, 50, 0]
    }} transition={{
      duration: 12,
      repeat: Infinity
    }} />
      <motion.div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-accent/5 blur-3xl" animate={{
      scale: [1, 1.3, 1],
      y: [0, -50, 0]
    }} transition={{
      duration: 15,
      repeat: Infinity
    }} />

      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        {/* Section Header */}
        <motion.div initial={{
        opacity: 0,
        y: 30
      }} animate={isInView ? {
        opacity: 1,
        y: 0
      } : {}} transition={{
        duration: 0.8
      }} className="text-center mb-20">
          <motion.span className="inline-block px-4 py-2 rounded-full glass text-sm font-medium text-accent mb-4" whileHover={{
          scale: 1.05
        }}>
            Serviciile Noastre
          </motion.span>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold mb-6">
            <span className="text-foreground">Tratamente </span>
            <span className="gradient-text"></span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto">Oferim toată gama de servicii stomatologice, de la prevenție și tratamente cosmetice până la intervenții chirurgicale complexe.</p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {services.map((service, index) => <ServiceCard key={index} service={service} index={index} />)}
        </div>

        {/* Bottom CTA */}
        <motion.div initial={{
        opacity: 0,
        y: 30
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true
      }} transition={{
        delay: 0.5
      }} className="text-center mt-16">
          <motion.div
            className="px-8 py-4 rounded-2xl glass border border-accent/30 text-center max-w-xl mx-auto"
            animate={{ scale: [1, 1.03, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="font-semibold text-foreground">Serviciile vor fi personalizate pt dvs., iar fiecare serviciu va avea o pagina dedicata</span>
          </motion.div>
        </motion.div>
      </div>
    </section>;
};
