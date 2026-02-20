import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Stethoscope, Smile, Sparkles, Scissors, Crown, Baby, ArrowRight, ChevronRight } from 'lucide-react';
const services = [{
  icon: Stethoscope,
  title: 'Implantologie',
  description: 'Implanturi dentare de ultimă generație pentru un zâmbet perfect și durabil.',
  features: ['Implant într-o zi', 'Ghidaj 3D', 'Garanție'],
  color: 'from-emerald-500/20 to-teal-500/20'
}, {
  icon: Smile,
  title: 'Ortodonție',
  description: 'Aparate dentare invizibile și clasice pentru alinierea perfectă a dinților.',
  features: ['Invisalign', 'Aparate ceramice', 'Tratament rapid'],
  color: 'from-cyan-500/20 to-blue-500/20'
}, {
  icon: Sparkles,
  title: 'Albire Dentară',
  description: 'Tratamente profesionale de albire pentru un zâmbet strălucitor.',
  features: ['Albire laser', 'Kit acasă', 'Rezultat instant'],
  color: 'from-amber-500/20 to-yellow-500/20'
}, {
  icon: Scissors,
  title: 'Chirurgie Orală',
  description: 'Intervenții chirurgicale minim invazive cu recuperare rapidă.',
  features: ['Extractii complexe', 'Grefe osoase', 'Sedare conștientă'],
  color: 'from-rose-500/20 to-pink-500/20'
}, {
  icon: Crown,
  title: 'Protetică',
  description: 'Coroane, fațete și proteze de înaltă calitate pentru funcționalitate perfectă.',
  features: ['Zirconiu', 'E-max', 'Design digital'],
  color: 'from-purple-500/20 to-violet-500/20'
}, {
  icon: Baby,
  title: 'Stomatologie Copii',
  description: 'Îngrijire dentară adaptată pentru cei mici, într-un mediu prietenos.',
  features: ['Fără durere', 'Jocuri interactive', 'Diplomă de curaj'],
  color: 'from-green-500/20 to-lime-500/20'
}];
const ServiceCard = ({
  service,
  index
}: {
  service: typeof services[0];
  index: number;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({
    x: 0,
    y: 0
  });
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left - rect.width / 2,
      y: e.clientY - rect.top - rect.height / 2
    });
  };
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
  }} className="group relative" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} onMouseMove={handleMouseMove}>
      <motion.div className="relative h-full p-8 rounded-3xl glass overflow-hidden cursor-pointer" style={{
      transform: isHovered ? `perspective(1000px) rotateX(${mousePos.y * -0.02}deg) rotateY(${mousePos.x * 0.02}deg)` : 'perspective(1000px) rotateX(0deg) rotateY(0deg)'
    }} whileHover={{
      scale: 1.02
    }} transition={{
      type: "spring",
      stiffness: 300,
      damping: 20
    }}>
        {/* Background Gradient */}
        <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
        
        {/* Glow Border */}
        <motion.div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{
        background: 'linear-gradient(135deg, hsl(var(--accent)) 0%, transparent 50%, hsl(var(--primary)) 100%)',
        padding: '1px',
        mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
        maskComposite: 'xor',
        WebkitMaskComposite: 'xor'
      }} />

        {/* Content */}
        <div className="relative z-10">
          {/* Icon */}
          <motion.div className="w-16 h-16 rounded-2xl bg-accent/20 flex items-center justify-center mb-6 group-hover:bg-accent/30 transition-colors" animate={isHovered ? {
          rotate: [0, -10, 10, 0]
        } : {}} transition={{
          duration: 0.5
        }}>
            <service.icon className="w-8 h-8 text-accent" />
          </motion.div>

          {/* Title */}
          <h3 className="font-display text-xl font-bold mb-3 text-foreground group-hover:gradient-text transition-all duration-300">
            {service.title}
          </h3>

          {/* Description */}
          <p className="text-muted-foreground mb-6 leading-relaxed">
            {service.description}
          </p>

          {/* Features */}
          <div className="space-y-2 mb-6">
            {service.features.map((feature, i) => <motion.div key={i} className="flex items-center gap-2 text-sm" initial={{
            opacity: 0,
            x: -10
          }} animate={isHovered ? {
            opacity: 1,
            x: 0
          } : {
            opacity: 0.7,
            x: 0
          }} transition={{
            delay: i * 0.1
          }}>
                <ChevronRight className="w-4 h-4 text-accent" />
                <span className="text-foreground/80">{feature}</span>
              </motion.div>)}
          </div>

          {/* CTA */}
          <motion.div className="flex items-center gap-2 text-accent font-medium" animate={isHovered ? {
          x: 5
        } : {
          x: 0
        }}>
            <span>Detalii</span>
            <ArrowRight className="w-4 h-4" />
          </motion.div>
        </div>

        {/* Shimmer Effect */}
        <motion.div className="absolute inset-0 opacity-0 group-hover:opacity-100" initial={false} animate={isHovered ? {
        background: ['linear-gradient(90deg, transparent 0%, hsl(var(--accent) / 0.1) 50%, transparent 100%)'],
        x: ['-100%', '100%']
      } : {}} transition={{
        duration: 1,
        repeat: Infinity,
        repeatDelay: 0.5
      }} />
      </motion.div>
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
      <div className="absolute inset-0 bg-background" />
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
          <div className="px-8 py-4 rounded-2xl glass border border-accent/30 text-center max-w-xl mx-auto">
            <span className="font-semibold text-foreground">Toate serviciile vor fi personalizate și prezentate pe pagini dedicate cabinetului dumneavoastră.</span>
          </div>
        </motion.div>
      </div>
    </section>;
};