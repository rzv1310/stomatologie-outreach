import { motion } from 'framer-motion';
import {
  Facebook,
  Instagram,
  Phone,
  Mail,
  MapPin,
  Heart
} from 'lucide-react';
import { useClinic } from '@/context/ClinicContext';

const socialLinks = [
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Instagram, href: '#', label: 'Instagram' },
];

const quickLinks = [
  { label: 'Tarife', href: '#tarife' },
  { label: 'Echipa', href: '#team' },
  { label: 'Contact', href: '#contact' },
  { label: 'Termeni și Condiții', href: '#termeni' },
  { label: 'Politica Cookies', href: '#cookies' },
  { label: 'GDPR', href: '#gdpr' },
  { label: 'ANPC - SAL', href: 'https://anpc.ro/ce-este-sal/' },
  { label: 'ANPC - SOL', href: 'https://ec.europa.eu/consumers/odr' },
  { label: 'Sitemap', href: '#sitemap' },
];

const services = [
  'Urgențe stomatologice',
  'Stomatologie copii',
  'Endodonție',
  'Tratament Carii',
  'Estetică dentară',
  'Ortodonție',
  'Profilaxie',
  'Protetică dentară',
  'Chirurgie orală',
  'Parodontologie',
  'Radiologie dentară',
  'Implant dentar',
];

export const Footer = () => {
  const clinic = useClinic();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative pt-12 sm:pt-20 pb-8 overflow-hidden bg-primary">
      {/* Background */}
      <div className="absolute inset-0 grid-pattern opacity-10" />

      {/* Floating Orbs */}
      <motion.div
        className="absolute top-20 left-20 w-40 h-40 rounded-full bg-white/5 blur-3xl"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-20 right-20 w-60 h-60 rounded-full bg-white/5 blur-3xl"
        animate={{ scale: [1, 1.3, 1] }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12 mb-16">
          {/* Brand Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.div 
              className="mb-6"
              whileHover={{ scale: 1.02 }}
            >
              <h2 className="font-display text-xl font-bold text-white">Stomatologie {clinic.city}</h2>
            </motion.div>
            <p className="text-white/80 leading-relaxed mb-6">
              Clinică stomatologică de top, dedicată zâmbetului tău perfect 
              prin tehnologie avansată și îngrijire personalizată.
            </p>
            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social, i) => (
                <motion.a
                  key={i}
                  href={social.href}
                  className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center group hover:bg-white/20 transition-colors"
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5 text-white group-hover:text-white transition-colors" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h2 className="font-display text-lg font-bold text-white mb-6">Linkuri Rapide</h2>
            <ul className="space-y-3">
              {quickLinks.map((link, i) => (
                <li key={i}>
                  <motion.a
                    href={link.href}
                    className="text-white/80 hover:text-white transition-colors inline-flex items-center gap-2 group"
                    whileHover={{ x: 5 }}
                  >
                    <span className="w-1 h-1 rounded-full bg-white opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.label}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="font-display text-lg font-bold text-white mb-6">Servicii</h2>
            <ul className="space-y-3">
              {services.map((service, i) => (
                <li key={i}>
                  <motion.a
                    href="#services"
                    className="text-white/80 hover:text-white transition-colors inline-flex items-center gap-2 group"
                    whileHover={{ x: 5 }}
                  >
                    <span className="w-1 h-1 rounded-full bg-white opacity-0 group-hover:opacity-100 transition-opacity" />
                    {service}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h2 className="font-display text-lg font-bold text-white mb-6">Contact</h2>
            <ul className="space-y-4">
              <li>
                <a href="https://maps.google.com" className="flex items-start gap-3 text-white/80 hover:text-white transition-colors group">
                  <MapPin className="w-5 h-5 mt-0.5 text-white" />
                  <span>{clinic.address}</span>
                </a>
              </li>
              <li>
                <a href={`tel:${clinic.phoneTel}`} className="flex items-center gap-3 text-white/80 hover:text-white transition-colors group">
                  <Phone className="w-5 h-5 text-white" />
                  <span>{clinic.phoneFormatted}</span>
                </a>
              </li>
              <li>
                <a href={`mailto:${clinic.email}`} className="flex items-center gap-3 text-white/80 hover:text-white transition-colors group">
                  <Mail className="w-5 h-5 text-white" />
                  <span>{clinic.email}</span>
                </a>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="pt-8 border-t border-white/20"
        >
          <div className="flex flex-col gap-3 text-center md:flex-row md:justify-between md:items-center md:text-left">
            <p className="text-sm text-white/80">
              © {currentYear} Stomatologie {clinic.city}. Toate drepturile rezervate.
            </p>
            <p className="text-sm text-white/80 flex items-center gap-2">
              Creat cu <Heart className="w-4 h-4 text-white fill-white" /> pentru zâmbetul tău
              <span className="mx-2">|</span>
              <a href={`tel:${clinic.phoneTel}`} className="hover:text-white transition-colors">{clinic.phoneFormatted}</a>
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};
