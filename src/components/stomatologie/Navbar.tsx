import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useClinic } from '@/context/ClinicContext';

const navLinks = [
  { label: 'Acasă', href: '#' },
  { label: 'Servicii', href: '#services' },
  { label: 'Tarife', href: '#tarife' },
  { label: 'Echipa', href: '#team' },
  { label: 'Contact', href: '#contact' },
];

export const Navbar = () => {
  const clinic = useClinic();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'py-3' : 'py-6'
        }`}
      >
        <div className="container mx-auto px-4">
          <div className={`flex items-center justify-between rounded-2xl transition-all duration-300 ${
            isScrolled ? 'glass px-6 py-3' : 'px-2'
          }`}>
            {/* Brand Name */}
            <motion.a 
              href="#"
              className="flex items-center"
              whileHover={{ scale: 1.02 }}
            >
              <div>
                <h1 className="font-display text-xl font-bold gradient-text">Stomatologie</h1>
                <p className="text-xs text-muted-foreground -mt-1">{clinic.city}</p>
              </div>
            </motion.a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link, i) => (
                <motion.a
                  key={i}
                  href={link.href}
                  className="relative px-4 py-2 text-sm font-medium text-foreground/80 hover:text-foreground transition-colors group"
                  whileHover={{ scale: 1.05 }}
                >
                  {link.label}
                  <motion.span
                    className="absolute bottom-1 left-4 right-4 h-0.5 bg-accent origin-left"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                </motion.a>
              ))}
            </div>

            {/* CTA Button - Desktop only */}
            <div className="hidden lg:flex items-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-[10px] px-5">
                  <a href={`tel:${clinic.phoneTel}`}>
                    <Phone className="w-4 h-4 mr-2" />
                    Sună Acum!
                  </a>
                </Button>
              </motion.div>
            </div>

            {/* Mobile Controls */}
            <div className="lg:hidden flex items-center gap-3">
              {/* Mobile Menu Button - Center */}
              <motion.button
                className="p-2 rounded-xl glass"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                whileTap={{ scale: 0.95 }}
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6 text-foreground" />
                ) : (
                  <Menu className="w-6 h-6 text-foreground" />
                )}
              </motion.button>

              {/* Phone Icon - Right */}
              <motion.a
                href={`tel:${clinic.phoneTel}`}
                className="p-2 rounded-xl bg-primary"
                whileTap={{ scale: 0.95 }}
              >
                <Phone className="w-6 h-6 text-white" />
              </motion.a>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-20 z-40 p-4 lg:hidden"
          >
            <div className="glass rounded-2xl p-6 space-y-4">
              {navLinks.map((link, i) => (
                <motion.a
                  key={i}
                  href={link.href}
                  className="block py-3 px-4 text-lg font-medium text-foreground hover:bg-accent/10 rounded-xl transition-colors"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
