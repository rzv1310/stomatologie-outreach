import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Star, Award, GraduationCap, Linkedin, Mail } from 'lucide-react';
const doctors = [{
  name: 'Dr. Alexandru Popescu',
  role: 'Medic Primar Implantologie',
  experience: '18 ani experiență',
  specializations: ['Implantologie', 'Chirurgie orală', 'Protetică'],
  education: 'UMF Carol Davila București',
  image: null,
  initials: 'Poza ta aici'
}, {
  name: 'Dr. Maria Ionescu',
  role: 'Specialist Ortodonție',
  experience: '12 ani experiență',
  specializations: ['Ortodonție', 'Invisalign', 'Estetica dentară'],
  education: 'UMF Iași',
  image: null,
  initials: 'Poza ta aici'
}, {
  name: 'Dr. Andrei Dumitrescu',
  role: 'Specialist Endodonție',
  experience: '15 ani experiență',
  specializations: ['Endodonție', 'Microchirurgie', 'Tratamente laser'],
  education: 'UMF Cluj-Napoca',
  image: null,
  initials: 'Poza ta aici'
}, {
  name: 'Dr. Elena Radu',
  role: 'Specialist Pedodonție',
  experience: '10 ani experiență',
  specializations: ['Pedodonție', 'Profilaxie', 'Sedare conștientă'],
  education: 'UMF Târgu Mureș',
  image: null,
  initials: 'Poza ta aici'
}];
const DoctorCard = ({
  doctor,
  index
}: {
  doctor: typeof doctors[0];
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
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height
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
    delay: index * 0.15
  }} viewport={{
    once: true,
    margin: "-50px"
  }} className="group relative" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} onMouseMove={handleMouseMove}>
      <motion.div className="relative h-full rounded-3xl glass overflow-hidden" whileHover={{
      y: -10
    }} transition={{
      type: "spring",
      stiffness: 300
    }}>
        {/* Spotlight Effect */}
        <motion.div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" style={{
        background: `radial-gradient(circle at ${mousePos.x * 100}% ${mousePos.y * 100}%, hsl(var(--accent) / 0.15), transparent 50%)`
      }} />

        {/* Image/Avatar Section */}
        <div className="relative h-64 overflow-hidden">
          <div className="absolute inset-0 bg-primary opacity-90" />
          
          {/* Pattern Overlay */}
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <pattern id={`pattern-${index}`} patternUnits="userSpaceOnUse" width="10" height="10">
                <circle cx="5" cy="5" r="1" fill="white" />
              </pattern>
              <rect width="100" height="100" fill={`url(#pattern-${index})`} />
            </svg>
          </div>

          {/* Avatar/Initials */}
          <motion.div className="absolute inset-0 flex items-center justify-center" animate={isHovered ? {
          scale: 1.1
        } : {
          scale: 1
        }}>
            <div className="w-32 h-32 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border-2 border-white/30">
              <span className={`font-display font-bold text-white text-center px-2 leading-tight ${doctor.initials.length > 4 ? 'text-sm' : 'text-4xl'}`}>{doctor.initials}</span>
            </div>
          </motion.div>

          {/* Experience Badge */}
          <motion.div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm" animate={isHovered ? {
          scale: 1.1
        } : {
          scale: 1
        }}>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-300 fill-yellow-300" />
              <span className="text-sm font-medium text-white">{doctor.experience}</span>
            </div>
          </motion.div>
        </div>

        {/* Content Section */}
        <div className="p-6">
          <h3 className="font-display text-xl font-bold text-foreground mb-1">
            {doctor.name}
          </h3>
          <p className="text-accent font-medium mb-4">{doctor.role}</p>

          {/* Education */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <GraduationCap className="w-4 h-4" />
            <span>{doctor.education}</span>
          </div>

          {/* Specializations */}
          <div className="flex flex-wrap gap-2 mb-6">
            {doctor.specializations.map((spec, i) => <motion.span key={i} className="px-3 py-1 text-xs rounded-full bg-accent/10 text-accent border border-accent/20" initial={{
            opacity: 0,
            scale: 0.8
          }} animate={isHovered ? {
            opacity: 1,
            scale: 1
          } : {
            opacity: 0.8,
            scale: 1
          }} transition={{
            delay: i * 0.05
          }}>
                {spec}
              </motion.span>)}
          </div>

          {/* Social Links */}
          <motion.div className="flex gap-3" initial={{
          opacity: 0,
          y: 10
        }} animate={isHovered ? {
          opacity: 1,
          y: 0
        } : {
          opacity: 0,
          y: 10
        }}>
            <motion.button className="p-2 rounded-full bg-accent/10 hover:bg-accent/20 transition-colors" whileHover={{
            scale: 1.1
          }} whileTap={{
            scale: 0.95
          }}>
              <Linkedin className="w-4 h-4 text-accent" />
            </motion.button>
            <motion.button className="p-2 rounded-full bg-accent/10 hover:bg-accent/20 transition-colors" whileHover={{
            scale: 1.1
          }} whileTap={{
            scale: 0.95
          }}>
              <Mail className="w-4 h-4 text-accent" />
            </motion.button>
          </motion.div>
        </div>

        {/* Bottom Glow */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </motion.div>
    </motion.div>;
};
export const TeamSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "-100px"
  });
  return <section id="team" className="relative py-16 sm:py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />
      <div className="absolute inset-0 grid-pattern opacity-50" />

      {/* Floating Elements */}
      <motion.div className="absolute top-1/4 right-0 w-96 h-96 rounded-full bg-accent/5 blur-3xl" animate={{
      x: [0, -50, 0],
      scale: [1, 1.2, 1]
    }} transition={{
      duration: 10,
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
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4" />
              <span>Echipa Noastră</span>
            </div>
          </motion.span>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold mb-6">
            <span className="text-foreground">Medici Stomatologi</span>
            <span className="gradient-text"></span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto">Echipa noastră este formată din medici cu experiență dovedită, pregătiți în cele mai prestigioase centre medicale din România și Europa, dedicați excelenței.</p>
        </motion.div>

        {/* Doctors Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          {doctors.map((doctor, index) => <div key={index} className={index >= 2 ? 'hidden sm:block' : undefined}><DoctorCard doctor={doctor} index={index} /></div>)}
        </div>

        {/* Team Stats */}
        <motion.div initial={{
        opacity: 0,
        y: 40
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true
      }} transition={{
        delay: 0.3
      }} className="mt-20 p-8 glass rounded-3xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center max-w-3xl mx-auto">
            {[{
            value: '4',
            label: 'Medici Specialiști'
          }, {
            value: '50+',
            label: 'Cursuri & Certificări'
          }, {
            value: '100%',
            label: 'Dedicare Pacienți'
          }].map((stat, i) => <motion.div key={i} whileHover={{
            scale: 1.05
          }} transition={{
            type: "spring",
            stiffness: 300
          }}>
                <div className="font-display text-3xl font-bold gradient-text mb-2">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>)}
          </div>
        </motion.div>
      </div>
    </section>;
};