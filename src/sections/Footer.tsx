import { motion } from 'framer-motion';
import { Calculator, BookOpen, GraduationCap, Mail, ExternalLink } from 'lucide-react';

const resources = [
  { label: 'ФГОС начального общего образования', href: 'https://fgos.ru/' },
  { label: 'Российская образовательная платформа', href: 'https://resh.edu.ru/' },
  { label: 'ЯКласс - математика 5 класс', href: 'https://yaklass.ru/' },
];

export default function Footer() {
  return (
    <footer 
      className="bg-text-primary text-white py-10 sm:py-16"
      style={{ paddingBottom: 'max(2.5rem, env(safe-area-inset-bottom))' }}
    >
      <div className="section-container">
        <div className="section-inner">
          <div className="grid md:grid-cols-3 gap-8 sm:gap-12 mb-8 sm:mb-12">
            {/* Logo & Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-nod flex items-center justify-center">
                  <Calculator className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-base sm:text-lg">Математика</h3>
                  <p className="text-xs sm:text-sm text-white/60">5 класс</p>
                </div>
              </div>
              <p className="text-white/70 leading-relaxed text-sm sm:text-base">
                Интерактивный образовательный сайт по теме "НОК и НОД" 
                для учеников 5 класса. Соответствует программе ФГОС России.
              </p>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="flex items-center gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-nod" />
                <h3 className="font-heading font-bold text-base sm:text-lg">Разделы</h3>
              </div>
              <ul className="space-y-1.5 sm:space-y-2">
                {[
                  { label: 'Главная', href: '#hero' },
                  { label: 'Теория НОД', href: '#nod' },
                  { label: 'Теория НОК', href: '#nok' },
                  { label: 'Калькулятор', href: '#calculator' },
                  { label: 'Практика', href: '#practice' },
                  { label: 'Тест', href: '#quiz' },
                ].map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-white/70 hover:text-nod transition-colors text-sm sm:text-base"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Resources */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="flex items-center gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5 text-nok" />
                <h3 className="font-heading font-bold text-base sm:text-lg">Полезные ресурсы</h3>
              </div>
              <ul className="space-y-1.5 sm:space-y-2">
                {resources.map((resource) => (
                  <li key={resource.href}>
                    <a
                      href={resource.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/70 hover:text-nod transition-colors inline-flex items-center gap-1 text-sm sm:text-base"
                    >
                      {resource.label}
                      <ExternalLink className="w-3 h-3 flex-shrink-0" />
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Divider */}
          <div className="border-t border-white/10 pt-6 sm:pt-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
              <p className="text-white/50 text-xs sm:text-sm text-center sm:text-left">
                © 2025 Образовательный сайт по математике. Соответствует ФГОС России.
              </p>
              <div className="flex items-center gap-1.5 sm:gap-2 text-white/50 text-xs sm:text-sm">
                <Mail className="w-3 h-3 sm:w-4 sm:h-4" />
                <span>Для обратной связи обратитесь к учителю математики</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
