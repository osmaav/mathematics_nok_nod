import { motion } from 'framer-motion';
import { BookOpen, Lightbulb, Target } from 'lucide-react';
import { useSectionVisibility } from '@/hooks/useSectionVisibility';

export default function TheoryIntro() {
  useSectionVisibility({ sectionId: 'theory-intro' });
  return (
    <section id="theory-intro" className="py-12 sm:py-20 bg-white">
      <div className="section-container">
        <div className="section-inner">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8 sm:mb-12"
          >
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-blue-100 text-blue-600 font-heading font-semibold text-xs sm:text-sm mb-4">
              <BookOpen className="w-3 h-3 sm:w-4 sm:h-4" />
              Теория
            </div>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl text-text-primary mb-3 sm:mb-4">
              Основные <span className="text-gradient-nod">понятия</span>
            </h2>
            <p className="text-base sm:text-xl text-text-secondary max-w-2xl mx-auto px-4">
              Перед тем как приступить к решению задач, давайте разберёмся с основными определениями
            </p>
          </motion.div>

          {/* Info Cards */}
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 mb-8 sm:mb-12">
            {/* NOD Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-br from-nod/5 to-white rounded-2xl p-6 sm:p-8 border-2 border-nod/20 shadow-card"
            >
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-nod/10 flex items-center justify-center mb-4 sm:mb-6">
                <Target className="w-6 h-6 sm:w-7 sm:h-7 text-nod-dark" />
              </div>
              <h3 className="font-heading font-bold text-xl sm:text-2xl text-text-primary mb-3 sm:mb-4">
                Наибольший общий делитель (НОД)
              </h3>
              <p className="text-sm sm:text-base text-text-secondary mb-4 sm:mb-6 leading-relaxed">
                <strong className="text-text-primary">НОД</strong> двух чисел — это наибольшее число, на которое делятся оба этих числа без остатка.
              </p>
              <div className="bg-white rounded-xl p-4 sm:p-5 border border-nod/20">
                <p className="font-mono text-sm sm:text-base text-text-primary">
                  <span className="text-nod-dark font-bold">НОД(12, 18) = 6</span>
                </p>
                <p className="text-xs sm:text-sm text-text-secondary mt-2">
                  Число 6 — наибольшее, на которое делятся и 12, и 18
                </p>
              </div>
            </motion.div>

            {/* NOK Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-br from-nok/5 to-white rounded-2xl p-6 sm:p-8 border-2 border-nok/20 shadow-card"
            >
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-nok/10 flex items-center justify-center mb-4 sm:mb-6">
                <Lightbulb className="w-6 h-6 sm:w-7 sm:h-7 text-nok-dark" />
              </div>
              <h3 className="font-heading font-bold text-xl sm:text-2xl text-text-primary mb-3 sm:mb-4">
                Наименьшее общее кратное (НОК)
              </h3>
              <p className="text-sm sm:text-base text-text-secondary mb-4 sm:mb-6 leading-relaxed">
                <strong className="text-text-primary">НОК</strong> двух чисел — это наименьшее число, которое делится на оба этих числа без остатка.
              </p>
              <div className="bg-white rounded-xl p-4 sm:p-5 border border-nok/20">
                <p className="font-mono text-sm sm:text-base text-text-primary">
                  <span className="text-nok-dark font-bold">НОК(4, 6) = 12</span>
                </p>
                <p className="text-xs sm:text-sm text-text-secondary mt-2">
                  Число 12 — наименьшее, которое делится и на 4, и на 6
                </p>
              </div>
            </motion.div>
          </div>

          {/* Tips */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-yellow-accent/10 rounded-2xl p-6 sm:p-8 border border-yellow-accent/30"
          >
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-yellow-accent/20 flex items-center justify-center flex-shrink-0">
                <Lightbulb className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-600" />
              </div>
              <div>
                <h4 className="font-heading font-bold text-base sm:text-lg text-text-primary mb-2">
                  Полезно знать!
                </h4>
                <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
                  НОД и НОК тесно связаны: <strong className="text-text-primary">НОД(a, b) × НОК(a, b) = a × b</strong>. 
                  Это означает, что произведение НОД и НОК двух чисел равно произведению самих чисел!
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
