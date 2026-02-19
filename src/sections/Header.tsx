import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator, Menu, X, BookOpen, Divide, Percent, CheckSquare, Home } from 'lucide-react';

const navItems = [
  { label: 'Главная', href: '#hero', icon: Home },
  { label: 'Теория', href: '#theory', icon: BookOpen },
  { label: 'НОД', href: '#nod', icon: Divide },
  { label: 'НОК', href: '#nok', icon: Percent },
  { label: 'Практика', href: '#practice', icon: CheckSquare },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Determine active section
      const sections = navItems.map(item => item.href.slice(1));
      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 safe-top ${isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
          }`}
        style={{
          paddingTop: 'max(0.75rem, env(safe-area-inset-top))',
          paddingBottom: '0.75rem',
        }}
      >
        <div className="section-container">
          <div className="section-inner flex items-center justify-between">
            {/* Logo */}
            <motion.div
              className="flex items-center gap-2 sm:gap-3 cursor-pointer touch-manipulation"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => scrollToSection('#hero')}
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-nod to-nod-dark flex items-center justify-center shadow-lg">
                <Calculator className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div className="hidden sm:block">
                <h1 className="font-heading font-bold text-base sm:text-lg leading-tight text-text-primary">
                  Математика
                </h1>
                <p className="text-xs sm:text-sm text-text-secondary">5 класс</p>
              </div>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.href.slice(1);
                return (
                  <motion.button
                    key={item.href}
                    onClick={() => scrollToSection(item.href)}
                    className={`flex items-center gap-2 px-3 py-2.5 rounded-xl font-heading font-semibold text-sm transition-all duration-300 ${isActive
                      ? 'bg-nod/10 text-nod-dark'
                      : 'text-text-secondary hover:text-text-primary hover:bg-gray-100'
                      }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon className="w-4 h-4" />
                    {item.label}
                  </motion.button>
                );
              })}
            </nav>

            {/* CTA Button */}
            <div className="hidden lg:block">
              <motion.button
                onClick={() => scrollToSection('#quiz')}
                className="btn-secondary text-sm py-2.5 px-5"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Проверь себя
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              className="lg:hidden w-11 h-11 rounded-xl bg-gray-100 flex items-center justify-center touch-manipulation"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              whileTap={{ scale: 0.95 }}
              aria-label={isMobileMenuOpen ? 'Закрыть меню' : 'Открыть меню'}
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5 sm:w-6 sm:h-6 text-text-primary" />
              ) : (
                <Menu className="w-5 h-5 sm:w-6 sm:h-6 text-text-primary" />
              )}
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 z-40 lg:hidden"
            style={{
              top: 'calc(3.5rem + env(safe-area-inset-top))',
            }}
          >
            <div className="section-container">
              <div className="bg-white rounded-2xl shadow-xl border border-border p-3 space-y-1">
                {navItems.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <motion.button
                      key={item.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => scrollToSection(item.href)}
                      className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl font-heading font-semibold text-text-primary hover:bg-gray-50 transition-colors touch-manipulation"
                    >
                      <div className="w-10 h-10 rounded-lg bg-nod/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-nod-dark" />
                      </div>
                      <span className="text-base">{item.label}</span>
                    </motion.button>
                  );
                })}
                <motion.button
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navItems.length * 0.05 }}
                  onClick={() => scrollToSection('#quiz')}
                  className="w-full btn-secondary mt-2 text-base"
                >
                  Проверь себя
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
