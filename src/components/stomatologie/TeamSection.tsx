import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Star, Award, GraduationCap, Linkedin, Mail } from 'lucide-react';
import doctorPopescu from '@/assets/doctor-popescu.jpeg';
import doctorIonescu from '@/assets/doctor-ionescu.png';

const doctors = [{
  name: 'Dr. Alexandru Popescu',
  role: 'Medic Implantolog',
  experience: '5',
  specializations: ['Implantologie', 'Chirurgie orală', 'Protetică'],
  education: 'UMF Carol Davila București',
  image: doctorPopescu,
  initials: 'Poza ta aici'
}, {
  name: 'Dr. Maria Ionescu',
  role: 'Medic Ortodont',
  experience: '5',
  specializations: ['Ortodonție', 'Invisalign', 'Estetica dentară'],
  education: 'UMF Iași',
  image: doctorIonescu,
  initials: 'Poza ta aici'
}, {
  name: 'Dr. Andrei Dumitrescu',
  role: 'Specialist Endodonție',
  experience: '5',
  specializations: ['Endodonție', 'Microchirurgie', 'Tratamente laser'],
  education: 'UMF Cluj-Napoca',
  image: doctorPopescu,
  initials: 'Poza ta aici'
}, {
  name: 'Dr. Elena Radu',
  role: 'Specialist Pedodonție',
  experience: '5',
  specializations: ['Pedodonție', 'Profilaxie', 'Sedare conștientă'],
  education: 'UMF Târgu Mureș',
  image: doctorIonescu,
  initials: 'Poza ta aici'
}];

const DoctorCard = ({
  doctor,
  index
}: {
  doctor: typeof doctors[0];
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
    delay: index * 0.15
  }} viewport={{
    once: true,
    margin: "-50px"
  }} className="relative">
      <div className="relative h-full rounded-3xl glass overflow-hidden">

        {/* Image/Avatar Section */}
        <div className="relative h-64 overflow-hidden">
          {doctor.image ? (
            <>
              <img src={doctor.image} alt={doctor.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-32 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border-2 border-white/30">
                  <span className="font-display font-bold text-primary text-center px-2 leading-tight text-sm">{doctor.initials}</span>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="absolute inset-0 bg-primary opacity-90" />
              <div className="absolute inset-0 opacity-10">
                <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <pattern id={`pattern-${index}`} patternUnits="userSpaceOnUse" width="10" height="10">
                    <circle cx="5" cy="5" r="1" fill="white" />
                  </pattern>
                  <rect width="100" height="100" fill={`url(#pattern-${index})`} />
                </svg>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-32 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border-2 border-white/30">
                  <span className={`font-display font-bold text-primary text-center px-2 leading-tight ${doctor.initials.length > 4 ? 'text-sm' : 'text-4xl'}`}>{doctor.initials}</span>
                </div>
              </div>
            </>
          )}

          {/* Stars Badge */}
          <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.5 + i * 0.15, type: "spring", stiffness: 400 }}
                >
                  <Star className="w-4 h-4 text-primary fill-primary" />
                </motion.div>
              ))}
            </div>
          </div>
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
            {doctor.specializations.map((spec, i) => (
              <span key={i} className="px-3 py-1 text-xs rounded-full bg-accent/10 text-accent border border-accent/20">
                {spec}
              </span>
            ))}
          </div>

          {/* Social Links */}
          <div className="flex gap-3">
            <button className="p-2 rounded-full bg-accent/10 transition-colors">
              <Linkedin className="w-4 h-4 text-accent" />
            </button>
            <button className="p-2 rounded-full bg-accent/10 transition-colors">
              <Mail className="w-4 h-4 text-accent" />
            </button>
          </div>
        </div>

        {/* Bottom line */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
      </div>
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

        {/* Doctors Grid - 4 on desktop, 2 on mobile */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          {doctors.map((doctor, index) => <div key={index} className={index >= 2 ? 'hidden sm:block' : undefined}><DoctorCard doctor={doctor} index={index} /></div>)}
        </div>

      </div>
    </section>;
};
