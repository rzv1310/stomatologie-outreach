import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  Calendar,
  CheckCircle,
  ArrowRight
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useClinic } from '@/context/ClinicContext';

const schedule = [
  { day: 'Luni - Vineri', hours: '08:00 - 20:00' },
  { day: 'Sâmbătă', hours: '09:00 - 14:00' },
  { day: 'Duminică', hours: 'Închis' },
];

export const ContactSection = () => {
  const clinic = useClinic();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [formState, setFormState] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  });
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const contactInfo = [
    {
      icon: MapPin,
      label: 'Adresă',
      value: clinic.address,
      link: 'https://maps.google.com',
    },
    {
      icon: Phone,
      label: 'Telefon',
      value: clinic.phoneFormatted,
      link: `tel:${clinic.phoneTel}`,
    },
    {
      icon: Mail,
      label: 'Email',
      value: clinic.email,
      link: `mailto:${clinic.email}`,
    },
  ];

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const body = new URLSearchParams({
      'form-name': 'contact',
      name: formState.name,
      phone: formState.phone,
      email: formState.email,
      message: formState.message,
      subdomain: clinic.subdomain,
    });

    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: body.toString(),
    })
      .then(() => {
        setIsSubmitted(true);
        setFormState({ name: '', phone: '', email: '', message: '' });
        setTimeout(() => setIsSubmitted(false), 3000);
      })
      .catch((error) => {
        console.error('Form submission error:', error);
        alert('Eroare la trimitere. Vă rugăm încercați din nou.');
      })
      .finally(() => setIsSubmitting(false));
  };

  return (
    <section id="contact" className="relative py-16 sm:py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />
      <div className="absolute inset-0 grid-pattern opacity-50" />

      {/* Floating Elements */}
      <motion.div
        className="absolute top-1/3 left-10 w-72 h-72 rounded-full bg-primary/5 blur-3xl"
        animate={{ scale: [1, 1.2, 1], x: [0, 30, 0] }}
        transition={{ duration: 12, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-1/3 right-10 w-80 h-80 rounded-full bg-accent/5 blur-3xl"
        animate={{ scale: [1, 1.3, 1], x: [0, -30, 0] }}
        transition={{ duration: 15, repeat: Infinity }}
      />

      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-20"
        >
          <motion.span 
            className="inline-block px-4 py-2 rounded-full glass text-sm font-medium text-accent mb-4"
            whileHover={{ scale: 1.05 }}
          >
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>Programări</span>
            </div>
          </motion.span>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold mb-6">
            <span className="text-foreground">Hai să </span>
            <span className="gradient-text">Vorbim</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Programează-te pentru o consultație sau contactează-ne pentru orice întrebare. 
            Echipa noastră îți stă la dispoziție.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="p-5 sm:p-8 glass rounded-3xl relative overflow-hidden">
              {/* Success Overlay */}
              <AnimatedSubmitSuccess isVisible={isSubmitted} />

              <h3 className="font-display text-2xl font-bold mb-6 text-foreground">
                Trimite-ne un mesaj
              </h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                <input type="hidden" name="form-name" value="contact" />
                <input type="hidden" name="subdomain" value={clinic.subdomain} />
                {/* Name Input */}
                <div className="relative">
                  <motion.div
                    className="absolute inset-0 rounded-xl bg-accent/20 -z-10"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={focusedField === 'name' ? { scale: 1, opacity: 1 } : { scale: 0.95, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  />
                  <Input
                    name="name"
                    placeholder="Numele tău"
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    onFocus={() => setFocusedField('name')}
                    onBlur={() => setFocusedField(null)}
                    className="h-14 px-5 bg-background/50 border-border/50 rounded-xl focus:border-accent focus:ring-accent transition-all"
                  />
                </div>

                {/* Phone & Email Row */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="relative">
                    <motion.div
                      className="absolute inset-0 rounded-xl bg-accent/20 -z-10"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={focusedField === 'phone' ? { scale: 1, opacity: 1 } : { scale: 0.95, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    />
                    <Input
                      name="phone"
                      placeholder="Telefon"
                      type="tel"
                      value={formState.phone}
                      onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                      onFocus={() => setFocusedField('phone')}
                      onBlur={() => setFocusedField(null)}
                      className="h-14 px-5 bg-background/50 border-border/50 rounded-xl focus:border-accent focus:ring-accent transition-all"
                    />
                  </div>
                  <div className="relative">
                    <motion.div
                      className="absolute inset-0 rounded-xl bg-accent/20 -z-10"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={focusedField === 'email' ? { scale: 1, opacity: 1 } : { scale: 0.95, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    />
                    <Input
                      name="email"
                      placeholder="Email"
                      type="email"
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                      className="h-14 px-5 bg-background/50 border-border/50 rounded-xl focus:border-accent focus:ring-accent transition-all"
                    />
                  </div>
                </div>


                {/* Message Textarea */}
                <div className="relative">
                  <motion.div
                    className="absolute inset-0 rounded-xl bg-accent/20 -z-10"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={focusedField === 'message' ? { scale: 1, opacity: 1 } : { scale: 0.95, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  />
                  <textarea
                    name="message"
                    placeholder="Mesajul tău (opțional)"
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    onFocus={() => setFocusedField('message')}
                    onBlur={() => setFocusedField(null)}
                    rows={4}
                    className="w-full px-5 py-4 bg-background/50 border border-border/50 rounded-xl focus:border-accent focus:ring-accent focus:ring-1 transition-all text-foreground resize-none"
                  />
                </div>

                {/* Submit Button */}
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-14 text-lg font-semibold bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl group pulse-glow"
                  >
                    <span className="flex items-center gap-2">
                      <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      {isSubmitting ? 'Se trimite...' : 'Trimite Mesajul'}
                    </span>
                  </Button>
                </motion.div>
              </form>
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-8"
          >
            {/* Contact Cards */}
            <div className="space-y-4">
              {contactInfo.map((item, i) => (
                <motion.a
                  key={i}
                  href={item.link}
                  target={item.link.startsWith('http') ? '_blank' : undefined}
                  className="flex items-center gap-4 p-5 glass rounded-2xl group hover:bg-accent/10 transition-all"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  whileHover={{ x: 10 }}
                >
                  <motion.div 
                    className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center group-hover:bg-accent/40 transition-colors"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <item.icon className="w-5 h-5 text-accent" />
                  </motion.div>
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground">{item.label}</p>
                    <p className="font-medium text-foreground">{item.value}</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-accent opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.a>
              ))}
            </div>

            {/* Schedule */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.8 }}
              className="p-6 glass rounded-2xl"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-accent" />
                </div>
                <h3 className="font-display text-lg font-bold text-foreground">Program</h3>
              </div>
              <div className="space-y-3">
                {schedule.map((item, i) => (
                  <div key={i} className="flex justify-between items-center py-2 border-b border-border/30 last:border-0">
                    <span className="text-foreground">{item.day}</span>
                    <span className={`font-medium ${item.hours === 'Închis' ? 'text-destructive' : 'text-accent'}`}>
                      {item.hours}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Map */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1 }}
              className="relative h-64 rounded-2xl overflow-hidden"
            >
              <iframe
                src={clinic.mapEmbedUrl}
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-2xl"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const AnimatedSubmitSuccess = ({ isVisible }: { isVisible: boolean }) => {
  return (
    <motion.div
      className="absolute inset-0 bg-background/95 backdrop-blur-sm flex items-center justify-center z-20 rounded-3xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      style={{ pointerEvents: isVisible ? 'auto' : 'none' }}
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: isVisible ? 1 : 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="text-center"
      >
        <motion.div
          className="w-20 h-20 mx-auto mb-4 rounded-full bg-accent/20 flex items-center justify-center"
          animate={isVisible ? { scale: [1, 1.2, 1] } : {}}
          transition={{ duration: 0.5 }}
        >
          <CheckCircle className="w-10 h-10 text-accent" />
        </motion.div>
        <h4 className="font-display text-xl font-bold text-foreground mb-2">
          Mesaj trimis!
        </h4>
        <p className="text-muted-foreground">
          Te vom contacta în cel mai scurt timp.
        </p>
      </motion.div>
    </motion.div>
  );
};
