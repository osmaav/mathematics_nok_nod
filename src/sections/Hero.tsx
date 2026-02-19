import { motion } from 'framer-motion';
import { ArrowDown, Divide, Percent, Sparkles } from 'lucide-react';

const floatingNumbers = [
  { num: 12, x: '5%', y: '15%', delay: 0, color: 'nod', size: 'text-6xl sm:text-8xl' },
  { num: 18, x: '80%', y: '10%', delay: 0.5, color: 'nok', size: 'text-6xl sm:text-8xl' },
  { num: 24, x: '70%', y: '65%', delay: 1, color: 'nod', size: 'text-5xl sm:text-7xl' },
  { num: 36, x: '8%', y: '70%', delay: 1.5, color: 'nok', size: 'text-5xl sm:text-7xl' },
  { num: 6, x: '45%', y: '8%', delay: 2, color: 'nod', size: 'text-4xl sm:text-6xl' },
  { num: 48, x: '85%', y: '45%', delay: 2.5, color: 'nok', size: 'text-4xl sm:text-6xl' },
];

export default function Hero() {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-[100svh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-white via-gray-50 to-white"
      style={{ paddingTop: 'calc(4rem + env(safe-area-inset-top))' }}
    >
      {/* Floating Numbers Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {floatingNumbers.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: 0.12,
              scale: 1,
              y: [0, -15, 0],
            }}
            transition={{
              opacity: { delay: item.delay, duration: 0.5 },
              scale: { delay: item.delay, duration: 0.5 },
              y: { delay: item.delay, duration: 3, repeat: Infinity, ease: 'easeInOut' }
            }}
            className={`absolute font-heading font-bold ${item.size} ${item.color === 'nod' ? 'text-nod' : 'text-nok'
              }`}
            style={{ left: item.x, top: item.y }}
          >
            {item.num}
          </motion.div>
        ))}
      </div>

      {/* Content */}
      <div className="section-container relative z-10 py-8">
        <div className="section-inner text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-yellow-accent/30 text-text-primary font-heading font-semibold text-xs sm:text-sm mb-4 sm:mb-6"
          >
            <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="whitespace-nowrap">По программе ФГОС России</span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-heading font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-text-primary mb-4 sm:mb-6"
          >
            <span className="text-gradient-nod">НОД</span>
            <span className="mx-2 sm:mx-4 text-text-secondary">и</span>
            <span className="text-gradient-nok">НОК</span>
          </motion.h1>
          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-xl md:text-2xl text-text-secondary max-w-2xl mx-auto mb-6 sm:mb-10 px-4"
          >
            Научись находить <span className="font-semibold text-nod-dark">наибольший общий делитель</span> и{' '}
            <span className="font-semibold text-nok-dark">наименьшее общее кратное</span> с помощью интерактивных примеров и заданий
          </motion.p>

          {/* Preview Cards */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-6 sm:mb-10 px-4"
          >
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="bg-white rounded-2xl p-4 sm:p-6 shadow-card border-2 border-nod/20 cursor-pointer group touch-manipulation"
              onClick={() => scrollToSection('#nod')}
            >
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-nod/10 flex items-center justify-center mb-3 sm:mb-4 group-hover:bg-nod/20 transition-colors">
                <Divide className="w-6 h-6 sm:w-7 sm:h-7 text-nod-dark" />
              </div>
              <h3 className="font-heading font-bold text-lg sm:text-xl text-text-primary mb-1 sm:mb-2">Что такое НОД?</h3>
              <p className="text-text-secondary text-xs sm:text-sm">Наибольший общий делитель</p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="bg-white rounded-2xl p-4 sm:p-6 shadow-card border-2 border-nok/20 cursor-pointer group touch-manipulation"
              onClick={() => scrollToSection('#nok')}
            >
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-nok/10 flex items-center justify-center mb-3 sm:mb-4 group-hover:bg-nok/20 transition-colors">
                <Percent className="w-6 h-6 sm:w-7 sm:h-7 text-nok-dark" />
              </div>
              <h3 className="font-heading font-bold text-lg sm:text-xl text-text-primary mb-1 sm:mb-2">Что такое НОК?</h3>
              <p className="text-text-secondary text-xs sm:text-sm">Наименьшее общее кратное</p>
            </motion.div>
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <motion.button
              onClick={() => scrollToSection('#theory')}
              className="btn-primary text-base sm:text-lg px-6 sm:px-8 py-3.5 sm:py-4 touch-manipulation"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Начать обучение
              <ArrowDown className="w-4 h-4 sm:w-5 sm:h-5 ml-2 animate-bounce" />
            </motion.button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap justify-center gap-6 sm:gap-8 mt-10 sm:mt-16"
          >
            <div className="text-center">
              <div className="font-heading font-bold text-2xl sm:text-3xl text-nod-dark">2</div>
              <div className="text-text-secondary text-xs sm:text-sm">Темы</div>
            </div>
            <div className="text-center">
              <div className="font-heading font-bold text-2xl sm:text-3xl text-nok-dark">10+</div>
              <div className="text-text-secondary text-xs sm:text-sm">Заданий</div>
            </div>
            <div className="text-center">
              <div className="font-heading font-bold text-2xl sm:text-3xl text-yellow-accent">∞</div>
              <div className="text-text-secondary text-xs sm:text-sm">Примеров</div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
          <path
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="white"
          />
        </svg>
      </div>
    </section>
  );
}
